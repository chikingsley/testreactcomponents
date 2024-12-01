'use client';

import React, { useState, useEffect } from 'react';

interface LeadProps {
  customer: string;
  geo: string;
  status: 'New' | 'Follow Up' | 'FTD' | 'Not Interested' | 'NA' | 'Invalid';
  partner: string;
  email: string;
  timeReceived: string;
  timeUpdated: string;
}

const StatusPill = ({ status }: { status: LeadProps['status'] }) => {
  const getStatusStyle = (s: string) => {
    switch (s) {
      case 'New': return 'bg-blue-100 text-blue-700 ring-1 ring-red-300';
      case 'Follow Up': return 'bg-yellow-100 text-yellow-700';
      case 'FTD': return 'bg-green-100 text-green-700';
      case 'Not Interested': return 'bg-red-50 text-red-700';
      case 'NA': return 'bg-red-50 text-red-700';
      case 'Invalid': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(status)}`}>
      {status}
    </span>
  );
};

const formatDate = (date: string) => {
  const d = new Date(date);
  const yy = d.getFullYear().toString().slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  
  return {
    date: `${yy}-${mm}-${dd}`,
    time: `${hh}:${min} UTC`
  };
};

const LiveTimer = ({ startTime }: { startTime: string }) => {
  const [elapsed, setElapsed] = useState('');

  useEffect(() => {
    const calculateElapsed = () => {
      const start = new Date(startTime).getTime();
      const now = new Date().getTime();
      const diff = now - start;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    setElapsed(calculateElapsed());
    const interval = setInterval(() => {
      setElapsed(calculateElapsed());
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return <span className="text-sm text-gray-900">{elapsed}</span>;
};

export const LeadsCard = ({ lead }: { lead: LeadProps }) => {
  const receivedTime = formatDate(lead.timeReceived);
  const updatedTime = formatDate(lead.timeUpdated);

  return (
    <div className="bg-white rounded-lg shadow-sm p-3">
      {/* Row 1: Customer / Geo / Status */}
      <div className="flex justify-between items-stretch h-8">
        <div className="flex items-end gap-2">
          <h3 className="font-medium text-gray-900">{lead.customer}</h3>
          <span className="text-gray-500">•</span>
          <span className="text-gray-600">{lead.geo}</span>
        </div>
        <div className="flex items-start">
          <StatusPill status={lead.status} />
        </div>
      </div>

      {/* Row 2: Partner / Email */}
      <div className="mt-2 flex justify-between items-center">
        <span className="text-sm text-gray-700">{lead.partner}</span>
        <span className="text-sm text-gray-600">{lead.email}</span>
      </div>

      {/* Row 3: Time Card */}
      <div className="mt-2 bg-gray-50 rounded-lg p-2">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-gray-500">Received</div>
            <div className="text-sm text-gray-900">{receivedTime.date}</div>
            <div className="text-sm text-gray-600">{receivedTime.time}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Timer</div>
            <LiveTimer startTime={lead.timeReceived} />
          </div>
          <div>
            <div className="text-xs text-gray-500">Updated</div>
            <div className="text-sm text-gray-900">{updatedTime.date}</div>
            <div className="text-sm text-gray-600">{updatedTime.time}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
