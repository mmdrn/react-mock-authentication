import IAuthRepository from "../interfaces/i-auth-repository";
import {
  LoginRequest,
  LoginResponse,
} from "../interfaces/i-auth-repository/types";

export default class AuthRepository implements IAuthRepository {
  private static instance: AuthRepository;
  readonly resource: string = "auth";

  /**
   * Returns the singleton instance of the ProductRepository class.
   *
   * @static
   * @returns {AuthRepository} The singleton instance.
   */
  static getInstance(): AuthRepository {
    if (!AuthRepository.instance) {
      AuthRepository.instance = new AuthRepository();
    }

    return AuthRepository.instance;
  }

  login(data: LoginRequest): Promise<LoginResponse> {
    throw new Error("Method not implemented.");
  }
}
