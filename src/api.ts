import { API_SERVER_URL } from "./config";

export class UnauthorizedError extends Error {}
export class HttpError extends Error {}

function getToken() {
  const userString = sessionStorage.getItem("auth") ?? "{}";
  const user = JSON.parse(userString);

  return `Bearer ${user.token}`;
}

export type UserProfile = {
  name: string;
  first_last_name: string;
  colony: string;
};

export const authentication = {
  updateTempPassword: async ({
    password,
    password_confirmation,
  }: {
    password: string;
    password_confirmation: string;
  }) =>
    await fetch(`${API_SERVER_URL}/api/user/update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify({
        password,
        password_confirmation,
      }),
    }),
};

export const applications = {
  privacyPolicy: async (id: string, body = {}) =>
    await fetch(`${API_SERVER_URL}/api/applications/${id}/privacy-policy`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }),

  confirmPrivacyPolicy: async (id: string, body = {}) => {
    return await fetch(
      `${API_SERVER_URL}/api/applications/${id}/confirm-privacy-policy?time=${Date.now()}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  },

  accountStatement: async (id: string, body = {}) =>
    await fetch(`${API_SERVER_URL}/api/loans/${id}/account-statement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }),
};

export const loans = {
  list: async () => {
    return fetch(`${API_SERVER_URL}/api/loans`, {
      headers: {
        Authorization: getToken(),
        Accept: "application/json",
      },
    });
  },

  get: async (id: number) =>
    await fetch(`${API_SERVER_URL}/api/loans/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
        Accept: "application/json",
      },
    }),

  create: async ({ body }: { body: object }) => {
    return fetch(`${API_SERVER_URL}/api/loans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
  },
};

export const resendPrivacyPolicyVerificationCode = async () => {
  return fetch(
    `${API_SERVER_URL}/api/verification-code/privacy-policy/resend`,
    {
      method: "POST",
      headers: {
        Authorization: getToken(),
        Accept: "application/json",
      },
    }
  );
};

export const uploadInstallmentFile = async (id: string, body = {}) =>
  await fetch(`${API_SERVER_URL}/api/installments/${id}/upload-file`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

export const getInstallment = async (id: string) =>
  await fetch(`${API_SERVER_URL}/api/installments/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
      Accept: "application/json",
    },
  });
