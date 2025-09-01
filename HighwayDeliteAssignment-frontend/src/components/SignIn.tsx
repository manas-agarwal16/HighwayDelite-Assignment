import { useState } from 'react';
import Input from './Input.tsx';
import Button from './Button.tsx';
import { Link } from 'react-router-dom';

const SignIn : React.FC = () => {
  const [name, setName] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      otp
    });
  };

  const handleResendOTP = () => {
    console.log("Resend OTP");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* LEFT PART (Form) */}
      <div className="flex-1 flex justify-center items-center m-4 p-6 px-0">
        <div className="w-full max-w-sm flex flex-col">
          <div className="flex justify-center mb-6">
            <img src="./src/assets/logo.png" className="font-bold w-20 h-10 md:absolute md:top-3 md:left-3" alt="Logo" />
          </div>

          <h2 className="text-4xl font-bold text-center mb-2 md:text-start">Sign In</h2>
          <p className="text-center text-gray-500 mb-6 md:text-start">
            Please login to continue to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <Input value={name} setValue={setName} placeholder='Your Name' />

            <fieldset className='border border-gray-300 rounded-lg px-3 py-2'>
                <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-gray-100"
                placeholder='OTP'
                required
                />
            </fieldset>

            <button
                onClick={handleResendOTP}
                className="text-blue-500 underline bg-transparent p-0 m-0 border-0 cursor-pointer"
                >
                Resend OTP
            </button>

            <div className="flex items-center mb-4">
              <input id='loggedin' type='checkbox' className="mr-2" />
              <label htmlFor="loggedin" className="text-gray-500 text-sm mb-1">Keep me logged in</label>
            </div>

            <Button placeholder='Sign in' />
          </form>

          <p className="text-center text-sm mt-4">
            Need an account?{" "}
            <Link to="/signup" className="text-blue-500 underline">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT PART */}
      <div className="hidden md:flex flex-1 bg-gray-100 justify-center items-center">
        <img
          src="./src/assets/right-column.png"
          alt="right column image"
          className="w-full h-screen"
        />
      </div>
    </div>
  );
}

export default SignIn;
