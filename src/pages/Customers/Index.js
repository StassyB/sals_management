import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTheme } from "@mui/material/styles";

export default function Customers({ globalSearch = "" }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // detect small screens

  const [rows, setRows] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", joined: "2025-01-10" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", joined: "2025-02-05" },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const highlightMatch = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={i} style={{ backgroundColor: "#fff176", fontWeight: "bold" }}>{part}</span>
      ) : part
    );
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredRows = sortedRows.filter(
    (row) =>
      row.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
      row.email.toLowerCase().includes(globalSearch.toLowerCase()) ||
      row.phone.includes(globalSearch)
  );

  const handleEdit = (id) => {
    const newName = prompt("Enter new name:");
    if (!newName) return;
    setRows(rows.map((row) => (row.id === id ? { ...row, name: newName } : row)));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const requestSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Customers
      </Typography>

      <Paper sx={{ p: 2, borderRadius: 2 }}>
        {/* ---------------- Desktop Table ---------------- */}
        {!isMobile && (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {["id", "name", "email", "phone", "joined"].map((col) => (
                      <TableCell
                        key={col}
                        onClick={() => requestSort(col)}
                        sx={{ cursor: "pointer", fontWeight: "bold", minWidth: 80 }}
                      >
                        {col.toUpperCase()}
                        {sortConfig.key === col && (
                          sortConfig.direction === "asc" ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                        )}
                      </TableCell>
                    ))}
                    <TableCell sx={{ minWidth: 100 }}><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{highlightMatch(String(row.id), globalSearch)}</TableCell>
                      <TableCell>{highlightMatch(row.name, globalSearch)}</TableCell>
                      <TableCell>{highlightMatch(row.email, globalSearch)}</TableCell>
                      <TableCell>{highlightMatch(row.phone, globalSearch)}</TableCell>
                      <TableCell>{highlightMatch(row.joined, globalSearch)}</TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleEdit(row.id)}><EditIcon fontSize="small" /></IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}><DeleteIcon fontSize="small" /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={filteredRows.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
          </>
        )}

        {/* ---------------- Mobile Card Layout ---------------- */}
        {isMobile && (
          <Box>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <Paper key={row.id} sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2"><strong>ID:</strong> {highlightMatch(String(row.id), globalSearch)}</Typography>
                <Typography variant="body2"><strong>Name:</strong> {highlightMatch(row.name, globalSearch)}</Typography>
                <Typography variant="body2"><strong>Email:</strong> {highlightMatch(row.email, globalSearch)}</Typography>
                <Typography variant="body2"><strong>Phone:</strong> {highlightMatch(row.phone, globalSearch)}</Typography>
                <Typography variant="body2"><strong>Joined:</strong> {highlightMatch(row.joined, globalSearch)}</Typography>
                <Box sx={{ mt: 1 }}>
                  <IconButton size="small" onClick={() => handleEdit(row.id)}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}><DeleteIcon fontSize="small" /></IconButton>
                </Box>
              </Paper>
            ))}

            <TablePagination
              component="div"
              count={filteredRows.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
}
