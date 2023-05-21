import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminModel from '@/resources/admin/admin.model';

class AdminService {
  private admin = AdminModel;

  private generateToken(tokenParams: {
    id: string;
    email: string;
    accessRights: string[];
  }) {
    const token = jwt.sign(tokenParams, `${process.env.TOKEY_KEY}`, {
      expiresIn: '24h',
    });
    return token;
  }

  public async login(
    email: string,
    password: string
  ): Promise<{ token: string } | void> {
    try {
      const foundAccount = await this.admin.findOne({ email });

      if (!foundAccount) throw new Error('Account was not found');

      const passwordsMatch = await bcrypt.compare(
        password,
        foundAccount.password
      );

      if (passwordsMatch) {
        const { _id: id, email, accessRights } = foundAccount;
        const token = this.generateToken({ id, email, accessRights });
        return { token };
      }

      throw new Error('Invalid password');
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
}

export default AdminService;
