import ProjectGrid from "@/components/project/project-grid";
import { SectionTitle } from "@/components/ui/section-title";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <section className="section-padding">
      <div className="max-width-content mx-auto section-padding-x">
        <SectionTitle
          as="h1"
          title="Selected Work"
          subtitle="Things I've designed and built, from this portfolio to tooling for AI coding agents."
        />
        <ProjectGrid />
      </div>
    </section>
  );
}
