import React, { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import {
  CUSTOMER_TYPE_OPTIONS,
  CUSTOMER_PAYMENT_TERMS,
} from '../../../data/customerData';
import { AlertCircle, Check, Copy } from 'lucide-react';

// Indian GSTIN validation regex (15 chars: 2 state + 10 PAN + 1 entity + 'Z' + 1 checksum)
const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;

export function CustomerFormModal({
  isOpen,
  onClose,
  initialData = null,
  onSave,
}) {
  const isEditing = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    name: '',
    type: 'Pharmacy / Medical Store',
    contactPerson: '',
    phone: '',
    email: '',
    gstin: '',
    billingAddress: '',
    shippingAddress: '',
    sameAsBilling: true,
    city: 'Chandigarh',
    state: 'Chandigarh (UT)',
    postalCode: '160017',
    creditLimit: '100000',
    paymentTerms: 'Net 30',
    status: 'Active',
    outstandingBalance: '0.00',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      const same =
        !initialData.shippingAddress ||
        initialData.shippingAddress === initialData.billingAddress;

      setFormData({
        name: initialData.name || '',
        type: initialData.type || 'Pharmacy / Medical Store',
        contactPerson: initialData.contactPerson || '',
        phone: initialData.phone || '',
        email: initialData.email || '',
        gstin: initialData.gstin || '',
        billingAddress: initialData.billingAddress || initialData.address || '',
        shippingAddress: initialData.shippingAddress || initialData.address || '',
        sameAsBilling: same,
        city: initialData.city || 'Chandigarh',
        state: initialData.state || 'Chandigarh (UT)',
        postalCode: initialData.postalCode || '160017',
        creditLimit:
          initialData.creditLimit !== undefined ? String(initialData.creditLimit) : '100000',
        paymentTerms: initialData.paymentTerms || 'Net 30',
        status: initialData.status || 'Active',
        outstandingBalance:
          initialData.outstandingBalance !== undefined ? String(initialData.outstandingBalance) : '0.00',
      });
      setErrors({});
    } else {
      setFormData({
        name: '',
        type: 'Pharmacy / Medical Store',
        contactPerson: '',
        phone: '',
        email: '',
        gstin: '',
        billingAddress: '',
        shippingAddress: '',
        sameAsBilling: true,
        city: 'Chandigarh',
        state: 'Chandigarh (UT)',
        postalCode: '160017',
        creditLimit: '100000',
        paymentTerms: 'Net 30',
        status: 'Active',
        outstandingBalance: '0.00',
      });
      setErrors({});
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => {
        const next = { ...prev, [name]: checked };
        if (name === 'sameAsBilling' && checked) {
          next.shippingAddress = prev.billingAddress;
        }
        return next;
      });
    } else {
      setFormData((prev) => {
        const next = { ...prev, [name]: value };
        if (name === 'billingAddress' && prev.sameAsBilling) {
          next.shippingAddress = value;
        }
        return next;
      });
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Customer / Organization name is required';
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Primary contact person is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    // GSTIN is optional, but if provided, validate pattern
    if (formData.gstin.trim() && !GSTIN_REGEX.test(formData.gstin.trim())) {
      newErrors.gstin = 'Invalid GSTIN format (e.g. 04AABCS1234F1Z9)';
    }

    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }

    if (!formData.sameAsBilling && !formData.shippingAddress.trim()) {
      newErrors.shippingAddress = 'Shipping address is required when different from billing';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State / UT is required';
    }

    if (!formData.postalCode.trim() || !/^\d{6}$/.test(formData.postalCode.trim())) {
      newErrors.postalCode = 'Valid 6-digit PIN code required';
    }

    const creditLimitNum = Number(formData.creditLimit);
    if (isNaN(creditLimitNum) || creditLimitNum < 0) {
      newErrors.creditLimit = 'Enter a valid credit limit (₹)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...(initialData || {}),
      name: formData.name.trim(),
      type: formData.type,
      contactPerson: formData.contactPerson.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim().toLowerCase(),
      gstin: formData.gstin.trim() ? formData.gstin.trim().toUpperCase() : null,
      billingAddress: formData.billingAddress.trim(),
      shippingAddress: formData.sameAsBilling
        ? formData.billingAddress.trim()
        : formData.shippingAddress.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      postalCode: formData.postalCode.trim(),
      creditLimit: Number(formData.creditLimit) || 0,
      paymentTerms: formData.paymentTerms,
      status: formData.status,
      outstandingBalance: Number(formData.outstandingBalance) || 0,
    };

    onSave(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Customer Profile' : 'Add New Customer'}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Business Details */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#183B32] mb-3 pb-1 border-b border-[#E2EBDD]">
            Entity & Identification
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Customer Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-[#BFD8AE] rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#183B32]"
              >
                {CUSTOMER_TYPE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Organization / Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sanjeevani Medicos & Chemists"
                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#183B32] ${
                  errors.name ? 'border-red-400 bg-red-50/30' : 'border-[#BFD8AE]'
                }`}
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Primary Contact Person <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="e.g. Rajesh Aggarwal / Dr. Harpreet Kaur"
                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#183B32] ${
                  errors.contactPerson ? 'border-red-400 bg-red-50/30' : 'border-[#BFD8AE]'
                }`}
              />
              {errors.contactPerson && (
                <p className="text-xs text-red-600 mt-1">{errors.contactPerson}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                GSTIN Number{' '}
                <span className="text-gray-400 font-normal">(Optional for non-registered)</span>
              </label>
              <input
                type="text"
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
                maxLength={15}
                placeholder="e.g. 04AABCS1234F1Z9"
                className={`w-full px-3 py-2 text-sm font-mono uppercase bg-white border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#183B32] ${
                  errors.gstin ? 'border-red-400 bg-red-50/30' : 'border-[#BFD8AE]'
                }`}
              />
              {errors.gstin && <p className="text-xs text-red-600 mt-1">{errors.gstin}</p>}
              <p className="text-[11px] text-gray-500 mt-0.5">
                Standard 15-character GSTIN identifier for tax invoicing.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Coordinates */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#183B32] mb-3 pb-1 border-b border-[#E2EBDD]">
            Communication Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98140 22341"
                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#183B32] ${
                  errors.phone ? 'border-red-400 bg-red-50/30' : 'border-[#BFD8AE]'
                }`}
              />
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="purchases@customer.com"
                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#183B32] ${
                  errors.email ? 'border-red-400 bg-red-50/30' : 'border-[#BFD8AE]'
                }`}
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>
          </div>
        </div>

        {/* Address & Logistics */}
        <div>
          <div className="flex items-center justify-between mb-3 pb-1 border-b border-[#E2EBDD]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#183B32]">
              Addresses & Regional Coverage
            </h4>
            <label className="flex items-center text-xs font-medium text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                name="sameAsBilling"
                checked={formData.sameAsBilling}
                onChange={handleChange}
                className="h-3.5 w-3.5 rounded border-[#BFD8AE] text-[#183B32] focus:ring-[#183B32]"
              />
              <span className="ml-2">Shipping same as Billing</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Billing Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="billingAddress"
                rows={2}
                value={formData.billingAddress}
                onChange={handleChange}
                placeholder="Booth No. 42, Sector 22-C Commercial Complex"
                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#183B32] resize-none ${
                  errors.billingAddress ? 'border-red-400 bg-red-50/30' : 'border-[#BFD8AE]'
                }`}
              />
              {errors.billingAddress && (
                <p className="text-xs text-red-600 mt-1">{errors.billingAddress}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Shipping / Delivery Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="shippingAddress"
                rows={2}
                value={formData.shippingAddress}
                onChange={handleChange}
                disabled={formData.sameAsBilling}
                placeholder="Delivery receiving bay or clinic location"
                className={`w-full px-3 py-2 text-sm border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#183B32] resize-none ${
                  formData.sameAsBilling
                    ? 'bg-gray-100/70 border-gray-200 text-gray-500 cursor-not-allowed'
                    : errors.shippingAddress
                    ? 'bg-white border-red-400'
                    : 'bg-white border-[#BFD8AE]'
                }`}
              />
              {errors.shippingAddress && (
                <p className="text-xs text-red-600 mt-1">{errors.shippingAddress}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Chandigarh"
                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#183B32] ${
                  errors.city ? 'border-red-400 bg-red-50/30' : 'border-[#BFD8AE]'
                }`}
              />
              {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                State / Union Territory <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Chandigarh (UT) / Punjab / Haryana"
                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#183B32] ${
                  errors.state ? 'border-red-400 bg-red-50/30' : 'border-[#BFD8AE]'
                }`}
              />
              {errors.state && <p className="text-xs text-red-600 mt-1">{errors.state}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                PIN Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                maxLength={6}
                placeholder="160017"
                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#183B32] ${
                  errors.postalCode ? 'border-red-400 bg-red-50/30' : 'border-[#BFD8AE]'
                }`}
              />
              {errors.postalCode && (
                <p className="text-xs text-red-600 mt-1">{errors.postalCode}</p>
              )}
            </div>
          </div>
        </div>

        {/* Commercial & Terms */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#183B32] mb-3 pb-1 border-b border-[#E2EBDD]">
            Commercial Terms & Credit Limits
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Credit Limit (₹) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-gray-400 font-semibold">
                  ₹
                </span>
                <input
                  type="number"
                  name="creditLimit"
                  value={formData.creditLimit}
                  onChange={handleChange}
                  min="0"
                  step="5000"
                  placeholder="100000"
                  className={`w-full pl-7 pr-3 py-2 text-sm bg-white border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#183B32] ${
                    errors.creditLimit ? 'border-red-400 bg-red-50/30' : 'border-[#BFD8AE]'
                  }`}
                />
              </div>
              {errors.creditLimit && (
                <p className="text-xs text-red-600 mt-1">{errors.creditLimit}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Payment Terms <span className="text-red-500">*</span>
              </label>
              <select
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-[#BFD8AE] rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#183B32]"
              >
                {CUSTOMER_PAYMENT_TERMS.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Account Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-white border border-[#BFD8AE] rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#183B32]"
              >
                <option value="Active">Active (Account in Good Standing)</option>
                <option value="Inactive">Inactive (Suspended Orders)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2EBDD]">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? 'Save Changes' : 'Register Customer'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

