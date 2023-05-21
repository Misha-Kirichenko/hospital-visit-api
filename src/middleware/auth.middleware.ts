import jwt from 'jsonwebtoken';
import { Response, NextFunction, RequestHandler } from 'express';
import { Auth } from '@/utils/interfaces';

class AuthMiddleware {
  static verifyToken: RequestHandler = (
    req: Auth,
    res: Response,
    next: NextFunction
  ) => {
    const { headers } = req;

    if (!headers.authorization) {
      return res.status(400).send({ msg: 'No Authorization header passed' });
    }

    const [type, token] = headers.authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      return res
        .status(401)
        .json({ msg: 'Incorrect token or no token passed' });
    }
    try {
      const decoded = jwt.verify(token, `${process.env.TOKEY_KEY}`);
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({ msg: 'Invalid authorization info' });
    }
    return next();
  };

  static checkAccessRights = (rwdParam: string) => {
    return (req: Auth, res: Response, next: NextFunction) => {
      const { accessRights } = req.user;
      if (!accessRights.includes(rwdParam))
        return res.status(403).json({ msg: 'Invalid access rights' });
      return next();
    };
  };
}

export default AuthMiddleware;
