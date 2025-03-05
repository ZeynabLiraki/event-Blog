import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const formData = await request.formData();
  const authData = {
    email: formData.get("email"),
    password: formData.get("password")
  };

  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "signup";

  if (mode !== "signup" && mode !== "login") {
    throw new Error("Unsupported mode", { status: 422 });
  }

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify(authData)
  });

  if (response.status === 422 || response.status === 401) {
    const errorData = await response.json();
    return errorData; // Return errors for display in the form
  }

  if (!(await response).ok) {
    throw new Error("Could not Authentication the user");
  }

  const responseData = await response.json();   // get the body of response
  const token= responseData.token;
  localStorage.setItem("Token", token);


  const expiration= new Date();
  expiration.setHours(expiration.getHours + 1);
  localStorage.setItem("ExpirationHour", expiration.toISOString())

  return redirect("/");
}
