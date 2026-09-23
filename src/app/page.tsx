import { HouseExperience } from "@/components/house/HouseExperience";
import { IdentityNarrative } from "@/components/home/IdentityNarrative";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ProofSection } from "@/components/proof/ProofSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HouseExperience />
      <IdentityNarrative />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ProofSection />
      <ContactSection />
    </div>
  );
}
