import React from 'react';
import { Input } from '@/components/ui/input';

const RegistrationForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-4xl w-full mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
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
              <label className="block text-sm font-medium text-gray-700">Confirm password</label>
              <Input type="password" name="password" placeholder="Password" />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Register
            </button>
            <button
                    type="button"
                    className="w-full py-2 bg-gray text-black rounded hover:bg-blue-600 flex items-center justify-center"
                    style={{ borderRadius: '9999px' }} // This sets the button to be perfectly round
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



// import { Button } from "@/components/ui/button"

// function page() {
//   return (
//     <div>
//       {/* <button>send</button> */}
//       <Button > hello</Button>
//     </div>
//   )
// }

// export default page

