export const formatCurrency = function (value: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
}
