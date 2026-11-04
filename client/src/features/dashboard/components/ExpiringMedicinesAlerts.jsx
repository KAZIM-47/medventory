import React from 'react';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

export function ExpiringMedicinesAlerts({ items }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="Expiring Medicines (Next 60 Days)"
        subtitle="Batch-level surveillance to minimize write-offs and losses"
        action={
          <Link
            to="/inventory"
            className="text-xs font-semibold text-[#183B32] hover:underline"
          >
            Batch Audit
          </Link>
        }
      />

      <CardContent className="flex-1 p-0 divide-y divide-[#E2EBDD]">
        {items.map((item) => {
          const isUrgent = item.status === 'urgent';

          return (
            <div
              key={item.id}
              className="p-4 hover:bg-[#F7FAF5] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-[#183B32] truncate">
                    {item.medicine}
                  </h4>
                  <Badge
                    variant={isUrgent ? 'danger' : 'warning'}
                    size="sm"
                  >
                    Expires in {item.daysRemaining}d
                  </Badge>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#5A6F63] mt-1">
                  <span>Batch: <strong className="text-[#34423A]">{item.batchNo}</strong></span>
                  <span>•</span>
                  <span>Affected: <strong className="text-[#34423A]">{item.units} units</strong></span>
                  <span>•</span>
                  <span>Date: {item.expiryDate}</span>
                </div>

                <div className="mt-2 text-xs flex items-center gap-1.5 text-[#5A6F63]">
                  <span className="font-medium text-[#183B32]">Protocol:</span>
                  <span>{item.recommendedAction}</span>
                </div>
              </div>

              <div className="shrink-0 self-start sm:self-center">
                <Link to="/inventory">
                  <Button variant="ghost" size="sm" icon={ArrowRight}>
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

