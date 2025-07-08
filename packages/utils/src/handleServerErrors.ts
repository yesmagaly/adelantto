import { FieldErrors, ErrorOption, FieldValues } from "react-hook-form";

export function handleServerErrors<T extends FieldValues>(
  fields: Array<keyof FieldErrors<T>>,
  errors: Partial<Record<keyof FieldErrors<T>, string[]>>
) {
  return fields.reduce((acc: [keyof FieldErrors<T>, ErrorOption][], field) => {
    const error = errors[field];
    if (error && error?.[0]) {
      acc = [
        ...acc,
        [
          field as string,
          {
            message: error?.[0] || "Unknown error",
            type: "server",
          },
        ],
      ];
    }

    return acc;
  }, []);
}
