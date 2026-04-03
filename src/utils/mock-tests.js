export function getMockTestStatus(test) {
  const now = new Date();
  const start = new Date(test.startDate);
  const end = new Date(test.endDate);

  if (now < start) return 'upcoming';
  if (now > end) return 'previous';
  return 'live';
}

export function getUpcomingMockTests(mockTests = []) {
  return mockTests
    .filter((test) => getMockTestStatus(test) === 'upcoming')
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

export function getPreviousMockTests(mockTests = []) {
  return mockTests
    .filter((test) => getMockTestStatus(test) === 'previous')
    .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
}

export function getLiveMockTests(mockTests = []) {
  return mockTests
    .filter((test) => getMockTestStatus(test) === 'live')
    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
}

export function evaluateMockTest(test, answers) {
  const total = test.questions.length;
  let correct = 0;

  test.questions.forEach((q) => {
    if (answers[q.id] === q.correctAnswer) correct += 1;
  });

  const score = Math.round((correct / Math.max(total, 1)) * 100);
  return { total, correct, wrong: total - correct, score };
}
