import { ErrorOption } from "react-hook-form";

interface ComponentProps {
  error: ErrorOption;
}

const ErrorMessage: React.FC<ComponentProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <div className="message is-small is-danger">
      {error.message}
    </div>
  );
};

export default ErrorMessage;