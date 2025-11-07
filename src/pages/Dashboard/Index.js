import React from "react";
import { Box, Grid, Paper, Typography, Drawer, IconButton } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

// Sample Data
const kpiData = [
  { title: "Total Sales", value: "Ksh.24,120", subtitle: "Today", icon: "💰" },
  { title: "Pending Orders", value: 18, subtitle: "Needs attention", icon: "📦" },
  { title: "Low Stock", value: 12, subtitle: "Restock soon", icon: "⚠️" },
  { title: "New Customers", value: 43, subtitle: "This week", icon: "🧑‍🤝‍🧑" },
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

function KpiCard({ title, value, subtitle, icon }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 4, height: "100%" }}>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="h5">{value}</Typography>
      {subtitle && <Typography variant="caption">{subtitle}</Typography>}
      <Typography sx={{ fontSize: 24 }}>{icon}</Typography>
    </Paper>
  );
}

export default function Dashboard() {
  return (
    <div>
      <Grid container spacing={2}>
        {kpiData.map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <KpiCard {...item} />
          </Grid>
        ))}
      </Grid>

   {/* Charts */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {/* Line Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2, height: 350, overflowX: "auto" }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Sales Over Time</Typography>
            <Box sx={{ width: "100%", minWidth: 350 }}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#6c5ce7" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2, height: 350, overflowX: "auto" }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Sales by Category</Typography>
            <Box sx={{ width: "100%", minWidth: 350 }}>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
}
