export class StringHelper {
  static capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
