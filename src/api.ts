import { API_SERVER_URL } from './config'

function getToken() {
  const userString = localStorage.getItem('AUTH');
  const user = JSON.parse(userString);

  return `Bearer ${user.token}`;
}

export const applications = {
  list: async () => await fetch(`${API_SERVER_URL}/api/applications`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
      Accept: "application/json",
    }
  }),

  get: async (id: number) => await fetch(`${API_SERVER_URL}/api/applications/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
      Accept: "application/json",
    }
  }),

  leaseContract: async (body = {}) => await fetch(`${API_SERVER_URL}/api/applications/lease-contract`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  }),

  desiredLoan: async (id: number, body = {}) => await fetch(`${API_SERVER_URL}/api/applications/${id}/desired-loan`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  }),

  preOffer: async (id: number, body = {}) => await fetch(`${API_SERVER_URL}/api/applications/${id}/pre-offer`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  }),

  identityCheck: async (id: number, body = {}) => await fetch(`${API_SERVER_URL}/api/applications/${id}/identity-check`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  }),

  propertyDocuments: async (id: number, body = {}) => await fetch(`${API_SERVER_URL}/api/applications/${id}/property-documents`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  }),

  propertyPictures: async (id: number, body = {}) => await fetch(`${API_SERVER_URL}/api/applications/${id}/property-pictures`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  }),

  privacyPolicy: async (id: number, body = {}) => await fetch(`${API_SERVER_URL}/api/applications/${id}/privacy-policy`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  }),

  policyNotifications: async (id: number, body = {}) => await fetch(`${API_SERVER_URL}/api/applications/${id}/policy-notifications`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  }),
}

export const loanContracts = {
  load: async ({ id }) => {
    return fetch(
      `${API_SERVER_URL}/api/leasing-contracts/${id}`,
      {
        headers: {
          Authorization: getToken(),
          Accept: "application/json",
        },
      }
    );
  },
}

export const loanAgreements = {
  get: async () => {
    return fetch(
      `${API_SERVER_URL}/api/loan-agreements`,
      {
        headers: {
          Authorization: getToken(),
          Accept: "application/json",
        },
      }
    );
  },
  create: async ({ body }) => {
    return fetch(
      `${API_SERVER_URL}/api/loan-agreements`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
          Accept: "application/json",
        },
        body: JSON.stringify(body)
      }
    );
  },
}

export const properties = {
  update: ({ id, body }) => {
    return fetch(`${API_SERVER_URL}/api/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(body),
    })
  }
}

export const calculator = {
  calc: async ({ principal, months }) => {
    return fetch(
      `${API_SERVER_URL}/api/calc?principal=${principal}&months=${months}`,
      {
        headers: {
          Authorization: getToken(),
          Accept: "application/json",
        },
      }
    );
  },
}