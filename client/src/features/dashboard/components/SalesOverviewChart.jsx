import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { TrendingUp, Calendar, Info } from 'lucide-react';

export function SalesOverviewChart({ data = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!data || data.length === 0) {
    return (
      <Card className="h-full flex flex-col justify-center items-center p-8 text-center text-[#5A6F63]">
        <Info className="w-8 h-8 text-[#B6CCA1] mb-2" />
        <p className="text-sm font-semibold text-[#183B32]">No Sales Data Available</p>
        <p className="text-xs">Weekly sales records could not be loaded.</p>
      </Card>
    );
  }

  // Calculate metrics
  const rawMax = Math.max(...data.map((d) => d.sales));
  // Round up to nearest thousand for clean Y-axis ticks
  const yMax = Math.ceil(rawMax / 1000) * 1000 + 1000;
  const totalSales = data.reduce((acc, curr) => acc + curr.sales, 0);
  const avgDaily = Math.round(totalSales / data.length);
  const peakItem = data.reduce((max, curr) => (curr.sales > max.sales ? curr : max), data[0]);

  // SVG Chart geometry
  const svgWidth = 640;
  const svgHeight = 240;
  const paddingLeft = 55;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 40;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  const colWidth = chartWidth / data.length;
  const barWidth = 32;

  // 4 Y-axis ticks (e.g., 0, 2k, 4k, 6k, 8k)
  const yTicks = [
    0,
    Math.round(yMax * 0.33),
    Math.round(yMax * 0.66),
    yMax,
  ];

  const hoveredItem = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="Weekly Sales Overview"
        subtitle="7-day POS revenue and prescription volume (Sample Data)"
        action={
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7FAF5] border border-[#E2EBDD] text-xs font-medium text-[#183B32]">
            <Calendar className="w-3.5 h-3.5 text-[#5A6F63]" />
            <span>Past 7 Days</span>
          </div>
        }
      />

      <CardContent className="flex-1 flex flex-col justify-between p-5">
        {/* Summary Metrics Row */}
        <div className="grid grid-cols-3 gap-3 mb-4 p-3 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
          <div>
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">7-Day Total</p>
            <p className="text-base sm:text-lg font-bold text-[#183B32] mt-0.5">
              ${totalSales.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Daily Average</p>
            <p className="text-base sm:text-lg font-bold text-[#183B32] mt-0.5">
              ${avgDaily.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Peak Revenue</p>
            <p className="text-base sm:text-lg font-bold text-[#183B32] mt-0.5">
              ${peakItem.sales.toLocaleString()} <span className="text-xs font-normal text-[#5A6F63]">({peakItem.day})</span>
            </p>
          </div>
        </div>

        {/* Interactive Floating Tooltip */}
        <div className="h-10 mb-1 flex items-center justify-between px-2">
          {hoveredItem ? (
            <div className="flex flex-wrap items-center gap-3 text-xs bg-[#183B32] text-white px-3 py-1.5 rounded-lg shadow-sm animate-in fade-in duration-150">
              <span className="font-bold text-[#D7FCD4]">{hoveredItem.day} ({hoveredItem.date || 'Current'})</span>
              <span>•</span>
              <span>Revenue: <strong>${hoveredItem.sales.toLocaleString()}</strong></span>
              <span>•</span>
              <span>Orders: <strong>{hoveredItem.transactions} rx</strong></span>
              {hoveredItem.avgOrder && (
                <>
                  <span>•</span>
                  <span>Avg Ticket: <strong>${Number(hoveredItem.avgOrder).toFixed(2)}</strong></span>
                </>
              )}
            </div>
          ) : (
            <p className="text-xs text-[#5A6F63] italic">
              Hover over any daily bar to view itemized sales and prescription metrics.
            </p>
          )}
        </div>

        {/* Responsive SVG Chart */}
        <div className="w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto max-h-[260px] select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Horizontal Gridlines & Y-Axis Labels */}
            {yTicks.map((val) => {
              const y = paddingTop + chartHeight - (val / yMax) * chartHeight;
              return (
                <g key={val}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={svgWidth - paddingRight}
                    y2={y}
                    stroke="#E2EBDD"
                    strokeDasharray={val === 0 ? 'none' : '3 3'}
                    strokeWidth={val === 0 ? '1.5' : '1'}
                  />
                  <text
                    x={paddingLeft - 8}
                    y={y + 4}
                    textAnchor="end"
                    fill="#5A6F63"
                    fontSize="11"
                    fontFamily="system-ui, sans-serif"
                    fontWeight="500"
                  >
                    ${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                  </text>
                </g>
              );
            })}

            {/* Daily Bars & X-Axis Labels */}
            {data.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              const isToday = idx === data.length - 1; // Last day is Sunday / Today

              const barHeight = Math.max((item.sales / yMax) * chartHeight, 4);
              const xCenter = paddingLeft + idx * colWidth + colWidth / 2;
              const barX = xCenter - barWidth / 2;
              const barY = paddingTop + chartHeight - barHeight;

              return (
                <g
                  key={item.day}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Subtle column hover background */}
                  <rect
                    x={paddingLeft + idx * colWidth + 4}
                    y={paddingTop}
                    width={colWidth - 8}
                    height={chartHeight}
                    fill={isHovered ? '#EEF6EC' : 'transparent'}
                    rx="6"
                    className="transition-colors duration-150"
                  />

                  {/* Top value label on bar */}
                  <text
                    x={xCenter}
                    y={barY - 6}
                    textAnchor="middle"
                    fill={isToday ? '#183B32' : isHovered ? '#183B32' : '#5A6F63'}
                    fontSize="10"
                    fontWeight={isToday || isHovered ? '700' : '500'}
                  >
                    ${(item.sales / 1000).toFixed(1)}k
                  </text>

                  {/* The Daily Bar */}
                  <rect
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    rx="5"
                    fill={
                      isToday
                        ? '#183B32'
                        : isHovered
                        ? '#235246'
                        : '#B6CCA1'
                    }
                    className="transition-all duration-200"
                  />

                  {/* Today top accent indicator */}
                  {isToday && (
                    <circle
                      cx={xCenter}
                      cy={barY + 6}
                      r="2.5"
                      fill="#D7FCD4"
                    />
                  )}

                  {/* X-Axis Day Label */}
                  <text
                    x={xCenter}
                    y={svgHeight - paddingBottom + 16}
                    textAnchor="middle"
                    fill={isToday ? '#183B32' : '#34423A'}
                    fontSize="12"
                    fontWeight={isToday ? '700' : '600'}
                  >
                    {item.day}
                  </text>

                  {/* Transaction count sub-label */}
                  <text
                    x={xCenter}
                    y={svgHeight - paddingBottom + 29}
                    textAnchor="middle"
                    fill="#5A6F63"
                    fontSize="10"
                  >
                    {item.transactions} rx
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-[#E2EBDD] text-xs text-[#5A6F63]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#B6CCA1]" />
            <span>Past Daily Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#183B32]" />
            <span className="font-semibold text-[#183B32]">Today's Recorded Sales</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
