import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';
import { QubicHelper } from 'qubic-ts-library/dist/qubicHelper';

// Define the hexToBase26 function
const hexToBase26 = (hex: string): string => {
  const base26Chars = 'abcdefghijklmnopqrstuvwxyz';
  let base26 = '';

  for (let i = 0; i < hex.length; i += 2) {
    const hexByte = hex.substr(i, 2);
    const decimalValue = parseInt(hexByte, 16);
    base26 += base26Chars[decimalValue % 26];
  }

  return base26;
};

export const generateKeyPair = async (accountIndex: number) => {
  const qHelper = new QubicHelper();
  const coinType = 83293; // 1 for testing

  // Get the BIP44 node
  const bip44Node = await snap.request({
    method: 'snap_getBip44Entropy',
    params: { coinType },
  });

  const deriveAccountAddress = await getBIP44AddressKeyDeriver(bip44Node);
  // Derive the new account, index starts with 0
  const newAccount = await deriveAccountAddress(accountIndex);
  // Convert the private key to base26
  const privateKeyBase26 = hexToBase26(newAccount.privateKey).padStart(55, 'z'); // pad to 55 characters
  // use QubicHelper to get public key
  const idPack = await qHelper.createIdPackage(privateKeyBase26);

  return {
    privateKey: privateKeyBase26,
    publicId: idPack.publicId,
  };
};