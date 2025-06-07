import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
// import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <Navigation /> */}
      <h1 className="sr-only">ElectroService - Професійні послуги електрика в Києві</h1>
      <Hero />
      <Services />
      <Benefits />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}
