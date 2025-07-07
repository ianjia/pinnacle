import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const base = process.env.PUBLIC_URL || ''

export const redIcon = L.icon({
  iconUrl: `${base}/assets/images/leaf-red.png`,
  iconSize: [18, 38],
  iconAnchor: [9, 38], // center bottom
  popupAnchor: [0, -38],
});

export const orangeIcon = L.icon({
  iconUrl: `${base}/assets/images/leaf-yellow.png`,
  iconSize: [18, 38],
  iconAnchor: [9, 38],
  popupAnchor: [0, -38],
});

export const yellowIcon = L.icon({
  iconUrl: `${base}/assets/images/leaf-green.png`,
  iconSize: [18, 38],
  iconAnchor: [9, 38],
  popupAnchor: [0, -38],
});

export const blueIcon = L.icon({
  iconUrl: `${base}/assets/images/leaf-blue.png`,
  iconSize: [18, 38],
  iconAnchor: [9, 38],
  popupAnchor: [0, -38],
});
