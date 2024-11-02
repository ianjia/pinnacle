import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapDataFromCollegeNames } from './hooks/use-map-data-from-college-names';
import { CollegeNamePair } from './map-data-types';

// Define custom icons similar to the Leaflet example
const redIcon = L.icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
  shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // point of the shadow which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const orangeIcon = L.icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png',
  shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76]
});

const yellowIcon = L.icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-yellow.png',
  shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76]
});

export interface MapProps {
  collegeNameList: CollegeNamePair[];
}

export const Map: React.FC<MapProps> = ({ collegeNameList }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapData = useMapDataFromCollegeNames(collegeNameList);

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
      minZoom: 4,
      maxZoom: 10,
      maxBounds: usBounds,
      maxBoundsViscosity: 1.0,
    });

    // Add a tile layer with English labels
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Add markers for each college with icons based on category
    mapData.forEach(({ collegeName, category, location }) => {
      if (!location) return;

      // Choose icon based on category: 1 -> red, 2 -> orange, 3 -> yellow
      const icon = category === 1 ? redIcon : category === 2 ? orangeIcon : yellowIcon;

      const popupContent = `<a href="${location.url.href}" target="_blank">${collegeName}</a>`;
      const marker = L.marker(
        [location.loc.latitude, location.loc.longitude],
        { icon }
      )
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
  }, [mapData]);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};
