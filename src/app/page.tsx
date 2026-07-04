import { HeroSection } from "@/components/sections/hero-section";
import { BeliefSection } from "@/components/sections/belief-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { MethodSection } from "@/components/sections/method-section";
import { ProofSection } from "@/components/sections/proof-section";
import { DifferenceSection } from "@/components/sections/difference-section";
import { InvitationSection } from "@/components/sections/invitation-section";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <BeliefSection />
      <CapabilitiesSection />
      <MethodSection />
      <ProofSection />
      <DifferenceSection />
      <InvitationSection />
    </main>
  );
}
