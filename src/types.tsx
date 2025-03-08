export interface LoanType {
  status: string;
  id: string;
  application: ApplicationType;
  amount: number;
  installments: Array<InstallmentType>
}

export interface ApplicationType {
  status: string;
  id: string;
  lease_monthly_income: number;
  pre_offer_amount: number;
  pre_offer_term_frame: number;
  step: string;
  loan: LoanType;
}

export interface InstallmentType {
  id: string;
  amount: number;
  status: string;
  due_date: string;
  total_amount: number;
}


export interface OfferType {
  principal: number;
  fees: number;
  commission: number;
  advance: number;
  note: string;
}

export interface ErrorType {
  message: string;
}
