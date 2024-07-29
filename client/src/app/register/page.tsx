import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const RegistrationForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-4xl w-full mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                type="text"
                name="Name"
                placeholder="Enter your Name"
                className="w-[400px]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                className="w-[400px]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                className="w-[400px]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-[400px]"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign Up
            </Button>
            <div className="mt-4 text-center">
              <span>Already have an account? </span>
              <Link href="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="w-full py-2 flex items-center justify-center border border-blue-500 hover:border-blue-800 hover:border-2"
                style={{ borderRadius: "9999px" }}
              >
                <div className="flex items-center justify-center rounded-full bg-white p-1 mr-2">
                  <img
                    src="https://w7.pngwing.com/pngs/506/509/png-transparent-google-company-text-logo-thumbnail.png"
                    alt="Google Logo"
                    className="w-6 h-6"
                  />
                </div>
                <span>Continue with Google</span>
              </button>
            </div>
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
    </div>
  );
};

export default RegistrationForm;
