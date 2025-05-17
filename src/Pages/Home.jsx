import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import Invoice from "../Invoice";
import { useReactToPrint } from "react-to-print";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../Components/InvoicePDF"; // We'll create this next

const Home = () => {
  const [formData, setFormData] = useState({
    invoiceNo: "",
    orderDate: "",
    billDate: "",
    issuedTo: { name: "", address: "", contact: "", email: "" },
    paymentTo: { name: "", bank: "", number: "", phone: [""] },
    items: [{ name: "", qty: "", price: "", amount: 0 }],
    totalMrp: 0,
    totalSaving: 0,
    netAmount: 0,
  });

  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  // Handle form field changes
  const handleChange = (e, section, index) => {
    const { name, value } = e.target;

    if (section === "issuedTo" || section === "paymentTo") {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value,
        },
      }));
    } else if (section === "items") {
      const updatedItems = [...formData.items];
      updatedItems[index][name] = value;

      if (name === "qty" || name === "price") {
        const qty = Number(updatedItems[index].qty) || 0;
        const price = Number(updatedItems[index].price) || 0;
        updatedItems[index].amount = qty * price;
      }

      setFormData((prev) => ({ ...prev, items: updatedItems }));
    } else if (section === "phone") {
      const updatedPhones = [...formData.paymentTo.phone];
      updatedPhones[index] = value;
      setFormData((prev) => ({
        ...prev,
        paymentTo: { ...prev.paymentTo, phone: updatedPhones },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add new item
  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", qty: "", price: "", amount: 0 }],
    }));
  };

  // Add new phone
  const addPhone = () => {
    setFormData((prev) => ({
      ...prev,
      paymentTo: { ...prev.paymentTo, phone: [...prev.paymentTo.phone, ""] },
    }));
  };

  // Calculate totals whenever items change
  useEffect(() => {
    const totalMrp = formData.items.reduce(
      (acc, item) => acc + (Number(item.price) * (Number(item.qty) || 1) || 0),
      0
    );
    const netAmount = formData.items.reduce(
      (acc, item) => acc + Number(item.amount || 0),
      0
    );
    const totalSaving = totalMrp - netAmount;

    setFormData((prev) => ({
      ...prev,
      totalMrp,
      totalSaving,
      netAmount,
    }));
  }, [formData.items]);

  return (
    <div className="lg:flex gap-1 h-screen w-full">
      {/* Form section on left */}
      <div className="w-full lg:w-[30%] overflow-y-scroll">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Generate Invoice
            </Typography>
            <form>
              <div className="flex flex-col gap-5">
                {/* Invoice Info */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Invoice No"
                    name="invoiceNo"
                    value={formData.invoiceNo}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    label="Order Date"
                    name="orderDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.orderDate}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    label="Bill Date"
                    name="billDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.billDate}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                {/* Issued To */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Issued To
                  </Typography>
                </Grid>
                {["name", "address", "contact", "email"].map((field) => (
                  <Grid item xs={12} sm={6} key={field}>
                    <TextField
                      label={field[0].toUpperCase() + field.slice(1)}
                      name={field}
                      value={formData.issuedTo[field]}
                      onChange={(e) => handleChange(e, "issuedTo")}
                      fullWidth
                    />
                  </Grid>
                ))}

                {/* Payment To */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Payment To
                  </Typography>
                </Grid>
                {["name", "bank", "number"].map((field) => (
                  <Grid item xs={12} sm={4} key={field}>
                    <TextField
                      label={field[0].toUpperCase() + field.slice(1)}
                      name={field}
                      value={formData.paymentTo[field]}
                      onChange={(e) => handleChange(e, "paymentTo")}
                      fullWidth
                    />
                  </Grid>
                ))}

                {/* Phones */}
                {formData.paymentTo.phone.map((phone, idx) => (
                  <Grid item xs={12} sm={4} key={idx}>
                    <TextField
                      label={`Phone ${idx + 1}`}
                      value={phone}
                      onChange={(e) => handleChange(e, "phone", idx)}
                      fullWidth
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button onClick={addPhone}>Add Phone</Button>
                </Grid>

                {/* Items */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Items
                  </Typography>
                </Grid>
                {formData.items.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Item Name"
                        name="name"
                        value={item.name}
                        onChange={(e) => handleChange(e, "items", idx)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4} sm={3}>
                      <TextField
                        label="Qty"
                        name="qty"
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleChange(e, "items", idx)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4} sm={3}>
                      <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={item.price}
                        onChange={(e) => handleChange(e, "items", idx)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4} sm={3}>
                      <TextField
                        label="Amount"
                        name="amount"
                        type="number"
                        value={item.amount}
                        InputProps={{ readOnly: true }}
                        fullWidth
                      />
                    </Grid>
                  </React.Fragment>
                ))}
                <Grid item xs={12}>
                  <Button onClick={addItem}>Add Item</Button>
                </Grid>
              </div>
            </form>
          </Paper>
        </Grid>
      </div>

      {/* Invoice preview on right */}
      <div className="w-full lg:w-[70%] overflow-y-scroll">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom sx={{ p: 4 ,paddingBottom: 0}}>
            Invoice Preview
          </Typography>
          <Paper elevation={3} sx={{ p: 4 }}>
            <div ref={invoiceRef}>
              <Invoice data={formData} />
            </div>
          </Paper>
          <Box mt={2} textAlign="center" className="flex gap-2 justify-center">
            <PDFDownloadLink
              document={<InvoicePDF data={formData} />}
              fileName={`Invoice_${formData.invoiceNo || "NA"}.pdf`}
              style={{
                textDecoration: "none",
                padding: "10px 20px",
                color: "#fff",
                backgroundColor: "#1976d2",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                display: "inline-block",
              }}
            >
              {({ loading }) =>
                loading ? "Preparing PDF..." : "Download Invoice PDF"
              }
            </PDFDownloadLink>
          </Box>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
