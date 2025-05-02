import mongoose from 'mongoose';

export interface doctorSchema {
    name: string;
    speciality: string;
    experience: string;
    location: string;
    availableToday: boolean;
    consultationType: string[]; // e.g., ['hospital', 'online']
    rating?: number;
    languages?: string[];
    fees: number;
    facility?: string[];
    imageUrl?: string;
}

export interface ListDoctorQuery {
  page?: string;                          // parsed into number
  limit?: string;                         // parsed into number
  experience?: string | string[];         // e.g. "0-5" or ["0-5","6-10"]
  fees?: string | string[];               // e.g. "100-500" or ["100-500","1000+"]
  languages?: string | string[];           // e.g. "English"
  consultationType?: string | string[];   // e.g. "hospital"
  facility?: string | string[];           // e.g. "Apollo Hospital"
}

const DoctorSchema = new mongoose.Schema({
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

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
