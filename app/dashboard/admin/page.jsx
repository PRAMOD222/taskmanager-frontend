'use client';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import API from '@/services/api';

import { Pie, PieChart, LabelList } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

export default function EmployeeDashboard() {
    const { user, token } = useSelector((state) => state.auth);
    const [userAnalytics, setUserAnalytics] = useState();
    const [taskAnalytics, setTaskAnalytics] = useState(null);




    const fetchUserAnalytics = async () => {
        try {
            const res = await API.get('/admin/user-analytics', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserAnalytics(res.data);
            console.log(res.data);

        } catch (err) {
            console.error('Failed to fetch tasks:', err);
        }
    };

    const fetchTaskAnalytics = async () => {
        try {
            const res = await API.get('/admin/task-analytics', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const transformed = res.data.map((item) => ({
                status: item._id,
                count: item.count,
                fill: statusColorMap[item._id] || "#8884d8", // fallback color
            }))
            console.log(transformed);
            setTaskAnalytics(transformed);
        } catch (err) {
            console.error('Failed to fetch tasks:', err);
        }
    };


    useEffect(() => {
        fetchUserAnalytics();
        fetchTaskAnalytics();
    }, []);

    const statusColorMap = {
        "Pending": "#ef4444",       // red-500
        "In Progress": "#f59e0b",   // amber-500
        "Completed": "#22c55e",     // green-500
    };

    const chartConfig = {
        "Pending": { label: "Pending", color: statusColorMap["Pending"] },
        "In Progress": { label: "In Progress", color: statusColorMap["In Progress"] },
        "Completed": { label: "Completed", color: statusColorMap["Completed"] },
    };

    return (
        <div className="">
            <h1 className="text-2xl font-semibold  capitalize">Welcome, {user?.name}</h1>
            <section className='my-5 flex gap-4'>
                <div className="grid grid-cols-2 gap-4 w-1/3">
                    <div className='relative border rounded-md aspect-square p-2 shadow w-full flex justify-center items-center'>
                        <h2 className='absolute left-2 top-1 text-gray-400'>All Users: </h2>
                        <h2 className='text-5xl font-semibold text-gray-600 '>{userAnalytics?.totalUsers}</h2>
                    </div>
                    <div className='relative border rounded-md aspect-square p-2 shadow w-full flex justify-center items-center'>
                        <h2 className='absolute left-2 top-1 text-gray-400'>Employees: </h2>
                        <h2 className='text-5xl font-semibold text-gray-600 '>{userAnalytics?.employees}</h2>
                    </div>
                    <div className='relative border rounded-md aspect-square p-2 shadow w-full flex justify-center items-center'>
                        <h2 className='absolute left-2 top-1 text-gray-400'>Managers: </h2>
                        <h2 className='text-5xl font-semibold text-gray-600 '>{userAnalytics?.managers}</h2>
                    </div>
                    <div className='relative border rounded-md aspect-square p-2 shadow w-full flex justify-center items-center'>
                        <h2 className='absolute left-2 top-1 text-gray-400'>Admins: </h2>
                        <h2 className='text-5xl font-semibold text-gray-600 '>{userAnalytics?.admins}</h2>
                    </div>
                </div>
                <div className='w-2/3 border rounded-md p-2 shadow'>
                    {taskAnalytics &&

                        <ChartContainer
                            config={chartConfig}
                            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[350px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    content={<ChartTooltipContent nameKey="status" hideLabel />}
                                />
                                <Pie data={taskAnalytics} dataKey="count" nameKey="status">
                                    <LabelList
                                        dataKey="status"
                                        className="fill-background"
                                        stroke="none"
                                        fontSize={12}
                                    />
                                </Pie>
                                <ChartLegend
                                    content={<ChartLegendContent nameKey="status" />}
                                    className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center whitespace-nowrap"
                                />
                            </PieChart>
                        </ChartContainer>
                    }

                </div>
            </section>

            <section className='my-5'>




            </section>
        </div>
    );
}
