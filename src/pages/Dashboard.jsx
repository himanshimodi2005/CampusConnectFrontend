// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import API from "../api/axiosConfig";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [events, setEvents] = useState([]);
//   const [newEvent, setNewEvent] = useState({ title: "", description: "" });
//   const [isAddingEvent, setIsAddingEvent] = useState(false);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     API.get("/user/profile")
//       .then((res) => {
//         setUser(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching user profile:", err);
//         setLoading(false);
//         if (err.response?.status === 401) {
//           navigate("/login");
//         }
//       });
//   }, [navigate]);
   
//   // upcoming events 
//   useEffect(() => {
//     if (!token) return;
    
//     API.get("/events")
//       .then((res) => {
//         console.log("Events fetched:", res.data);
//         setEvents(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching events:", err);
//         if (err.response?.status === 401) {
//           navigate("/login");
//         }
//       });
//   }, [token, navigate]);
  
//   // Handle adding events with better error handling
//   const handleAddEvent = async (e) => {
//     e.preventDefault();
    
//     if (!newEvent.title.trim() || !newEvent.description.trim()) {
//       alert("Please fill in both title and description");
//       return;
//     }

//     setIsAddingEvent(true);
    
//     try {
//       console.log("Sending event data:", newEvent);
//       console.log("Headers being sent:", API.defaults.headers)
//       const res = await API.post("/events", newEvent);
//       console.log("Event added successfully:", res.data);
      
//       // Append new event to existing list
//       setEvents([...events, res.data]);
//       setNewEvent({ title: "", description: "" });
//       alert("Event added successfully!");
//     } catch (err) {
//       console.error("Error adding event:", err);
//       console.error("Error response:", err.response?.data);
//       console.error("Error status:", err.response?.status);
      
//       let errorMessage = "Failed to add event";
//       if (err.response?.data?.message) {
//         errorMessage = err.response.data.message;
//       } else if (err.response?.status === 401) {
//         errorMessage = "Authentication failed. Please login again.";
//         navigate("/login");
//       } else if (err.response?.status === 400) {
//         errorMessage = "Invalid event data. Please check your inputs.";
//       } else if (err.response?.status === 500) {
//         errorMessage = "Server error. Please try again later.";
//       }
      
