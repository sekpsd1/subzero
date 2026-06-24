import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";

export const metadata = {
  title: "Showroom Appointment",
  description: "Schedule a showroom appointment with a regional Sub-Zero Wolf SEA team.",
};

export default function AppointmentPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0F0F0F] px-6 py-32 text-[#FBF9F5] md:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-stone-500">
              Appointment
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-tight">
              Schedule a showroom appointment
            </h1>
            <p className="mt-6 text-base leading-8 text-stone-300">
              Embark on your kitchen journey with a personalized experience.
              Our expert consultants are ready to help bring your vision to life.
            </p>
          </div>
          <form className="grid gap-4 border border-white/10 bg-white/[0.03] p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm">
                Visitor type
                <select className="border border-white/10 bg-black px-4 py-3">
                  <option>Shopper</option>
                  <option>Trade Professional</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                Country
                <select className="border border-white/10 bg-black px-4 py-3">
                  <option>Thailand</option>
                  <option>Singapore</option>
                  <option>Indonesia</option>
                  <option>Malaysia</option>
                </select>
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input className="border border-white/10 bg-black px-4 py-3" placeholder="First Name" />
              <input className="border border-white/10 bg-black px-4 py-3" placeholder="Last Name" />
              <input className="border border-white/10 bg-black px-4 py-3" placeholder="Phone Number" />
              <input className="border border-white/10 bg-black px-4 py-3" placeholder="Email" type="email" />
              <input className="border border-white/10 bg-black px-4 py-3" placeholder="Preferred Date" />
              <input className="border border-white/10 bg-black px-4 py-3" placeholder="Preferred Time" />
            </div>
            <input
              className="border border-white/10 bg-black px-4 py-3"
              placeholder="Country product installation"
            />
            <textarea
              className="min-h-32 border border-white/10 bg-black px-4 py-3"
              placeholder="Message"
            />
            <button
              type="button"
              className="w-fit border border-white px-6 py-3 text-xs uppercase tracking-[0.25em]"
            >
              Send Request
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
