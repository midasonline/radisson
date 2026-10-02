import HeroSection from "@/components/home/HeroSection";
import ReasonsSection from "@/components/home/ReasonsSection";
import CommunityQuoteSection from "@/components/home/CommunityQuoteSection";
import ConceptLocationSection from "@/components/home/ConceptLocationSection";
import LocationPanoramaSection from "@/components/home/LocationPanoramaSection";
import ResidencesSection from "@/components/home/ResidencesSection";
import AmenitiesSection from "@/components/home/AmenitiesSection";
import LifestyleSection from "@/components/home/LifestyleSection";
import ArchitectureSection from "@/components/home/ArchitectureSection";
import ProjectDetailsSection from "@/components/home/ProjectDetailsSection";
import FinalSection from "@/components/home/FinalSection";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <HeroSection />
      <ReasonsSection />
      <CommunityQuoteSection />
      <ConceptLocationSection />
      <LocationPanoramaSection />
      <ResidencesSection />
      <AmenitiesSection />
      <LifestyleSection />
      <ArchitectureSection />
      <ProjectDetailsSection />
      <FinalSection />
    </main>
  );
}
