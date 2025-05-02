import { Filters } from "@/components/Content";
import axios from "axios"

export interface Doctor{
    _id : string;
    name : string;
    speciality : string
    experience : string;
    fees : number,
    location : string,
    consultationType  : string[];
    rating : number,
    languages : string[];
    facility : string[];   
}


export const fetchDoctors = async (filters : Filters) =>{

    const BACKEND_URI = process.env.NEXT_PUBLIC_API_URL ;
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value])=>{
        if(Array.isArray(value)){
            if(value.length > 0) params.set(key, value.join(','));
        }
        else if (typeof value ===  'boolean'){
            params.set(key, value.toString());
        }else if (value){
            params.set(key, value.toString());
        }
    })

    try {
        const response = await axios.get(`${BACKEND_URI}/api/doctors?${params}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch doctors : ", error);
    }
    
}