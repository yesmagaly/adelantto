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


export const calculator = {
  calc: async ({ clientRent, months }) => {
    return fetch(
      `${API_SERVER_URL}/api/calc?client_rent=${clientRent}&months=${months}`,
      {
        headers: {
          Authorization: getToken(),
          Accept: "application/json",
        },
      }
    );
  },
}