import Header from './components/Header';
import Hero from './components/Hero';
// import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import About from './components/About';
// import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
// import Team from './components/Team';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import LoadingScreen from './components/LoadingScreen';
import ServicesSection from './components/SeviceSection';
import TeamSection from './components/TeamMemberSection';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onLoad = () => setLoading(false);
    if (document.readyState === 'complete') onLoad();
    window.addEventListener('load', onLoad);
    const t = setTimeout(onLoad, 2000);
    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    gsap.set('.ball', { xPercent: -50, yPercent: -50 });
    let targets = gsap.utils.toArray('.ball');
    const onMove = (e: MouseEvent) => {
      gsap.to(targets, {
        duration: 0.45,
        x: e.clientX,
        y: e.clientY,
        ease: 'power1.out',
        overwrite: 'auto',
        stagger: 0.02,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <main>
        <div className="ball bg-primary/40 w-4 h-4 fixed top-0 left-0 rounded-full blur-[2px]"></div>
        <div className="ball bg-primary/40 w-4 h-4 fixed top-0 left-0 rounded-full blur-[2px]"></div>
        <div className="ball bg-primary/40 w-4 h-4 fixed top-0 left-0 rounded-full blur-[2px]"></div>
        <div className="ball bg-primary/40 w-4 h-4 fixed top-0 left-0 rounded-full blur-[2px]"></div>
        <div className="ball bg-primary/20 w-4 h-4 fixed top-0 left-0 rounded-full blur-[2px]"></div>

        <Hero />
        <ServicesSection/>
        <WhyChooseUs />
        <Portfolio />
        <About />
        <TeamSection />
        {/* <Testimonials /> */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
