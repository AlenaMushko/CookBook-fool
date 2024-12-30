export class TransformHelper {
  public static trim(value) {
    return value ? value.trim() : value;
  }

  public static trimArray(value: string[]): string[] {
    return value && Array.isArray(value)
      ? value.map((item) => item.trim())
      : value;
  }

  public static uniqueItems(value: string[]): string[] {
    return value && Array.isArray(value) ? [...new Set(value)] : value;
  }
}
