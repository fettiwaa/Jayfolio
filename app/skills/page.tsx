import TechStackPanel from "@/components/sections/skills";
import { PageHeader } from "@/components/ui/page-header";
import { PanelGrid } from "@/components/ui/panel";

export const metadata = {
  title: "Skills",
};

export default function SkillsPage() {
  return (
    <div className="max-width-content mx-auto section-padding-x section-padding">
      <PanelGrid>
        <PageHeader
          path="skills"
          title="Skills"
          subtitle="The technologies and tools I've worked with. Hover a tile to see which project uses it."
        />
        <TechStackPanel id="stack" />
      </PanelGrid>
    </div>
  );
}
