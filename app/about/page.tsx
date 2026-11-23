import AboutPanel from "@/components/sections/about";
import { PageHeader } from "@/components/ui/page-header";
import { PanelGrid } from "@/components/ui/panel";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="max-width-content mx-auto section-padding-x section-padding">
      <PanelGrid>
        <PageHeader
          path="about"
          title="About"
          subtitle="I build clean, scalable software that solves real-world problems."
        />
        <AboutPanel id="profile" title="Profile" />
      </PanelGrid>
    </div>
  );
}
