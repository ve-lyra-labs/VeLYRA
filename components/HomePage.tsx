"use client";

import { ModeToggle } from "@/components/ModeToggle";
import React, { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { motion } from "framer-motion";
import {
  BrainCircuit, Eye, Cpu, ShieldCheck, Cloud, Factory, Stethoscope,
  ShoppingBag, Building2, CheckCircle2, Send, Mail, ArrowRight,
  Linkedin, Github, Twitter, Calendar, Briefcase, Trophy,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/public/assets/ai-dashboard-hero.jpg";
import { handleNewsletterSubmission, handleContactSubmission } from "@/app/actions";

const Section = ({ id, children, className = "" }: { id?: string, children: React.ReactNode, className?: string }) => (
  <section id={id} className={`scroll-mt-24 ${className}`}>{children}</section>
);

const useSmoothScroll = () => {
  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const node = document.getElementById(targetId);
    if (node) {
      window.scrollTo({
        top: node.offsetTop - 80, // Offset for sticky header
        behavior: "smooth"
      });
    }
  };
  return onNavClick;
};

const Stat = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-extrabold tracking-tight">{value}</div>
    <div className="text-sm opacity-80 mt-1">{label}</div>
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs tracking-wide uppercase text-primary font-medium">
    {children}
  </span>
);

const FeatureCard = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
  <Card className="group hover:shadow-ai hover:border-primary/30 transition-all duration-500 border-primary/10 bg-gradient-to-br from-card/50 to-card/20 backdrop-blur-sm">
    <CardHeader className="flex flex-row items-center gap-3">
      <div className="p-2 rounded-xl bg-gradient-ai-primary border border-primary/20">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-sm opacity-90 leading-relaxed">{children}</CardContent>
  </Card>
);

const BadgeCheck = () => (
  <CheckCircle2 className="inline-block w-4 h-4 mr-2 text-primary" />
);

const AnimatedBadge = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.05, boxShadow: "var(--shadow-ai)" }}
    transition={{ duration: 0.3, delay }}
    className="rounded-2xl p-5 border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent hover:border-primary/40 cursor-pointer"
  >
    <BadgeCheck /> {children}
  </motion.div>
);

const TypewriterText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");

    let timeoutId: NodeJS.Timeout;

    const typeCharacter = (currentIndex: number) => {
      if (currentIndex < text.length) {
        // We use a functional update here to ensure we are always
        // appending to the most recent state.
        setDisplayedText((prev) => prev + text[currentIndex]);
        
        timeoutId = setTimeout(() => {
          typeCharacter(currentIndex + 1);
        }, 50);
      }
    };

    const startTimeout = setTimeout(() => typeCharacter(0), 10);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [text]);

  return <span className={className}>{displayedText}</span>;
};


