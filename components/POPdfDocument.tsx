import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { POData } from '@/types';

// Optional: Register a custom font if needed, using standard sans-serif for now
const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#333' },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
    companyInfo: { flexDirection: 'column' },
    brandName: { fontSize: 24, fontWeight: 'bold', color: '#047857', marginBottom: 4 }, // Emerald-700
    brandSub: { fontSize: 10, color: '#666' },
    poTitle: { fontSize: 28, fontWeight: 'bold', color: '#111827', textAlign: 'right' },
    metaSection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, paddingBottom: 15, borderBottom: '1px solid #e5e7eb' },
    metaBlock: { flexDirection: 'column', gap: 4 },
    metaLabel: { fontSize: 9, color: '#6b7280', textTransform: 'uppercase' },
    metaValue: { fontSize: 11, fontWeight: 'bold', color: '#111827' },
    table: { width: '100%', marginBottom: 30 },
    tableHeader: { flexDirection: 'row', backgroundColor: '#ecfdf5', borderBottom: '1px solid #10b981', padding: 8 },
    tableRow: { flexDirection: 'row', borderBottom: '1px solid #e5e7eb', padding: 8 },
    colDesc: { flex: 4 },
    colQty: { flex: 1, textAlign: 'right' },
    colPrice: { flex: 1.5, textAlign: 'right' },
    colTotal: { flex: 1.5, textAlign: 'right' },
    tableHeaderText: { fontWeight: 'bold', color: '#047857', fontSize: 10 },
    summarySection: { flexDirection: 'column', alignItems: 'flex-end', marginTop: 20 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', width: 200, paddingVertical: 4 },
    summaryLabel: { fontSize: 10, color: '#6b7280' },
    summaryValue: { fontSize: 10, fontWeight: 'bold' },
    grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', width: 200, paddingVertical: 8, borderTop: '2px solid #047857', marginTop: 4 },
    grandTotalLabel: { fontSize: 12, fontWeight: 'bold', color: '#047857' },
    grandTotalValue: { fontSize: 12, fontWeight: 'bold', color: '#047857' },
    footer: { position: 'absolute', bottom: 40, left: 40, right: 40, textAlign: 'center', color: '#9ca3af', fontSize: 9, borderTop: '1px solid #e5e7eb', paddingTop: 10 }
});

export const POPdfDocument = ({ data }: { data: POData }) => {
    const subtotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
    const taxAmount = subtotal * (data.taxRate / 100);
    const grandTotal = subtotal + taxAmount;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.companyInfo}>
                        <Text style={styles.brandName}>LIYONTA TEA</Text>
                        <Text style={styles.brandSub}>Premium Ceylon Tea Exporters</Text>
                        <Text style={styles.brandSub}>Colombo, Sri Lanka</Text>
                        <Text style={styles.brandSub}>hello@liyontatea.com</Text>
                    </View>
                    <View>
                        <Text style={styles.poTitle}>PURCHASE ORDER</Text>
                    </View>
                </View>

                {/* Metadata */}
                <View style={styles.metaSection}>
                    <View style={styles.metaBlock}>
                        <Text style={styles.metaLabel}>Bill To / Customer</Text>
                        <Text style={styles.metaValue}>{data.customerName || '—'}</Text>
                    </View>
                    <View style={styles.metaBlock}>
                        <Text style={styles.metaLabel}>Invoice No.</Text>
                        <Text style={styles.metaValue}>{data.invoiceNo || '—'}</Text>
                    </View>
                    <View style={styles.metaBlock}>
                        <Text style={styles.metaLabel}>Date & Time</Text>
                        <Text style={styles.metaValue}>{data.date ? `${data.date} ${data.time}` : '—'}</Text>
                    </View>
                </View>

                {/* Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.colDesc, styles.tableHeaderText]}>Item Description</Text>
                        <Text style={[styles.colQty, styles.tableHeaderText]}>Qty (kg)</Text>
                        <Text style={[styles.colPrice, styles.tableHeaderText]}>Unit Price ($)</Text>
                        <Text style={[styles.colTotal, styles.tableHeaderText]}>Line Total ($)</Text>
                    </View>
                    {data.items.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={styles.colDesc}>{item.description || '—'}</Text>
                            <Text style={styles.colQty}>{item.qty}</Text>
                            <Text style={styles.colPrice}>{item.price.toFixed(2)}</Text>
                            <Text style={styles.colTotal}>{(item.qty * item.price).toFixed(2)}</Text>
                        </View>
                    ))}
                </View>

                {/* Totals */}
                <View style={styles.summarySection}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal:</Text>
                        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Tax ({data.taxRate}%):</Text>
                        <Text style={styles.summaryValue}>${taxAmount.toFixed(2)}</Text>
                    </View>
                    <View style={styles.grandTotalRow}>
                        <Text style={styles.grandTotalLabel}>Grand Total:</Text>
                        <Text style={styles.grandTotalValue}>${grandTotal.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>Thank you for your business. Terms & Conditions apply as per standard Ceylon Tea export regulations.</Text>
                </View>
            </Page>
        </Document>
    );
};