//       alert(errorMessage);
//     } finally {
//       setIsAddingEvent(false);
//     }
//   };
  
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const quickActions = [
//     { 
//       name: "View Courses", 
//       icon: "bi-book-fill", 
//       color: "primary",
//       bgGradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
//       description: "Access your enrolled courses"
//     },
//     { 
//       name: "Messages", 
//       icon: "bi-chat-dots-fill", 
//       color: "success",
//       bgGradient: "linear-gradient(135deg, #10b981, #059669)",
//       description: "Check your messages"
//     },
//     { 
//       name: "Events", 
//       icon: "bi-calendar-event-fill", 
//       color: "purple",
//       bgGradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
//       description: "Upcoming campus events"
//     },
//     { 
//       name: "Library", 
//       icon: "bi-building", 
//       color: "warning",
//       bgGradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
//       description: "Library resources"
//     },
//   ];

//   const recentActivities = [
//     { title: "New assignment posted in Computer Science 101", time: "2 hours ago", type: "assignment", icon: "bi-file-text", color: "primary" },
//     { title: "Campus event: Tech Talk tomorrow at 3 PM", time: "4 hours ago", type: "event", icon: "bi-calendar-event", color: "success" },
//     { title: "Library book due reminder", time: "1 day ago", type: "reminder", icon: "bi-bell", color: "warning" },
//     { title: "Grade posted for Mathematics exam", time: "2 days ago", type: "grade", icon: "bi-trophy", color: "info" },
//   ];

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center" 
//            style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
//         <div className="text-center">
//           <div className="spinner-border text-primary mb-3" style={{width: '3rem', height: '3rem'}} role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <h4 className="text-muted">Loading your dashboard...</h4>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-vh-100" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
//       {/* Header */}
//       <nav className="navbar navbar-expand-lg sticky-top" 
//            style={{
//              background: 'rgba(255, 255, 255, 0.95)',
//              backdropFilter: 'blur(10px)',
//              boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
//              borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
//            }}>
//         <div className="container-fluid">
//           {/* Logo */}
//           <div className="d-flex align-items-center">
//             <div className="d-inline-flex align-items-center justify-content-center text-white rounded-3 me-3" 
//                  style={{
//                    width: '40px', 
//                    height: '40px',
//                    background: 'linear-gradient(135deg, #3b82f6, #6366f1)'
//                  }}>
//               <i className="bi bi-mortarboard fs-5"></i>
//             </div>
//             <span className="navbar-brand mb-0 h4 fw-bold" 
//                   style={{
//                     background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     backgroundClip: 'text'
//                   }}>
//               Campus Connect
//             </span>
//           </div>

//           {/* User Menu */}
//           <div className="d-flex align-items-center gap-3">
//             {/* Notifications */}
//             <button className="btn btn-outline-secondary btn-sm position-relative">
//               <i className="bi bi-bell"></i>
//               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
//                     style={{fontSize: '0.6rem'}}>
//                 3
//               </span>
//             </button>

//             {/* User Profile */}
//             <div className="d-flex align-items-center gap-2">
//               <div className="d-inline-flex align-items-center justify-content-center text-white rounded-circle" 
//                    style={{
//                      width: '35px', 
//                      height: '35px',
//                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)'
//                    }}>
//                 <span className="fw-medium small">
//                   {user?.username?.charAt(0).toUpperCase() || "U"}
//                 </span>
//               </div>
//               <div className="d-none d-md-block">
//                 <div className="fw-medium text-dark small">{user?.username || "User"}</div>
//                 <div className="text-muted" style={{fontSize: '0.75rem'}}>Student</div>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="btn btn-outline-danger btn-sm"
//                 title="Logout"
//               >
//                 <i className="bi bi-box-arrow-right"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="container-fluid py-4">
//         {/* Welcome Section */}
//         <div className="row mb-4">
//           <div className="col-12">
//             <div className="card border-0 shadow-lg overflow-hidden position-relative" 
//                  style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
//               <div className="card-body p-4 text-white position-relative" style={{zIndex: 2}}>
//                 <div className="row align-items-center">
//                   <div className="col-md-8">
//                     <h2 className="card-title fw-bold mb-2">
//                       Welcome back, {user?.username}! 🎉
//                     </h2>
//                     <p className="card-text fs-5 mb-0" style={{opacity: 0.9}}>
//                       Ready to connect with your campus community today?
//                     </p>
//                   </div>
//                   <div className="col-md-4 text-end d-none d-md-block">
//                     <i className="bi bi-mortarboard-fill" style={{fontSize: '4rem', opacity: 0.3}}></i>
//                   </div>
//                 </div>
//               </div>
//               {/* Decorative elements */}
//               <div className="position-absolute top-0 end-0" style={{opacity: 0.1, zIndex: 1}}>
//                 <div className="rounded-circle bg-white" 
//                      style={{
//                        width: '100px', 
//                        height: '100px', 
//                        marginTop: '-20px', 
//                        marginRight: '-20px',
//                        animation: 'float 6s ease-in-out infinite'
//                      }}></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="row mb-4">
//           <div className="col-12">
//             <h3 className="fw-semibold text-dark mb-3">Quick Actions</h3>
//           </div>
//           {quickActions.map((action, index) => (
//             <div className="col-6 col-md-3 mb-3" key={index}>
//               <div className="card border-0 h-100 text-center shadow-sm" 
//                    style={{
//                      borderRadius: '20px',
//                      transition: 'all 0.3s ease',
//                      cursor: 'pointer'
//                    }}
//                    onMouseEnter={(e) => {
//                      e.currentTarget.style.transform = 'translateY(-5px)';
//                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.2)';
//                    }}
//                    onMouseLeave={(e) => {
//                      e.currentTarget.style.transform = 'translateY(0)';
//                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.1)';
//                    }}>
//                 <div className="card-body p-4">
//                   <div className="d-inline-flex align-items-center justify-content-center rounded-3 text-white mb-3" 
//                        style={{
//                          width: '60px', 
//                          height: '60px',
//                          background: action.bgGradient
//                        }}>
//                     <i className={`${action.icon} fs-4`}></i>
//                   </div>
//                   <h5 className="card-title fw-bold text-dark mb-2">{action.name}</h5>
//                   <p className="card-text text-muted small">{action.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Dashboard Content Grid */}
//         <div className="row">
//           {/* Recent Activities */}
//           <div className="col-lg-8 mb-4">
//             <div className="card border-0 shadow-sm h-100" style={{borderRadius: '20px'}}>
//               <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
//                 <h4 className="fw-semibold text-dark mb-0">Recent Activities</h4>
//                 <button className="btn btn-sm btn-outline-primary">View All</button>
//               </div>
//               <div className="card-body">
//                 <div className="list-group list-group-flush">
//                   {recentActivities.map((activity, index) => (
//                     <div key={index} className="list-group-item border-0 px-0 py-3 d-flex align-items-start">
//                       <div className={ `d-flex align-items-center justify-content-center rounded-circle me-3 bg-${activity.color}`} 
//                            style={{
//                              width: '40px', 
//                              height: '40px', 
//                              fontSize: '0.9rem',
//                              opacity: 0.1
//                            }}>
//                         <i className={`${activity.icon} text-${activity.color}`}></i>
//                       </div>
//                       <div className="flex-grow-1">
//                         <p className="fw-medium text-dark mb-1">{activity.title}</p>
//                         <small className="text-muted">{activity.time}</small>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="col-lg-4">
//             {/* Add Event Form */}
//             <div className="card border-0 shadow-sm mb-4" style={{borderRadius: '20px'}}>
//               <div className="card-header bg-white border-0">
//                 <h5 className="fw-semibold text-dark mb-0">Add New Event</h5>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={handleAddEvent}>
//                   <div className="mb-3">
//                     <label htmlFor="eventTitle" className="form-label small fw-medium">Event Title</label>
//                     <input
//                       type="text"
//                       id="eventTitle"
//                       className="form-control"
//                       placeholder="Enter event title"
//                       value={newEvent.title}
//                       onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//                       required
//                       disabled={isAddingEvent}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="eventDescription" className="form-label small fw-medium">Description</label>
//                     <textarea
//                       id="eventDescription"
//                       className="form-control"
//                       rows="3"
//                       placeholder="Enter event description"
//                       value={newEvent.description}
//                       onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
//                       required
//                       disabled={isAddingEvent}
//                     />
//                   </div>
//                   <button 
//                     type="submit" 
//                     className="btn btn-primary w-100"
//                     disabled={isAddingEvent}
//                   >
//                     {isAddingEvent ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                         Adding...
//                       </>
//                     ) : (
//                       <>
//                         <i className="bi bi-plus-circle me-2"></i>
//                         Add Event
//                       </>
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </div>

//             {/* Upcoming Events */}
//             <div className="card border-0 shadow-sm mb-4" style={{borderRadius: '20px'}}>
//               <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
//                 <h5 className="fw-semibold text-dark mb-0">Upcoming Events</h5>
//                 <span className="badge bg-primary">{events.length}</span>
//               </div>
//               <div className="card-body">
//                 {events.length > 0 ? (
//                   events.map((event, index) => (
//                     <div key={event._id || index} className="border-start border-4 border-primary ps-3 py-2 mb-3">
//                       <h6 className="fw-medium text-dark mb-1">{event.title}</h6>
//                       <div className="small text-muted">
//                         <i className="bi bi-geo-alt me-1"></i>{event.description}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center text-muted py-3">
//                     <i className="bi bi-calendar-x fs-1 mb-2 d-block"></i>
//                     <p className="small">No upcoming events</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Campus Stats */}
//             <div className="card border-0 shadow-sm" style={{borderRadius: '20px'}}>
//               <div className="card-header bg-white border-0">
//                 <h5 className="fw-semibold text-dark mb-0">Campus Stats</h5>
//               </div>
//               <div className="card-body">
//                 <div className="row g-3">
//                   <div className="col-6">
//                     <div className="text-center">
//                       <div className="h4 fw-bold text-primary mb-1">2,847</div>
//                       <div className="small text-muted">Active Students</div>
//                     </div>
//                   </div>
//                   <div className="col-6">
//                     <div className="text-center">
//                       <div className="h4 fw-bold text-success mb-1">342</div>
//                       <div className="small text-muted">Online Now</div>
//                     </div>
//                   </div>
//                   <div className="col-6">
//                     <div className="text-center">
//                       <div className="h4 fw-bold text-info mb-1">{events.length}</div>
//                       <div className="small text-muted">Events Today</div>
//                     </div>
//                   </div>
//                   <div className="col-6">
//                     <div className="text-center">
//                       <div className="h4 fw-bold text-warning mb-1">3</div>
//                       <div className="small text-muted">Assignments Due</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Features Section */}
//         <div className="row mt-4">
//           <div className="col-12">
//             <div className="card border-0 shadow-lg overflow-hidden" 
//                  style={{
//                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
//                    borderRadius: '20px'
//                  }}>
//               <div className="card-body p-4 text-white text-center">
//                 <h3 className="fw-bold mb-3">Explore Campus Connect</h3>
//                 <p className="fs-5 mb-4" style={{opacity: 0.9}}>
//                   Discover new features and connect with your campus community
//                 </p>
//                 <div className="d-flex flex-wrap justify-content-center gap-3">
//                   <button className="btn btn-outline-light" 
//                           style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
//                           onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                           onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
//                     <i className="bi bi-people me-2"></i>Join Study Groups
//                   </button>
//                   <button className="btn btn-outline-light" 
//                           style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
//                           onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                           onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
//                     <i className="bi bi-calendar-event me-2"></i>Browse Events
//                   </button>
//                   <button className="btn btn-outline-light" 
//                           style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
//                           onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                           onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
//                     <i className="bi bi-chat-dots me-2"></i>Connect with Peers
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* CSS Animation Keyframes */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//       `}</style>
//     </div>
//   );
// }




// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import API from "../api/axiosConfig";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [events, setEvents] = useState([]);
//   const [newEvent, setNewEvent] = useState({ title: "", description: "" });
//   const [isAddingEvent, setIsAddingEvent] = useState(false);
  
//   // Lost and Found states
//   const [lostItems, setLostItems] = useState([]);
//   const [newLostItem, setNewLostItem] = useState({ 
//     title: "", 
//     description: "", 
//     location: "", 
//     type: "LOST" 
//   });
//   const [isAddingLostItem, setIsAddingLostItem] = useState(false);
//   const [activeTab, setActiveTab] = useState("lost"); // lost, found, myReports
  
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     API.get("/user/profile")
//       .then((res) => {
//         setUser(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching user profile:", err);
//         setLoading(false);
//         if (err.response?.status === 401) {
//           navigate("/login");
//         }
//       });
//   }, [navigate]);
   
//   // Fetch events
//   useEffect(() => {
//     if (!token) return;
    
//     API.get("/events")
//       .then((res) => {
//         console.log("Events fetched:", res.data);
//         setEvents(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching events:", err);
//         if (err.response?.status === 401) {
//           navigate("/login");
//         }
//       });
//   }, [token, navigate]);

//   // Fetch lost and found items
//   useEffect(() => {
//     if (!token) return;
    
//     API.get("/lostfound/items")
//       .then((res) => {
//         console.log("Lost and found items fetched:", res.data);
//         setLostItems(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching lost and found items:", err);
//         if (err.response?.status === 401) {
//           navigate("/login");
//         }
//       });
//   }, [token, navigate]);
  
//   // Handle adding events
//   const handleAddEvent = async (e) => {
//     e.preventDefault();
    
//     if (!newEvent.title.trim() || !newEvent.description.trim()) {
//       alert("Please fill in both title and description");
//       return;
//     }

//     setIsAddingEvent(true);
    
//     try {
//       console.log("Sending event data:", newEvent);
//       const res = await API.post("/events", newEvent);
//       console.log("Event added successfully:", res.data);
      
//       setEvents([...events, res.data]);
//       setNewEvent({ title: "", description: "" });
//       alert("Event added successfully!");
//     } catch (err) {
//       console.error("Error adding event:", err);
      
//       let errorMessage = "Failed to add event";
//       if (err.response?.data?.message) {
//         errorMessage = err.response.data.message;
//       } else if (err.response?.status === 401) {
//         errorMessage = "Authentication failed. Please login again.";
//         navigate("/login");
//       }
      
//       alert(errorMessage);
//     } finally {
//       setIsAddingEvent(false);
//     }
//   };

//   // Handle deleting events
//   const handleDeleteEvent = async (eventId) => {
//     if (!window.confirm("Are you sure you want to delete this event?")) {
//       return;
//     }

//     try {
//       await API.delete(`/events/${eventId}`);
//       setEvents(events.filter(event => event._id !== eventId));
//       alert("Event deleted successfully!");
//     } catch (err) {
//       console.error("Error deleting event:", err);
//       alert("Failed to delete event. Please try again.");
//     }
//   };

//   // Handle adding lost/found items
//   const handleAddLostItem = async (e) => {
//     e.preventDefault();
    
//     if (!newLostItem.title.trim() || !newLostItem.description.trim() || !newLostItem.location.trim()) {
//       alert("Please fill in all fields");
//       return;
//     }

//     setIsAddingLostItem(true);
    
//     try {
//       const res = await API.post("/lost-found/report", newLostItem);
//       setLostItems([res.data, ...lostItems]);
//       setNewLostItem({ title: "", description: "", location: "", type: "LOST" });
//       alert("Item reported successfully!");
//     } catch (err) {
//       console.error("Error reporting item:", err);
//       alert("Failed to report item. Please try again.");
//     } finally {
//       setIsAddingLostItem(false);
//     }
//   };
  
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   // Filter items based on type
//   const filteredItems = lostItems.filter(item => {
//     if (activeTab === "lost") return item.type === "LOST";
//     if (activeTab === "found") return item.type === "FOUND";
//     if (activeTab === "myReports") return item.reportedBy?.username === user?.username;
//     return true;
//   });

//   const quickActions = [
//     { 
//       name: "View Courses", 
//       icon: "bi-book-fill", 
//       color: "primary",
//       bgGradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
//       description: "Access your enrolled courses"
//     },
//     { 
//       name: "Messages", 
//       icon: "bi-chat-dots-fill", 
//       color: "success",
//       bgGradient: "linear-gradient(135deg, #10b981, #059669)",
//       description: "Check your messages"
//     },
//     { 
//       name: "Events", 
//       icon: "bi-calendar-event-fill", 
//       color: "purple",
//       bgGradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
//       description: "Upcoming campus events"
//     },
//     { 
//       name: "Library", 
//       icon: "bi-building", 
//       color: "warning",
//       bgGradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
//       description: "Library resources"
//     },
//   ];

//   const recentActivities = [
//     { title: "New assignment posted in Computer Science 101", time: "2 hours ago", type: "assignment", icon: "bi-file-text", color: "primary" },
//     { title: "Campus event: Tech Talk tomorrow at 3 PM", time: "4 hours ago", type: "event", icon: "bi-calendar-event", color: "success" },
//     { title: "Library book due reminder", time: "1 day ago", type: "reminder", icon: "bi-bell", color: "warning" },
//     { title: "Grade posted for Mathematics exam", time: "2 days ago", type: "grade", icon: "bi-trophy", color: "info" },
//   ];

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center" 
//            style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
//         <div className="text-center">
//           <div className="spinner-border text-primary mb-3" style={{width: '3rem', height: '3rem'}} role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <h4 className="text-muted">Loading your dashboard...</h4>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-vh-100" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
//       {/* Header */}
//       <nav className="navbar navbar-expand-lg sticky-top" 
//            style={{
//              background: 'rgba(255, 255, 255, 0.95)',
//              backdropFilter: 'blur(10px)',
//              boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
//              borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
//            }}>
//         <div className="container-fluid">
//           {/* Logo */}
//           <div className="d-flex align-items-center">
//             <div className="d-inline-flex align-items-center justify-content-center text-white rounded-3 me-3" 
//                  style={{
//                    width: '40px', 
//                    height: '40px',
//                    background: 'linear-gradient(135deg, #3b82f6, #6366f1)'
//                  }}>
//               <i className="bi bi-mortarboard fs-5"></i>
//             </div>
//             <span className="navbar-brand mb-0 h4 fw-bold" 
//                   style={{
//                     background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     backgroundClip: 'text'
//                   }}>
//               Campus Connect
//             </span>
//           </div>

//           {/* User Menu */}
//           <div className="d-flex align-items-center gap-3">
//             {/* Notifications */}
//             <button className="btn btn-outline-secondary btn-sm position-relative">
//               <i className="bi bi-bell"></i>
//               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
//                     style={{fontSize: '0.6rem'}}>
//                 3
//               </span>
//             </button>

//             {/* User Profile */}
//             <div className="d-flex align-items-center gap-2">
//               <div className="d-inline-flex align-items-center justify-content-center text-white rounded-circle" 
//                    style={{
//                      width: '35px', 
//                      height: '35px',
//                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)'
//                    }}>
//                 <span className="fw-medium small">
//                   {user?.username?.charAt(0).toUpperCase() || "U"}
//                 </span>
//               </div>
//               <div className="d-none d-md-block">
//                 <div className="fw-medium text-dark small">{user?.username || "User"}</div>
//                 <div className="text-muted" style={{fontSize: '0.75rem'}}>Student</div>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="btn btn-outline-danger btn-sm"
//                 title="Logout"
//               >
//                 <i className="bi bi-box-arrow-right"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="container-fluid py-4">
//         {/* Welcome Section */}
//         <div className="row mb-4">
//           <div className="col-12">
//             <div className="card border-0 shadow-lg overflow-hidden position-relative" 
//                  style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
//               <div className="card-body p-4 text-white position-relative" style={{zIndex: 2}}>
//                 <div className="row align-items-center">
//                   <div className="col-md-8">
//                     <h2 className="card-title fw-bold mb-2">
//                       Welcome back, {user?.username}! 🎉
//                     </h2>
//                     <p className="card-text fs-5 mb-0" style={{opacity: 0.9}}>
//                       Ready to connect with your campus community today?
//                     </p>
//                   </div>
//                   <div className="col-md-4 text-end d-none d-md-block">
//                     <i className="bi bi-mortarboard-fill" style={{fontSize: '4rem', opacity: 0.3}}></i>
//                   </div>
//                 </div>
//               </div>
//               {/* Decorative elements */}
//               <div className="position-absolute top-0 end-0" style={{opacity: 0.1, zIndex: 1}}>
//                 <div className="rounded-circle bg-white" 
//                      style={{
//                        width: '100px', 
//                        height: '100px', 
//                        marginTop: '-20px', 
//                        marginRight: '-20px',
//                        animation: 'float 6s ease-in-out infinite'
//                      }}></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="row mb-4">
//           <div className="col-12">
//             <h3 className="fw-semibold text-dark mb-3">Quick Actions</h3>
//           </div>
//           {quickActions.map((action, index) => (
//             <div className="col-6 col-md-3 mb-3" key={index}>
//               <div className="card border-0 h-100 text-center shadow-sm" 
//                    style={{
//                      borderRadius: '20px',
//                      transition: 'all 0.3s ease',
//                      cursor: 'pointer'
//                    }}
//                    onMouseEnter={(e) => {
//                      e.currentTarget.style.transform = 'translateY(-5px)';
//                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.2)';
//                    }}
//                    onMouseLeave={(e) => {
//                      e.currentTarget.style.transform = 'translateY(0)';
//                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.1)';
//                    }}>
//                 <div className="card-body p-4">
//                   <div className="d-inline-flex align-items-center justify-content-center rounded-3 text-white mb-3" 
//                        style={{
//                          width: '60px', 
//                          height: '60px',
//                          background: action.bgGradient
//                        }}>
//                     <i className={`${action.icon} fs-4`}></i>
//                   </div>
//                   <h5 className="card-title fw-bold text-dark mb-2">{action.name}</h5>
//                   <p className="card-text text-muted small">{action.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Lost and Found Section */}
//         <div className="row mb-4">
//           <div className="col-12">
//             <div className="card border-0 shadow-sm" style={{borderRadius: '20px'}}>
//               <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
//                 <div className="d-flex align-items-center">
//                   <i className="bi bi-search text-warning me-2 fs-4"></i>
//                   <h4 className="fw-semibold text-dark mb-0">Lost & Found</h4>
//                 </div>
//                 <span className="badge bg-warning">{lostItems.length}</span>
//               </div>
//               <div className="card-body">
//                 {/* Tab Navigation */}
//                 <ul className="nav nav-pills mb-4" id="lostFoundTabs" role="tablist">
//                   <li className="nav-item" role="presentation">
//                     <button 
//                       className={`nav-link ${activeTab === "lost" ? "active" : ""}`} 
//                       onClick={() => setActiveTab("lost")}
//                       type="button"
//                     >
//                       <i className="bi bi-exclamation-circle me-1"></i>
//                       Lost Items ({lostItems.filter(item => item.type === "LOST").length})
//                     </button>
//                   </li>
//                   <li className="nav-item" role="presentation">
//                     <button 
//                       className={`nav-link ${activeTab === "found" ? "active" : ""}`}
//                       onClick={() => setActiveTab("found")}
//                       type="button"
//                     >
//                       <i className="bi bi-check-circle me-1"></i>
//                       Found Items ({lostItems.filter(item => item.type === "FOUND").length})
//                     </button>
//                   </li>
//                   <li className="nav-item" role="presentation">
//                     <button 
//                       className={`nav-link ${activeTab === "myReports" ? "active" : ""}`}
//                       onClick={() => setActiveTab("myReports")}
//                       type="button"
//                     >
//                       <i className="bi bi-person me-1"></i>
//                       My Reports ({lostItems.filter(item => item.reportedBy?.username === user?.username).length})
//                     </button>
//                   </li>
//                 </ul>

//                 {/* Report New Item Form */}
//                 <div className="row mb-4">
//                   <div className="col-md-12">
//                     <div className="border rounded-3 p-3" style={{backgroundColor: '#f8f9fa'}}>
//                       <h6 className="fw-semibold mb-3">
//                         <i className="bi bi-plus-circle me-2"></i>Report Lost/Found Item
//                       </h6>
//                       <form onSubmit={handleAddLostItem}>
//                         <div className="row">
//                           <div className="col-md-3 mb-2">
//                             <select
//                               className="form-select form-select-sm"
//                               value={newLostItem.type}
//                               onChange={(e) => setNewLostItem({ ...newLostItem, type: e.target.value })}
//                             >
//                               <option value="LOST">Lost Item</option>
//                               <option value="FOUND">Found Item</option>
//                             </select>
//                           </div>
//                           <div className="col-md-3 mb-2">
//                             <input
//                               type="text"
//                               className="form-control form-control-sm"
//                               placeholder="Item name"
//                               value={newLostItem.title}
//                               onChange={(e) => setNewLostItem({ ...newLostItem, title: e.target.value })}
//                               required
//                             />
//                           </div>
//                           <div className="col-md-3 mb-2">
//                             <input
//                               type="text"
//                               className="form-control form-control-sm"
//                               placeholder="Location"
//                               value={newLostItem.location}
//                               onChange={(e) => setNewLostItem({ ...newLostItem, location: e.target.value })}
//                               required
//                             />
//                           </div>
//                           <div className="col-md-3 mb-2">
//                             <div className="input-group">
//                               <input
//                                 type="text"
//                                 className="form-control form-control-sm"
//                                 placeholder="Description"
//                                 value={newLostItem.description}
//                                 onChange={(e) => setNewLostItem({ ...newLostItem, description: e.target.value })}
//                                 required
//                               />
//                               <button 
//                                 type="submit" 
//                                 className="btn btn-warning btn-sm"
//                                 disabled={isAddingLostItem}
//                               >
//                                 {isAddingLostItem ? (
//                                   <span className="spinner-border spinner-border-sm" role="status"></span>
//                                 ) : (
//                                   <i className="bi bi-send"></i>
//                                 )}
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Items List */}
//                 <div className="row">
//                   {filteredItems.length > 0 ? (
//                     filteredItems.map((item, index) => (
//                       <div key={item._id || index} className="col-md-6 col-lg-4 mb-3">
//                         <div className={`card border-0 shadow-sm h-100 border-start border-4 ${
//                           item.type === "LOST" ? "border-danger" : "border-success"
//                         }`} style={{borderRadius: '15px'}}>
//                           <div className="card-body p-3">
//                             <div className="d-flex justify-content-between align-items-start mb-2">
//                               <h6 className="card-title fw-bold text-dark mb-1">{item.title}</h6>
//                               <span className={`badge ${
//                                 item.type === "LOST" ? "bg-danger" : "bg-success"
//                               }`}>
//                                 {item.type}
//                               </span>
//                             </div>
//                             <p className="card-text text-muted small mb-2">{item.description}</p>
//                             <div className="small text-muted">
//                               <div><i className="bi bi-geo-alt me-1"></i>{item.location}</div>
//                               <div><i className="bi bi-person me-1"></i>By: {item.reportedBy?.username || "Anonymous"}</div>
//                               <div><i className="bi bi-calendar me-1"></i>
//                                 {new Date(item.createdAt).toLocaleDateString()}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="col-12 text-center py-4">
//                       <i className="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
//                       <p className="text-muted">No {activeTab} items found</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Dashboard Content Grid */}
//         <div className="row">
//           {/* Recent Activities */}
//           <div className="col-lg-8 mb-4">
//             <div className="card border-0 shadow-sm h-100" style={{borderRadius: '20px'}}>
//               <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
//                 <h4 className="fw-semibold text-dark mb-0">Recent Activities</h4>
//                 <button className="btn btn-sm btn-outline-primary">View All</button>
//               </div>
//               <div className="card-body">
//                 <div className="list-group list-group-flush">
//                   {recentActivities.map((activity, index) => (
//                     <div key={index} className="list-group-item border-0 px-0 py-3 d-flex align-items-start">
//                       <div className={`d-flex align-items-center justify-content-center rounded-circle me-3 bg-${activity.color}`} 
//                            style={{
//                              width: '40px', 
//                              height: '40px', 
//                              fontSize: '0.9rem',
//                              opacity: 0.1
//                            }}>
//                         <i className={`${activity.icon} text-${activity.color}`}></i>
//                       </div>
//                       <div className="flex-grow-1">
//                         <p className="fw-medium text-dark mb-1">{activity.title}</p>
//                         <small className="text-muted">{activity.time}</small>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="col-lg-4">
//             {/* Add Event Form */}
//             <div className="card border-0 shadow-sm mb-4" style={{borderRadius: '20px'}}>
//               <div className="card-header bg-white border-0">
//                 <h5 className="fw-semibold text-dark mb-0">Add New Event</h5>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={handleAddEvent}>
//                   <div className="mb-3">
//                     <label htmlFor="eventTitle" className="form-label small fw-medium">Event Title</label>
//                     <input
//                       type="text"
//                       id="eventTitle"
//                       className="form-control"
//                       placeholder="Enter event title"
//                       value={newEvent.title}
//                       onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//                       required
//                       disabled={isAddingEvent}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="eventDescription" className="form-label small fw-medium">Description</label>
//                     <textarea
//                       id="eventDescription"
//                       className="form-control"
//                       rows="3"
//                       placeholder="Enter event description"
//                       value={newEvent.description}
//                       onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
//                       required
//                       disabled={isAddingEvent}
//                     />
//                   </div>
//                   <button 
//                     type="submit" 
//                     className="btn btn-primary w-100"
//                     disabled={isAddingEvent}
//                   >
//                     {isAddingEvent ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                         Adding...
//                       </>
//                     ) : (
//                       <>
//                         <i className="bi bi-plus-circle me-2"></i>
//                         Add Event
//                       </>
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </div>

