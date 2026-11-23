"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
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

const item = fadeInUp;
const container = staggerContainer;

export default function ContactPage() {
  return (
    <section className="section-padding">
      <div className="max-width-content mx-auto section-padding-x">
        <SectionTitle
          title="Get in Touch"
          subtitle="Let's build something together."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
        >
          <motion.div variants={item} className="space-y-8">
            <div className="space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                const isExternal = info.href.startsWith("http");
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 group"
                    whileHover={{ x: 4 }}
                  >
                    <div
                      className="w-10 h-10 rounded-[var(--btn-radius)] flex items-center justify-center transition-all group-hover:scale-110"
                      style={{
                        backgroundColor: "var(--theme-glow)",
                        color: "var(--theme-accent)",
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--theme-text)" }}
                      >
                        {info.label}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--theme-text-secondary)" }}
                      >
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              variants={item}
              className="pt-8 border-t"
              style={{ borderColor: "var(--theme-border)" }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--theme-text)" }}
              >
                Let's Build Something Together
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Feel free to reach out
                via email or through any of the channels above.
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={item}>
            <div
              className="p-8 rounded-[var(--btn-radius)] border space-y-4"
              style={{ borderColor: "var(--theme-border)" }}
            >
              <h3
                className="text-xl font-semibold"
                style={{ color: "var(--theme-text)" }}
              >
                Send me an email
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                The quickest way to reach me is by email. I usually reply within
                a couple of days.
              </p>
              <Button
                href={`mailto:${site.email}`}
                variant="primary"
                size="md"
                radius="default"
                className="w-full"
                icon={<Mail size={16} />}
              >
                Email {site.email}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
