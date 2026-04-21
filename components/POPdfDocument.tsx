import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { POData } from '@/types';

// Registry of colors to match the web theme
const COLORS = {
    primary: '#14532d', // tea-900
    accent: '#047857',  // emerald-700
    border: '#e5e7eb',
    text: '#1f2937',
    muted: '#6b7280',
    bg: '#f9fafb'
};

const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: COLORS.text, backgroundColor: '#FFFFFF' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30, borderBottom: `2 solid ${COLORS.accent}`, paddingBottom: 20 },
    logoSection: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    logo: { width: 50, height: 50 },
    companyInfo: { flexDirection: 'column' },
    brandName: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, letterSpacing: 1 },
    brandSub: { fontSize: 8, color: COLORS.muted, marginTop: 2 },
    poTitleContainer: { textAlign: 'right' },
    poTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary },
    poSubTitle: { fontSize: 10, color: COLORS.muted, marginTop: 4 },

    metaSection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, marginTop: 10 },
    metaBlock: { flex: 1 },
    metaLabel: { fontSize: 8, color: COLORS.muted, textTransform: 'uppercase', marginBottom: 4, fontWeight: 'bold' },
    metaValue: { fontSize: 10, color: COLORS.text },

    table: { width: '100%', marginTop: 10 },
    tableHeader: { flexDirection: 'row', backgroundColor: '#f0fdf4', borderBottom: `1 solid ${COLORS.accent}`, padding: 10 },
    tableRow: { flexDirection: 'row', borderBottom: `1 solid ${COLORS.border}`, padding: 10, alignItems: 'center' },
    colDesc: { flex: 4, fontSize: 10 },
    colQty: { flex: 1, textAlign: 'right' },
    colPrice: { flex: 1.5, textAlign: 'right' },
    colTotal: { flex: 1.5, textAlign: 'right', fontWeight: 'bold' },
    tableHeaderText: { fontWeight: 'bold', color: COLORS.primary, fontSize: 9, textTransform: 'uppercase' },

    summarySection: { flexDirection: 'column', alignItems: 'flex-end', marginTop: 30 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', width: 180, paddingVertical: 4 },
    summaryLabel: { fontSize: 10, color: COLORS.muted },
    summaryValue: { fontSize: 10, color: COLORS.text },
    grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', width: 180, paddingVertical: 10, borderTop: `2 solid ${COLORS.primary}`, marginTop: 6, backgroundColor: '#f0fdf4', paddingHorizontal: 5 },
    grandTotalLabel: { fontSize: 12, fontWeight: 'bold', color: COLORS.primary },
    grandTotalValue: { fontSize: 12, fontWeight: 'bold', color: COLORS.primary },

    footer: { position: 'absolute', bottom: 30, left: 40, right: 40, borderTop: `1 solid ${COLORS.border}`, paddingTop: 15, textAlign: 'center' },
    footerText: { color: COLORS.muted, fontSize: 8, lineHeight: 1.5 }
});

export const POPdfDocument = ({ data }: { data: POData }) => {
    const grandTotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoSection}>
                        <Image src="/logo.png" style={styles.logo} />
                        <View style={styles.companyInfo}>
                            <Text style={styles.brandName}>LIYONTA TEA</Text>
                            <Text style={styles.brandSub}>Premium Ceylon Tea Exporters</Text>
                            <Text style={styles.brandSub}>Colombo, Sri Lanka | hello@liyontatea.com</Text>
                        </View>
                    </View>
                    <View style={styles.poTitleContainer}>
                        <Text style={styles.poTitle}>PURCHASE ORDER</Text>
                        <Text style={styles.poSubTitle}>#{data.invoiceNo || 'PENDING'}</Text>
                    </View>
                </View>

                {/* Metadata */}
                <View style={styles.metaSection}>
                    <View style={styles.metaBlock}>
                        <Text style={styles.metaLabel}>Bill To / Customer</Text>
                        <Text style={styles.metaValue}>{data.customerName || '—'}</Text>
                    </View>
                    <View style={styles.metaBlock}>
                        <Text style={styles.metaLabel}>Invoice Number</Text>
                        <Text style={styles.metaValue}>{data.invoiceNo || '—'}</Text>
                    </View>
                    <View style={styles.metaBlock}>
                        <Text style={styles.metaLabel}>Order Date & Time</Text>
                        <Text style={styles.metaValue}>{data.date ? `${data.date} at ${data.time}` : '—'}</Text>
                    </View>
                </View>

                {/* Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.colDesc, styles.tableHeaderText]}>Item Description</Text>
                        <Text style={[styles.colQty, styles.tableHeaderText]}>Qty (kg)</Text>
                        <Text style={[styles.colPrice, styles.tableHeaderText]}>Unit Price</Text>
                        <Text style={[styles.colTotal, styles.tableHeaderText]}>Total</Text>
                    </View>
                    {data.items.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={styles.colDesc}>{item.description || '—'}</Text>
                            <Text style={styles.colQty}>{item.qty}</Text>
                            <Text style={styles.colPrice}>Rs.{item.price.toFixed(2)}</Text>
                            <Text style={styles.colTotal}>Rs.{(item.qty * item.price).toFixed(2)}</Text>
                        </View>
                    ))}
                </View>

                {/* Totals */}
                <View style={styles.summarySection}>
                    <View style={styles.grandTotalRow}>
                        <Text style={styles.grandTotalLabel}>Grand Total:</Text>
                        <Text style={styles.grandTotalValue}>Rs. {(grandTotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Thank you for choosing Liyonta Tea for your premium Ceylon tea requirements.
                    </Text>
                    <Text style={[styles.footerText, { marginTop: 4 }]}>
                        Standard terms and conditions apply. Goods once sold are not returnable as per tea export regulations.
                    </Text>
                </View>
            </Page>
        </Document>
    );
};