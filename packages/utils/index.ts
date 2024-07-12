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
    "Your confirmation code is incorect.":
      "Su código de confirmación es incorrecto",
  };

  return map[text] ?? text;
};
