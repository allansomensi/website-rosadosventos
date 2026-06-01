import About from "@/components/sections/About";
import Agenda from "@/components/sections/Agenda";
import BandMembers from "@/components/sections/BandMembers";
import Contact from "@/components/sections/Contact";
import Highlight from "@/components/sections/Highlight";
import LojaPromo from "@/components/sections/LojaPromo";
import TheHero from "@/components/sections/TheHero";

export default function Home() {
  return (
    <div>
      <TheHero />
      <Highlight />
      <Agenda />
      <About />
      <BandMembers />
      <LojaPromo />
      <Contact />
    </div>
  );
}
