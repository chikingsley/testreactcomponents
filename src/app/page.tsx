'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/offers" 
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-medium text-gray-900">Offers</h2>
            <p className="text-gray-600 mt-1">Manage and track offers</p>
          </Link>

          <Link 
            href="/deals" 
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-medium text-gray-900">Deals</h2>
            <p className="text-gray-600 mt-1">Active and pending deals</p>
          </Link>

          <Link 
            href="/leads" 
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-medium text-gray-900">Leads</h2>
            <p className="text-gray-600 mt-1">Track and manage leads</p>
          </Link>

          <Link 
            href="/finance" 
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-medium text-gray-900">Finance</h2>
            <p className="text-gray-600 mt-1">Financial reports and metrics</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
