function ZeroMatixValues(matrix: number[][], size: number): number[][] {
  const indices = getZeroIndicesFromMatrix(matrix);
  let updatedMatrix = [...matrix];

  for (let m = 0; m < indices.length; m++) {
    updatedMatrix = multipleByZero(updatedMatrix, size, indices[m]);
  }
  return updatedMatrix;
}

function getZeroIndicesFromMatrix(matrix: number[][]): number[][] {
  const indices = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        indices.push([i, j]);
      }
    }
  }
  return indices;
}

function multipleByZero(
  matrix: number[][],
  size: number,
  [rowIndex, colIndex]: number[]
): number[][] {
  let zeroedMatrix = [...matrix];
  for (let j = 0; j < size; j++) {
    zeroedMatrix[j][colIndex] = 0;
  }
  for (let j = 0; j < size; j++) {
    zeroedMatrix[rowIndex][j] = 0;
  }
  return zeroedMatrix;
}
