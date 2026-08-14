import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import styles from "./appointment.module.css";

export const metadata = {
  title: "Showroom Appointment",
  description: "Schedule a showroom appointment with a regional Sub-Zero and Wolf SEA team.",
};

type Location = {
  name?: string;
  address: string[];
  telephone?: string;
  email: string;
  hours: string;
  appointmentHref: string;
};

const showrooms: { title: string; locations: Location[] }[] = [
  {
    title: "The House of Sub-Zero and Wolf Thailand",
    locations: [{
      address: ["6 Soi Chamchun, Klongton-Nue, Wattana,", "Bangkok 10110 Thailand"],
      telephone: "+662 726 9113",
      email: "szw.enquiry@mykitchenart.com",
      hours: "Monday-Friday, 8.00 am – 5 pm",
      appointmentHref: "mailto:szw.enquiry@mykitchenart.com?subject=Showroom%20Appointment",
    }],
  },
  {
    title: "The House of Sub-Zero and Wolf Singapore",
    locations: [{
      address: ["31 McNair Road, Townerville, Singapore 328529"],
      telephone: "+65 6386 9335",
      email: "szw.enquiries@szw-sea.com",
      hours: "Mon-Fri 10am to 5.30pm",
      appointmentHref: "mailto:szw.enquiries@szw-sea.com?subject=Showroom%20Appointment",
    }],
  },
  {
    title: "The House of Sub-Zero and Wolf Indonesia",
    locations: [
      {
        name: "Indonesia Design District",
        address: ["Lot#T37A", "Jl.M.H Thamrin, Pantai Indah Kapuk 2. Tangerang", "15214-Indonesia"],
        email: "enquiry.idd@subzeroindonesia.com",
        hours: "Monday-Sunday, 10 am-10 pm",
        appointmentHref: "mailto:enquiry.idd@subzeroindonesia.com?subject=Showroom%20Appointment",
      },
      {
        name: "Jakarta Design Center",
        address: ["2nd Floor #SR11", "Jl Gatot Subroto Kav 53 Slipi Jakarta 10260", "Indonesia"],
        telephone: "+6221 53677684/85",
        email: "enquiry.jdc@subzeroindonesia.com",
        hours: "Monday-Sunday 10 am – 6 pm",
        appointmentHref: "mailto:enquiry.jdc@subzeroindonesia.com?subject=Showroom%20Appointment",
      },
    ],
  },
];

export default function AppointmentPage() {
  return (
    <div className={styles.page}>
      <Header ownerResources />
      <main className={styles.main}>
        <section className={styles.intro}>
          <h1>Schedule a Showroom Appointment</h1>
          <span className={styles.titleRule} aria-hidden="true" />
          <p>
            Embark on your exciting kitchen journey with us. Visit The House of Sub-Zero &amp; Wolf SEA showrooms for a personalized experience. Our expert consultants are ready to help bring your dream kitchen to life. Simply choose your preferred date and time and we will confirm it promptly.
          </p>
          <p>We look forward to welcoming you and assisting in bringing your kitchen vision to life.</p>
        </section>

        <section className={styles.showroomGrid} aria-label="Showroom locations">
          {showrooms.map((showroom) => (
            <article className={styles.showroom} key={showroom.title}>
              <h2>{showroom.title}</h2>
              <div className={styles.locationList}>
                {showroom.locations.map((location) => (
                  <div className={styles.location} key={location.name ?? location.email}>
                    {location.name ? <h3>{location.name}</h3> : null}
                    <address>{location.address.map((line) => <span key={line}>{line}</span>)}</address>
                    {location.telephone ? (
                      <p>Tel. <a href={`tel:${location.telephone.replace(/\s/g, "")}`}>{location.telephone}</a></p>
                    ) : null}
                    <p>Email: <a href={`mailto:${location.email}`}>{location.email}</a></p>
                    <p>Office Hours: {location.hours}</p>
                    <a className={styles.appointmentButton} href={location.appointmentHref}>Appointment</a>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
