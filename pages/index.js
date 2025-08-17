import { useState } from 'react';
import Hero from '../components/Hero';
import FeatureCards from '../components/FeatureCards';
import StatsCounter from '../components/StatsCounter';

export default function Home() {
  const [userStats, setUserStats] = useState({
    totalUsers: 12547,
    carbonSaved: 89234,
    countriesActive: 45
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="home-container">
      <Hero />
      <StatsCounter stats={userStats} />
      <FeatureCards />
      
      {/* Newsletter Signup - Interactive Component */}
      <section className="newsletter-section">
        <div className="container">
          <h2>Stay Updated on Your Eco Journey</h2>
          <p>Get weekly tips and insights to reduce your carbon footprint</p>
          
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
          
          {isSubscribed && (
            <div className="success-message">
              ✅ Thanks for subscribing! Welcome to the EcoTrack community.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}