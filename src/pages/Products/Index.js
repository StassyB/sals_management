import React, { useState } from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Products() {
  const [rows, setRows] = useState([
    { id: 1, name: "Product A", category: "Category 1", price: "KSh 120", stock: 15 },
    { id: 2, name: "Product B", category: "Category 2", price: "KSh 80", stock: 5 },
    { id: 3, name: "Product C", category: "Category 1", price: "KSh 200", stock: 20 },
    { id: 4, name: "Product D", category: "Category 3", price: "KSh 50", stock: 0 },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product Name", flex: 1, editable: true },
    { field: "category", headerName: "Category", flex: 1, editable: true },
    { field: "price", headerName: "Price", flex: 1, editable: true },
    { field: "stock", headerName: "Stock", flex: 1, editable: true },
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
        Products
      </Typography>
      <Paper sx={{ height: 450, p: 2, borderRadius: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          pagination
          disableColumnMenu={false} // Allows filtering/sorting
          components={{ Toolbar: GridToolbar }} // Enables search + filter toolbar
          editMode="cell"
        />
      </Paper>
    </Box>
  );
}