//             {/* Upcoming Events */}
//             <div className="card border-0 shadow-sm mb-4" style={{borderRadius: '20px'}}>
//               <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
//                 <h5 className="fw-semibold text-dark mb-0">Upcoming Events</h5>
//                 <span className="badge bg-primary">{events.length}</span>
//               </div>
//               <div className="card-body">
//                 {events.length > 0 ? (
//                   events.map((event, index) => (
//                     <div key={event._id || index} className="border-start border-4 border-primary ps-3 py-2 mb-3 position-relative">
//                       <div className="d-flex justify-content-between align-items-start">
//                         <div className="flex-grow-1">
//                           <h6 className="fw-medium text-dark mb-1">{event.title}</h6>
//                           <div className="small text-muted">
//                             <i className="bi bi-geo-alt me-1"></i>{event.description}
//                           </div>
//                         </div>
//                         <div className="dropdown">
//                           <button 
//                             className="btn btn-sm btn-outline-secondary dropdown-toggle" 
//                             type="button" 
//                             data-bs-toggle="dropdown" 
//                             aria-expanded="false"
//                             style={{border: 'none', fontSize: '0.8rem'}}
//                           >
//                             <i className="bi bi-three-dots"></i>
//                           </button>
//                           <ul className="dropdown-menu dropdown-menu-end">
//                             <li>
//                               <button 
//                                 className="dropdown-item text-danger"
//                                 onClick={() => handleDeleteEvent(event._id)}
//                               >
//                                 <i className="bi bi-trash me-2"></i>Delete Event
//                               </button>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center text-muted py-3">
//                     <i className="bi bi-calendar-x fs-1 mb-2 d-block"></i>
//                     <p className="small">No upcoming events</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Campus Stats */}
//             <div className="card border-0 shadow-sm" style={{borderRadius: '20px'}}>
//               <div className="card-header bg-white border-0">
//                 <h5 className="fw-semibold text-dark mb-0">Campus Stats</h5>
//               </div>
//               <div className="card-body">
//                 <div className="row g-3">
//                   <div className="col-6">
//                     <div className="text-center">
//                       <div className="h4 fw-bold text-primary mb-1">2,847</div>
//                       <div className="small text-muted">Active Students</div>
//                     </div>
//                   </div>
//                   <div className="col-6">
//                     <div className="text-center">
//                       <div className="h4 fw-bold text-success mb-1">342</div>
//                       <div className="small text-muted">Online Now</div>
//                     </div>
//                   </div>
//                   <div className="col-6">
//                     <div className="text-center">
//                       <div className="h4 fw-bold text-info mb-1">{events.length}</div>
//                       <div className="small text-muted">Events</div>
//                     </div>
//                   </div>
//                   <div className="col-6">
//                     <div className="text-center">
//                       <div className="h4 fw-bold text-warning mb-1">{lostItems.length}</div>
//                       <div className="small text-muted">Lost & Found</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Features Section */}
//         <div className="row mt-4">
//           <div className="col-12">
//             <div className="card border-0 shadow-lg overflow-hidden" 
//                  style={{
//                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
//                    borderRadius: '20px'
//                  }}>
//               <div className="card-body p-4 text-white text-center">
//                 <h3 className="fw-bold mb-3">Explore Campus Connect</h3>
//                 <p className="fs-5 mb-4" style={{opacity: 0.9}}>
//                   Discover new features and connect with your campus community
//                 </p>
//                 <div className="d-flex flex-wrap justify-content-center gap-3">
//                   <button className="btn btn-outline-light" 
//                           style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
//                           onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                           onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
//                     <i className="bi bi-people me-2"></i>Join Study Groups
//                   </button>
//                   <button className="btn btn-outline-light" 
//                           style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
//                           onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                           onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
//                     <i className="bi bi-calendar-event me-2"></i>Browse Events
//                   </button>
//                   <button className="btn btn-outline-light" 
//                           style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
//                           onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                           onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
//                     <i className="bi bi-search me-2"></i>Lost & Found
//                   </button>
//                   <button className="btn btn-outline-light" 
//                           style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
//                           onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                           onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
//                     <i className="bi bi-chat-dots me-2"></i>Connect with Peers
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* CSS Animation Keyframes */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
        
