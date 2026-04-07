import { Link, Outlet, useLocation } from "react-router-dom";

export default function Authform() {

    const location = useLocation();
    const isLogin = location.pathname === "/login";

    return (
        <div>
            <div>
                 {
                    location.pathname === "/" ? 
                        <SignupPage type="signup" />
                        : 
                        <Login type="login" />
                }
            </div>

            <div>
               
                    {
                        location.pathname === "/" ?
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
    )
}