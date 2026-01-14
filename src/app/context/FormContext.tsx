// context/FormContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormContextType {
  hasValidSubmission: boolean;
  setHasValidSubmission: (value: boolean) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [hasValidSubmission, setHasValidSubmission] = useState(false);

  return (
    <FormContext.Provider value={{ hasValidSubmission, setHasValidSubmission }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}