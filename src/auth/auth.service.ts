import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {} 
  async registerUser (registerPayload: RegisterDto) {
    try{
        const userEmail = await this.findEmail(registerPayload.email);

        if (userEmail) {
          throw new BadRequestException(
            'email already registered.',
          );
        }
        const createUser = this.userRepository.create(registerPayload);
  
        await this.userRepository.save(createUser);
  
        return createUser;
    }catch(e){
        throw new HttpException(
            e.message,
            e?.status || HttpStatus.BAD_REQUEST,
          )
    }
  }

  async findEmail(email: string) {
    try {
      return await this.userRepository.exists({ where: { email } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

}