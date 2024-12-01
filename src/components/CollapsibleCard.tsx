import React from 'react';

interface CollapsibleCardProps {
  children: React.ReactNode;
  header: React.ReactNode;
  stats: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
}

const CollapsibleCard = ({ children, header, stats, expanded, onToggle }: CollapsibleCardProps) => (
  <div className="bg-white rounded-lg shadow-sm">
    <div className="p-3 cursor-pointer" onClick={onToggle}>
      {header}
      {stats}
    </div>
    {expanded && children}
  </div>
);

export default CollapsibleCard;
