import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Register() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        // Clear validation errors when the user starts typing again
        setErrors((prev) => ({ ...prev, [e.target.id]: '' }));
    };

    const validateForm = () => {
        let isValid = true;
        const { username, email, password } = userData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (username.length < 3) {
            setErrors((prev) => ({
                ...prev,
                username: <span className="text-warning" style={{ fontSize: "14px" }}>Username must be at least 3 characters long</span>,
            }));
            isValid = false;
        }
        

        if (!emailRegex.test(email)) {
            setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
            isValid = false;
        }

        if (password.length < 8) {
            setErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters long' }));
            isValid = false;
        }

        return isValid;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        dispatch({ type: 'LOGIN_START' });

        try {
            const res = await axios.post('/auth/register', userData);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            navigate('/login');
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
        }
    };

    return (
        <div>
            <div class="background reg-background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <form className='form reg-form'>
                <h3 className='text-light' style={{ marginTop: "-30px" }}>Register Here</h3>

                <label className='label reg-label' htmlFor='username'>Username</label>
                <input type='text'
                    className='input'
                    id='username'
                    placeholder='Enter your username'
                    onChange={handleChange}
                    value={userData.username} />
                {errors.username && <span className='text-danger'>{errors.username}</span>}

                <label className='label reg-label' htmlFor='email'>Email</label>
                <input type='email'
                    className='input'
                    id='email'
                    placeholder='Enter your email'
                    onChange={handleChange}
                    value={userData.email} />
                {errors.email && <span className='text-danger'>{errors.email}</span>}

                <label className='label reg-label' htmlFor='password'>Password</label>
                <input type='password'
                    className='input'
                    id='password'
                    placeholder='Enter your password'
                    onChange={handleChange}
                    value={userData.password} />
                {errors.password && <span className='text-danger'>{errors.password}</span>}

                <button
                    disabled={loading}
                    type='button'
                    onClick={handleRegister}
                    className='login-btn mt-4'>{loading ? 'Registering...' : 'Register'}</button>


                <div className='d-flex justify-content-between mt-3' style={{}}>
                    {error && <span className='text-danger mt-2'>{error.message}</span>}
                    <span><a className='text-decoration-none' href='/login'>Login</a></span>
                </div>
            </form>
        </div>
    );
}
