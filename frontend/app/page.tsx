"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { 
  Video, 
  MessageSquare, 
  Cpu, 
  ArrowRight, 
  Shield, 
  Sparkles, 
  Keyboard 
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP floating animations for background ambient orbs
    if (orb1Ref.current) {
      gsap.to(orb1Ref.current, {
        x: "50vw",
        y: "30vh",
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (orb2Ref.current) {
      gsap.to(orb2Ref.current, {
        x: "-40vw",
        y: "-20vh",
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (orb3Ref.current) {
      gsap.to(orb3Ref.current, {
        x: "20vw",
        y: "-40vh",
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Hero content entrance
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(
        previewRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2 },
        "-=0.6"
      );

    // Minor float effect on the preview card
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        y: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.2,
      });
    }

    // Feature cards fade in on scroll / trigger
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
          // Fallback if ScrollTrigger is not loaded
          delay: 1.5,
        }
      );
    }
  }, []);

  const handleEnterWorkspace = () => {
    // Elegant transition before routing
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.5,
      onComplete: () => {
        router.push("/join");
      },
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#030303] text-zinc-100 flex flex-col overflow-hidden font-sans"
    >
      {/* Background Animated Glow Orbs */}
      <div 
        ref={orb1Ref}
        className="glow-orb glow-orb-blue w-[500px] h-[500px] top-[-10%] left-[10%]" 
      />
      <div 
        ref={orb2Ref}
        className="glow-orb glow-orb-purple w-[600px] h-[600px] bottom-[-20%] right-[-10%]" 
      />
      <div 
        ref={orb3Ref}
        className="glow-orb glow-orb-indigo w-[400px] h-[400px] top-[40%] right-[20%]" 
      />

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            SMA <span className="text-blue-500 font-medium text-sm">Assistant</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.03] border border-white/[0.08] text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LiveKit Engine Active
          </span>
          <button 
            onClick={handleEnterWorkspace}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-colors"
          >
            Launch Space
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 py-12 md:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
            <div 
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 tracking-wide uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Revolutionizing Virtual Meetings
            </div>
            
            <h1 
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white"
            >
              Next-Gen Meetings,{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Supercharged
              </span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="max-w-xl text-lg text-zinc-400 font-normal leading-relaxed"
            >
              Experience a modern, premium video workspace. Instant low-latency LiveKit connections, embedded workflow chat, and intelligent meeting assistants designed to stream collaboration.
            </p>
            
            <div 
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto"
            >
              <button 
                onClick={handleEnterWorkspace}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold glass-button-primary"
              >
                Enter Workspace
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="#features"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-semibold glass-button"
              >
                Explore Features
              </a>
            </div>
          </div>

          {/* Right Product Preview Mockup */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            {/* Ambient Card Glow */}
            <div className="absolute inset-0 bg-blue-500/10 rounded-3xl filter blur-2xl -z-10" />
            
            <div 
              ref={previewRef}
              className="w-full max-w-[440px] glass-panel-heavy rounded-2xl p-5 border border-white/[0.08] shadow-2xl relative"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="px-2 py-0.5 rounded text-[10px] bg-white/[0.05] border border-white/[0.08] text-zinc-500">
                  sma-workspace.live
                </div>
              </div>

              {/* Card Body (Mock Video Call UI) */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Person 1 */}
                <div className="relative aspect-video rounded-lg bg-zinc-900 border border-white/[0.04] overflow-hidden flex items-center justify-center">
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] bg-black/60 backdrop-blur-md text-white border border-white/[0.05]">
                    Sarah Connor
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    SC
                  </div>
                  <div className="absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </div>
                </div>

                {/* Person 2 (Local) */}
                <div className="relative aspect-video rounded-lg bg-zinc-900 border border-blue-500/30 overflow-hidden flex items-center justify-center">
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] bg-blue-500/20 backdrop-blur-md text-blue-300 border border-blue-500/30">
                    You (Host)
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    ME
                  </div>
                  <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* Chat snippet preview */}
              <div className="rounded-lg bg-black/40 border border-white/[0.05] p-3 text-[11px] space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-purple-400">Sarah:</span>
                  <span className="text-zinc-300">How is the transcription response rate?</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-blue-400">You:</span>
                  <span className="text-zinc-300">Under 100ms. LiveKit handles audio packet delivery smoothly.</span>
                </div>
              </div>

              {/* Mini control dock mock */}
              <div className="flex justify-center items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="w-7 h-7 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="w-7 h-7 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center cursor-pointer">
                  <span className="w-2 h-0.5 bg-zinc-400 rounded-full" />
                </div>
                <div className="w-14 h-7 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center cursor-pointer">
                  <span className="text-[9px] font-bold text-red-400">LEAVE</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Feature section */}
      <section 
        id="features"
        className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-white/[0.04]"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Engineered for Flawless Collaboration
          </h2>
          <p className="text-zinc-400 text-base">
            Powering your remote workflows with industry-leading meeting tools built right into the interface.
          </p>
        </div>

        <div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1 */}
          <div className="glass-panel rounded-xl p-6 hover:border-blue-500/30 transition-colors duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Video className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              HD Video Calling
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Crystal clear WebRTC video streams utilizing LiveKit Cloud dynamic resolution tuning.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel rounded-xl p-6 hover:border-purple-500/30 transition-colors duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Keyboard className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Live Transcription
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Auto-scrolling speech transcript panel keeps team aligned on action items.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel rounded-xl p-6 hover:border-indigo-500/30 transition-colors duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Integrated Chat
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Seamlessly publish rich JSON-encoded chat data over reliable LiveKit room channels.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel rounded-xl p-6 hover:border-emerald-500/30 transition-colors duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Secure Connections
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Stateless JWT server validation grants authenticated room join tokens on backend request.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 border-t border-white/[0.04] text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          &copy; {new Date().getFullYear()} Smart Meeting Assistant (SMA). Production Ready.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
          <a href="https://github.com/purvapatil11/Meeting-assistant" className="hover:text-zinc-300 transition-colors">GitHub Repository</a>
        </div>
      </footer>
    </div>
  );
}
