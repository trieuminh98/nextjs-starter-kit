// LoginForm client component for login page
"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Xử lý submit form, gọi service login
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      try {
        const data = await login(email, password);
        if (data) {
          router.push("/");
        }
      } catch (error) {
        setError(JSON.parse((error as Error).message).message);
      }
    });
  };

  return (
    <form
      className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-6"
      onSubmit={handleSubmit}
      aria-label="Login form"
    >
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Đăng nhập
      </h1>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          Mật khẩu
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Mật khẩu"
        />
      </div>
      {error && (
        <div className="text-red-600 text-sm text-center" role="alert">
          {error}
        </div>
      )}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        disabled={isPending}
        aria-busy={isPending}
      >
        {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
