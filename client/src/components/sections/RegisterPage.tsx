'use client';
import Input from '../ui/Input'
import Button from '../ui/Button'
import Link from 'next/link'
import { MdOutlineAttachEmail } from 'react-icons/md';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaArrowRight, FaGoogle, FaGithub, FaUser } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { apiRequest } from '@/utils/api/request';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/hooks';
import { setUser, setIsAuthenticated } from '@/features/auth/auth.slice';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const response = await apiRequest({
        url: '/api/auth/register',
        method: 'POST',
        data,
      });
      if (response.success) {
        // Store token in localStorage
        localStorage.setItem('auth_token', response.token);
        
        // Update Redux state
        dispatch(setUser(response.user));
        dispatch(setIsAuthenticated(true));
        
        toast.success(response.message);
        
        // Redirect to home
        router.push('/');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Registration failed. Please try again.');
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      {/* Form container */}
      <div className="relative w-full max-w-xl">
        {/* Glass card */}
        <div className="relative rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2 tracking-tight">
              Create an account
            </h2>
            <p className="text-gray-600 text-sm">
              Create an account to get started
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              label="Name"
              placeholder="John Doe"
              icon={
                <FaUser className="w-5 h-5" />
              }
              {...register('name')}
            />

            <Input
              type="email"
              label="Email address"
              placeholder="you@example.com"
              icon={
                <MdOutlineAttachEmail className="w-5 h-5" />
              }
              {...register('email')}
            />

            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              icon={
                <RiLockPasswordLine className="w-5 h-5" />
              }
              {...register('password')}
            />

            {/* Submit button */}
            <Button className="w-full">
              Create account
              <FaArrowRight className="w-5 h-5" />
            </Button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-200 text-gray-500">or continue with</span>
              </div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" className="py-3">
                <FaGoogle className="w-5 h-5" />
                Google
              </Button>
              <Button variant="secondary" className="py-3">
                <FaGithub className="w-5 h-5" />
                GitHub
              </Button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-gray-500 hover:text-gray-400 font-medium transition-colors duration-300">
              Login here
            </Link>
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-gray-500/20 to-gray-500/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-gray-500/20 to-gray-500/20 rounded-full blur-2xl" />
      </div>
    </div>
  )
}

export default RegisterPage
