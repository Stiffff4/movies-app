export class ContentHelper {
  static getLanguageName(languagePrefix: string): string {
    const prefixes: { [key: string]: string } = {
      en: 'English',
      es: 'Spanish',
      zh: 'Chinese',
      ja: 'Japanese',
      ko: 'Korean',
      de: 'German',
      af: 'Afrikaans',
      pt: 'Portuguese',
      fr: 'French',
      it: 'Italian',
      cs: 'Czech',
      ru: 'Russian',
    };

    return prefixes[languagePrefix];
  }
}
