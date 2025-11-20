"use client";

import { useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function TakeNextWebsite() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    
    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbx506C5aQUrI5WXvMA5d2ptzvt-l-8whpOwyWCa-qaCazX2VdKKbbJ5T3wDabw1qJvFpg/exec';
      
      // Fire and forget - don't wait for response
      fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Show success immediately
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Thank you! We'll reach out within 24 hours.");
        setIsDialogOpen(false);
        setFormData({ fullName: "", title: "", phoneNumber: "", dealershipWebsite: "" });
      }, 500);
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      
      {/* Meta Pixel */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1121932820100335');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{display: 'none'}} 
          src="https://www.facebook.com/tr?id=1121932820100335&ev=PageView&noscript=1" 
          alt="" />
      </noscript>
      
      <div className="font-sans bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="font-black hover:opacity-80 transition" style={{ fontSize: '32px', lineHeight: '0.85', letterSpacing: '2px' }}>
              <div>TAKE</div>
              <div>NEXT</div>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-base">
              <a href="#the-shift" className="text-white hover:text-gray-300 transition">The Shift</a>
              <a href="#how-it-works" className="text-white hover:text-gray-300 transition">How It Works</a>
              <a href="#pricing" className="text-white hover:text-gray-300 transition">Pricing</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://app.takenext.ai" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition text-base font-medium">Login</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden mt-20 px-6 py-32 bg-gradient-to-b from-black to-gray-900" style={{ minHeight: '70vh' }}>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
            When AI knocks,
          </h1>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-teal-400 mb-16">
            TakeNext answers.
          </h2>
          
          {/* CTA Button */}
          <div>
            <button onClick={() => setIsDialogOpen(true)} className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 text-base font-medium rounded-lg shadow-lg transition">Get Started</button>
          </div>
        </div>
      </section>

      {/* Hero Content Section */}
      <section className="hidden px-6 pt-32 pb-16 text-center bg-gradient-to-b from-black to-gray-900">
        <div className="mb-8">
          <p className="text-teal-400 text-sm font-semibold uppercase tracking-wider mb-4">The new verb</p>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            AI talks to AI now.
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-300 mb-6">
            Who answers yours?
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl text-white mb-8 font-semibold">
            TakeNext.
          </p>
          <p className="text-lg text-gray-400 mb-12">
            When AI talks, we take the next turn. Your business. Open for AI.
          </p>
        </div>
      </section>

      {/* The Shift */}
      <section id="the-shift" className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Conversation UI */}
            <div className="w-full">
              <div className="relative w-full rounded-[32px] border border-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.45)] bg-gradient-to-b from-gray-900 to-black p-6 max-w-md mx-auto">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-gray-700/70" />
                <div className="space-y-4 mt-4">
                  <div className="rounded-2xl bg-gray-800/70 p-4 border border-gray-700">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Today · 8:12 AM · Her AI</p>
                    <p className="text-white text-lg font-semibold">
                      “Your lease is up in three weeks. Should I start looking at SUVs like we talked about?”
                    </p>
                  </div>
                  <div className="rounded-2xl bg-teal-500/10 p-4 border border-teal-500/30">
                    <p className="text-xs uppercase tracking-widest text-teal-300 mb-1">Today · 8:13 AM · Sarah</p>
                    <p className="text-gray-200 text-lg font-semibold">
                      “Yeah. Certified Telluride. Under $45k. Near Austin.”
                    </p>
                  </div>
                  <div className="rounded-2xl bg-gray-800/70 p-4 border border-gray-700">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Today · 8:13 AM · Her AI</p>
                    <p className="text-gray-200 text-lg">
                      “Working on it. Checking inventory at twelve rooftops. Screening incentives and trade-ins…”
                    </p>
                  </div>
                  <div className="rounded-2xl bg-gray-800/70 p-4 border border-gray-700">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-1">Today · 8:15 AM · Her AI</p>
                    <p className="text-gray-200 text-lg">
                      “Great news - 3 of 12 dealers respond. I booked you at Northside Kia for 2:00 PM and saved the route to your calendar.”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Explanation of the shift */}
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-teal-400">The shift</p>
              <h3 className="text-4xl font-bold">AI talks to AI now.</h3>
              <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                <p>
                  Consumers now have personal AIs knocking on doors. Those assistants compare inventory, request pricing, and try to schedule without ever picking up the phone. Most businesses still can’t answer those knocks.
                </p>
                <p>
                  TakeNext is the last-mile platform that connects real-world businesses with third-party AIs. We scrap human-first systems and put your AI in the driver’s seat, connecting with consumer AIs, running the day-to-day coordination, and only calling in your team when human touch is required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flow + Pricing */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-48 -left-48 w-[420px] h-[420px] bg-teal-500/12 blur-[180px]" />
          <div className="absolute bottom-[-100px] right-[-40px] w-[420px] h-[420px] bg-blue-400/15 blur-[180px]" />
        </div>
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">How it works</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Shoppers use AI.<br />You TakeNext.</h2>
            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-teal-400 mb-2">1 · Connect</p>
                <p className="text-gray-300 text-lg leading-relaxed">We hook your AI into consumer, marketplace, and OEM AIs so every knock routes through TakeNext immediately.</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-teal-400 mb-2">2 · Coordinate</p>
                <p className="text-gray-300 text-lg leading-relaxed">Your assistant answers in real time, checking systems, quoting price, scheduling, and logging receipts.</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-teal-400 mb-2">3 · Call in people</p>
                <p className="text-gray-300 text-lg leading-relaxed">When judgment matters, TakeNext escalates with full context. Humans respond, AI resumes control.</p>
              </div>
            </div>
          </div>
          <div id="pricing" className="self-start w-full max-w-sm mx-auto">
            <div className="bg-gradient-to-b from-gray-800/80 to-gray-900 border border-gray-700/80 shadow-[0_25px_80px_rgba(0,0,0,0.55)] rounded-[32px] p-10 space-y-6 text-left">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.4em] text-gray-500">Pricing</p>
                <p className="text-5xl font-bold text-white">$299<span className="text-lg text-gray-500 font-normal">/month</span></p>
                <p className="text-gray-500 text-sm">Includes 2 users · each additional user $39/mo</p>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Flat-rate platform fee. Two seats included; every extra user is $39/mo. Cancel anytime.
              </p>
              <button onClick={() => setIsDialogOpen(true)} className="w-full bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 text-base font-medium rounded-full shadow-lg transition">
                Get Started
              </button>
            </div>
          </div>
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
                <label htmlFor="dealershipWebsite" className="text-sm text-gray-300">Company Website *</label>
                <input
                  id="dealershipWebsite"
                  name="dealershipWebsite"
                  type="text"
                  value={formData.dealershipWebsite}
                  onChange={handleInputChange}
                  required
                  placeholder="yourcompany.com"
                  className="w-full rounded-md bg-gray-800 border border-gray-700 text-white px-3 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsDialogOpen(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition" disabled={isSubmitting}>Cancel</button>
                <button type="submit" className="flex-1 bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div>
            <h3 className="font-bold mb-2 text-white">TakeNext</h3>
            <p className="text-gray-500 text-sm">When AI knocks. TakeNext answers.</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div>
              <h4 className="font-semibold mb-3 text-white">Navigate</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#the-shift" className="hover:text-white transition">The Shift</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How it Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Legal</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}