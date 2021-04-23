const SERVER_URI = process.env.REACT_APP_SERVER_URI || "";

const Pay = (customer_id, amount, order_id) => {
  return `${SERVER_URI}/pay/submitPaymentDetail?CUST_ID=${customer_id}&TXN_AMOUNT=${amount}&ORDER_ID=${order_id}`;
};

export { Pay };
