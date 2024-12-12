import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

export const jwtDecode = (token: string) => jwt.decode(token) as { ec: string; id: string } | null;

export const decrypt = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as { name: string; avatar: string; email: string };
};
