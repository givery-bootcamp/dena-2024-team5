export function dateFormatString2DateJa(dateString: string): string {
  return new Date(dateString).toLocaleString("ja");
}
