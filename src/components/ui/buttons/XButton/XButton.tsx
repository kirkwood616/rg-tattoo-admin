import "./XButton.css";

interface XButtonProps {
  onClick: (index?: number) => void;
}

function XButton({ onClick }: XButtonProps) {
  return (
    <svg
      className="x_button"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 45 45"
      onClick={() => onClick()}
    >
      <g>
        <circle cx="22" cy="22" r="22" />
        <path
          d="M22,3.61C11.84,3.61,3.61,11.84,3.61,22S11.84,40.39,22,40.39S40.39,32.16,40.39,22S32.16,3.61,22,3.61z
      M27.11,29.89L22,24.79l-5.11,5.11l-2.79-2.79L19.21,22l-5.11-5.11l2.79-2.79L22,19.21l5.11-5.11l2.79,2.79L24.79,22l5.11,5.11
     L27.11,29.89z"
        />
      </g>
    </svg>
  );
}

export default XButton;
