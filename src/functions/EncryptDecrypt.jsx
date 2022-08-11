import CryptoJS from "crypto-js";

export const encryptData = (info) => {
  const encryptedInfo = CryptoJS.AES.encrypt(
    JSON.stringify(info),
    import.meta.env.VITE_URL_PASSWORD_ENCRYPT
  ).toString();
  return encryptedInfo;
};

export const decryptData = (hash) => {
  const bytes = CryptoJS.AES.decrypt(
    hash,
    import.meta.env.VITE_URL_PASSWORD_ENCRYPT
  );
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
