import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Pill, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

const ICON_MAP = {
  Pill,
  DollarSign,
  TrendingUp,
  AlertTriangle,
};

export function StatCard({ stat }) {
  const Icon = ICON_MAP[stat.icon] || Pill;

  const isWarning = stat.changeType === 'warning';

  return (
    <Card className="hover:border-[#C7E4BB] transition-colors">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-[#5A6F63] uppercase tracking-wider">
              {stat.title}
            </p>
            <h3 className="text-2xl font-bold text-[#183B32] mt-1.5 tracking-tight">
              {stat.value}
            </h3>
          </div>
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
              isWarning
                ? 'bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]'
                : 'bg-[#D7FCD4] text-[#183B32] border-[#B6CCA1]'
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E2EBDD] flex items-center justify-between text-xs">
          <span
            className={`font-semibold ${
              isWarning ? 'text-[#78350F]' : 'text-[#183B32]'
            }`}
          >
            {stat.change}
          </span>
          <span className="text-[#5A6F63]">{stat.subtext}</span>
        </div>
      </CardContent>
    </Card>
  );
}

