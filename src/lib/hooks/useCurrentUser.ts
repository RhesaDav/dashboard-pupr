"use client";
import { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import { getCurrentUser } from '@/actions/auth';

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getCurrentUser();
        
        if (!response) {
          throw new Error('Failed to fetch user');
        }
        
        setUser(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}