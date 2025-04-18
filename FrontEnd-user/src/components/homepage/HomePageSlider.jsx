import React from "react";
import Slider from 'react-slick';

const HomePagleSlider = ({ images }) => {
    if (!images || images.length === 0) {
        return null; // Don't render slider if no images
    }

    // Settings for the react-slick slider
    // See react-slick documentation for more options
    const settings = {
        dots: true, // Show dot indicators
        infinite: true, // Loop the slider
        speed: 500, // Transition speed in ms
        slidesToShow: 1, // Show one slide at a time
        slidesToScroll: 1, // Scroll one slide at a time
        autoplay: true, // Automatically change slides
        autoplaySpeed: 3000, // Delay between slides in ms
        pauseOnHover: true, // Pause autoplay on hover
        adaptiveHeight: true, // Adjust height based on slide content
    };

    return (
        <div className="image-slider-container">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="slider-item">
                        <img src={image.url} alt={image.alt || `Slide ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default HomePagleSlider;