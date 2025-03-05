import { redirect } from "react-router-dom";

export const getTokenDuration=()=>{
    const storedExpirationDate= localStorage.getItem("ExpirationHour")
    const expirationDate=new Date(storedExpirationDate);
    const now= new Date();
    const duration= expirationDate.getTime() - now.getTime();
    return duration;
}

export const getAuthToken=()=>{
    const token= localStorage.getItem("Token");
    const tokenDuration= getTokenDuration();

   if (tokenDuration<0){
    return "EXPIRED"
}
    return token;
}

export const tokenLoader=()=>{
    return getAuthToken();
}


export const checkAuthLoader=()=>{
    const token=getAuthToken();
    if (!token){
        return redirect("/auth?mode=login")
    }
}