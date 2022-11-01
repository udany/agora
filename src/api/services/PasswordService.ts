import bcrypt from 'bcrypt';

export const PasswordService = {
	async encrypt(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	},

	async compare(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}
}
