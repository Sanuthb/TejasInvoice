import React from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";

const Invoice = ({ data }) => {
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
    issuedTo: { name: "Unknown", address: "N/A", contact: "N/A", email: "N/A" },
    items: [],
    totalMrp: 0,
    totalSaving: 0,
    netAmount: 0,
    paymentTo: { name: "N/A", bank: "N/A", number: "N/A", phone: [] },
  };

  return (
    <Box
      width="100%"
      sx={{
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          backgroundColor: "#5ce1e6",
          padding: "16px",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <Grid item>
          <Typography variant="h4" fontWeight="bold" color="#333">
            Invoice
          </Typography>
        </Grid>
        <Grid item textAlign="right">
          <Typography fontWeight="bold">Invoice No: {invoiceNo}</Typography>
          <Typography>Order Date: {orderDate}</Typography>
          <Typography>Bill Date: {billDate}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ padding: "16px" }}>
        <div className="flex justify-between">
          <Grid item xs={6} textAlign="left">
            <Typography variant="h6" fontWeight="bold">
              Issued By
            </Typography>
            <Typography>Tejas </Typography>
            <Typography>Event Management</Typography>
            <Typography>+9112345678</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography variant="h6" fontWeight="bold">
              Issued To
            </Typography>
            <Typography>{issuedTo?.name}</Typography>
            <Typography>{issuedTo?.address}</Typography>
            <Typography>{issuedTo?.contact}</Typography>
            <Typography>{issuedTo?.email}</Typography>
          </Grid>
        </div>

        <Divider sx={{ my: 3 }} />

        <Table>
          <TableHead sx={{ backgroundColor: "#eee" }}>
            <TableRow>
              <TableCell>
                <strong>Item</strong>
              </TableCell>
              <TableCell>
                <strong>Qty</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Amount</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box mt={3} textAlign="right">
          <Typography>
            <strong>Total MRP:</strong> ₹{totalMrp}
          </Typography>
          <Typography>
            <strong>Total Saving:</strong> ₹{totalSaving}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Net Amount: ₹{netAmount}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />
        <Grid item xs={6} textAlign="left">
          <Typography variant="h6" fontWeight="bold">
            Payment To
          </Typography>
          <Typography>{paymentTo?.name}</Typography>
          <Typography>{paymentTo?.bank}</Typography>
          <Typography>{paymentTo?.number}</Typography>
          {paymentTo?.phone?.map((p, i) => (
            <Typography key={i}>{p}</Typography>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />
        <Box textAlign="center" color="gray">
          <Typography variant="body2">Thank you for your business!</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Invoice;
