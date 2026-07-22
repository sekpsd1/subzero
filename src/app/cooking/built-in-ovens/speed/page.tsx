import { permanentRedirect } from "next/navigation";

export default function SpeedOvensRoutePage() {
  permanentRedirect("/cooking/built-in-ovens/convection-speed");
}
