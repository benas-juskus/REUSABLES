import { randomBytes } from 'crypto';
const crypto = require('crypto')


const createToken = (expiresIn: number) => {

    const expirationTimestamp = Math.floor(Date.now() / 1000) + expiresIn;

    const payload = {
        exp: expirationTimestamp
    };
    const serializedPayload = JSON.stringify(payload);
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cypher = crypto.createCipheriv( 'aes-256-cbc', key, iv);
    let encryptedPayload = cypher.update(serializedPayload, 'utf8', 'hex');
    encryptedPayload += cypher.final('hex');

    return encryptedPayload
}

module.exports = createToken