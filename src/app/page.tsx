"use client";

import { useState } from "react";
import Script from "next/script";
import { Card, CardContent } from "@/components/ui/card";

export default function TakeNextWebsite() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    phoneNumber: "",
    dealershipWebsite: "",
  });

  const openCalendly = () => {
    if (typeof window !== 'undefined') {
      const calendly = (window as typeof window & { Calendly?: { initPopupWidget: (options: { url: string }) => void } }).Calendly;
      if (calendly) {
        calendly.initPopupWidget({url: 'https://calendly.com/emma-take-next/30min'});
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbx506C5aQUrI5WXvMA5d2ptzvt-l-8whpOwyWCa-qaCazX2VdKKbbJ5T3wDabw1qJvFpg/exec';
      
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert("Thank you! We'll reach out within 24 hours.");
      setIsDialogOpen(false);
      setFormData({ fullName: "", title: "", phoneNumber: "", dealershipWebsite: "" });
    } catch (error) {
      console.error('Error:', error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <div className="font-sans bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="font-black" style={{ fontSize: '32px', lineHeight: '0.85', letterSpacing: '2px' }}>
              <div>TAKE</div>
              <div>NEXT</div>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-base">
              <a href="#pricing" className="text-white hover:text-gray-300 transition">Pricing</a>
              <a href="#how-it-works" className="text-white hover:text-gray-300 transition">How It Works</a>
            </nav>
          </div>
          <button onClick={() => setIsDialogOpen(true)} className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3 rounded-lg text-base font-medium transition">Get Started</button>
        </div>
      </header>

      {/* Hero Video */}
      <section className="relative w-full overflow-hidden mt-20" style={{ height: '70vh', minHeight: '500px' }}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* CTA Overlay */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          <button onClick={() => setIsDialogOpen(true)} className="bg-teal-500 hover:bg-teal-400 text-white px-10 py-4 text-lg font-medium rounded-lg shadow-xl transition">Get Started</button>
          <button onClick={openCalendly} className="bg-transparent hover:bg-white/10 text-white px-10 py-4 text-lg font-medium rounded-lg border-2 border-white shadow-xl inline-flex items-center transition">Book Demo</button>
        </div>
      </section>

      {/* Hero Content Section */}
      <section className="hidden px-6 pt-32 pb-16 text-center bg-gradient-to-b from-black to-gray-900">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Flip a switch.<br />Your BDC goes live.</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Take‑Next is an AI‑native BDC department. It answers every lead instantly,
          holds two‑way text conversations, follows up automatically, and escalates
          to your team only when human involvement is required.
        </p>
        <p className="text-sm text-gray-500">Setup in 48 hours</p>
      </section>

      {/* How It Works - Unified Section */}
      <section id="how-it-works" className="pt-32 pb-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How it works</h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-12">
              From lead to sale, Take‑Next handles everything a modern BDC should do. 
              Four components work together to run your dealership — no hiring, no training, no turnover.
            </p>
          </div>

          {/* 2x2 Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Operator */}
            <Card className="border-teal-500/30 hover:border-teal-500 transition-colors">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    🎯
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">The Operator</h3>
                    <p className="text-teal-400 text-sm">Your dealership&apos;s AI control center.</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  The Operator is where every lead begins — whether it&apos;s text, chat, calls, or emails. 
                  It responds instantly and manages the lifecycle of each prospect. The Operator decides: 
                  should the AI handle the next step, should the conversation be escalated, or should it 
                  be passed directly into the Bullpen for a salesperson? Think of it as the dispatcher and 
                  traffic controller for all lead activity.
                </p>
              </CardContent>
            </Card>

            {/* Bullpen */}
            <Card className="border-teal-500/30 hover:border-teal-500 transition-colors">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">The Bullpen</h3>
                    <p className="text-teal-400 text-sm">Where AI and people meet to sell.</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  The Bullpen is the bridge between your AI BDC swarm and your sales team. Here, leads 
                  that require human touch are queued and delivered directly to your reps — no cherry-picking, 
                  no wasted time. By deciding who should be contacted next, the AI ensures every salesperson 
                  is always working the highest-priority opportunities.
                </p>
              </CardContent>
            </Card>

            {/* Playground */}
            <Card className="border-teal-500/30 hover:border-teal-500 transition-colors">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    🧪
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">The Playground</h3>
                    <p className="text-teal-400 text-sm">Experimentation without risk.</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  The Playground is where ideas get tested before they go live. It&apos;s a safe space to explore 
                  new prompts, conversation styles, or workflows without ever touching a real prospect. This is 
                  where you refine how your AI BDC swarm sounds, acts, and responds — ensuring it matches your 
                  store&apos;s voice and strategy.
                </p>
              </CardContent>
            </Card>

            {/* Subscriber */}
            <Card className="border-teal-500/30 hover:border-teal-500 transition-colors">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    📊
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">The Subscriber</h3>
                    <p className="text-teal-400 text-sm">The leadership view.</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  The Subscriber is the bridge between AI and dealership leadership — giving owners, GMs, and 
                  OEMs a birds-eye view of their stores. From one place, leaders can see how reps are performing, 
                  which vehicles are selling, and how revenue is tracking. The AI acts as an assistant to management, 
                  escalating staff issues and surfacing missed opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold text-teal-400 mb-2">24/7</div>
              <p className="text-gray-400">Always‑on coverage</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-teal-400 mb-2">0%</div>
              <p className="text-gray-400">Turnover rate</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-teal-400 mb-2">&lt;60s</div>
              <p className="text-gray-400">Average response time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Positioning */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Stop hiring. Start activating.</h2>
          <p className="text-gray-400 text-lg">The math is simple. The decision is easier.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <Card className="border-red-500/30">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">Traditional BDC</h3>
                <div className="text-5xl font-bold text-red-400 mb-2">$50K+</div>
                <p className="text-gray-400 text-sm">per rep / year</p>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Limited hours coverage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>67% annual turnover</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Inconsistent performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Training & management overhead</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Variable quality</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-green-500/30">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">Take‑Next</h3>
                <div className="text-5xl font-bold text-green-400 mb-2">$2,500</div>
                <p className="text-gray-400 text-sm">per month / rooftop</p>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>True 24/7 coverage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Zero turnover</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Consistent performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>No training or management</span>
          </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Instant setup (48 hours)</span>
          </li>
              </ul>
              <button onClick={() => setIsDialogOpen(true)} className="mt-6 w-full bg-teal-500 hover:bg-teal-400 text-white px-6 py-4 text-lg font-medium rounded-lg shadow-lg transition">Get started</button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popup Form (Modal) */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80" onClick={() => setIsDialogOpen(false)} />
          <div className="relative z-10 w-full max-w-lg mx-auto bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-xl">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white">Get a demo</h3>
              <p className="text-sm text-gray-400">Fill out the form below and we’ll get back to you within 24 hours to schedule your personalized demo.</p>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm text-gray-300">Full Name *</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="John Smith"
                  className="w-full rounded-md bg-gray-800 border border-gray-700 text-white px-3 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm text-gray-300">Title *</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="General Manager"
                  className="w-full rounded-md bg-gray-800 border border-gray-700 text-white px-3 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm text-gray-300">Phone Number *</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="(555) 123-4567"
                  className="w-full rounded-md bg-gray-800 border border-gray-700 text-white px-3 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="dealershipWebsite" className="text-sm text-gray-300">Dealership Website *</label>
                <input
                  id="dealershipWebsite"
                  name="dealershipWebsite"
                  type="url"
                  value={formData.dealershipWebsite}
                  onChange={handleInputChange}
                  required
                  placeholder="https://yourdealership.com"
                  className="w-full rounded-md bg-gray-800 border border-gray-700 text-white px-3 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsDialogOpen(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition">Cancel</button>
                <button type="submit" className="flex-1 bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-lg font-medium transition">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-3">Take‑Next</h3>
              <p className="text-gray-500 text-sm">AI BDC in a box. Flip a switch, go live.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#how-it-works" className="hover:text-white transition">How it works</a></li>
                <li><a href="#components" className="hover:text-white transition">Components</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Take‑Next. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}