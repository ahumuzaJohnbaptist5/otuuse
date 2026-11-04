import { useEffect, useState } from "react";
import { Send, MapPin, Phone, Clock, FileText } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LocationMap, { reverseGeocode } from "../components/LocationMap";

const serviceImage = (name = "") => {
  const label = name.toLowerCase();
  if (label.includes("boda") || label.includes("motorcycle")) return "/images/boda-1.jpeg";
  if (label.includes("bicycle") || label.includes("e-bike") || label.includes("bike hire")) return "/images/bike-1.jpeg";
  if (label.includes("car") || label.includes("taxi")) return "/images/car-1.jpeg";
  if (label.includes("deliver") || label.includes("package") || label.includes("parcel")) return "/images/cargo-1.jpeg";
  if (label.includes("mov") || label.includes("hostel") || label.includes("house")) return "/images/cargo-2.jpeg";
  return "/images/background.jpeg";
};

const RequestService = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    service: "",
    pickup: "",
    destination: "",
    phone: "",
    description: "",
    time: "",
  });

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [trackingToken, setTrackingToken] = useState("");
  const [trackingStatus, setTrackingStatus] = useState("");
  const [trackingError, setTrackingError] = useState("");
  const [trackingBusy, setTrackingBusy] = useState(false);
  const [trackingUpdatedAt, setTrackingUpdatedAt] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [coords, setCoords] = useState({ pickup: null, destination: null });
  const [mapTarget, setMapTarget] = useState(null);
  const [locating, setLocating] = useState(false);
  const [gpsAccuracy, setGpsAccuracy] = useState(null);
  const [locationMessage, setLocationMessage] = useState("");
  const apiBase = (import.meta.env.VITE_API_BASE_URL || "https://otuuse-api.onrender.com").replace(/\/$/, "");
  const trackingComplete = ["COMPLETED", "CANCELLED"].includes(trackingStatus);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    setLoadingServices(true);
    setError("");
    fetch(apiBase + "/api/services/", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Services could not be loaded (HTTP " + response.status + ").");
        return response.json();
      })
      .then((data) => {
        const available = Array.isArray(data) ? data : (data.results || []);
        setServices(available);
        if (available.length === 0) setError("No active services are configured yet. Please contact Otuuse or try again later.");
      })
      .catch((err) => {
        if (!controller.signal.aborted || err.name !== "AbortError") {
          setError("Could not connect to the booking service. Please retry or contact Otuuse directly.");
        } else {
          setError("The service request timed out. Please retry.");
        }
      })
      .finally(() => { clearTimeout(timeout); setLoadingServices(false); });
    return () => { clearTimeout(timeout); controller.abort(); };
  }, [retryCount]);

  const chooseLocation = ({ lat, lng, name }) => {
    setCoords(old => ({ ...old, [mapTarget]: { lat, lng } }));
    setFormData(old => ({ ...old, [mapTarget]: name }));
  };
  const useGPS = () => {
    if (!window.isSecureContext) { setLocationMessage("GPS requires HTTPS. Open the secure OTUUSE website or use the map."); return; }
    if (!navigator.geolocation) { setLocationMessage("This browser does not support location detection. Please use the map."); return; }
    setLocating(true); setLocationMessage("");
    navigator.geolocation.getCurrentPosition(async ({ coords: position }) => {
      const point = { lat: position.latitude, lng: position.longitude };
      setGpsAccuracy(Math.round(position.accuracy));
      setCoords(old => ({ ...old, pickup: point }));
      setFormData(old => ({ ...old, pickup: "" }));
      setLocationMessage("GPS coordinates detected. Finding the nearest named place...");
      try {
        const name = await reverseGeocode(point.lat, point.lng);
        if (!name || name === "Pinned location") throw new Error("No readable address found");
        setFormData(old => !old.pickup ? ({ ...old, pickup: name }) : old);
        setLocationMessage("");
      } catch {
        setFormData(old => old.pickup ? old : ({ ...old, pickup: "" }));
        setLocationMessage("GPS coordinates detected, but the place name could not be found. Please type your pickup location or select it on the map.");
      } finally { setLocating(false); }
      if (position.accuracy > 100) setLocationMessage(current => current || `Your location is approximate (±${Math.round(position.accuracy)} m). Please verify the pickup on the map before booking.`);
    }, (err) => {
      setLocating(false);
      const messages = {
        1: "Location permission was denied. Enable location permission for this website in your browser settings, then try again.",
        2: "Your device could not determine its location. Enable device location services or select a pickup on the map.",
        3: "Location detection timed out. Try moving to an area with a better GPS signal or use the map.",
      };
      setLocationMessage(messages[err.code] || "Location detection failed. You can choose your pickup on the map.");
    },
    { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (["pickup", "destination"].includes(e.target.name)) setCoords(old => ({ ...old, [e.target.name]: null }));
    if (e.target.name === "pickup") setGpsAccuracy(null);
  };

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("otuuse-last-booking") || "null");
      if (saved && Number.isInteger(saved.id) && typeof saved.token === "string" && saved.token.length > 0) {
        setConfirmation(saved.id);
        setTrackingToken(saved.token);
      }
    } catch { sessionStorage.removeItem("otuuse-last-booking"); }
  }, []);

  useEffect(() => {
    if (!trackingToken || trackingComplete) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") checkBookingStatus(trackingToken);
    }, 60000);
    return () => window.clearInterval(timer);
  }, [trackingToken, trackingComplete]);

  const checkBookingStatus = async (token = trackingToken) => {
    if (!token) return;
    setTrackingBusy(true); setTrackingError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(apiBase + "/api/bookings/track/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tracking_token: token }), signal: controller.signal });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.detail || "Unable to check booking status.");
      setTrackingStatus(result.status);
      setTrackingUpdatedAt(new Date().toLocaleTimeString());
    } catch (err) { setTrackingError(err.name === "AbortError" ? "Status request timed out." : err.message); }
    finally { window.clearTimeout(timeout); setTrackingBusy(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError("");
    setSubmitting(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(apiBase + "/api/bookings/", {
        signal: controller.signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.customer_name.trim(),
          service: Number(formData.service),
          pickup: formData.pickup.trim(),
          destination: formData.destination.trim(),
          phone: formData.phone.trim(),
          notes: [formData.time && "Preferred time: " + formData.time, formData.description,
            coords.pickup && "Pickup GPS: " + coords.pickup.lat.toFixed(6) + ", " + coords.pickup.lng.toFixed(6),
            coords.destination && "Destination GPS: " + coords.destination.lat.toFixed(6) + ", " + coords.destination.lng.toFixed(6)
          ].filter(Boolean).join("\n"),
        }),
      });
      if (!response.ok) throw new Error("Your booking could not be saved. Please check the details and try again.");
      const booking = await response.json();
      setConfirmation(booking.id);
      setTrackingToken("");
      setTrackingStatus("");
      setTrackingUpdatedAt("");
      sessionStorage.removeItem("otuuse-last-booking");
      if (booking.tracking_token) {
        setTrackingToken(booking.tracking_token);
        setTrackingStatus(booking.status || "PENDING");
        sessionStorage.setItem("otuuse-last-booking", JSON.stringify({ id: booking.id, token: booking.tracking_token }));
      }
      setCoords({ pickup: null, destination: null });
      setGpsAccuracy(null);
      setMapTarget(null);
      setFormData({ customer_name: "", service: "", pickup: "", destination: "", phone: "", description: "", time: "" });
    } catch (err) {
      setError(err.name === "AbortError" ? "Booking request timed out. Please check with Otuuse before retrying, to avoid creating a duplicate booking." : err instanceof TypeError ? "Unable to reach the booking server. Check your internet connection and try again." : err.message || "Unable to submit your booking right now.");
    } finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-7">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-green-950">Request a Service</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the form below. Your booking will be sent directly to the Otuuse team.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-7 lg:p-9 border border-gray-100">
            {error && <p role="alert" className="mb-6 rounded-xl bg-red-50 p-4 text-red-800">{error}</p>}
            {confirmation && <div role="status" className="mb-6 rounded-xl bg-green-50 p-4 text-green-900 space-y-2"><p>Booking #{confirmation} received successfully! Our team will contact you.</p>{trackingToken && <><p className="font-semibold">Current status: {trackingStatus || "Checking..."}</p><button type="button" disabled={trackingBusy} onClick={() => checkBookingStatus()} className="rounded-lg bg-green-900 text-white px-4 py-2 disabled:opacity-50">{trackingBusy ? "Checking..." : "Refresh booking status"}</button>{trackingUpdatedAt && <p className="text-xs">Last checked: {trackingUpdatedAt}</p>}{trackingError && <p role="alert" className="text-red-800">{trackingError}</p>}<p className="text-sm">Status updates automatically every minute while this page is open. Your tracking access is saved only in this browser tab. Do not share your private tracking token.</p></>}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="customer_name" className="block text-sm font-semibold text-gray-700 mb-2">Your Full Name *</label>
                <input id="customer_name" name="customer_name" type="text" maxLength={100} required value={formData.customer_name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl" placeholder="Your full name" />
              </div>
              
              {/* Service Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">What service do you need? *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                  {services.map((option) => (
                    <label
                      key={option.id}
                      className={`flex flex-col items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.service === String(option.id)
                          ? "border-orange-500 bg-orange-50 text-orange-700 shadow-sm"
                          : "border-gray-200 hover:border-green-300 text-gray-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={String(option.id)}
                        checked={formData.service === String(option.id)}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      <img src={serviceImage(option.name)} alt="" loading="lazy" className="w-full h-24 sm:h-28 object-cover rounded-lg mb-3" />
                      <span className="text-sm font-medium">{option.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {loadingServices && <p role="status">Loading available services...</p>}
              {!loadingServices && services.length === 0 && <div className="rounded-xl bg-amber-50 p-4 text-amber-900"><p>Online booking is unavailable until services can be loaded.</p><button type="button" onClick={() => setRetryCount((count) => count + 1)} className="mt-2 rounded-lg bg-green-800 px-4 py-2 font-semibold text-white hover:bg-green-900">Retry loading services</button></div>}
              {/* Locations */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="pickup"
                      value={formData.pickup}
                      onChange={handleChange}
                      placeholder="e.g., Kabale University Main Gate"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Destination *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400" size={20} />
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="e.g., Kikungulu Hostel"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>
              </div>

              <section className="rounded-xl bg-green-50 p-4 space-y-3">
                <h3 className="font-bold text-green-950">GPS and map selection</h3>
                <p className="text-sm text-gray-700">Use GPS to fill your pickup, or select pickup and destination by tapping the map. You can also type locations manually.</p>
                {locationMessage && <p role="status" className="text-sm text-red-800">{locationMessage}</p>}
                {gpsAccuracy !== null && <p role="status" className="text-sm text-green-900">GPS estimated accuracy: ±{gpsAccuracy} metres. Check the location on the map if it is not correct.</p>}
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={useGPS} disabled={locating} className="bg-green-800 text-white rounded-lg px-4 py-2 disabled:opacity-50">{locating ? "Locating..." : "Use my current location"}</button>
                  <button type="button" onClick={() => setMapTarget("pickup")} className="border border-green-800 rounded-lg px-4 py-2">Choose pickup on map</button>
                  <button type="button" onClick={() => setMapTarget("destination")} className="border border-green-800 rounded-lg px-4 py-2">Choose destination on map</button>
                </div>
                {["pickup", "destination"].map(key => coords[key] && <p key={key} className="text-sm text-green-900">{key} coordinates: {coords[key].lat.toFixed(6)}, {coords[key].lng.toFixed(6)}</p>)}
                {mapTarget && <LocationMap key={mapTarget} onSelect={chooseLocation} onClose={() => setMapTarget(null)} initialPosition={coords[mapTarget] ? [coords[mapTarget].lat, coords[mapTarget].lng] : coords.pickup ? [coords.pickup.lat, coords.pickup.lng] : null} />}
              </section>

              {/* Contact & Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+256 7XX XXX XXX"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      placeholder="e.g., Now, 2:00 PM, Tomorrow Morning"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Details</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-gray-400" size={20} />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us more (e.g., number of bags, specific items, landmarks...)"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || loadingServices || services.length === 0 || !formData.service}
                className="w-full disabled:opacity-50 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
              >
                {submitting ? "Submitting..." : "Submit Booking"} <Send size={20} />
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Your booking will be recorded. Our team will contact you to confirm availability.
              </p>
            </form>
          </div>

          {/* Alternative Contact */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Prefer to talk directly?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="tel:256791475407" 
                className="inline-flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                <Phone size={18} /> Call Otuuse
              </a>
              <a 
                href="https://wa.me/256791475407" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                WhatsApp Otuuse
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RequestService;