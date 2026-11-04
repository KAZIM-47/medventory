import React from 'react';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Link } from 'react-router-dom';
import { AlertCircle, ShoppingCart } from 'lucide-react';

export function LowStockAlerts({ alerts }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="Low Stock Alerts"
        subtitle="Medicines below or approaching replenishment threshold"
        action={
          <Link
            to="/inventory"
            className="text-xs font-semibold text-[#183B32] hover:underline"
          >
            Manage Stock
          </Link>
        }
      />

      <CardContent className="flex-1 p-0 divide-y divide-[#E2EBDD]">
        {alerts.map((item) => {
          const isCritical = item.severity === 'critical';
          const stockRatio = Math.min(
            100,
            Math.round((item.currentStock / item.reorderLevel) * 100)
          );

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
                    variant={isCritical ? 'danger' : 'warning'}
                    size="sm"
                    dot
                  >
                    {isCritical ? 'Critical' : 'Low'}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#5A6F63] mt-1">
                  <span>SKU: {item.sku}</span>
                  <span>•</span>
                  <span>Category: {item.category}</span>
                </div>

                {/* Stock Level Bar */}
                <div className="mt-2.5 max-w-xs">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-[#183B32]">
                      {item.currentStock} {item.unit} available
                    </span>
                    <span className="text-[#5A6F63]">
                      Reorder at: {item.reorderLevel}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#E2EBDD] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCritical ? 'bg-[#991B1B]' : 'bg-[#78350F]'
                      }`}
                      style={{ width: `${stockRatio}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="shrink-0 self-start sm:self-center">
                <Link to="/purchases">
                  <Button variant="outline" size="sm" icon={ShoppingCart}>
                    Create PO
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

