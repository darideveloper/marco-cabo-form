// API Services for the booking form
import { mockAPI } from './mockServer';

// VIP Code validation endpoint
export const validateVIPCode = async (code) => {
  try {
    // Use mock API for development
    return await mockAPI.validateVIPCode(code);
    
    // Uncomment below for real API integration
    /*
    const response = await fetch('/api/validate-vip-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    
    if (!response.ok) {
      throw new Error('VIP code validation failed');
    }
    
    const data = await response.json();
    return data.valid;
    */
  } catch (error) {
    console.error('VIP code validation error:', error);
    // For demo purposes, accept any code that starts with 'VIP'
    return code.startsWith('VIP');
  }
};

// Get vehicles from API
export const getVehicles = async () => {
  try {
    // Use mock API for development
    return await mockAPI.getVehicles();
    
    // Uncomment below for real API integration
    /*
    const response = await fetch('/api/vehicles');
    
    if (!response.ok) {
      throw new Error('Failed to fetch vehicles');
    }
    
    const data = await response.json();
    return data.vehicles;
    */
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    // Return default vehicles for demo
    return [
      { id: 'suburban', name: 'Suburban', capacity: 6 },
      { id: 'van', name: 'Van', capacity: 12 },
      { id: 'sprinter', name: 'Sprinter', capacity: 14 }
    ];
  }
};

// Get locations from API
export const getLocations = async () => {
  try {
    // Use mock API for development
    return await mockAPI.getLocations();
    
    // Uncomment below for real API integration
    /*
    const response = await fetch('/api/locations');
    
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    
    const data = await response.json();
    return data.locations;
    */
  } catch (error) {
    console.error('Error fetching locations:', error);
    // Return default locations for demo
    return [
      { id: 'airport', name: 'Los Cabos International Airport (SJD)' },
      { id: 'hotel', name: 'Hotel Pickup' },
      { id: 'address', name: 'Custom Address' }
    ];
  }
};

// Get zones from API
export const getZones = async () => {
  try {
    // Use mock API for development
    return await mockAPI.getZones();
    
    // Uncomment below for real API integration
    /*
    const response = await fetch('/api/zones');
    
    if (!response.ok) {
      throw new Error('Failed to fetch zones');
    }
    
    const data = await response.json();
    return data.zones;
    */
  } catch (error) {
    console.error('Error fetching zones:', error);
    // Return default zones for demo
    return [
      { id: 'san-jose', name: 'San Jose' },
      { id: 'puerto-los-cabos', name: 'Puerto Los Cabos' },
      { id: 'corridor', name: 'Corridor' },
      { id: 'cabo-san-lucas', name: 'Cabo San Lucas' },
      { id: 'pacifico', name: 'Pacifico' },
      { id: 'diamante', name: 'Diamante' },
      { id: 'todos-santos', name: 'Todos Santos' },
      { id: 'cabo-del-este', name: 'Cabo del Este' },
      { id: 'la-paz', name: 'La Paz' }
    ];
  }
};

// Get hotels by zone from API
export const getHotelsByZone = async (zoneName) => {
  try {
    // Use mock API for development
    return await mockAPI.getHotelsByZone(zoneName);
    
    // Uncomment below for real API integration
    /*
    const response = await fetch(`/api/hotels?zone=${encodeURIComponent(zoneName)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch hotels');
    }
    
    const data = await response.json();
    return data.hotels;
    */
  } catch (error) {
    console.error('Error fetching hotels:', error);
    // Return empty array for demo
    return [];
  }
};

// Get prices from API
export const getPrices = async (zone, hotel, transport, serviceType) => {
  try {
    // Use mock API for development
    return await mockAPI.getPrices(zone, hotel, transport, serviceType);
    
    // Uncomment below for real API integration
    /*
    const response = await fetch('/api/prices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ zone, hotel, transport, serviceType }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch prices');
    }
    
    const data = await response.json();
    return data.price;
    */
  } catch (error) {
    console.error('Error fetching prices:', error);
    // Return default price calculation for demo
    const basePrices = {
      suburban: { oneWay: 90, roundTrip: 170 },
      van: { oneWay: 100, roundTrip: 180 },
      sprinter: { oneWay: 130, roundTrip: 230 }
    };
    
    const servicePrices = serviceType === 'Round Trip' ? 'roundTrip' : 'oneWay';
    return basePrices[transport]?.[servicePrices] || 0;
  }
};

// Submit booking data
export const submitBooking = async (bookingData) => {
  try {
    // Use mock API for development
    return await mockAPI.submitBooking(bookingData);
    
    // Uncomment below for real API integration
    /*
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    
    if (!response.ok) {
      throw new Error('Booking submission failed');
    }
    
    const data = await response.json();
    return data;
    */
  } catch (error) {
    console.error('Error submitting booking:', error);
    // For demo purposes, simulate successful submission
    return {
      success: true,
      bookingId: 'BK' + Date.now(),
      message: 'Booking submitted successfully'
    };
  }
}; 