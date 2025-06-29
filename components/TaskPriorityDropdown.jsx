'use client';
import { useSelector } from 'react-redux';
import API from '@/services/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function TaskPriorityDropdown({ task, onPriorityChange }) {
    const { token } = useSelector((state) => state.auth);

    const handleChange = async (newPriority) => {
        try {
            await API.patch(`/tasks/${task._id}/priority`, {
                priority: newPriority,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onPriorityChange();
        } catch (err) {
            console.error('Priority update failed:', err);
        }
    };

    return (
        <Select value={task.priority} onValueChange={handleChange} className="mt-2 p-2 border rounded" >
            <SelectTrigger className="">
                <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
            </SelectContent>
            
        </Select>
    );
}
