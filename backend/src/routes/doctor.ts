import {Router} from "express";
import Doctor, { doctorSchema, ListDoctorQuery } from "../model/doctor";
import { parseExperienceRange } from "../helper";

const router = Router();

router.post("/add-doctor", async(req, res) =>{
    try{
        const body : doctorSchema= req.body;
        const newDoctor = new Doctor(body);
        const savedDoctor = await newDoctor.save();
        res.status(201).json({
            message : "Doctor added successfully",
            doctor : savedDoctor
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            error : "Failed to add doctor"
        });
    }
});

router.get("/doctors", async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        experience,
        fees,
        languages,
        consultationType,
        facility,
      } = req.query as ListDoctorQuery;
      const pageNum = Number(page);
      const limitNum = Number(limit);
  
      const filters: Record<string, any> = {};
  
      // Experience filter
      if (experience) {
        const ranges = Array.isArray(experience) ? experience : [experience];
        const experienceFilters = ranges.map((rangeStr) => {
          const { min, max } = parseExperienceRange(rangeStr);
          const condition: Record<string, any> = {};
          if (!isNaN(min)) condition.$gte = min;
          if (max !== undefined && !isNaN(max)) condition.$lte = max;
          return { experience: condition };
        });
  
        if (experienceFilters.length > 0) {
          filters.$or = experienceFilters;
        }
      }
  
      // Fees filter
      if (fees) {
        const ranges = Array.isArray(fees) ? fees : [fees];
        filters.fees = {
          $in: ranges.map((range) => {
            if (range === "1000+") return { $gte: 1000 };
            const [min, max] = (range as string).split("-").map(Number);
            return { $gte: min, $lte: max };
          }),
        };
      }
  
      // Language filter
      console.log(languages);
      if (languages) {
        filters.languages = { $in: Array.isArray(languages) ? languages : [languages] };
      }
  
       // Consultation type filter
    if (consultationType) {    
        const consultationTypes = Array.isArray(consultationType)
          ? consultationType
          : consultationType.split(","); // Split the string into an array
        
        filters.consultationType = {
          $in: consultationTypes,
        };
      }
  
      // Facility filter
      if (facility) {
        filters.facility = { $in: Array.isArray(facility) ? facility : [facility] };
      }
  
      // Fetch total count and doctors list
      const total = await Doctor.countDocuments(filters);
      const doctors = await Doctor.find(filters)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);
      console.log(filters);
      res.status(200).json({
        message: "Fetched Doctors Successfully",
        doctors,
        total,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to fetch doctors",
      });
    }
  });
  
export const doctorRouter = router;