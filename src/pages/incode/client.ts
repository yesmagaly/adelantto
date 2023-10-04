import { VITE_INCODE_API_URL, VITE_INCODE_CLIENT_ID } from "../../config";
import sha1 from "js-sha1"

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
      "configurationId": null,
      "language": "es-ES"
    }),
  });
}

export function addFrontId({ session, body }) {
  return fetch(`${VITE_INCODE_API_URL}/omni/add/front-id/v2?onlyFront=false`, {
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

export function addBackId({ session, body }) {
  return fetch(`${VITE_INCODE_API_URL}/omni/add/back-id/v2?retry=false`, {
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