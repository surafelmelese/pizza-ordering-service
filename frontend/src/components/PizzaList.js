// src/components/PizzaList.js
import { Box, Card, CardContent, Typography } from '@mui/material';

const PizzaList = ({ pizzas }) => {
    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
            {pizzas.map((pizza, index) => (
                <Card key={index} sx={{ width: 300 }}>
                    <CardContent>
                        <Typography variant="h6">{pizza.name}</Typography>
                        <Typography>{pizza.toppings.join(', ')}</Typography>
                        <Typography variant="subtitle1">${pizza.price}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default PizzaList;