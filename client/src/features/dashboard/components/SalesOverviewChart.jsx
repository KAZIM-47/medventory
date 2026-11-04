import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { TrendingUp, Calendar } from 'lucide-react';

export function SalesOverviewChart({ data }) {
  const [activeDay, setActiveDay] = useState(null);

  const maxSales = Math.max(...data.map((d) => d.sales));
  const totalSales = data.reduce((acc, curr) => acc + curr.sales, 0);
  const avgSales = Math.round(totalSales / data.length);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="Weekly Sales Overview"
        subtitle="Revenue and prescription volume over the past 7 days"
        action={
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7FAF5] border border-[#E2EBDD] text-xs text-[#183B32] font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#5A6F63]" />
            <span>Current Week</span>
          </div>
        }
      />

      <CardContent className="flex-1 flex flex-col justify-between pt-6">
        {/* Top Summary Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-3 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
          <div>
            <p className="text-[11px] font-medium text-[#5A6F63]">7-Day Total</p>
            <p className="text-base font-bold text-[#183B32]">
              ${totalSales.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#5A6F63]">Daily Average</p>
            <p className="text-base font-bold text-[#183B32]">
              ${avgSales.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#5A6F63]">Peak Revenue</p>
            <p className="text-base font-bold text-[#183B32]">
              ${maxSales.toLocaleString()} (Sat)
            </p>
          </div>
        </div>

        {/* Bar Visualization Container */}
        <div className="flex-1 min-h-[190px] flex items-end justify-between gap-3 sm:gap-6 pt-4 px-2">
          {data.map((item) => {
            const heightPercent = Math.round((item.sales / maxSales) * 100);
            const isHovered = activeDay === item.day;
            const isToday = item.day === 'Sun';

            return (
              <div
                key={item.day}
                className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                onMouseEnter={() => setActiveDay(item.day)}
                onMouseLeave={() => setActiveDay(null)}
              >
                {/* Value tooltip */}
                <div
                  className={`text-[11px] font-semibold py-0.5 px-1.5 rounded transition-all duration-150 ${
                    isHovered
                      ? 'bg-[#183B32] text-white shadow-sm'
                      : isToday
                      ? 'text-[#183B32] font-bold'
                      : 'text-[#5A6F63] opacity-0 group-hover:opacity-100'
                  }`}
                >
                  ${(item.sales / 1000).toFixed(1)}k
                </div>

                {/* Bar */}
                <div className="w-full max-w-[42px] bg-[#EEF6EC] rounded-t-lg h-36 flex items-end p-1 relative overflow-hidden">
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      isToday
                        ? 'bg-[#183B32]'
                        : isHovered
                        ? 'bg-[#235246]'
                        : 'bg-[#B6CCA1]'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Day Label */}
                <span
                  className={`text-xs font-semibold ${
                    isToday ? 'text-[#183B32] underline decoration-2 underline-offset-4' : 'text-[#5A6F63]'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Chart Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-[#E2EBDD] text-xs text-[#5A6F63]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#B6CCA1]" />
            <span>Past Daily Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#183B32]" />
            <span className="font-semibold text-[#183B32]">Current Day (Today)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

