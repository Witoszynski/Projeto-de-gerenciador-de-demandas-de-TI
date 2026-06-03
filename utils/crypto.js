const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-change-in-production-64bit';

// Garantir que a chave tem 8 bytes (64 bits) para DES
function normalizeKey(key) {
  return key.substring(0, 8).padEnd(8, '0');
}

// Primeira camada de encriptação DES
function encryptDESOnce(data, key) {
  const normalizedKey = normalizeKey(key);
  const cipher = crypto.createCipheriv('des-cbc', normalizedKey, '12345678');
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Segunda camada de encriptação DES
function decryptDESOnce(encryptedData, key) {
  const normalizedKey = normalizeKey(key);
  const decipher = crypto.createDecipheriv('des-cbc', normalizedKey, '12345678');
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Double DES: Encriptar duas vezes
function encryptDoubleDES(data, key) {
  if (!data) return data;
  const firstEncryption = encryptDESOnce(data, key);
  const secondEncryption = encryptDESOnce(firstEncryption, key + '2');
  return secondEncryption;
}

// Double DES: Desencriptar duas vezes (ordem inversa)
function decryptDoubleDES(encryptedData, key) {
  if (!encryptedData) return encryptedData;
  try {
    const firstDecryption = decryptDESOnce(encryptedData, key + '2');
    const secondDecryption = decryptDESOnce(firstDecryption, key);
    return secondDecryption;
  } catch (err) {
    console.error('Erro ao descriptografar:', err.message);
    return null;
  }
}

// Hash de senha com bcrypt
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Verificar password contra hash
async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = {
  encryptDoubleDES,
  decryptDoubleDES,
  hashPassword,
  verifyPassword,
  encryptDESOnce,
  decryptDESOnce
};
