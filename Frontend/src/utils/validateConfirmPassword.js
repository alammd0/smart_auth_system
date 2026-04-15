

export default function validateConfirmPassword(confirmPassword, password) {

    console.log(confirmPassword, password);

    if (!confirmPassword.trim()) {
        return "Confirm Password is required";
    }

    if (confirmPassword.trim().length < 8) {
        return "Confirm Password must be at least 8 characters"
    }

    if (confirmPassword !== password) {
        return "Confirm Password does not match Password"
    }


    return undefined;
}