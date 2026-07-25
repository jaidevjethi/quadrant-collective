import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { MethodSection } from "@/components/sections/method-section";
import { ProofSection } from "@/components/sections/proof-section";
import { DifferenceSection } from "@/components/sections/difference-section";
import { InvitationSection } from "@/components/sections/invitation-section";
import { SectionDivider } from "@/components/ui/section-divider";
import { BlueprintEntry } from "@/components/motion/blueprint-entry";

/**
 * The homepage carries its own title and description rather than the root
 * defaults. Nobody searches the brand name of a studio they have not heard
 * of, so the title leads with the service and the place, and the brand
 * follows. The description names every service in plain words, because
 * answer engines quote it when asked who does this work in Gujarat.
 */
export const metadata: Metadata = {
  title: {
    absolute:
      "Web design, SEO and digital marketing in Gujarat | Quadrant Collective",
  },
  description:
    "Quadrant Collective builds websites, brand identity, SEO, Google Business Profile, content and social media for clinics, labs and local businesses across Mehsana, Ahmedabad and Vadodara. Ongoing work from Rs 20,000 a month.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <SectionDivider />
      <ProblemSection />
      <BlueprintEntry />
      <CapabilitiesSection />
      <MethodSection />
      <ProofSection />
      <SectionDivider />
      <DifferenceSection />
      <InvitationSection />
    </main>
  );
}
