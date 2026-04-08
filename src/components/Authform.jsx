import { Eye, EyeOff } from "lucide-react";
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: value 
        }));
    }

    return (
        <div className="h-screen w-full max-w-md mx-auto p-6 flex flex-col justify-center">
            <div className="border space-y-8 px-4 py-9 rounded-md border-gray-400 shadow-sm shadow-gray-400">
                {/* this is Above part of the form */}
                <div className="space-y-4">
                    {/* this top section is for login and signup */}
                        {
                            !isLogin ? 
                                    <div className="space-y-1 flex items-center justify-center flex-col">
                                        <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
                                        <p className="text-md text-muted-foreground">Join us today and get started</p>
                                    </div>
                                :   
                                    <div className="space-y-1 flex items-center justify-center flex-col">
                                        <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
                                        <p className="text-md text-muted-foreground">Sign in to your account to continue</p>
                                    </div>
                        }

                    {/* this section is for Signup and login fields */}
                    <form className="space-y-4">
                        
                            {
                                !isLogin && <>
                                    {/* Full Name */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-foreground" htmlFor="name">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Khalid Alam"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full border p-1 rounded-md border-gray-300 hover:shadow-sm hover:outline-1"
                                        />
                                    </div>
                                </>
                            }

                            {/* Email */}
                            <div className="flex flex-col gap-1">
                                <label className="text-foreground" htmlFor="email">Email Address</label>
                                <input 
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="khalid@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border p-1 rounded-md border-gray-300 hover:shadow-sm hover:outline-1"
                                 />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1 relative">
                                <label className="text-foreground" htmlFor="password">Password <sup className="text-red-500">*</sup></label>
                                <input  
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border p-1 rounded-md border-gray-300 hover:shadow-sm hover:outline-1"
                                />

                                <button type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3/4 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                    {
                                        !showPassword ? 
                                            <EyeOff />
                                        :
                                            <Eye />
                                    }
                                </button>
                            </div>

                            {/* confirm Password */}
                            {
                                !isLogin && <>
                                    <div className="flex flex-col gap-1 relative">
                                        <label className="text-foreground" htmlFor="confirmPassword">Confirm Password <sup className="text-red-500">*</sup></label>
                                        <input 
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full border p-1 rounded-md border-gray-300 hover:shadow-sm hover:outline-1"
                                        />

                                        <button type="button" 
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-3/4 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                            {
                                                !showConfirmPassword ? 
                                                    <EyeOff />
                                                :
                                                    <Eye />
                                            }
                                        </button>
                                    </div>
                                </>
                            }

                        {/* Here add Buttons for Signup and Login */}
                        <div className="mt-5">
                            {
                                !isLogin ? <>
                                    <button className="w-full bg-gray-600 p-2 rounded-md text-white hover:bg-gray-800">Register</button>
                                </> : 
                                <>
                                    <button className="w-full bg-gray-600 p-2 rounded-md text-white hover:bg-gray-800">Login</button>
                                </>
                            }
                        </div>
                    </form>
                </div>

                {/* Switch between the two components based on the pathname */}
                <div className="flex flex-col items-center">
                    {
                        !isLogin ? 
                            <p className="text-md">
                                Already have an account?{' '}
                                <Link className="text-blue-800 underline" to="/login">Login</Link>
                            </p>
                                :
                            <p className="text-md">
                                Don't have an account?{' '}
                                <Link className="text-blue-800 underline" to="/">Create Account</Link>
                            </p>
                    }
                </div>
            </div>
        </div>
    )
}