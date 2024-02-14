import { TokenPayload } from '@/types';
import jwt from 'jsonwebtoken';


export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.TOKEN_SECRET as string, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.TOKEN_SECRET as string) as TokenPayload;
};
