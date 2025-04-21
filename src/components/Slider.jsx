import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Tourist from "../Small_Projects/Tourist";

const CustomSlider = () => {

    const [tourist, setTourist] = useState([]);

    useEffect(() => {
        axios.get('./data.json')
            .then(res => {
                setTourist(res.data.gallery)
                console.log(res.data.gallery);
            })
            .catch((err) => {
                console.log('Error Loading Data', err);
            })
    }, [])

    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="relative">
            {tourist.length > 0 && (
                <Slider {...settings}>
                    {tourist.map((item) => (
                        <Tourist key={item.id} data={item} />
                    ))}
                </Slider>
            )}
        </div>
    );
}

export default CustomSlider