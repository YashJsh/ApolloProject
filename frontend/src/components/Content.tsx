"use client"

import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import DoctorPage from './DoctorPage';
import { useDebouncedCallback } from 'use-debounce'
import { Doctor, fetchDoctors } from '@/services/doctorApi';

export interface Filters {
  speciality: string;
  location: string;
  experience: string[];  // Changed to array
  consultationType: string[];
  rating: string;
  languages: string[];
  fees: string[];        // Changed to array
  facility: string[];
  page: number;          // Add pagination
  pageSize: number;      // Add pagination
}

const Content : React.FC = () => {

  const [filters, setFilters] = useState<Filters>({
    speciality: '',
    location: '',
    experience: [],
    consultationType: [],
    rating: '',
    languages: [],
    fees: [],
    facility: [],
    page : 1,
    pageSize : 10
  });
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  const handleFilterChange = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      ...(key !== 'page' && { page: 1 }) // Reset to first page on filter change
    }));
  };

  const debouncedFetch  = useDebouncedCallback(
    async (currentFilters : Filters)=>{
      try{
        setLoading(true);
        const { doctors, total} = await fetchDoctors(currentFilters);
        setDoctors(doctors);
        setTotal(total);
      }catch(err){
        console.error(err);
        setError("Error Loading Doctors");
      } finally{
        setLoading(false);
      }
  }, 1000)

  useEffect(()=>{
    let isMounted = true;
    const fetchData = async ()=>{
      if (isMounted){
        console.log("current filters : ", filters)
        await debouncedFetch(filters)
      }
    }
    fetchData();

    return ()=>{
      isMounted = false;
      debouncedFetch.cancel();
    }
  }, [filters, debouncedFetch])


  return (
  <div className='container mx-auto flex px-3 py-1'>
      <Sidebar filters={filters} onFilterChange={handleFilterChange}/>

      <DoctorPage 
        doctors = {doctors}
        currentPage = {filters.page}
        totalPages = {Math.ceil(total/filters.pageSize)}
        onPageChange = {(page)=>handleFilterChange(
          'page', page
        )}
        loading = {loading}
        error = {error}
      />
  </div>
  )
}

export default Content;