//         .nav-pills .nav-link {
//           border-radius: 12px;
//           margin-right: 8px;
//           color: #6c757d;
//           border: 2px solid transparent;
//         }
        
//         .nav-pills .nav-link.active {
//           background: linear-gradient(135deg, #3b82f6, #6366f1);
//           color: white;
//           border-color: transparent;
//         }
        
//         .nav-pills .nav-link:hover:not(.active) {
//           background-color: #f8f9fa;
//           color: #495057;
//         }
        
//         .dropdown-toggle::after {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import API from "../api/axiosConfig";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [events, setEvents] = useState([]);
//   const [newEvent, setNewEvent] = useState({ title: "", description: "" });
//   const [isAddingEvent, setIsAddingEvent] = useState(false);
  
//   // Lost and Found states
//   const [lostItems, setLostItems] = useState([]);
//   const [newLostItem, setNewLostItem] = useState({ 
//     title: "", 
//     description: "", 
//     location: "", 
//     type: "LOST" 
//   });
//   const [isAddingLostItem, setIsAddingLostItem] = useState(false);
//   const [activeTab, setActiveTab] = useState("lost");
  
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     API.get("/user/profile")
//       .then((res) => {
//         setUser(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching user profile:", err);
//         setLoading(false);
//         if (err.response?.status === 401) {
//           navigate("/login");
//         }
//       });
//   }, [navigate]);
   
//   // Fetch events - matches your backend endpoint
//   useEffect(() => {
//     if (!token) return;
    
//     API.get("/events")
//       .then((res) => {
//         console.log("Events fetched:", res.data);
//         // Handle both array and object responses
//         if (Array.isArray(res.data)) {
//           setEvents(res.data);
//         } else {
//           setEvents([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching events:", err);
//         setEvents([]);
//         if (err.response?.status === 401) {
//           navigate("/login");
//         }
//       });
//   }, [token, navigate]);

//   // Fetch lost and found items - corrected to match your backend
//   useEffect(() => {
//     if (!token) return;
    
