// check if the given string is the permutation of a palindrome

export function isPermPalindrome(str: string): boolean {
  if (str.length === 0) return false;
  const obj = {};

  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]]) {
      obj[str[i]] += 1;
    } else {
      obj[str[i]] = 1;
    }
  }
  return true;
}
