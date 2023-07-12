import {FC, createContext, useEffect, useState } from "react"
import React from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

//create context
interface AuthContextType{
    user: User|null,
    isLoading: boolean,
}
const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: false,
  })


//create Provider
interface AuthProviderProps{
    children: React.ReactElement;
}
const AuthProvider:FC<AuthProviderProps> = ({children}) =>{
    const [user,setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setUser(user),
            setIsLoading(false)
        });
        return unsubscribe
    },[])
    const value = {
        user,
        isLoading,
    }

    return (<AuthContext.Provider value = {value}>
        {!isLoading && children}
    </AuthContext.Provider>)
}
export {AuthContext, AuthProvider}