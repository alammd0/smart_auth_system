

export default function calculatePasswordStrength(password){
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

    if (strength <= 2) return { 
        level: 25, label: 'Weak', color: 'bg-destructive' 
    };

    if (strength <= 3) return { 
        level: 50, label: 'Fair', color: 'bg-yellow-500' 
    };
    
    if (strength <= 4) return { 
        level: 75, label: 'Good', color: 'bg-blue-500' 
    };
    
    return { level: 100, label: 'Strong', color: 'bg-green-500' };
}