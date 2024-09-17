interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <div
      className={`bg-white p-2 text-black text-center rounded-md cursor-pointer ${
        props.disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${props.className}`}
      onClick={!props.disabled ? props.onClick : undefined} // Disable click if button is disabled
    >
      <p>{props.label}</p>
    </div>
  );
}
