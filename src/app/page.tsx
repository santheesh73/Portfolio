import { Hero } from "@/components/home/Hero";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ProofSection } from "@/components/proof/ProofSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ProofSection />
      <ContactSection />
    </div>
  );
}
