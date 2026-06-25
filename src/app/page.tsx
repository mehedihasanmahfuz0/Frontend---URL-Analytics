'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import {
  Link2, BarChart3, Globe, MousePointerClick, Zap, Shield, ArrowRight,
  ChevronRight, ExternalLink, Smartphone, Monitor, LineChart
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Shortening',
    desc: 'Create short links instantly with our blazing-fast API. No delays, no queues — just instant results.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    desc: 'Track every click in real-time. See who clicked, when, and from where — updated within seconds.',
  },
  {
    icon: Globe,
    title: 'Global Geographic Data',
    desc: 'Know your audience down to the city level. Powered by GeoIP, see where your visitors come from.',
  },
  {
    icon: MousePointerClick,
    title: 'Device & Browser Insights',
    desc: 'Understand your traffic by device type, browser, and operating system for smarter targeting.',
  },
  {
    icon: ExternalLink,
    title: 'Referrer Tracking',
    desc: 'See exactly which platforms drive traffic. Twitter, LinkedIn, email campaigns — every source tracked.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    desc: 'JWT-authenticated API with rate limiting. Your links and data stay private and protected.',
  },
];

const steps = [
  { step: '01', title: 'Paste Your URL', desc: 'Enter any long URL into the shortener. Our system validates and prepares it for shortening.' },
  { step: '02', title: 'Share Your Link', desc: 'Get a clean, short link instantly. Share it on social media, emails, or anywhere you want.' },
  { step: '03', title: 'Track Everything', desc: 'Watch click data pour in. Analyze country, device, browser, referrer, and daily trends.' },
];

const stats = [
  { value: '10K+', label: 'Links Created' },
  { value: '1M+', label: 'Clicks Tracked' },
  { value: '150+', label: 'Countries Reached' },
  { value: '99.9%', label: 'Uptime' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Link2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">LinkMetrics</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/login" />} className="hidden sm:flex">
              Sign In
            </Button>
            <Button size="sm" nativeButton={false} render={<Link href="/register" />}>
              Get Started Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 lg:py-36 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground mb-6">
              <Zap className="h-3 w-3 text-primary" />
              Now with real-time analytics
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Shorten Links.{' '}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Track Everything.
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create short, memorable URLs and get detailed analytics on every click. Know your audience — their location,
              device, browser, and how they found your link.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto text-base px-8" nativeButton={false} render={<Link href="/register" />}>
                Start Tracking Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8" nativeButton={false} render={<Link href="/login" />}>
                Sign In
              </Button>
            </div>
          </div>

          {/* Hero mockup */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="relative rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/30">
                <div className="h-3 w-3 rounded-full bg-destructive/70" />
                <div className="h-3 w-3 rounded-full bg-warning/70" />
                <div className="h-3 w-3 rounded-full bg-success/70" />
                <div className="ml-4 text-xs text-muted-foreground font-mono">analytics.linkmetrics.app</div>
              </div>
              <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-lg bg-muted/50 p-4 space-y-2">
                    <div className="h-3 w-16 rounded bg-muted-foreground/20" />
                    <div className="h-8 w-20 rounded bg-primary/20" />
                    <div className="h-2 w-24 rounded bg-muted-foreground/10" />
                  </div>
                ))}
                <div className="md:col-span-4 rounded-lg bg-muted/50 p-4 space-y-3">
                  <div className="h-3 w-32 rounded bg-muted-foreground/20" />
                  <div className="h-32 rounded bg-primary/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-28 md:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              understand your traffic
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            From link creation to deep analytics — get the full picture of your audience in one dashboard.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="group relative rounded-xl border border-border bg-card p-6 hover:shadow-md transition-all duration-200">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Three simple steps
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Get started in under a minute. No credit card required.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center md:text-left">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px border-t-2 border-dashed border-border" />
                )}
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <span className="text-2xl font-bold text-primary">{s.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics preview */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-28 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground">
              <LineChart className="h-3 w-3 text-primary" />
              Deep Analytics
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Know every detail about{' '}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                every click
              </span>
            </h2>
            <ul className="space-y-4">
              {[
                { icon: Globe, text: 'Country & city-level geographic data' },
                { icon: Smartphone, text: 'Device type breakdown (mobile, desktop, tablet)' },
                { icon: Monitor, text: 'Browser & OS analytics' },
                { icon: ExternalLink, text: 'Referrer tracking — see where traffic comes from' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item.text}</span>
                  </li>
                );
              })}
            </ul>
            <Button className="mt-4" nativeButton={false} render={<Link href="/register" />}>
              Start Analyzing
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 w-full">
            <div className="relative rounded-xl border border-border bg-card shadow-lg overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/30">
                <div className="h-3 w-3 rounded-full bg-destructive/70" />
                <div className="h-3 w-3 rounded-full bg-warning/70" />
                <div className="h-3 w-3 rounded-full bg-success/70" />
                <div className="ml-4 text-xs text-muted-foreground font-mono">clicks over time</div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Total Clicks</div>
                    <div className="text-2xl font-bold">1,847</div>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> Mobile</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" /> Desktop</span>
                  </div>
                </div>
                <div className="h-32 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 50, 75].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col gap-1">
                      <div className="w-full rounded-t-sm bg-success/60" style={{ height: `${h * 0.5}%` }} />
                      <div className="w-full rounded-t-sm bg-primary/60" style={{ height: `${(h - 10) * 0.4}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-purple-500/10 border-y border-border">
        <div className="max-w-3xl mx-auto px-4 py-20 md:py-28 text-center md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to track your links?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands who already use LinkMetrics to understand their audience. Free to start.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-base px-8" nativeButton={false} render={<Link href="/register" />}>
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8" nativeButton={false} render={<Link href="/login" />}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 py-10 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                <Link2 className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">LinkMetrics</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link>
              <Link href="/register" className="hover:text-foreground transition-colors">Sign Up</Link>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} LinkMetrics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
