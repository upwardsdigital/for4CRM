import { createContext, ReactNode } from 'react';

type ModalContextType = {
  openModal: (id: string, Component: ReactNode, options?: any) => void;
  closeModal: (id: string) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);
