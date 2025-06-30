import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-4">
      <h1 className="text-3xl font-bold">Welcome to the Task Management App</h1>
      <p>Your one-stop solution for managing your tasks and projects.</p>
      <Link href="/login" className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded block">Login</Link>
    </div>
  );
}
