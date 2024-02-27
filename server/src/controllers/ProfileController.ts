
import { Request, Response } from 'express';
import ProfileServices from '../Services/ProfileServices';


export async function getProfile(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    try {
        const profile = await ProfileServices.getProfileByUserId(userId);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get profile' });
    }
}


export async function createProfile(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    const profileData = req.body;
    try {
        const profile = await ProfileServices.createProfile(userId, profileData);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create profile' });
    }
}

export async function updateProfile(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    const updatedProfileData = req.body;
    try {
        const profile = await ProfileServices.updateProfile(userId, updatedProfileData);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
}
