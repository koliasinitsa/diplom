
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProfileServices {
    async getProfileByUserId(userId: number) {
        try {
            const profile = await prisma.profile.findUnique({
                where: { userId }
            });
            return profile;
        } catch (error) {
            throw new Error(`Error getting profile: ${error}`);
        }
    }

    async updateProfile(userId: number, profileData: any) {
        try {
            // Проверяем, существует ли профиль с данным userId
            const existingProfile = await prisma.profile.findUnique({
                where: { userId }
            });
    
            if (existingProfile) {
                // Если профиль существует, обновляем его данные
                const updatedProfile = await prisma.profile.update({
                    where: { userId },
                    data: profileData
                });
                return updatedProfile;
            } else {
                // Если профиля нет, создаем новый
                const newProfile = await prisma.profile.create({
                    data: {
                        ...profileData,
                        user: { connect: { id: userId } }
                    }
                });
                return newProfile;
            }
        } catch (error) {
            throw new Error(`Error creating or updating profile: ${error}`);
        }
    }
}

export default new ProfileServices();