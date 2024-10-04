'use client';
// pages/index.js
import WorldMap from './public/components/WorldMap.js';

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">World Map Explorer</h1>
      <WorldMap />
    </div>
  );
}
