import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Users, Stethoscope, Building2, Store, IndianRupee } from 'lucide-react';
import { formatINR } from '../../../data/customerData';

export function CustomerOverview({ metrics }) {
  const kpis = [
    {
      id: 'total-customers',
      title: 'Total Customers',
      value: String(metrics.totalCustomers),
      subtext: 'Registered healthcare buyers',
      icon: Users,
      iconBg: 'bg-[#D7FCD4] text-[#183B32] border-[#B6CCA1]',
    },
    {
      id: 'doctors',
      title: 'Doctors',
      value: String(metrics.doctors),
      subtext: 'Individual practitioners',
      icon: Stethoscope,
      iconBg: 'bg-[#C7E4BB] text-[#183B32] border-[#BFD8AE]',
    },
    {
      id: 'clinics-hospitals',
      title: 'Clinics & Hospitals',
      value: String(metrics.clinicsAndHospitals),
      subtext: 'Institutional healthcare centers',
      icon: Building2,
      iconBg: 'bg-[#EEF6EC] text-[#183B32] border-[#C7E4BB]',
    },
    {
      id: 'pharmacies',
      title: 'Pharmacies & Stores',
      value: String(metrics.pharmacies),
      subtext: 'Retail chemist accounts',
      icon: Store,
      iconBg: 'bg-[#D7FCD4] text-[#183B32] border-[#B6CCA1]',
    },
    {
      id: 'outstanding-receivables',
      title: 'Outstanding Receivables',
      value: formatINR(metrics.totalOutstandingReceivables),
      subtext: 'Uncollected customer invoices',
      icon: IndianRupee,
      iconBg:
        metrics.totalOutstandingReceivables > 0
          ? 'bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]'
          : 'bg-[#D7FCD4] text-[#183B32] border-[#B6CCA1]',
      highlight:
        metrics.totalOutstandingReceivables > 0 ? 'text-[#78350F]' : 'text-[#183B32]',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Card key={kpi.id} className="p-4 hover:border-[#C7E4BB] transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-[#5A6F63] uppercase tracking-wider">
                  {kpi.title}
                </p>
                <h3
                  className={`text-xl font-bold mt-1 tracking-tight ${
                    kpi.highlight || 'text-[#183B32]'
                  }`}
                >
                  {kpi.value}
                </h3>
              </div>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${kpi.iconBg}`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[10px] text-[#5A6F63] mt-2 truncate">{kpi.subtext}</p>
          </Card>
        );
      })}
    </div>
  );
}