//     // Using the correct endpoint from your backend: /api/lostfound
//     API.get("/lostfound")
//       .then((res) => {
//         console.log("Lost and found items fetched:", res.data);
//         setLostItems(Array.isArray(res.data) ? res.data : []);
//       })
//       .catch((err) => {
//         console.error("Error fetching lost and found items:", err);
//         setLostItems([]);
//         if (err.response?.status === 401) {
//           navigate("/login");
//         }
//       });
//   }, [token, navigate]);
  
//   // Handle adding events
//   const handleAddEvent = async (e) => {
//     e.preventDefault();
    
//     if (!newEvent.title.trim() || !newEvent.description.trim()) {
//       alert("Please fill in both title and description");
//       return;
//     }

//     setIsAddingEvent(true);
    
//     try {
//       console.log("Sending event data:", newEvent);
//       const res = await API.post("/events", newEvent);
//       console.log("Event added successfully:", res.data);
      
//       // Add the new event to the list
//       setEvents(prev => [...prev, res.data]);
//       setNewEvent({ title: "", description: "" });
//       alert("Event added successfully!");
//     } catch (err) {
//       console.error("Error adding event:", err);
//       console.error("Error response:", err.response?.data);
      
//       let errorMessage = "Failed to add event";
//       if (err.response?.status === 401) {
//         errorMessage = "Authentication failed. Please login again.";
//         navigate("/login");
//       } else if (err.response?.status === 400) {
//         errorMessage = err.response.data || "Invalid event data";
//       } else if (err.response?.status === 500) {
//         errorMessage = "Server error. Please try again later.";
//       }
      
//       alert(errorMessage);
//     } finally {
//       setIsAddingEvent(false);
//     }
//   };

//   // Handle deleting events - matches your backend DELETE endpoint
//   const handleDeleteEvent = async (eventId) => {
//     if (!window.confirm("Are you sure you want to delete this event?")) {
//       return;
//     }

//     try {
//       await API.delete(`/events/${eventId}`);
//       // Remove the event from the local state
//       setEvents(events.filter(event => event.id !== eventId));
//       alert("Event deleted successfully!");
//     } catch (err) {
//       console.error("Error deleting event:", err);
      
//       let errorMessage = "Failed to delete event";
//       if (err.response?.status === 404) {
//         errorMessage = "Event not found";
//       } else if (err.response?.status === 401) {
//         errorMessage = "Authentication failed. Please login again.";
//         navigate("/login");
//       }
      
//       alert(errorMessage);
//     }
//   };

//   // Handle adding lost/found items - corrected to match your backend
//   const handleAddLostItem = async (e) => {
//     e.preventDefault();
    
//     if (!newLostItem.title.trim() || !newLostItem.description.trim() || !newLostItem.location.trim()) {
//       alert("Please fill in all fields");
//       return;
//     }

//     setIsAddingLostItem(true);
    
//     try {
//       // Using the correct endpoint: /api/lostfound (POST)
//       const res = await API.post("/lostfound", newLostItem);
//       console.log("Item reported successfully:", res.data);
      
//       // Add the new item to the list
//       setLostItems(prev => [res.data, ...prev]);
//       setNewLostItem({ title: "", description: "", location: "", type: "LOST" });
//       alert("Item reported successfully!");
//     } catch (err) {
//       console.error("Error reporting item:", err);
      
//       let errorMessage = "Failed to report item";
//       if (err.response?.status === 401) {
//         errorMessage = "Authentication failed. Please login again.";
//         navigate("/login");
//       } else if (err.response?.status === 400) {
//         errorMessage = err.response.data || "Invalid item data";
//       }
      
//       alert(errorMessage);
//     } finally {
//       setIsAddingLostItem(false);
//     }
//   };
  
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   // Filter items based on type
//   const filteredItems = lostItems.filter(item => {
//     if (activeTab === "lost") return item.type === "LOST";
//     if (activeTab === "found") return item.type === "FOUND";
//     if (activeTab === "myReports") return item.reportedBy?.username === user?.username;
//     return true;
//   });

//   const quickActions = [
//     { 
//       name: "View Courses", 
//       icon: "bi-book-fill", 
//       color: "primary",
//       bgGradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
//       description: "Access your enrolled courses"
//     },
//     { 
//       name: "Messages", 
//       icon: "bi-chat-dots-fill", 
//       color: "success",
//       bgGradient: "linear-gradient(135deg, #10b981, #059669)",
//       description: "Check your messages"
//     },
//     { 
//       name: "Events", 
//       icon: "bi-calendar-event-fill", 
//       color: "purple",
//       bgGradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
//       description: "Upcoming campus events"
//     },
//     { 
//       name: "Library", 
//       icon: "bi-building", 
//       color: "warning",
//       bgGradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
//       description: "Library resources"
//     },
//   ];

//   const recentActivities = [
//     { title: "New assignment posted in Computer Science 101", time: "2 hours ago", type: "assignment", icon: "bi-file-text", color: "primary" },
//     { title: "Campus event: Tech Talk tomorrow at 3 PM", time: "4 hours ago", type: "event", icon: "bi-calendar-event", color: "success" },
//     { title: "Library book due reminder", time: "1 day ago", type: "reminder", icon: "bi-bell", color: "warning" },
//     { title: "Grade posted for Mathematics exam", time: "2 days ago", type: "grade", icon: "bi-trophy", color: "info" },
//   ];

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center" 
//            style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
//         <div className="text-center">
//           <div className="spinner-border text-primary mb-3" style={{width: '3rem', height: '3rem'}} role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <h4 className="text-muted">Loading your dashboard...</h4>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-vh-100" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
//       {/* Header */}
//       <nav className="navbar navbar-expand-lg sticky-top" 
//            style={{
//              background: 'rgba(255, 255, 255, 0.95)',
//              backdropFilter: 'blur(10px)',
//              boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
//              borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
//            }}>
//         <div className="container-fluid">
//           {/* Logo */}
//           <div className="d-flex align-items-center">
//             <div className="d-inline-flex align-items-center justify-content-center text-white rounded-3 me-3" 
//                  style={{
//                    width: '40px', 
//                    height: '40px',
//                    background: 'linear-gradient(135deg, #3b82f6, #6366f1)'
//                  }}>
//               <i className="bi bi-mortarboard fs-5"></i>
//             </div>
//             <span className="navbar-brand mb-0 h4 fw-bold" 
//                   style={{
//                     background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     backgroundClip: 'text'
//                   }}>
//               Campus Connect
//             </span>
//           </div>

//           {/* User Menu */}
//           <div className="d-flex align-items-center gap-3">
//             {/* Notifications */}
//             <button className="btn btn-outline-secondary btn-sm position-relative">
//               <i className="bi bi-bell"></i>
//               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
//                     style={{fontSize: '0.6rem'}}>
//                 3
//               </span>
//             </button>

//             {/* User Profile */}
//             <div className="d-flex align-items-center gap-2">
//               <div className="d-inline-flex align-items-center justify-content-center text-white rounded-circle" 
//                    style={{
//                      width: '35px', 
//                      height: '35px',
//                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)'
//                    }}>
//                 <span className="fw-medium small">
//                   {user?.username?.charAt(0).toUpperCase() || "U"}
//                 </span>
//               </div>
//               <div className="d-none d-md-block">
//                 <div className="fw-medium text-dark small">{user?.username || "User"}</div>
//                 <div className="text-muted" style={{fontSize: '0.75rem'}}>Student</div>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="btn btn-outline-danger btn-sm"
//                 title="Logout"
//               >
//                 <i className="bi bi-box-arrow-right"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="container-fluid py-4">
//         {/* Welcome Section */}
//         <div className="row mb-4">
//           <div className="col-12">
//             <div className="card border-0 shadow-lg overflow-hidden position-relative" 
//                  style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
//               <div className="card-body p-4 text-white position-relative" style={{zIndex: 2}}>
//                 <div className="row align-items-center">
//                   <div className="col-md-8">
//                     <h2 className="card-title fw-bold mb-2">
//                       Welcome back, {user?.username}! 🎉
//                     </h2>
//                     <p className="card-text fs-5 mb-0" style={{opacity: 0.9}}>
//                       Ready to connect with your campus community today?
//                     </p>
//                   </div>
//                   <div className="col-md-4 text-end d-none d-md-block">
//                     <i className="bi bi-mortarboard-fill" style={{fontSize: '4rem', opacity: 0.3}}></i>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="row mb-4">
//           <div className="col-12">
//             <h3 className="fw-semibold text-dark mb-3">Quick Actions</h3>
//           </div>
//           {quickActions.map((action, index) => (
//             <div className="col-6 col-md-3 mb-3" key={index}>
//               <div className="card border-0 h-100 text-center shadow-sm" 
//                    style={{
//                      borderRadius: '20px',
//                      transition: 'all 0.3s ease',
//                      cursor: 'pointer'
//                    }}
//                    onMouseEnter={(e) => {
//                      e.currentTarget.style.transform = 'translateY(-5px)';
//                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.2)';
//                    }}
//                    onMouseLeave={(e) => {
//                      e.currentTarget.style.transform = 'translateY(0)';
//                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.1)';
//                    }}>
//                 <div className="card-body p-4">
//                   <div className="d-inline-flex align-items-center justify-content-center rounded-3 text-white mb-3" 
//                        style={{
//                          width: '60px', 
//                          height: '60px',
//                          background: action.bgGradient
//                        }}>
//                     <i className={`${action.icon} fs-4`}></i>
//                   </div>
//                   <h5 className="card-title fw-bold text-dark mb-2">{action.name}</h5>
//                   <p className="card-text text-muted small">{action.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Lost and Found Section */}
//         <div className="row mb-4">
//           <div className="col-12">
//             <div className="card border-0 shadow-sm" style={{borderRadius: '20px'}}>
//               <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
//                 <div className="d-flex align-items-center">
//                   <i className="bi bi-search text-warning me-2 fs-4"></i>
//                   <h4 className="fw-semibold text-dark mb-0">Lost & Found</h4>
//                 </div>
//                 <span className="badge bg-warning">{lostItems.length}</span>
//               </div>
//               <div className="card-body">
//                 {/* Tab Navigation */}
//                 <ul className="nav nav-pills mb-4" id="lostFoundTabs" role="tablist">
//                   <li className="nav-item" role="presentation">
//                     <button 
//                       className={`nav-link ${activeTab === "lost" ? "active" : ""}`} 
//                       onClick={() => setActiveTab("lost")}
//                       type="button"
//                     >
//                       <i className="bi bi-exclamation-circle me-1"></i>
//                       Lost Items ({lostItems.filter(item => item.type === "LOST").length})
//                     </button>
//                   </li>
//                   <li className="nav-item" role="presentation">
//                     <button 
//                       className={`nav-link ${activeTab === "found" ? "active" : ""}`}
//                       onClick={() => setActiveTab("found")}
//                       type="button"
//                     >
//                       <i className="bi bi-check-circle me-1"></i>
//                       Found Items ({lostItems.filter(item => item.type === "FOUND").length})
//                     </button>
//                   </li>
//                   <li className="nav-item" role="presentation">
//                     <button 
//                       className={`nav-link ${activeTab === "myReports" ? "active" : ""}`}
//                       onClick={() => setActiveTab("myReports")}
//                       type="button"
//                     >
//                       <i className="bi bi-person me-1"></i>
//                       My Reports ({lostItems.filter(item => item.reportedBy?.username === user?.username).length})
//                     </button>
//                   </li>
//                 </ul>

