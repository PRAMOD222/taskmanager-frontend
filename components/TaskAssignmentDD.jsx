'use client';
import { useSelector } from 'react-redux';
import API from '@/services/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TaskPriorityDropdown({ task, onAssignedToChange, users }) {
    const { token } = useSelector((state) => state.auth);

    const handleChange = async (newAssigneeId) => {

    try {
      await API.patch(`/tasks/${task._id}/assign`, {
        assignedTo: newAssigneeId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onAssignedToChange(); // Refresh or refetch tasks
    } catch (err) {
      console.error('Assignment update failed:', err);
    }
  };



    return (
        <Select value={task.assignedTo._id} onValueChange={handleChange}>
            <SelectTrigger className="">
                <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
                {users.filter((user) => user.role !== "admin").map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                        <h2 className='capitalize'>{user.name} <span className='text-xs text-sky-500'>{user.role === "employee" ? "Emp" : "Man"}</span></h2>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}





