import { COUNTRIES } from '../constants/countries';
import { ICountry } from '../interfaces/country.interfaces';

const DOMAINS = COUNTRIES.reduce(
  (acc: any, country: any) => [...acc, ...country.topLevelDomain],
  [],
);
const getCountry = (code: string) => COUNTRIES.find((country: ICountry) => country.alpha3Code === code);

export { DOMAINS, COUNTRIES, getCountry };
