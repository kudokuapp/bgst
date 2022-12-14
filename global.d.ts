/* eslint-disable no-unused-vars */
declare module 'reactjs-calendar-heatmap';

export {};

declare global {
  /**
   * Data dari Brick
   * Type subject to change
   * API v.1.0.0 Brick
   * @see https://technical-docs.onebrick.io
   */
  interface BrickTransactionData {
    dateTimestamp: string | Date;
    id: number;
    account_id: string;
    account_number: string;
    account_currency: 'IDR' | 'USD' | 'GBP' | 'SGD';
    institution_id: number;
    merchant_id: number;
    outlet_outlet_id: number;
    location_city_id: number;
    location_country_id: number;
    date: string | Date;
    amount: number;
    description: string;
    status: 'CONFIRMED' | 'PENDING';
    direction: 'out' | 'in';
    reference_id: string;
    category: Category;
    transaction_type: null | string;
  }
}

type Category = {
  category_id: number;
  category_name:
    | 'transfer-out'
    | 'transfer-in'
    | 'purchase'
    | 'uncategorized'
    | 'payment'
    | 'cash-out'
    | 'cash-in';
  classification_group_id: number;
  classification_group: string;
  classification_subgroup_id: number;
  classification_subgroup: string;
};
