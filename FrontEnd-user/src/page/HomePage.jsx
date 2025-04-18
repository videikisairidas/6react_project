import React, { useState, useEffect } from 'react';
import HomePagleSlider from '../components/homepage/HomePageSlider';
import HomeNewProducts  from '../components/homepage/HomeNewProducts';
import { use } from 'react';
import HomePagePopularProducts from '../components/homepage/HomePagePopularProducts';
import HomeRandomProducts from '../components/homepage/HomeRandomProducts';


const dummySliderImages = [
    { url: 'https://image.slidesdocs.com/responsive-images/background/light-clothes-clothing-place-shopping-supermarket-powerpoint-background_4403dbcea4__960_540.jpg', alt: 'Slide 1' },
    { url: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/66653e61158735.5a65ce61012fb.jpg', alt: 'Slide 2' },
    { url: 'https://thumbs.dreamstime.com/b/mannequin-lady-fashion-shop-clothing-store-interior-view-women-woman-retail-207568072.jpg', alt: 'Slide 3' },
];

// const dummyNewProducts = [
//     { id: 1, name: 'New Gadget Pro', price: 299.99, imageUrl: 'https://via.placeholder.com/300x200/FFA500/000000?text=New+Product+1' },
//     { id: 2, name: 'Modern Chair 2.0', price: 149.50, imageUrl: 'https://via.placeholder.com/300x200/87CEEB/000000?text=New+Product+2' },
//     { id: 3, name: 'Smart Watch Lite', price: 99.00, imageUrl: 'https://via.placeholder.com/300x200/98FB98/000000?text=New+Product+3' },
//     { id: 4, name: 'Wireless Earbuds X', price: 75.00, imageUrl: 'https://via.placeholder.com/300x200/DDA0DD/000000?text=New+Product+4' },
// ];

// const dummyPopularProducts = [
//     { id: 5, name: 'Classic Backpack', price: 45.00, imageUrl: 'https://via.placeholder.com/300x200/F0E68C/000000?text=Popular+1' },
//     { id: 1, name: 'New Gadget Pro', price: 299.99, imageUrl: 'https://via.placeholder.com/300x200/FFA500/000000?text=Popular+2+(Same+as+New)' }, // Can be popular and new
//     { id: 6, name: 'Coffee Maker Deluxe', price: 89.95, imageUrl: 'https://via.placeholder.com/300x200/E9967A/000000?text=Popular+3' },
//     { id: 7, name: 'Yoga Mat Premium', price: 35.00, imageUrl: 'https://via.placeholder.com/300x200/AFEEEE/000000?text=Popular+4' },
//     { id: 8, name: 'Desk Lamp Adjustable', price: 55.00, imageUrl: 'https://via.placeholder.com/300x200/FFC0CB/000000?text=Popular+5' },
// ];

// const dummyRandomProducts = [
//     { id: 5, name: 'Classic Backpack', price: 45.00, imageUrl: 'https://via.placeholder.com/300x200/F0E68C/000000?text=Popular+1' },
//     { id: 1, name: 'New Gadget Pro', price: 299.99, imageUrl: 'https://via.placeholder.com/300x200/FFA500/000000?text=Popular+2+(Same+as+New)' }, // Can be popular and new
//     { id: 6, name: 'Coffee Maker Deluxe', price: 89.95, imageUrl: 'https://via.placeholder.com/300x200/E9967A/000000?text=Popular+3' },
//     { id: 7, name: 'Yoga Mat Premium', price: 35.00, imageUrl: 'https://via.placeholder.com/300x200/AFEEEE/000000?text=Popular+4' },
//     { id: 8, name: 'Desk Lamp Adjustable', price: 55.00, imageUrl: 'https://via.placeholder.com/300x200/FFC0CB/000000?text=Popular+5' },
// ];


const HomePage = () => {
    const [sliderImages, setSliderImages] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [randomProducts, setRandomProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        // fetch home page data
        const fetchHomePageData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace these timeouts with actual fetch/axios calls to your API
                // const sliderResponse = await fetch('/api/slides');
                // const sliderData = await sliderResponse.json();
                // setSliderImages(sliderData);

                const newProductsResponse = await fetch('https://localhost:8081/api/dashboard/Products/list');
                const newProductsData = await newProductsResponse.json();
                setNewProducts(newProductsData);

                const popularProductsResponse = await fetch('https://localhost:8081/api/dashboard/Products/list');
                const popularProductsData = await popularProductsResponse.json();
                console.log(popularProductsData)
                setPopularProducts(popularProductsData);

                setRandomProducts(popularProductsData);

                // Simulating network delay
                // await new Promise(resolve => setTimeout(resolve, 500)); // Simulate 0.5 second delay

                // dummy data
                setSliderImages(dummySliderImages);
                // setNewProducts(dummyNewProducts);
                // setPopularProducts(dummyPopularProducts);
                // setRandomProducts(dummyRandomProducts);

            } catch (err) {
                console.error("Failed to fetch homepage data:", err);
                setError("Could not load data. Please try refreshing the page.");
            } finally {
                setLoading(false);
            }
        };

        fetchHomePageData();
    }, []); 

    if (loading ) {
        return <div>loading....</div>
    }
    if (error) {
        return  <div>{error}</div>
    }
    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <HomePagleSlider images={sliderImages} />
            <HomeNewProducts products={newProducts} />
            <HomePagePopularProducts products={popularProducts} />
            <HomeRandomProducts products={randomProducts} />
        </div>
    );
};

export default HomePage;


