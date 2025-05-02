import { Doctor } from "@/services/doctorApi";
import React from "react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

interface DoctorPageProps {
  doctors: Doctor[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading: boolean;
  error: string;
}

const DoctorPage: React.FC<DoctorPageProps> = ({
  doctors,
  currentPage,
  totalPages,
  onPageChange,
  loading,
}) => {
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    return (
      <div className="flex flex-wrap justify-center mt-8 gap-2 items-center px-4">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          Previous
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            key={startPage + i}
            onClick={() => onPageChange(startPage + i)}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === startPage + i
                ? "bg-[#165D59] text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
          >
            {startPage + i}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="pt-5 flex flex-col gap-5 px-4 sm:px-6 lg:px-10">
      <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl leading-snug">
        Consult General Physicians Online - Internal Medicine Specialists
      </h1>

      {loading && (
        <div className="text-center py-4">
          <Ring size="40" stroke="5" bgOpacity="0" speed="2" color="black" />
        </div>
      )}

      <>
        {doctors.map((doctor) => {
          const hasOnline = doctor.consultationType?.includes("online");
          const hasHospital = doctor.consultationType?.includes("hospital");
          const both = hasOnline && hasHospital;

          return (
            <div
              key={doctor._id}
              className="flex flex-col lg:flex-row gap-4 border border-slate-300 rounded-xl shadow-sm hover:shadow-md p-4"
            >
              {/* Image */}
              <img
                src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
                alt="doctor profile"
                className="h-24 w-24 sm:h-20 sm:w-20 rounded-full object-cover  lg:self-start"
              />

              {/* Doctor Info */}
              <div className="flex-1 flex flex-col gap-y-2 ">
                <div>
                  <h1 className="font-bold text-lg">{doctor.name}</h1>
                  <h2 className="text-gray-500 text-sm">{doctor.speciality}</h2>
                  <h2 className="text-[#6B45C6] font-bold text-sm">
                    {doctor.experience} Years
                  </h2>
                </div>

                <div className="text-gray-500 text-sm">
                  <p>{doctor.location}</p>
                  <p>{doctor.facility}</p>
                </div>
              </div>

              {/* Right Section */}
              <div className="lg:w-2/5 w-full flex flex-col justify-end gap-3">
                <div className="justify-end text-center">
                  <h2 className="font-bold text-lg">Rs {doctor.fees}</h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  {hasOnline && (
                    <button
                      className={`border-2 border-[#165D59] text-[#165D59] rounded-xl px-4 py-2 font-semibold hover:bg-[#DDF1F8] hover:shadow-md transition ${
                        both ? "w-full sm:w-1/2" : "w-full"
                      }`}
                    >
                      Consult Online
                    </button>
                  )}

                  {hasHospital && (
                    <button
                      className={`border-2 bg-[#106C89] text-white rounded-xl px-4 py-2 font-semibold hover:shadow-md transition ${
                        both ? "w-full sm:w-1/2" : "w-full"
                      }`}
                    >
                      Visit Doctor
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {renderPagination()}
      </>
    </div>
  );
};

export default DoctorPage;
