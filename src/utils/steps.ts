export const LEASE_CONTRACT_STEP = 'lease_contract';
export const DESIRED_LOAN_STEP = 'desired_loan';
export const PRE_OFFER_STEP = 'pre_offer';
export const IDENTITY_CHECK_STEP = 'identity_check';
export const PROPERTY_DOCUMENTS_STEP = 'property_documents';
export const PROPERTY_PICTURES_STEP = 'property_pictures';
export const ACCEPT_PRIVACY_POLICY_STEP = 'accept_privacy_policy';
export const ACCEPT_POLICY_NOTIFICATIONS_STEP = 'accept_policy_notifications';

interface Application {
  status: string,
  step: string
}

export function nextStepUrl(application: Application): string | null {
  if (application.status != 'uncompleted') {
    return null;
  }

  const steps = [
    LEASE_CONTRACT_STEP,
    DESIRED_LOAN_STEP,
    PRE_OFFER_STEP,
    IDENTITY_CHECK_STEP,
    PROPERTY_DOCUMENTS_STEP,
    PROPERTY_PICTURES_STEP,
    ACCEPT_PRIVACY_POLICY_STEP,
    ACCEPT_POLICY_NOTIFICATIONS_STEP
  ];

  const urls = {
    [LEASE_CONTRACT_STEP]: `/applications/${application.id}/`,
    [DESIRED_LOAN_STEP]: `/applications/${application.id}/desired-loan`,
    [PRE_OFFER_STEP]: `/applications/${application.id}/pre-offer`,
    [IDENTITY_CHECK_STEP]: `/applications/${application.id}/identity-check`,
    [PROPERTY_DOCUMENTS_STEP]: `/applications/${application.id}/property-documents`,
    [PROPERTY_PICTURES_STEP]: `/applications/${application.id}/property-pictures`,
    [ACCEPT_PRIVACY_POLICY_STEP]: `/applications/${application.id}/accept-privacy-policy`,
    [ACCEPT_POLICY_NOTIFICATIONS_STEP]: `/applications/${application.id}/accept-policy-notifcations`,
  }

  const step = application.step;
  const indexStep = steps.findIndex(i => i === step);
  const nextStep = steps[indexStep + 1];
  const url = urls[nextStep];

  return url;
}