import { SignInData, SignUpData, User, UserToken } from "@types";
import { apiBasename } from ".";
import { redirect, useNavigate } from "react-router";

interface ErrorResponse {
  msg: string;
  code?: number;
}

export async function sign_in(data: SignInData): Promise<void> {
  const res = await fetch(`${apiBasename}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg: ErrorResponse = await res.json();
    throw new Error(msg.msg);
  }
  const userToken: UserToken = await res.json();
  // After receiving the token from sign_in:
  localStorage.setItem("userToken", userToken.token);
}

export async function sign_up(data: SignUpData): Promise<User> {
  const res = await fetch(`${apiBasename}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg: ErrorResponse = await res.json();
    throw new Error(msg.msg);
  }
  return await res.json();
}
