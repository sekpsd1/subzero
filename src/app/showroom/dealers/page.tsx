import Image from "next/image";
import { UserRoundCheck, UserRoundPlus } from "lucide-react";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import styles from "./dealers.module.css";

export const metadata = {
  title: "Dealers",
  description: "Find authorised Sub-Zero and Wolf dealers across Thailand, Indonesia, Singapore, and Malaysia.",
};

type Dealer = { name: string; address: string; telephone?: string; mobile?: string; fax?: string; emails?: string[]; website?: string };
type DealerGroup = { title: string; dealers: Dealer[] };
type Country = { name: string; groups: DealerGroup[] };

const countries: Country[] = [
  {
    name: "Thailand",
    groups: [
      {
        title: "Authorized Dealers Bangkok",
        dealers: [
          { name: "Arkitektura", address: "125/1 Soi Thonglor 10, Sukhumvit 55, Klongton Nua, Wattana, Bangkok 10110", telephone: "+66 2392-5460-2", emails: ["info@arkitektura.co.th"], website: "www.arkitektura.co.th" },
          { name: "Bulthaup (Chanintr Living)", address: "988/1 Noble Solo Thonglor, Sukhumvit 55, Klongton Nua, Wattana, Bangkok 10110", telephone: "+66 2714-9040", emails: ["prakuna@chanintr.com"], website: "www.chanintrliving.com/bulthaup.php" },
          { name: "DM HOME", address: "555 Sukhumvit 55, Klongton Nua, Wattana, Bangkok 10110", telephone: "+66 2365 0789", emails: ["sanaphorn@dm-home.com"], website: "www.dm-home.com" },
          { name: "Euro Creations", address: "119 Sukhumvit 55, North Klong Ton, Wattana, Bangkok 10110", telephone: "+66 2712-9555", emails: ["info@eurocreations.co.th"], website: "www.eurocreations.co.th" },
          { name: "Grande Armoire", address: "131/2 Soi Thonglor 10, Sukhumvit 55, Wattana, Bangkok 10110", telephone: "+66 2392-1595, +66 2392-1599", website: "www.grandearmoire.com/index.php" },
          { name: "Kitchenette", address: "115 Thonglor Soi 10, Sukhumvit 55, Wattana, Bangkok 10110", telephone: "+66 2711-6991 – 5", emails: ["addy@kitchenette.co.th", "rataya@kitchenette.co.th"], website: "www.kitchenette.co.th" },
          { name: "Leafy", address: "523 Mahaprutharam Road, Bangrak, Bangkok 10500", telephone: "+66 2237-6999", fax: "+66 2237-2499", emails: ["badipol@yipjacks.com"], website: "www.leafy.co.th" },
          { name: "RCD Designcenter Co., Ltd.", address: "289 Soi Thonglor 15, North Klongton, Vadhana, Bangkok 10110", telephone: "+66 2185 3116", fax: "+66 2712 6924", emails: ["info@rcdkitchen.com"], website: "www.rcdkitchen.com" },
        ],
      },
      {
        title: "Authorized Dealers Phuket",
        dealers: [
          { name: "August Nine (Kitchen Gallery)", address: "65/28-29 Moo 2, Thepkrasattri Road, Koh Kaew, Muang, Phuket, Thailand 83200", telephone: "+66 7637 7908", emails: ["sales@august9kitchen.com"], website: "www.august9kitchen.com" },
          { name: "Zeyco", address: "17/86, Moo 6, Kathu, Kathu Muang, Phuket, Thailand 83120", telephone: "+66 76-376-188", emails: ["zeycophk@gmail.com"], website: "www.zeyco.co.th" },
        ],
      },
    ],
  },
  {
    name: "Indonesia",
    groups: [{
      title: "Authorized Dealers",
      dealers: [
        { name: "Bika", address: "PT Bika Graha Mandiri, Kemang Raya No. 91, Jakarta, Indonesia 12370", telephone: "+622 1719 8080", mobile: "+62 812 8133 3232", emails: ["explore@bikaliving.com"], website: "www.bikaliving.com" },
        { name: "SIEMATIC (SOMSANTOSO)", address: "PT. Griya Trada Indonesia, Ariobimo Sentral 6th Floor, Jl. HR. Rasuna Said Blok X-2 No. 5, Jakarta, Indonesia 12950", telephone: "+622 1522 9020", website: "www.somsantoso.com" },
      ],
    }],
  },
  {
    name: "Singapore",
    groups: [{
      title: "Authorized Dealers",
      dealers: [
        { name: "Rina (Electrical) Pte Ltd", address: "1 Scotts Road #25-10/11/12/13, Shaw Centre, Singapore 228208", telephone: "+65 6737 4351 (3 Lines)", emails: ["enquiries@rinaelectrical.com.sg"], website: "www.rinaelectrical.com.sg" },
        { name: "Kitchen Centric Pte Ltd", address: "128 Cairnhill Road, Singapore 229708", telephone: "+65 8111 6823", emails: ["enquiries@kitchencentric.com.sg"], website: "www.kitchencentric.com.sg" },
        { name: "XTRA Designs Pte. Ltd", address: "Poggenpohl, 6 Raffles Boulevard #02-48, Marina Square, Singapore 039594", telephone: "+65 6737 7288", fax: "+65 6737 7289", emails: ["kitchen-wardrobe@xtra.com.sg"], website: "www.xtra.com.sg" },
      ],
    }],
  },
  {
    name: "Malaysia",
    groups: [{
      title: "Authorized Dealers",
      dealers: [
        { name: "The Plan", address: "A-G-09, Glomac Damansara, Jalan Damansara, 60000 Kuala Lumpur", telephone: "+6013 3999 182", emails: ["sales@theplan.com.my"], website: "www.theplan.com.my" },
        { name: "XTRA Furniture Sdn Bhd", address: "The Gardens Mall, Mid Valley City, Lot S-236 & 237, 2nd Floor, Lingkaran Syed Putra, Kuala Lumpur, Malaysia 59200", telephone: "+603 2282 9088", fax: "+603 2282 5088", website: "www.xtrafurniture.com" },
      ],
    }],
  },
];

