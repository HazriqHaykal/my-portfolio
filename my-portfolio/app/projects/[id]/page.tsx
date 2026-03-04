"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

type Feature = {
  title: string;
  description: string;
};

type FeaturedProject = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  image: string;
  fullDescription: string;
  features: Feature[];
  technologies: string[];
};

const featuredProjects: Record<string, FeaturedProject> = {
  chillcare: {
    id: "chillcare",
    title: "ChillCare",
    subtitle: "AI Fertilizer Assistant",
    desc: "Developed an AI-powered farming app with monitoring and automated watering logic.",
    tags: ["AI", "IoT", "Automation"],
    image: "/images/Chilicare.png",
    fullDescription: "ChillCare is an intelligent agricultural platform designed to optimize chili farming through AI and IoT technology. It combines real-time monitoring, predictive analytics, and automated systems to help farmers maximize yield while minimizing resource waste.",
    features: [
      {
        title: "AI Fertilizer Assistant",
        description: "Tailored nutrient recommendations based on crop variety, age, and soil type. The system analyzes soil composition and provides precise fertilizer amounts to optimize plant growth."
      },
      {
        title: "Smart Watering",
        description: "IoT-integrated irrigation that monitors soil moisture and temperature to automate watering cycles. Reduces water waste while maintaining optimal growing conditions."
      },
      {
        title: "Microclimate Prediction",
        description: "Real-time monitoring of VPD (Vapor Pressure Deficit) and humidity to prevent plant stress and disease. Alerts farmers to environmental risks before they impact crops."
      },
      {
        title: "Chili Plot Finder",
        description: "Geospatial analysis to identify the most suitable land for chili farming based on environmental data. Uses satellite imagery and climate data to recommend optimal planting locations."
      },
      {
        title: "Auto Pest Detector",
        description: "Live camera monitoring that uses computer vision to instantly identify pests like caterpillars and alert the farmer. Enables early intervention to prevent crop damage."
      }
    ],
    technologies: ["Python", "TensorFlow", "Firebase", "IoT", "Computer Vision", "Geospatial Analysis", "OpenCV", "Google Maps API"]
  },
  rizzrent: {
    id: "rizzrent",
    title: "RizzRent",
    subtitle: "Student Rental & Roommate Matching",
    desc: "Created a student rental platform with landlord verification and a smart matching workflow.",
    tags: ["Marketplace", "Flutter", "Firebase"],
    image: "/images/RizzRent.png",
    fullDescription: "RizzRent is a student-focused rental and roommate matching platform designed to help university students find safe, affordable accommodation near campus. Unlike general property platforms, RizzRent combines rental listings with intelligent roommate matching based on lifestyle, budget, and study preferences.",
    features: [
      {
        title: "Student-Only Rental Listings",
        description: "Verified rooms and houses near university campuses. All properties are vetted to ensure quality and safety standards for students."
      },
      {
        title: "Smart Roommate Matching",
        description: "Matches students based on habits, budget, schedule, and preferences. Uses preference-based algorithm to find compatible living partners."
      },
      {
        title: "Digital Rental Contract",
        description: "Secure online agreement and document handling. Streamlines the rental process with legally sound digital contracts."
      },
      {
        title: "Landlord & Property Verification",
        description: "Reduces scam risk and increases trust. Verified landlord profiles and property validation ensure secure transactions."
      },
      {
        title: "Premium Listing for Landlords",
        description: "Boost visibility to attract tenants faster. Enhanced features help property owners reach more potential renters efficiently."
      }
    ],
    technologies: ["Flutter", "Firebase", "Firestore", "Cloud Functions", "Matching Algorithm", "Authentication", "Payment Gateway", "Maps API"]
  },
  myteman: {
    id: "myteman",
    title: "MyTeman",
    subtitle: "AI-Powered Service Assistant",
    desc: "Built an AI service mapping platform with voice-to-text and biometric authentication.",
    tags: ["AI", "Flutter", "Mobile"],
    image: "/images/Myteman.png",
    fullDescription: "MyTeman is an innovative mobile platform that leverages AI to provide intelligent service mapping and voice-based interactions. It combines cutting-edge AI capabilities with accessibility features to create an inclusive service discovery platform.",
    features: [
      {
        title: "Voice-to-Text Onboarding",
        description: "AI intent detection for seamless user interactions. Users can onboard using natural voice commands, making the experience intuitive and accessible."
      },
      {
        title: "AI-Powered Service Mapping",
        description: "Using Google Gemini API for intelligent service recommendations. The system understands user needs and suggests relevant services automatically."
      },
      {
        title: "Biometric Authentication",
        description: "Secure login with mocked MyDigitalID integration. Provides secure and convenient authentication methods for users."
      },
      {
        title: "Offline-First Architecture",
        description: "Automatic data sync with offline support. Users can access services and information even without active internet connection."
      },
      {
        title: "Accessibility Support",
        description: "Text-to-speech, haptic feedback, and inclusive design. Built with accessibility in mind to serve all users regardless of abilities."
      }
    ],
    technologies: ["Flutter", "Google Gemini API", "Firebase", "speech_to_text", "flutter_tts", "local_auth", "sqflite", "connectivity_plus"]
  }
};

function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function ProjectDetail() {
  const params = useParams();
  const projectId = params.id as string;
  const project = featuredProjects[projectId];
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const updateMouse = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  if (!project) {
    return (
      <main className="relative overflow-x-hidden bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/" className="text-cyan-200 hover:text-cyan-100">
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"
          style={{ left: `calc(${mouse.x}% - 140px)`, top: `calc(${mouse.y}% - 140px)` }}
        />
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-orange-300/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold tracking-tight text-white hover:text-cyan-200 transition">
            Hazriq Haykal
          </Link>
          <Link href="/#featured" className="text-sm text-slate-300 hover:text-cyan-200 transition rounded-full px-3 py-1 hover:bg-white/10">
            Back to Projects
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-4xl px-6 pt-20 pb-20">
        <Reveal>
          <div className="mb-8">
            <p className="text-cyan-200 text-sm font-semibold uppercase tracking-widest mb-2">{project.subtitle}</p>
            <h1 className="text-5xl md:text-6xl font-black mb-4">{project.title}</h1>
            <p className="text-lg text-slate-300 leading-relaxed">{project.fullDescription}</p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="flex flex-wrap gap-2 mb-12">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={300} className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="space-y-6">
              {project.features.map((feature, index) => (
                <Reveal key={feature.title} delay={300 + index * 80}>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <h3 className="font-semibold text-cyan-200 text-lg mb-2">{feature.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={600} className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {project.technologies.map((tech) => (
                <div key={tech} className="rounded-lg border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-center">
                  <span className="font-medium text-emerald-200">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={800}>
          <Link
            href="/#featured"
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-6 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-300/20 hover:border-cyan-300/60"
          >
            ← Back to Projects
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
