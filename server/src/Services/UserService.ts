//Логика для управления действиями, связанными с пользователями.
// src/services/UserServices.ts

import { PrismaClient, user_status, user_role } from '@prisma/client';

const prisma = new PrismaClient();

class UserService {
  async getAllUsers() {
    return prisma.users.findMany();
  }

  async deleteUserById(userId: number) {
    return prisma.users.delete({
      where: { id: userId },
    });
  }

  async blockUserById(userId: number) {
    return prisma.users.update({
      where: { id: userId },
      data: { status: user_status.blocked },
    });
  }

  async unblockUserById(userId: number) {
    return prisma.users.update({
      where: { id: userId },
      data: { status: user_status.active },
    });
  }

  async addAdmin(userId: number) {
    return prisma.users.update({
      where: { id: userId },
      data: { role: user_role.admin },
    });
  }

  async removeAdmin(userId: number) {
    return prisma.users.update({
      where: { id: userId },
      data: { role: user_role.user },
    });
  }
}

export default new UserService();
