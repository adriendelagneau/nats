'use server'

import User, { TUsers } from "@/lib/models/User"

export const updateUserStatus = async (email: string, subscriptionNumber: string) => {
    try {
        // Use the { new: true } option to return the updated document
        const updatedUser: TUsers | null = await User.findOneAndUpdate(
            { email },
            {
                isSubscribe: true,
                subscriptionNumber: subscriptionNumber,
            },
            { new: true }
        );

        if (updatedUser) {
            console.log('User status updated successfully:', updatedUser);
        } else {
            console.error('User not found with the specified email:', email);
        }
    } catch (err) {
        console.error('Error updating user status:', err);
    }
};