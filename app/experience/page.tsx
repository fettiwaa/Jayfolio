import { Timeline } from "@/components/ui/timeline";
import { ExperienceEmpty } from "@/components/ui/experience-empty";
import { PageHeader } from "@/components/ui/page-header";
import { Panel, PanelGrid } from "@/components/ui/panel";
import { experiences } from "@/lib/data";

export const metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  const timelineItems = experiences.map((exp) => ({
    period: exp.period,
    title: exp.title,
    subtitle: exp.company,
    location: exp.location,
    tags: ["Laravel", "PHP", "Git"],
    details: exp.responsibilities.map((r) => ({
      type: "text" as const,
      content: r,
    })),
  }));

  return (
    <div className="max-width-content mx-auto section-padding-x section-padding">
      <PanelGrid>
        <PageHeader
          path="experience"
          title="Experience"
          subtitle="My professional journey in software engineering."
        />
        <Panel
          title="Timeline"
          meta={`${timelineItems.length} entries`}
          className="max-w-3xl"
        >
          <Timeline items={timelineItems} emptyState={<ExperienceEmpty />} />
        </Panel>
      </PanelGrid>
    </div>
  );
}