function websiteHref(website: string) {
  return website.startsWith("http") ? website : `https://${website}`;
}

function DealerCard({ dealer }: { dealer: Dealer }) {
  return (
    <article className={styles.dealerCard}>
      <h3>{dealer.name}</h3>
      <p><strong>Address:</strong> {dealer.address}</p>
      {dealer.telephone ? <p><strong>Tel:</strong> {dealer.telephone}</p> : null}
      {dealer.mobile ? <p><strong>Mobile:</strong> {dealer.mobile}</p> : null}
      {dealer.fax ? <p><strong>Fax:</strong> {dealer.fax}</p> : null}
      {dealer.emails?.length ? (
        <p><strong>Email:</strong>{" "}{dealer.emails.map((email, index) => <span key={email}>{index ? "; " : null}<a href={`mailto:${email}`}>{email}</a></span>)}</p>
      ) : null}
      {dealer.website ? <p><strong>Website:</strong>{" "}<a href={websiteHref(dealer.website)} target="_blank" rel="noreferrer">{dealer.website}</a></p> : null}
    </article>
  );
}

export default function DealersPage() {
  return (
    <div className={styles.page}>
      <Header ownerResources />
      <main>
        <section className={styles.content}>
        <header className={styles.intro}>
          <h1>Dealers</h1>
          <span className={styles.titleRule} aria-hidden="true" />
          <p>Visit an authorised dealer to talk with experts and dedicated trade representatives, see the complete product line and explore kitchen vignettes.</p>
        </header>
        <div className={styles.dealerLayout}>
          <div className={styles.imageWrap}>
            <Image src="/images/dealers/dealers-kitchen.jpg" alt="Contemporary kitchen fitted with Sub-Zero and Wolf appliances" fill priority sizes="(max-width: 820px) 100vw, 44vw" />
          </div>
          <div className={styles.countryList}>
            {countries.map((country) => (
              <details className={styles.country} key={country.name}>
                <summary>
                  <span>{country.name}</span>
                  <span className={styles.countryIcon} aria-hidden="true">
                    <UserRoundPlus className={styles.iconClosed} size={18} strokeWidth={2} />
                    <UserRoundCheck className={styles.iconOpen} size={18} strokeWidth={2} />
                  </span>
                </summary>
                <div className={styles.countryContent}>
                  {country.groups.map((group) => (
                    <details className={styles.group} key={group.title}>
                      <summary><span>{group.title}</span><span className={styles.plus} aria-hidden="true" /></summary>
                      <div className={styles.dealerList}>{group.dealers.map((dealer) => <DealerCard dealer={dealer} key={dealer.name} />)}</div>
                    </details>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
        <div className={styles.bottomRule} aria-hidden="true" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
