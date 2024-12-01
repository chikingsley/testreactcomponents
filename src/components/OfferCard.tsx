import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

interface OfferProps {
  partner: string;
  geo: string;
  language?: string;
  sources: string[];
  funnels: string[];
  status: 'priority' | 'inactive' | 'tested';
  network: {
    cpa: string;
    crg: string;
    ppl: string;
    pplPercent: string;
  };
  brand: {
    cpa: string;
    crg: string;
    ppl: string;
    pplPercent: string;
  };
  conversionRate: number;
  activeDeals: number;
  monthlyVolume: string;
}

const StatusPill = ({ status, onStatusChange }: { 
  status: string; 
  onStatusChange: (newStatus: 'priority' | 'inactive' | 'tested') => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'priority': return 'bg-purple-100 text-purple-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'tested': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStatusClick = (newStatus: 'priority' | 'inactive' | 'tested') => {
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(status)} capitalize`}
      >
        {status}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10 py-1">
          {['priority', 'inactive', 'tested'].map((s) => (
            <button
              key={s}
              onClick={(e) => {
                e.stopPropagation();
                handleStatusClick(s as 'priority' | 'inactive' | 'tested');
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${
                status === s ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              {s}
              {status === s && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const PricingRows = ({ network, brand }: { 
  network: OfferProps['network'];
  brand: OfferProps['brand'];
}) => {
  const handleNetworkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Network: CPA €${network.cpa} + ${network.crg}% CRG | PPL €${network.ppl}/${network.pplPercent}%`;
    navigator.clipboard.writeText(text);
  };

  const handleBrandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Brand: CPA €${brand.cpa} + ${brand.crg}% CRG | PPL €${brand.ppl}/${brand.pplPercent}%`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col gap-2">
      <button 
        onClick={handleNetworkClick}
        className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-gray-50 cursor-pointer group border"
      >
        <span className="text-gray-700 text-sm">Network</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-900 text-sm">€{network.cpa}+{network.crg}%</span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
            €{network.ppl}/{network.pplPercent}%
          </span>
        </div>
      </button>

      <button 
        onClick={handleBrandClick}
        className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-gray-50 cursor-pointer group border"
      >
        <span className="text-gray-700 text-sm">Brand</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-900 text-sm">€{brand.cpa}+{brand.crg}%</span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
            €{brand.ppl}/{brand.pplPercent}%
          </span>
        </div>
      </button>
    </div>
  );
};

export const OfferCard = ({ offer }: { offer: OfferProps }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(offer.status);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
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
              <p className="text-sm text-gray-700 mt-1">Sources: {offer.sources.join(', ')}</p>
            </div>
            <StatusPill status={currentStatus} onStatusChange={setCurrentStatus} />
          </div>
          
          <div className="mt-1 text-sm">
            <p className="text-gray-700">Funnels: {offer.funnels.join(', ')}</p>
          </div>

          <div className="mt-2">
            <PricingRows network={offer.network} brand={offer.brand} />
          </div>
        </div>
      </div>
      
      {expanded && (
        <>
          <div className="px-4 py-3 border-t grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Conversion Rate</p>
              <p className="font-medium text-gray-900">{offer.conversionRate}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Active Deals</p>
              <p className="font-medium text-gray-900">{offer.activeDeals}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Monthly Volume</p>
              <p className="font-medium text-gray-900">{offer.monthlyVolume}</p>
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
