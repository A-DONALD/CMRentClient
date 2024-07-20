// REGEX for User Name (4 to 24 letter, first letter Uppercase, underscore authorized)
export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// REGEX for password (8 to 24 letter, letter, number and -_!@#$% are allowed as special character)
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// REGEX for Email (name@server.domain)
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// CLient Roles list
export const ROLES = { 'User': 2001, 'Editor': 1984, 'Admin': 5150 };