//                 {/* Report New Item Form */}
//                 <div className="row mb-4">
//                   <div className="col-md-12">
//                     <div className="border rounded-3 p-3" style={{backgroundColor: '#f8f9fa'}}>
//                       <h6 className="fw-semibold mb-3">
//                         <i className="bi bi-plus-circle me-2"></i>Report Lost/Found Item
//                       </h6>
//                       <form onSubmit={handleAddLostItem}>
//                         <div className="row">
//                           <div className="col-md-3 mb-2">
//                             <select
//                               className="form-select form-select-sm"
//                               value={newLostItem.type}
//                               onChange={(e) => setNewLostItem({ ...newLostItem, type: e.target.value })}
//                             >
//                               <option value="LOST">Lost Item</option>
//                               <option value="FOUND">Found Item</option>
//                             </select>
//                           </div>
//                           <div className="col-md-3 mb-2">
//                             <input
//                               type="text"
//                               className="form-control form-control-sm"
//                               placeholder="Item name"
//                               value={newLostItem.title}
//                               onChange={(e) => setNewLostItem({ ...newLostItem, title: e.target.value })}
//                               required
//                             />
//                           </div>
//                           <div className="col-md-3 mb-2">
//                             <input
//                               type="text"
//                               className="form-control form-control-sm"
//                               placeholder="Location"
//                               value={newLostItem.location}
//                               onChange={(e) => setNewLostItem({ ...newLostItem, location: e.target.value })}
//                               required
//                             />
//                           </div>
//                           <div className="col-md-3 mb-2">
//                             <div className="input-group">
//                               <input
//                                 type="text"
//                                 className="form-control form-control-sm"
//                                 placeholder="Description"
//                                 value={newLostItem.description}
//                                 onChange={(e) => setNewLostItem({ ...newLostItem, description: e.target.value })}
//                                 required
//                               />
//                               <button 
//                                 type="submit" 
//                                 className="btn btn-warning btn-sm"
//                                 disabled={isAddingLostItem}
//                               >
//                                 {isAddingLostItem ? (
//                                   <span className="spinner-border spinner-border-sm" role="status"></span>
//                                 ) : (
//                                   <i className="bi bi-send"></i>
//                                 )}
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Items List */}
//                 <div className="row">
//                   {filteredItems.length > 0 ? (
//                     filteredItems.map((item, index) => (
//                       <div key={item.id || index} className="col-md-6 col-lg-4 mb-3">
//                         <div className={`card border-0 shadow-sm h-100 border-start border-4 ${
//                           item.type === "LOST" ? "border-danger" : "border-success"
//                         }`} style={{borderRadius: '15px'}}>
//                           <div className="card-body p-3">
//                             <div className="d-flex justify-content-between align-items-start mb-2">
//                               <h6 className="card-title fw-bold text-dark mb-1">{item.title}</h6>
//                               <span className={`badge ${
//                                 item.type === "LOST" ? "bg-danger" : "bg-success"
//                               }`}>
//                                 {item.type}
//                               </span>
//                             </div>
//                             <p className="card-text text-muted small mb-2">{item.description}</p>
//                             <div className="small text-muted">
//                               <div><i className="bi bi-geo-alt me-1"></i>{item.location}</div>
//                               <div><i className="bi bi-person me-1"></i>By: {item.reportedBy?.username || "Anonymous"}</div>
//                               <div><i className="bi bi-calendar me-1"></i>
//                                 {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recently"}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="col-12 text-center py-4">
//                       <i className="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
//                       <p className="text-muted">No {activeTab} items found</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Dashboard Content Grid */}
//         <div className="row">
//           {/* Recent Activities */}
//           <div className="col-lg-8 mb-4">
//             <div className="card border-0 shadow-sm h-100" style={{borderRadius: '20px'}}>
//               <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
//                 <h4 className="fw-semibold text-dark mb-0">Recent Activities</h4>
//                 <button className="btn btn-sm btn-outline-primary">View All</button>
//               </div>
//               <div className="card-body">
//                 <div className="list-group list-group-flush">
//                   {recentActivities.map((activity, index) => (
//                     <div key={index} className="list-group-item border-0 px-0 py-3 d-flex align-items-start">
//                       <div className={`d-flex align-items-center justify-content-center rounded-circle me-3 bg-${activity.color}`} 
//                            style={{
//                              width: '40px', 
//                              height: '40px', 
//                              fontSize: '0.9rem',
//                              opacity: 0.1
//                            }}>
//                         <i className={`${activity.icon} text-${activity.color}`}></i>
//                       </div>
//                       <div className="flex-grow-1">
//                         <p className="fw-medium text-dark mb-1">{activity.title}</p>
//                         <small className="text-muted">{activity.time}</small>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="col-lg-4">
//             {/* Add Event Form */}
//             <div className="card border-0 shadow-sm mb-4" style={{borderRadius: '20px'}}>
//               <div className="card-header bg-white border-0">
//                 <h5 className="fw-semibold text-dark mb-0">Add New Event</h5>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={handleAddEvent}>
//                   <div className="mb-3">
//                     <label htmlFor="eventTitle" className="form-label small fw-medium">Event Title</label>
//                     <input
//                       type="text"
//                       id="eventTitle"
//                       className="form-control"
//                       placeholder="Enter event title"
//                       value={newEvent.title}
//                       onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//                       required
//                       disabled={isAddingEvent}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="eventDescription" className="form-label small fw-medium">Description</label>
//                     <textarea
//                       id="eventDescription"
//                       className="form-control"
//                       rows="3"
//                       placeholder="Enter event description"
//                       value={newEvent.description}
//                       onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
//                       required
//                       disabled={isAddingEvent}
//                     />
//                   </div>
//                   <button 
//                     type="submit" 
//                     className="btn btn-primary w-100"
//                     disabled={isAddingEvent}
//                   >
//                     {isAddingEvent ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                         Adding...
//                       </>
//                     ) : (
//                       <>
//                         <i className="bi bi-plus-circle me-2"></i>
//                         Add Event
//                       </>
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </div>

