import {
  onlyAlphabetSymbols,
  validDateTime,
  validIdCard,
  validMongoObjectId,
  validPhoneNumber,
  validText,
} from '@/common/validations';
import { errMsg } from '@/common/constants';

const {
  invalidName,
  invalidSurname,
  invalidIdCard,
  invalidPhoneFormat,
  invalidDate,
  invalidText,
  invalidMongoObjectId,
} = errMsg;

export const createVisitDto = {
  name: {
    msg: invalidName,
    required: true,
    validator: (name: string) => onlyAlphabetSymbols(name),
  },
  surname: {
    msg: invalidSurname,
    required: true,
    validator: (surname: string) => onlyAlphabetSymbols(surname),
  },
  date: {
    msg: invalidDate,
    required: true,
    validator: (dateTime: string) => validDateTime(dateTime),
  },
  doctorId: {
    msg: invalidMongoObjectId,
    required: true,
    validator: (objectId: string) => validMongoObjectId(objectId),
  },
  idCardNumber: {
    msg: invalidIdCard,
    required: true,
    validator: (idCardNumber: string) => validIdCard(idCardNumber),
  },
  phoneNumber: {
    msg: invalidPhoneFormat,
    required: true,
    validator: (phoneNumber: string) => validPhoneNumber(phoneNumber),
  },
  complaints: {
    msg: invalidText,
    required: true,
    validator: (complaints: string) => validText(complaints),
  },
};
