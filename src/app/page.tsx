import Hero from "@/components/Hero";
import FeaturedStrip from "@/components/FeaturedStrip";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedStrip />
      <div className="wrap">
        <About />
        <TechStack />
        <Education />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
