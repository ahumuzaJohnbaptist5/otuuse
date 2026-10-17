import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
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