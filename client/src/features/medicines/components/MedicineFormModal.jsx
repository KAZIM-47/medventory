import React, { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { MEDICINE_CATEGORIES, DOSAGE_FORMS } from '../data/mockMedicinesData';
import { Plus, Check, AlertCircle } from 'lucide-react';

const CATEGORY_OPTIONS = MEDICINE_CATEGORIES.filter((c) => c !== 'All');

export function MedicineFormModal({
  isOpen,
  onClose,
  initialData = null,
  onSave,
}) {
  const isEditing = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    sku: '',
    barcode: '',
    category: CATEGORY_OPTIONS[0] || 'Antibiotics',
    dosageForm: DOSAGE_FORMS[0] || 'Tablet',
    strength: '',
    manufacturer: '',
    unitPrice: '',
    purchasePrice: '',
    currentStock: '',
    reorderLevel: '',
    unit: 'boxes',
    shelfLocation: '',
    requiresPrescription: true,
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        genericName: initialData.genericName || '',
        sku: initialData.sku || '',
        barcode: initialData.barcode || '',
        category: initialData.category || CATEGORY_OPTIONS[0],
        dosageForm: initialData.dosageForm || DOSAGE_FORMS[0],
        strength: initialData.strength || '',
        manufacturer: initialData.manufacturer || '',
        unitPrice: initialData.unitPrice !== undefined ? String(initialData.unitPrice) : '',
        purchasePrice: initialData.purchasePrice !== undefined ? String(initialData.purchasePrice) : '',
        currentStock: initialData.currentStock !== undefined ? String(initialData.currentStock) : '',
        reorderLevel: initialData.reorderLevel !== undefined ? String(initialData.reorderLevel) : '',
        unit: initialData.unit || 'boxes',
        shelfLocation: initialData.shelfLocation || '',
        requiresPrescription: initialData.requiresPrescription ?? true,
        description: initialData.description || '',
      });
      setErrors({});
    } else {
      setFormData({
        name: '',
        genericName: '',
        sku: '',
        barcode: '',
        category: CATEGORY_OPTIONS[0] || 'Antibiotics',
        dosageForm: DOSAGE_FORMS[0] || 'Tablet',
        strength: '',
        manufacturer: '',
        unitPrice: '',
        purchasePrice: '',
        currentStock: '',
        reorderLevel: '30',
        unit: 'boxes',
        shelfLocation: '',
        requiresPrescription: true,
        description: '',
      });
      setErrors({});
    }
  }, [initialData, isOpen]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Trade / Brand Name is required';
    if (!formData.genericName.trim()) errs.genericName = 'Generic Formulation is required';
    if (!formData.sku.trim()) errs.sku = 'SKU / Product Code is required';

    const price = parseFloat(formData.unitPrice);
    if (isNaN(price) || price <= 0) errs.unitPrice = 'Must be a valid price > $0.00';

    const stock = parseInt(formData.currentStock, 10);
    if (isNaN(stock) || stock < 0) errs.currentStock = 'Current stock must be 0 or higher';

    const reorder = parseInt(formData.reorderLevel, 10);
    if (isNaN(reorder) || reorder < 0) errs.reorderLevel = 'Reorder level must be 0 or higher';

    setErrors(errs);
    return Object.keys(errs).length === 0;
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

    const stockNum = parseInt(formData.currentStock, 10);
    const reorderNum = parseInt(formData.reorderLevel, 10);

    const status = stockNum === 0
      ? 'Out of Stock'
      : stockNum <= reorderNum
      ? 'Low Stock'
      : 'In Stock';

    const preparedData = {
      ...formData,
      id: initialData?.id || `MED-${Date.now().toString().slice(-4)}`,
      unitPrice: parseFloat(formData.unitPrice),
      purchasePrice: formData.purchasePrice ? parseFloat(formData.purchasePrice) : 0,
      currentStock: stockNum,
      reorderLevel: reorderNum,
      status,
    };

    onSave(preparedData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Medicine Record' : 'Add New Medicine to Catalog'}
      subtitle={
        isEditing
          ? 'Update master attributes, pricing and inventory thresholds'
          : 'Enter verified pharmaceutical catalog information and storage parameters'
      }
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Brand Name & Generic Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">
              Trade / Brand Name <span className="text-[#991B1B]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. Augmentin 625mg"
              className={`w-full px-3 py-2 text-xs rounded-lg border bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32] ${
                errors.name ? 'border-[#FECACA] bg-[#FEE2E2]/30' : 'border-[#E2EBDD]'
              }`}
            />
            {errors.name && <p className="text-[11px] text-[#991B1B] mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">
              Generic Formulation <span className="text-[#991B1B]">*</span>
            </label>
            <input
              type="text"
              value={formData.genericName}
              onChange={(e) => handleChange('genericName', e.target.value)}
              placeholder="e.g. Amoxicillin + Clavulanic Acid"
              className={`w-full px-3 py-2 text-xs rounded-lg border bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32] ${
                errors.genericName ? 'border-[#FECACA] bg-[#FEE2E2]/30' : 'border-[#E2EBDD]'
              }`}
            />
            {errors.genericName && <p className="text-[11px] text-[#991B1B] mt-1">{errors.genericName}</p>}
          </div>
        </div>

        {/* Row 2: SKU, Barcode, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">
              SKU Code <span className="text-[#991B1B]">*</span>
            </label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => handleChange('sku', e.target.value)}
              placeholder="e.g. MED-AUG-625"
              className={`w-full px-3 py-2 text-xs font-mono rounded-lg border bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32] ${
                errors.sku ? 'border-[#FECACA] bg-[#FEE2E2]/30' : 'border-[#E2EBDD]'
              }`}
            />
            {errors.sku && <p className="text-[11px] text-[#991B1B] mt-1">{errors.sku}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">Barcode (Optional)</label>
            <input
              type="text"
              value={formData.barcode}
              onChange={(e) => handleChange('barcode', e.target.value)}
              placeholder="e.g. 890102000011"
              className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">Category <span className="text-[#991B1B]">*</span></label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32]"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Dosage Form, Strength, Manufacturer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">Dosage Form <span className="text-[#991B1B]">*</span></label>
            <select
              value={formData.dosageForm}
              onChange={(e) => handleChange('dosageForm', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32]"
            >
              {DOSAGE_FORMS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">Strength</label>
            <input
              type="text"
              value={formData.strength}
              onChange={(e) => handleChange('strength', e.target.value)}
              placeholder="e.g. 625mg, 100mcg"
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">Manufacturer</label>
            <input
              type="text"
              value={formData.manufacturer}
              onChange={(e) => handleChange('manufacturer', e.target.value)}
              placeholder="e.g. GlaxoSmithKline"
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32]"
            />
          </div>
        </div>

        {/* Row 4: Pricing & Inventory Thresholds */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">
              Selling Price ($) <span className="text-[#991B1B]">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.unitPrice}
              onChange={(e) => handleChange('unitPrice', e.target.value)}
              placeholder="0.00"
              className={`w-full px-3 py-1.5 text-xs rounded-lg border bg-white text-[#34423A] focus:outline-none focus:border-[#183B32] ${
                errors.unitPrice ? 'border-[#FECACA]' : 'border-[#E2EBDD]'
              }`}
            />
            {errors.unitPrice && <p className="text-[10px] text-[#991B1B] mt-0.5">{errors.unitPrice}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">Purchase Cost ($)</label>
            <input
              type="number"
              step="0.01"
              value={formData.purchasePrice}
              onChange={(e) => handleChange('purchasePrice', e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E2EBDD] bg-white text-[#34423A] focus:outline-none focus:border-[#183B32]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">
              Current Stock <span className="text-[#991B1B]">*</span>
            </label>
            <input
              type="number"
              value={formData.currentStock}
              onChange={(e) => handleChange('currentStock', e.target.value)}
              placeholder="0"
              className={`w-full px-3 py-1.5 text-xs rounded-lg border bg-white text-[#34423A] focus:outline-none focus:border-[#183B32] ${
                errors.currentStock ? 'border-[#FECACA]' : 'border-[#E2EBDD]'
              }`}
            />
            {errors.currentStock && <p className="text-[10px] text-[#991B1B] mt-0.5">{errors.currentStock}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">
              Reorder Alert <span className="text-[#991B1B]">*</span>
            </label>
            <input
              type="number"
              value={formData.reorderLevel}
              onChange={(e) => handleChange('reorderLevel', e.target.value)}
              placeholder="25"
              className={`w-full px-3 py-1.5 text-xs rounded-lg border bg-white text-[#34423A] focus:outline-none focus:border-[#183B32] ${
                errors.reorderLevel ? 'border-[#FECACA]' : 'border-[#E2EBDD]'
              }`}
            />
            {errors.reorderLevel && <p className="text-[10px] text-[#991B1B] mt-0.5">{errors.reorderLevel}</p>}
          </div>
        </div>

        {/* Row 5: Location, Unit & Prescription Requirement */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">Storage Location</label>
            <input
              type="text"
              value={formData.shelfLocation}
              onChange={(e) => handleChange('shelfLocation', e.target.value)}
              placeholder="e.g. Aisle 2 - Shelf B1"
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">Dispensing Unit</label>
            <input
              type="text"
              value={formData.unit}
              onChange={(e) => handleChange('unit', e.target.value)}
              placeholder="boxes, strips, vials"
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32]"
            />
          </div>

          <div className="flex items-center sm:pt-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#183B32]">
              <input
                type="checkbox"
                checked={formData.requiresPrescription}
                onChange={(e) => handleChange('requiresPrescription', e.target.checked)}
                className="w-4 h-4 rounded border-[#E2EBDD] text-[#183B32] focus:ring-[#183B32]"
              />
              <span>Requires Doctor Prescription (Rx)</span>
            </label>
          </div>
        </div>

        {/* Row 6: Description */}
        <div>
          <label className="block text-xs font-semibold text-[#183B32] mb-1">
            Clinical Indications & Storage Guidelines
          </label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Clinical details, administration precautions, storage temperature conditions..."
            className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32]"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2EBDD]">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" icon={isEditing ? Check : Plus}>
            {isEditing ? 'Save Changes' : 'Add to Catalog'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

