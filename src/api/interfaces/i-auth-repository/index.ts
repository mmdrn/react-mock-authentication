import { LoginRequest, LoginResponse } from "./types";

export default interface IAuthRepository {
  readonly resource: string;

  /**
   * Performs a login operation.
   *
   * @param {LoginRequest} data - The login credentials.
   * @returns {Promise<LoginResponse>} A promise that resolves to the response of the login operation.
   */
  login(data: LoginRequest): Promise<LoginResponse>;
}
