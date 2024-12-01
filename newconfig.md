Things you need to do:

For the Offers View:

Restructured the header to show Partner - GEO - Language
Added source bubbles using a clean badge design
Added Funnels section directly under the header
Reformatted the pricing section to show Network/Brand with CPA+CRG format and PPL/PPL% in pills
Updated the status indicator with different colors for Priority/Inactive/Tested

For the Finance View:

Created expandable deal rows that show weekly rollups
Added detailed metrics in a 5-column grid layout
Included all the specified fields:

First row: GEO, CPA Rate, CRG Rate, Gross Leads, Deductions
Second row: Invalid Rate, Net Leads, FTDs, CR Rate, Invalid Deduct


Added the cost breakdown section with FTD Cost, CRG Cost, and Total Cost

see below for breakdown code

import React, { useState } from 'react';
import { Plus, Filter, AlertCircle, ChevronDown, ChevronUp, DollarSign, Clock, Users, Share2, Calendar, Globe, Check, XCircle } from 'lucide-react';

// Source Badge Component
const SourceBadge = ({ source }) => (
  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">
    {source}
  </span>
);

// PPL Badge Component
const PplBadge = ({ ppl, pplPercent }) => (
  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full ml-2">
    ${ppl}/{pplPercent}%
  </span>
);

// Offer Card Component
const OfferCard = ({ offer }) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'priority': return 'bg-purple-500';
      case 'inactive': return 'bg-red-500';
      case 'tested': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const header = (
    <div className="flex items-center gap-3">
      <div className={`w-2 h-12 rounded-full ${getStatusColor(offer.status)}`} />
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900">{offer.partner}</h3>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{offer.geo}</span>
              {offer.language && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{offer.language}</span>
                </>
              )}
            </div>
            <div className="flex gap-1 mt-1 flex-wrap">
              {offer.sources.map((source, idx) => (
                <SourceBadge key={idx} source={source} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {offer.status === 'priority' && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                Priority
              </span>
            )}
            {expanded ? 
              <ChevronUp className="h-5 w-5 text-gray-400" /> : 
              <ChevronDown className="h-5 w-5 text-gray-400" />
            }
          </div>
        </div>
        
        <div className="mt-2 text-sm">
          <p className="text-gray-700">Funnels: {offer.funnels.join(', ')}</p>
        </div>
      </div>
    </div>
  );

  const stats = (
    <div className="flex flex-col gap-2 mt-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Network: {offer.network.cpa}+{offer.network.crg}%</span>
        <PplBadge ppl={offer.network.ppl} pplPercent={offer.network.pplPercent} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Brand: {offer.brand.cpa}+{offer.brand.crg}%</span>
        <PplBadge ppl={offer.brand.ppl} pplPercent={offer.brand.pplPercent} />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        {header}
        {stats}
      </div>
      
      {expanded && (
        <>
          <div className="px-4 py-3 border-t grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500">Conversion Rate</p>
              <p className="font-medium">{offer.conversionRate}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Deals</p>
              <p className="font-medium">{offer.activeDeals}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Monthly Volume</p>
              <p className="font-medium">{offer.monthlyVolume}</p>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-b-lg flex gap-2">
            <button className="flex-1 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              Create Deal
            </button>
            <button className="flex-1 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              Share Offer
            </button>
            <button className="flex-1 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Finance Deal Row Component
const FinanceDealRow = ({ deal }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div 
        className="p-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-2 h-12 rounded-full ${
            deal.status === 'completed' ? 'bg-green-500' :
            deal.status === 'overdue' ? 'bg-red-500' : 'bg-yellow-500'
          }`} />
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">
                  {deal.partner} • {deal.geo} • {deal.dates}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {deal.funnels.join(', ')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">€{deal.totalAmount.toLocaleString()}</span>
                {expanded ? 
                  <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <>
          <div className="px-4 py-3 border-t">
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">GEO</p>
                <p className="font-medium">{deal.geo}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">CPA Rate</p>
                <p className="font-medium">${deal.cpaRate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">CRG Rate</p>
                <p className="font-medium">{deal.crgRate}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Gross Leads</p>
                <p className="font-medium">{deal.grossLeads}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Deductions</p>
                <p className="font-medium">{deal.deductions}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-4">
              <div>
                <p className="text-xs text-gray-500">Invalid Rate</p>
                <p className="font-medium">{deal.invalidRate}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Net Leads</p>
                <p className="font-medium">{deal.netLeads}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">FTDs</p>
                <p className="font-medium">{deal.ftds}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">CR Rate</p>
                <p className="font-medium">{deal.crRate}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Invalid Deduct</p>
                <p className="font-medium">{deal.invalidDeductRate}%</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">FTD Cost</span>
              <span className="text-gray-900">${deal.ftdCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">CRG Cost</span>
              <span className="text-gray-900">${deal.crgCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-600">Total Cost</span>
              <span className="text-gray-900">${deal.totalCost.toLocaleString()}</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-b-lg flex gap-2">
            <button className="flex-1 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              Download Report
            </button>
            <button className="flex-1 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              View Details
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Example Views
const OffersView = () => {
  const offers = [
    {
      partner: "TokoMedia",
      geo: "FR",
      language: "Native",
      sources: ["Facebook", "Taboola", "Google"],
      funnels: ["Crypto Zoo", "Immediate Mix", "Tencent Winners"],
      status: "priority",
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
    // Add more mock offers...
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="p-4 space-y-3">
        {offers.map((offer, index) => (
          <OfferCard key={index} offer={offer} />
        ))}
      </div>
    </div>
  );
};

const FinanceView = () => {
  const deals = [
    {
      partner: "TokoMedia",
      geo: "FR",
      dates: "Nov 15-21, 2024",
      funnels: ["Crypto Zoo", "Immediate Mix"],
      status: "pending",
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
    // Add more mock deals...
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="p-4 space-y-3">
        {deals.map((deal, index) => (
          <FinanceDealRow key={index} deal={deal} />
        ))}
      </div>
    </div>
  );
};

export { OffersView, FinanceView };