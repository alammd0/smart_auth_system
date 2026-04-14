export default function validateName(name){
    if(!name.trim()){
        return "Name is required";
    }

    if(name.trim().length < 2){
        return "Name must be at least 2 characters";
    }

    return undefined
}