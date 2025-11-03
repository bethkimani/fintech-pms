// app/dashboard/page.tsx
// Fixed ApexChart pie chart: Extracted series to separate prop. Imported User type.
// Icons now use sx for colors (MUI-friendly). No other changes.

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Box, Typography, Card, Grid, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Tabs, Tab, CircularProgress } from '@mui/material';
import { BarChart3, Users, Clock, TrendingUp, Award, FileText } from 'lucide-react';
import { User } from '@/types';

// Dynamic import for ApexCharts to avoid SSR issues
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (!token || !storedUser) {
      router.push('/');
      return;
    }
    setUser(JSON.parse(storedUser));
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Dummy chart data
  const performanceOptions = {
    chart: { type: 'line', height: 200 },
    series: [{ name: 'Performance', data: [4, 6, 3, 8, 2, 5] }],
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
  };

  const appraisalOptions = {
    chart: { type: 'donut', height: 150 },
    labels: ['Appraisals', 'Pending'],
    colors: ['#10b981', '#f59e0b'],
  };
  const appraisalSeries = [80, 20];

  // Dummy table data
  const recentReviews = [
    { id: '#97634', name: 'Camera Lens', status: 'Active', total: 3 },
    { id: '#97638', name: 'Black Sleep Dress', status: 'Active', total: 20 },
    { id: '#97642', name: 'Argon Oil', status: 'Active', total: 78 },
    { id: '#97621', name: 'Eau de Parfum', status: 'Active', total: 99 },
  ];

  // Dummy pie data
  const feedbackData = [40, 30, 20, 10];
  const pieOptions = {
    chart: { type: 'pie' },
    labels: ['Sale', 'Distribute', 'Return', 'Pending'],
    colors: ['#3b82f6', '#eab308', '#ef4444', '#6b7280'],
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: 'grey.50' }}>
      <AppBar position="static" color="default" elevation={0} sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Overview" />
          <Tab label="Goals" />
          <Tab label="Performance Review" />
          <Tab label="Employee Development" />
          <Tab label="Rewards & Promotion" />
          <Tab label="PIP" />
          <Tab label="Notification" />
          <Tab label="Settings" />
        </Tabs>
      </AppBar>

      {/* Role-based header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" fontWeight="bold">
          {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Dashboard
        </Typography>
        <Chip label={user?.name} color="primary" />
      </Box>

      <Grid container spacing={3}>
        {/* Metrics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BarChart3 size={24} sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ ml: 1 }}>Goal Completion Rate</Typography>
            </Box>
            <Typography variant="h3" color="primary">50%</Typography>
            <Typography variant="body2" color="textSecondary">+11.0%</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Clock size={24} sx={{ color: 'success.main' }} />
              <Typography variant="h6" sx={{ ml: 1 }}>Learning Hours</Typography>
            </Box>
            <Typography variant="h3" color="success">16hrs/wk</Typography>
            <Typography variant="body2" color="textSecondary">+11.0%</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Award size={24} sx={{ color: 'warning.main' }} />
              <Typography variant="h6" sx={{ ml: 1 }}>Reward Distribution</Typography>
            </Box>
            <Typography variant="h3" color="warning">10</Typography>
            <Typography variant="body2" color="textSecondary">+11.0%</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FileText size={24} sx={{ color: 'secondary.main' }} />
              <Typography variant="h6" sx={{ ml: 1 }}>Feedback Frequency</Typography>
            </Box>
            <Typography variant="h3" color="secondary">40%</Typography>
            <Typography variant="body2" color="textSecondary">+11.0%</Typography>
          </Card>
        </Grid>

        {/* Charts Row */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Performance Reports</Typography>
            <ApexChart options={performanceOptions} series={performanceOptions.series} type="line" height={200} />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Appraisals</Typography>
            <ApexChart options={appraisalOptions} series={appraisalSeries} type="donut" height={150} />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
              <Box textAlign="center">
                <Typography variant="h6" color="success">80%</Typography>
                <Typography variant="body2">High</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h6" color="warning">20%</Typography>
                <Typography variant="body2">Average</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Recent Reviews Table */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Reviews Outcomes</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentReviews.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <Chip label={row.status} color="success" size="small" />
                      </TableCell>
                      <TableCell>{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Feedback Frequencies Pie */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Feedback Frequencies</Typography>
            <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ApexChart options={pieOptions} series={feedbackData} type="pie" height={200} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}