export interface TableDataT {
  rows: any[];
  count: number;
  status: {
    loading: boolean;
    error: boolean;
    message?: string;
  };
  filters: Record<string, any>;
  pagination: {
    skip: number;
    take: number;
  };
}

export interface ModalDataT {
  isOpen: boolean;
  isRequested: boolean;
  type: string;
  fields: Record<string, ModalDataFieldT>;
  validation: ModalDataValidationT;
  values: Record<string, any>;
}

export type ModalDataValidationT = {
  error: Record<string, boolean>;
  message: Record<string, string>;
};

export type ModalDataFieldT = {
  type: React.HTMLInputTypeAttribute;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  options?: ModalDataFieldSelectOptionsT[];
};

export type ModalDataFieldSelectOptionsT = {
  value: any;
  label: string;
};
