// useTrips.ts
// Mock hook for CRUD operations on trips. Replace with real API calls as needed.
import { useState } from 'react';

export interface Trip {
  id: number;
  name: string;
  start: Date;
  end: Date;
  itinerary: any[];
}

const initialTrips: Trip[] = [
  {
    id: 1,
    name: 'Sample Trip',
    start: new Date(2023, 10, 1),
    end: new Date(2023, 10, 7),
    itinerary: [],
  },
];

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);

  // CRUD operations
  const createTrip = (trip: Omit<Trip, 'id'>) => {
    const newTrip = { ...trip, id: trips.length + 1 };
    setTrips([...trips, newTrip]);
    return newTrip;
  };
  const updateTrip = (id: number, updates: Partial<Trip>) => {
    setTrips(trips => trips.map(t => t.id === id ? { ...t, ...updates } : t));
  };
  const deleteTrip = (id: number) => {
    setTrips(trips => trips.filter(t => t.id !== id));
  };

  // Replace with fetch/axios for real backend
  return { trips, createTrip, updateTrip, deleteTrip };
}
