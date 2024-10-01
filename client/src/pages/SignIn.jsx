import React from 'react'

const SignIn = () => {
  return (
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
  )
}

export default SignIn