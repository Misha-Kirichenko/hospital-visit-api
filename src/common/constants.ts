export const errMsg: { [key: string]: string } = {
  invalidName: `name can only contain Latin letters and must be at least 2 characters long`,
  invalidSurname: `surname can only contain Latin letters and must be at least 2 characters long`,
  invalidSpecialization: `specialization can only contain: Latin letters and '-' sign. And must be at least 6 characters long`,
  invalidIdCard: `idCardNumber must consist of 11 digits`,
  invalidPhoneFormat: `Invalid phoneNumber format. Only '5**-**-**-**' format is allowed`,
  invalidMongoObjectId: `Invalid MongoDb objectId`,
  invalidGrade: `Invalid grade`,
  invalidDate: `Invalid date`,
  invalidText: `Invalid complaints text. Only alphabet characters and puctuation marks allowed`,
};

export const TIME_OFFSET: number = 4;
export const VISIT_TIME: number = 45 * 60 * 1000;
export const START_HOUR: number = 10;
export const OFF_HOUR: number = 18;
