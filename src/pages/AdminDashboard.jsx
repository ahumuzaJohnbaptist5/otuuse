import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Users, Truck, LogOut, RefreshCw } from "lucide-react";

const API = "https://otuuse-api.onrender.com/api/admin/";
const request = async (path, options = {}) => {
  const token = sessionStorage.getItem("otuuse-admin-token");
  const response = await fetch(API + path, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: "Token " + token } : {}), ...options.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.detail || "Request failed (" + response.status + ")");
  return data;
};

export function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const login = async (e) => {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const data = await request("login/", { method: "POST", body: JSON.stringify({ username, password }) });
      sessionStorage.setItem("otuuse-admin-token", data.token);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };
  return <main className="min-h-screen bg-green-950 flex items-center justify-center p-6">
    <form onSubmit={login} className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl space-y-5">
      <Link to="/" className="text-green-800 font-bold">← OTUUSE website</Link>
      <h1 className="text-3xl font-extrabold text-green-950">Administrator Login</h1>
      <p className="text-gray-600">Only authorized OTUUSE staff can access this area.</p>
      {error && <p role="alert" className="text-red-700 bg-red-50 rounded-lg p-3">{error}</p>}
      <label className="block font-semibold">Username<input autoComplete="username" required value={username} onChange={e=>setUsername(e.target.value)} className="mt-2 w-full border rounded-lg p-3"/></label>
      <label className="block font-semibold">Password<input autoComplete="current-password" type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full border rounded-lg p-3"/></label>
      <button disabled={busy} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg p-3 disabled:opacity-50">{busy ? "Signing in..." : "Sign in"}</button>
    </form>
  </main>;
}

const nav = [
  ["dashboard", "Overview", LayoutDashboard],
  ["bookings", "Bookings", ClipboardList],
  ["drivers", "Drivers", Users],
  ["services", "Services", Truck],
];
export function AdminDashboard({ section = "dashboard" }) {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    if (!sessionStorage.getItem("otuuse-admin-token")) { navigate("/admin/login", { replace: true }); return; }
    let active = true; setLoading(true); setError("");
    Promise.all([request(section + "/"), section === "bookings" ? request("drivers/") : Promise.resolve([])])
      .then(([result, available]) => { if (active) { setData(result); setDrivers(available); } })
      .catch(err => { if (active) { setError(err.message); if (/401|403|credentials|authentication/i.test(err.message)) { sessionStorage.removeItem("otuuse-admin-token"); navigate("/admin/login", { replace: true }); } } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [section, refresh, navigate]);
  const logout = async () => {
    try { await request("logout/", { method: "POST" }); } catch {}
    sessionStorage.removeItem("otuuse-admin-token"); navigate("/admin/login", { replace: true });
  };
  const updateBooking = async (id, patch) => {
    setError("");
    try { await request("bookings/" + id + "/", { method: "PATCH", body: JSON.stringify(patch) }); setRefresh(x=>x+1); }
    catch(err) { setError(err.message); }
  };
  return <div className="min-h-screen bg-gray-50 md:flex">
    <aside className="bg-green-950 text-white md:w-64 p-6 flex-shrink-0">
      <Link to="/" className="font-black text-2xl">OTUUSE</Link><p className="text-green-200 text-sm mt-1 mb-8">Administration</p>
      <nav className="flex flex-wrap md:flex-col gap-2">{nav.map(([key,label,Icon])=><Link key={key} to={"/admin/"+key} className={"flex items-center gap-3 rounded-lg px-4 py-3 "+(section===key?"bg-orange-500":"hover:bg-green-800")}><Icon size={18}/>{label}</Link>)}</nav>
      <button onClick={logout} className="mt-8 flex gap-2 items-center text-green-100 hover:text-white"><LogOut size={18}/> Sign out</button>
    </aside>
    <main className="flex-1 min-w-0 p-5 md:p-10">
      <div className="flex justify-between items-center mb-8"><h1 className="text-3xl font-extrabold text-green-950 capitalize">{section === "dashboard" ? "Overview" : section}</h1><button onClick={()=>setRefresh(x=>x+1)} className="flex items-center gap-2 border rounded-lg bg-white px-4 py-2"><RefreshCw size={17}/> Refresh</button></div>
      {error && <p role="alert" className="bg-red-50 text-red-800 p-4 rounded-lg mb-5">{error}</p>}
      {loading ? <p>Loading dashboard...</p> : section === "dashboard" && data ? <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{Object.entries(data).map(([key,value])=><div key={key} className="bg-white shadow-sm rounded-2xl p-7 border"><p className="text-gray-500 capitalize">{key.replaceAll("_"," ")}</p><p className="text-4xl font-extrabold text-green-950 mt-3">{value}</p></div>)}</div>
      : section === "bookings" && Array.isArray(data) ? <div className="space-y-4">{data.map(b=><article key={b.id} className="bg-white rounded-xl border shadow-sm p-5"><div className="flex flex-wrap justify-between gap-2"><h2 className="font-bold text-green-950">#{b.id} · {b.customer_name} · {b.service}</h2><span className="text-sm font-semibold">{b.status}</span></div><p className="mt-2 text-gray-600">{b.pickup} → {b.destination}</p><p className="text-gray-600">Contact: {b.phone}</p><div className="flex flex-wrap gap-3 mt-4"><label className="text-sm">Assign driver<select aria-label={"Assign driver to booking "+b.id} value={b.driver_id || ""} onChange={e=>updateBooking(b.id,{driver_id:e.target.value || null})} className="block border rounded-lg p-2 mt-1"><option value="">Unassigned</option>{drivers.map(d=><option key={d.id} value={d.id}>{d.name} · {d.vehicle_type}</option>)}</select></label><label className="text-sm">Booking status<select aria-label={"Status for booking "+b.id} value={b.status} onChange={e=>updateBooking(b.id,{status:e.target.value})} className="block border rounded-lg p-2 mt-1">{["PENDING","CONFIRMED","ASSIGNED","IN_PROGRESS","COMPLETED","CANCELLED"].map(x=><option key={x}>{x}</option>)}</select></label></div></article>)}{data.length===0&&<p>No bookings yet.</p>}</div>
      : Array.isArray(data) ? <div className="bg-white rounded-xl shadow-sm border overflow-x-auto"><table className="w-full text-left"><thead className="bg-green-50"><tr>{(section==="drivers"?["Name","Email","Phone","Vehicle","Status"]:["Service","Active","Base fare (UGX)","Per km (UGX)"]).map(x=><th key={x} className="p-4">{x}</th>)}</tr></thead><tbody>{data.map(item=><tr key={item.id} className="border-t">{(section==="drivers"?[item.name,item.email,item.phone,item.vehicle_type,item.status]:[item.name,item.is_active?"Yes":"No",item.base_price_ugx,item.per_km_ugx]).map((value,i)=><td key={i} className="p-4">{value}</td>)}</tr>)}</tbody></table></div> : <p>Unable to display data.</p>}
    </main>
  </div>;
}
