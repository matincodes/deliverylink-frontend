// home.tsx
import React, { useEffect } from "react";
import Item from "./items";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setAuthenticated, logout } from "../features/auth/authSlice";
import DeliveryLinkImage from "../assets/deliverylink.png";

const Home: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthentication = () => {
            const authToken = localStorage.getItem('authToken');
            if (authToken) {
                dispatch(setAuthenticated(true));
            } else {
                dispatch(setAuthenticated(false));
            }
        };

        checkAuthentication();

        // if (!isAuthenticated) {
        //     navigate('/');
        // }
    }, [dispatch, isAuthenticated, navigate]);


    const handleLogout = async () => {
        try {
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="mx-4">
            <div className="flex justify-between items-center px-8 py-2 border-b mb-4">
                <img src={DeliveryLinkImage} alt="" className="w-16" />
                <div className="w-2/6 flex items-center">
                    <div className="w-full">
                        <h2 className="text-xl font-medium font-[Lora]">Welcome <span className="text-blue-800">{user?.userName}</span> </h2>
                        <p className="text-sm">{/* Add user email or other information if available */}</p>
                    </div>
                    <button
                        className="bg-blue-700 w-fit px-11"
                        onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <Item />
        </div>
    );
}

export default Home;
