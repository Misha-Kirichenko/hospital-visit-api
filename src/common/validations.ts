export const onlyAlphabetSymbols = (initialString: string): boolean => {
  const regex = new RegExp(/^[a-z]{2,}$/i);
  return initialString ? regex.test(initialString) : false;
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
