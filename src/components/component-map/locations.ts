export interface Location {
    lat: number;
    lng: number;
    name: string;
    url: string;
  }
  
  export const locations: Location[] = [
    { lat: 37.7749, lng: -122.4194, name: 'San Francisco, CA', url: 'https://www.sfgov.org/' },
    { lat: 34.0522, lng: -118.2437, name: 'Los Angeles, CA', url: 'https://www.lacity.org/' },
    { lat: 40.7128, lng: -74.0060, name: 'New York, NY', url: 'https://www.nyc.gov/' },
    { lat: 41.8781, lng: -87.6298, name: 'Chicago, IL', url: 'https://www.chicago.gov/' },
    // Add more locations as needed
  ];
  