//             {/* Upcoming Events */}
//             <div className="card border-0 shadow-sm mb-4" style={{borderRadius: '20px'}}>
//               <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
//                 <h5 className="fw-semibold text-dark mb-0">Upcoming Events</h5>
//                 <span className="badge bg-primary">{events.length}</span>
//               </div>
//               <div className="card-body">
//                 {events.length > 0 ? (
//                   events.map((event, index) => (
//                     <div key={event.id || index} className="border-start border-4 border-primary ps-3 py-2 mb-3 position-relative">
//                       <div className="d-flex justify-content-between align-items-start">
//                         <div className="flex-grow-1">
//                           <h6 className="fw-medium text-dark mb-1">{event.title}</h6>
//                           <div className="small text-muted">
//                             <i className="bi bi-geo-alt me-1"></i>{event.description}
//                           </div>
//                         </div>
//                         {/* Delete Button */}
//                         <button 
//                           className="btn btn-sm btn-outline-danger"
//                           onClick={() => handleDeleteEvent(event.id)}
//                           title="Delete Event"
//                           style={{fontSize: '0.7rem'}}
//                         >
//                           <i className="bi bi-trash"></i>
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center text-muted py-3">
//                     <i className="bi bi-calendar-x fs-1 mb-2 d-block"></i>
//                     <p className="small">No upcoming events</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Campus Stats */}
//             <div className="card border-0 shadow-sm" style={{borderRadius: '20px'}}>
//               <div className="card-header bg-white border-0">
//                 <h5 className="fw-semibold text-dark mb-0">Campus Stats</h5>
//               </div>
//               <div className="card-body">
//                 <div className="row g-3">
//                   <div className="col-6">
//                     <div className="text-center">
//                       <div className="h4 fw-bold text-primary mb-1">2,847</div>
//                       <div className="small text-muted">Active Students</div>
//                     </div>
//                   </div>
//                   <div className="col-6">
//                     <div className="text-center">
//                       <div className="h4 fw-bold text-success mb-1">342</div>
//                       <div className="small text-muted">Online Now</div>
//                     </div>
//                   </div>
//                   <div className="col-6">
//                     <div className="text-center">
//                       <div className="h4 fw-bold text-info mb-1">{events.length}</div>
//                       <div className="small text-muted">Events</div>
//                     </div>
//                   </div>
//                   <div className="col-6">
//                     <div className="text-center">
//                       <div className="h4 fw-bold text-warning mb-1">{lostItems.length}</div>
//                       <div className="small text-muted">Lost & Found</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Features Section */}
//         <div className="row mt-4">
//           <div className="col-12">
//             <div className="card border-0 shadow-lg overflow-hidden" 
//                  style={{
//                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
//                    borderRadius: '20px'
//                  }}>
//               <div className="card-body p-4 text-white text-center">
//                 <h3 className="fw-bold mb-3">Explore Campus Connect</h3>
//                 <p className="fs-5 mb-4" style={{opacity: 0.9}}>
//                   Discover new features and connect with your campus community
//                 </p>
//                 <div className="d-flex flex-wrap justify-content-center gap-3">
//                   <button className="btn btn-outline-light" 
//                           style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
//                           onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                           onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
//                     <i className="bi bi-people me-2"></i>Join Study Groups
//                   </button>
//                   <button className="btn btn-outline-light" 
//                           style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
//                           onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                           onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
//                     <i className="bi bi-calendar-event me-2"></i>Browse Events
//                   </button>
//                   <button className="btn btn-outline-light" 
//                           style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
//                           onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                           onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
//                     <i className="bi bi-search me-2"></i>Lost & Found
//                   </button>
//                   <button className="btn btn-outline-light" 
//                           style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
//                           onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
//                           onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
//                     <i className="bi bi-chat-dots me-2"></i>Connect with Peers
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* CSS Animation Keyframes */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
        
//         .nav-pills .nav-link {
//           border-radius: 12px;
//           margin-right: 8px;
//           color: #6c757d;
//           border: 2px solid transparent;
//         }
        
//         .nav-pills .nav-link.active {
//           background: linear-gradient(135deg, #3b82f6, #6366f1);
//           color: white;
//           border-color: transparent;
//         }
        
