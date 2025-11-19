import React, { useState, useEffect } from "react";
import { Shield, FileText, Video, Mail } from "lucide-react";
import ContactPopup from "../components/ContactPopup";

// ImageSlider Component
const ImageSlider = () => {
  const images = ["/images/o1.jpg", "/images/o2.jpg", "/images/o3.jpg"];
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 4000);
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <div className="relative w-full max-w-5xl aspect-16/10 overflow-hidden rounded-2xl shadow-lg border border-orange-500/20">
      <div
        className="flex transition-transform duration-500 ease-in-out w-full h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Slide ${i + 1}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/1200x750/000000/FFFFFF?text=Image+Not+Found";
            }}
            className="w-full h-full object-contain shrink-0 bg-black"
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-full text-lg hover:bg-black/70 transition shadow-lg"
      >
        &#10094;
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-full text-lg hover:bg-black/70 transition shadow-lg"
      >
        &#10095;
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-white w-8" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default function Hero() {
  const [backendMessage, setBackendMessage] = useState("");
  const [open, setOpen] = useState(false); // ← Popup state added

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-gray-900 via-black to-gray-900 font-sans">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "700ms" }}
        ></div>
      </div>

      <div className="relative min-h-screen text-white flex flex-col items-center px-6">
        {/* Navbar */}
        <nav className="w-full max-w-6xl mt-6 mb-12 px-6 py-4 bg-gray-900/60 backdrop-blur-xl rounded-full border border-orange-500/20 shadow-[0_0_30px_rgba(255,122,0,0.15)] flex justify-between items-center">
          <button
            onClick={() => handleNavigate("/")}
            className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-xl bg-linear-to-r from-orange-400 to-fuchsia-500 bg-clip-text text-transparent">
              SafeSite AI
            </h3>
          </button>

          <ul className="hidden md:flex items-center gap-8 text-lg">
            <li>
              <a
                href="https://docs.google.com/document/d/11P-z3HRJe0ezPAHgH6eOJqamfYabYDI8/edit?usp=share_link"
                target="_blank"
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Docs
              </a>
            </li>

            <li>
              <a
                href="https://drive.google.com/file/d/1yXcYjuNnaZs2AEMcruNyX15l1NYxiaZB/view?usp=share_link"
                target="_blank"
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <Video className="w-5 h-5" />
                Demo
              </a>
            </li>

            <li>
              <a
                href="#"
                onClick={() => setOpen(true)} // ← Open popup
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Contact
              </a>
            </li>
          </ul>

          <button
            onClick={() => handleNavigate("/auth")}
            className="px-6 py-2.5 rounded-full bg-linear-to-r from-orange-500 to-fuchsia-600 text-white font-semibold shadow-[0_0_25px_rgba(255,122,0,0.4)] hover:shadow-[0_0_40px_rgba(255,122,0,0.6)] hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mt-8 max-w-7xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-linear-to-r from-white via-orange-200 to-fuchsia-300 bg-clip-text text-transparent">
            Where Safety Meets <br /> Intelligence
          </h1>

          <p className="max-w-2xl text-gray-400 mb-12 text-lg leading-relaxed">
            AI-powered PPE detection for real-time workplace safety monitoring.
            <br />
            Protect your team with cutting-edge computer vision technology.
          </p>

          <div className="relative w-full max-w-4xl mb-16">
            <div className="absolute inset-0 bg-linear-to-r from-orange-500/30 to-fuchsia-600/30 rounded-3xl blur-2xl"></div>

            <div className="relative p-6 rounded-3xl bg-gray-900/50 backdrop-blur-sm border border-orange-400/30 shadow-[0_0_50px_rgba(255,122,0,0.3)]">
              <img
                src="/images/construction-workers.jpg"
                alt="AI detection preview"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/1200x800/000000/FFFFFF?text=Image+Not+Found";
                }}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Problem & Solution */}
        {/* ... NO CHANGES MADE BELOW ... */}

        {/* Preview Section */}
        <section className="flex flex-col items-center text-center mb-16 w-full">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 bg-linear-to-r from-white toa-gray-400 bg-clip-text text-transparent">
            Preview
          </h2>
          <ImageSlider />
        </section>

        {/* CTA */}
        <button
          onClick={() => handleNavigate("/auth")}
          className="mb-16 px-10 py-4 text-lg font-bold rounded-full bg-linear-to-r from-orange-500 to-fuchsia-600 shadow-[0_0_30px_rgba(255,122,0,0.5)] hover:shadow-[0_0_50px_rgba(255,122,0,0.7)] hover:scale-105 transition-all duration-300"
        >
          Try SafeSite AI Now
        </button>

        {/* Popup is injected here */}
        <ContactPopup open={open} setOpen={setOpen} />

        {/* Footer */}
        <footer className="w-full max-w-6xl mt-auto mb-8">
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-orange-500/20 px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-linear-to-br from-orange-500 to-fuchsia-600 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-400 text-sm">
                  © 2025 SafeSite AI — Empowering safer worksites 🦺
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}