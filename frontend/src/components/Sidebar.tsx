// Sidebar.tsx
import React, { useState } from "react";
import { Filters } from "./Content";

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
}

const allLanguages = [
    'English',
    'Hindi',
    'Telugu',
    'Tamil',
    'Marathi',
    'Kannada',
    'Gujarati',
    'Punjabi',
    'Bengali',
    'Urdu',
    'Malayalam',
    'Oriya',
    'Assamese',
    'Kashmiri',
    'Sindhi',
];

  
const Sidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  // Generic handler for string[] arrays (checkbox groups)
  const handleCheckboxArray = <K extends keyof Filters>(
    key: K,
    value: string,
    checked: boolean
  ) => {
    const prev = filters[key] as unknown as string[];
    const next = checked ? [...prev, value] : prev.filter((v) => v !== value);
    onFilterChange(key, next as Filters[K]);
  };

  const [expanded, setExpanded] = useState(false);
  
  // Decide how many to show
  const displayed = expanded ? allLanguages : allLanguages.slice(0, 3);

  const toggleLanguage = (lang: string, checked: boolean) => {
    const prev = filters.languages;
    const next = checked
      ? [...prev, lang]
      : prev.filter((l) => l !== lang);
    onFilterChange('languages', next);
  };


  return (
    <aside className= "hidden lg:block  bg-white p-4 border-r space-y-6">
      <h2 className="text-lg font-bold py-2 border-b">Filters</h2>
      
  
      {/* Mode of Consult */}
      <div>
        <label className="block text-lg font-semibold mb-2">
          Mode of Consult
        </label>
        <div className="flex flex-col gap-4 pl-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-[18px] w-[18px] accent-[#3D88A0] "
              checked={filters.consultationType.includes("hospital")}
              onChange={(e) =>
                handleCheckboxArray(
                  "consultationType",
                  "hospital",
                  e.target.checked
                )
              }
            />
            <span className="ml-2 font-medium">Hospital Visit</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-[18px] w-[18px] accent-[#3D88A0]"
              checked={filters.consultationType.includes("online")}
              onChange={(e) =>
                handleCheckboxArray(
                  "consultationType",
                  "online",
                  e.target.checked
                )
              }
            />
            <span className="ml-2 font-medium">Online Consult</span>
          </label>
        </div>
      </div>


      {/* Experience (In Years) */}
      <div>
        <label className="block text-lg font-semibold mb-2">
          Experience (In Years)
        </label>
        <div className="flex flex-col gap-4 pl-2">
          {["0-5", "6-10", "11-16", "17+"].map((range) => (
            <label key={range} className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-[18px] w-[18px] accent-[#3D88A0]"
                checked={filters.experience.includes(range)}
                onChange={(e) =>
                  handleCheckboxArray("experience", range, e.target.checked)
                }
              />
              <span className="ml-2 font-medium">{range}</span>
            </label>
          ))}
        </div>
      </div>


      {/* Fees Range */}
      <div>
      <label className="block text-lg font-semibold mb-2">Fees (In Rupees)</label>
        <div className="flex flex-col gap-4 pl-2">
          {["100-500", "500-1000", "1000+"].map((range) => (
            <label key={range} className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-[18px] w-[18px] accent-[#3D88A0]"
                checked={filters.fees.includes(range)}
                onChange={(e) =>
                  handleCheckboxArray("fees", range, e.target.checked)
                }
              />
              <span className="ml-2 font-medium">
                {range === "1000+" ? "₹1000+" : `₹${range.replace("-", "–")}`}
              </span>
            </label>
          ))}
        </div>
      </div>

        {/* Language */}
      <div className="flex flex-col gap-2  items-start">
      <label className="block text-lg font-semibold mb-2">Language</label>

      <div className="flex flex-col gap-3 pl-2 overflow-auto">
        {displayed.map((lang) => (
          <label key={lang} className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-[18px] w-[18px] accent-[#3D88A0]"
              checked={filters.languages.includes(lang)}
              onChange={(e) => toggleLanguage(lang, e.target.checked)}
            />
            <span className="ml-2">{lang}</span>
          </label>
        ))}
      </div>

      <button
        className="mt-2 text-[#3D88A0] hover:underline text-sm "
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? 'Show less' : `+${allLanguages.length - 3} more`}
      </button>
    </div>

 {/* Facility */}
<div>
  <label className="block text-lg font-semibold mb-2">Facility</label>
  <div className="flex flex-col gap-3 pl-2">
    {['Apollo Hospital', 'Other Clinics', 'Home'].map((fac) => (
      <label key={fac} className="inline-flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-[18px] w-[18px] accent-[#3D88A0]"
          id={`fac-${fac}`}
          checked={filters.facility.includes(fac)}
          onChange={(e) =>
            handleCheckboxArray('facility', fac, e.target.checked)
          }
        />
        <span className="ml-2 font-medium">{fac}</span>
      </label>
    ))}
  </div>
</div>

    
    </aside>
  );
};

export default Sidebar;

