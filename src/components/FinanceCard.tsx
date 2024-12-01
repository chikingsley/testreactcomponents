import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

interface DealProps {
  partner: string;
  geo: string;
  dates: string;
  funnels: string[];
  status: 'completed' | 'pending' | 'overdue';
  totalAmount: number;
  cpaRate: number;
  crgRate: number;
  grossLeads: number;
  deductions: number;
  invalidRate: number;
  netLeads: number;
  ftds: number;
  crRate: number;
  invalidDeductRate: number;
  ftdCost: number;
  crgCost: number;
  totalCost: number;
  profit: number;
  profitPercent: number;
}

interface GroupedDealsProps {
  partner: string;
  deals: DealProps[];
  totalAmount: number;
  totalCost: number;
  totalLeads: number;
  totalFTDs: number;
  avgCR: number;
}

const StatusPill = ({ status, onStatusChange }: { 
  status: 'Open' | 'Closed'; 
  onStatusChange: (newStatus: 'Open' | 'Closed') => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'Open': return 'bg-green-100 text-green-700';
      case 'Closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStatusClick = (newStatus: 'Open' | 'Closed') => {
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
        className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(status)}`}
      >
        {status}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10 py-1">
          {['Open', 'Closed'].map((s) => (
            <button
              key={s}
              onClick={(e) => {
                e.stopPropagation();
                handleStatusClick(s as 'Open' | 'Closed');
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

const formatNumber = (num: number | undefined) => {
  return num?.toLocaleString() ?? '0';
};

export const FinanceCard = ({ deals }: { deals: DealProps[] }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<'Open' | 'Closed'>('Open');
  const partner = deals[0]?.partner ?? '';
  
  // Calculate group totals
  const groupTotals = {
    totalAmount: deals.reduce((sum, deal) => sum + (deal.totalAmount ?? 0), 0),
    totalCost: deals.reduce((sum, deal) => sum + (deal.totalCost ?? 0), 0),
    totalLeads: deals.reduce((sum, deal) => sum + (deal.grossLeads ?? 0), 0),
    totalFTDs: deals.reduce((sum, deal) => sum + (deal.ftds ?? 0), 0),
    avgCR: deals.length > 0 ? deals.reduce((sum, deal) => sum + (deal.crRate ?? 0), 0) / deals.length : 0
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div 
        className="p-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{partner}</h3>
              <p className="text-sm text-gray-600 mt-1">{deals.length} Active Deals</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill status={currentStatus} onStatusChange={setCurrentStatus} />
              <span className="font-medium text-gray-900">€{formatNumber(groupTotals.totalAmount)}</span>
              {expanded ? 
                <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                <ChevronDown className="h-5 w-5 text-gray-400" />
              }
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total Cost</span>
              <p className="font-medium text-gray-900">€{formatNumber(groupTotals.totalCost)}</p>
            </div>
            <div>
              <span className="text-gray-600">Total Leads</span>
              <p className="font-medium text-gray-900">{formatNumber(groupTotals.totalLeads)}</p>
            </div>
            <div>
              <span className="text-gray-600">Total FTDs</span>
              <p className="font-medium text-gray-900">{formatNumber(groupTotals.totalFTDs)}</p>
            </div>
            <div>
              <span className="text-gray-600">Avg CR</span>
              <p className="font-medium text-gray-900">{groupTotals.avgCR.toFixed(1)}%</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              Add Deduction
            </button>
            <button className="flex-1 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              Add Payment
            </button>
            <button className="flex-1 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              PDF Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Individual Deals */}
      {expanded && deals.map((deal, index) => (
        <div key={index} className="border-t">
          <div className="p-3">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900">{deal.geo}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{deal.dates}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{deal.funnels.join(', ')}</p>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                deal.status === 'completed' ? 'bg-green-100 text-green-700' :
                deal.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              } capitalize`}>
                {deal.status}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Gross Leads</p>
                <p className="font-medium text-gray-900">{formatNumber(deal.grossLeads)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Invalids</p>
                <p className="font-medium text-gray-900">{formatNumber(deal.deductions)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Invalid %</p>
                <p className="font-medium text-gray-900">{deal.invalidRate ?? 0}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Net Leads</p>
                <p className="font-medium text-gray-900">{formatNumber(deal.netLeads)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">FTDs</p>
                <p className="font-medium text-gray-900">{formatNumber(deal.ftds)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">CR Rate</p>
                <p className="font-medium text-gray-900">{deal.crRate ?? 0}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">FTD Cost</p>
                <p className="font-medium text-gray-900">€{formatNumber(deal.ftdCost)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">CRG Cost</p>
                <p className="font-medium text-gray-900">€{formatNumber(deal.crgCost)}</p>
              </div>
            </div>

            <div className="mt-4 p-3 border rounded-lg bg-gray-50">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-gray-600 text-sm">Total Cost</span>
                  <p className="font-semibold text-gray-900">€{formatNumber(deal.totalCost)}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Profit</span>
                  <p className="font-semibold text-gray-900">€{formatNumber(deal.profit)}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Profit %</span>
                  <p className="font-semibold text-gray-900">{deal.profitPercent ?? 0}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
