import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Authform() {

    const location = useLocation();
    const isLogin = location.pathname === "/login";

    const [formData, setFormData] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword : "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: value 
        }));
    }

    return (
        <div>
            <div>
                {/* this is Above part of the form */}
                <div>
                    {/* this top section is for login and signup */}
                    
                        {
                            !isLogin ? 
                                    <div>
                                        <h1>Create Account</h1>
                                        <p>Join us today and get started</p>
                                    </div>
                                :   
                                    <div>
                                        <h1>Welcome Back</h1>
                                        <p>Sign in to your account to continue</p>
                                    </div>
                        }
                   

                    {/* this section is for Signup and login fields */}
                    <form>
                        <div>
                            {
                                !isLogin && <>
                                    {/* Full Name */}
                                    <div>
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Khalid Alam"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            }

                            {/* Email */}
                            <div>
                                <label htmlFor="email">Email Address</label>
                                <input 
                                    id="email"
                                    type="email"
                                    placeholder="khalid@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                 />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password">Password <sup>*</sup></label>
                                <input  
                                    id="password"
                                    type="password"
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* confirm Password */}
                            {
                                !isLogin && <>
                                    <div>
                                        <label htmlFor="confirmPassword">Confirm Password <sup>*</sup></label>
                                        <input 
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            }

                        </div>

                        {/* Here add Buttons for Signup and Login */}
                        <div></div>
                    </form>
                </div>

                {/* Switch between the two components based on the pathname */}
                <div>
                    {
                        !isLogin ? 
                            <p>
                                Already have an account?{' '}
                                <Link to="/login">Login here</Link>
                            </p>
                                :
                            <p>
                                Don't have an account?{' '}
                                <Link to="/">Signup here</Link>
                            </p>
                    }
                </div>
            </div>
        </div>
    )
}