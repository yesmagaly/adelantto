import { ErrorOption } from "react-hook-form";

interface ComponentProps {
  error: ErrorOption;
}

const ErrorMessage: React.FC<ComponentProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <span className="message is-small is-danger mt-2 inline-block">
      {error.message}
    </span>
  );
};

export default ErrorMessage;