import { permanentRedirect } from "next/navigation";

export default function LegacyBuiltInOvensListingPage() {
  permanentRedirect("/cooking/built-in-ovens/convection-speed");
}
