import RNSimpleCrypto from 'react-native-simple-crypto';

export async function HashKey(message, key) {
  const convert_message = RNSimpleCrypto.utils.convertUtf8ToArrayBuffer(
    message,
  );

  const convert_key = RNSimpleCrypto.utils.convertUtf8ToArrayBuffer(key);

  const signatureArrayBuffer = await RNSimpleCrypto.HMAC.hmac256(
    convert_message,
    convert_key,
  );

  const hashKey = RNSimpleCrypto.utils.convertArrayBufferToHex(
    signatureArrayBuffer,
  );
  // console.log(hashKey);

  return hashKey;
}
