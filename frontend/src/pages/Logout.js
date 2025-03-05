import { redirect } from "react-router-dom";

export async function action() {
  await localStorage.removeItem("Token");
  await localStorage.removeItem("EXPIRED")
  return redirect("/auth?mode=login");
}
