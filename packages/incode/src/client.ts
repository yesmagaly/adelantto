import sha1 from "js-sha1";
import {
  VITE_INCODE_API_URL,
  VITE_INCODE_CLIENT_ID,
  VITE_INCODE_FLOW_ID,
} from "../../../src/config";
import { INCODE_FRONT_ID_ERRORS } from "./errors";

export const INCODE_PROCESSING_ERROR = "incode_processing_error";
export const INCODE_ERROR = "incode_error";
export const HTTP_ERROR = "http_error";

export function createSession() {
  return fetch(`${VITE_INCODE_API_URL}/omni/start`, {
    method: "POST",
    headers: {
      "Api-Version": "1.0",
      "X-Api-Key": sha1(VITE_INCODE_CLIENT_ID),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      countryCode: "ALL",
      externalId: null,
      configurationId: VITE_INCODE_FLOW_ID,
      language: "es-ES",
    }),
  });
}

export interface T_session {
  clientId: string;
  token: string;
}

type T_base_args = {
  session: T_session;
};

export async function addDevicefingerPrint({ session }: T_base_args) {
  const response = await fetch("https://api.ipify.org");
  const ip = await response.text();
  const deviceType = "WEBAPP";
  const hash = "";

  const body = {
    deviceType,
    hash,
    ip,
    data: JSON.stringify({}),
  };

  return fetch(`${VITE_INCODE_API_URL}/omni/add/device-fingerprint`, {
    method: "POST",
    headers: {
      "Api-Version": "1.0",
      "X-Api-Key": sha1(session?.clientId),
      "X-Incode-Hardware-Id": session?.token,
      "Content-Type": "application/json",
    },

    body: JSON.stringify(body),
  });
}

type T_addFrontId_args = T_base_args & {
  body: any;
};

type T_addFrontId_res = Promise<{
  skipBackIdCapture: boolean;
  failReason?: keyof typeof INCODE_FRONT_ID_ERRORS;
}>;

export async function addFrontId({
  session,
  body,
}: T_addFrontId_args): T_addFrontId_res {
  try {
    const response = await fetch(
      `${VITE_INCODE_API_URL}/omni/add/front-id/v2?onlyFront=false`,
      {
        method: "POST",
        headers: {
          "Api-Version": "1.0",
          "X-Api-Key": sha1(session?.clientId),
          "X-Incode-Hardware-Id": session?.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      if (!data.failReason && data.classification) {
        return data;
      }

      throw new Error(data.failReason, { cause: INCODE_PROCESSING_ERROR });
    } else {
      throw new Error(data.error, { cause: INCODE_ERROR });
    }
  } catch (error: any) {
    throw new Error(error?.message, { cause: HTTP_ERROR });
  }
}

type T_addBackId_args = T_base_args & {
  body: any;
};

type T_addBackId_res = Promise<{
  skipBackIdCapture: boolean;
  failReason?: keyof typeof INCODE_FRONT_ID_ERRORS;
}>;

export async function addBackId({
  session,
  body,
}: T_addBackId_args): T_addBackId_res {
  try {
    const response = await fetch(
      `${VITE_INCODE_API_URL}/omni/add/back-id/v2?retry=false`,
      {
        method: "POST",
        headers: {
          "Api-Version": "1.0",
          "X-Api-Key": sha1(session?.clientId),
          "X-Incode-Hardware-Id": session?.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      if (!data.failReason && data.classification) {
        return data;
      }

      throw new Error(data.failReason, { cause: INCODE_PROCESSING_ERROR });
    } else {
      throw new Error(data.error, { cause: INCODE_ERROR });
    }
  } catch (error: any) {
    throw new Error(error?.message, { cause: HTTP_ERROR });
  }
}

export async function processId({ session }: T_base_args) {
  try {
    const response = await fetch(
      `${VITE_INCODE_API_URL}/omni/process/id?queueName=diogenes`,
      {
        method: "POST",
        headers: {
          "Api-Version": "1.0",
          "X-Api-Key": sha1(session?.clientId),
          "X-Incode-Hardware-Id": session?.token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      if (data.success) {
        return data;
      } else {
        throw new Error("Something went wrong.", {
          cause: INCODE_PROCESSING_ERROR,
        });
      }
    } else {
      throw new Error(data.error, { cause: INCODE_ERROR });
    }
  } catch (error: any) {
    throw new Error(error?.message, { cause: HTTP_ERROR });
  }
}

export async function addFaceSelfie({
  session,
  body,
}: {
  session: T_session;
  body: any;
}) {
  try {
    const response = await fetch(
      `${VITE_INCODE_API_URL}/omni/add/face/third-party?imageType=selfie`,
      {
        method: "POST",
        headers: {
          "Api-Version": "1.0",
          "X-Api-Key": sha1(session?.clientId),
          "X-Incode-Hardware-Id": session?.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      if (
        data.confidence === 1 ||
        !data.isBright ||
        data.hasLenses ||
        data.hasFaceMask ||
        data.hasHeadCover
      ) {
        if (data.confidence === 1) {
          throw new Error("Spoof attempt detected", {
            cause: INCODE_PROCESSING_ERROR,
          });
        }

        if (!data.isBright) {
          throw new Error("Bad brightness", { cause: INCODE_PROCESSING_ERROR });
        }

        if (data.hasLenses) {
          throw new Error("Lenses detected", {
            cause: INCODE_PROCESSING_ERROR,
          });
        }

        if (data.hasFaceMask) {
          throw new Error("Mask detected", { cause: INCODE_PROCESSING_ERROR });
        }

        if (data.hasHeadCover) {
          throw new Error("Head cover detected", {
            cause: INCODE_PROCESSING_ERROR,
          });
        }

        throw new Error("Something went wrong.", {
          cause: INCODE_PROCESSING_ERROR,
        });
      } else {
        return data;
      }
    } else {
      throw new Error(data.error, { cause: INCODE_ERROR });
    }
  } catch (error: any) {
    throw new Error(error?.message, { cause: HTTP_ERROR });
  }
}

type T_processFace_res = Promise<{
  confidence: number;
  existingInterviewId: string;
  existingUser: boolean;
  nameMatched: boolean;
}>;

export async function processFace({ session }: T_base_args): T_processFace_res {
  try {
    const response = await fetch(
      `${VITE_INCODE_API_URL}/omni/process/face?imageType=selfie`,
      {
        method: "POST",
        headers: {
          "Api-Version": "1.0",
          "X-Api-Key": sha1(session?.clientId),
          "X-Incode-Hardware-Id": session?.token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      return data;
    } else {
      throw new Error(data.error, { cause: INCODE_ERROR });
    }
  } catch (error: any) {
    throw new Error(error?.message, { cause: HTTP_ERROR });
  }
}

export async function finishStatus({ session }: T_base_args) {
  try {
    const response = await fetch(
      `${VITE_INCODE_API_URL}/omni/finish-status?flowId=${VITE_INCODE_FLOW_ID}`,
      {
        method: "GET",
        headers: {
          "Api-Version": "1.0",
          "X-Api-Key": sha1(session?.clientId),
          "X-Incode-Hardware-Id": session?.token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      if (data.action === "approved") {
        return data;
      }

      throw new Error("Something went wrong.", {
        cause: INCODE_PROCESSING_ERROR,
      });
    } else {
      throw new Error(data.error, { cause: INCODE_ERROR });
    }
  } catch (error: any) {
    throw new Error(error?.message, { cause: HTTP_ERROR });
  }
}

export async function initSession() {
  try {
    const response = await createSession();
    const session = await response.json();
    await addDevicefingerPrint({ session });

    return session;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
