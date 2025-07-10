import { API_SERVER_URL } from "./config";

export class UnauthorizedError extends Error {}
export class HttpError extends Error {}

function getToken() {
  const userString = sessionStorage.getItem("AUTH") ?? "{}";
  const user = JSON.parse(userString);

  return `Bearer ${user.token}`;
}

export type UserProfile = {
  name: string;
  first_last_name: string;
  colony: string;
};

export const authentication = {
  logout: async () =>
    await fetch(`${API_SERVER_URL}/api/logout`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: getToken(),
      },
    }),

  login: async ({ email, password }: { email: string; password: string }) =>
    await fetch(`${API_SERVER_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    }),

  updateProfile: async (data: UserProfile) =>
    await fetch(`${API_SERVER_URL}/api/user/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }),

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

  forgotPassword: async ({ email }: { email: string }) =>
    await fetch(`${API_SERVER_URL}/api/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    }),
};

export const applications = {
  list: async () => {
    let response;

    try {
      response = await fetch(`${API_SERVER_URL}/api/applications`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
          Accept: "application/json",
        },
      });
    } catch (error: any) {
      throw new HttpError("HTTP: Something went wrong.");
    }

    if (response.status == 200) {
      const data = await response.json();

      return data;
    } else if (response.status == 401) {
      throw new UnauthorizedError("Your are unauthorized.");
    } else {
      throw new Error("STATUS: Something went wrong.");
    }
  },

  get: async (id: string) =>
    await fetch(`${API_SERVER_URL}/api/applications/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
        Accept: "application/json",
      },
    }),


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
  finalAnnouncement: async (id: string, body = {}) =>
    await fetch(`${API_SERVER_URL}/api/applications/${id}/final-announcement`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }),

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

export const loanContracts = {
  load: async ({ id }: { id: string }) => {
    return fetch(`${API_SERVER_URL}/api/leasing-contracts/${id}`, {
      headers: {
        Authorization: getToken(),
        Accept: "application/json",
      },
    });
  },
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

export const properties = {
  update: ({ id, body }: { id: string; body: string }) => {
    return fetch(`${API_SERVER_URL}/api/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(body),
    });
  },
};

export const calculator = {
  calc: async ({
    principal,
    months,
  }: {
    principal: number;
    months: number;
  }) => {
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

export const checkZipCode = async (zipCode: string) => {
  return fetch(`${API_SERVER_URL}/api/zip-codes/${zipCode}`, {
    headers: {
      Authorization: getToken(),
      Accept: "application/json",
    },
  });
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
