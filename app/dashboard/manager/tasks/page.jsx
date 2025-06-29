'use client';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import API from '@/services/api';
import AllTaskList from '@/components/AllTaskList';
import CreateTaskForm from '@/components/CreateTaskForm';

export default function ManagerDashboard() {
    const { user, token } = useSelector((state) => state.auth);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(1);
    const limit = 10; // You can adjust this as needed
    const [totalPages, setTotalPages] = useState(1);
    const [priorityFilter, setPriorityFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchTasks = async () => {
        try {
            const query = new URLSearchParams({
                page,
                limit,
                ...(searchTerm && searchTerm.length > 3 && { title: searchTerm }),
                ...(priorityFilter && { priority: priorityFilter }),
                ...(statusFilter && { status: statusFilter }),
            });

            const res = await API.get(`/tasks?${query}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setTasks(res.data.tasks);
            setTotalPages(res.data.pages);
        } catch (err) {
            console.error('Failed to fetch tasks:', err);
        }
    };


    const fetchUsers = async () => {
        try {
            const res = await API.get('/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log('Fetched users:', res.data);
            setUsers(res.data.users);
        } catch (err) {
            console.error('Failed to fetch users:', err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [page, priorityFilter, statusFilter, searchTerm]);

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
            <CreateTaskForm onTaskCreated={fetchTasks} />
            <section className="flex justify-end items-center mb-4 gap-4">
                <div className="">
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search..." className="p-2 rounded-md border focus:outline-none focus:border-sky-500" />
                </div>
                <div className="flex gap-4 ">
                    <select
                        value={priorityFilter}
                        onChange={(e) => {
                            setPriorityFilter(e.target.value);
                            setPage(1); // reset to first page when filters change
                        }}
                        className="p-2 rounded-md border focus:outline-none focus:border-sky-500"
                    >
                        <option value="">All Priorities</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(1); // reset to first page when filters change
                        }}
                        className="p-2 rounded-md border focus:outline-none focus:border-sky-500"
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
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
            <AllTaskList tasks={tasks} onChange={fetchTasks} users={users} />
        </div>
    );
}
