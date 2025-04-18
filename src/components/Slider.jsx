import React from "react";
import Slider from "react-slick";

const CustomSlider = () => {
    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Slider {...settings}>
            
        </Slider>
    );
}

export default CustomSlider