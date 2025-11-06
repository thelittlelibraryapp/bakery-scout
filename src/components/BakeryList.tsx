import type { BakeryWithAverage } from '../types/bakery';
import BakeryCard from './BakeryCard';

interface BakeryListProps {
  bakeries: BakeryWithAverage[];
  onEdit: (bakery: BakeryWithAverage) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export default function BakeryList({
  bakeries,
  onEdit,
  onDelete,
  isLoading = false,
}: BakeryListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Loading bakeries...</div>
      </div>
    );
  }

  if (bakeries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-6xl mb-4">🥖</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No bakeries yet
        </h3>
        <p className="text-gray-600">
          Click "Add New Bakery" to start tracking your favorite local bakeries!
        </p>
      </div>
    );
  }

  // Sort by average score (highest first)
  const sortedBakeries = [...bakeries].sort(
    (a, b) => b.average_score - a.average_score
  );

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">
        Showing {bakeries.length} bakery{bakeries.length !== 1 ? 'ies' : ''} • Sorted by average score
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBakeries.map((bakery) => (
          <BakeryCard
            key={bakery.id}
            bakery={bakery}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
