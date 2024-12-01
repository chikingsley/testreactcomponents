'use client';

import { DealCard } from '@/components/DealCard';
import { Plus, Filter } from 'lucide-react';

const mockDeals = [
  {
    partner: "KyloMedia",
    geo: "FR",
    language: "Native",
    sources: ["Facebook", "Taboola", "Google"],
    funnels: ["Immediate FLEX", "Crypto Zoo"],
    status: "Confirmed" as const,
    price: {
      cpa: "1300",
      crg: "14"
    },
    timeStatus: 'active' as const,
    timeRemaining: '2d 4h',
    conversionRate: 7.7,
    leadsRequested: 200,
    leadsReceived: 156,
    deposits: 12,
    invalids: 3,
    workingHours: "09:00-18:00 CET",
    startDate: "2024-11-19",
    endDate: "2024-11-25",
    needsAttention: true
  },
  {
    partner: "InternalSuper",
    geo: "DE",
    language: "German",
    sources: ["Meta", "Native"],
    funnels: ["Premium Trader", "Wealth Builder"],
    status: "Pending Extension" as const,
    price: {
      cpl: "32.00"
    },
    timeStatus: 'active' as const,
    timeRemaining: '5d 12h',
    conversionRate: 12.7,
    leadsRequested: 150,
    leadsReceived: 142,
    deposits: 18,
    invalids: 2,
    workingHours: "08:00-17:00 CET",
    startDate: "2024-11-18",
    endDate: "2024-11-24",
    needsAttention: false
  },
  {
    partner: "SuperAffiliate",
    geo: "ES",
    language: "Spanish",
    sources: ["TikTok", "Push"],
    funnels: ["Crypto Starter"],
    status: "Prepay Pending" as const,
    price: {
      cpa: "1200",
      crg: "13"
    },
    timeStatus: 'upcoming' as const,
    timeRemaining: '1d 8h',
    conversionRate: 10.1,
    leadsRequested: 175,
    leadsReceived: 89,
    deposits: 9,
    invalids: 1,
    workingHours: "10:00-19:00 CET",
    startDate: "2024-11-20",
    endDate: "2024-11-26",
    needsAttention: false
  },
  {
    partner: "LeadKing",
    geo: "IT",
    language: "Italian",
    sources: ["Display", "Native"],
    funnels: ["Trading Pro"],
    status: "Not Approved" as const,
    price: {
      cpl: "29.00"
    },
    timeStatus: 'completed' as const,
    timeRemaining: '',
    conversionRate: 12.0,
    leadsRequested: 125,
    leadsReceived: 125,
    deposits: 15,
    invalids: 4,
    workingHours: "09:00-18:00 CET",
    startDate: "2024-11-12",
    endDate: "2024-11-18",
    needsAttention: false
  }
];

export default function DealsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-semibold text-gray-900">Active Deals</h1>
        <div className="flex gap-2">
          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
            <Filter className="h-5 w-5" />
          </button>
          <button className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-1">
            <Plus className="h-5 w-5" />
            <span>New Deal</span>
          </button>
        </div>
      </div>

      {/* Deal List */}
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        {mockDeals.map((deal, index) => (
          <DealCard key={index} deal={deal} />
        ))}
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
