// titles[0] - для 1, titles[1] - для 2, titles[2] - для 5
// пример - titles = ['ответ', 'ответа', 'ответов']
export default (number: number, titles: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};