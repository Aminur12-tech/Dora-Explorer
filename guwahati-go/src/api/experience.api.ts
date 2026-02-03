const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/experience';

export const fetchDiscoverExperiences = async () => {
  const res = await fetch(`${API_BASE}/discover`);
  if (!res.ok) throw new Error('Failed to fetch experiences');
  return res.json();
};

export const fetchExperienceById = async (id: string) => {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch experience');
  return res.json();
};

export const requestBooking = async (payload: any) => {
  const res = await fetch(`${API_BASE}/booking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create booking');
  return res.json();
};

export default {
  fetchDiscoverExperiences,
  fetchExperienceById,
  requestBooking,
};