//         .nav-pills .nav-link:hover:not(.active) {
//           background-color: #f8f9fa;
//           color: #495057;
//         }
//       `}</style>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", description: "" });
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [enrolledStudentsCount, setEnrolledStudentsCount] = useState(0);
  
  // Lost and Found states
  const [lostItems, setLostItems] = useState([]);
  const [newLostItem, setNewLostItem] = useState({ 
    title: "", 
    description: "", 
    location: "", 
    type: "LOST" 
  });
  const [isAddingLostItem, setIsAddingLostItem] = useState(false);
  const [activeTab, setActiveTab] = useState("lost");
  
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
   
  // Fetch events
  useEffect(() => {
    if (!token) return;
    
    API.get("/events")
      .then((res) => {
        console.log("Events fetched:", res.data);
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else {
          setEvents([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, [token, navigate]);

  // Fetch lost and found items
  useEffect(() => {
    if (!token) return;
    
    API.get("/lostfound")
      .then((res) => {
        console.log("Lost and found items fetched:", res.data);
        setLostItems(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching lost and found items:", err);
        setLostItems([]);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, [token, navigate]);

  // Fetch enrolled students count
  useEffect(() => {
    if (!token) return;
    
    API.get("/user/enrolled-count")
      .then((res) => {
        console.log("Enrolled students count fetched:", res.data);
        const count = res.data.count || res.data || 0;
        setEnrolledStudentsCount(count);
      })
      .catch((err) => {
        console.error("Error fetching enrolled students count:", err);
        setEnrolledStudentsCount(0);
      });
  }, [token]);
  
  // Handle adding events
  const handleAddEvent = async (e) => {
    e.preventDefault();
    
    if (!newEvent.title.trim() || !newEvent.description.trim()) {
      alert("Please fill in both title and description");
      return;
    }

    setIsAddingEvent(true);
    
    try {
      console.log("Sending event data:", newEvent);
      const res = await API.post("/events", newEvent);
      console.log("Event added successfully:", res.data);
      
      setEvents(prev => [...prev, res.data]);
      setNewEvent({ title: "", description: "" });
      alert("Event added successfully!");
    } catch (err) {
      console.error("Error adding event:", err);
      
      let errorMessage = "Failed to add event";
      if (err.response?.status === 401) {
        errorMessage = "Authentication failed. Please login again.";
        localStorage.removeItem("token");
        navigate("/login");
      } else if (err.response?.status === 400) {
        errorMessage = err.response.data || "Invalid event data";
      } else if (err.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      }
      
      alert(errorMessage);
    } finally {
      setIsAddingEvent(false);
    }
  };

  // Handle deleting events
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await API.delete(`/events/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
      alert("Event deleted successfully!");
    } catch (err) {
      console.error("Error deleting event:", err);
      
      let errorMessage = "Failed to delete event";
      if (err.response?.status === 404) {
        errorMessage = "Event not found";
      } else if (err.response?.status === 401) {
        errorMessage = "Authentication failed. Please login again.";
        localStorage.removeItem("token");
        navigate("/login");
      }
      
      alert(errorMessage);
    }
  };

  // Handle adding lost/found items
  const handleAddLostItem = async (e) => {
    e.preventDefault();
    
    if (!newLostItem.title.trim() || !newLostItem.description.trim() || !newLostItem.location.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsAddingLostItem(true);
    
    try {
      const res = await API.post("/lostfound", newLostItem);
      console.log("Item reported successfully:", res.data);
      
      setLostItems(prev => [res.data, ...prev]);
      setNewLostItem({ title: "", description: "", location: "", type: "LOST" });
      alert("Item reported successfully!");
    } catch (err) {
      console.error("Error reporting item:", err);
      
      let errorMessage = "Failed to report item";
      if (err.response?.status === 401) {
        errorMessage = "Authentication failed. Please login again.";
        localStorage.removeItem("token");
        navigate("/login");
      } else if (err.response?.status === 400) {
        errorMessage = err.response.data || "Invalid item data";
      }
      
      alert(errorMessage);
    } finally {
      setIsAddingLostItem(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Filter items based on type
  const filteredItems = lostItems.filter(item => {
    if (activeTab === "lost") return item.type === "LOST";
    if (activeTab === "found") return item.type === "FOUND";
    // Removed "myReports" filtering since we don't have user data
    return true;
  });

  const quickActions = [
    { 
      name: "View Courses", 
      icon: "bi-book-fill", 
      bgGradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
      description: "Access your enrolled courses"
    },
    { 
      name: "Messages", 
      icon: "bi-chat-dots-fill", 
      bgGradient: "linear-gradient(135deg, #10b981, #059669)",
      description: "Check your messages"
    },
    { 
      name: "Events", 
      icon: "bi-calendar-event-fill", 
      bgGradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
      description: "Upcoming campus events"
    },
    { 
      name: "Library", 
      icon: "bi-building", 
      bgGradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
      description: "Library resources"
    },
  ];

  const recentActivities = [
    { title: "New assignment posted in Computer Science 101", time: "2 hours ago", icon: "bi-file-text", color: "primary" },
    { title: "Campus event: Tech Talk tomorrow at 3 PM", time: "4 hours ago", icon: "bi-calendar-event", color: "success" },
    { title: "Library book due reminder", time: "1 day ago", icon: "bi-bell", color: "warning" },
    { title: "Grade posted for Mathematics exam", time: "2 days ago", icon: "bi-trophy", color: "info" },
  ];

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" 
           style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="text-muted">Loading your dashboard...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
      {/* Header */}
      <nav className="navbar navbar-expand-lg sticky-top" 
           style={{
             background: 'rgba(255, 255, 255, 0.95)',
             backdropFilter: 'blur(10px)',
             boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
             borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
           }}>
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <div className="d-inline-flex align-items-center justify-content-center text-white rounded-3 me-3" 
                 style={{
                   width: '40px', 
                   height: '40px',
                   background: 'linear-gradient(135deg, #3b82f6, #6366f1)'
                 }}>
              <i className="bi bi-mortarboard fs-5"></i>
            </div>
            <span className="navbar-brand mb-0 h4 fw-bold" 
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
              Campus Connect
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-secondary btn-sm position-relative">
              <i className="bi bi-bell"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                    style={{fontSize: '0.6rem'}}>
                3
              </span>
            </button>

            <div className="d-flex align-items-center gap-2">
              <div className="d-inline-flex align-items-center justify-content-center text-white rounded-circle" 
                   style={{
                     width: '35px', 
                     height: '35px',
                     background: 'linear-gradient(135deg, #8b5cf6, #ec4899)'
                   }}>
                <span className="fw-medium small">U</span>
              </div>
              <div className="d-none d-md-block">
                <div className="fw-medium text-dark small">User</div>
                <div className="text-muted" style={{fontSize: '0.75rem'}}>Student</div>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm"
                title="Logout"
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container-fluid py-4">
        {/* Welcome Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-lg overflow-hidden position-relative" 
                 style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <div className="card-body p-4 text-white position-relative" style={{zIndex: 2}}>
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="card-title fw-bold mb-2">
                      Welcome to Campus Connect!
                    </h2>
                    <p className="card-text fs-5 mb-0" style={{opacity: 0.9}}>
                      Ready to connect with your campus community today?
                    </p>
                  </div>
                  <div className="col-md-4 text-end d-none d-md-block">
                    <i className="bi bi-mortarboard-fill" style={{fontSize: '4rem', opacity: 0.3}}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="row mb-4">
          <div className="col-12">
            <h3 className="fw-semibold text-dark mb-3">Quick Actions</h3>
          </div>
          {quickActions.map((action, index) => (
            <div className="col-6 col-md-3 mb-3" key={index}>
              <div className="card border-0 h-100 text-center shadow-sm" 
                   style={{
                     borderRadius: '20px',
                     transition: 'all 0.3s ease',
                     cursor: 'pointer'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-5px)';
                     e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.2)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.1)';
                   }}>
                <div className="card-body p-4">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-3 text-white mb-3" 
                       style={{
                         width: '60px', 
                         height: '60px',
                         background: action.bgGradient
                       }}>
                    <i className={`${action.icon} fs-4`}></i>
                  </div>
                  <h5 className="card-title fw-bold text-dark mb-2">{action.name}</h5>
                  <p className="card-text text-muted small">{action.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lost and Found Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{borderRadius: '20px'}}>
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <i className="bi bi-search text-warning me-2 fs-4"></i>
                  <h4 className="fw-semibold text-dark mb-0">Lost & Found</h4>
                </div>
                <span className="badge bg-warning">{lostItems.length}</span>
              </div>
              <div className="card-body">
                {/* Tab Navigation - Removed "My Reports" tab */}
                <ul className="nav nav-pills mb-4" id="lostFoundTabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button 
                      className={`nav-link ${activeTab === "lost" ? "active" : ""}`} 
                      onClick={() => setActiveTab("lost")}
                      type="button"
                    >
                      <i className="bi bi-exclamation-circle me-1"></i>
                      Lost Items ({lostItems.filter(item => item.type === "LOST").length})
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button 
                      className={`nav-link ${activeTab === "found" ? "active" : ""}`}
                      onClick={() => setActiveTab("found")}
                      type="button"
                    >
                      <i className="bi bi-check-circle me-1"></i>
                      Found Items ({lostItems.filter(item => item.type === "FOUND").length})
                    </button>
                  </li>
                </ul>

                {/* Report New Item Form */}
                <div className="row mb-4">
                  <div className="col-md-12">
                    <div className="border rounded-3 p-3" style={{backgroundColor: '#f8f9fa'}}>
                      <h6 className="fw-semibold mb-3">
                        <i className="bi bi-plus-circle me-2"></i>Report Lost/Found Item
                      </h6>
                      <form onSubmit={handleAddLostItem}>
                        <div className="row">
                          <div className="col-md-3 mb-2">
                            <select
                              className="form-select form-select-sm"
                              value={newLostItem.type}
                              onChange={(e) => setNewLostItem({ ...newLostItem, type: e.target.value })}
                            >
                              <option value="LOST">Lost Item</option>
                              <option value="FOUND">Found Item</option>
                            </select>
                          </div>
                          <div className="col-md-3 mb-2">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Item name"
                              value={newLostItem.title}
                              onChange={(e) => setNewLostItem({ ...newLostItem, title: e.target.value })}
                              required
                            />
                          </div>
                          <div className="col-md-3 mb-2">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Location"
                              value={newLostItem.location}
                              onChange={(e) => setNewLostItem({ ...newLostItem, location: e.target.value })}
                              required
                            />
                          </div>
                          <div className="col-md-3 mb-2">
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Description"
                                value={newLostItem.description}
                                onChange={(e) => setNewLostItem({ ...newLostItem, description: e.target.value })}
                                required
                              />
                              <button 
                                type="submit" 
                                className="btn btn-warning btn-sm"
                                disabled={isAddingLostItem}
                              >
                                {isAddingLostItem ? (
                                  <span className="spinner-border spinner-border-sm" role="status"></span>
                                ) : (
                                  <i className="bi bi-send"></i>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="row">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      <div key={item.id || index} className="col-md-6 col-lg-4 mb-3">
                        <div className={`card border-0 shadow-sm h-100 border-start border-4 ${
                          item.type === "LOST" ? "border-danger" : "border-success"
                        }`} style={{borderRadius: '15px'}}>
                          <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="card-title fw-bold text-dark mb-1">{item.title}</h6>
                              <span className={`badge ${
                                item.type === "LOST" ? "bg-danger" : "bg-success"
                              }`}>
                                {item.type}
                              </span>
                            </div>
                            <p className="card-text text-muted small mb-2">{item.description}</p>
                            <div className="small text-muted">
                              <div><i className="bi bi-geo-alt me-1"></i>{item.location}</div>
                              <div><i className="bi bi-person me-1"></i>By: {item.reportedBy?.username || "Anonymous"}</div>
                              <div><i className="bi bi-calendar me-1"></i>
                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recently"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-4">
                      <i className="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
                      <p className="text-muted">No {activeTab} items found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="row">
          {/* Recent Activities */}
          <div className="col-lg-8 mb-4">
            <div className="card border-0 shadow-sm h-100" style={{borderRadius: '20px'}}>
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <h4 className="fw-semibold text-dark mb-0">Recent Activities</h4>
                <button className="btn btn-sm btn-outline-primary">View All</button>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="list-group-item border-0 px-0 py-3 d-flex align-items-start">
                      <div className={`d-flex align-items-center justify-content-center rounded-circle me-3 bg-${activity.color}`} 
                           style={{
                             width: '40px', 
                             height: '40px', 
                             fontSize: '0.9rem',
                             opacity: 0.1
                           }}>
                        <i className={`${activity.icon} text-${activity.color}`}></i>
                      </div>
                      <div className="flex-grow-1">
                        <p className="fw-medium text-dark mb-1">{activity.title}</p>
                        <small className="text-muted">{activity.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Add Event Form */}
            <div className="card border-0 shadow-sm mb-4" style={{borderRadius: '20px'}}>
              <div className="card-header bg-white border-0">
                <h5 className="fw-semibold text-dark mb-0">Add New Event</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleAddEvent}>
                  <div className="mb-3">
                    <label htmlFor="eventTitle" className="form-label small fw-medium">Event Title</label>
                    <input
                      type="text"
                      id="eventTitle"
                      className="form-control"
                      placeholder="Enter event title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      required
                      disabled={isAddingEvent}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eventDescription" className="form-label small fw-medium">Description</label>
                    <textarea
                      id="eventDescription"
                      className="form-control"
                      rows="3"
                      placeholder="Enter event description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      required
                      disabled={isAddingEvent}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={isAddingEvent}
                  >
                    {isAddingEvent ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Event
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="card border-0 shadow-sm mb-4" style={{borderRadius: '20px'}}>
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <h5 className="fw-semibold text-dark mb-0">Upcoming Events</h5>
                <span className="badge bg-primary">{events.length}</span>
              </div>
              <div className="card-body">
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <div key={event.id || index} className="border-start border-4 border-primary ps-3 py-2 mb-3 position-relative">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <h6 className="fw-medium text-dark mb-1">{event.title}</h6>
                          <div className="small text-muted">
                            <i className="bi bi-geo-alt me-1"></i>{event.description}
                          </div>
                        </div>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteEvent(event.id)}
                          title="Delete Event"
                          style={{fontSize: '0.7rem'}}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted py-3">
                    <i className="bi bi-calendar-x fs-1 mb-2 d-block"></i>
                    <p className="small">No upcoming events</p>
                  </div>
                )}
              </div>
            </div>

            {/* Campus Stats */}
            <div className="card border-0 shadow-sm" style={{borderRadius: '20px'}}>
              <div className="card-header bg-white border-0">
                <h5 className="fw-semibold text-dark mb-0">Campus Stats</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="text-center">
                      <div className="h4 fw-bold text-primary mb-1">{enrolledStudentsCount}</div>
                      <div className="small text-muted">Enrolled Students</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center">
                      <div className="h4 fw-bold text-success mb-1">342</div>
                      <div className="small text-muted">Online Now</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center">
                      <div className="h4 fw-bold text-info mb-1">{events.length}</div>
                      <div className="small text-muted">Events</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center">
                      <div className="h4 fw-bold text-warning mb-1">{lostItems.length}</div>
                      <div className="small text-muted">Lost & Found</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 shadow-lg overflow-hidden" 
                 style={{
                   background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                   borderRadius: '20px'
                 }}>
              <div className="card-body p-4 text-white text-center">
                <h3 className="fw-bold mb-3">Explore Campus Connect</h3>
                <p className="fs-5 mb-4" style={{opacity: 0.9}}>
                  Discover new features and connect with your campus community
                </p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <button className="btn btn-outline-light" 
                          style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                    <i className="bi bi-people me-2"></i>Join Study Groups
                  </button>
                  <button className="btn btn-outline-light" 
                          style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                    <i className="bi bi-calendar-event me-2"></i>Browse Events
                  </button>
                  <button className="btn btn-outline-light" 
                          style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                    <i className="bi bi-search me-2"></i>Lost & Found
                  </button>
                  <button className="btn btn-outline-light" 
                          style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                    <i className="bi bi-chat-dots me-2"></i>Connect with Peers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .nav-pills .nav-link {
          border-radius: 12px;
          margin-right: 8px;
          color: #6c757d;
          border: 2px solid transparent;
        }
        
        .nav-pills .nav-link.active {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
          border-color: transparent;
        }
        
        .nav-pills .nav-link:hover:not(.active) {
          background-color: #f8f9fa;
          color: #495057;
        }
      `}</style>
    </div>
  );
}