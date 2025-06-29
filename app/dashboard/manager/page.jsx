'use client';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import API from '@/services/api';
import TaskList from '@/components/TaskList';
import CreateTaskForm from '@/components/CreateTaskForm';

export default function EmployeeDashboard() {
  const { user, token } = useSelector((state) => state.auth);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks/assigned', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };



  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">Welcome, {user?.name}</h1>
      <CreateTaskForm onTaskCreated={fetchTasks} />
      <TaskList tasks={tasks} onStatusChange={fetchTasks} />
    </div>
  );
}
