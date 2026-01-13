import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Team from './components/Team';
import { useEffect } from 'react';
import gsap from 'gsap';

function App() {

  useEffect(() => {
    gsap.set(".ball", { xPercent: -50, yPercent: -50 })
    let targets = gsap.utils.toArray(".ball");
    window.addEventListener("mousemove", (e) => {
      gsap.to(targets, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
  },
    []
  );
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="ball bg-primary/40 w-4 h-4 fixed top-0 left-0 rounded-full blur-[2px]"></div>
        <div className="ball bg-primary/40 w-4 h-4 fixed top-0 left-0 rounded-full blur-[2px]"></div>
        <div className="ball bg-primary/40 w-4 h-4 fixed top-0 left-0 rounded-full blur-[2px]"></div>
        <div className="ball bg-primary/40 w-4 h-4 fixed top-0 left-0 rounded-full blur-[2px]"></div>
        <div className="ball bg-primary/20 w-4 h-4 fixed top-0 left-0 rounded-full blur-[2px]"></div>

        <Hero />
        <Services />
        <WhyChooseUs />
        <Portfolio />
        <About />
        <Team />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
