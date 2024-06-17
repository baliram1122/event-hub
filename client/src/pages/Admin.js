import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import AllLoader from '../components/AllLoader';

const Admin = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [activeTab, setActiveTab] = useState('events');
  const { data: events, loading, error, reFetch, nextPage, prevPage } = useFetch('/events', 10);
  const { user, dispatch } = useContext(AuthContext);
  let { data: users, reFetch: reFetchUsers } = useFetch(user ? `/users` : null);
  const navigate = useNavigate()

  users = users.filter(user => !user.isAdmin)


  if (loading) {
    return <AllLoader/>
  }

  if (error) {
    return <p>Error fetching events: {error.message}</p>;
  }

  const approvedEvents = events.filter(event => event.status === 'approved');
  const pendingEvents = events.filter(event => event.status !== 'approved' && event.status !== 'rejected');

  const reversedEvents = [...approvedEvents, ...pendingEvents].reverse();


  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleStatusChange = async (eventId, data, successMessage) => {
    try {
      await axios.put(`/events/${eventId}`, data);
      toast.success(successMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      reFetch()
    } catch (err) {
      toast.error(`Error: ${err.response.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleApprove = async (eventId) => {
    await handleStatusChange(eventId, { status: 'approved' }, 'Event approved successfully!');
  };

  const handleReject = async (eventId) => {
    await handleStatusChange(eventId, { status: 'rejected' }, 'Event rejected successfully!');
  };


  const handleUserUpdate = async (userId, data, successMessage) => {
    try {
      await axios.put(`users/${userId}`, data);
      toast.success(successMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      reFetchUsers()
    } catch (err) {
      toast.error(`Error: ${err.response.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handlePromoteCommitteeMember = async (userId) => {
    await handleUserUpdate(userId, { isCommitteMember: true }, 'User promoted to committee member successfully!');
  }

  const handleDemoteCommitteeMember = async (userId) => {
    await handleUserUpdate(userId, { isCommitteMember: false }, 'User demoted from committee member successfully!');
  }

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`users/${userId}`);
      toast.success('User deleted successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      reFetchUsers()
    } catch (err) {
      toast.error(`Error: ${err.response.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logout successful!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
    navigate("/");
  };

  return (
    <div className={`d-flex ${isToggled ? 'toggled' : ''}`} id="wrapper">
      <div className="bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
          Eventhub
        </div>
        <div className="list-group list-group-flush my-3">
          <Link className='list-group-item-action bg-transparent second-text fw-bold text-dark list-group-item' to={"/"}>Home</Link>
          <button
            className={`list-group-item-action bg-transparent second-text fw-bold text-dark list-group-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => handleTabChange('events')}
          >
            Events
          </button>
          <button
            className={`list-group-item-action bg-transparent second-text fw-bold text-dark list-group-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => handleTabChange('users')}
          >
            Users
          </button>
          <a href="#" onClick={handleLogout} className="list-group-item list-group-item-action bg-transparent text-danger fw-bold">
            Logout
          </a>
        </div>
      </div>

      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
          <div className="d-flex align-items-center">
            <i className={`fas fa-align-left second-text fs-4 me-3`} id="menu-toggle" onClick={handleToggle}>
              <FontAwesomeIcon icon={faBars} />
            </i>
            <h2 className="fs-2 m-0 text-dark">Dashboard</h2>
          </div>
        </nav>

        <div className="container-fluid px-2">
          <div className="row my-1">
            <h3 className="fs-4 mb-3 text-dark">{activeTab === 'events' ? 'Recent Events' : 'All Users'}</h3>
            <div className="col">
              {activeTab === 'events' && (
                <table className="table rounded shadow-sm table-hover" style={{ backgroundColor: 'white' }}>
                  <thead>
                    <tr>
                      <th scope="col" width="50">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reversedEvents.map((event, index) => (
                      <tr key={event._id} className={event.status === 'approved' || event.status === 'rejected' ? 'text-decoration-line-through' : ''}>
                        <th scope="row">{index + 1}</th>
                        <td>{event.name}</td>
                        <td className=''>{event.description.substring(0, 60)}{event._id && <Link className='read-more-link' to={`/event/${event._id}`}> Read More...</Link>}</td>
                        <td className='d-flex flex-wrap'>
                          <button
                            className="btn btn-success me-1 btn-sm mt-1"
                            onClick={() => handleApprove(event._id)}
                            disabled={event.status === "approved" || event.status === "rejected"}
                          >
                            {event.status === "pending" ? 'Approve' : 'Approved'}
                          </button>
                          <button
                            className="btn btn-danger me-1 btn-sm mt-1"
                            onClick={() => handleReject(event._id)}
                            disabled={event.status === "approved" || event.status === "rejected"}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === 'users' && (
                <table className="table bg-white rounded shadow-sm table-hover">
                  <thead>
                    <tr>
                      <th scope="col" width="50">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td className='d-flex flex-wrap'>
                          <button
                            className="btn btn-primary me-1 btn-sm mt-1"
                            onClick={() => handlePromoteCommitteeMember(user._id)}
                            disabled={user.isCommitteMember}
                          >
                            {user.isCommitteMember ? "promoted" : "promote"}
                          </button>
                          <button
                            className="btn btn-warning me-1 btn-sm mt-1"
                            onClick={() => handleDemoteCommitteeMember(user._id)}
                            disabled={user.isCommitteMember == false}
                          >
                            {user.isCommitteMember == false ? "Demoted" : "Demote"}
                          </button>
                          <button
                            className="btn btn-danger me-1 btn-sm mt-1"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
