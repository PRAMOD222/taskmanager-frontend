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
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-2">
      <input placeholder="Email" {...register('email')} />
      <p>{errors.email?.message}</p>
      <input type="password" placeholder="Password" {...register('password')} />
      <p>{errors.password?.message}</p>
      <button type="submit">Login</button>
    </form>
  );
}
