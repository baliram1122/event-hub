import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


export default function Login() {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })

    const { loading, error, dispatch } = useContext(AuthContext)


    const navigate = useNavigate()

    const handlechange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            toast.success('Login successful!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
            if (res.data.isAdmin) {
                console.log("inside admin")
                navigate("/admin")
            } else {
                navigate("/")
            }
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
        }
    }


    return (
        <div>
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <form className='form'>
                <h3 className='text-light'>Login Here</h3>

                <label className='label' for="username">Username</label>
                <input type='text'
                    className='input'
                    id='username'
                    placeholder='Enter your username'
                    onChange={handlechange} />

                <label className='label' for="password">Password</label>
                <input type='password'
                    className='input'
                    id='password'
                    placeholder='Enter your password'
                    onChange={handlechange} />

                <button disabled={loading}
                    type='button'
                    onClick={handleClick} className='login-btn mt-4'>{loading ? 'Logging In...' : 'Login'}</button>
                <div className='d-flex justify-content-between mt-4' style={{}}>
                {error && <span style={{color: "red"}}>{error.message}</span>}
                    <span><a className='text-decoration-none' href='/register'>Register</a></span>
                </div>
            </form>
        </div>
    )
}


