type LoginRequest = {
  username: string;
  password: string;
};
type LoginResponse = AuthUser;

type AuthUser = {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string | null;
};

export { LoginRequest, LoginResponse, AuthUser };
