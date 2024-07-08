import React from 'react';
import { Input } from '@/components/ui/input';

const RegistrationForm = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full md:w-1/2 p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <Input type="text" name="firstName" placeholder="First Name" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <Input type="text" name="lastName" placeholder="Last Name" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input type="email" name="email" placeholder="Email" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input type="password" name="password" placeholder="Password" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <Input type="text" name="number" placeholder="Phone Number" />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
      <div className="hidden md:flex w-full md:w-1/2 bg-blue-500 items-center justify-center">
        <img
          src="https://www.sme-news.co.uk/wp-content/uploads/2021/11/Login.jpg"
          alt="Register Now"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default RegistrationForm;
