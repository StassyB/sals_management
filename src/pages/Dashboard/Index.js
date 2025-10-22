import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";

// Sample Data
const kpiData = [
  { title: "Total Sales", value: "Ksh.24,120", subtitle: "Today", icon: "💰" },
  { title: "Pending Orders", value: 18, subtitle: "Needs attention", icon: "📦" },
  { title: "Low Stock", value: 12, subtitle: "Restock soon", icon: "⚠️" },
  { title: "Current Customers", value: 43, subtitle: "This week", icon: "🧑‍🤝‍🧑" },
];

const lineData = [
  { day: "Mon", sales: 400 },
  { day: "Tue", sales: 300 },
  { day: "Wed", sales: 500 },
  { day: "Thu", sales: 700 },
  { day: "Fri", sales: 600 },
  { day: "Sat", sales: 800 },
  { day: "Sun", sales: 650 },
];

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Books", value: 200 },
  { name: "Other", value: 100 },
];

const COLORS = ["#6c5ce7", "#00b894", "#fd79a8", "#ebbe2bff"];

// KPI Card Component
function KpiCard({ title, value, subtitle, icon }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 4, boxShadow: "0 6px 18px rgba(16,24,40,0.06)", height: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
          {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
        </Box>
        <Box sx={{
          width: 56,
          height: 56,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(108,92,231,0.08)",
          color: "primary.main",
          ml: 2,
          fontSize: 24
        }}>
          {icon}
        </Box>
      </Box>
    </Paper>
  );
}

// Dashboard Page
export default function Dashboard() {
  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Grid container spacing={1} sx={{ mt: 2 }}>

  {/* ------------------- KPI Cards Row ------------------- */}
  {kpiData.map((item, idx) => (
    <Grid item xs={12} sm={6} md={3} key={idx}>
      <KpiCard {...item} />
    </Grid>
  ))}

<Grid item xs={12} sx={{ mt: 4 }}>
 <Box sx={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Paper sx={{ p: 2, borderRadius: 2, flex: 1, minWidth: 500, height: 350 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Sales Over Time</Typography>
            <LineChart width={450} height={250} data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#6c5ce7" strokeWidth={3} />
            </LineChart>
          </Paper>
  
          <Paper sx={{ p: 1, borderRadius: 2, flex: 1, minWidth: 300, height: 300 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Sales by Category</Typography>
            <PieChart width={300} height={250}>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" />
            </PieChart>
          </Paper>
        </Box>
</Grid>
</Grid>

    </Box>
  );
}
