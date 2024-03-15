export const formatCurrency = function (value: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
}

export const t = function (text: string) {
  const map = {
    "Your cellphone number is required.": "Tu número de celular es requerido",
    "Your cellphone number is invalid.": "Tu número de celular no es válido",
  }

  return map[text] ?? text;
}