interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  onClick,
  children,
  disabled = false,
}: Props) => {
  return (
    <button
      className={`bg-gradient-to-br from-blue-800 to-green-500 hover:opacity-75 text-white font-bold py-2 px-4 rounded w-48 ${
        disabled && "opacity-50"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
