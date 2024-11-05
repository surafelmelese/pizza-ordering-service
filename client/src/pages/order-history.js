import { useEffect, useState } from 'react';
import PizzaCard from '../components/Product/PizzaCard';
import { Box, Typography } from '@mui/material';
import { getAllOrdersByUser } from '../api/orderApi';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState({
    ordered: [],
    received: [],
    rejected: [],
  });

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await getAllOrdersByUser();
        const categorizedOrders = response.data.reduce(
          (acc, order) => {
            if (order.status === 'Delivered') acc.received.push(order);
            else if (order.status === 'Rejected') acc.rejected.push(order);
            else acc.ordered.push(order);
            return acc;
          },
          { ordered: [], received: [], rejected: [] }
        );

        setOrderHistory(categorizedOrders);
      } catch (err) {
        console.error('Error fetching order history:', err);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleButtonClick = (order) => {
    console.log(`Order ID: ${order.id}, Status: ${order.status}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Order History
      </Typography>
      {Object.entries(orderHistory).map(([status, orders]) => (
        <Box key={status} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {orders.map((order, index) => {
              const buttonType = order.status === 'Delivered' ? 'received' : order.status === 'Rejected' ? 'rejected' : 'ordered';
              const buttonLabel = order.status === 'Delivered' ? 'Received' : order.status === 'Rejected' ? 'Rejected' : 'Ordered';

              return (
                <PizzaCard 
                  key={index}
                  pizza={{
                    name: order.pizza_name,
                    toppings: order.toppings,
                    base_price: order.base_price,
                  }}
                  restaurantName={order.restaurant_name}
                  onButtonClick={() => handleButtonClick(order)}
                  buttonLabel={buttonLabel} 
                />
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default OrderHistory;
