import { AbilityBuilder, Ability } from '@casl/ability';

export const defineAbilitiesFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  // Normalize roleName by trimming and converting to lower case
  const normalizedRoleName = user.roleName.trim().toLowerCase();
  console.log(`User ID: ${user.user_id}, Restaurant ID: ${user.restaurant_id}, Role: ${user.roleName}`);

  // Define abilities based on normalized role name
  switch (normalizedRoleName) {
    case 'super admin':
      can('manage', 'all'); // Super Admins can manage everything in all restaurants
      console.log('Ability: Super Admin can manage all.');
      break;

    case 'admin':
      if (user.restaurant_id) {
        can('manage', 'Order', { restaurantId: user.restaurant_id });
        can('manage', 'Pizza', { restaurantId: user.restaurant_id });
        can('read', 'User', { restaurantId: user.restaurant_id });
        cannot('manage', 'SuperAdmin');
        console.log('Ability: Admin can manage Orders, Pizzas, and read Users.');
      } else {
        console.error('Admin role requires a valid restaurant_id');
      }
      break;

    case 'restaurant_manager':
      if (user.restaurant_id) {
        can('manage', 'Order', { restaurantId: user.restaurant_id });
        can('manage', 'Pizza', { restaurantId: user.restaurant_id });
        can('read', 'User', { restaurantId: user.restaurant_id });
        console.log('Ability: Restaurant Manager can manage Orders, Pizzas, and read Users.');
      } else {
        console.error('Restaurant Manager role requires a valid restaurant_id');
      }
      break;

    case 'chef':
      if (user.restaurant_id) {
        can('read', 'Order', { restaurantId: user.restaurant_id, status: 'pending' });
        can('update', 'Order', { restaurantId: user.restaurant_id, status: 'in progress' });
        console.log('Ability: Chef can read and update pending Orders.');
      } else {
        console.error('Chef role requires a valid restaurant_id');
      }
      break;

    case 'customer':
      can('create', 'Order');
      can('read', 'Order', { userId: user.user_id });
      can('update', 'Order', { userId: user.user_id });
      console.log('Ability: Customer can create, read, and update their own Orders.');
      break;

    case 'guest':
      can('read', 'Pizza');
      console.log('Ability: Guest can read Pizzas.');
      break;

    default:
      throw new Error('Unknown role');
  }

  // General restrictions for all roles
  cannot('delete', 'User');
  cannot('delete', 'Order');
  cannot('update', 'User');

  // Log final abilities
  const finalAbilities = build().rules;
  console.log('Final Abilities:', finalAbilities);

  return build();
};
