"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DoctorSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    speciality: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    availableToday: {
        type: Boolean,
        required: true,
    },
    consultationType: {
        type: [String], // ['hospital', 'online']
        required: true, // typo fixed here (was "requried")
    },
    rating: {
        type: Number,
        default: 0,
    },
    languages: {
        type: [String], // e.g., ['English', 'Hindi']
        default: [],
    },
    fees: {
        type: Number, // 💡 add fees as it's a key filter
        required: true,
    },
    facility: {
        type: [String], // ['Apollo Hospital', 'Home']
        default: [],
    },
    imageUrl: {
        type: String,
        default: '',
    },
});
exports.default = mongoose_1.default.models.Doctor || mongoose_1.default.model('Doctor', DoctorSchema);
