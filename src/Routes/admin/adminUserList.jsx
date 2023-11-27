import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import useAllUser from '../../hooks/useUserList';
import { Trash2 } from 'react-feather';
import { TablePagination } from '@material-ui/core';
import { backendDelete } from '../../Services/Api/BackendMethod';
import { toast } from 'react-toastify';
import ENDPOINTS from '../../Services/Api/Endpoints';

const AdminUserList = () => {
  const { loading, userList, fetchAlluserList } = useAllUser();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedUserList = userList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleDelete = async (user) => {
    const data = await backendDelete(`${ENDPOINTS.USER.delete}/${user._id}`);
    if (data.status) {
      toast.success('User has been deleted successfully!');
      fetchAlluserList();
    } else {
      toast.error('Unable to delete the user');
    }
  };

  return (
    <Layout>
      <div className="overflow-x-auto">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userList?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <table className="min-w-full bg-white border border-gray-300 overflow-auto">
          <thead>
            <tr>
            <th className="border border-gray-300 bg-gray-100 p-4">Customer ID</th>
              <th className="border border-gray-300 bg-gray-100 p-4">Customer Name</th>
              <th className="border border-gray-300 bg-gray-100 p-4">Email</th>
              <th className="border border-gray-300 bg-gray-100 p-4">Date of Birth</th>
              {/* Add more headers based on your user object */}
              <th className='border  border-gray-300 bg-gray-100 p-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="border border-gray-300 p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              slicedUserList?.map((user) => (
                <tr key={user?._id}>
                     <td className="border border-gray-300 p-4">{user?.customerId}</td>
                  <td className="border border-gray-300 p-4">{user?.customerName}</td>
                  <td className="border border-gray-300 p-4">{user?.customerEmail}</td>
                  <td className="border border-gray-300 p-4">  {user?.customerDateOfBirth && new Date(user.customerDateOfBirth).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}</td>
                  <td className='border border-gray-300 p-4'>
                    <div className="ml-4 flex flex-row space-x-3 items-center ">
                      <div
                        className="cursor-pointer text-red-500 flex items-center bg-red-100 rounded p-2"
                        onClick={() => {
                          handleDelete(user);
                        }}
                      >
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

export default AdminUserList;
