import React from 'react';
import { X, Globe, Flag, Users, MapPin } from 'lucide-react';

const CountryInfoPanel = ({ country, onClose }) => {
  if (!country) return null;

  return (
    <div className="h-full bg-white border-l border-gray-200 shadow-lg overflow-y-auto">
      <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-bold text-gray-900">{country.name}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        </div>
      
      <div className="p-4 space-y-6">
        <img 
          src={`/api/placeholder/384/216`}
          alt={`Landscape of ${country.name}`}
          className="w-full h-48 object-cover rounded-lg"
        />
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Globe className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Region</p>
              <p className="text-base text-gray-900">{country.region || 'Not available'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Flag className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Country Code</p>
              <p className="text-base text-gray-900">{country.iso_a3}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Capital</p>
              <p className="text-base text-gray-900">{country.capital || 'Not available'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Population</p>
              <p className="text-base text-gray-900">
                {country.pop_est ? country.pop_est.toLocaleString() : 'Not available'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-600">
            Information about {country.name} would go here. This could include 
            details about the country's history, culture, economy, or other 
            interesting facts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryInfoPanel;