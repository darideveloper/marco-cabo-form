// Mock server for development/testing purposes
// This simulates API endpoints for the booking form

// Mock VIP codes (for demo purposes)
const validVIPCodes = ['VIP123', 'VIP456', 'VIP789', 'VIPDEMO'];

// Mock vehicles data
const mockVehicles = [
  { id: 'suburban', name: 'Suburban', capacity: 6 },
  { id: 'van', name: 'Van', capacity: 12 },
  { id: 'sprinter', name: 'Sprinter', capacity: 14 }
];

// Mock locations data
const mockLocations = [
  { id: 'airport', name: 'Los Cabos International Airport (SJD)' },
  { id: 'hotel', name: 'Hotel Pickup' },
  { id: 'address', name: 'Custom Address' }
];

// Mock zones data
const mockZones = [
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

// Mock hotels data by zone
const mockHotelsByZone = {
  'San Jose': [
    { name: 'Alegranza', oneWay: { suburban: 90, van: 100, sprinter: 130 }, roundTrip: { suburban: 170, van: 180, sprinter: 230 } },
    { name: 'Royal Solaris Gran Faro', oneWay: { suburban: 90, van: 100, sprinter: 130 }, roundTrip: { suburban: 170, van: 180, sprinter: 230 } },
    { name: 'Cabo Azul', oneWay: { suburban: 90, van: 100, sprinter: 130 }, roundTrip: { suburban: 170, van: 180, sprinter: 230 } },
    { name: 'Casa Natalia', oneWay: { suburban: 90, van: 100, sprinter: 130 }, roundTrip: { suburban: 170, van: 180, sprinter: 230 } },
    { name: 'Hyatt Place', oneWay: { suburban: 90, van: 100, sprinter: 130 }, roundTrip: { suburban: 170, van: 180, sprinter: 230 } },
    { name: 'Hyatt Ziva', oneWay: { suburban: 90, van: 100, sprinter: 130 }, roundTrip: { suburban: 170, van: 180, sprinter: 230 } }
  ],
  'Puerto Los Cabos': [
    { name: 'Hotel El Ganzo', oneWay: { suburban: 120, van: 130, sprinter: 165 }, roundTrip: { suburban: 230, van: 240, sprinter: 300 } },
    { name: 'Acre', oneWay: { suburban: 120, van: 130, sprinter: 165 }, roundTrip: { suburban: 230, van: 240, sprinter: 300 } },
    { name: 'Secrets Puerto Los Cabos', oneWay: { suburban: 120, van: 130, sprinter: 165 }, roundTrip: { suburban: 230, van: 240, sprinter: 300 } },
    { name: 'JW Marriott', oneWay: { suburban: 120, van: 130, sprinter: 165 }, roundTrip: { suburban: 230, van: 240, sprinter: 300 } }
  ],
  'Corridor': [
    { name: 'Cabo Surf Hotel', oneWay: { suburban: 105, van: 115, sprinter: 150 }, roundTrip: { suburban: 200, van: 210, sprinter: 270 } },
    { name: 'Casa del Mar', oneWay: { suburban: 105, van: 115, sprinter: 150 }, roundTrip: { suburban: 200, van: 210, sprinter: 270 } },
    { name: 'Chileno Bay Resort', oneWay: { suburban: 105, van: 115, sprinter: 150 }, roundTrip: { suburban: 200, van: 210, sprinter: 270 } },
    { name: 'Dreams Los Cabos', oneWay: { suburban: 105, van: 115, sprinter: 150 }, roundTrip: { suburban: 200, van: 210, sprinter: 270 } },
    { name: 'Four Seasons Cabo del Sol', oneWay: { suburban: 105, van: 115, sprinter: 150 }, roundTrip: { suburban: 200, van: 210, sprinter: 270 } }
  ],
  'Cabo San Lucas': [
    { name: 'Bahia', oneWay: { suburban: 120, van: 130, sprinter: 165 }, roundTrip: { suburban: 230, van: 240, sprinter: 300 } },
    { name: 'Breathless Los Cabos', oneWay: { suburban: 120, van: 130, sprinter: 165 }, roundTrip: { suburban: 230, van: 240, sprinter: 300 } },
    { name: 'Casa Dorada', oneWay: { suburban: 120, van: 130, sprinter: 165 }, roundTrip: { suburban: 230, van: 240, sprinter: 300 } },
    { name: 'Esperanza', oneWay: { suburban: 120, van: 130, sprinter: 165 }, roundTrip: { suburban: 230, van: 240, sprinter: 300 } },
    { name: 'Hacienda Encantada', oneWay: { suburban: 120, van: 130, sprinter: 165 }, roundTrip: { suburban: 230, van: 240, sprinter: 300 } }
  ],
  'Pacifico': [
    { name: 'Novaispania', oneWay: { suburban: 130, van: 140, sprinter: 200 }, roundTrip: { suburban: 230, van: 260, sprinter: 280 } },
    { name: 'Playa Grande Los Cabos', oneWay: { suburban: 130, van: 140, sprinter: 200 }, roundTrip: { suburban: 230, van: 260, sprinter: 280 } },
    { name: 'Pueblo Bonito Pacifica', oneWay: { suburban: 130, van: 140, sprinter: 200 }, roundTrip: { suburban: 230, van: 260, sprinter: 280 } },
    { name: 'St. Regis Los Cabs', oneWay: { suburban: 130, van: 140, sprinter: 200 }, roundTrip: { suburban: 230, van: 260, sprinter: 280 } }
  ],
  'Diamante': [
    { name: 'Dimante Cabo San Lucas', oneWay: { suburban: 140, van: 150, sprinter: 230 }, roundTrip: { suburban: 270, van: 280, sprinter: 430 } },
    { name: 'Grand Solmar at Rancho San Lucas', oneWay: { suburban: 140, van: 150, sprinter: 230 }, roundTrip: { suburban: 270, van: 280, sprinter: 430 } },
    { name: 'Hard Rock Hotel Los Cabos', oneWay: { suburban: 140, van: 150, sprinter: 230 }, roundTrip: { suburban: 270, van: 280, sprinter: 430 } },
    { name: 'Nobu Los Cabos', oneWay: { suburban: 140, van: 150, sprinter: 230 }, roundTrip: { suburban: 270, van: 280, sprinter: 430 } }
  ],
  'Todos Santos': [
    { name: 'Cerritos Beach Hotel', oneWay: { suburban: 320, van: 385, sprinter: 515 }, roundTrip: { suburban: 640, van: 770, sprinter: 1030 } },
    { name: 'Hotel Guaycura', oneWay: { suburban: 320, van: 385, sprinter: 515 }, roundTrip: { suburban: 640, van: 770, sprinter: 1030 } },
    { name: 'Paradero', oneWay: { suburban: 320, van: 385, sprinter: 515 }, roundTrip: { suburban: 640, van: 770, sprinter: 1030 } },
    { name: 'Kimpton Mas Olas Resort and Spa', oneWay: { suburban: 320, van: 385, sprinter: 515 }, roundTrip: { suburban: 640, van: 770, sprinter: 1030 } }
  ],
  'Cabo del Este': [
    { name: 'Four Seasons at Costa Palmas', oneWay: { suburban: 230, van: 260, sprinter: 300 }, roundTrip: { suburban: 420, van: 500, sprinter: 570 } },
    { name: 'Hotel Palmas de Cortez', oneWay: { suburban: 230, van: 260, sprinter: 300 }, roundTrip: { suburban: 420, van: 500, sprinter: 570 } },
    { name: 'Los Barriles Hotel', oneWay: { suburban: 230, van: 260, sprinter: 300 }, roundTrip: { suburban: 420, van: 500, sprinter: 570 } }
  ],
  'La Paz': [
    { name: 'La Paz - Villa or Hotel', oneWay: { suburban: 460, van: 540, sprinter: 585 }, roundTrip: { suburban: 900, van: 1050, sprinter: 1000 } }
  ]
};

// Mock price calculation
const calculateMockPrice = (zone, hotel, transport, serviceType) => {
  const basePrices = {
    suburban: { oneWay: 90, roundTrip: 170 },
    van: { oneWay: 100, roundTrip: 180 },
    sprinter: { oneWay: 130, roundTrip: 230 }
  };
  
  const servicePrices = serviceType === 'Round Trip' ? 'roundTrip' : 'oneWay';
  return basePrices[transport]?.[servicePrices] || 0;
};

// Mock API endpoints
export const mockAPI = {
  // VIP code validation
  validateVIPCode: async (code) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return validVIPCodes.includes(code.toUpperCase());
  },

  // Get vehicles
  getVehicles: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockVehicles;
  },

  // Get locations
  getLocations: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockLocations;
  },

  // Get zones
  getZones: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockZones;
  },

  // Get hotels by zone
  getHotelsByZone: async (zoneName) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockHotelsByZone[zoneName] || [];
  },

  // Get prices
  getPrices: async (zone, hotel, transport, serviceType) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return calculateMockPrice(zone, hotel, transport, serviceType);
  },

  // Submit booking
  submitBooking: async (bookingData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate validation
    if (!bookingData.name || !bookingData.email) {
      throw new Error('Missing required fields');
    }
    
    return {
      success: true,
      bookingId: 'BK' + Date.now(),
      message: 'Booking submitted successfully'
    };
  }
};

// Export for use in services.js
export default mockAPI; 