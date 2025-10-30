import About from "@/components/sections/About";
import Agenda from "@/components/sections/Agenda";
import Contact from "@/components/sections/Contact";
import Highlight from "@/components/sections/Highlight";
import TheHero from "@/components/sections/TheHero";

export default function Home() {
  return (
    <div>
      <TheHero />
      <Highlight />
      <Agenda />
      <About />
      <Contact />
    </div>
  );
}
