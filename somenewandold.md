import React, { useState } from 'react';
import { Plus, Filter, AlertCircle, ChevronDown, ChevronUp, DollarSign, Clock, Users, Share2, Calendar, Percent } from 'lucide-react';

// Common Card Base Component
const CollapsibleCard = ({ children, header, stats, expanded, onToggle }) => (
  <div className="bg-white rounded-lg shadow-sm">
    <div className="p-3 cursor-pointer" onClick={onToggle}>
      {header}
      {stats}
    </div>
    {expanded && children}
  </div>
);

// Offer Card Component
const OfferCard = ({ offer }) => {
  const [expanded, setExpanded] = useState(false);
  
  const pplPercent = ((offer.networkPrice - offer.buyingPrice) / offer.networkPrice * 100).toFixed(1);

  const header = (
    <div className="flex items-center gap-3">
      <div className={`w-2 h-12 rounded-full ${
        offer.isPriority ? 'bg-purple-500' :
        offer.isTested ? 'bg-green-500' : 'bg-blue-500'
      }`} />
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">{offer.funnel}</h3>
            <p className="text-sm text-gray-600">{offer.geo} • {offer.source}</p>
          </div>
          <div className="flex items-center gap-2">
            {offer.isPriority && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Priority</span>
            )}
            {expanded ? 
              <ChevronUp className="h-5 w-5 text-gray-400" /> : 
              <ChevronDown className="h-5 w-5 text-gray-400" />
            }
          </div>
        </div>
      </div>
    </div>
  );

  const stats = (
    <div className="flex gap-4 mt-2 text-sm">
      <span className="text-gray-600">PPL: {pplPercent}%</span>
      <span className="text-gray-600">Network: €{offer.networkPrice}</span>
      <span className="text-gray-600">Brand: €{offer.brandPrice}</span>
    </div>
  );

  return (
    <CollapsibleCard
      header={header}
      stats={stats}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
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
    </CollapsibleCard>
  );
};

// Finance Card Component
const FinanceCard = ({ finance }) => {
  const [expanded, setExpanded] = useState(false);

  const header = (
    <div className="flex items-center gap-3">
      <div className={`w-2 h-12 rounded-full ${
        finance.status === 'Pending' ? 'bg-yellow-500' :
        finance.status === 'Overdue' ? 'bg-red-500' : 'bg-green-500'
      }`} />
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">{finance.affiliate}</h3>
            <p className="text-sm text-gray-600">{finance.period}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">€{finance.totalAmount.toLocaleString()}</span>
            {expanded ? 
              <ChevronUp className="h-5 w-5 text-gray-400" /> : 
              <ChevronDown className="h-5 w-5 text-gray-400" />
            }
          </div>
        </div>
      </div>
    </div>
  );

  const stats = (
    <div className="flex gap-4 mt-2 text-sm">
      <span className="text-gray-600">Leads: {finance.totalLeads}</span>
      <span className="text-gray-600">Deposits: {finance.deposits}</span>
      <span className="text-gray-600">Invalid: {finance.invalids}</span>
    </div>
  );

  return (
    <CollapsibleCard
      header={header}
      stats={stats}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <div className="px-4 py-3 border-t grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-500">Prepayment</p>
          <p className="font-medium">€{finance.prepayment.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Balance</p>
          <p className="font-medium">€{finance.balance.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Due Date</p>
          <p className="font-medium">{finance.dueDate}</p>
        </div>
      </div>

      <div className="px-4 py-3 border-t space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Average PPL</span>
          <span className="text-gray-900">€{finance.averagePpl}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Profit Margin</span>
          <span className="text-gray-900">{finance.profitMargin}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Payment Terms</span>
          <span className="text-gray-900">{finance.paymentTerms}</span>
        </div>
      </div>

      <div className="p-3 bg-gray-50 rounded-b-lg flex gap-2">
        <button className="flex-1 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
          Mark Paid
        </button>
        <button className="flex-1 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
          Download Invoice
        </button>
        <button className="flex-1 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
          Details
        </button>
      </div>
    </CollapsibleCard>
  );
};

// Stats Header Component
const StatsHeader = ({ stats }) => (
  <div className="grid grid-cols-2 gap-3 p-4">
    {stats.map((stat, index) => (
      <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 text-gray-500 mb-1">
          {stat.icon}
          <span className="text-sm">{stat.label}</span>
        </div>
        <div className="text-xl font-semibold">{stat.value}</div>
      </div>
    ))}
  </div>
);

// Filter Bar Component
const FilterBar = ({ filters }) => (
  <div className="p-4 flex gap-2 overflow-x-auto">
    {filters.map((filter, index) => (
      <button
        key={index}
        className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
          filter.active
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        {filter.label}
      </button>
    ))}
  </div>
);

// Main View Components
const OffersView = () => {
  const offerStats = [
    { label: 'Active Offers', value: '24', icon: <Share2 className="h-4 w-4" /> },
    { label: 'Avg. PPL', value: '€32.50', icon: <DollarSign className="h-4 w-4" /> },
  ];

  const offerFilters = [
    { label: 'All Offers', active: true },
    { label: 'Priority', active: false },
    { label: 'Tested', active: false },
    { label: 'Active Deals', active: false },
  ];

  const offers = [
    {
      funnel: "Immediate FLEX",
      geo: "France",
      source: "Direct",
      networkPrice: 35,
      brandPrice: 40,
      buyingPrice: 28,
      isPriority: true,
      isTested: true,
      conversionRate: 12.5,
      activeDeals: 3,
      monthlyVolume: "2.4k"
    },
    // Add more mock offers...
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <StatsHeader stats={offerStats} />
      <FilterBar filters={offerFilters} />
      <div className="p-4 space-y-3">
        {offers.map((offer, index) => (
          <OfferCard key={index} offer={offer} />
        ))}
      </div>
    </div>
  );
};

const FinanceView = () => {
  const financeStats = [
    { label: 'Outstanding', value: '€45,280', icon: <DollarSign className="h-4 w-4" /> },
    { label: 'This Week', value: '€12,450', icon: <Calendar className="h-4 w-4" /> },
  ];

  const financeFilters = [
    { label: 'All', active: true },
    { label: 'Pending', active: false },
    { label: 'Overdue', active: false },
    { label: 'This Week', active: false },
  ];

  const finances = [
    {
      affiliate: "KyloMedia",
      period: "Nov 15-21, 2024",
      totalAmount: 12450,
      totalLeads: 450,
      deposits: 45,
      invalids: 12,
      status: "Pending",
      prepayment: 5000,
      balance: 7450,
      dueDate: "Nov 28",
      averagePpl: 27.67,
      profitMargin: 22.4,
      paymentTerms: "Net 7"
    },
    // Add more mock finance entries...
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <StatsHeader stats={financeStats} />
      <FilterBar filters={financeFilters} />
      <div className="p-4 space-y-3">
        {finances.map((finance, index) => (
          <FinanceCard key={index} finance={finance} />
        ))}
      </div>
    </div>
  );
};

export { OffersView, FinanceView };