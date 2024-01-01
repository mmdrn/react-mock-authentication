type LoginRequest = {
  username: string;
  password: string;
};
type LoginResponse = {
  token: string;
  status: boolean;
};

export { LoginRequest, LoginResponse };
