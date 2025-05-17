import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    padding: 40,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
    backgroundColor: "#f9f9f9",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 0,
  },
  header: {
    backgroundColor: "#5ce1e6",
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerRight: {
    textAlign: "right",
  },
  boldText: {
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },
  content: {
    padding: 16,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  table: {
    width: "100%",
    marginTop: 16,
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableCell: {
    fontSize: 12,
  },
  colItem: {
    width: "45%",
  },
  colQty: {
    width: "15%",
    textAlign: "right",
  },
  colPrice: {
    width: "20%",
    textAlign: "right",
  },
  colAmount: {
    width: "20%",
    textAlign: "right",
  },
  totals: {
    marginTop: 16,
    textAlign: "right",
  },
  totalRow: {
    marginBottom: 8,
  },
  netAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentSection: {
    marginTop: 24,
  },
  footer: {
    marginTop: 24,
    textAlign: "center",
    color: "gray",
    fontSize: 12,
  },
});

const InvoicePDF = ({ data }) => {
  const {
    invoiceNo,
    orderDate,
    billDate,
    issuedTo,
    items,
    totalMrp,
    totalSaving,
    netAmount,
    paymentTo,
  } = data ?? {
    invoiceNo: "N/A",
    orderDate: "N/A",
    billDate: "N/A",
    issuedTo: { name: "", address: "", contact: "", email: "" },
    items: [],
    totalMrp: 0,
    totalSaving: 0,
    netAmount: 0,
    paymentTo: { name: "", bank: "", number: "", phone: [] },
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Invoice</Text>
            <View style={styles.headerRight}>
              <Text style={styles.boldText}>Invoice No: {invoiceNo}</Text>
              <Text>Order Date: {orderDate}</Text>
              <Text>Bill Date: {billDate}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.content}>
            {/* Issued By and Issued To */}
            <View style={styles.section}>
              <View>
                <Text style={styles.sectionTitle}>Issued By</Text>
                <Text>Tejas</Text>
                <Text>Event Management</Text>
                <Text>+9112345678</Text>
              </View>
              <View>
                <Text style={styles.sectionTitle}>Issued To</Text>
                <Text>{issuedTo.name}</Text>
                <Text>{issuedTo.address}</Text>
                <Text>{issuedTo.contact}</Text>
                <Text>{issuedTo.email}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Items Table */}
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, styles.colItem, styles.boldText]}>
                  Item
                </Text>
                <Text style={[styles.tableCell, styles.colQty, styles.boldText]}>
                  Qty
                </Text>
                <Text style={[styles.tableCell, styles.colPrice, styles.boldText]}>
                  Price
                </Text>
                <Text style={[styles.tableCell, styles.colAmount, styles.boldText]}>
                  Amount
                </Text>
              </View>

              {/* Table Rows */}
              {items.map((item, idx) => (
                <View style={styles.tableRow} key={idx}>
                  <Text style={[styles.tableCell, styles.colItem]}>{item.name}</Text>
                  <Text style={[styles.tableCell, styles.colQty]}>
                    {item.qty}
                  </Text>
                  <Text style={[styles.tableCell, styles.colPrice]}>
                    ₹{item.price}
                  </Text>
                  <Text style={[styles.tableCell, styles.colAmount]}>
                    ₹{item.amount}
                  </Text>
                </View>
              ))}
            </View>

            {/* Totals */}
            <View style={styles.totals}>
              <Text style={styles.totalRow}>
                <Text style={styles.boldText}>Total MRP: </Text>₹{totalMrp}
              </Text>
              <Text style={styles.totalRow}>
                <Text style={styles.boldText}>Total Saving: </Text>₹{totalSaving}
              </Text>
              <Text style={[styles.netAmount]}>
                Net Amount: ₹{netAmount}
              </Text>
            </View>

            <View style={styles.divider} />

            {/* Payment To */}
            <View style={styles.paymentSection}>
              <Text style={styles.sectionTitle}>Payment To</Text>
              <Text>{paymentTo.name}</Text>
              <Text>{paymentTo.bank}</Text>
              <Text>{paymentTo.number}</Text>
              {paymentTo.phone?.map((phone, i) => (
                <Text key={i}>{phone}</Text>
              ))}
            </View>

            <View style={styles.divider} />

            {/* Footer */}
            <View style={styles.footer}>
              <Text>Thank you for your business!</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
