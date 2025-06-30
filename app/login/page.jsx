'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import API from '@/services/api';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await API.post('/users/login', data);
      dispatch(login(res.data.token));
      const role = res.data.user.role;
      router.push(`/dashboard/${role}`);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className=' min-h-screen items-center flex justify-center '>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-2 max-w-3xl border bg-gray-100">
        <h2 className='text-2xl capitalize text-center'>Login</h2>
        <input className="w-full border border-gray-300 rounded-md p-2 outline-none focus:outline-none focus:border-sky-500" placeholder="Email" {...register('email')} />
        <p>{errors.email?.message}</p>
        <input className="w-full border border-gray-300 rounded-md p-2 outline-none focus:outline-none focus:border-sky-500" type="password" placeholder="Password" {...register('password')} />
        <p>{errors.password?.message}</p>
        <button className="bg-sky-600 text-white px-4 py-2 rounded" type="submit">Login</button>
      </form>
    </div>
  );
}
