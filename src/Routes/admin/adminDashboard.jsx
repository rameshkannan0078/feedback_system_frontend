import React from 'react';
import Layout from '../../Components/Layout/Layout';
import useFeedbackDashboard from '../../hooks/useFeedbackDashboard';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { Edit, Trash2 } from 'react-feather';
import BaCircularProgressIndicator from '../../Components/BaCircularProgressIndicator/BaCircularProgressIndicator';

const AdminDashboard = () => {
  const { loading, dashboardData } = useFeedbackDashboard();

  const renderFeedbackTypeCard = (type, count) => {
    const typeColors = {
        QUESTION: 'bg-blue-500',
        GENERAL: 'bg-green-500',
        IMPROVEMENT: 'bg-yellow-500',
        FEATURE: 'bg-purple-500',
        BUG: 'bg-red-500',
      };
    
      const colorClass = typeColors[type] || 'bg-gray-500';
    
   return  <Grid item xs={12} sm={6} md={4} key={type}>
      <Card className={`mb-4 ${colorClass}`}>
        <CardContent>
          <Typography variant="h6" component="div" className="text-blue-500">
            {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
          </Typography>
          <Typography color="textSecondary"> {count}</Typography>
        </CardContent>
      </Card>
    </Grid>
  };

  return (
    <Layout>
      {loading ? (
        <BaCircularProgressIndicator />
      ) : (
        <div className="container mx-auto mt-8">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="mb-4">
                <CardContent>
                  <Typography variant="h6" component="div" className="text-blue-500">
                    Overall Count
                  </Typography>
                  <Typography color="textSecondary">{dashboardData?.overallCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="mb-4">
                <CardContent>
                  <Typography variant="h6" component="div" className="text-blue-500">
                    Unique Customer ID Count
                  </Typography>
                  <Typography color="textSecondary">{dashboardData?.uniqueCustomerIdCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            {Object.entries(dashboardData?.feedbackTypeCounts).map(([type, count]) =>
              renderFeedbackTypeCard(type, count)
            )}
          </Grid>
        </div>
      )}
    </Layout>
  );
};

export default AdminDashboard;
