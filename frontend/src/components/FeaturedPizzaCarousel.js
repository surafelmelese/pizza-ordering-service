// components/FeaturedPizzaCarousel.js
import Slider from 'react-slick';
import FeaturedPizza from './FeaturedPizza';
import { Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeaturedPizzaCarousel = () => {
    const samplePizzas = [
        { title: "Margherita Pizza", description: "A classic delight with fresh tomatoes, mozzarella cheese, and basil." },
        { title: "Pepperoni Pizza", description: "Topped with pepperoni, mozzarella, and a savory tomato sauce." },
        { title: "BBQ Chicken Pizza", description: "Grilled chicken with BBQ sauce, onions, and cilantro." },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Slider {...settings}>
                {samplePizzas.map((pizza, index) => (
                    <FeaturedPizza 
                        key={index} 
                        title={pizza.title} 
                        description={pizza.description} 
                    />
                ))}
            </Slider>
        </Box>
    );
};

export default FeaturedPizzaCarousel;