"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRouter = void 0;
const express_1 = require("express");
const doctor_1 = __importDefault(require("../model/doctor"));
const helper_1 = require("../helper");
const router = (0, express_1.Router)();
router.post("/add-doctor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newDoctor = new doctor_1.default(body);
        const savedDoctor = yield newDoctor.save();
        res.status(201).json({
            message: "Doctor added successfully",
            doctor: savedDoctor
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Failed to add doctor"
        });
    }
}));
router.get("/doctors", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, experience, fees, languages, consultationType, facility, } = req.query;
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const filters = {};
        // Experience filter
        if (experience) {
            const ranges = Array.isArray(experience) ? experience : [experience];
            const experienceFilters = ranges.map((rangeStr) => {
                const { min, max } = (0, helper_1.parseExperienceRange)(rangeStr);
                const condition = {};
                if (!isNaN(min))
                    condition.$gte = min;
                if (max !== undefined && !isNaN(max))
                    condition.$lte = max;
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
                    if (range === "1000+")
                        return { $gte: 1000 };
                    const [min, max] = range.split("-").map(Number);
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
        const total = yield doctor_1.default.countDocuments(filters);
        const doctors = yield doctor_1.default.find(filters)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);
        console.log(filters);
        res.status(200).json({
            message: "Fetched Doctors Successfully",
            doctors,
            total,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch doctors",
        });
    }
}));
exports.doctorRouter = router;
