import type { Bakery, BakeryWithAverage } from '../types/bakery';

/**
 * Calculate the average score for a bakery across all scoring criteria
 * Only includes scores that are not null
 */
export function calculateAverageScore(bakery: Bakery): number {
  const scores = [
    bakery.quality_score,
    bakery.pricing_score,
    bakery.variety_score,
    bakery.location_score,
  ].filter((score): score is number => score !== null);

  if (scores.length === 0) return 0;

  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Math.round((sum / scores.length) * 10) / 10; // Round to 1 decimal place
}

/**
 * Add average score to a bakery object
 */
export function addAverageScore(bakery: Bakery): BakeryWithAverage {
  return {
    ...bakery,
    average_score: calculateAverageScore(bakery),
  };
}

/**
 * Add average scores to an array of bakeries
 */
export function addAverageScores(bakeries: Bakery[]): BakeryWithAverage[] {
  return bakeries.map(addAverageScore);
}
