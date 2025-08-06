"use client";

import { useState, useCallback } from "react";

const useFormData = () => {
  const [formData, setFormData] = useState({
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
    priceInfo: null,
    totalPrice: null,
    departureDate: "",
    departureTime: "",
    departureLocation: "",
    departureZone: "",
    departureHotel: "",
    departureLocationDetails: "",
  });

  const [loadingStates, setLoadingStates] = useState({
    vehicles: false,
    transferTypes: false,
    zones: false,
    hotels: false,
    prices: false,
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const setLoading = useCallback((key, isLoading) => {
    setLoadingStates((prev) => ({ ...prev, [key]: isLoading }));
  }, []);

  const resetFormData = () => {
    setFormData({
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
      priceInfo: null,
      totalPrice: null,
      departureDate: "",
      departureTime: "",
      departureLocation: "",
      departureZone: "",
      departureHotel: "",
      departureLocationDetails: "",
    });
  };

  return {
    formData,
    updateFormData,
    resetFormData,
    loadingStates,
    setLoading,
  };
};

export default useFormData;
