import { API_SERVER_URL } from './config'

function getToken() {
  const userString = localStorage.getItem('AUTH');
  const user = JSON.parse(userString);

  return `Bearer ${user.token}`;
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
  create: async ({ body }) => {
    return fetch(
      `${API_SERVER_URL}/api/loan-agreements`,
      {
        method: "POST",
        headers: {
          Authorization: getToken(),
          Accept: "application/json",
        },
        body: JSON.stringify(body)
      }
    );
  },
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