'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import useHasMounted from '@/hooks/useHasMounted'; // assuming it's saved here

const Sidebar = () => {
  const hasMounted = useHasMounted();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  if (!hasMounted) return null; // SSR-safe rendering

  const navItems = {
    employee: [{ label: 'Dashboard', href: '/dashboard/employee' }],
    manager: [
      { label: 'Dashboard', href: '/dashboard/manager' },
      { label: 'Task Management', href: '/dashboard/manager/tasks' },
      { label: 'User Management', href: '/dashboard/manager/users' },
    ],
    admin: [
      { label: 'Dashboard', href: '/dashboard/admin' },
      { label: 'Task Management', href: '/dashboard/admin/tasks' },
      { label: 'User Management', href: '/dashboard/admin/users' },
    ],
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const links = navItems[user?.role] || [];

  return (
    <div className="w-64 min-h-screen bg-sky-500 text-white p-4 space-y-6">
      <h2 className="text-xl font-bold">Task Manager</h2>
      <nav className="space-y-2">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded ${
              pathname === item.href ? 'bg-white text-sky-500' : 'hover:bg-gray-700'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-10 bg-yellow-600 hover:bg-yellow-700 w-full py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
