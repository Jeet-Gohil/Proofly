"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useEffect } from "react";

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

// Patch default icon so Next.js doesn’t break it
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapAutoFocus: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 4);
  }, [center, map]);
  return null;
};

const GeoMapContainer: React.FC<Props> = ({ liveLocations }) => {
  const defaultCenter: [number, number] =
    liveLocations.length > 0
      ? [liveLocations[0].latitude, liveLocations[0].longitude]
      : [20.5937, 78.9629];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="w-full h-[60vh] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow"
      >
        <MapContainer
          center={defaultCenter}
          zoom={4}
          scrollWheelZoom={true}
          className="h-full w-full z-10"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />

          <MarkerClusterGroup>
            {liveLocations.map((loc, idx) =>
              typeof loc.latitude === "number" &&
              typeof loc.longitude === "number" ? (
                <Marker
                  key={idx}
                  position={[loc.latitude, loc.longitude]}
                >
                  <Popup>
                    📍 <strong>{loc.city}, {loc.country}</strong><br />
                    Region: {loc.region}<br />
                    Lat: {loc.latitude.toFixed(2)}, Long: {loc.longitude.toFixed(2)}
                  </Popup>
                </Marker>
              ) : null
            )}
          </MarkerClusterGroup>

          {liveLocations.length > 0 && (
            <MapAutoFocus center={defaultCenter} />
          )}
        </MapContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default GeoMapContainer;
