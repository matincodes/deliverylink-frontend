// SignUp.tsx
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { signup } from '../features/auth/authSlice';
import DeliveryLinkImage from '../assets/deliverylink.png';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(''); // Update to use userName instead of email
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        userName, // Update to use userName instead of email
        password,
      });

      const { success, user} = response.data;

      if (success) {

        dispatch(signup(user));
        navigate('/home');
  
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <header>
        <nav className="flex justify-start items-center pl-3 border-b">
          <img src={DeliveryLinkImage} alt="" className="w-16" />
        </nav>
      </header>

      <div className="flex items-center justify-center flex-col h-full w-full mb-10">
        <div className="mb-5 w-1/3">
          <h2 className="text-3xl font-medium pb-2 font-[Lora]">Create an account</h2>
          <p className="text-sm text-[#99999C]">
            Already have an account?
            <Link to="/" className="text-blue-600">
              {' '}
              Log in
            </Link>
          </p>
        </div>
        <form className="w-1/3 font-[Mulish]">
          <div className="pt-1">
            <label htmlFor="userName">Username<span className="text-red-600">*</span></label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Username"
              id="userName"
            />
          </div>
          <div className="pt-1">
            <label htmlFor="password">Password<span className="text-red-600">*</span></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              id="password"
            />
          </div>
          <button onClick={handleSignUp} className="text-base">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
