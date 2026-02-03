import { useState } from 'react';
import {
  requestBooking,
  createBooking,
  fetchUserBookings,
  fetchBookingConfirmation,
  confirmBooking,
  rejectBooking,
  cancelBooking
} from '@/api/booking.api';

export const useBookings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestBooking = async (bookingData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await requestBooking(bookingData);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to request booking');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBooking = async (bookingData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createBooking(bookingData);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create booking');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await confirmBooking(id);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to confirm booking');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRejectBooking = async (id: string, reason: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await rejectBooking(id, reason);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reject booking');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cancelBooking(id);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to cancel booking');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserBookings = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserBookings(userId);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bookings');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getBookingConfirmation = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBookingConfirmation(id);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch confirmation');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleRequestBooking,
    handleCreateBooking,
    handleConfirmBooking,
    handleRejectBooking,
    handleCancelBooking,
    getUserBookings,
    getBookingConfirmation
  };
};