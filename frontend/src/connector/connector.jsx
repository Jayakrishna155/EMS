import {create} from 'zustand'
import axios from "axios"

const API_URL = "http://localhost:3000/";
export const connector = create((set)=>{
    login:async (f_sno,f_userName,f_Pwd)=>{
        try 
        {
            const res = await axios.post(`${API_URL}/login`,{f_sno,f_userName,f_Pwd});
        }
        catch(err){
            console.log(err);
        }
    }
})