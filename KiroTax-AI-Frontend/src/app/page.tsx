'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PortfolioHero } from '@/components/portfolio/PortfolioHero';
import { PlatformCapabilities } from '@/components/portfolio/PlatformCapabilities';
import { ComplianceSection } from '@/components/portfolio/ComplianceSection';
import { ERPIntegration } from '@/components/portfolio/ERPIntegration';
import { TrustSection } from '@/components/portfolio/TrustSection';
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter';
import { USPSection } from '@/components/portfolio/USPSection';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('kirotax_user');
    if (storedUser) {
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <PortfolioHero />
      <PlatformCapabilities />
      <ComplianceSection />
      <ERPIntegration />
      <USPSection />
      <TrustSection />
      <PortfolioFooter />
    </main>
  );
}
