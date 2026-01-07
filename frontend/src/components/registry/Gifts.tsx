export interface RegistryItem {
  id: string;
  label: string;
  description: string;
  version?: string;
  price: number;
  image: string;
  alt: string;
  requested_quantity: number | null;
  received_quantity: number;
  purchase_link: string;
}
