'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import API from '@/services/api';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';


export default function CreateTaskForm({ onTaskCreated }) {
  const { token } = useSelector((state) => state.auth);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks', {
        title,
        description,
        dueDate,
        priority: 'Low', // Default
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      onTaskCreated();
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <div>

      <Dialog>
        <DialogTrigger className="bg-sky-500 text-white px-4 py-2 rounded">Add Task</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <form onSubmit={handleSubmit} className="mb-6 space-y-3">
              <div>
                <label htmlFor="task-title" className="block text-sm font-medium text-gray-700">Task Title</label>
                <input
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:outline-none focus:border-sky-500"
                  type="text"
                  placeholder="Title"
                  value={title}
                  required
                  minLength={5}
                  maxLength={100}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="task-description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:outline-none focus:border-sky-500"
                  placeholder="Description"
                  value={description}
                  maxLength={300}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="task-due-date" className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  className="w-full border border-gray-300 rounded-md p-2 outline-none focus:outline-none focus:border-sky-500"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Create Task
              </button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>

  );
}
