export function urlDecodeBase64(str: string) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');

  while (str.length % 4) {
    str += '=';
  }

  const binaryString = atob(str);

  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  const decodedString = new TextDecoder().decode(uint8Array);

  return decodedString;
}
export function urlEncodeBase64(str: string) {
  const uint8Array = new TextEncoder().encode(str);

  let binaryString = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }

  const base64String = btoa(binaryString);

  return base64String
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
