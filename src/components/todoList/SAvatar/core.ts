export function getUserFirstName(name: string) {
  if (!name) {
    return 'U';
  }
  return name[0].toUpperCase();
}
