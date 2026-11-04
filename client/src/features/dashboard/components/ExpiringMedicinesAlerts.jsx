import React from 'react';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

export function ExpiringMedicinesAlerts({ items = [] }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="Expiring Medicines"
        subtitle="Batch-level 60-day expiry surveillance (Sample Records)"
        action={
          <Link
            to="/inventory"
            className="text-xs font-semibold text-[#183B32] hover:underline"
          >
            Audit Batches
          </Link>
        }
      />

      <CardContent className="flex-1 p-0 divide-y divide-[#E2EBDD] overflow-hidden">
        {items.map((item) => {
          const isUrgent = item.status === 'urgent';

          return (
            <div
              key={item.id}
              className="p-4 hover:bg-[#F7FAF5] transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3 min-w-0"
            >
              <div className="flex-1 min-w-0 space-y-1.5">
                {/* Title & Expiry Tag */}
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-[#183B32] break-words">
                    {item.medicine}
                  </h4>
                  <Badge
                    variant={isUrgent ? 'danger' : 'warning'}
                    size="sm"
                    className="shrink-0"
                  >
                    Expires in {item.daysRemaining}d
                  </Badge>
                </div>

                {/* Batch Metadata (Responsive Wrap) */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#5A6F63]">
                  <span>
                    Batch: <strong className="text-[#34423A] font-semibold">{item.batchNo}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Affected: <strong className="text-[#34423A] font-semibold">{item.units} units</strong>
                  </span>
                  <span>•</span>
                  <span>Due: {item.expiryDate}</span>
                </div>

                {/* Protocol Note */}
                <p className="text-xs text-[#5A6F63] leading-relaxed break-words pt-0.5">
                  <strong className="text-[#183B32] font-semibold">Protocol:</strong>{' '}
                  {item.recommendedAction}
                </p>
              </div>

              {/* Action Button */}
              <div className="shrink-0 pt-1 sm:pt-0 self-end sm:self-center">
                <Link to="/inventory">
                  <Button variant="ghost" size="sm" icon={ArrowRight} className="text-xs">
                    Action
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
