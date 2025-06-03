import { MaterialIcon } from "../icon";

type T_props = {
  password: string;
};

export function PasswordStrength({ password = "" }: T_props) {
  const atLeast8Chars = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
    password
  );

  const validationChecks = [
    {
      check: atLeast8Chars,
      message: "Al menos 8 caracteres de longitud",
      score: 25,
    },
    {
      check: hasUpperCase,
      message: "Al menos una letra mayúscula (A-Z).",
      score: 20,
    },
    {
      check: hasLowerCase,
      message: "Al menos una letra minúscula (a-z).",
      score: 20,
    },
    {
      check: hasNumber,
      message: "Al menos un número (0-9).",
      score: 20,
    },
    {
      check: hasSpecialChar,
      message:
        "Al menos un caracter especial (ej: !@#$%^&*()_+-=[]{};':\",.<>/?).",
      score: 15,
    },
  ];

  const strengthScore = validationChecks.reduce(
    (acc, { check, score }) => acc + (check ? score : 0),
    0
  );

  const getScore = () => {
    if (strengthScore < 50) return { label: "Débil", color: "text-red-500" };
    if (strengthScore < 75) return { label: "Media", color: "text-yellow-500" };

    return { label: "Fuerte", color: "text-lime-500" };
  };

  const { label, color } = getScore();

  return (
    <div className="pt-2">
      <div className="flex justify-between text-xs">
        <div>Nivel de seguridad</div>
        <div>{label}</div>
      </div>
      <progress
        className={`progress h-1 my-2 ${color}`}
        value={strengthScore}
        max={100}
      ></progress>

      <ul className="text-xs list-inside flex flex-col gap-4">
        {validationChecks.map(({ check, message }, index) => (
          <li key={index} className={`inline-flex items-center gap-1.5`}>
            <MaterialIcon
              name={check ? "check" : "close"}
              size="18px"
              className={check ? "text-lime-400" : "text-red-500"}
            />
            <span className="">{message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
