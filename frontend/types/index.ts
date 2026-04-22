/**
 * @file index.ts
 * @copyright 2026 Rivindu Sanjula. All Rights Reserved.
 * @license Proprietary Commercial Software
 * * Prepared exclusively for Liyonta Tea.
 * This software is provided under a commercial agreement. The source code, 
 * database schemas, and proprietary business logic contained within this 
 * file are the confidential and proprietary information of Liyonta Tea 
 * and its authorized developers.
 * * Unauthorized copying, distribution, or modification of this codebase, 
 * via any medium, is strictly prohibited. This is closed-source software. 
 * No open-source license is granted.
 */

export interface LineItem {
    id: string;
    description: string;
    qty: number;
    price: number;
}

export interface POData {
    customerName: string;
    invoiceNo: string;
    date: string;
    time: string;
    items: LineItem[];
}