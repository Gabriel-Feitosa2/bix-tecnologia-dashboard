export const formatAmount = (amount: string) => {
  const integerPart = amount.slice(0, 2); // Pega os dois primeiros dígitos
  const decimalPart = amount.slice(2); // Pega os dois últimos dígitos
  return parseFloat(`${integerPart}.${decimalPart}`); // Junta e converte para float
};

export const formatMoney = (value: number, currency = "BRL") => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(value);
};

export const formatDate = (date: string | number) => {
  const newDate = new Date(date);

  const month = String(newDate.getMonth() + 1).padStart(2, "0");

  const day = String(newDate.getDate()).padStart(2, "0");

  const year = newDate.getFullYear();

  return `${month}/${day}/${year}`;
};
