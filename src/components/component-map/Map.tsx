import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapDataFromCollegeNames } from './hooks/use-map-data-from-college-names';
import { CollegeNamePair } from './map-data-types';

// Define custom icons with local assets and without shadow images
const redIcon = L.icon({
  iconUrl: require('../../assets/images/leaf-red.png'), // Local asset
  iconSize: [18, 38], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const orangeIcon = L.icon({
  iconUrl: require('../../assets/images/leaf-yellow.png'),
  iconSize: [18, 38], 
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

const yellowIcon = L.icon({
  iconUrl: require('../../assets/images/leaf-green.png'),
  iconSize: [18, 38], 
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

const blueIcon = L.icon({
  iconUrl: require('../../assets/images/leaf-blue.png'),
  iconSize: [18, 38], 
  iconAnchor: [22, 94],
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

    const usBounds: L.LatLngBoundsExpression = [
      [24.396308, -125.0], // Southwest coordinates (approx.)
      [49.384358, -66.93457], // Northeast coordinates (approx.)
    ];

    mapRef.current = L.map('map', {
      center: [37.8, -96.9],
      zoom: 4,
      minZoom: 4,
      maxZoom: 10,
      maxBounds: usBounds,
      maxBoundsViscosity: 1.0,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    mapData.forEach(({ collegeName, category, location }) => {
      if (!location) return;

      const icon = category === 1 ? redIcon : category === 2 ? orangeIcon : category === 3 ? yellowIcon : blueIcon;

      const popupContent = `<a href="${location.url.href}" target="_blank">${collegeName}</a>`;
      const marker = L.marker(
        [location.loc.latitude, location.loc.longitude],
        { icon }
      )
        .addTo(mapRef.current!)
        .bindPopup(popupContent, { autoClose: false });

      let isMouseOverMarker = false;
      let isMouseOverPopup = false;

      marker.on('mouseover', () => {
        marker.openPopup();
        isMouseOverMarker = true;
      });

      marker.on('mouseout', (e) => {
        const toElement = (e.originalEvent as MouseEvent).relatedTarget as HTMLElement;
        if (toElement && (toElement.closest('.leaflet-popup') || toElement.closest('.leaflet-marker-icon'))) {
          return;
        }
        isMouseOverMarker = false;
        if (!isMouseOverPopup) {
          marker.closePopup();
        }
      });

      marker.on('popupopen', () => {
        const popupElement = document.querySelector('.leaflet-popup') as HTMLElement;

        if (popupElement) {
          popupElement.addEventListener('mouseover', () => {
            isMouseOverPopup = true;
          });

          popupElement.addEventListener('mouseout', (e) => {
            const toElement = (e.relatedTarget as HTMLElement);
            if (toElement && (toElement.closest('.leaflet-popup') || toElement.closest('.leaflet-marker-icon'))) {
              return;
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
