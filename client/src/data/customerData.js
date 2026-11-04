/**
 * Centralized Customer Sample Data & Metrics Engine
 * Supports wholesale & distribution business model in the Chandigarh / Tricity region.
 * Uses INR (₹) consistently for all financial metrics.
 */

export const CUSTOMER_TYPES = [
  'All',
  'Doctor',
  'Clinic',
  'Hospital',
  'Pharmacy / Medical Store',
];

export const CUSTOMER_TYPE_OPTIONS = [
  'Doctor',
  'Clinic',
  'Hospital',
  'Pharmacy / Medical Store',
];

export const CUSTOMER_STATUS_OPTIONS = ['All', 'Active', 'Inactive'];

export const CUSTOMER_PAYMENT_TERMS = [
  'Immediate / COD',
  'Net 15',
  'Net 30',
  'Net 45',
  'Net 60',
];

export function formatINR(val) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(val) || 0);
}

export const INITIAL_CUSTOMERS = [
  {
    id: 'CUST-001',
    code: 'CUST-CH-01',
    type: 'Pharmacy / Medical Store',
    name: 'Sanjeevani Medicos & Chemists',
    contactPerson: 'Rajesh Aggarwal',
    phone: '+91 98140 22341',
    email: 'sanjeevani.medicos@gmail.com',
    gstin: '04AABCS1234F1Z9',
    billingAddress: 'Booth 42-43, Sector 22-D Market',
    shippingAddress: 'Booth 42-43, Sector 22-D Market',
    city: 'Chandigarh',
    state: 'Chandigarh',
    postalCode: '160022',
    creditLimit: 300000,
    paymentTerms: 'Net 30',
    outstandingBalance: 48250.00,
    status: 'Active',
    notes: 'Primary retail distributor in Sector 22. Consistently orders oral antibiotics & analgesics.',
    purchaseHistory: [
      {
        invoiceNumber: 'INV-2026-1102',
        date: '2026-10-28',
        itemsSummary: 'Augmentin 625mg (x50), Panadol Extra (x100)',
        totalAmount: 112500.00,
        paymentStatus: 'Partial',
        balanceDue: 48250.00,
      },
      {
        invoiceNumber: 'INV-2026-0984',
        date: '2026-09-19',
        itemsSummary: 'Zyrtec 10mg (x80), Nexium 40mg (x40)',
        totalAmount: 145000.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
      {
        invoiceNumber: 'INV-2026-0850',
        date: '2026-08-11',
        itemsSummary: 'Glucophage 850mg (x120), Lipitor 20mg (x60)',
        totalAmount: 127500.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
    ],
    paymentHistory: [
      {
        receiptNumber: 'RCP-2026-881',
        date: '2026-10-30',
        amount: 64250.00,
        mode: 'NEFT / RTGS',
        referenceNumber: 'HDFCR2026103009412',
      },
      {
        receiptNumber: 'RCP-2026-750',
        date: '2026-09-25',
        amount: 145000.00,
        mode: 'UPI Transfer',
        referenceNumber: 'UPI/32948100918',
      },
    ],
  },
  {
    id: 'CUST-002',
    code: 'CUST-DOC-02',
    type: 'Doctor',
    name: 'Dr. Harpreet Singh, MD',
    contactPerson: 'Dr. Harpreet Singh',
    phone: '+91 98765 43210',
    email: 'dr.harpreet.singh@gmail.com',
    gstin: '04ABFPS9988D1Z2',
    billingAddress: 'House 1124, Sector 11-C',
    shippingAddress: 'Consulting Suite 4, Sector 17-E',
    city: 'Chandigarh',
    state: 'Chandigarh',
    postalCode: '160011',
    creditLimit: 100000,
    paymentTerms: 'Net 15',
    outstandingBalance: 12400.00,
    status: 'Active',
    notes: 'Prescribes specialized cardiovascular and antidiabetic formulations.',
    purchaseHistory: [
      {
        invoiceNumber: 'INV-2026-1120',
        date: '2026-10-31',
        itemsSummary: 'Crestor 10mg (x30), Norvasc 5mg (x20)',
        totalAmount: 38400.00,
        paymentStatus: 'Partial',
        balanceDue: 12400.00,
      },
      {
        invoiceNumber: 'INV-2026-1011',
        date: '2026-09-24',
        itemsSummary: 'Lantus SoloStar (x15 pens)',
        totalAmount: 64000.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
    ],
    paymentHistory: [
      {
        receiptNumber: 'RCP-2026-890',
        date: '2026-11-01',
        amount: 26000.00,
        mode: 'Cheque',
        referenceNumber: 'CHQ-894102 / SBI',
      },
    ],
  },
  {
    id: 'CUST-003',
    code: 'CUST-HSP-03',
    type: 'Hospital',
    name: 'Silver Oaks Multispecialty Hospital',
    contactPerson: 'Col. (Retd.) V. K. Sharma',
    phone: '+91 98150 99876',
    email: 'procurement@silveroakshospital.in',
    gstin: '03AABCS4455G1Z8',
    billingAddress: 'Plot 2, Sector 71, Phase 8',
    shippingAddress: 'Central Drug Store, Basement 1, Sector 71',
    city: 'Mohali',
    state: 'Punjab',
    postalCode: '160071',
    creditLimit: 1000000,
    paymentTerms: 'Net 45',
    outstandingBalance: 185000.00,
    status: 'Active',
    notes: '200-bed multispecialty institution. Institutional wholesale accounts desk.',
    purchaseHistory: [
      {
        invoiceNumber: 'INV-2026-1090',
        date: '2026-10-22',
        itemsSummary: 'Rocephin 1g (x100), Augmentin 625mg (x200), Injectables',
        totalAmount: 385000.00,
        paymentStatus: 'Partial',
        balanceDue: 185000.00,
      },
      {
        invoiceNumber: 'INV-2026-0940',
        date: '2026-09-08',
        itemsSummary: 'ICU Critical Care Infusions & Respiratory Inhalers',
        totalAmount: 490000.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
    ],
    paymentHistory: [
      {
        receiptNumber: 'RCP-2026-860',
        date: '2026-10-25',
        amount: 200000.00,
        mode: 'NEFT / RTGS',
        referenceNumber: 'PUNBR202610250084',
      },
    ],
  },
  {
    id: 'CUST-004',
    code: 'CUST-CLN-04',
    type: 'Clinic',
    name: 'City Polyclinic & Diagnostic Centre',
    contactPerson: 'Dr. Neha Bhasin',
    phone: '+91 97801 11223',
    email: 'contact@citypolyclinic.co.in',
    gstin: '06AABCC9900H1Z4',
    billingAddress: 'SCO 88, First Floor, Sector 14',
    shippingAddress: 'SCO 88, First Floor, Sector 14',
    city: 'Panchkula',
    state: 'Haryana',
    postalCode: '134109',
    creditLimit: 250000,
    paymentTerms: 'Net 30',
    outstandingBalance: 34600.00,
    status: 'Active',
    notes: 'Outpatient polyclinic with in-house dispensing pharmacy.',
    purchaseHistory: [
      {
        invoiceNumber: 'INV-2026-1110',
        date: '2026-10-29',
        itemsSummary: 'Cipro XR (x40), Zithromax (x50), Paracetamol',
        totalAmount: 84600.00,
        paymentStatus: 'Partial',
        balanceDue: 34600.00,
      },
    ],
    paymentHistory: [
      {
        receiptNumber: 'RCP-2026-875',
        date: '2026-10-30',
        amount: 50000.00,
        mode: 'UPI Transfer',
        referenceNumber: 'UPI/32948011299',
      },
    ],
  },
  {
    id: 'CUST-005',
    code: 'CUST-CH-05',
    type: 'Pharmacy / Medical Store',
    name: 'Aggarwal Pharmacy & Surgical Store',
    contactPerson: 'Vipin Aggarwal',
    phone: '+91 98888 77665',
    email: 'aggarwal.medicos34@yahoo.com',
    gstin: '04AAGFA7766K1Z1',
    billingAddress: 'SCO 214, Sector 34-C',
    shippingAddress: 'SCO 214, Sector 34-C',
    city: 'Chandigarh',
    state: 'Chandigarh',
    postalCode: '160034',
    creditLimit: 400000,
    paymentTerms: 'Net 30',
    outstandingBalance: 72800.00,
    status: 'Active',
    notes: 'High-volume commercial pharmacy in educational / coaching hub Sector 34.',
    purchaseHistory: [
      {
        invoiceNumber: 'INV-2026-1118',
        date: '2026-10-30',
        itemsSummary: 'Panadol Extra (x300), Voltaren Gel (x80)',
        totalAmount: 112800.00,
        paymentStatus: 'Partial',
        balanceDue: 72800.00,
      },
    ],
    paymentHistory: [
      {
        receiptNumber: 'RCP-2026-885',
        date: '2026-10-31',
        amount: 40000.00,
        mode: 'NEFT / RTGS',
        referenceNumber: 'AXISR202610311290',
      },
    ],
  },
  {
    id: 'CUST-006',
    code: 'CUST-DOC-06',
    type: 'Doctor',
    name: 'Dr. Amrita Johal Clinic',
    contactPerson: 'Dr. Amrita Johal',
    phone: '+91 98144 55432',
    email: 'dr.amrita.johal@gmail.com',
    gstin: '',
    billingAddress: 'SCO 45, Phase 7',
    shippingAddress: 'SCO 45, Phase 7',
    city: 'Mohali',
    state: 'Punjab',
    postalCode: '160062',
    creditLimit: 80000,
    paymentTerms: 'Net 15',
    outstandingBalance: 0.00,
    status: 'Active',
    notes: 'Specialist gynecological consultancy and day-dispense facility.',
    purchaseHistory: [
      {
        invoiceNumber: 'INV-2026-1025',
        date: '2026-09-28',
        itemsSummary: 'Doxycycline 100mg (x40), Iron & Folic Acid formulations',
        totalAmount: 48000.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
    ],
    paymentHistory: [
      {
        receiptNumber: 'RCP-2026-810',
        date: '2026-10-05',
        amount: 48000.00,
        mode: 'Cheque',
        referenceNumber: 'CHQ-104922 / ICICI',
      },
    ],
  },
  {
    id: 'CUST-007',
    code: 'CUST-HSP-07',
    type: 'Hospital',
    name: 'CareFirst Hospital & Trauma Centre',
    contactPerson: 'Ramanathan Iyer',
    phone: '+91 99155 33221',
    email: 'pharmacy@carefirsttrauma.org',
    gstin: '06AABCC1122J1Z3',
    billingAddress: 'Old Delhi Road, Near Sector 8',
    shippingAddress: 'Emergency Pharmacy Dock, Old Delhi Road',
    city: 'Panchkula',
    state: 'Haryana',
    postalCode: '134108',
    creditLimit: 800000,
    paymentTerms: 'Net 45',
    outstandingBalance: 115400.00,
    status: 'Active',
    notes: '24/7 trauma & emergency care. Regular large-batch purchaser.',
    purchaseHistory: [
      {
        invoiceNumber: 'INV-2026-1080',
        date: '2026-10-18',
        itemsSummary: 'Ventolin Inhalers (x60), Singulair 10mg (x80), Critical care',
        totalAmount: 265400.00,
        paymentStatus: 'Partial',
        balanceDue: 115400.00,
      },
    ],
    paymentHistory: [
      {
        receiptNumber: 'RCP-2026-850',
        date: '2026-10-21',
        amount: 150000.00,
        mode: 'NEFT / RTGS',
        referenceNumber: 'SBINR202610219904',
      },
    ],
  },
  {
    id: 'CUST-008',
    code: 'CUST-CH-08',
    type: 'Pharmacy / Medical Store',
    name: 'Verma Chemist & General Store',
    contactPerson: 'Sunil Verma',
    phone: '+91 98722 44332',
    email: 'verma.chemists.zirakpur@gmail.com',
    gstin: '03AAAFV9090L1Z6',
    billingAddress: 'Shop 12, VIP Road, High Street Market',
    shippingAddress: 'Shop 12, VIP Road, High Street Market',
    city: 'Zirakpur',
    state: 'Punjab',
    postalCode: '140603',
    creditLimit: 150000,
    paymentTerms: 'Immediate / COD',
    outstandingBalance: 0.00,
    status: 'Inactive',
    notes: 'Retail store on VIP Road. Account dormant during seasonal renovation.',
    purchaseHistory: [
      {
        invoiceNumber: 'INV-2026-0815',
        date: '2026-07-28',
        itemsSummary: 'OTC Analgesics & Antipyretics Assortment',
        totalAmount: 52000.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
    ],
    paymentHistory: [
      {
        receiptNumber: 'RCP-2026-710',
        date: '2026-07-28',
        amount: 52000.00,
        mode: 'Cash / COD',
        referenceNumber: 'CASH-REC-710',
      },
    ],
  },
  {
    id: 'CUST-009',
    code: 'CUST-CLN-09',
    type: 'Clinic',
    name: 'PrimeCare Daycare Clinic',
    contactPerson: 'Dr. K. S. Mann',
    phone: '+91 98141 88776',
    email: 'dr.ksmann@primecaredaycare.in',
    gstin: '04AAGFP5544N1Z5',
    billingAddress: 'SCF 19, Sector 20-C',
    shippingAddress: 'SCF 19, Sector 20-C',
    city: 'Chandigarh',
    state: 'Chandigarh',
    postalCode: '160020',
    creditLimit: 120000,
    paymentTerms: 'Net 15',
    outstandingBalance: 0.00,
    status: 'Inactive',
    notes: 'Pediatric & general physician daycare. Temporarily inactive.',
    purchaseHistory: [
      {
        invoiceNumber: 'INV-2026-0790',
        date: '2026-07-15',
        itemsSummary: 'Pediatric Syrups & Antibiotic Suspensions',
        totalAmount: 34000.00,
        paymentStatus: 'Paid',
        balanceDue: 0.00,
      },
    ],
    paymentHistory: [
      {
        receiptNumber: 'RCP-2026-680',
        date: '2026-07-20',
        amount: 34000.00,
        mode: 'Cheque',
        referenceNumber: 'CHQ-009184 / HDFC',
      },
    ],
  },
];

/**
 * Calculates customer portfolio metrics dynamically from the sample dataset.
 */
export function calculateCustomerMetrics(customersList = INITIAL_CUSTOMERS) {
  let doctors = 0;
  let clinicsAndHospitals = 0;
  let pharmacies = 0;
  let totalReceivables = 0;

  customersList.forEach((cust) => {
    if (cust.type === 'Doctor') {
      doctors += 1;
    } else if (cust.type === 'Clinic' || cust.type === 'Hospital') {
      clinicsAndHospitals += 1;
    } else if (cust.type === 'Pharmacy / Medical Store') {
      pharmacies += 1;
    }

    totalReceivables += Number(cust.outstandingBalance) || 0;
  });

  return {
    totalCustomers: customersList.length,
    doctors,
    clinicsAndHospitals,
    pharmacies,
    totalOutstandingReceivables: totalReceivables,
  };
}

