export const uppercase = (stringList: string[]) => {
  const uppercaseResults: string[] = [];

  stringList.forEach((sentence) => {
    const capitalizedWords: string[] = [];
    const splitWords = sentence.split(' ').filter((word) => word.length > 0);
    splitWords.forEach((word) => capitalizedWords.push(word.toUpperCase()));
    uppercaseResults.push(capitalizedWords.join(' '));
  });

  return uppercaseResults;
};
