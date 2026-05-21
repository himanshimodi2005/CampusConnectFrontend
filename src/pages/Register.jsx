// import React, { useState } from "react";
// import API from "../api/axiosConfig";
// import { useNavigate, Link } from "react-router-dom";

// export default function Register() {
//   const [form, setForm] = useState({ 
//     username: "", 
//     password: "",
//     confirmPassword: "",
//     email: "",
//     fullName: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (error) setError("");
//   };

//   const validateForm = () => {
//     if (form.password !== form.confirmPassword) {
//       setError("Passwords don't match");
//       return false;
//     }
//     if (form.password.length < 6) {
//       setError("Password must be at least 6 characters long");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setLoading(true);
//     setError("");
    
//     try {
//       await API.post("/auth/register", {
//         username: form.username,
//         password: form.password,
//         email: form.email,
//         fullName: form.fullName
//       });
      
//       setSuccess(true);
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (success) {
//     return (
//       <div className="bg-gradient-success d-flex align-items-center justify-content-center min-vh-100">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-md-4">
//               <div className="card-campus-glass p-4 text-center">
//                 <div className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle mb-4" 
//                      style={{width: '80px', height: '80px'}}>
//                   <i className="bi bi-check-lg fs-1"></i>
//                 </div>
//                 <h2 className="h4 fw-bold text-dark mb-3">Welcome to Campus Connect!</h2>
//                 <p className="text-muted mb-3">Your account has been created successfully.</p>
//                 <div className="d-flex align-items-center justify-content-center">
//                   <div className="spinner-border spinner-border-sm text-success me-2" role="status"></div>
//                   <small className="text-muted">Redirecting to login...</small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-secondary d-flex align-items-center justify-content-center min-vh-100 py-5">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-6 col-lg-5">
//             {/* Header */}
//             <div className="text-center mb-4">
//               <div className="d-inline-flex align-items-center justify-content-center bg-gradient-secondary text-white rounded-4 shadow mb-3" 
//                    style={{width: '60px', height: '60px'}}>
//                 <i className="bi bi-person-plus fs-3"></i>
//               </div>
//               <h1 className="h2 fw-bold text-white mb-2">Join Campus Connect</h1>
//               <p className="text-white-50">Create your account and connect with your campus community</p>
//             </div>

//             {/* Registration Form */}
//             <div className="card-campus-glass p-4">
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="fullName" className="form-label fw-medium">Full Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-light border-end-0">
//                       <i className="bi bi-person text-muted"></i>
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control form-control-campus border-start-0"
//                       id="fullName"
//                       name="fullName"
//                       placeholder="Enter your full name"
//                       value={form.fullName}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6 mb-3">
//                     <label htmlFor="username" className="form-label fw-medium">Username</label>
//                     <div className="input-group">
//                       <span className="input-group-text bg-light border-end-0">
//                         <i className="bi bi-at text-muted"></i>
//                       </span>
//                       <input
//                         type="text"
//                         className="form-control form-control-campus border-start-0"
//                         id="username"
//                         name="username"
//                         placeholder="Choose a username"
//                         value={form.username}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label htmlFor="email" className="form-label fw-medium">Email</label>
//                     <div className="input-group">
//                       <span className="input-group-text bg-light border-end-0">
//                         <i className="bi bi-envelope text-muted"></i>
//                       </span>
//                       <input
//                         type="email"
//                         className="form-control form-control-campus border-start-0"
//                         id="email"
//                         name="email"
//                         placeholder="your.email@university.edu"
//                         value={form.email}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6 mb-3">
//                     <label htmlFor="password" className="form-label fw-medium">Password</label>
//                     <div className="input-group">
//                       <span className="input-group-text bg-light border-end-0">
//                         <i className="bi bi-lock text-muted"></i>
//                       </span>
//                       <input
//                         type="password"
//                         className="form-control form-control-campus border-start-0"
//                         id="password"
//                         name="password"
//                         placeholder="Create a password"
//                         value={form.password}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-6 mb-3">
//                     <label htmlFor="confirmPassword" className="form-label fw-medium">Confirm Password</label>
//                     <div className="input-group">
//                       <span className="input-group-text bg-light border-end-0">
//                         <i className="bi bi-shield-check text-muted"></i>
//                       </span>
//                       <input
//                         type="password"
//                         className="form-control form-control-campus border-start-0"
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         placeholder="Confirm your password"
//                         value={form.confirmPassword}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="alert alert-danger d-flex align-items-center mb-3" role="alert">
//                     <i className="bi bi-exclamation-triangle me-2"></i>
//                     <div>{error}</div>
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   className="btn btn-campus-secondary w-100 mb-3"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <span>
//                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                       Creating Account...
//                     </span>
//                   ) : (
//                     <span>
//                       <i className="bi bi-person-check me-2"></i>
//                       Create Account
//                     </span>
//                   )}
//                 </button>

//                 <div className="text-center">
//                   <p className="text-muted mb-0">
//                     Already have an account?{" "}
//                     <Link to="/login" className="text-decoration-none fw-medium">
//                       Sign In
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Background Decorations */}
//       <div className="position-absolute top-0 start-0 w-100 h-100" style={{zIndex: -1}}>
//         <div className="position-absolute animate-float" 
//              style={{top: '15%', left: '10%', width: '120px', height: '120px', 
//                     background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
//         <div className="position-absolute animate-float" 
//              style={{bottom: '10%', right: '15%', width: '90px', height: '90px', 
//                     background: 'rgba(255,255,255,0.1)', borderRadius: '50%', animationDelay: '3s'}}></div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ 
    username: "", 
    password: "",
    confirmPassword: "",
    email: "",
    fullName: "" , 
    role : "STUDENT"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const validateForm = () => {
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError("");
    
    try {
      await API.post("/auth/register", {
        username: form.username,
        password: form.password,
        email: form.email,
        fullName: form.fullName,
        role: form.role
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-gradient-success d-flex align-items-center justify-content-center min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card-campus-glass p-4 text-center">
                <div className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle mb-4" 
                     style={{width: '80px', height: '80px'}}>
                  <i className="bi bi-check-lg fs-1"></i>
                </div>
                <h2 className="h4 fw-bold text-dark mb-3">Welcome to Campus Connect!</h2>
                <p className="text-muted mb-3">Your account has been created successfully.</p>
                <div className="d-flex align-items-center justify-content-center">
                  <div className="spinner-border spinner-border-sm text-success me-2" role="status"></div>
                  <small className="text-muted">Redirecting to login...</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-secondary d-flex align-items-center justify-content-center min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-gradient-secondary text-white rounded-4 shadow mb-3" 
                   style={{width: '60px', height: '60px'}}>
                <i className="bi bi-person-plus fs-3"></i>
              </div>
              <h1 className="h2 fw-bold text-white mb-2">Join Campus Connect</h1>
              <p className="text-white-50">Create your account and connect with your campus community</p>
            </div>

            {/* Registration Form */}
            <div className="card-campus-glass p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label fw-medium">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-person text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-campus border-start-0"
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="username" className="form-label fw-medium">Username</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-at text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-campus border-start-0"
                        id="username"
                        name="username"
                        placeholder="Choose a username"
                        value={form.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label fw-medium">Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-envelope text-muted"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control form-control-campus border-start-0"
                        id="email"
                        name="email"
                        placeholder="your.email@university.edu"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
  <label htmlFor="role" className="form-label fw-medium">Role</label>
  <div className="input-group">
    <span className="input-group-text bg-light border-end-0">
      <i className="bi bi-person-badge text-muted"></i>
    </span>
    <select
      id="role"
      name="role"
      className="form-control form-control-campus border-start-0"
      value={form.role}
      onChange={handleChange}
      required
    >
      <option value="">Select role</option>
      <option value="STUDENT">Student</option>
      <option value="FACULTY">Faculty</option>
      <option value="ADMIN">Admin</option>
    </select>
  </div>
</div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="password" className="form-label fw-medium">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-lock text-muted"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control form-control-campus border-start-0"
                        id="password"
                        name="password"
                        placeholder="Create a password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="confirmPassword" className="form-label fw-medium">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-shield-check text-muted"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control form-control-campus border-start-0"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="alert alert-danger d-flex align-items-center mb-3" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    <div>{error}</div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-campus-secondary w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Account...
                    </span>
                  ) : (
                    <span>
                      <i className="bi bi-person-check me-2"></i>
                      Create Account
                    </span>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className="text-decoration-none fw-medium">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{zIndex: -1}}>
        <div className="position-absolute animate-float" 
             style={{top: '15%', left: '10%', width: '120px', height: '120px', 
                    background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
        <div className="position-absolute animate-float" 
             style={{bottom: '10%', right: '15%', width: '90px', height: '90px', 
                    background: 'rgba(255,255,255,0.1)', borderRadius: '50%', animationDelay: '3s'}}></div>
      </div>
    </div>
  );
}