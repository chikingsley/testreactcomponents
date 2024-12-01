import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

interface DealProps {
  partner: string;
  geo: string;
  language?: string;
  sources: string[];
  funnels: string[];
  status: 'Not Approved' | 'Extend' | 'Negotiating' | 'Prepay' | 'Confirmed';
  price: {
    cpa: string;
    crg: string;
  } | {
    cpl: string;
  };
  timeStatus: 'upcoming' | 'active' | 'completed';
  timeRemaining: string;
  conversionRate: number;
  leadsReceived: number;
  leadsRequested: number;
  deposits: number;
  invalids: number;
  workingHours: string;
  startDate: string;
  endDate: string;
  needsAttention: boolean;
  ftds: number;
  cr: number;
}

const StatusPill = ({ status, onStatusChange }: { 
  status: string; 
  onStatusChange: (newStatus: DealProps['status']) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Prepay': return 'bg-purple-100 text-purple-700';
      case 'Extend':
      case 'Negotiating': return 'bg-yellow-100 text-yellow-700';
      case 'Not Approved': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const allStatuses: DealProps['status'][] = [
    'Confirmed',
    'Prepay',
    'Extend',
    'Negotiating',
    'Not Approved'
  ];

  const handleStatusClick = (newStatus: DealProps['status']) => {
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
        className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(status)}`}
      >
        {status}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1">
          {allStatuses.map((s) => (
            <button
              key={s}
              onClick={(e) => {
                e.stopPropagation();
                handleStatusClick(s);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${
                status === s ? 'text-blue-600' : 'text-gray-600'
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

const TimeStatusRow = ({ 
  timeStatus, 
  timeRemaining,
  workingHours 
}: { 
  timeStatus: DealProps['timeStatus'];
  timeRemaining: string;
  workingHours: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-sm text-gray-700">
        <span>Working Hours: {workingHours}</span>
      </div>
      <span className={`
        text-sm
        ${timeStatus === 'upcoming' ? 'text-yellow-600' :
          timeStatus === 'active' ? 'text-green-600' :
          'text-gray-600'
        }
      `}>
        {timeStatus === 'upcoming' && `Starts in ${timeRemaining}`}
        {timeStatus === 'active' && `${timeRemaining} left`}
        {timeStatus === 'completed' && 'Completed'}
      </span>
    </div>
  );
};

export const DealCard = ({ deal }: { deal: DealProps }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(deal.status);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <h3 className="font-medium text-gray-900 flex-shrink-0">{deal.partner}</h3>
                <span className="text-gray-500 flex-shrink-0">•</span>
                <div className="flex items-center gap-2 min-w-0 truncate">
                  <span className="text-gray-600 truncate">{deal.geo}</span>
                  {deal.language && (
                    <>
                      <span className="text-gray-500 flex-shrink-0">•</span>
                      <span className="text-gray-600 truncate">{deal.language}</span>
                    </>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-2.5 truncate">Sources: {deal.sources.join(', ')}</p>
              <p className="text-sm text-gray-700 mt-2.5 truncate">Funnels: {deal.funnels.join(', ')}</p>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <StatusPill status={currentStatus} onStatusChange={setCurrentStatus} />
              <span className="text-sm font-medium text-gray-900 text-center">
                {deal.leadsReceived}/{deal.leadsRequested} Leads
              </span>
            </div>
          </div>

          <div className="mt-2.5">
            <TimeStatusRow 
              timeStatus={deal.timeStatus}
              timeRemaining={deal.timeRemaining}
              workingHours={deal.workingHours}
            />
          </div>
        </div>
      </div>

      {expanded && (
        <>
          <div className="mt-4 pt-4 border-t grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Price</p>
              <p className="font-medium text-gray-900">
                {'cpl' in deal.price 
                  ? `${deal.price.cpl} CPL`
                  : `€${deal.price.cpa}+${deal.price.crg}`
                }
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">FTDs</p>
              <p className="font-medium text-gray-900">{deal.ftds}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Invalids</p>
              <p className="font-medium text-gray-900">{deal.invalids}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">CR</p>
              <p className="font-medium text-gray-900">{deal.cr}%</p>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 rounded-lg flex gap-2 p-3">
            <button className="flex-1 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              Call Statuses
            </button>
            <button className="flex-1 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              Extend Deal
            </button>
            <button className="flex-1 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
              Message
            </button>
          </div>
        </>
      )}
    </div>
  );
};
