'use client';

import TableLoader from '@/components/Common/tableLoader';
import { useApi } from '@/services/apiServices';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const Page = () => {
  const { getAllUser, deleteUser, updateUser } = useApi();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState<any>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedRole, setEditedRole] = useState('user'); // Default role
  const modalRef = useRef<HTMLDivElement>(null);

  const limit = 10;
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = (await getAllUser(currentPage, limit, searchValue)) as {
        data?: {
          doc?: any[];
        };
        totalCount?: number;
      };
      setLoading(false);
      if (res?.data?.doc) {
        setUsers(res.data.doc);
        setTotalCount(res.totalCount || 0); // ✅ FIXED: set actual totalCount here
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (error: any) {
      console.error('Fetch users error:', error.message);
      toast.error(error.message || 'Failed to fetch users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurrentPage(1);
      fetchUsers();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  const handleEdit = async (id: string, name: string, role: string) => {
    try {
      await updateUser({ name, role }, id);

      toast.success('User updated successfully');
      fetchUsers();
    } catch (error: any) {
      console.error('Delete user error:', error.message);
      toast.error(error.message || 'Failed to delete user');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);

      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error: any) {
      console.error('Delete user error:', error.message);
      toast.error(error.message || 'Failed to delete user');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
        setIsEditModal(false);
      }
    };

    if (isModalOpen || isEditModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, isEditModal]);

  return (
    <>
      <div className="md:p-6">
        <div className="flex justify-between items-center mb-6">
          <ul className="flex items-center gap-2">
            <li className="text-custom-sm hover:text-blue">
              <Link href="/dashboard">Home /</Link>
            </li>

            <li className="text-custom-sm last:text-blue capitalize">Users</li>
          </ul>
          {/* search bar  */}
          <div className="relative max-w-[300px] sm:min-w-[300px] w-full">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 inline-block w-px h-5.5 "></span>
            <input
              onChange={e => setSearchValue(e.target.value)}
              value={searchValue}
              type="search"
              name="search"
              id="search"
              placeholder="Search by name..."
              autoComplete="off"
              className=" w-full rounded-[5px] bg-gray-7  border border-gray-6 py-2 pl-4 pr-4 text-white outline-none ease-in duration-200"
            />

            <button
              id="search-btn"
              aria-label="Search"
              className="flex items-center cursor-text justify-center absolute right-3 top-1/2 -translate-y-1/2 ease-in duration-200 "
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.2687 15.6656L12.6281 11.8969C14.5406 9.28123 14.3437 5.5406 11.9531 3.1781C10.6875 1.91248 8.99995 1.20935 7.19995 1.20935C5.39995 1.20935 3.71245 1.91248 2.44683 3.1781C-0.168799 5.79373 -0.168799 10.0687 2.44683 12.6844C3.71245 13.95 5.39995 14.6531 7.19995 14.6531C8.91558 14.6531 10.5187 14.0062 11.7843 12.8531L16.4812 16.65C16.5937 16.7344 16.7343 16.7906 16.875 16.7906C17.0718 16.7906 17.2406 16.7062 17.3531 16.5656C17.5781 16.2844 17.55 15.8906 17.2687 15.6656ZM7.19995 13.3875C5.73745 13.3875 4.38745 12.825 3.34683 11.7844C1.20933 9.64685 1.20933 6.18748 3.34683 4.0781C4.38745 3.03748 5.73745 2.47498 7.19995 2.47498C8.66245 2.47498 10.0125 3.03748 11.0531 4.0781C13.1906 6.2156 13.1906 9.67498 11.0531 11.7844C10.0406 12.825 8.66245 13.3875 7.19995 13.3875Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
          {/* search bar  */}
        </div>

        <div className=" p-2 rounded-lg">
          <div className="overflow-x-auto min-h-[65vh] ">
            {loading ? (
              <TableLoader />
            ) : (
              <table className="w-full  text-left">
                <thead>
                  <tr className="text-gray-5 text-sm border-b border-gray-7">
                    <th className="pb-3">S.no.</th>
                    <th className="pb-3">NAME</th>
                    <th className="pb-3">EMAIL</th>
                    <th className="pb-3">ROLE</th>

                    <th className="pb-3">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user: any, index: any) => (
                    <tr key={user.id} className="border-b border-gray-7">
                      <td className="py-4 text-gray-300 pl-4">
                        {(currentPage - 1) * limit + index + 1}
                      </td>

                      <td className="py-4 text-gray-300">{user.name}</td>
                      <td className="py-4 text-gray-300">{user.email}</td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            user.role === 'admin'
                              ? 'bg-red text-white'
                              : user.role === 'staff'
                                ? 'bg-blue text-white'
                                : 'bg-green text-white'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedUserId(user.id);
                              setEditedName(user?.name);
                              setEditedRole(user?.role);
                              setIsEditModal(true);
                            }}
                            className="text-blue-light hover:text-blue-dark"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setIsModalOpen(true);
                              setSelectedUserId(user.id);
                            }}
                            className="text-blue-light hover:text-blue-dark"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {/* <!-- Products Pagination Start --> */}
        <div className="flex justify-end mt-2 mr-4">
          <div className="bg-white shadow-1 rounded-md p-2">
            <ul className="flex items-center space-x-1">
              {/* Prev */}
              <li>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-8 h-9 rounded-[3px] 
    ${
      currentPage === 1
        ? 'cursor-not-allowed text-gray-400 bg-gray-100'
        : 'hover:bg-blue hover:text-white cursor-pointer'
    }
  `}
                >
                  &#8592;
                </button>
              </li>

              {/* Page Numbers */}
              {totalPages > 1 &&
                Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <li key={page}>
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`flex py-1.5 px-3.5 rounded-[3px] ${
                        page === currentPage
                          ? 'bg-blue text-white'
                          : 'hover:bg-blue hover:text-white'
                      }`}
                    >
                      {page}
                    </button>
                  </li>
                ))}

              {/* Next */}
              <li>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-8 h-9 rounded-[3px] 
    ${
      currentPage === totalPages
        ? 'cursor-not-allowed text-gray-4 bg-gray-100'
        : 'hover:bg-blue hover:text-white cursor-pointer'
    }
  `}
                >
                  &#8594;
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* <!-- Products Pagination End --> */}
      </div>

      {isModalOpen && (
        <div
          key="modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 shadow-2xl"
        >
          <div ref={modalRef} className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-medium mb-4 text-dark">Confirm Deletion</h2>
            <p className="text-gray-7 mb-6">Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-4 shadow-lg hover:scale-95 text-gray-7 font-medium duration-150 py-1.5 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedUserId) handleDelete(selectedUserId);
                  setIsModalOpen(false);
                }}
                className="bg-red hover:bg-red shadow-lg hover:scale-95 duration-150 text-white font-medium  py-1.5 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModal && (
        <div
          key="modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 shadow-2xl"
        >
          <div ref={modalRef} className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-medium mb-4 text-dark">Edit User</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleEdit(selectedUserId, editedName, editedRole);
                setIsEditModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-7 mb-1">Name</label>
                <input
                  type="text"
                  value={editedName}
                  onChange={e => setEditedName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-light-3"
                  placeholder="Enter user name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-7 mb-1">Role</label>
                <select
                  value={editedRole}
                  onChange={e => setEditedRole(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-light-3"
                  required
                >
                  {['admin', 'user', 'staff', 'employee', 'manager'].map(role => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModal(false)}
                  className="bg-gray-4 shadow-lg hover:scale-95 text-gray-700 font-medium duration-150 py-1.5 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue text-white shadow-lg hover:scale-95 duration-150 font-medium py-1.5 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
