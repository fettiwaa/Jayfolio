import { Briefcase, GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Panel, PanelGrid } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExperienceEmpty } from "@/components/ui/experience-empty";
import { experiences, educationData } from "@/lib/data";

function EntryHeader({ title, period }: { title: string; period: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="text-subsection text-(--theme-text)">{title}</h3>
      <time className="text-label text-(--theme-text-muted) shrink-0">
        {period}
      </time>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="max-width-content mx-auto section-padding-x section-padding">
      <PanelGrid className="lg:grid-cols-2 items-start">
        <div className="lg:col-span-2">
          <PageHeader
            path="resume"
            title="Resume"
            subtitle="Explore my experience and education below."
          >
            <div className="flex flex-wrap gap-3">
              <Button
                href="/experience"
                variant="secondary"
                icon={<Briefcase size={16} />}
              >
                View Experience
              </Button>
              <Button
                href="/education"
                variant="secondary"
                icon={<GraduationCap size={16} />}
              >
                View Education
              </Button>
            </div>
          </PageHeader>
        </div>

        <Panel title="Work Experience" meta={`${experiences.length} entries`}>
          {experiences.length === 0 ? (
            <ExperienceEmpty />
          ) : (
            <div className="space-y-6">
              {experiences.map((exp) => (
                <article key={exp.title + exp.period}>
                  <EntryHeader title={exp.title} period={exp.period} />
                  <p className="mt-0.5 text-sm text-(--theme-text-secondary)">
                    {exp.company} · {exp.location}
                  </p>
                  <ul className="mt-2 space-y-1 list-[square] pl-5 marker:text-(--theme-text-muted)">
                    {exp.responsibilities.map((r) => (
                      <li
                        key={r}
                        className="text-sm text-(--theme-text-secondary)"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </Panel>

        <Panel title="Education" meta={`${educationData.length} entries`}>
          <div className="space-y-6">
            {educationData.map((edu) => (
              <article key={edu.degree}>
                <EntryHeader title={edu.degree} period={edu.period} />
                <p className="mt-0.5 text-sm text-(--theme-text-secondary)">
                  {edu.school} · {edu.location}
                </p>
                {edu.coursework.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-label text-(--theme-text-muted) mb-2">
                      Relevant Coursework
                    </h4>
                    <ul className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((c) => (
                        <li key={c}>
                          <Badge variant="outline">{c}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </Panel>
      </PanelGrid>
    </div>
  );
}
