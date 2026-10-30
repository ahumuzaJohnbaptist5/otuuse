import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { AdminLogin, AdminDashboard } from "./pages/AdminDashboard";
import About from "./pages/About";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import Students from "./pages/Students";
import WhyElectric from "./pages/WhyElectric";
import RequestService from "./pages/RequestService";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Partners from "./pages/Partners";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard section="dashboard" />} />
        <Route path="/admin/bookings" element={<AdminDashboard section="bookings" />} />
        <Route path="/admin/drivers" element={<AdminDashboard section="drivers" />} />
        <Route path="/admin/services" element={<AdminDashboard section="services" />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/students" element={<Students />} />
        <Route path="/why-electric" element={<WhyElectric />} />
        <Route path="/request-service" element={<RequestService />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partners" element={<Partners />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;