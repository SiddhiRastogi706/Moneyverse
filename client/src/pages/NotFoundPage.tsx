import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base text-text-primary flex flex-col justify-between">
      <Navbar />

      <main className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="relative">
          <span className="text-8xl sm:text-9xl font-black font-heading text-gradient-gold opacity-80">
            404
          </span>
          <div className="orb-glow-gold w-48 h-48 inset-0 m-auto opacity-30" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-heading text-white">Page Not Found</h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            The page or financial resource you are seeking does not exist or has been shifted to a new compliance category.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <Button variant="secondary" size="md" onClick={() => navigate(-1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Go Back
          </Button>
          <Button variant="gold" size="md" onClick={() => navigate('/')} leftIcon={<Home className="w-4 h-4" />}>
            Return Home
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};
