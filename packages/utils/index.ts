export const formatCurrency = function (value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(value);
};

export const t = function (text: string) {
  const map = {
    "Your cellphone number is required.": "Tu número de celular es requerido",
    "Your cellphone number is invalid.": "Tu número de celular no es válido",
    "Your confirmation code is incorect.": "Su código de confirmación es incorrecto",
    "The confirmation password should be equal to your new password.": "Tu contraseña de confirmación debe ser igual a tu nueva contraseña.",
    "Lenses detected": "Lentes detectadas",
    "Something went wrong": "Algo salió mal.",
    "The password is required.": "La contraseña es obligatoria.",
    "At least one number is missing.": "Se requieren al menos un número.",
    "At least one uppercase character is missing.": "Se requieren al menos un carácter en mayúscula.",
    "At least eight characters are required.": "Se requieren al menos ocho caracteres.",
    "approved": "Aprobado",
    "overdue": "Atrasado",
    "outdated": "Vencido",
    "rejected": "Rechazado",
    "in_validation": "En validación",
    "pending": "Pendiente",
  };

  return map[text] ?? text;
};
