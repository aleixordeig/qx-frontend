export function getAssetUrl(name: string): string {
    const baseUrl = 'http://dev.qubic.at:8080/api/service/v1/qx/issuer';
    const issuerMap: Record<string, string> = {
      QFT: 'TFUYVBXYIYBVTEMJHAJGEJOOZHJBQFVQLTBBKMEHPEVIZFXZRPEYFUWGTIWG',
      CFB: 'CFBMEMZOIDEXQAUXYYSZIURADQLAPWPMNJXQSNVQZAHYVOPYUKKJBJUCTVJL',
      QWALLET: 'QWALLETSGQVAGBHUCVVXWZXMBKQBPQQSHRYKZGEJWFVNUFCEDDPRMKTAUVHA',
    };
  
    const issuer = issuerMap[name] || 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFXIB';
    return `${baseUrl}/${issuer}/asset/${name}/orders/ask`;
  }