export default function HomePage() {
  const onNavClick = useSmoothScroll();
  const { toast } = useToast();

  const contactFormRef = useRef<HTMLFormElement>(null);
  const newsletterFormRef = useRef<HTMLFormElement>(null);
  const footerNewsletterFormRef = useRef<HTMLFormElement>(null);

  const [contactFormState, contactFormAction] = useFormState(handleContactSubmission, { success: false, message: "" });
  const [newsletterFormState, newsletterFormAction] = useFormState(handleNewsletterSubmission, { success: false, message: "" });
  const [footerNewsletterState, footerNewsletterAction] = useFormState(handleNewsletterSubmission, { success: false, message: "" });


  useEffect(() => {
    if (contactFormState.message) {
      toast({
        title: contactFormState.success ? "Success!" : "Error",
        description: contactFormState.message,
        variant: contactFormState.success ? "default" : "destructive",
      });
      if (contactFormState.success) contactFormRef.current?.reset();
    }
  }, [contactFormState, toast]);

  useEffect(() => {
    if (newsletterFormState.message) {
      toast({
        title: newsletterFormState.success ? "Success!" : "Error",
        description: newsletterFormState.message,
      });
      if (newsletterFormState.success) newsletterFormRef.current?.reset();
    }
  }, [newsletterFormState, toast]);

  useEffect(() => {
    if (footerNewsletterState.message) {
      toast({
        title: footerNewsletterState.success ? "Success!" : "Error",
        description: footerNewsletterState.message,
      });
      if (footerNewsletterState.success) footerNewsletterFormRef.current?.reset();
    }
  }, [footerNewsletterState, toast]);

  return (
    <div className="min-h-screen text-foreground bg-gradient-to-br from-background via-background to-primary/5">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 backdrop-blur border-b border-primary/10 bg-background/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div 
              initial={{ rotate: -6, opacity: 0 }} 
              animate={{ rotate: 0, opacity: 1 }} 
              transition={{ duration: 0.6 }} 
              className="p-2 rounded-xl bg-gradient-ai-primary border border-primary/20 group-hover:shadow-ai transition-shadow"
            >
              <BrainCircuit className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-semibold tracking-tight">VeLYRA LABS</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {[
              ["About", "about"],
              ["Offerings", "offerings"],
              ["Why Us", "why"],
              ["Impact", "impact"],
              ["Contact", "contact"],
            ].map(([label, target]) => (
              <a 
                key={target} 
                href={`#${target}`} 
                onClick={(e) => onNavClick(e, target)} 
                className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <a href="#contact" onClick={(e) => onNavClick(e, "contact")}>
              <Button className="rounded-2xl bg-gradient-ai-primary hover:shadow-ai transition-all duration-300">
                Book a Consultation
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <Section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-ai-subtle" />
          <div className="absolute -left-24 -top-24 w-[40rem] h-[40rem] bg-primary/10 blur-3xl rounded-full animate-pulse" />
          <div className="absolute -right-24 -bottom-24 w-[40rem] h-[40rem] bg-secondary/10 blur-3xl rounded-full animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Pill>Vision Intelligence • Generative AI</Pill>
              <motion.h1 
                initial={{ y: 16, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.6 }} 
                // Pass the gradient class to the parent, not the Typewriter itself
                className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight "
              >
                <TypewriterText 
                  text="Let Your Reality Be Analysed" 
                  className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent select-text"
                />
              </motion.h1>
              <p className="mt-5 text-lg md:text-xl opacity-90 max-w-xl">
                Turning visual data into intelligent action. We deliver next‑generation AI for surveillance, industrial automation, retail analytics, healthcare, and smart cities.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" onClick={(e) => onNavClick(e, "contact")}>
                  <Button size="lg" className="rounded-2xl bg-gradient-ai-primary hover:shadow-ai hover:scale-105 transition-all duration-300 font-semibold">
                    <Calendar className="mr-2 w-5 h-5" />
                    Book a Consultation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
                <a href="#newsletter" onClick={(e) => onNavClick(e, "newsletter")}>
                  <Button variant="link" size="lg" className="rounded-2xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
                    <Mail className="mr-2 w-4 h-4" />
                    Join Our Newsletter
                  </Button>
                </a>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
                <Stat value="2025" label="Founded" />
                <Stat value="50+" label="Deployments" />
                <Stat value="99.9%" label="Uptime" />
              </div>
            </div>
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.8 }} 
              className="relative"
            >
              <div className="aspect-video rounded-3xl border border-primary/20 overflow-hidden shadow-ai">
                <Image 
                  src={heroImage} 
                  alt="AI Vision Analytics Dashboard" 
                  className="w-full h-full object-cover"
                  priority
                  placeholder="blur"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card/80 border border-primary/20 rounded-2xl p-4 backdrop-blur">
                <div className="text-xs opacity-80">Real-time object tracking</div>
                <div className="text-sm font-semibold text-primary">Multi-camera fusion</div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>
        
      {/* About */}
            <Section id="about" className="py-16 md:py-24">
              <div className="max-w-5xl mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-5 gap-8 items-start">
                  <div className="md:col-span-2">
                    <h2 className="text-2xl md:text-3xl font-bold">About VeLYRA LABS</h2>
                    <p className="mt-4 opacity-90 text-lg leading-relaxed">
                      Founded in 2025, VeLYRA LABS builds scalable AI IP in vision and generative AI with enterprise SaaS potential. We turn visual data into intelligent action through next-generation AI solutions deployed across cloud, on-premise, and edge environments.
                    </p>
                    <p className="mt-3 text-sm opacity-75 font-medium text-primary">
                      VeLYRA LABS is building scalable AI IP in vision + generative AI with enterprise SaaS potential.
                    </p>
                  </div>
                  <div className="md:col-span-3 grid sm:grid-cols-3 gap-4">
                    <div className="rounded-2xl p-4 border border-primary/20 bg-gradient-to-br from-card/50 to-card/20">
                      <div className="text-sm opacity-80">Focus</div>
                      <div className="font-semibold text-primary">Vision & Generative AI</div>
                    </div>
                    <div className="rounded-2xl p-4 border border-primary/20 bg-gradient-to-br from-card/50 to-card/20">
                      <div className="text-sm opacity-80">Model Delivery</div>
                      <div className="font-semibold text-primary">Cloud · On‑Prem · Edge</div>
                    </div>
                    <div className="rounded-2xl p-4 border border-primary/20 bg-gradient-to-br from-card/50 to-card/20">
                      <div className="text-sm opacity-80">Approach</div>
                      <div className="font-semibold text-primary">Project + Product Hybrid</div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
      
            {/* Offerings */}
            <Section id="offerings" className="py-16 md:py-24">
              <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-end justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold">What We Do — Core Offerings</h2>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
                  <FeatureCard icon={Eye} title="AI/ML Services">
                    Tailored vision analytics for surveillance, retail, healthcare.
                    Custom GenAI solutions for real-world deployment.
                  </FeatureCard>
                  <FeatureCard icon={ShieldCheck} title="SaaS APIs">
                    Plug-and-play models with zero integration hassle.
                    Start fast, scale faster with enterprise-ready solutions.
                  </FeatureCard>
                  <FeatureCard icon={Cloud} title="AI Products">
                    Proprietary anomaly detection & tracking systems.
                    Built for scale across cloud, on-prem, and edge.
                  </FeatureCard>
                  <FeatureCard icon={Cpu} title="Full-Stack Consulting">
                    Strategy → training → deployment at the edge.
                    End-to-end AI transformation for enterprises.
                  </FeatureCard>
                </div>
              </div>
            </Section>
      
            {/* Why Choose Us */}
            <Section id="why" className="py-16 md:py-24">
              <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="rounded-3xl p-8 md:p-10 border border-primary/20 bg-gradient-to-br from-card/50 to-card/20 backdrop-blur">
                  <h2 className="text-2xl md:text-3xl font-bold">Why Choose Us</h2>
                  <div className="grid md:grid-cols-3 gap-6 mt-6 text-sm">
                    <AnimatedBadge delay={0.001}>
                      Deep expertise in Vision & Generative AI
                    </AnimatedBadge>
                    <AnimatedBadge delay={0.01}>
                      Project + Product hybrid model advantage  
                    </AnimatedBadge>
                    <AnimatedBadge delay={0.01}>
                      Secure deployments: <br></br>Cloud / On‑Prem / Edge
                    </AnimatedBadge>
                  </div>
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 text-sm opacity-75">
                      <Trophy className="w-4 h-4 text-primary" />
                      Backed by proven enterprise partnerships
                    </div>
                  </div>
                </div>
              </div>
            </Section>
      
            {/* Industry Impact */}
            <Section id="impact" className="py-16 md:py-24">
              <div className="max-w-7xl mx-auto px-4 md:px-6">
                <h2 className="text-2xl md:text-3xl font-bold">Industry Impact</h2>
                <p className="mt-3 opacity-90 max-w-3xl">
                  We empower industries — from retail to smart cities — to automate, secure, and decide faster with adaptive AI.
                </p>
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
                  <Card className="border-primary/20 bg-gradient-to-br from-card/50 to-card/20 hover:shadow-ai transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary" /> Retail
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm opacity-90">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Queue analytics & heatmaps</li>
                        <li>Loss prevention via anomaly detection</li>
                        <li>Planogram & shelf monitoring</li>
                      </ul>
                      <div className="mt-3 text-xs opacity-80 p-2 bg-primary/10 rounded-lg border border-primary/20">
                        Case: 18% shrink reduction at Tier‑1 retailer
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-primary/20 bg-gradient-to-br from-card/50 to-card/20 hover:shadow-ai transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Stethoscope className="w-5 h-5 text-primary" /> Healthcare
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm opacity-90">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Patient flow & wait‑time insights</li>
                        <li>Procedure anomaly detection</li>
                        <li>Safety & compliance monitoring</li>
                      </ul>
                      <div className="mt-3 text-xs opacity-80 p-2 bg-primary/10 rounded-lg border border-primary/20">
                        Case: +22% OT efficiency in multi‑hospital pilot
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-primary/20 bg-gradient-to-br from-card/50 to-card/20 hover:shadow-ai transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-primary" /> Smart Cities
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm opacity-90">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Traffic, parking & crowd insights</li>
                        <li>Incident detection & escalation</li>
                        <li>Multi‑camera object tracking</li>
                      </ul>
                      <div className="mt-3 text-xs opacity-80 p-2 bg-primary/10 rounded-lg border border-primary/20">
                        Case: 35% faster incident response at city command
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-primary/20 bg-gradient-to-br from-card/50 to-card/20 hover:shadow-ai transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Factory className="w-5 h-5 text-primary" /> Manufacturing
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm opacity-90">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Defect detection & traceability</li>
                        <li>Worker safety & PPE monitoring</li>
                        <li>Line optimization & DPMO cuts</li>
                      </ul>
                      <div className="mt-3 text-xs opacity-80 p-2 bg-primary/10 rounded-lg border border-primary/20">
                        Case: 27% scrap reduction in 8 weeks
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Section>

      {/* Newsletter Section */}
      <Section id="newsletter" className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="rounded-3xl p-6 md:p-8 border border-primary/20 bg-gradient-to-br from-card/50 to-card/20 backdrop-blur shadow-ai">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">Join Our Newsletter</h3>
                <p className="opacity-90 text-sm mt-1">Vision AI insights, edge deployments, and GenAI updates.</p>
              </div>
              <form ref={newsletterFormRef} action={newsletterFormAction} className="flex w-full md:w-auto gap-2">
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="you@company.com" 
                  className="bg-card/20 border-primary/20 focus:border-primary/40" 
                  required
                />
                <Button type="submit" className="rounded-2xl bg-gradient-ai-primary hover:shadow-ai">
                  <Send className="w-4 h-4 mr-2"/>Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Let's Build Real‑World AI</h2>
              <p className="mt-3 opacity-90 max-w-prose">
                Tell us about your use‑case. We'll map strategy → data → models → deployment. Expect pragmatic roadmaps, fast pilots, and measurable impact.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                 <div className="rounded-2xl p-4 border border-primary/20 bg-gradient-to-br from-card/50 to-card/20"><BadgeCheck/>NDA‑first discovery</div>
                 <div className="rounded-2xl p-4 border border-primary/20 bg-gradient-to-br from-card/50 to-card/20"><BadgeCheck/>Edge‑ready pipelines</div>
                 <div className="rounded-2xl p-4 border border-primary/20 bg-gradient-to-br from-card/50 to-card/20"><BadgeCheck/>MLOps & Monitoring</div>
                 <div className="rounded-2xl p-4 border border-primary/20 bg-gradient-to-br from-card/50 to-card/20"><BadgeCheck/>Security by design</div>
              </div>
            </div>
            <div>
              <Card className="border-primary/20 bg-gradient-to-br from-card/50 to-card/20 shadow-ai">
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <form ref={contactFormRef} action={contactFormAction} className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input name="name" placeholder="Full Name *" required className="bg-card/20 border-primary/20 focus:border-primary/40" />
                      <Input name="cemail" type="email" placeholder="Work Email *" required className="bg-card/20 border-primary/20 focus:border-primary/40" />
                    </div>
                    <Input name="company" placeholder="Company & Role" className="bg-card/20 border-primary/20 focus:border-primary/40" />
                    <Textarea name="message" placeholder="Project needs: What are you trying to build? Timeline? Budget range?" rows={4} required className="bg-card/20 border-primary/20 focus:border-primary/40" />
                    <div className="flex gap-2">
                      <Button type="submit" className="rounded-2xl bg-gradient-ai-primary hover:shadow-ai flex-1">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                      <Button type="button" variant="outline" className="rounded-2xl border-primary/30 hover:bg-primary/10">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Call
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-primary/10 bg-gradient-to-r from-card/20 to-card/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 font-semibold text-lg mb-4">
              <BrainCircuit className="w-5 h-5 text-primary" /> VeLYRA LABS
            </div>
            <p className="opacity-90 mb-4">Let Your Reality Be Analysed — Turning Visual Data into Intelligent Action.</p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"><Linkedin className="w-4 h-4 text-primary" /></a>
              <a href="#" className="p-2 rounded-lg border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"><Github className="w-4 h-4 text-primary" /></a>
              <a href="#" className="p-2 rounded-lg border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"><Twitter className="w-4 h-4 text-primary" /></a>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-3 text-primary">Company</div>
            <ul className="space-y-2 opacity-90">
              <li><a href="#about" onClick={(e)=>onNavClick(e,"about")} className="hover:text-primary hover:opacity-100 transition-all">About</a></li>
              <li><a href="#offerings" onClick={(e)=>onNavClick(e,"offerings")} className="hover:text-primary hover:opacity-100 transition-all">Offerings</a></li>
              <li><a href="#impact" onClick={(e)=>onNavClick(e,"impact")} className="hover:text-primary hover:opacity-100 transition-all">Impact</a></li>
              <li><a href="#" className="hover:text-primary hover:opacity-100 transition-all flex items-center gap-1"><Briefcase className="w-3 h-3" /> Careers</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3 text-primary">Resources</div>
            <ul className="space-y-2 opacity-90">
              <li><a className="hover:text-primary hover:opacity-100 transition-all" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-primary hover:opacity-100 transition-all" href="#">Terms of Use</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3 text-primary">Newsletter</div>
            <p className="opacity-80 text-xs mb-3">Get insights on vision AI and enterprise deployment.</p>
            <form ref={footerNewsletterFormRef} action={footerNewsletterAction} className="flex gap-2 mb-4">
              <Input name="email" type="email" placeholder="you@company.com" required className="bg-card/20 border-primary/20 focus:border-primary/40 text-xs" />
              <Button type="submit" size="sm" className="rounded-xl bg-gradient-ai-primary hover:shadow-ai"><Send className="w-3 h-3" /></Button>
            </form>
            <div className="opacity-60 text-xs">© {new Date().getFullYear()} VeLYRA LABS. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
