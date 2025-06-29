// components/ProtectedRoute.jsx
'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, token } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token || !user) {
      router.replace('/login');
    } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      router.replace('/unauthorized'); // or a 403 page
    }
  }, [user, token]);

  if (!token || !user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
    return null; // prevent flashing
  }

  return children;
}
