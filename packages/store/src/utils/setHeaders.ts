export async function setAuthHeaders(headers: any) {
  const authSession = JSON.parse(sessionStorage.getItem("auth") ?? "{}");

  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  if (authSession) {
    headers.set("authorization", `Bearer ${authSession.token}`);
  }

  return headers;
}