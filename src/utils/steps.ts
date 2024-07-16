export const LEASE_CONTRACT_STEP = "lease_contract";
export const DESIRED_LOAN_STEP = "desired_loan";
export const PRE_OFFER_STEP = "pre_offer";
export const PRIVACY_POLICY_STEP = "privacy_policy";
export const CONFIRM_PRIVACY_POLICY_STEP = "confirm_privacy_policy";
export const IDENTITY_CHECK_STEP = "identity_check";
export const PROPERTY_DOCUMENTS_STEP = "property_documents";
export const PROPERTY_PICTURES_STEP = "property_pictures";
export const FINAL_ANNOUNCEMENT_STEP = "final_announcement";

interface Application {
  id: string;
  status: string;
  step: string;
}

export function nextStepUrl(application: Application): string | null {
  if (application.status != "uncompleted") {
    return null;
  }

  const steps = [
    LEASE_CONTRACT_STEP,
    DESIRED_LOAN_STEP,
    PRE_OFFER_STEP,
    PRIVACY_POLICY_STEP,
    // CONFIRM_PRIVACY_POLICY_STEP,
    IDENTITY_CHECK_STEP,
    PROPERTY_DOCUMENTS_STEP,
    PROPERTY_PICTURES_STEP,
    FINAL_ANNOUNCEMENT_STEP,
  ];

  const urls: { [key: string]: string } = {
    [LEASE_CONTRACT_STEP]: `/applications/${application.id}/`,
    [DESIRED_LOAN_STEP]: `/applications/${application.id}/desired-loan`,
    [PRE_OFFER_STEP]: `/applications/${application.id}/pre-offer`,
    [PRIVACY_POLICY_STEP]: `/applications/${application.id}/privacy-policy`,
    // [CONFIRM_PRIVACY_POLICY_STEP]: `/applications/${application.id}/confirm-privacy-policy`,
    [IDENTITY_CHECK_STEP]: `/applications/${application.id}/identity-check`,
    [PROPERTY_DOCUMENTS_STEP]: `/applications/${application.id}/property-documents`,
    [PROPERTY_PICTURES_STEP]: `/applications/${application.id}/property-pictures`,
    [FINAL_ANNOUNCEMENT_STEP]: `/applications/${application.id}/final-announcement`,
  };

  const step = application.step;
  const indexStep = steps.findIndex((i) => i === step);
  const nextStep = steps[indexStep + 1];
  const url = urls[nextStep];

  return url;
}
