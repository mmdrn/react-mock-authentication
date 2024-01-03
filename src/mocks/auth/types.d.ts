import type { BasicResponse } from "../types";

// general types
type User = {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string | null;
};

// method types
type LoginResponseBody = BasicResponse & {
  user: User;
};

export { User, LoginResponseBody };
