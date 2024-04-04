//Логика для управления действиями, связанными с пользователями.
// src/services/UserServices.ts

import { PrismaClient, user_status, user_role } from '@prisma/client';

const prisma = new PrismaClient();

class UserService {
  async getAllUsers() {
    return prisma.users.findMany();
  }

  async deleteUserById(userId: number) {
    // Найдем профиль пользователя по userId
    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
    });
    // Удаление всех связанных записей из таблицы Order
    await prisma.order.deleteMany({
      where: { userId: userId },
    });
    // Если профиль существует, удалим его
    if (profile) {
      await prisma.profile.delete({
        where: { id: profile.id },
      });
    }

    // Теперь удалим самого пользователя
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
