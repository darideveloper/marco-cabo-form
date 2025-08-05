"use client";

import { useState } from "react";

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

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
  };
};

export default useFormData;
