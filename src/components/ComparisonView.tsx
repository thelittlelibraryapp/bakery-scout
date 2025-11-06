import { useState } from 'react';
import type { BakeryWithAverage } from '../types/bakery';
import StarRating from './StarRating';

interface ComparisonViewProps {
  bakeries: BakeryWithAverage[];
}

export default function ComparisonView({ bakeries }: ComparisonViewProps) {
  const [bakery1Id, setBakery1Id] = useState<string>('');
  const [bakery2Id, setBakery2Id] = useState<string>('');

  const bakery1 = bakeries.find((b) => b.id === bakery1Id);
  const bakery2 = bakeries.find((b) => b.id === bakery2Id);

  if (bakeries.length < 2) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Not enough bakeries to compare
        </h3>
        <p className="text-gray-600">
          Add at least 2 bakeries to use the comparison feature.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dropdowns */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Select Bakeries to Compare
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bakery1" className="block text-sm font-medium text-gray-700 mb-2">
              Bakery 1
            </label>
            <select
              id="bakery1"
              value={bakery1Id}
              onChange={(e) => setBakery1Id(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a bakery...</option>
              {bakeries.map((bakery) => (
                <option key={bakery.id} value={bakery.id} disabled={bakery.id === bakery2Id}>
                  {bakery.name} ({bakery.average_score.toFixed(1)} ★)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="bakery2" className="block text-sm font-medium text-gray-700 mb-2">
              Bakery 2
            </label>
            <select
              id="bakery2"
              value={bakery2Id}
              onChange={(e) => setBakery2Id(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a bakery...</option>
              {bakeries.map((bakery) => (
                <option key={bakery.id} value={bakery.id} disabled={bakery.id === bakery1Id}>
                  {bakery.name} ({bakery.average_score.toFixed(1)} ★)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      {bakery1 && bakery2 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Criteria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {bakery1.name}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {bakery2.name}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Overall Average */}
                <tr className="bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                    Overall Average
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-2xl font-bold ${
                      bakery1.average_score > bakery2.average_score ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {bakery1.average_score.toFixed(1)} / 5.0
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-2xl font-bold ${
                      bakery2.average_score > bakery1.average_score ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {bakery2.average_score.toFixed(1)} / 5.0
                    </span>
                  </td>
                </tr>

                {/* Quality */}
                <ComparisonRow
                  label="Product Quality"
                  score1={bakery1.quality_score}
                  score2={bakery2.quality_score}
                />

                {/* Pricing */}
                <ComparisonRow
                  label="Pricing"
                  score1={bakery1.pricing_score}
                  score2={bakery2.pricing_score}
                />

                {/* Variety */}
                <ComparisonRow
                  label="Product Variety"
                  score1={bakery1.variety_score}
                  score2={bakery2.variety_score}
                />

                {/* Location */}
                <ComparisonRow
                  label="Location Convenience"
                  score1={bakery1.location_score}
                  score2={bakery2.location_score}
                />

                {/* Contact Info */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    Address
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {bakery1.address || '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {bakery2.address || '—'}
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    Phone
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {bakery1.phone ? (
                      <a href={`tel:${bakery1.phone}`} className="text-blue-600 hover:underline">
                        {bakery1.phone}
                      </a>
                    ) : '—'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {bakery2.phone ? (
                      <a href={`tel:${bakery2.phone}`} className="text-blue-600 hover:underline">
                        {bakery2.phone}
                      </a>
                    ) : '—'}
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    Website
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {bakery1.website ? (
                      <a
                        href={bakery1.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit site →
                      </a>
                    ) : '—'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {bakery2.website ? (
                      <a
                        href={bakery2.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit site →
                      </a>
                    ) : '—'}
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 align-top font-medium text-gray-900">
                    Notes
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {bakery1.notes || '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {bakery2.notes || '—'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for score comparison rows
function ComparisonRow({
  label,
  score1,
  score2,
}: {
  label: string;
  score1: number | null;
  score2: number | null;
}) {
  const getWinnerClass = (current: number | null, other: number | null) => {
    if (current === null || other === null) return '';
    return current > other ? 'bg-green-50' : '';
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
        {label}
      </td>
      <td className={`px-6 py-4 ${getWinnerClass(score1, score2)}`}>
        <StarRating value={score1} readonly />
      </td>
      <td className={`px-6 py-4 ${getWinnerClass(score2, score1)}`}>
        <StarRating value={score2} readonly />
      </td>
    </tr>
  );
}
