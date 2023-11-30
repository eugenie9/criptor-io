export default function LoadMoreButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex justify-center mb-4">
      <button
        onClick={onClick}
        disabled={disabled}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <span>Load More</span>
      </button>
    </div>
  );
}
