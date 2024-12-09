import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

export const jwtDecode = (token: string) => jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY) as { ec: string };

export const decrypt = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
