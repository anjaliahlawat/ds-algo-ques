// compress string
// i/p -> aabbbccccaa
// o/p -> a2b3c4a2

function compressStr(str: string): string {
  let updatedStr = "";
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    if (i > 0 && str[i] === str[i - 1]) {
      count++;
    } else {
      updatedStr += str[i - 1] + count;
      count = 1;
    }
  }
  return updatedStr;
}

console.log(compressStr("aabbbccccaa"));
