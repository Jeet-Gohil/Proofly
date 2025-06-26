'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface GeoData {
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country: string;
}

interface Props {
  liveLocations: GeoData[];
}

const MapAutoFocus: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  map.setView(center, 4); // Adjust zoom level as needed
  return null;
};

const GeoMapContainer: React.FC<Props> = ({ liveLocations }) => {
 

  return (
    <div className="w-full flex flex-col items-center mt-10 space-y-6">
      {/* Toggle Button */}
      
      {/* Map Display with Framer Motion */}
      <AnimatePresence>
         
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-5xl h-[60vh] rounded-xl overflow-hidden border border-gray-700"
          >
            <MapContainer
              center={[20.5937, 78.9629]} // India center
              zoom={4}
              scrollWheelZoom={true}
              className="h-full w-full z-10"
            >
              <TileLayer
  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
/>


              {liveLocations.map((loc, idx) =>
                typeof loc.latitude === 'number' && typeof loc.longitude === 'number' ? (
                  <CircleMarker
                    key={idx}
                    center={[loc.latitude, loc.longitude]}
                    radius={10}
                    pathOptions={{
                      color: '#ff4d4f',
                      fillColor: '#ff4d4f',
                      fillOpacity: 0.6,
                    }}
                  />
                ) : null
              )}

              {liveLocations.length > 0 && (
                <MapAutoFocus center={[liveLocations[0].latitude, liveLocations[0].longitude]} />
              )}
            </MapContainer>
          </motion.div>
        
      </AnimatePresence>
    </div>
  );
};

export default GeoMapContainer;
