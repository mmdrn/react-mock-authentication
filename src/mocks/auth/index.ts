import { HttpResponse, http } from "msw";
import { LoginResponseBody, User } from "./types";
import { v4 as uuidv4 } from "uuid";
import { BasicResponse } from "../types";

const users: User[] = [
  {
    id: uuidv4(),
    username: "mohammadrn",
    password: "12345678",
    firstName: "Mohammad",
    lastName: "Ranaei",
    token: null,
  },
  {
    id: uuidv4(),
    username: "user1",
    password: "12345678",
    firstName: "Pouya",
    lastName: "Azar Pour",
    token: null,
  },
];

const loginHandler = http.post("/api/signin", async ({ request }) => {
  const formData = await request.formData();

  const validation: any = {};

  if (!formData.get("username")) {
    validation["username"] = "Username is required.";
  }

  if (!formData.get("password")) {
    validation["password"] = "Password is required.";
  }

  if (Object.keys(validation).length) {
    return HttpResponse.json<Response & any>({
      success: false,
      message: "Operation failed.",
      validation,
    });
  }

  const user = users.find(
    (i) =>
      i.username === formData.get("username") &&
      i.password === formData.get("password")
  );

  if (!user) {
    return HttpResponse.json<BasicResponse>(
      {
        success: false,
        message: "Username or password is wrong.",
      },
      {
        status: 401,
      }
    );
  }

  user.token = uuidv4();

  return HttpResponse.json<LoginResponseBody>(
    {
      success: true,
      user,
    },
    {
      status: 200,
    }
  );
});

const getAuthUserHandelr = http.get("/api/getAuthUser", async ({ request }) => {
  const validation: any = {};

  if (!request.headers.get("Authorization")) {
    validation["token"] = "Token is required.";
  }

  if (Object.keys(validation).length) {
    return HttpResponse.json<Response & any>({
      success: false,
      message: "Operation failed.",
      validation,
    });
  }

  const user = users.find(
    (i) => i.token === request.headers.get("Authorization")?.split("Bearer ")[1]
  );

  if (!user) {
    return HttpResponse.json<BasicResponse>(
      {
        success: false,
        message: "User not found.",
      },
      {
        status: 401,
      }
    );
  }

  return HttpResponse.json<LoginResponseBody>(
    {
      success: true,
      user,
    },
    {
      status: 200,
    }
  );
});

export const handlers = [loginHandler, getAuthUserHandelr];
