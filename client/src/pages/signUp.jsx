import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// import { AlertCircle } from 'lucide-react';

const OwnerSignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const url = isSignIn ? 'http://localhost:3000/owner/login' : 'http://localhost:3000/owner/signup';
      const response = await axios.post(url, data);
      setSubmitSuccess(true);
      console.log(isSignIn ? 'Login successful' : 'Signup successful:', response.data);
    } catch (error) {
      setSubmitError('An error occurred. Please try again.');
      console.error(isSignIn ? 'Login error:' : 'Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-gradient-to-r from-blue-900 to-purple-900 h-[100vh] flex justify-center items-center'>
      <div className="max-w-lg w-full p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg">
        <div className="flex justify-center space-x-4 mb-8">
          <button 
            onClick={() => setIsSignIn(false)} 
            className={`py-2 px-4 rounded-md font-medium text-white transition-all duration-300 ${!isSignIn ? 'bg-indigo-600' : 'bg-gray-600 hover:bg-gray-500'}`}>
            Sign Up
          </button>
          <button 
            onClick={() => setIsSignIn(true)} 
            className={`py-2 px-4 rounded-md font-medium text-white transition-all duration-300 ${isSignIn ? 'bg-indigo-600' : 'bg-gray-600 hover:bg-gray-500'}`}>
            Sign In
          </button>
        </div>

        {isSignIn ? (
          <>
    
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    }
                  })}
                  className="mt-2 block w-full px-4 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    }
                  })}
                  className="mt-2 block w-full px-4 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="mt-2 block w-full px-4 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    }
                  })}
                  className="mt-2 block w-full px-4 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    }
                  })}
                  className="mt-2 block w-full px-4 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>
          </>
        )}

        {submitError && <p className="mt-4 text-red-500">{submitError}</p>}
        {submitSuccess && <p className="mt-4 text-green-500">Success!</p>}
      </div>
    </div>
  );
};

export default OwnerSignupForm;
