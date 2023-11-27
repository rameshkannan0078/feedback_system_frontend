import React from 'react';
import Layout from '../../Components/Layout/Layout';
import useFeedbackDashboard from '../../hooks/useFeedbackDashboard';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import BaCircularProgressIndicator from '../../Components/BaCircularProgressIndicator/BaCircularProgressIndicator';
import { Activity, User,HelpCircle,TrendingUp,Zap,AlertTriangle } from 'react-feather';

const getTypeColorClass = (type) => {
  const typeColors = {
    QUESTION: { color: 'bg-lime-300', icon: <HelpCircle size={24} className='text-lime-800' /> },
    GENERAL: { color: 'bg-green-300', icon: <Activity size={24}  className='text-green-800'/> },
    IMPROVEMENT: { color: 'bg-yellow-300', icon: <TrendingUp size={24} className='text-yellow-800' /> },
    FEATURE: { color: 'bg-purple-300', icon: <Zap size={24} className='text-purple-800' /> },
    BUG: { color: 'bg-fuchsia-300', icon: <AlertTriangle size={24}  className='text-fuchsia-800'/> },
  };

  return typeColors[type] || { color: 'bg-gray-500', icon: null };
};



const AdminDashboard = () => {
  const { loading, dashboardData } = useFeedbackDashboard();

  const renderFeedbackTypeCard = (type, count) => {
  const {color,icon}=getTypeColorClass(type);
   return  <Grid item xs={12} sm={6} md={4} key={type}>
      <Card className={`mb-4`}>
       <div className={`${color}   p-4`}>
       <CardContent>
       <div className='flex flex-col space-y-4'>
       <Typography variant="h6" component="div" className="text-white font-bold">
            {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
          </Typography>
     
          <div className='flex flex-row space-x-4'>
                    <div className='rounded-full p-2 border-2'>
                      {icon}
                    </div>
                    <div className='text-[1.5rem] font-semibold text-white' >{count}</div>
                  </div>
       </div>
        </CardContent>
       </div>
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
            <Grid item xs={12} sm={6} md={4} className=''>
              <Card className="mb-4 !bg-red-300 rounded-md">
                <CardContent>
                <div className='flex flex-col space-y-4 p-4 '>
                <Typography variant="h6" component="div" className="text-white font-bold">
                    Overall Count
                  </Typography>
                  <div className='flex flex-row space-x-4'>
                    <div className='rounded-full p-2 border-2'>
                    <Activity className='text-red-800'/>
                    </div>
                  <div className='text-[1.5rem] font-semibold text-white' >{dashboardData?.overallCount}</div>
                  </div>
                </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <Card className="mb-4 !bg-blue-300">
                <CardContent>
                <div className='flex flex-col space-y-4 p-4 '>
                <Typography variant="h6" component="div" className="text-white font-bold">
                    Unique Customer
                  </Typography>
                  <div className='flex flex-row space-x-4'>
                    <div className='rounded-full p-2 border-2'>
                    <User className='text-blue-800'/>
                    </div>
                  <div className='text-[1.5rem] font-semibold text-white' >{dashboardData?.uniqueCustomerIdCount}</div>
                  </div>
                </div>
                </CardContent>
              </Card>
            </Grid>
            {dashboardData?.feedbackTypeCounts &&
              Object.entries(dashboardData.feedbackTypeCounts).map(([type, count]) =>
                renderFeedbackTypeCard(type, count)
              )}

          </Grid>
        </div>
      )}
    </Layout>
  );
};

export default AdminDashboard;
