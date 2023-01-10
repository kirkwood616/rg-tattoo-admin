import "./ErrorBubble.css";

interface ErrorBubbleProps {
  errorMessage: string;
}

function ErrorBubble({ errorMessage }: ErrorBubbleProps) {
  return <div className="ErrorBubble">{errorMessage}</div>;
}

export default ErrorBubble;
