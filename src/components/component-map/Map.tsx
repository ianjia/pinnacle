import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { locations } from './locations';

// Import marker icon and shadow images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Define the custom icon
const customIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

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

    // Add markers for each location with the custom icon
    locations.forEach(location => {
      const popupContent = `<a href="${location.url}" target="_blank">${location.name}</a>`;
      const marker = L.marker([location.lat, location.lng], { icon: customIcon })
        .addTo(mapRef.current!)
        .bindPopup(popupContent, { autoClose: false });

      let isMouseOverMarker = false;
      let isMouseOverPopup = false;

      // Open the popup when the mouse enters the marker
      marker.on('mouseover', () => {
        marker.openPopup();
        isMouseOverMarker = true;
      });

      // Close the popup only when the mouse leaves both the marker and the pop-up
      marker.on('mouseout', (e) => {
        const toElement = (e.originalEvent as MouseEvent).relatedTarget as HTMLElement;
        if (toElement && (toElement.closest('.leaflet-popup') || toElement.closest('.leaflet-marker-icon'))) {
          return; // Mouse moved into the popup or another marker, don't close
        }
        isMouseOverMarker = false;
        if (!isMouseOverPopup) {
          marker.closePopup();
        }
      });

      // Handle mouse enter and leave events for the popup itself
      marker.on('popupopen', () => {
        const popupElement = document.querySelector('.leaflet-popup') as HTMLElement;
        
        if (popupElement) {
          popupElement.addEventListener('mouseover', () => {
            isMouseOverPopup = true;
          });

          popupElement.addEventListener('mouseout', (e) => {
            const toElement = (e.relatedTarget as HTMLElement);
            if (toElement && (toElement.closest('.leaflet-popup') || toElement.closest('.leaflet-marker-icon'))) {
              return; // Mouse moved into the marker or another popup, don't close
            }
            isMouseOverPopup = false;
            if (!isMouseOverMarker) {
              marker.closePopup();
            }
          });
        }
      });
    });

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
