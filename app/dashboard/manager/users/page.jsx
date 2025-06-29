'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '@/services/api';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default function AdminUsersPage() {
  const { token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  
  const [page, setPage] = useState(1);
  const limit = 10; // You can adjust this as needed
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const query = new URLSearchParams({
        page,
        limit,
        ...(searchTerm && searchTerm.length > 3 && { name: searchTerm }),
      });
      const res = await API.get(`/users?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };



  const handleRoleChange = (userId) => async (newRole) => {
    try {
      await API.patch(`/users/${userId}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error('Error updating user role:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm]);

  return (
    <div className="p-6">

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>

      <section className="flex justify-end items-center mb-4 gap-4">
        <div className="">
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search..." className="p-2 rounded-md border focus:outline-none focus:border-sky-500" />
        </div>

        <div className="">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1">{page} / {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className={`capitalize`}>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === "admin" ?
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <h2 className='text-sky-500 border p-2  w-[120px] rounded-md'>Admin </h2>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Warnning</AlertDialogTitle>
                          <AlertDialogDescription>
                            You cannot change the role of an admin
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>

                      </AlertDialogContent>
                    </AlertDialog> :
                    <Select value={user.role} onValueChange={handleRoleChange(user._id)}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>}
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}
