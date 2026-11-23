import ProjectGrid from "@/components/project/project-grid";
import { PageHeader } from "@/components/ui/page-header";
import { PanelGrid } from "@/components/ui/panel";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="max-width-content mx-auto section-padding-x section-padding">
      <PanelGrid>
        <PageHeader
          path="projects"
          title="Selected Work"
          subtitle="Things I've designed and built, from this portfolio to tooling for AI coding agents."
        />
        <ProjectGrid headingLevel={2} />
      </PanelGrid>
    </div>
  );
}
