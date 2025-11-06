import type { BakeryWithAverage } from '../types/bakery';
import StarRating from './StarRating';

interface BakeryCardProps {
  bakery: BakeryWithAverage;
  onEdit: (bakery: BakeryWithAverage) => void;
  onDelete: (id: string) => void;
}

export default function BakeryCard({ bakery, onEdit, onDelete }: BakeryCardProps) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${bakery.name}"?`)) {
      onDelete(bakery.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Header with name and average score */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{bakery.name}</h3>
          {bakery.average_score > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold text-blue-600">
                {bakery.average_score.toFixed(1)}
              </span>
              <span className="text-sm text-gray-600">/ 5.0 average</span>
            </div>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4 text-sm">
        {bakery.address && (
          <div className="flex items-start gap-2">
            <span className="text-gray-500">📍</span>
            <span className="text-gray-700">{bakery.address}</span>
          </div>
        )}
        {bakery.phone && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">📞</span>
            <a href={`tel:${bakery.phone}`} className="text-blue-600 hover:underline">
              {bakery.phone}
            </a>
          </div>
        )}
        {bakery.website && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">🌐</span>
            <a
              href={bakery.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate"
            >
              {bakery.website}
            </a>
          </div>
        )}
      </div>

      {/* Notes */}
      {bakery.notes && (
        <div className="mb-4 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
          <p className="text-sm text-gray-700 italic">{bakery.notes}</p>
        </div>
      )}

      {/* Scores */}
      <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Ratings:</h4>
        <StarRating
          label="Quality"
          value={bakery.quality_score}
          readonly
        />
        <StarRating
          label="Pricing"
          value={bakery.pricing_score}
          readonly
        />
        <StarRating
          label="Variety"
          value={bakery.variety_score}
          readonly
        />
        <StarRating
          label="Location"
          value={bakery.location_score}
          readonly
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(bakery)}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
