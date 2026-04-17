export interface Service {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  department: Department;
}

interface TimeSlot {
  date: Date;
  time: {
    hour: number;
    half?: boolean;
  };
}

interface AvailableTimeSlots {
  date: Date;
  slots: {
    hour: number;
    half?: boolean;
    isAvailable?: boolean;
  }[];
}

interface Doctor {
  id: number;
  name: string;
  title: string;
  languages: string;
  specialties: string;
  image: string;
  isAvailable: boolean;
}

export interface SymptomDescription {
  symptoms: string[];
  description: string;
  images: string[];
}

export interface Inquiry extends SymptomDescription {
  department?: Department;
}

export interface Feedback {
  title: string;
  description: string;
  images: string[];
  category: string;
}

export interface Booking {
  id: number;
  status: string;
  patientName: string;
  schedule: TimeSlot;
  doctor: Doctor;
  department: Department;
}

export interface Invoice {
  id: number;
  booking: Booking;
}

export interface DepartmentGroup {
  id: number;
  name: string;
  description: string;
}

export interface Department {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  groupId: number;
}

interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  timeAgo: string;
  image: string;
  content: string;
}

export interface DressStyle {
  id: number;
  name: string;
  description: string;
  image?: string;
}

export interface Consultant {
  id: number;
  name: string;
  specialty: string;
  image: string;
  isAvailable: boolean;
}

export interface Measurements {
  height?: number;
  weight?: number;
  bust?: number;
  waist?: number;
  hips?: number;
}

export interface BookingDressForm {
  slot?: TimeSlot;
  dressStyle?: DressStyle;
  consultant?: Consultant;
  measurements?: Measurements;
  notes?: string;
  referenceImages?: string[];
}
