import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { MethodSection } from "@/components/sections/method-section";
import { ProofSection } from "@/components/sections/proof-section";
import { DifferenceSection } from "@/components/sections/difference-section";
import { InvitationSection } from "@/components/sections/invitation-section";
import { SectionDivider } from "@/components/ui/section-divider";
import { BlueprintEntry } from "@/components/motion/blueprint-entry";

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
