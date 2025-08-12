import { create } from 'zustand';
import { getPrices } from '../api/price_api';
import { getVehicles } from '../api/vehicles_api';
import { getTransferTypes } from '../api/transfer_type_api';
import { getZones } from '../api/zones_api';
import { checkVIPCode } from '../api/vip_check_api';
import { createSale } from '../api/sale_api';

const useBookingStore = create((set, get) => ({
  // Form data
  formData: {
    transport: "",
    serviceType: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    passengers: "",
    arrivalDate: "",
    arrivalTime: "",
    arrivalLocation: "",
    arrivalZone: "",
    arrivalHotel: "",
    arrivalLocationDetails: "",
    arrivalAirline: "",
    arrivalFlightNumber: "",
    priceInfo: null,
    totalPrice: null,
    vipCode: "",
    isVIPValid: false,
    departureDate: "",
    departureTime: "",
    departureAirline: "",
    departureFlightNumber: "",
    privacyConsent: false,
  },

  // API data
  vehicles: [],
  transferTypes: [],
  zones: [],
  hotels: [],

  // Loading states
  loadingStates: {
    vehicles: false,
    transferTypes: false,
    zones: false,
    hotels: false,
    prices: false,
  },

  // Actions
  updateFormData: (field, value) => {
    set((state) => ({
      formData: { ...state.formData, [field]: value }
    }));
  },

  resetFormData: () => {
    set((state) => ({
      formData: {
        transport: "",
        serviceType: "",
        name: "",
        lastName: "",
        email: "",
        phone: "",
        passengers: "",
        arrivalDate: "",
        arrivalTime: "",
        arrivalLocation: "",
        arrivalZone: "",
        arrivalHotel: "",
        arrivalLocationDetails: "",
        arrivalAirline: "",
        arrivalFlightNumber: "",
        priceInfo: null,
        totalPrice: null,
        vipCode: "",
        isVIPValid: false,
        departureDate: "",
        departureTime: "",
        departureAirline: "",
        departureFlightNumber: "",
        privacyConsent: false,
      }
    }));
  },

  setLoading: (key, isLoading) => {
    set((state) => ({
      loadingStates: { ...state.loadingStates, [key]: isLoading }
    }));
  },

  // API actions
  fetchVehicles: async () => {
    const { setLoading } = get();
    setLoading('vehicles', true);
    try {
      const vehicles = await getVehicles();
      set({ vehicles });
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading('vehicles', false);
    }
  },

  fetchTransferTypes: async () => {
    const { setLoading } = get();
    setLoading('transferTypes', true);
    try {
      const transferTypes = await getTransferTypes();
      set({ transferTypes });
    } catch (error) {
      console.error('Error fetching transfer types:', error);
    } finally {
      setLoading('transferTypes', false);
    }
  },

  fetchZones: async () => {
    const { setLoading } = get();
    setLoading('zones', true);
    try {
      const zones = await getZones();
      set({ zones });
    } catch (error) {
      console.error('Error fetching zones:', error);
    } finally {
      setLoading('zones', false);
    }
  },

  // Price calculation
  calculatePrices: async () => {
    const { formData, setLoading, updateFormData } = get();
    
    if (!formData.arrivalZone || !formData.transport || !formData.serviceType) {
      return;
    }

    setLoading('prices', true);
    try {
      console.log('Calculating prices with:', formData.arrivalZone, formData.transport, formData.serviceType);
      const prices = await getPrices(formData.arrivalZone, formData.transport, formData.serviceType);
      console.log('API Response:', prices);

      if (prices && prices.length > 0) {
        // Find the matching price for the selected vehicle and transfer type
        const matchingPrice = prices.find(price => 
          price.vehicle.id.toString() === formData.transport &&
          price.transfer_type.id.toString() === formData.serviceType
        );

        if (matchingPrice) {
          const basePrice = parseFloat(matchingPrice.price);
          const finalPrice = formData.isVIPValid ? 0 : basePrice;

          const priceInfo = {
            basePrice: basePrice,
            finalPrice: finalPrice,
            discount: formData.isVIPValid ? basePrice : 0,
            suburban: prices.find(p => p.vehicle.id === 1)?.price || 0,
            van: prices.find(p => p.vehicle.id === 2)?.price || 0,
            sprinter: prices.find(p => p.vehicle.id === 3)?.price || 0,
          };

          updateFormData('priceInfo', priceInfo);
          updateFormData('totalPrice', finalPrice);
        }
      }
    } catch (error) {
      console.error('Error calculating prices:', error);
    } finally {
      setLoading('prices', false);
    }
  },

  // Helper functions
  getVehicleName: (vehicleId) => {
    const { vehicles } = get();
    const vehicle = vehicles.find(v => v.id.toString() === vehicleId);
    return vehicle ? vehicle.name : vehicleId;
  },

  getTransferTypeName: (transferTypeId) => {
    const { transferTypes } = get();
    const transferType = transferTypes.find(t => t.id.toString() === transferTypeId);
    return transferType ? transferType.name : transferTypeId;
  },

  getZoneName: (zoneId) => {
    const { zones } = get();
    const zone = zones.find(z => z.id.toString() === zoneId);
    return zone ? zone.name : zoneId;
  },

  // VIP validation
  validateVIP: async (code) => {
    try {
      const response = await checkVIPCode(code);
      const isValid = response && response.status === "sucess";
      
      set((state) => ({
        formData: { 
          ...state.formData, 
          vipCode: code,
          isVIPValid: isValid 
        }
      }));
      
      // Always recalculate prices after VIP validation (valid or invalid)
      await get().calculatePrices();
      
      return isValid;
    } catch (error) {
      console.error('VIP validation error:', error);
      
      // Set as invalid on error
      set((state) => ({
        formData: { 
          ...state.formData, 
          vipCode: code,
          isVIPValid: false 
        }
      }));
      
      // Recalculate prices to revert to original price
      await get().calculatePrices();
      
      return false;
    }
  },

  // Submit booking data
  submitBookingData: async () => {
    const { formData, getTransferTypeName } = get();
    
    // Check if privacy consent is given
    if (!formData.privacyConsent) {
      throw new Error('Privacy consent is required');
    }

    // Prepare sale data
    const saleData = {
      service_type: parseInt(formData.serviceType),
      client_name: formData.name,
      client_last_name: formData.lastName,
      client_email: formData.email,
      client_phone: formData.phone,
      passengers: parseInt(formData.passengers),
      location: parseInt(formData.arrivalZone),
      arrival_date: formData.arrivalDate,
      arrival_time: formData.arrivalTime,
      arrival_airline: formData.arrivalAirline || "",
      arrival_flight_number: formData.arrivalFlightNumber || "",
      vehicle: parseInt(formData.transport)
    };

    // Only include VIP code if it's valid
    if (formData.isVIPValid && formData.vipCode) {
      saleData.vip_code = formData.vipCode;
    }else{
      saleData.vip_code = "";
    }

    // Add departure information only for round trip
    if (getTransferTypeName(formData.serviceType) === "Round Trip") {
      saleData.departure_date = formData.departureDate;
      saleData.departure_time = formData.departureTime;
      saleData.departure_airline = formData.departureAirline || "";
      saleData.departure_flight_number = formData.departureFlightNumber || "";
    }
    console.log('Sale data:', saleData);
    try {
      const response = await createSale(saleData);
      
      if (response.status === "success") {
        return {
          success: true,
          saleId: response.data.sale_id,
          paymentLink: response.data.payment_link
        };
      } else {
        throw new Error(response.message || 'Failed to create sale');
      }
    } catch (error) {
      console.error('Sale submission error:', error);
      throw new Error(error.message || 'Failed to submit booking');
    }
  },
}));

export default useBookingStore; 