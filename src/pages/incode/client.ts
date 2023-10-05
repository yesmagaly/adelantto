import { VITE_INCODE_API_URL, VITE_INCODE_CLIENT_ID, VITE_INCODE_FLOW_ID } from "../../config";
import sha1 from "js-sha1"


export const INCODE_PROCESSING_ERROR = "incode_processing_error";
export const INCODE_HTTP_ERROR = "incode_http_error";

export function createSession() {
  return fetch(`${VITE_INCODE_API_URL}/omni/start`, {
    method: "POST",
    headers: {
      'Api-Version': "1.0",
      'X-Api-Key': sha1(VITE_INCODE_CLIENT_ID),
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      "countryCode": "ALL",
      "externalId": null,
      "configurationId": VITE_INCODE_FLOW_ID,
      "language": "es-ES"
    }),
  });
}

export async function addDevicefingerPrint({ session }) {
  const response = await fetch("https://api.ipify.org")
  const ip = await response.text();
  const deviceType = "WEBAPP";
  const hash = "";

  const body = {
    deviceType,
    hash,
    ip,
    data: JSON.stringify({}),
  }

  return fetch(`${VITE_INCODE_API_URL}/omni/add/device-fingerprint`, {
    method: "POST",
    headers: {
      'Api-Version': "1.0",
      'X-Api-Key': sha1(session?.clientId),
      'X-Incode-Hardware-Id': session?.token,
      'Content-Type': "application/json"
    },

    body: JSON.stringify(body)
  });
}

export async function addFrontId({ session, body }) {
  try {
    const response = await fetch(`${VITE_INCODE_API_URL}/omni/add/front-id/v2?onlyFront=false`, {
      method: "POST",
      headers: {
        'Api-Version': "1.0",
        'X-Api-Key': sha1(session?.clientId),
        'X-Incode-Hardware-Id': session?.token,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.status === 200) {
      if (!data.failReason) {
        return data;
      } else {
        throw new Error(data.failReason, { cause: INCODE_PROCESSING_ERROR });
      }

    } else {
      throw new Error(data.error, { cause: INCODE_PROCESSING_ERROR });
    }
  } catch (error) {
    throw new Error(error?.message, { cause: INCODE_HTTP_ERROR });
  }
}

export async function addBackId({ session, body }) {
  try {
    const response = await fetch(`${VITE_INCODE_API_URL}/omni/add/back-id/v2?retry=false`, {
      method: "POST",
      headers: {
        'Api-Version': "1.0",
        'X-Api-Key': sha1(session?.clientId),
        'X-Incode-Hardware-Id': session?.token,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.status === 200) {
      if (!data.failReason) {
        return data;
      } else {
        throw new Error(data.failReason, { cause: INCODE_PROCESSING_ERROR });
      }

    } else {
      throw new Error(data.error, { cause: INCODE_PROCESSING_ERROR });
    }
  } catch (error) {
    throw new Error(error?.message, { cause: INCODE_HTTP_ERROR });
  }
}

export function processId({ session }) {
  return fetch(`${VITE_INCODE_API_URL}/omni/process/id?queueName=diogenes`, {
    method: "POST",
    headers: {
      'Api-Version': "1.0",
      'X-Api-Key': sha1(session?.clientId),
      'X-Incode-Hardware-Id': session?.token,
      'Content-Type': "application/json"
    },
  });
}

export function addFaceSelfie({ session, body }) {
  return fetch(`${VITE_INCODE_API_URL}/omni/add/face/third-party?imageType=selfie`, {
    method: "POST",
    headers: {
      'Api-Version': "1.0",
      'X-Api-Key': sha1(session?.clientId),
      'X-Incode-Hardware-Id': session?.token,
      'Content-Type': "application/json"
    },
    body: JSON.stringify(body),
  });
}

export function processFace({ session }) {
  return fetch(`${VITE_INCODE_API_URL}/omni/process/face?imageType=selfie`, {
    method: "POST",
    headers: {
      'Api-Version': "1.0",
      'X-Api-Key': sha1(session?.clientId),
      'X-Incode-Hardware-Id': session?.token,
      'Content-Type': "application/json"
    },
  });
}

export function finishStatus({ session }) {
  return fetch(`${VITE_INCODE_API_URL}/omni/finish-status?flowId=${VITE_INCODE_FLOW_ID}`, {
    method: "GET",
    headers: {
      'Api-Version': "1.0",
      'X-Api-Key': sha1(session?.clientId),
      'X-Incode-Hardware-Id': session?.token,
      'Content-Type': "application/json"
    },
  });
}


export async function initSession() {
  try {
    const response = await createSession();
    const session = await response.json();
    await addDevicefingerPrint({ session });

    return session;
  } catch (error) {
    throw new Error(error?.message);
  }
}