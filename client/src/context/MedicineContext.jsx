import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import {
  INITIAL_MEDICINES,
  calculateInventoryMetrics,
  WEEKLY_SALES_DATA,
  RECENT_TRANSACTIONS,
  EXPIRING_MEDICINES,
} from '../data/mockData';
import {
  INITIAL_BATCHES,
  INITIAL_MOVEMENTS,
  calculateBatchInventoryMetrics,
} from '../data/batchData';

const defaultMetrics = calculateInventoryMetrics(INITIAL_MEDICINES);
const defaultBatchMetrics = calculateBatchInventoryMetrics(INITIAL_BATCHES, INITIAL_MEDICINES);

const defaultContextValue = {
  medicines: INITIAL_MEDICINES,
  metrics: defaultMetrics,
  batches: INITIAL_BATCHES,
  batchMetrics: defaultBatchMetrics,
  movements: INITIAL_MOVEMENTS,
  weeklySales: WEEKLY_SALES_DATA,
  recentTransactions: RECENT_TRANSACTIONS,
  expiringMedicines: EXPIRING_MEDICINES,
  addMedicine: () => {},
  updateMedicine: () => {},
  deleteMedicine: () => {},
  adjustBatchStock: () => {},
  resetSampleData: () => {},
};

const MedicineContext = createContext(defaultContextValue);

export function MedicineProvider({ children }) {
  const [medicines, setMedicines] = useState(INITIAL_MEDICINES);
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [movements, setMovements] = useState(INITIAL_MOVEMENTS);

  // Derived inventory metrics calculated dynamically from the shared medicines state
  const metrics = useMemo(() => {
    return calculateInventoryMetrics(medicines);
  }, [medicines]);

  // Derived batch-level metrics
  const batchMetrics = useMemo(() => {
    return calculateBatchInventoryMetrics(batches, medicines);
  }, [batches, medicines]);

  const addMedicine = useCallback((newMedicine) => {
    setMedicines((prev) => [newMedicine, ...prev]);
  }, []);

  const updateMedicine = useCallback((updatedMedicine) => {
    setMedicines((prev) =>
      prev.map((item) => (item.id === updatedMedicine.id ? updatedMedicine : item))
    );
  }, []);

  const deleteMedicine = useCallback((medicineId) => {
    setMedicines((prev) => prev.filter((item) => item.id !== medicineId));
  }, []);

  // Stock Adjustment Handler
  const adjustBatchStock = useCallback(({ batchId, type, quantity, reason, notes, performedBy }) => {
    const qtyNum = Number(quantity);
    if (!qtyNum || qtyNum <= 0) return null;

    let targetBatch = null;
    let prevQty = 0;
    let nextQty = 0;

    // 1. Update Batch
    setBatches((prevBatches) =>
      prevBatches.map((b) => {
        if (b.id === batchId) {
          targetBatch = b;
          prevQty = b.quantity;
          nextQty = type === 'add' ? b.quantity + qtyNum : Math.max(0, b.quantity - qtyNum);
          return {
            ...b,
            quantity: nextQty,
          };
        }
        return b;
      })
    );

    if (!targetBatch) return null;

    // 2. Synchronize associated medicine total stock
    const diff = nextQty - prevQty;
    setMedicines((prevMeds) =>
      prevMeds.map((m) => {
        if (m.id === targetBatch.medicineId || m.sku === targetBatch.sku) {
          const newMedStock = Math.max(0, m.currentStock + diff);
          return {
            ...m,
            currentStock: newMedStock,
            status:
              newMedStock === 0
                ? 'Out of Stock'
                : newMedStock <= m.reorderLevel
                ? 'Low Stock'
                : 'In Stock',
          };
        }
        return m;
      })
    );

    // 3. Create and prepend Movement Log Record
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newMovement = {
      id: `MOV-${Date.now().toString().slice(-4)}`,
      date: formattedDate,
      medicineName: targetBatch.medicineName,
      sku: targetBatch.sku,
      batchNumber: targetBatch.batchNumber,
      type: type === 'add' ? 'Adjustment (+)' : 'Adjustment (-)',
      quantity: type === 'add' ? qtyNum : -qtyNum,
      unit: targetBatch.unit || 'units',
      previousStock: prevQty,
      newStock: nextQty,
      reason: notes ? `${reason} — ${notes}` : reason,
      performedBy: performedBy || 'Dr. Rayan Ali (Pharmacist)',
    };

    setMovements((prevMov) => [newMovement, ...prevMov]);

    return {
      batch: targetBatch,
      previousStock: prevQty,
      newStock: nextQty,
      movement: newMovement,
    };
  }, []);

  const resetSampleData = useCallback(() => {
    setMedicines(INITIAL_MEDICINES);
    setBatches(INITIAL_BATCHES);
    setMovements(INITIAL_MOVEMENTS);
  }, []);

  const value = useMemo(
    () => ({
      medicines,
      metrics,
      batches,
      batchMetrics,
      movements,
      weeklySales: WEEKLY_SALES_DATA,
      recentTransactions: RECENT_TRANSACTIONS,
      expiringMedicines: EXPIRING_MEDICINES,
      addMedicine,
      updateMedicine,
      deleteMedicine,
      adjustBatchStock,
      resetSampleData,
    }),
    [
      medicines,
      metrics,
      batches,
      batchMetrics,
      movements,
      addMedicine,
      updateMedicine,
      deleteMedicine,
      adjustBatchStock,
      resetSampleData,
    ]
  );

  return (
    <MedicineContext.Provider value={value}>
      {children}
    </MedicineContext.Provider>
  );
}

export function useMedicines() {
  const context = useContext(MedicineContext);
  return context || defaultContextValue;
}
