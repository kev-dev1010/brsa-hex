// src/infrastructure/repositories/JsonUserRepository.ts

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { User } from '../../../core/domain/entities/user/User';
import { IUserRepository } from '../../../core/ports/out/IUserRepository';

export class JsonUserRepository implements IUserRepository {
  private readonly filePath: string;

  constructor() {
    this.filePath = resolve(__dirname, '..', '..', '..', '..', 'data', 'users.json');
    this.ensureDataFileExists();
  }

  private ensureDataFileExists(): void {
    try {
      readFileSync(this.filePath, 'utf-8');
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        writeFileSync(this.filePath, JSON.stringify([]), 'utf-8');
      } else {
        throw error;
      }
    }
  }

  async save(user: User): Promise<User> {
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.id === user.id);

    if (index !== -1) {
      // Atualiza o usuário existente
      users[index] = user;
    } else {
      // Adiciona um novo usuário
      users.push(user);
    }
    
    this.saveAllUsers(users);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const users = this.getAllUsers();
    const user = users.find(u => u.id === id);
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email);
    return user || null;
  }

  async findAll(): Promise<User[]> {
    // Simplesmente retorna todos os usuários do arquivo JSON.
    return this.getAllUsers();
  }

  async deleteById(id: string): Promise<void> {
    let users = this.getAllUsers();
    const initialLength = users.length;
    
    // Filtra a lista, mantendo apenas os usuários cujo ID não corresponde ao fornecido.
    users = users.filter(u => u.id !== id);

    // Se o tamanho da lista não mudou, o usuário não foi encontrado.
    if (users.length === initialLength) {
      // Embora o caso de uso já verifique, é uma boa prática ter essa segurança.
      throw new Error('Usuário não encontrado para exclusão.');
    }

    this.saveAllUsers(users);
  }

  private getAllUsers(): User[] {
    const data = readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  private saveAllUsers(users: User[]): void {
    writeFileSync(this.filePath, JSON.stringify(users, null, 2), 'utf-8');
  }
}