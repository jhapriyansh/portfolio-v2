import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Logbook from "@/components/logbook/Logbook";
import Contact from "@/components/contact/Contact";
import Resume from "@/components/resume/Resume";
import Divider from "@/components/ui/Divider";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Divider color="#a6ff00" variant="dashed" />
      <Skills />
      <Divider color="#c77dff" variant="dots" />
      <Projects />
      <Divider color="#00f0ff" variant="arrow" />
      <Logbook />
      <Divider color="#ffc857" variant="dashed" />
      <Resume />
      <Divider color="#ff6ec7" variant="dots" />
      <Contact />
      <Footer />
    </main>
  );
}
