/**
 * Builds an email that is unique across test runs so registrations do not
 * collide with accounts created earlier.
 */
export function uniqueEmail(prefix = "copilot.test"): string {
  return `${prefix}.${Date.now()}@example.com`;
}
