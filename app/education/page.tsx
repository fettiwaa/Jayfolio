import { PageHeader } from "@/components/ui/page-header";
import { Panel, PanelGrid } from "@/components/ui/panel";
import { educationData } from "@/lib/data";

export const metadata = {
  title: "Education",
};

export default function EducationPage() {
  return (
    <div className="max-width-content mx-auto section-padding-x section-padding">
      <PanelGrid className="lg:grid-cols-12">
        <div className="lg:col-span-12">
          <PageHeader
            path="education"
            title="Education"
            subtitle="My academic background."
          />
        </div>

        {educationData.map((edu) => (
          <Panel
            key={edu.degree}
            as="article"
            title="Degree"
            meta={edu.period}
            className="lg:col-span-12"
          >
            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5">
                <h3 className="text-section text-(--theme-text)">
                  {edu.degree}
                </h3>
                <p className="mt-2 text-(--theme-text-secondary)">
                  {edu.school}
                </p>
                <p className="text-xs font-mono text-(--theme-text-muted)">
                  {edu.location}
                </p>

                {edu.awards && edu.awards.length > 0 && (
                  <div className="panel-inset mt-5 px-4 py-3">
                    <h4 className="text-label text-(--theme-text-muted) mb-2">
                      Awards
                    </h4>
                    <ul className="space-y-1 text-sm font-mono text-(--theme-text)">
                      {edu.awards.map((award) => (
                        <li key={award}>{award}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {edu.coursework.length > 0 && (
                <div className="lg:col-span-7">
                  <h4 className="text-label text-(--theme-text-muted) mb-3">
                    Relevant Coursework
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {edu.coursework.map((course, i) => (
                      <li
                        key={course}
                        className="panel-inset flex items-center gap-3 px-3 py-2 text-sm text-(--theme-text-secondary)"
                      >
                        <span
                          aria-hidden="true"
                          className="font-mono text-xs text-(--theme-text-muted)"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Panel>
        ))}
      </PanelGrid>
    </div>
  );
}
