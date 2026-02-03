import { useState, useEffect } from 'react';
import { fetchDiscoverExperiences, fetchExperienceById } from '@/api/experience.api';

export const useExperiences = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getExperiences = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDiscoverExperiences();
      setExperiences(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch experiences');
    } finally {
      setLoading(false);
    }
  };

  const getExperienceById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchExperienceById(id);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch experience');
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExperiences();
  }, []);

  return { experiences, loading, error, getExperiences, getExperienceById };
};