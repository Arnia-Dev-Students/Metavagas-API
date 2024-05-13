import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tecnology } from '../entities/tecnology.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable() 
export class TecnologiaService {
  constructor(
    @InjectRepository(Tecnology)
    private tecnologiaRepository: Repository<Tecnology>,
  ) {}

  // apartir daqui getAll, getById, create,update e delete
}
