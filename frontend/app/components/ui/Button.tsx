export default function Button({
  children,
  onClick,
  color,
}: {
  children: React.ReactNode;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      className={`shadow-lg py-2 px-4 text-white ${color} rounded-lg flex flex-row gap-2 items-center`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
