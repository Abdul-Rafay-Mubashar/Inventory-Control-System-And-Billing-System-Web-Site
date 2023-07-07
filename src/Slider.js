import React, { useState, useEffect } from 'react';

const AutoSlider = ({ interval = 3000 }) => {
  const images = [
    'https://thenewsmen.co.in/public/upload/news/story_image_1661166146.jpg','https://media.gettyimages.com/id/1171492809/photo/prime-minister-of-pakistan-imran-khan-addresses-the-united-nations-general-assembly-at-un.jpg?s=612x612&w=gi&k=20&c=mCD3JIbncfCjxEhBY2vm74FwVZuMLuUhYnKGyDu3fH4=','https://newsimage.radio.gov.pk/20201126/12824844071606359241.jpg','https://i.brecorder.com/large/2020/11/5fbe52ec79762.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="slider">
      <div
        className="slider-container"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div className="slider-item" key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoSlider;