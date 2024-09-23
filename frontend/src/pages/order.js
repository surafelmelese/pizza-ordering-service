// src/pages/order.js
import Navbar from '../components/Navbar';
import PizzaList from '../components/PizzaList';

const OrderPage = () => {
    // Example pizza data
    const pizzas = [
        { name: 'Veggie', toppings: ['Tomato', 'Mozzarella', 'Bell Peppers', 'Onions', 'Olives'], price: 11 },
        { name: 'Pepperoni', toppings: ['Tomato', 'Mozzarella', 'Pepperoni'], price: 12 }
    ];

    return (
        <>
            <Navbar />
            <PizzaList pizzas={pizzas} />
        </>
    );
};

export default OrderPage;
