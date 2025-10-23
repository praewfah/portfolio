'use client';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import SkillsSection from '../components/SkillsSection';
import EducationSection from '../components/EducationSection';
import GallerySection from '../components/GallerySection';
import ContactSection from '../components/ContactSection';

export default function LobbyPage() {
  return (
    <div className="pt-10">
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
}