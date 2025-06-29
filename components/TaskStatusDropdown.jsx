'use client';
import { useSelector } from 'react-redux';
import API from '@/services/api';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

export default function TaskStatusDropdown({ task, onStatusChange }) {
  const { token } = useSelector((state) => state.auth);

  const handleChange = async (newStatus) => {
    try {
      await API.patch(`/tasks/${task._id}/status`, {
        status: newStatus,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onStatusChange();
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  return (
    <Select value={task.status} onValueChange={handleChange}>
      <SelectTrigger className="mt-2">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Pending">Pending</SelectItem>
        <SelectItem value="In Progress">In Progress</SelectItem>
        <SelectItem value="Completed">Completed</SelectItem>
      </SelectContent>
    </Select>
  );
}
