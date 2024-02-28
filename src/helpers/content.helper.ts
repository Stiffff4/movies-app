import { Status } from '../enums/tvshow.enum';

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

  static getStatusIconName(status: string): string {
    switch (status) {
      case Status.Returning:
        return 'calendar plus outline';
      case Status.Ended:
        return 'calendar check outline';
      case Status.Canceled:
        return 'calendar minus outline';
      default:
        return 'calendar check outline';
    }
  }
}
