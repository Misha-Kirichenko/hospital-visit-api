import {
  onlyAlphabetSymbols,
  validIdCard,
  validPhoneNumber,
  validSpecialization,
} from '@/common/validations';
import { errMsg } from '@/common/constants';

const {
  invalidName,
  invalidSurname,
  invalidSpecialization,
  invalidIdCard,
  invalidGrade,
  invalidPhoneFormat,
} = errMsg;

export const updateDoctorDto = {
  name: {
    msg: invalidName,
    validator: (name: string) => onlyAlphabetSymbols(name),
  },
  surname: {
    msg: invalidSurname,
    validator: (surname: string) => onlyAlphabetSymbols(surname),
  },
  specialization: {
    msg: invalidSpecialization,
    validator: (specialization: string) => validSpecialization(specialization),
  },
  phoneNumber: {
    msg: invalidPhoneFormat,
    validator: (phoneNumber: string) => validPhoneNumber(phoneNumber),
  },
  idCardNumber: {
    msg: invalidIdCard,
    validator: (idCardNumber: string) => validIdCard(idCardNumber),
  },
  grade: {
    msg: invalidGrade,
    validator: (grade: string) =>
      grade === 'Associative professor' ||
      grade === 'Professor' ||
      grade === 'PhD',
  },
};
