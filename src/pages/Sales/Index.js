import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Sales() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [rows, setRows] = useState([
    { id: 1, orderId: "#1023", customer: "John Doe", total: "KSh 120", status: "Pending" },
    { id: 2, orderId: "#1024", customer: "Jane Smith", total: "KSh 80", status: "Completed" },
    { id: 3, orderId: "#1025", customer: "Mike Johnson", total: "KSh 50", status: "Shipped" },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEdit = (id) => {
    const newCustomer = prompt("Enter new customer name:");
    if (!newCustomer) return;
    setRows(rows.map((row) => (row.id === id ? { ...row, customer: newCustomer } : row)));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Sales
      </Typography>
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        {!isMobile && (
          <Box sx={{ height: 450, width: "100%" }}>
            {/* Desktop: Table Layout */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f4f4f4" }}>
                  {["ID", "Order ID", "Customer", "Total", "Status", "Actions"].map((head) => (
                    <th key={head} style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.id}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.orderId}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.customer}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.total}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.status}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      <IconButton color="primary" onClick={() => handleEdit(row.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )}

        {/* Mobile: Card Layout */}
        {isMobile && rows.map((row) => (
          <Paper key={row.id} sx={{ p: 2, mb: 2, boxShadow: 1 }}>
            {Object.entries(row).map(([key, value]) => (
              <Typography key={key} variant="body2">
                <strong>{key.toUpperCase()}:</strong> {value}
              </Typography>
            ))}
            <Box sx={{ mt: 1 }}>
              <IconButton color="primary" onClick={() => handleEdit(row.id)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(row.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Paper>
    </Box>
  );
}
