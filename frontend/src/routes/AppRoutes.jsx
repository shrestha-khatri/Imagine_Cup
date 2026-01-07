import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import HospitalRegister from "../pages/hospital/HospitalRegister";

/* Hospital pages */
import HospitalLogin from "../pages/hospital/HospitalLogin";
import HospitalDashboard from "../pages/hospital/HospitalDashboard";
import BedRequests from "../pages/hospital/BedRequests";
import AppointmentRequests from "../pages/hospital/AppointmentRequests";

/* User pages */
import UserLogin from "../pages/user/UserLogin";
import UserRegister from "../pages/user/UserRegister";
import UserDashboard from "../pages/user/UserDashboard";
import BookBed from "../pages/user/BookBed";
import BookAppointment from "../pages/user/BookAppointment";
import MyBedBookings from "../pages/user/MyBedBookings";
import MyAppointments from "../pages/user/MyAppointments";
import ViewHospitals from "../pages/user/ViewHospitals";
import HospitalDetails from "../pages/user/HospitalDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Hospital */}
        <Route path="/hospital/login" element={<HospitalLogin />} />
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
        <Route path="/hospital/bed-requests" element={<BedRequests />} />
        <Route path="/hospital/register" element={<HospitalRegister />} />
        <Route
          path="/hospital/appointment-requests"
          element={<AppointmentRequests />}
        />

        {/* User */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/book-bed" element={<BookBed />} />
        <Route
          path="/user/book-appointment/:specialistId"
          element={<BookAppointment />}
        />
        <Route path="/user/my-beds" element={<MyBedBookings />} />
        <Route path="/user/my-appointments" element={<MyAppointments />} />
        <Route path="/user/hospitals" element={<ViewHospitals />} />
        <Route
          path="/user/hospital/:hospitalId"
          element={<HospitalDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}
