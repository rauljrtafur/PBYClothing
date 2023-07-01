export const getPrecioConDescuento = (
  price: number,
  dto: number,
  appliesDiscount: boolean
) => {
  if (appliesDiscount) {
    const finalPrice = price - (price * dto) / 100;
    return finalPrice;
  }
  return price;
};
