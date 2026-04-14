import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import calculatePasswordStrength from "../utils/calculatePasswordStrength";
import validateName from "../utils/validateName";
import validateEmail from "../utils/validateEmail";
import validatePassword from "../utils/validatePassword";
import validateConfirmPassword from "../utils/validateConfirmPassword";

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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: value 
        }));

        // real-time validation
        let error;
        switch(name){
            case 'name':
                error = validateName(value);
                break;
            case 'email':
                error = validateEmail(value);
                break;
            case 'password':
                error = validatePassword(value);
                break;
            case 'confirmPassword':
                error = validateConfirmPassword(value, formData.password);
                break;
            default:
                break;
        }

        setErrors(prev => ({ ...prev, [name]: error }));
    }

    const validateFrom = () => {
        const newErrors = {
            name : validateName(formData.name),
            email : validateEmail(formData.email),
            password : validatePassword(formData.password),
            confirmPassword : validateConfirmPassword(formData.confirmPassword, formData.password),
        }

        console.log(newErrors);

        setErrors(prev => ({ ...prev, ...newErrors }));

        return Object.values(newErrors).every(error => !error);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!validateFrom()){
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
        }, 2000);

        console.log(formData);

        setTimeout(() => {
            setFormData({
                name : "",
                email : "",
                password : "",
                confirmPassword : "",
            })

            setSubmitSuccess(false);
            setErrors({});
        }, 2000);

    }

    const passwordStrength = calculatePasswordStrength(formData.password);
    const isFormValid =
            formData.name &&
            formData.email &&
            formData.password &&
            formData.confirmPassword &&
            !errors.name &&
            !errors.email &&
            !errors.password &&
            !errors.confirmPassword;




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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
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
                                            className={`w-full border p-1 rounded-md border-gray-300 hover:shadow-sm hover:outline-1 ${errors.name ? ' border-red-500' : ''}`}
                                            disabled={submitSuccess}
                                        />
                                        {
                                            errors.name && 
                                            <div className="flex items-center gap-2 text-sm text-destructive">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.name}
                                            </div>
                                        }
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
                                    className={`w-full border p-1 rounded-md border-gray-300 hover:shadow-sm hover:outline-1 ${
                                        errors.email ? 'border-red-500' : ''
                                    }`}

                                    disabled={submitSuccess}
                                 />
                                 {
                                    errors.email && 
                                    <div className="flex items-center gap-2 text-sm text-destructive">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.email}
                                    </div>
                                }
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1">
                                <label className="text-foreground" htmlFor="password">
                                    Password <sup className="text-red-500">*</sup>
                                </label>

                                {/* INPUT + ICON WRAPPER */}
                                <div className="relative w-full">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={submitSuccess}
                                        className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 
                                            ${ errors.password
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                            }`}
                                    />

                                    {/* ICON */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {!showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>

                                {/* PASSWORD STRENGTH */}
                                {formData.password && (
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground">Password strength:</span>
                                            <span
                                                className={`font-medium ${
                                                    passwordStrength.color === "bg-destructive"
                                                    ? "text-destructive"
                                                    : passwordStrength.color === "bg-yellow-500"
                                                    ? "text-yellow-600"
                                                    : passwordStrength.color === "bg-blue-500"
                                                    ? "text-blue-600"
                                                    : "text-green-600"
                                                }`}
                                            >
                                                {passwordStrength.label}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* ERROR */}
                                {errors.password && (
                                    <div className="flex items-center gap-2 text-sm text-destructive">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            {/* confirm Password */}
                            {
                                !isLogin && <>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-foreground" htmlFor="confirmPassword">
                                            Confirm Password <sup className="text-red-500">*</sup>
                                        </label>

                                        <div className="relative w-full">
                                            <input 
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm your password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                disabled={submitSuccess}
                                                className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 
                                                    ${ errors.confirmPassword
                                                        ? "border-red-500 focus:ring-red-400"
                                                        : "border-gray-300 focus:ring-blue-400"
                                                }`}
                                            />

                                            {/* ICON */}
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {!showConfirmPassword ? <EyeOff /> : <Eye />}
                                            </button>
                                        </div>
                                       

                                        {/* ERROR */}
                                        {errors.confirmPassword && (
                                            <div className="flex items-center gap-2 text-sm text-destructive">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.confirmPassword}
                                            </div>
                                        )}
                                    </div>
                                </>
                            }

                        {/* Here add Buttons for Signup and Login */}
                        <div className="mt-5">
                            {
                                !isLogin ? <>
                                    <button disabled={!isFormValid || isSubmitting || submitSuccess} type="submit" className="w-full bg-gray-600 p-2 rounded-md text-white hover:bg-gray-800">{
                                            submitSuccess ? 'Submitting...' : 'Register'
                                        }</button>
                                </> : 
                                <>
                                    <button disabled={!isFormValid || isSubmitting || submitSuccess} type="submit" className="w-full bg-gray-600 p-2 rounded-md text-white hover:bg-gray-800">
                                        {submitSuccess ? 'Submitting...' : 'Login'}
                                    </button>
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