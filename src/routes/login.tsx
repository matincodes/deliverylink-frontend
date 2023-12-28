// Login.tsx
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { login } from '../features/auth/authSlice';
import DeliveryLinkImage from '../assets/deliverylink.png';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(''); // Update to use userName instead of email
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  axios.defaults.withCredentials
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://deliverylink-api-y58r.onrender.com', {
        userName, 
        password,
      });

      const { success, user} = response.data;

      if (success) {
        console.log("login")
        dispatch(login(user));
        navigate('/home');
      }
    } catch (error) {
      console.error('Error during login:', error);
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
          <h2 className="text-3xl font-medium pb-2 font-[Lora]">Login to your account</h2>
          <p className="text-sm text-[#99999C]">
            New to DeliveryLink?
            <Link to="/sign-up" className="text-blue-600">
              {' '}
              Create an Account
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
            <p className="flex justify-end items-center text-right text-xs text-[#99999C] pb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6.05364 6.44141C9.60149 4.80394 5.77469 1.6993 4.47391 4.31586M6.05364 8.67299V8.67857M11.3 6.00078C11.3 3.07367 8.92706 0.700781 5.99995 0.700781C3.07284 0.700781 0.699951 3.07367 0.699951 6.00078C0.699951 8.92789 3.07284 11.3008 5.99995 11.3008C8.92706 11.3008 11.3 8.92789 11.3 6.00078Z"
                  stroke="#99999C"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              <span className="px-1">I forgot my Password</span>
            </p>
          </div>
          <button onClick={handleLogin} className="text-base">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
