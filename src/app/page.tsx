import { Hero } from "@/components/home/Hero";
import { ProjectsSection } from "@/components/projects/ProjectsSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ProjectsSection />
    </div>
  );
}
