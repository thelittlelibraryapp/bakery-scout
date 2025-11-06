interface StarRatingProps {
  value: number | null;
  onChange?: (value: number) => void;
  label?: string;
  readonly?: boolean;
}

export default function StarRating({
  value,
  onChange,
  label,
  readonly = false,
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (star: number) => {
    if (!readonly && onChange) {
      onChange(star);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-sm font-medium text-gray-700 min-w-[140px]">{label}</span>}
      <div className="flex gap-1">
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            disabled={readonly}
            className={`text-2xl transition-colors ${
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            } ${
              value && star <= value
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
            aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          >
            ★
          </button>
        ))}
      </div>
      {value !== null && (
        <span className="text-sm text-gray-600 ml-1">({value}/5)</span>
      )}
    </div>
  );
}
