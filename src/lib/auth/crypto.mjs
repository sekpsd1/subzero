import { randomBytes, scrypt, timingSafeEqual, createHmac } from 'node:crypto';
import { promisify } from 'node:util';
const derive = promisify(scrypt);
const options = { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 };
export const SESSION_SECONDS = 8 * 60 * 60;
export const REMEMBER_SECONDS = 30 * 24 * 60 * 60;
/** @param {string | null} remember */
export function sessionSeconds(remember) { return remember === 'on' ? REMEMBER_SECONDS : SESSION_SECONDS; }
export function randomToken() { return randomBytes(32).toString('hex'); }
/** @param {string} password */
export async function hashPassword(password) {
  if (password.length < 15 || Buffer.byteLength(password) > 256) throw new Error('Password must be at least 15 characters and at most 256 bytes.');
  const salt = randomBytes(16).toString('hex');
  const hash = await derive(password, salt, 64, options);
  return ['scrypt', 131072, 8, 1, salt, hash.toString('hex')].join('$');
}
/** @param {string} password @param {string} encoded */
export async function verifyPassword(password, encoded) {
  const parts = encoded.split('$');
  const valid = parts.length === 6 && parts.slice(0, 4).join('$') === 'scrypt$131072$8$1'
    && /^[a-f0-9]{32}$/.test(parts[4]) && /^[a-f0-9]{128}$/.test(parts[5]);
  const actual = await derive(password, valid ? parts[4] : '0'.repeat(32), 64, options);
  return timingSafeEqual(actual, Buffer.from(valid ? parts[5] : '0'.repeat(128), 'hex')) && valid;
}
/** @param {string} value */
export function digest(value) {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32 || secret.includes('replace-with')) throw new Error('AUTH_SECRET is not configured.');
  return createHmac('sha256', secret).update(value).digest('hex');
}
/** @param {string} role @param {string[]} roles */
export function roleAllowed(role, roles) { return roles.includes(role); }
/** @param {{expiresAt: Date, revokedAt: Date | null} | null} session @param {Date} [now] */
export function sessionActive(session, now = new Date()) {
  return !!session && !session.revokedAt && session.expiresAt > now;
}
