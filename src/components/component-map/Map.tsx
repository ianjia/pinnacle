import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null) {
      return;
    }

    // Set bounds to the United States
    const usBounds: L.LatLngBoundsExpression = [
      [24.396308, -125.0], // Southwest coordinates (approx.)
      [49.384358, -66.93457], // Northeast coordinates (approx.)
    ];

    mapRef.current = L.map('map', {
        center: [37.8, -96.9], // Geographic center of the contiguous US
        zoom: 4,
        minZoom: 4, // Prevent zooming out too much
        maxZoom: 10, // Allow zooming in to street level
        maxBounds: usBounds, // Restrict the view to the defined bounds
        maxBoundsViscosity: 1.0, // Ensures the map bounces back when the user tries to pan outside bounds
      });

    // Add a tile layer with English labels
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);

    // Add a marker example
    L.marker([37.8, -96.9]).addTo(mapRef.current)
      .bindPopup('Center of the US')
      .openPopup();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default Map;
