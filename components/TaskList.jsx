'use client';
import React, { useState } from 'react';
import TaskStatusDropdown from './TaskStatusDropdown';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"



export default function TaskList({ tasks, onStatusChange }) {
  if (!tasks.length) return <p>No tasks assigned yet.</p>;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleRowClick = (task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  return (
    <div className='border rounded-md my-5'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (

            <TableRow onClick={() => handleRowClick(task)} key={task._id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description.length > 30 ?
                `${task.description.slice(0, 30)}...`
                : task.description}</TableCell>
              <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <TaskStatusDropdown task={task} onStatusChange={onStatusChange} />
              </TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTask?.title}</DialogTitle>
            <DialogDescription>
              {selectedTask?.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

