import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const jwtDecode = (token: string) => jwt.decode(token) as { ec: string; id: string } | null;

export const decrypt = (data: string) => {
  try {
    const algorithm = 'aes-256-ccm';
    const key = process.env.NEXT_PUBLIC_SECRET_KEY;

    const [nonceHex, authTagHex, encryptedText] = data.split(':');
    const nonce = Buffer.from(nonceHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'utf-8'), nonce, { authTagLength: 16 });

    decipher.setAuthTag(authTag);

    const decrypted = decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8');

    return JSON.parse(decrypted) as { name: string; avatar: string; email: string };
  } catch {
    return null;
  }
};
