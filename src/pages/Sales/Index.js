import React, { useState } from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Sales() {
  const [rows, setRows] = useState([
    { id: 1, orderId: "#1023", customer: "John Doe", total: "KSh 120", status: "Pending" },
    { id: 2, orderId: "#1024", customer: "Jane Smith", total: "KSh 80", status: "Completed" },
    { id: 3, orderId: "#1025", customer: "Mike Johnson", total: "KSh 50", status: "Shipped" },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "orderId", headerName: "Order ID", flex: 1, editable: true },
    { field: "customer", headerName: "Customer", flex: 1, editable: true },
    { field: "total", headerName: "Total", flex: 1, editable: true },
    { field: "status", headerName: "Status", flex: 1, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Sales
      </Typography>
      <Paper sx={{ height: 450, p: 2, borderRadius: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          pagination
          components={{ Toolbar: GridToolbar }}
          editMode="cell"
        />
      </Paper>
    </Box>
  );
}
