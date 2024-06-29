export default interface UpdateOrderToPaid {
  id: string;
  payer: { email_address: string };
  status: string;
  update_time: string;
}
