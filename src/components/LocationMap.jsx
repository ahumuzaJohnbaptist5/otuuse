import { useEffect, useRef, useState } from "react";

let leafletPromise;
function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  if (!leafletPromise) {
    leafletPromise = new Promise((resolve, reject) => {
      if (!document.getElementById("otuuse-leaflet-css")) {
        const css = document.createElement("link");
        css.id = "otuuse-leaflet-css";
        css.rel = "stylesheet";
        css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        css.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoT2T7H5GQxYB8=";
        css.crossOrigin = "";
        document.head.appendChild(css);
      }
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      script.crossOrigin = "";
      script.onload = () => resolve(window.L);
      script.onerror = () => { leafletPromise = null; reject(new Error("Unable to load the map.")); };
      document.body.appendChild(script);
    });
  }
  return leafletPromise;
}

export async function reverseGeocode(lat, lng) {
  const response = await fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&addressdetails=1&lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lng), {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error("Place name unavailable");
  const data = await response.json();
  return data.display_name || "Pinned location";
}

export default function LocationMap({ onSelect, initialPosition, onClose }) {
  const element = useRef(null);
  const callback = useRef(onSelect);
  const [message, setMessage] = useState("Tap the map to choose a location.");
  callback.current = onSelect;
  useEffect(() => {
    let map;
    let cancelled = false;
    loadLeaflet().then(L => {
      if (cancelled || !element.current) return;
      const start = initialPosition || [-1.248, 29.99];
      map = L.map(element.current).setView(start, initialPosition ? 16 : 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);
      let marker = initialPosition ? L.marker(start).addTo(map) : null;
      map.on("click", async event => {
        const { lat, lng } = event.latlng;
        if (marker) marker.setLatLng([lat, lng]);
        else marker = L.marker([lat, lng]).addTo(map);
        setMessage("Finding place name...");
        try {
          const name = await reverseGeocode(lat, lng);
          if (!cancelled) { callback.current({ lat, lng, name }); setMessage("Location selected. You can tap elsewhere to change it."); }
        } catch {
          if (!cancelled) { callback.current({ lat, lng, name: "Pinned location" }); setMessage("Coordinates selected; place name unavailable."); }
        }
      });
      setTimeout(() => { if (!cancelled) map.invalidateSize(); }, 100);
    }).catch(error => { if (!cancelled) setMessage(error.message); });
    return () => { cancelled = true; if (map) map.remove(); };
  }, [initialPosition?.[0], initialPosition?.[1]]);
  return <div className="rounded-xl border border-gray-200 overflow-hidden mt-3">
    <div className="flex justify-between items-center px-4 py-3 bg-green-50"><p className="font-semibold text-green-950">Choose a location on the map</p><button type="button" onClick={onClose} className="font-semibold text-green-800">Close map</button></div>
    <div ref={element} className="h-72 w-full" role="application" aria-label="Map to select a location" />
    <p role="status" className="p-3 text-sm text-gray-600">{message}</p>
  </div>;
}
