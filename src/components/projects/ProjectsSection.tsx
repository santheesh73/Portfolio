import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getFeaturedProject, getProject } from "@/data/projects";

/**
 * Phase 3 — Projects showcase.
 * Server component: featured treatment + editorial secondary grid.
 * Order: ORION (featured) → HeartTune → NISF → AHAL AI → PRYSM → BHOOMI → MINCHAL.
 */
export function ProjectsSection() {
  const featured = getFeaturedProject();
  const hearttune = getProject("hearttune");
  const nisf = getProject("nisf");
  const ahal = getProject("ahal");
  const prysm = getProject("prysm");
  const bhoomi = getProject("bhoomi");
  const minchal = getProject("minchal");

  return (
    <section
      id="projects"
      aria-label="Selected work"
      className="scroll-mt-20 border-t border-border-subtle"
    >
      <Container className="flex flex-col gap-10 py-14 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="02 — Selected work"
            title="Things I've built"
            description="A collection of AI-powered, full-stack, and real-world software products."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <FeaturedProject project={featured} />
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <StaggerItem className="md:col-span-2">
            <ProjectCard
              project={hearttune}
              layout="horizontal"
              maxTechnologies={6}
            />
          </StaggerItem>
          <StaggerItem>
            <ProjectCard project={nisf} />
          </StaggerItem>
          <StaggerItem>
            <ProjectCard project={ahal} maxTechnologies={3} />
          </StaggerItem>
          <StaggerItem>
            <ProjectCard project={prysm} />
          </StaggerItem>
          <StaggerItem>
            <ProjectCard project={bhoomi} />
          </StaggerItem>
          <StaggerItem className="md:col-span-2">
            <ProjectCard project={minchal} layout="horizontal" />
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
