import sha1 from "js-sha1"
import { VITE_INCODE_API_URL, VITE_INCODE_CLIENT_ID, VITE_INCODE_FLOW_ID } from "../../config";

export const INCODE_PROCESSING_ERROR = "incode_processing_error";
export const INCODE_ERROR = "incode_error";
export const HTTP_ERROR = "http_error";

const errorsMap = {
  UNKNOWN_DOCUMENT_TYPE: "document classification failed",
  WRONG_DOCUMENT_SIDE:
    "can happen when uploading back side of id when front id is required or the other way around",
  WRONG_ONE_SIDED_DOCUMENT: "uploading wrong document with only one side",
  DOCUMENT_NOT_READABLE:
    "document couldn't be read, probably due to image quality",
  UNABLE_TO_ALIGN_DOCUMENT: "alignment failed",
  ID_TYPE_UNACCEPTABLE: "invalid type of id",
  UNEXPECTED_ERROR_OCCURRED: "unexpected error",
};

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
      if (!data.failReason && data.classification) {
        if (data.skipBackIdCapture) {
          await processId({ session });
        }

        return data;
      }

      throw new Error(data.failReason, { cause: INCODE_PROCESSING_ERROR });
    } else {
      throw new Error(data.error, { cause: INCODE_ERROR });
    }
  } catch (error) {
    throw new Error(error?.message, { cause: HTTP_ERROR });
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
      if (!data.failReason && data.classification) {
        await processId({ session });
        return data;
      }

      throw new Error(data.failReason, { cause: INCODE_PROCESSING_ERROR });
    } else {
      throw new Error(data.error, { cause: INCODE_ERROR });
    }
  } catch (error) {
    throw new Error(error?.message, { cause: HTTP_ERROR });
  }
}

export async function processId({ session }) {
  try {
    const response = await fetch(`${VITE_INCODE_API_URL}/omni/process/id?queueName=diogenes`, {
      method: "POST",
      headers: {
        'Api-Version': "1.0",
        'X-Api-Key': sha1(session?.clientId),
        'X-Incode-Hardware-Id': session?.token,
        'Content-Type': "application/json"
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      if (data.success) {
        return data;
      } else {
        throw new Error("Something went wrong.", { cause: INCODE_PROCESSING_ERROR });
      }
    } else {
      throw new Error(data.error, { cause: INCODE_ERROR });
    }
  } catch (error) {
    throw new Error(error?.message, { cause: HTTP_ERROR });
  }
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