import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { CollegeMapData } from './data-types';
import { useMapDataFromCollegeNames } from './hooks/use-college-map-data-from-name';
import { blueIcon, orangeIcon, redIcon, yellowIcon } from './marker-icons';
import { MarkerPopup } from './marker-pop-up';

interface MapProps {
  collegeNameList: string[];
}

export const NavigationMap: React.FC<MapProps> = ({ collegeNameList }) => {
  const mapRef = useRef<L.Map | null>(null);

  // 1. Get an array of CollegeMapData from the custom hook
  const mapData: CollegeMapData[] = useMapDataFromCollegeNames(collegeNameList);

  useEffect(() => {
    if (mapRef.current !== null) {
      return;
    }

    const usBounds: L.LatLngBoundsExpression = [
      [24.396308, -125.0], // Southwest
      [49.384358, -66.93457], // Northeast
    ];

    // Create and store the Leaflet map
    mapRef.current = L.map('map', {
      center: [37.8, -96.9],
      zoom: 4,
      minZoom: 4,
      maxZoom: 10,
      maxBounds: usBounds,
      maxBoundsViscosity: 1.0,
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    // 2. For each college in mapData, create a marker + popup
    mapData.forEach((college) => {
      const { loc, category } = college;

      if (!loc) return; // no location info, skip

      // Decide which icon to use based on category
      let iconToUse = blueIcon;
      if (category === 1) {
        iconToUse = redIcon;
      } else if (category === 2) {
        iconToUse = orangeIcon;
      } else if (category === 3) {
        iconToUse = yellowIcon;
      }

      // Create a container to render our React popup into
      const popupContainer = L.DomUtil.create('div');
      const root = createRoot(popupContainer);
      root.render(<MarkerPopup data={college} />);

      // Create a Leaflet marker
      const marker = L.marker([loc.latitude, loc.longitude], { icon: iconToUse })
        .addTo(mapRef.current!)
        .bindPopup(popupContainer, { autoClose: false });

      // If you want to unmount the component when the popup closes, do so below:
      // marker.on('popupclose', () => {
      //   root.unmount();
      // });

      // Keep track of whether mouse is over the marker or popup
      let isMouseOverMarker = false;
      let isMouseOverPopup = false;

      // We'll store a timeout ID to close the popup after a slight delay
      let closePopupTimeout: ReturnType<typeof setTimeout> | null = null;

      // A small helper to schedule the popup close Below is one common approach to make the popup less “touchy” when the mouse moves away. The basic idea is:
      // Use a small delay before closing the popup (e.g., 500ms).
      // If the mouse re-enters the marker or popup within that delay, cancel the close.
      const schedulePopupClose = () => {
        // Only schedule if there's no existing timer
        if (closePopupTimeout) return;

        closePopupTimeout = setTimeout(() => {
          // After the delay, only close if mouse is still out
          if (!isMouseOverMarker && !isMouseOverPopup) {
            marker.closePopup();
          }
          closePopupTimeout = null;
        }, 500); 
      };

      marker.on('mouseover', () => {
        isMouseOverMarker = true;
        // If a close was scheduled, cancel it
        if (closePopupTimeout) {
          clearTimeout(closePopupTimeout);
          closePopupTimeout = null;
        }
        marker.openPopup();
      });

      marker.on('mouseout', (e) => {
        const toElement = (e.originalEvent as MouseEvent).relatedTarget as HTMLElement;
        // If mouse goes to the popup itself or the marker icon again, do nothing
        if (
          toElement &&
          (toElement.closest('.leaflet-popup') ||
            toElement.closest('.leaflet-marker-icon'))
        ) {
          return;
        }
        isMouseOverMarker = false;
        // Otherwise, start the close schedule
        schedulePopupClose();
      });

      marker.on('popupopen', () => {
        const popupElement = document.querySelector('.leaflet-popup') as HTMLElement;
        if (!popupElement) return;

        popupElement.addEventListener('mouseover', () => {
          isMouseOverPopup = true;
          // Cancel any scheduled close
          if (closePopupTimeout) {
            clearTimeout(closePopupTimeout);
            closePopupTimeout = null;
          }
        });

        popupElement.addEventListener('mouseout', (evt) => {
          const toElem = evt.relatedTarget as HTMLElement;
          if (
            toElem &&
            (toElem.closest('.leaflet-popup') ||
              toElem.closest('.leaflet-marker-icon'))
          ) {
            return;
          }
          isMouseOverPopup = false;
          schedulePopupClose();
        });
      });
    });

    // Cleanup when the component unmounts
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapData]);

  // Final render: just the map container
  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};
