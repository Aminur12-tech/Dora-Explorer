import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/booking';

// Request a booking
export const requestBooking = async (bookingData: any) => {
  const response = await axios.post(`${API_BASE_URL}/request`, bookingData);
  return response.data;
};

// Create booking and get Razorpay order
export const createBooking = async (bookingData: any) => {
  const response = await axios.post(`${API_BASE_URL}/create`, bookingData);
  return response.data;
};

// Verify payment
export const verifyPayment = async (paymentData: any) => {
  const response = await axios.post(`${API_BASE_URL}/verify`, paymentData);
  return response.data;
};

// Get booking by ID
export const fetchBookingById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Get booking confirmation
export const fetchBookingConfirmation = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/confirmed/${id}`);
  return response.data;
};

// Get all bookings for user
export const fetchUserBookings = async (userId: string) => {
  const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
  return response.data;
};

// Merchant confirm booking
export const confirmBooking = async (id: string) => {
  const response = await axios.put(`${API_BASE_URL}/${id}/confirm`);
  return response.data;
};

// Merchant reject booking
export const rejectBooking = async (id: string, reason: string) => {
  const response = await axios.put(`${API_BASE_URL}/${id}/reject`, { reason });
  return response.data;
};

// Cancel booking
export const cancelBooking = async (id: string) => {
  const response = await axios.put(`${API_BASE_URL}/${id}/cancel`);
  return response.data;
};

// Get pending requests for merchant
export const fetchPendingBookings = async (merchantId: string) => {
  const response = await axios.get(`${API_BASE_URL}/merchant/${merchantId}/pending`);
  return response.data;
};

// Get confirmed bookings for merchant
export const fetchConfirmedBookings = async (merchantId: string) => {
  const response = await axios.get(`${API_BASE_URL}/merchant/${merchantId}/confirmed`);
  return response.data;
};

// Mark booking as completed
export const completeBooking = async (id: string) => {
  const response = await axios.put(`${API_BASE_URL}/${id}/complete`);
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