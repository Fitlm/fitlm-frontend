import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';

const ImageSlider = ({ images }) => {
    return (
        <Carousel autoPlay showThumbs={false} infiniteLoop>
            {images.map(image => (
                <div key={image}>
                    <img
                        src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
                        alt={image}
                        className='w-full max-h-[150px]'
                    />
                </div>
            ))}
        </Carousel>
    )
}

ImageSlider.propTypes = {
    images: PropTypes.array.isRequired // images가 배열이고 필수로 전달되어야 함
};


export default ImageSlider