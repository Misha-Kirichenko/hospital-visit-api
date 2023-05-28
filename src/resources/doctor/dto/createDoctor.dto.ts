import {
  onlyAlphabetSymbols,
  validIdCard,
  validPhoneNumber,
  validSpecialization,
} from '@/utils/functions';
import { errMsg } from '@/common/constants';

const {
  invalidName,
  invalidSurname,
  invalidSpecialization,
  invalidIdCard,
  invalidPhoneFormat,
  invalidGrade,
} = errMsg;

export const createDoctorDto = {
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
  specialization: {
    msg: invalidSpecialization,
    required: true,
    validator: (specialization: string) => validSpecialization(specialization),
  },
  grade: {
    msg: invalidGrade,
    required: true,
    validator: (grade: string) =>
      grade === 'Associative professor' ||
      grade === 'Professor' ||
      grade === 'PhD',
  },
};
