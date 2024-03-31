// rotate matrix NXN by 90 degree
// [[1,2,3], [4,5,6], [7,8,9]] => [[7,4,1], [8,5,2], [9,6,3]]

function rotateMatrix(matrix: number[][], size: number): number[][] {
  const result = [];

  for (let i = 0; i < size; i++) {
    result.push(getRowFromMatrix(i, matrix, size));
  }

  return result;
}

function getRowFromMatrix(
  index: number,
  matrix: number[][],
  size: number,
): number[] {
  const result = [];
  for (let i = 0; i < size; i++) {
    result.push(matrix[size - 1 - i][index]);
  }
  return result;
}

console.log(
  rotateMatrix(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    3,
  ),
);
