import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Reports() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [reportType, setReportType] = useState("Products");

  const salesData = [
    { id: 1, date: "2025-01-10", type: "Sales", details: "Order #1023", amount: "KSh 120" },
    { id: 2, date: "2025-01-11", type: "Sales", details: "Order #1024", amount: "KSh 80" },
    { id: 3, date: "2025-01-12", type: "Sales", details: "Order #1025", amount: "KSh 150" },
    { id: 4, date: "2025-01-13", type: "Sales", details: "Order #1026", amount: "KSh 200" },
    { id: 5, date: "2025-01-14", type: "Sales", details: "Order #1027", amount: "KSh 90" },
    { id: 6, date: "2025-01-15", type: "Sales", details: "Order #1028", amount: "KSh 70" },
  ];

  const customersData = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "0700000000" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "0712345678" },
    { id: 3, name: "Michael Brown", email: "michael.brown@example.com", phone: "0722556677" },
    { id: 4, name: "Emily Johnson", email: "emily.j@example.com", phone: "0733111222" },
    { id: 5, name: "Daniel Kim", email: "daniel.kim@example.com", phone: "0744333444" },
    { id: 6, name: "Sophia Lee", email: "sophia.lee@example.com", phone: "0755444555" },
  ];

  const productsData = [
    { id: 1, name: "Lipstick", price: "KSh 500", stock: 20 },
    { id: 2, name: "Foundation", price: "KSh 1200", stock: 15 },
    { id: 3, name: "Mascara", price: "KSh 850", stock: 30 },
    { id: 4, name: "Blush", price: "KSh 650", stock: 25 },
    { id: 5, name: "Eyeliner", price: "KSh 450", stock: 40 },
    { id: 6, name: "Concealer", price: "KSh 900", stock: 10 },
  ];

  const getData = () => {
    if (reportType === "Sales") return salesData;
    if (reportType === "Customers") return customersData;
    if (reportType === "Products") return productsData;
    return [];
  };

  const handlePrint = () => {
    const printSection = document.getElementById("report-section");
    if (!printSection) return alert("Report section not found!");

    const newWindow = window.open("", "", "width=800,height=600");
    newWindow.document.write(`
      <html>
        <head>
          <title>${reportType} Report</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
            h2 { text-align: center; margin-bottom: 15px; }
          </style>
        </head>
        <body>
          <h2>${reportType} Report</h2>
          ${printSection.innerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Reports
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2, flexWrap: "wrap" }}>
        <Select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          sx={{ mb: 1, mr: 2, minWidth: 150 }}
        >
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="Customers">Customers</MenuItem>
          <MenuItem value="Products">Products</MenuItem>
        </Select>

        <Box sx={{ ml: "auto" }}>
          <Button variant="contained" onClick={handlePrint}>
            Print {reportType} Report
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <div id="report-section">
          {!isMobile && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {Object.keys(getData()[0] || {}).map((key) => (
                      <TableCell key={key}>{key.toUpperCase()}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getData().map((row) => (
                    <TableRow key={row.id}>
                      {Object.values(row).map((value, index) => (
                        <TableCell key={index}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Mobile View: Stacked Cards */}
          {isMobile && getData().map((row) => (
            <Paper key={row.id} sx={{ p: 2, mb: 2, boxShadow: 1 }}>
              {Object.entries(row).map(([key, value]) => (
                <Typography key={key} variant="body2">
                  <strong>{key.toUpperCase()}:</strong> {value}
                </Typography>
              ))}
            </Paper>
          ))}
        </div>
      </Paper>
    </Box>
  );
}
