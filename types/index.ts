export interface LineItem {
    id: string;
    description: string;
    qty: number;
    price: number;
}

export interface PODetails {
    customerName: string;
    invoiceNo: string;
    date: string;
    time: string;
    items: LineItem[];
    taxRate: number;
}