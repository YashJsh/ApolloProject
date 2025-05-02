import { Filters } from "@/components/Content";
import axios from "axios"
import { error } from "console";

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
        console.log(params);
        const response = await axios.get(`http://localhost:3006/api/doctors?${params}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch doctors : ", error);
    }
    
}