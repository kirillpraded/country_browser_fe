import {Injectable} from "@angular/core";
import {ISignUpRequest} from "../models/request/user.registration";
import {ConfigService} from "./config.service";
import Joi from "joi";
import axios from "axios";
import {ISignInRequest} from "../models/request/user.signin";
import {ISignInResponse} from "../models/sign.in.response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private configService: ConfigService) {
  }


  async login(body: ISignInRequest) {
    try {
      return await axios.post<ISignInResponse>(`${this.configService.backendUrl}/api/v1/auth/login`, body)

    } catch (error) {
      return {
        status: 500,
        data: {
          token: '',
          email: ''
        }
      }
    }
  }

  async createUser(body: ISignUpRequest): Promise<number> {
    const validationSchema = Joi.object({
      email: Joi.string().email({tlds: {allow: false}}).max(50).required(),
      firstName: Joi.string().min(6).max(50).required(),
      lastName: Joi.string().min(6).max(50).required(),
      password: Joi.string().min(6).max(20).required(),
    })
    const validationResult = validationSchema.validate(body);

    if (validationResult.error) {
      throw new Error("validation failed");
    }

    const resp = await axios.post(`${this.configService.backendUrl}/api/v1/auth/signup`, body)
    return resp.status
  }
}
