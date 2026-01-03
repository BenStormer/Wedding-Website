export interface RegistryItem {
  id: string;
  label: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  requested_quantity: number | null; // null = unlimited (honeymoon fund)
  received_quantity: number;
  purchase_link: string;
  isSpecialFund?: boolean; // For the honeymoon fund that doesn't track progress
}
