'use client';
import TaskPriorityDropdown from "./TaskPriorityDropdown";
import TaskAssignmentDD from "./TaskAssignmentDD";
import TaskStatusDropdown from "./TaskStatusDropdown";
import { MdDelete } from "react-icons/md";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import API from "@/services/api";
import { useSelector } from "react-redux";

export default function TaskList({ tasks, onChange, users }) {
    if (!tasks.length) return <p>Loadding tasks</p>;
    const token = useSelector((state) => state.auth.token);

    const handleDeleteTask = async (taskId) => {
        try {
            await API.delete(`/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onChange();
        } catch (err) {
            console.error('Failed to delete task:', err);
        }
    };


    return (
        <div className="border rounded-md">
            <Table className={``}>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task._id} className={` ${task.status === "Completed" ? "bg-green-100 hover:bg-green-200" : ""} 
                        ${task.status === "In Progress" ? "bg-yellow-100 hover:bg-yellow-200" : ""} 
                        ${(task.status === "Pending" || task.status === "In Progress") && new Date(task.dueDate).toLocaleDateString() === new Date().toLocaleDateString() ? "bg-red-100 hover:bg-red-200" : ""}`}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.description.length > 30 ?
                                `${task.description.slice(0, 30)}...`
                                : task.description}</TableCell>
                            <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <TaskPriorityDropdown task={task} onPriorityChange={() => onChange(task._id)} />
                            </TableCell>
                            <TableCell>
                                <TaskStatusDropdown task={task} onStatusChange={() => onChange(task._id)} />
                            </TableCell>
                            <TableCell>
                                <TaskAssignmentDD
                                    task={task}
                                    onAssignedToChange={() => onChange(task._id)}
                                    users={users}
                                />
                            </TableCell>
                            <TableCell>
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <MdDelete className="w-6 h-6 cursor-pointer text-red-500" />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your task
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteTask(task._id)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

