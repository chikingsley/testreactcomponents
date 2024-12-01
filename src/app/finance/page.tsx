'use client';

import { FinanceCard } from '@/components/FinanceCard';
import { Plus, Filter } from 'lucide-react';

const mockDeals = [
  {
    partner: "TokoMedia",
    geo: "FR",
    dates: "Nov 15-21, 2024",
    funnels: ["Crypto Zoo", "Immediate Mix"],
    status: "pending" as const,
    totalAmount: 12450,
    cpaRate: 1300,
    crgRate: 14,
    grossLeads: 450,
    deductions: 12,
    invalidRate: 2.6,
    netLeads: 438,
    ftds: 45,
    crRate: 10.3,
    invalidDeductRate: 2.6,
    ftdCost: 58500,
    crgCost: 8190,
    totalCost: 66690
  },
  {
    partner: "TokoMedia",
    geo: "DE",
    dates: "Nov 15-21, 2024",
    funnels: ["Premium Trader"],
    status: "completed" as const,
    totalAmount: 15800,
    cpaRate: 1450,
    crgRate: 15,
    grossLeads: 320,
    deductions: 6,
    invalidRate: 1.9,
    netLeads: 314,
    ftds: 48,
    crRate: 15.3,
    invalidDeductRate: 1.9,
    ftdCost: 69600,
    crgCost: 10440,
    totalCost: 80040
  },
  {
    partner: "TokoMedia",
    geo: "ES",
    dates: "Nov 15-21, 2024",
    funnels: ["Crypto Starter"],
    status: "pending" as const,
    totalAmount: 9200,
    cpaRate: 1200,
    crgRate: 13,
    grossLeads: 250,
    deductions: 8,
    invalidRate: 3.2,
    netLeads: 242,
    ftds: 32,
    crRate: 13.2,
    invalidDeductRate: 3.2,
    ftdCost: 38400,
    crgCost: 4992,
    totalCost: 43392
  },
  {
    partner: "SuperAffiliate",
    geo: "DE",
    dates: "Nov 15-21, 2024",
    funnels: ["Premium Trader", "Wealth Builder"],
    status: "completed" as const,
    totalAmount: 18750,
    cpaRate: 1450,
    crgRate: 15,
    grossLeads: 380,
    deductions: 8,
    invalidRate: 2.1,
    netLeads: 372,
    ftds: 52,
    crRate: 14.0,
    invalidDeductRate: 2.1,
    ftdCost: 75400,
    crgCost: 11310,
    totalCost: 86710
  },
  {
    partner: "LeadKing",
    geo: "ES",
    dates: "Nov 15-21, 2024",
    funnels: ["Crypto Starter", "Trading Pro"],
    status: "overdue" as const,
    totalAmount: 8900,
    cpaRate: 1200,
    crgRate: 13,
    grossLeads: 280,
    deductions: 15,
    invalidRate: 5.4,
    netLeads: 265,
    ftds: 28,
    crRate: 10.6,
    invalidDeductRate: 5.4,
    ftdCost: 33600,
    crgCost: 4368,
    totalCost: 37968
  }
];

export default function FinancePage() {
  // Group deals by partner
  const groupedDeals = mockDeals.reduce((acc, deal) => {
    if (!acc[deal.partner]) {
      acc[deal.partner] = [];
    }
    acc[deal.partner].push(deal);
    return acc;
  }, {} as Record<string, typeof mockDeals>);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-semibold text-gray-900">Weekly Finance</h1>
        <div className="flex gap-2">
          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
            <Filter className="h-5 w-5" />
          </button>
          <button className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-1">
            <Plus className="h-5 w-5" />
            <span>New Report</span>
          </button>
        </div>
      </div>

      {/* Finance List */}
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        {Object.entries(groupedDeals).map(([partner, deals]) => (
          <FinanceCard key={partner} deals={deals} />
        ))}
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
