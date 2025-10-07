import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Sparkles, Heart, Gift, Music, Volume2, VolumeX, Star, Cake, PartyPopper, Coffee, Mountain, Palmtree } from 'lucide-react';
import { birthdayData } from '../mockData';
import '../styles/birthdayAnimations.css';

const iconMap = {
  Sparkles: Sparkles,
  Heart: Heart,
  Gift: Gift,
  Coffee: Coffee,
  Mountain: Mountain,
  Palmtree: Palmtree
};

const BirthdayPage = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % birthdayData.photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="birthday-container">
      {/* Floating Balloons */}
      <div className="balloons-container">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`balloon balloon-${(i % 4) + 1}`} style={{ left: `${(i * 12) + 5}%`, animationDelay: `${i * 0.5}s` }}>
            <div className="balloon-body"></div>
            <div className="balloon-string"></div>
          </div>
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#3b82f6', '#fbbf24', '#06b6d4', '#6366f1', '#0ea5e9'][Math.floor(Math.random() * 5)]
              }}
            />
          ))}
        </div>
      )}

      {/* Music Control */}
      <Button
        onClick={toggleMusic}
        className="music-control fixed top-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
      >
        {isMusicPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </Button>

      {/* Welcome Section */}
      <section id="welcome" className="welcome-section min-h-screen flex flex-col items-center justify-center relative px-6 py-20">
        <div className="text-center z-10 space-y-8">
          <div className="inline-block">
            <Cake className="w-20 h-20 text-blue-500 mx-auto mb-6 animate-bounce" />
          </div>
          <h1 className="birthday-title text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 mb-4">
            Happy Birthday
          </h1>
          <h2 className="birthday-name text-5xl md:text-7xl font-cursive text-blue-600 mb-6 glow-text">
            {birthdayData.name}!
          </h2>
          <div className="flex items-center justify-center gap-3 text-3xl">
            <PartyPopper className="w-10 h-10 text-yellow-500 animate-pulse" />
            <Heart className="w-10 h-10 text-blue-500 heartbeat" />
            <Sparkles className="w-10 h-10 text-cyan-400 animate-spin-slow" />
          </div>
          <p className="text-2xl md:text-3xl text-gray-700 font-light mt-8 fade-in-up">
            You make every moment brighter!
          </p>
          <div className="flex gap-4 justify-center mt-12 flex-wrap">
            <Button
              onClick={() => scrollToSection('gallery')}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Explore Memories
            </Button>
          </div>
        </div>
        
        {/* Decorative Stars */}
        <div className="stars-container absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Star
              key={i}
              className="star absolute text-yellow-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`
              }}
            />
          ))}
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="gallery-section py-24 px-6 bg-gradient-to-b from-sky-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-5xl md:text-6xl font-bold text-center text-blue-600 mb-16">
            Beautiful Moments
          </h2>
          
          {/* Carousel */}
          <div className="relative mb-12">
            <div className="carousel-container relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
              {birthdayData.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`carousel-slide transition-all duration-1000 ${
                    index === currentPhotoIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-auto object-contain max-h-[500px] md:max-h-[600px] mx-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                    <p className="text-white text-2xl font-light text-center">{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {birthdayData.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPhotoIndex ? 'bg-blue-600 w-8' : 'bg-blue-300 hover:bg-blue-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {birthdayData.photos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => setCurrentPhotoIndex(index)}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wishes Section */}
      <section id="wishes" className="wishes-section py-24 px-6 bg-gradient-to-b from-sky-50 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-5xl md:text-6xl font-bold text-center text-blue-600 mb-16">
            Birthday Wishes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {birthdayData.wishes.map((wish) => (
              <Card key={wish.id} className="wish-card p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-200">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4 mb-4">
                    <Heart className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1 heartbeat" />
                    <div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-4">{wish.wish}</p>
                      <p className="text-blue-600 font-semibold">— {wish.author}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Quote Section */}
          <div className="mt-16 text-center">
            <Card className="inline-block p-12 shadow-2xl border-2 border-blue-300 bg-white/80 backdrop-blur">
              <CardContent className="p-0">
                <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
                <p className="text-2xl md:text-3xl font-cursive text-gray-800 mb-4">
                  "A true friend is the greatest of all blessings."
                </p>
                <p className="text-blue-600 text-xl">Happy Birthday, {birthdayData.name}!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section py-16 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 text-white text-center px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl md:text-3xl font-light mb-6">
            Made with <Heart className="inline-block w-8 h-8 text-red-300 heartbeat mx-2" /> by your best friend
          </p>
          <p className="text-3xl md:text-4xl font-bold">GK</p>
          <div className="mt-8 flex justify-center gap-4">
            <Sparkles className="w-6 h-6 animate-pulse" />
            <Cake className="w-6 h-6 animate-bounce" />
            <Star className="w-6 h-6 animate-spin-slow" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BirthdayPage;