import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { MedicineProvider } from './context/MedicineContext';

export default function App() {
  return (
    <MedicineProvider>
      <RouterProvider router={router} />
    </MedicineProvider>
  );
}
