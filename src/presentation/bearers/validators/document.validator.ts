export default function validateDocument(document: string): boolean {
  const documentPatternInvalid = checkInvalidPatterns(document);

  return !documentPatternInvalid && checkSum(document);
}

function checkInvalidPatterns(document: string) {
  const invalidPatterns: string[] = [];
  for (let i = 0; i < 10; i++) {
    invalidPatterns.push(i.toString().repeat(11));
  }
  return invalidPatterns.includes(document);
}

function checkRest(rest: number, validatorDigit: number) {
  if (rest < 2) {
    return validatorDigit === 0;
  }
  return validatorDigit === 11 - rest;
}

function checkSum(document: string) {
  const firstRange = 11 - 2;
  const secondRange = 11 - 1;

  const firstRest = checkDocumentPart(document, firstRange);
  const secondRest = checkDocumentPart(document, secondRange);

  const firstCheckDigit = parseInt(document[firstRange]);
  const secondCheckDigit = parseInt(document[secondRange]);

  const validationResultFirstPart = checkRest(firstRest, firstCheckDigit);
  const validationResultSecondPart = checkRest(secondRest, secondCheckDigit);

  return validationResultFirstPart && validationResultSecondPart;
}

function checkDocumentPart(document: string, lastCharacter: number) {
  const sum = document
    .split('')
    .slice(0, lastCharacter)
    .map(
      (alg: string, idx: number) => parseInt(alg) * (lastCharacter + 1 - idx),
    )
    .reduce((acc, curr) => acc + curr);
  return sum % 11;
}
