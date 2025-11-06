import { useState } from 'react';
import type { Bakery, BakeryInput } from '../types/bakery';
import StarRating from './StarRating';

interface BakeryFormProps {
  bakery?: Bakery;
  onSubmit: (data: BakeryInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function BakeryForm({
  bakery,
  onSubmit,
  onCancel,
  isLoading = false,
}: BakeryFormProps) {
  const [formData, setFormData] = useState<BakeryInput>({
    name: bakery?.name || '',
    address: bakery?.address || '',
    phone: bakery?.phone || '',
    website: bakery?.website || '',
    notes: bakery?.notes || '',
    quality_score: bakery?.quality_score || undefined,
    pricing_score: bakery?.pricing_score || undefined,
    variety_score: bakery?.variety_score || undefined,
    location_score: bakery?.location_score || undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Bakery name is required');
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScoreChange = (field: keyof BakeryInput, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {bakery ? 'Edit Bakery' : 'Add New Bakery'}
      </h2>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Bakery Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Bella Napoli Bakery"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 123 Main St, Albany, NY 12203"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., (518) 555-0100"
          />
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., https://example.com"
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your thoughts, favorite items, etc..."
          />
        </div>

        {/* Scores */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ratings</h3>
          <div className="space-y-3">
            <StarRating
              label="Product Quality"
              value={formData.quality_score || null}
              onChange={(value) => handleScoreChange('quality_score', value)}
            />
            <StarRating
              label="Pricing"
              value={formData.pricing_score || null}
              onChange={(value) => handleScoreChange('pricing_score', value)}
            />
            <StarRating
              label="Product Variety"
              value={formData.variety_score || null}
              onChange={(value) => handleScoreChange('variety_score', value)}
            />
            <StarRating
              label="Location Convenience"
              value={formData.location_score || null}
              onChange={(value) => handleScoreChange('location_score', value)}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Note: Lower prices should get higher scores (5 stars = very affordable)
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Saving...' : bakery ? 'Update Bakery' : 'Add Bakery'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
