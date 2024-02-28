export class EnvironmentHelper {
  static getVariableValue(name: string): string {
    const env = import.meta.env;
    let value: string = '';

    if (env[name]) value = env[name];

    return value;
  }
}
