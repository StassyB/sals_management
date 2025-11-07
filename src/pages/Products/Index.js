import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  useMediaQuery,
  Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

export default function Products() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [rows, setRows] = useState([
    { id: 1, name: "Product A", category: "Category 1", price: "KSh 120", stock: 15 },
    { id: 2, name: "Product B", category: "Category 2", price: "KSh 80", stock: 5 },
    { id: 3, name: "Product C", category: "Category 1", price: "KSh 200", stock: 20 },
    { id: 4, name: "Product D", category: "Category 3", price: "KSh 50", stock: 0 },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // Desktop Columns
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "stock", headerName: "Stock", flex: 1 },
    { field: "actions", headerName: "Actions", width: 150 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Products
      </Typography>

      <Paper sx={{ p: 2, borderRadius: 2 }}>
        {/* ---------------- Desktop DataGrid ---------------- */}
        {!isMobile && (
          <Box sx={{ height: 450 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: 1,
                mb: 2,
                fontWeight: "bold",
              }}
            >
              {columns.map((col) => (
                <Box key={col.field}>{col.headerName}</Box>
              ))}
            </Box>

            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <Box
                key={row.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: 1,
                  py: 1,
                  borderBottom: "1px solid #eee",
                  alignItems: "center",
                }}
              >
                <Typography>{row.id}</Typography>
                <Typography>{row.name}</Typography>
                <Typography>{row.category}</Typography>
                <Typography>{row.price}</Typography>
                <Typography>{row.stock}</Typography>
                <Box>
                  <IconButton size="small" color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button
                disabled={page === 0}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <Button
                disabled={(page + 1) * rowsPerPage >= rows.length}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </Box>
          </Box>
        )}

        {/* ---------------- Mobile Card Layout ---------------- */}
        {isMobile && (
          <Box>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <Paper key={row.id} sx={{ p: 2, mb: 2, boxShadow: 1 }}>
                <Typography variant="subtitle2"><strong>ID:</strong> {row.id}</Typography>
                <Typography variant="body2"><strong>Name:</strong> {row.name}</Typography>
                <Typography variant="body2"><strong>Category:</strong> {row.category}</Typography>
                <Typography variant="body2"><strong>Price:</strong> {row.price}</Typography>
                <Typography variant="body2"><strong>Stock:</strong> {row.stock}</Typography>
                <Box sx={{ mt: 1 }}>
                  <IconButton size="small" color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Paper>
            ))}

            {/* Mobile Pagination */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Button
                disabled={page === 0}
                onClick={() => setPage((prev) => prev - 1)}
                size="small"
              >
                Previous
              </Button>
              <Button
                disabled={(page + 1) * rowsPerPage >= rows.length}
                onClick={() => setPage((prev) => prev + 1)}
                size="small"
              >
                Next
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
