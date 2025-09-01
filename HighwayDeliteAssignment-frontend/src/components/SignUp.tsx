import { useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import Input from './Input.tsx';
import Button from './Button.tsx';

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);

  const datePickerRef = useRef<DatePicker | null>(null);

  const handleDivClick = () => {
    datePickerRef?.current?.setOpen(true); // opens the calendar
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      date: date, // use formatted here
      email
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* LEFT PART (Form) */}
      <div className="flex-1 flex justify-center items-center m-4 p-6 px-0">
        <div className="w-full max-w-sm flex flex-col">
          <div className="flex justify-center mb-6">
            <img src="./src/assets/logo.png" className="font-bold w-20 h-10 md:absolute md:top-3 md:left-3" alt="Logo" />
          </div>

          <h2 className="text-4xl font-bold text-center mb-2 md:text-start">Sign up</h2>
          <p className="text-center text-gray-500 mb-6 md:text-start">
            Sign up to enjoy the feature of HD
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <Input value={name} setValue={setName} placeholder='Your Name' />

            <fieldset className="border border-gray-300 rounded-lg px-3 py-2">
              <legend className="text-sm text-gray-500 px-1 font-semibold">Date of Birth</legend>
              <div onClick={handleDivClick}  className="flex bg-gray-100 items-center w-full rounded">
                <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                <DatePicker
                  ref={datePickerRef}
                  selected={date}
                  onChange={(d) => setDate(d)}
                  dateFormat="dd MMMM yyyy"
                  className="w-full flex-1 outline-none bg-gray-100"
                />
              </div>
            </fieldset>

            <Input value={email} setValue={setEmail} placeholder='Email' />

            <Button placeholder='Get OTP' />
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-500 underline">
              Sign in
            </a>
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

export default SignUp;
