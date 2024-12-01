'use client';

import { LeadsCard } from '@/components/LeadsCard';

const mockLeads = [
  {
    customer: 'Betsson',
    geo: 'UK',
    status: 'New' as const,
    partner: 'Partner A',
    email: 'contact@betsson.com',
    timeReceived: '2024-01-20T10:30:00',
    timeUpdated: '2024-01-20T10:30:00'
  },
  {
    customer: 'William Hill',
    geo: 'ES',
    status: 'Follow Up' as const,
    partner: 'Partner B',
    email: 'contact@williamhill.com',
    timeReceived: '2024-01-20T09:15:00',
    timeUpdated: '2024-01-20T10:20:00'
  },
  {
    customer: 'Bet365',
    geo: 'SG',
    status: 'FTD' as const,
    partner: 'Partner C',
    email: 'contact@bet365.com',
    timeReceived: '2024-01-20T08:45:00',
    timeUpdated: '2024-01-20T09:30:00'
  },
  {
    customer: 'Unibet',
    geo: 'DE',
    status: 'Not Interested' as const,
    partner: 'Partner D',
    email: 'contact@unibet.com',
    timeReceived: '2024-01-20T07:30:00',
    timeUpdated: '2024-01-20T08:15:00'
  },
  {
    customer: 'Pinnacle',
    geo: 'BR',
    status: 'NA' as const,
    partner: 'Partner E',
    email: 'contact@pinnacle.com',
    timeReceived: '2024-01-20T06:20:00',
    timeUpdated: '2024-01-20T07:45:00'
  },
  {
    customer: 'Ladbrokes',
    geo: 'FR',
    status: 'Invalid' as const,
    partner: 'Partner F',
    email: 'contact@ladbrokes.com',
    timeReceived: '2024-01-20T05:10:00',
    timeUpdated: '2024-01-20T06:30:00'
  }
];

export default function LeadsPage() {
  return (
    <main className="p-4 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
        <p className="text-sm text-gray-600 mt-1">Manage and track your leads</p>
      </div>

      <div className="space-y-4">
        {mockLeads.map((lead, index) => (
          <LeadsCard key={index} lead={lead} />
        ))}
      </div>
    </main>
  );
}
