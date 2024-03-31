// check if the given string is the permutation of a palindrome

function isPermPalindrome(str: string): boolean {
  const cleanedStr = str.toLowerCase().replace(/ /g, "");
  if (cleanedStr.length === 0) return false;
  const obj: { [key: string]: number } = {};

  for (let i = 0; i < cleanedStr.length; i++) {
    if (obj[cleanedStr[i]]) {
      obj[cleanedStr[i]] += 1;
    } else {
      obj[cleanedStr[i]] = 1;
    }
  }

  let repeatedCharCount = 0;
  let uniqueCharCount = 0;

  for (const element of Object.values(obj)) {
    if (element === 1 && uniqueCharCount > 0) {
      return false;
    } else if (element === 1) {
      uniqueCharCount += 1;
    } else if (element > 1 && repeatedCharCount === 0) {
      repeatedCharCount = element;
    } else if (element > 1 && element !== repeatedCharCount) {
      return false;
    }
  }
  return true;
}

// console.log(isPermPalindrome("sbc"));
console.log(isPermPalindrome("Tact coa"));
