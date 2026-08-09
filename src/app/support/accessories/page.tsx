import { permanentRedirect } from "next/navigation";

export default function LegacyAccessoriesPage() {
  permanentRedirect("/cooking/accessories");
}
