export interface IWelcomePhrase {
  _id: string;
  name: string;
  lastName: string;
  country: string;
  flag: string;
  slogan: {
    isRequired: boolean;
    content: string;
  };
}
