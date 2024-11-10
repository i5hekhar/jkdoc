import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
    private readonly algorithm = 'aes-256-cbc';
    private readonly key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // 32 bytes for AES-256

    // Encrypt function
    encrypt(text: string): string {
        // Generate a random IV each time for stronger security
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // Return the IV and encrypted data separated by a colon
        return `${iv.toString('hex')}:${encrypted}`;
    }

    // Decrypt function
    decrypt(encryptedText: string): string {
        // Split the IV and encrypted text
        const [ivHex, encrypted] = encryptedText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
