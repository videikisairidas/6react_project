import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ProductCard from '../ProductCard';

const HomeNewProducts = ({ products }) => {
    if (!products || products.length === 0) {
        return (
            <div className="product-carousel-section">
                <h2>{title}</h2>
                <p>No products to display.</p>
            </div>
        );
    }

    const settings = {
        dots: false, // Usually hide dots for product carousels
        infinite: false, // Set to true if you want infinite looping, false stops at ends
        speed: 500,
        slidesToShow: 5, // Default number of slides to show
        slidesToScroll: 3, // Default number of slides to scroll
        initialSlide: 0,
        autoplay: false, // Usually disable autoplay for product carousels
        pauseOnHover: true,
        // Responsive settings
        responsive: [
            {
                breakpoint: 1400, // Large desktops
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: products.length > 4 // Enable infinite if enough items
                }
            },
            {
                breakpoint: 1024, // Desktops
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: products.length > 3
                }
            },
            {
                breakpoint: 768, // Tablets
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480, // Mobile phones
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="product-carousel-section">
            <h2>New Products</h2>
            <div className="product-carousel-container">
                <Slider {...settings}>
                    {products.map((product) => (
                        <div key={product.id} className="product-slide-item">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}

export default HomeNewProducts;