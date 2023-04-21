export interface ILanguage {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName?: string;
}

export interface ICountry {
  name: string;
  nativeName: string;
  alpha2Code: string;
  alpha3Code: string;
  flag: string;
}
