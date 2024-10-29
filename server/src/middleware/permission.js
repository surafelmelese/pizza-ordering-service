import { defineAbilitiesFor } from '../utils/casl.js';
import { getRoleById } from '../services/role.service.js';

export const checkPermission = (action, subject, conditions = {}) => {
  return async (req, res, next) => {
    try {
      // Retrieve role information based on role_id from the request
      const role = await getRoleById(req.role_id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found for the given role_id' });
      }

      // Define user's abilities based on their role
      const roleName = role.name.trim().toLowerCase(); 
      const user = { ...req, roleName };
      const ability = defineAbilitiesFor(user);

      // Set default conditions for reading orders if none are provided
      if (action === 'read' && subject === 'Order' && Object.keys(conditions).length === 0) {
        conditions = { restaurant_id: req.restaurant_id };
      }

      // Log permission check details for debugging
      console.log("Checking permissions...");
      console.log("Action:", action);
      console.log("Subject:", subject);
      console.log("Conditions:", conditions);

      // Ensure `action` and `subject` are valid strings
      if (typeof action !== 'string' || typeof subject !== 'string') {
        return res.status(400).json({ message: "Action and subject must be strings" });
      }

      // Check user permission with appropriate arguments for CASL
      const canPerformAction = conditions && Object.keys(conditions).length > 0 
        ? ability.can(action, subject, conditions) 
        : ability.can(action, subject);

      // Log the ability check for further analysis
      console.log("Can perform action:", canPerformAction);

      if (canPerformAction) {
        return next();
      }

      // Permission denied if no matching rule found
      return res.status(403).json({ message: 'Forbidden: You do not have permission' });
    } catch (error) {
      console.error("Error in permission check:", error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
