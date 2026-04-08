import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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

    // Validation Functions 

    // 1. Name Validation 
    const validateName = (name) => {
        if(!name.trim()){
            return "Name is required";
        }

        if(name.trim().length < 2){
            return "Name must be at least 2 characters";
        }

        return undefined
    }

    // 2. Email Validation

    const validateEmail = (email) => {
        if(!email.trim()){
            return "Email is required";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return 'Please enter a valid email';
        }

        return undefined
    }


    // 3. Password Validation
    const validatePassword = (password) => {
        if(!password.trim()){
            return "Password is required";
        }

        if(password.trim().length < 8){
            return "Password must be at least 8 characters";
        }

        if(!/[A-Z]/.test(password)){
            return "Password must contain at least one uppercase letter";
        }

        if(!/[a-z]/.test(password)){
            return "Password must contain at least one lowercase letter";
        }

        if(!/[0-9]/.test(password)){
            return "Password must contain at least one number";
        }

        if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)){
            return "Password must contain at least one special character";
        }

        return undefined
    }

    // 4. Confirm Password Validation

    const validateConfirmPassword = (confirmPassword) => {
        if(!confirmPassword.trim()){
            return "Confirm Password is required";
        }

        if(confirmPassword.trim().length < 8){
            return "Confirm Password must be at least 8 characters";
        }

        if(confirmPassword.trim() !== formData.password){
            return "Confirm Password does not match Password";
        }

        return undefined
    }

    // 5. Calculate Password Strength

    const calculatePasswordStrength = (password) => {
        let strength  = 0; 
        const check = [
            password.length >= 8,
            password.length >= 12,
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /[0-9]/.test(password),
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        ]

        strength = check.filter(Boolean).length;

        if (strength <= 2) return { level: 25, label: 'Weak', color: 'bg-destructive' };
        if (strength <= 3) return { level: 50, label: 'Fair', color: 'bg-yellow-500' };
        if (strength <= 4) return { level: 75, label: 'Good', color: 'bg-blue-500' };
        return { level: 100, label: 'Strong', color: 'bg-green-500' };

    }


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
                error = validateConfirmPassword(value);
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
            confirmPassword : validateConfirmPassword(formData.confirmPassword),
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
                            <div className="flex flex-col gap-1 relative">
                                <label className="text-foreground" htmlFor="password">Password <sup className="text-red-500">*</sup></label>
                                <input  
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={submitSuccess}
                                    className={`w-full border p-1 rounded-md border-gray-300 hover:shadow-sm hover:outline-1 ${errors.password ? ' border-red-500' : ''}`}
                                />

                                {formData.password && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-muted-foreground">Password strength:</span>
                                            <span className={`text-xs font-medium ${passwordStrength.color === 'bg-destructive'
                                                ? 'text-destructive'
                                                : passwordStrength.color === 'bg-yellow-500'
                                                ? 'text-yellow-600'
                                                : passwordStrength.color === 'bg-blue-500'
                                                    ? 'text-blue-600'
                                                    : 'text-green-600'
                                            }`}>
                                            {passwordStrength.label}
                                            </span>
                                        </div>
                                        {/* <ProgressBa
                                            value={passwordStrength.level}
                                            className="h-2"
                                        /> */}
                                    </div>
                                )}

                                {
                                    errors.password && 
                                    <div className="flex items-center gap-2 text-sm text-destructive">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.password}
                                    </div>
                                }

                                <button type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3/5 -translate-y-1/2 text-muted-foreground hover:text-foreground">
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
                                            disabled={submitSuccess}
                                            className={`w-full border p-1 rounded-md border-gray-300 hover:shadow-sm hover:outline-1 ${errors.confirmPassword ? ' border-red-500' : ''}`}
                                        />

                                        {
                                            errors.confirmPassword && 
                                            <div className="flex items-center gap-2 text-sm text-destructive">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.confirmPassword}
                                            </div>
                                        }

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