// Import necessary modules and dependencies
import ContactFormEmail from "@/emails/contact-form-email";
import {dbConnect} from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { registerSchema } from "@/lib/zod/schema";
import { TRegisterSchema } from "@/types";
import { generateToken, verifyToken } from "@/utils/token";
import bcrypt from "bcryptjs";
import { Resend } from 'resend';

// Define the base URL for email verification link
const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

// Check if a user with a given email already exists
export const findUserByEmail = async (data: string) => {
    await dbConnect();

    const validationResult = registerSchema.safeParse(data);
    if (!validationResult.success) {
        return { error: "Validation error", validationErrors: validationResult.error.errors };
    }

    try {
        const userExist = await User.findOne({ email: validationResult.data });
        return userExist ? true : false;
    } catch (err) {
        return { error: 'Failed to check if the user exists.' };
    }
};

// Register a new user with the provided credentials
export const registerWithCredential = async (data: TRegisterSchema) => {
    await dbConnect();
    const validationResult = registerSchema.safeParse(data);
    if (!validationResult.success) {
        return { error: "Validation error", validationErrors: validationResult.error.errors };
    }

    try {
        // Hash the user's password
        const hashedPassword = await bcrypt.hash(validationResult.data.password, 10);

        // Generate a verification token
        const token = generateToken({ user: { ...validationResult.data, password: hashedPassword } });

        // Initialize Resend instance with API key
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Compose email details
        const message = "hello world";
        const name = validationResult.data.name;
        const email = validationResult.data.email;
        const url = `${BASE_URL}/verify_email?token=${token}`;

        // Send verification email
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [email],
            subject: 'Contact form submission',
            text: `Name: ${name}\nEmail: ${data.email}\nMessage: ${message}`,
            react: ContactFormEmail({ email, url })
        });

        return { msg: "Verification mail has been sent" };
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong during registration."};
    }
};

// Verify the user's email based on the provided token
export const verifyEmail = async (token: string) => {
    await dbConnect();

    try {
        // Decode the token to get user information
        const { user } = verifyToken(token);
     
        // Check if the user already exists
        const userExist = await User.findOne({ email: user.email });
        
        if (userExist) {
            return { msg: "Verification successful! User already exists." };
        }

        // If user doesn't exist, create a new user
        const newUser = new User(user);
        await newUser.save();

        return { msg: "Verification successful! New user created." };
    } catch (err) {
        return { error: err };
    }
};
