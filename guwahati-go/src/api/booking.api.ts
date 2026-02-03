import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/experience';

// Request a booking
export const requestBooking = async (bookingData: any) => {
  const response = await axios.post(`${BASE}/booking/request`, bookingData);
  return response.data;
};

// Create booking and get Razorpay order
export const createBooking = async (bookingData: any) => {
  const response = await axios.post(`${BASE}/booking/create`, bookingData);
  return response.data;
};

// Verify payment
export const verifyPayment = async (paymentData: any) => {
  const response = await axios.post(`${BASE}/booking/verify`, paymentData);
  return response.data;
};

// Get booking by ID
export const fetchBookingById = async (id: string) => {
  const response = await axios.get(`${BASE}/booking/${id}`);
  return response.data;
};

// Get booking confirmation
export const fetchBookingConfirmation = async (bookingId: string) => {
  const res = await fetch(`${BASE}/booking/${bookingId}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Booking not found' }));
    throw new Error(err.message || 'Booking not found');
  }
  const data = await res.json();
  return data.booking || data;
};

// Get all bookings for user
export const fetchUserBookings = async (userId: string) => {
  const response = await axios.get(`${BASE}/booking/user/${userId}`);
  return response.data;
};

// Merchant confirm booking
export const confirmBooking = async (id: string) => {
  const response = await axios.put(`${BASE}/booking/${id}/confirm`);
  return response.data;
};

// Merchant reject booking
export const rejectBooking = async (id: string, reason: string) => {
  const response = await axios.put(`${BASE}/booking/${id}/reject`, { reason });
  return response.data;
};

// Cancel booking
export const cancelBooking = async (id: string) => {
  const response = await axios.put(`${BASE}/booking/${id}/cancel`);
  return response.data;
};

// Get pending requests for merchant
export const fetchPendingBookings = async (merchantId: string) => {
  const response = await axios.get(`${BASE}/booking/merchant/${merchantId}/pending`);
  return response.data;
};

// Get confirmed bookings for merchant
export const fetchConfirmedBookings = async (merchantId: string) => {
  const response = await axios.get(`${BASE}/booking/merchant/${merchantId}/confirmed`);
  return response.data;
};

// Mark booking as completed
export const completeBooking = async (id: string) => {
  const response = await axios.put(`${BASE}/booking/${id}/complete`);
  return response.data;
};

export default {
  requestBooking,
  createBooking,
  verifyPayment,
  fetchBookingById,
  fetchBookingConfirmation,
  fetchUserBookings,
  confirmBooking,
  rejectBooking,
  cancelBooking,
  fetchPendingBookings,
  fetchConfirmedBookings,
  completeBooking
};