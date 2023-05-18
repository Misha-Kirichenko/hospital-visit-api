import { Request, Response, NextFunction, RequestHandler } from 'express';
import {
  onlyAlphabetSymbols,
  validIdCard,
  validPhoneNumber,
} from '@/common/validations';
import { errMsg } from '@/common/constants';

const validateDoctor: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response<string[]> => {
  const errors: string[] = [];
  const { name, surname, specialization, idCardNumber, phoneNumber } = req.body;
  
  if (!onlyAlphabetSymbols(name)) {
    errors.push(errMsg.invalidName);
  }

  if (!onlyAlphabetSymbols(surname)) {
    errors.push(errMsg.invalidSurname);
  }

  if (!onlyAlphabetSymbols(specialization)) {
    errors.push(errMsg.invalidSpecialization);
  }

  if (!validIdCard(idCardNumber)) {
    errors.push(errMsg.invalidIdCard);
  }

  if (!validPhoneNumber(phoneNumber)) {
    errors.push(errMsg.invalidPhoneFormat);
  }

  if (!errors.length) return next();
  return res.status(422).json({ errors });
};

export default validateDoctor;
