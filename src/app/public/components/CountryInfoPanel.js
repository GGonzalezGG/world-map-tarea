import React, { useState } from 'react';
import { X, Globe, Flag, Users, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { countryImages, defaultCountryImages } from './countryImages.js';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-64 mb-6 size-7">
      <img 
        src={images[currentIndex].url}
        alt={images[currentIndex].caption}
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-lg">
        <p className="text-white text-sm">{images[currentIndex].caption}</p>
      </div>
      <button 
        onClick={handlePrevious}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="absolute bottom-14 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const CountryInfoPanel = ({ country, onClose }) => {
  if (!country) return null;

  const countryData = countryImages[country.name] || defaultCountryImages;

  return (
    <div className="h-full bg-white border-l border-gray-200 shadow-lg overflow-y-auto">
      <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-bold text-gray-900">{country.name}</h2>

        </div>
      </div>
      
      <div className="flex items-center p-4 space-y-6">
        <div>
          <ImageGallery images={countryData.gallery} />
        </div>
        
        
        <div className="flex items-center space-x-4">
          <img 
            src={countryData.flag} 
            alt={`Flag of ${country.name}`} 
            className="w-16 h-10 object-cover rounded shadow"
          />
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-600 px-4 py-2">
            {countryData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryInfoPanel;