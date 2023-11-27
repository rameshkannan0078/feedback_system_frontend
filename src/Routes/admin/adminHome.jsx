
  import React,{useState} from 'react';
  import Layout from '../../Components/Layout/Layout';
  import useAllUserFeedback from '../../hooks/useAllUserFeedback';
  import { Edit,Trash2 } from 'react-feather';
  import { TablePagination } from '@material-ui/core';
  import ENDPOINTS from '../../Services/Api/Endpoints';
  import { backendDelete } from '../../Services/Api/BackendMethod';
  import { toast } from 'react-toastify';


  const AdminHomepage = () => {
    const { loading, feedbackList,fetchFeedbackList } = useAllUserFeedback();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const slicedFeedbackList = feedbackList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleDelete = async (feedback) => {
      const data = await backendDelete(`${ENDPOINTS.FEEDBACK.delete}/${feedback._id}`);
      if(data.status){
      toast.success('Feedback has deleted successfully!');
      fetchFeedbackList();
      }
      else{
        toast.error('Unable to delete the feedback');
      }
    };


    return (
      <Layout>
        <div className="overflow-x-auto">
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={feedbackList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <table className="min-w-full bg-white border border-gray-300 overflow-auto">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-4">Customer Name</th>
                <th className="border border-gray-300 bg-gray-100 p-4">Feedback Type</th>
                <th className="border border-gray-300 bg-gray-100 p-4">Feedback Subject</th>
                <th className="border border-gray-300 bg-gray-100 p-4">Feedback</th>
                <th className="border border-gray-300 bg-gray-100 p-4">Rating</th>
                <th className="border border-gray-300 bg-gray-100 p-4">Date</th>
                <th className='border  border-gray-300 bg-gray-100 p-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="border border-gray-300 p-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                slicedFeedbackList.map((feedback) => (
                  <tr key={feedback._id}>
                    <td className="border border-gray-300 p-4">{feedback.customerName}</td>
                    <td className="border border-gray-300 p-4">{feedback.feedbackType}</td>
                    <td className="border border-gray-300 p-4">{feedback.feedbackSubject}</td>
                    <td className="border border-gray-300 p-4">{feedback.feedback}</td>
                    <td className="border border-gray-300 p-4">{feedback.rating}</td>
                    <td className="border border-gray-300 p-4">{new Date(feedback.date).toLocaleString()}</td>
                    <td className='border border-gray-300 p-4'>
                    <div className="ml-4 flex flex-row space-x-3 items-center ">
            <div
              className="cursor-pointer text-blue-500 flex items-center bg-blue-100 rounded p-2"
          
            >
              <Edit size={20} />
              <span className="ml-1">Edit</span>
            </div>
            <div className="cursor-pointer text-red-500 flex items-center bg-red-100 rounded p-2" onClick={()=>{handleDelete(feedback)}} >
              <Trash2 size={20} />
              <span className="ml-1">Delete</span>
            </div>
          </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  };

  export default AdminHomepage;
