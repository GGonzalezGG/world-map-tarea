import React, { useState, useRef, useEffect } from 'react';
import geoJson from '../data/countries.geo.json';
import { handleWheel, handleMouseDown, handleMouseMove } from './handleMovement';
import CountryInfoPanel from './CountryInfoPanel.js';

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [panelPosition, setPanelPosition] = useState({ x: 20, y: 20 });
  const [isDraggingPanel, setIsDraggingPanel] = useState(false);
  const svgRef = useRef(null);
  const panelRef = useRef(null);

  const DEFAULT_COLOR = '#60A5FA';
  const HOVER_COLOR = '#1D4ED8';

  const geoPathToSvgPath = (geometry) => {
    const scale = (coord) => [
      (coord[0] + 180) * (1000 / 360),
      (90 - coord[1]) * (500 / 180)
    ];
    
    const polygonToPath = (coordinates) => {
      const paths = coordinates.map(ring => {
        const points = ring.map(coord => scale(coord).join(","));
        return "M" + points.join("L") + "Z";
      });
      return paths.join(" ");
    };

    if (geometry.type === "Polygon") {
      return polygonToPath(geometry.coordinates);
    } else if (geometry.type === "MultiPolygon") {
      return geometry.coordinates
        .map(polygonCoords => polygonToPath(polygonCoords))
        .join(" ");
    }
    return "";
  };

  const handlePanelDragStart = (e) => {
    if (e.target.classList.contains('panel-handle')) {
      setIsDraggingPanel(true);
    }
  };

  const handlePanelDragMove = (e) => {
    if (isDraggingPanel && panelRef.current) {
      const newX = e.clientX - panelRef.current.offsetWidth;
      const newY = e.clientY; // Offset from cursor
      setPanelPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsDraggingPanel(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handlePanelDragMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handlePanelDragMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingPanel]);

  return (
    <div className="relative h-screen">
      {/* Map Section */}
      <div className="h-full">
        <div className="p-4 h-full">
          <div className="bg-white rounded-lg shadow-md h-full">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">Interactive World Map</h2>
            </div>
            <div className="p-4 h-[calc(100%-5rem)]">
              <div 
                className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden cursor-move"
                onWheel={(e) => handleWheel(e, svgRef, setTransform)}
                onMouseDown={(e) => handleMouseDown(e, setIsDragging, setDragStart, transform)}
                onMouseMove={(e) => handleMouseMove(e, isDragging, dragStart, svgRef, setTransform)}
              >
                <svg 
                  ref={svgRef}
                  viewBox="0 0 1000 500" 
                  className="w-full h-full"
                >
                  <g 
                    transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}
                    style={{ transition: isDragging ? 'none' : 'transform 0.1s' }}
                  >
                    <rect x="0" y="0" width="1000" height="500" fill="#e6f3ff" />
                    {geoJson.features.map((feature) => (
                      <path
                        key={feature.id}
                        d={geoPathToSvgPath(feature.geometry)}
                        fill={hoveredCountry === feature.id ? HOVER_COLOR : DEFAULT_COLOR}
                        stroke="#3b82f6"
                        strokeWidth={0.5 / transform.scale}
                        style={{ transition: 'fill 0.3s' }}
                        onMouseEnter={() => setHoveredCountry(feature.id)}
                        onMouseLeave={() => setHoveredCountry(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCountry(feature.properties);
                        }}
                      >
                        <title>{feature.properties.name}</title>
                      </path>
                    ))}
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable Info Panel */}
      {selectedCountry && (
        <div 
          ref={panelRef}
          className="fixed z-50 w-80"
          style={{
            left: `${panelPosition.x}px`,
            top: `${panelPosition.y}px`,
            cursor: isDraggingPanel ? 'grabbing' : 'grab',
          }}
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div 
              className="panel-handle bg-blue-500 text-white p-2 flex justify-between items-center cursor-grab active:cursor-grabbing"
              onMouseDown={handlePanelDragStart}
            >
              
              <button 
                onClick={() => setSelectedCountry(null)}
                className="text-white hover:text-gray-200 px-2"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <CountryInfoPanel 
                country={selectedCountry}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldMap;