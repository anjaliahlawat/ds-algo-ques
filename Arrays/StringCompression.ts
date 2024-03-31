// compress string
// i/p -> aabbbccccaa
// o/p -> a2b3c4a2

function generateCompressedStr(obj: { [key: string]: number }): string {
  let compressedStr = "";
  for (const [key, value] of Object.entries(obj)) {
    compressedStr += key + value;
  }
  return compressedStr;
}

function compressStr(str: string): string {
  let count = 0;

  let obj: { [key: string]: number } = {};
  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]]) {
      obj[str[i]] += 1;
    } else {
      obj[str[i]] = 1;
    }
  }
  return generateCompressedStr(obj);
}

console.log(compressStr("aabbbccccaa"));
