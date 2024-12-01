'use client';

import { OfferCard } from '@/components/OfferCard';
import { Plus, Filter } from 'lucide-react';

const mockOffers = [
  {
    partner: "TokoMedia",
    geo: "FR",
    language: "Native",
    sources: ["Facebook", "Taboola", "Google"],
    funnels: ["Crypto Zoo", "Immediate Mix", "Tencent Winners"],
    status: "priority" as const,
    network: {
      cpa: "1300",
      crg: "14",
      ppl: "10",
      pplPercent: "6"
    },
    brand: {
      cpa: "1400",
      crg: "16",
      ppl: "10",
      pplPercent: "6"
    },
    conversionRate: 12.5,
    activeDeals: 3,
    monthlyVolume: "2.4k"
  },
  {
    partner: "SuperAffiliate",
    geo: "DE",
    language: "German",
    sources: ["Meta", "TikTok", "Display"],
    funnels: ["Premium Trader", "Wealth Builder"],
    status: "tested" as const,
    network: {
      cpa: "1450",
      crg: "15",
      ppl: "12",
      pplPercent: "7"
    },
    brand: {
      cpa: "1550",
      crg: "17",
      ppl: "12",
      pplPercent: "7"
    },
    conversionRate: 14.2,
    activeDeals: 2,
    monthlyVolume: "1.8k"
  },
  {
    partner: "LeadKing",
    geo: "ES",
    language: "Spanish",
    sources: ["Google", "Native", "Push"],
    funnels: ["Crypto Starter", "Trading Pro"],
    status: "inactive" as const,
    network: {
      cpa: "1200",
      crg: "13",
      ppl: "9",
      pplPercent: "5"
    },
    brand: {
      cpa: "1300",
      crg: "15",
      ppl: "9",
      pplPercent: "5"
    },
    conversionRate: 8.7,
    activeDeals: 0,
    monthlyVolume: "900"
  }
];

export default function OffersPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-semibold">Active Offers</h1>
        <div className="flex gap-2">
          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
            <Filter className="h-5 w-5" />
          </button>
          <button className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-1">
            <Plus className="h-5 w-5" />
            <span>New Offer</span>
          </button>
        </div>
      </div>

      {/* Offer List */}
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        {mockOffers.map((offer, index) => (
          <OfferCard key={index} offer={offer} />
        ))}
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
