import React, { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { MEDICINE_CATEGORIES } from '../../../data/mockData';
import { PAYMENT_TERMS_OPTIONS } from '../../../data/supplierData';
import { Plus, Check, AlertCircle } from 'lucide-react';

const CATEGORY_LIST = MEDICINE_CATEGORIES.filter((c) => c !== 'All');

export function SupplierFormModal({
  isOpen,
  onClose,
  initialData = null,
  onSave,
}) {
  const isEditing = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    contactPerson: '',
    role: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'United States',
    paymentTerms: 'Net 30',
    taxId: '',
    leadTimeDays: 3,
    categories: [],
    status: 'Active',
    outstandingBalance: '0.00',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        code: initialData.code || '',
        contactPerson: initialData.contactPerson || '',
        role: initialData.role || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        city: initialData.city || '',
        state: initialData.state || '',
        country: initialData.country || 'United States',
        paymentTerms: initialData.paymentTerms || 'Net 30',
        taxId: initialData.taxId || '',
        leadTimeDays: initialData.leadTimeDays || 3,
        categories: initialData.categories ? [...initialData.categories] : [CATEGORY_LIST[0]],
        status: initialData.status || 'Active',
        outstandingBalance:
          initialData.outstandingBalance !== undefined ? String(initialData.outstandingBalance) : '0.00',
      });
      setErrors({});
    } else {
      setFormData({
        name: '',
        code: `DIST-${Math.floor(1000 + Math.random() * 9000)}`,
        contactPerson: '',
        role: 'Sales Representative',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: 'United States',
        paymentTerms: 'Net 30',
        taxId: '',
        leadTimeDays: 3,
        categories: [CATEGORY_LIST[0]],
        status: 'Active',
        outstandingBalance: '0.00',
      });
      setErrors({});
    }
  }, [initialData, isOpen]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Company / Supplier Name is required';
    if (!formData.contactPerson.trim()) errs.contactPerson = 'Contact Person is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.categories || formData.categories.length === 0) {
      errs.categories = 'Select at least one supplied category';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCategoryToggle = (category) => {
    setFormData((prev) => {
      const exists = prev.categories.includes(category);
      const updated = exists
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: updated };
    });
    if (errors.categories) {
      setErrors((prev) => ({ ...prev, categories: undefined }));
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const preparedData = {
      ...formData,
      id: initialData?.id || `SUP-${Date.now().toString().slice(-4)}`,
      outstandingBalance: parseFloat(formData.outstandingBalance) || 0,
      leadTimeDays: parseInt(formData.leadTimeDays, 10) || 3,
      associatedMedicines: initialData?.associatedMedicines || [],
      purchaseHistory: initialData?.purchaseHistory || [],
    };

    onSave(preparedData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Supplier Profile' : 'Contract New Supplier'}
      subtitle={
        isEditing
          ? 'Update authorized distributor terms, contacts, and contracted product lines'
          : 'Enroll an authorized pharmaceutical manufacturer or distributor into the system'
      }
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Company Name & Supplier Code */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#183B32] mb-1">
              Company / Supplier Name <span className="text-[#991B1B]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. Apex Pharma Distributors Ltd"
              className={`w-full px-3 py-2 text-xs rounded-lg border bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32] ${
                errors.name ? 'border-[#FECACA] bg-[#FEE2E2]/30' : 'border-[#E2EBDD]'
              }`}
            />
            {errors.name && <p className="text-[11px] text-[#991B1B] mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">
              Supplier Code
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => handleChange('code', e.target.value)}
              placeholder="DIST-APEX"
              className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32]"
            />
          </div>
        </div>

        {/* Row 2: Contact Person, Role, Email, Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">
              Contact Person <span className="text-[#991B1B]">*</span>
            </label>
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(e) => handleChange('contactPerson', e.target.value)}
              placeholder="e.g. Marcus Vance"
              className={`w-full px-3 py-2 text-xs rounded-lg border bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32] ${
                errors.contactPerson ? 'border-[#FECACA] bg-[#FEE2E2]/30' : 'border-[#E2EBDD]'
              }`}
            />
            {errors.contactPerson && <p className="text-[11px] text-[#991B1B] mt-1">{errors.contactPerson}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">
              Job Title / Role
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              placeholder="e.g. Key Account Manager"
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">
              Business Email <span className="text-[#991B1B]">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g. m.vance@apexpharma-dist.com"
              className={`w-full px-3 py-2 text-xs rounded-lg border bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32] ${
                errors.email ? 'border-[#FECACA] bg-[#FEE2E2]/30' : 'border-[#E2EBDD]'
              }`}
            />
            {errors.email && <p className="text-[11px] text-[#991B1B] mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">
              Telephone / Mobile <span className="text-[#991B1B]">*</span>
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 234-8901"
              className={`w-full px-3 py-2 text-xs rounded-lg border bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32] ${
                errors.phone ? 'border-[#FECACA] bg-[#FEE2E2]/30' : 'border-[#E2EBDD]'
              }`}
            />
            {errors.phone && <p className="text-[11px] text-[#991B1B] mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Row 3: Address & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#183B32] mb-1">Street Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="450 Technology Square"
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">
              City <span className="text-[#991B1B]">*</span>
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="Boston"
              className={`w-full px-3 py-2 text-xs rounded-lg border bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32] ${
                errors.city ? 'border-[#FECACA] bg-[#FEE2E2]/30' : 'border-[#E2EBDD]'
              }`}
            />
            {errors.city && <p className="text-[11px] text-[#991B1B] mt-1">{errors.city}</p>}
          </div>
        </div>

        {/* Row 4: Commercial Terms */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">Payment Terms</label>
            <select
              value={formData.paymentTerms}
              onChange={(e) => handleChange('paymentTerms', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#E2EBDD] bg-white text-[#34423A] focus:outline-none focus:border-[#183B32]"
            >
              {PAYMENT_TERMS_OPTIONS.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">Lead Time (Days)</label>
            <input
              type="number"
              min="1"
              value={formData.leadTimeDays}
              onChange={(e) => handleChange('leadTimeDays', e.target.value)}
              placeholder="3"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#E2EBDD] bg-white text-[#34423A] focus:outline-none focus:border-[#183B32]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">Tax ID / Reg #</label>
            <input
              type="text"
              value={formData.taxId}
              onChange={(e) => handleChange('taxId', e.target.value)}
              placeholder="US-TAX-XXXX"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#E2EBDD] bg-white text-[#34423A] focus:outline-none focus:border-[#183B32]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">Contract Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#E2EBDD] bg-white text-[#34423A] focus:outline-none focus:border-[#183B32]"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Row 5: Supplied Categories Checkboxes */}
        <div>
          <label className="block text-xs font-semibold text-[#183B32] mb-1.5">
            Supplied Medicine Categories <span className="text-[#991B1B]">*</span>
          </label>
          <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
            {CATEGORY_LIST.map((cat) => {
              const isChecked = formData.categories.includes(cat);
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleCategoryToggle(cat)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-[#183B32] text-white border-[#183B32] shadow-xs'
                      : 'bg-white text-[#34423A] border-[#E2EBDD] hover:bg-[#EEF6EC]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          {errors.categories && <p className="text-[11px] text-[#991B1B] mt-1">{errors.categories}</p>}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2EBDD]">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" icon={isEditing ? Check : Plus}>
            {isEditing ? 'Save Changes' : 'Contract Supplier'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

