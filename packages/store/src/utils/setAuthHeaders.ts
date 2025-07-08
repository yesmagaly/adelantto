export async function setAuthHeaders(headers: any) {
  const userString = sessionStorage.getItem("AUTH") ?? "{}";
  const user = JSON.parse(userString);

  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  if (user) {
    headers.set("authorization", `Bearer ${user.token}`);
  }

  return headers;
}
