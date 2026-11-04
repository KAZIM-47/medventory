/**
 * Centralized Supplier Sample Data & Analytics Engine
 * Provides realistic, relational supplier records linked to medicine categories and inventory lines.
 */

export const SUPPLIER_STATUS_OPTIONS = ['All', 'Active', 'Inactive'];

export const PAYMENT_TERMS_OPTIONS = [
  'Net 15',
  'Net 30',
  'Net 45',
  'Net 60',
  'Due on Receipt',
];

export const INITIAL_SUPPLIERS = [
  {
    id: 'SUP-001',
    code: 'DIST-APEX',
    name: 'Apex Pharma Distributors Ltd',
    contactPerson: 'Marcus Vance',
    role: 'Director of Institutional Sales',
    email: 'm.vance@apexpharma-dist.com',
    phone: '+1 (555) 234-8901',
    address: '450 Technology Square, Suite 800',
    city: 'Boston',
    state: 'MA',
    country: 'United States',
    categories: ['Antibiotics', 'Respiratory'],
    status: 'Active',
    paymentTerms: 'Net 30',
    taxId: 'US-TAX-892104',
    leadTimeDays: 3,
    outstandingBalance: 2450.00,
    associatedMedicines: [
      { name: 'Augmentin 625mg', sku: 'MED-AUG-625', category: 'Antibiotics' },
      { name: 'Ventolin Evohaler', sku: 'MED-VEN-100', category: 'Respiratory' },
      { name: 'Zithromax 250mg', sku: 'MED-ZIT-250', category: 'Antibiotics' },
    ],
    purchaseHistory: [
      {
        poNumber: 'PO-2026-941',
        date: '2026-10-24',
        itemsSummary: 'Augmentin 625mg (x100), Ventolin (x25)',
        totalAmount: 9400.00,
        paymentStatus: 'Outstanding',
        balanceDue: 2450.00,
      },
      {
        poNumber: 'PO-2026-892',
        date: '2026-09-15',
        itemsSummary: 'Zithromax 250mg (x80)',
        totalAmount: 11250.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
      {
        poNumber: 'PO-2026-810',
        date: '2026-08-02',
        itemsSummary: 'Augmentin 625mg (x80)',
        totalAmount: 7800.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
    ],
  },
  {
    id: 'SUP-002',
    code: 'DIST-MCOR',
    name: 'MediCore Global Supply Co',
    contactPerson: 'Elena Rostova',
    role: 'Key Account Commercial Lead',
    email: 'e.rostova@medicoreglobal.com',
    phone: '+1 (555) 345-6712',
    address: '1200 S Michigan Ave, Fl 14',
    city: 'Chicago',
    state: 'IL',
    country: 'United States',
    categories: ['Cardiovascular', 'Antidiabetic'],
    status: 'Active',
    paymentTerms: 'Net 45',
    taxId: 'US-TAX-441098',
    leadTimeDays: 5,
    outstandingBalance: 3820.50,
    associatedMedicines: [
      { name: 'Lipitor 20mg', sku: 'MED-LIP-20', category: 'Cardiovascular' },
      { name: 'Glucophage 850mg', sku: 'MED-MET-850', category: 'Antidiabetic' },
      { name: 'Norvasc 5mg', sku: 'MED-NOR-5', category: 'Cardiovascular' },
      { name: 'Crestor 10mg', sku: 'MED-CRE-10', category: 'Cardiovascular' },
    ],
    purchaseHistory: [
      {
        poNumber: 'PO-2026-950',
        date: '2026-10-28',
        itemsSummary: 'Glucophage 850mg (x150), Crestor (x60)',
        totalAmount: 14200.00,
        paymentStatus: 'Partial',
        balanceDue: 3820.50,
      },
      {
        poNumber: 'PO-2026-874',
        date: '2026-09-02',
        itemsSummary: 'Lipitor 20mg (x120), Norvasc (x100)',
        totalAmount: 20600.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
    ],
  },
  {
    id: 'SUP-003',
    code: 'DIST-ZNTH',
    name: 'Zenith Bioscience Logistics',
    contactPerson: 'Tariq Al-Mansoor',
    role: 'Hospital Procurement Officer',
    email: 'tariq@zenithbio-logistics.com',
    phone: '+1 (555) 789-1234',
    address: '800 Market St, Suite 520',
    city: 'Philadelphia',
    state: 'PA',
    country: 'United States',
    categories: ['Antibiotics', 'Gastrointestinal'],
    status: 'Active',
    paymentTerms: 'Net 30',
    taxId: 'US-TAX-771239',
    leadTimeDays: 2,
    outstandingBalance: 0.00,
    associatedMedicines: [
      { name: 'Nexium 40mg', sku: 'MED-NEX-40', category: 'Gastrointestinal' },
      { name: 'Cipro XR 500mg', sku: 'MED-CIP-500', category: 'Antibiotics' },
      { name: 'Rocephin 1g Injectable', sku: 'MED-ROC-1G', category: 'Antibiotics' },
    ],
    purchaseHistory: [
      {
        poNumber: 'PO-2026-915',
        date: '2026-10-12',
        itemsSummary: 'Nexium 40mg (x80), Cipro XR (x40)',
        totalAmount: 12450.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
      {
        poNumber: 'PO-2026-841',
        date: '2026-08-19',
        itemsSummary: 'Rocephin 1g (x50)',
        totalAmount: 6800.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
    ],
  },
  {
    id: 'SUP-004',
    code: 'DIST-NOVS',
    name: 'Novis Healthcare Solutions',
    contactPerson: 'Chloe Davenport',
    role: 'Supply Chain Operations Manager',
    email: 'cdavenport@novishealthcare.org',
    phone: '+1 (555) 456-9023',
    address: '3200 Piedmont Rd NE',
    city: 'Atlanta',
    state: 'GA',
    country: 'United States',
    categories: ['Analgesics', 'Antihistamines'],
    status: 'Active',
    paymentTerms: 'Net 15',
    taxId: 'US-TAX-339014',
    leadTimeDays: 4,
    outstandingBalance: 1180.00,
    associatedMedicines: [
      { name: 'Panadol Extra', sku: 'MED-PAN-500', category: 'Analgesics' },
      { name: 'Voltaren Emulgel 1%', sku: 'MED-VOL-50', category: 'Analgesics' },
      { name: 'Zyrtec 10mg', sku: 'MED-ZYR-10', category: 'Antihistamines' },
    ],
    purchaseHistory: [
      {
        poNumber: 'PO-2026-962',
        date: '2026-10-31',
        itemsSummary: 'Panadol Extra (x300), Zyrtec 10mg (x50)',
        totalAmount: 5900.00,
        paymentStatus: 'Outstanding',
        balanceDue: 1180.00,
      },
      {
        poNumber: 'PO-2026-880',
        date: '2026-09-08',
        itemsSummary: 'Voltaren Emulgel 1% (x100)',
        totalAmount: 8200.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
    ],
  },
  {
    id: 'SUP-005',
    code: 'DIST-BSYN',
    name: 'BioSynthetix Specialty Care',
    contactPerson: 'Dr. Julian Meyer',
    role: 'Clinical Accounts Specialist',
    email: 'jmeyer@biosynthetix-care.com',
    phone: '+1 (555) 901-4432',
    address: '9400 Campus Point Dr',
    city: 'San Diego',
    state: 'CA',
    country: 'United States',
    categories: ['Antidiabetic', 'Respiratory'],
    status: 'Active',
    paymentTerms: 'Net 60',
    taxId: 'US-TAX-910442',
    leadTimeDays: 6,
    outstandingBalance: 4600.00,
    associatedMedicines: [
      { name: 'Lantus SoloStar', sku: 'MED-INS-GLA', category: 'Antidiabetic' },
      { name: 'Singulair 10mg', sku: 'MED-SIN-10', category: 'Respiratory' },
    ],
    purchaseHistory: [
      {
        poNumber: 'PO-2026-930',
        date: '2026-10-18',
        itemsSummary: 'Lantus SoloStar (x40 pens)',
        totalAmount: 14000.00,
        paymentStatus: 'Outstanding',
        balanceDue: 4600.00,
      },
      {
        poNumber: 'PO-2026-855',
        date: '2026-08-27',
        itemsSummary: 'Singulair 10mg (x70 boxes)',
        totalAmount: 8500.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
    ],
  },
  {
    id: 'SUP-006',
    code: 'DIST-AEGS',
    name: 'Aegis Generic Formulations Inc',
    contactPerson: 'Kenneth Ward',
    role: 'Vendor Relations Specialist',
    email: 'kward@aegisformulations.net',
    phone: '+1 (555) 678-2231',
    address: '100 Gateway Center, Suite 300',
    city: 'Newark',
    state: 'NJ',
    country: 'United States',
    categories: ['Antibiotics', 'Analgesics'],
    status: 'Inactive',
    paymentTerms: 'Due on Receipt',
    taxId: 'US-TAX-110842',
    leadTimeDays: 7,
    outstandingBalance: 0.00,
    associatedMedicines: [
      { name: 'Vibramycin 100mg', sku: 'MED-DOX-100', category: 'Antibiotics' },
    ],
    purchaseHistory: [
      {
        poNumber: 'PO-2026-790',
        date: '2026-07-14',
        itemsSummary: 'Doxycycline 100mg (x120 boxes)',
        totalAmount: 8400.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
    ],
  },
  {
    id: 'SUP-007',
    code: 'DIST-VNGR',
    name: 'Vanguard Cold-Chain Therapeutics',
    contactPerson: 'Brenda Lin',
    role: 'Regional Cold-Chain Coordinator',
    email: 'blin@vanguardcoldchain.com',
    phone: '+1 (555) 890-5511',
    address: '2201 6th Ave, Ste 1100',
    city: 'Seattle',
    state: 'WA',
    country: 'United States',
    categories: ['Antidiabetic', 'Antibiotics'],
    status: 'Inactive',
    paymentTerms: 'Net 30',
    taxId: 'US-TAX-665201',
    leadTimeDays: 3,
    outstandingBalance: 850.00,
    associatedMedicines: [
      { name: 'Lantus SoloStar', sku: 'MED-INS-GLA', category: 'Antidiabetic' },
      { name: 'Rocephin 1g Injectable', sku: 'MED-ROC-1G', category: 'Antibiotics' },
    ],
    purchaseHistory: [
      {
        poNumber: 'PO-2026-908',
        date: '2026-10-05',
        itemsSummary: 'Cold-chain Insulins & Reconstitutions',
        totalAmount: 12900.00,
        paymentStatus: 'Partial',
        balanceDue: 850.00,
      },
    ],
  },
];

/**
 * Derives consistent supplier analytics from a list of suppliers.
 */
export function calculateSupplierMetrics(suppliersList = INITIAL_SUPPLIERS) {
  let active = 0;
  let inactive = 0;
  let outstanding = 0;

  suppliersList.forEach((s) => {
    if (s.status === 'Active') {
      active += 1;
    } else {
      inactive += 1;
    }
    outstanding += Number(s.outstandingBalance) || 0;
  });

  return {
    totalSuppliers: suppliersList.length,
    activeSuppliers: active,
    inactiveSuppliers: inactive,
    totalOutstandingBalance: outstanding,
  };
}

