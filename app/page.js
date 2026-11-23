import Header from '@/components/Header';
import MotionSystem from '@/components/MotionSystem';
import HeroVideo from '@/components/HeroVideo';
import AboutStory from '@/components/AboutStory';
import SolutionsExplorer from '@/components/SolutionsExplorer';
import VideoGallery from '@/components/VideoGallery';
import Credibility from '@/components/Credibility';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <MotionSystem>
      <Header />
      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <HeroVideo />
          <div className="hero-shade" aria-hidden="true" />
          <div className="container hero-content">
            <h1 id="hero-title" data-hero-item>Performance arts for brands, teams and audiences.</h1>
            <p data-hero-item>evam is a Chennai-based performance arts entrepreneurship working across comedy, video production, event engagement and arts-based behavioural training.</p>
            <div className="hero-actions" data-hero-item>
              <a className="button button-lime" href="#solutions">Explore our solutions</a>
              <a className="button button-ghost" href="#contact">Start an enquiry</a>
            </div>
          </div>
        </section>
        <AboutStory />
        <SolutionsExplorer />
        <VideoGallery />
        <Credibility />
        <Contact />
      </main>
      <Footer />
    </MotionSystem>
  );
}
