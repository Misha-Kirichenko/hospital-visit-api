export const onlyAlphabetSymbols = (initialString: string): boolean => {
  const regex = new RegExp(/^[a-z]{2,}$/i);
  return initialString ? regex.test(initialString) : false;
};

export const validDateTime = (dateTime: string): boolean => {
  const regex = new RegExp(
    /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|1\d|2[0-8])|(19|20)\d\d-(0[13-9]|1[0-2])-(29|30)|(19|20)\d\d-(0[13578]|1[02])-31T(20|21|22|23|[0-1]\d):[0-5]\d$/
  );
  return regex.test(dateTime);
};

export const validText = (text: string): boolean => {
  const regex = new RegExp(/^[a-zA-Z\s.,'"!?]+$/);
  return regex.test(text);
};

export const validMongoObjectId = (objectId: string): boolean => {
  const regex = new RegExp(/^[0-9a-fA-F]{24}$/);
  return regex.test(objectId);
};

export const validSpecialization = (specialization: string): boolean => {
  const regex = new RegExp(/^[a-z\-]{6,}$/i);
  return specialization ? regex.test(specialization) : false;
};

export const validIdCard = (cardNumber: string): boolean => {
  const regex = new RegExp(/^[0-9]{11}$/);
  return regex.test(cardNumber);
};

export const validPhoneNumber = (phoneNumber: string): boolean => {
  //georgian mobile phone format
  const regex = new RegExp(/^5[0-9]{2}\-[0-9]{2}\-[0-9]{2}\-[0-9]{2}$/);
  return regex.test(phoneNumber);
};
