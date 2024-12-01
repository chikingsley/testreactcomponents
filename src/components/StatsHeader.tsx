import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  icon: React.ReactElement<LucideIcon>;
}

interface StatsHeaderProps {
  stats: StatItem[];
}

const StatsHeader = ({ stats }: StatsHeaderProps) => (
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

export default StatsHeader;
