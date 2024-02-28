
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

    async createProfile(userId: number, profileData: any) {
        try {
            const profile = await prisma.profile.create({
                data: {
                    ...profileData,
                    date_birth: new Date(profileData.date_birth),
                    user: { connect: { id: userId } }
                }
            });
            return profile;
        } catch (error) {
            throw new Error(`Error creating profile: ${error}`);
        }
    }

    async updateProfile(userId: number, updatedProfileData: any) {
        try {
            const profile = await prisma.profile.update({
                where: { userId },
                data: updatedProfileData
            });
            return profile;
        } catch (error) {
            throw new Error(`Error updating profile: ${error}`);
        }
    }
}

export default new ProfileServices();