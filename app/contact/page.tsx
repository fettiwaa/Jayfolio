"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { site } from "@/lib/constants";

const contactInfo = [
  {
    label: "Email",
    value: site.email,
    icon: Mail,
    href: `mailto:${site.email}`,
  },
  {
    label: "GitHub",
    value: "github.com/fettiwaa",
    icon: GitHubIcon,
    href: site.github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/jaycee-andal",
    icon: LinkedInIcon,
    href: site.linkedin,
  },
];

export default function ContactPage() {
  return (
    <section className="section-padding">
      <div className="max-width-content mx-auto section-padding-x">
        <SectionTitle
          as="h1"
          title="Get in Touch"
          subtitle="Let's build something together."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
        >
          <motion.div variants={fadeInUp} className="space-y-10">
            <ul className="space-y-2">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                const isExternal = info.href.startsWith("http");
                return (
                  <li key={info.label}>
                    <a
                      href={info.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 p-3 -mx-3 rounded-(--btn-radius) transition-colors hover:bg-(--theme-surface-elevated)"
                    >
                      <span className="w-10 h-10 shrink-0 rounded-(--btn-radius) flex items-center justify-center border border-(--theme-border) text-(--theme-text)">
                        <Icon
                          className="w-[18px] h-[18px]"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-label text-(--theme-text-muted)">
                          {info.label}
                        </span>
                        <span className="block text-sm text-(--theme-text) break-all group-hover:underline underline-offset-4">
                          {info.value}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="pt-8 border-t border-(--theme-border)">
              <h2 className="text-subsection text-(--theme-text) mb-3">
                Let&apos;s Build Something Together
              </h2>
              <p className="leading-relaxed text-(--theme-text-secondary)">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision. Feel free to reach
                out via email or through any of the channels above.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div className="p-6 md:p-8 rounded-(--card-radius) border border-(--theme-border) bg-(--theme-surface) space-y-4">
              <h2 className="text-subsection text-(--theme-text)">
                Send me an email
              </h2>
              <p className="text-sm leading-relaxed text-(--theme-text-secondary)">
                The quickest way to reach me is by email at{" "}
                <span className="text-(--theme-text) break-all">
                  {site.email}
                </span>
                . I usually reply within a couple of days.
              </p>
              <Button
                href={`mailto:${site.email}`}
                variant="primary"
                size="md"
                className="w-full"
                icon={<Mail size={16} />}
              >
                Email me
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
