// import React, { useState } from "react";
// import API from "../api/axiosConfig";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
    
//     try {
//       const res = await API.post("/auth/login", form);
//       localStorage.setItem("token", res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Invalid credentials. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="hero-section d-flex align-items-center justify-content-center">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-5 col-lg-4">
//             {/* Logo Section */}
//             <div className="text-center mb-4">
//               <div className="d-inline-flex align-items-center justify-content-center bg-gradient-primary text-white rounded-4 shadow mb-3" 
//                    style={{width: '60px', height: '60px'}}>
//                 <i className="bi bi-mortarboard fs-3"></i>
//               </div>
//               <h1 className="h2 fw-bold text-white mb-2">Campus Connect</h1>
//               <p className="text-white-50">Welcome back to your campus community</p>
//             </div>

//             {/* Login Form */}
//             <div className="card-campus-glass p-4">
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="username" className="form-label fw-medium">Username</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-light border-end-0">
//                       <i className="bi bi-person text-muted"></i>
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control form-control-campus border-start-0"
//                       id="username"
//                       name="username"
//                       placeholder="Enter your username"
//                       value={form.username}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label fw-medium">Password</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-light border-end-0">
//                       <i className="bi bi-lock text-muted"></i>
//                     </span>
//                     <input
//                       type="password"
//                       className="form-control form-control-campus border-start-0"
//                       id="password"
//                       name="password"
//                       placeholder="Enter your password"
//                       value={form.password}
//                       onChange={handleChange}
//                       required
//                     />
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
//                   className="btn btn-campus w-100 mb-3"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <span>
//                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                       Signing In...
//                     </span>
//                   ) : (
//                     <span>
//                       <i className="bi bi-box-arrow-in-right me-2"></i>
//                       Sign In
//                     </span>
//                   )}
//                 </button>

//                 <div className="text-center">
//                   <p className="text-muted mb-0">
//                     Don't have an account?{" "}
//                     <Link to="/register" className="text-decoration-none fw-medium">
//                       Create Account
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             </div>

//             <div className="text-center mt-4">
//               <p className="text-white-50 small">
//                 Connecting students, faculty, and staff
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Background Decorations */}
//       <div className="position-absolute top-0 start-0 w-100 h-100" style={{zIndex: -1}}>
//         <div className="position-absolute animate-float" 
//              style={{top: '10%', right: '10%', width: '100px', height: '100px', 
//                     background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
//         <div className="position-absolute animate-float" 
//              style={{bottom: '20%', left: '15%', width: '80px', height: '80px', 
//                     background: 'rgba(255,255,255,0.1)', borderRadius: '50%', animationDelay: '2s'}}></div>
//         <div className="position-absolute animate-float" 
//              style={{top: '60%', right: '20%', width: '60px', height: '60px', 
//                     background: 'rgba(255,255,255,0.1)', borderRadius: '50%', animationDelay: '4s'}}></div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.log(err) ;
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-section d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            {/* Logo Section */}
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-gradient-primary text-white rounded-4 shadow mb-3" 
                   style={{width: '60px', height: '60px'}}>
                <i className="bi bi-mortarboard fs-3"></i>
              </div>
              <h1 className="h2 fw-bold text-white mb-2">Campus Connect</h1>
              <p className="text-white-50">Welcome back to your campus community</p>
            </div>

            {/* Login Form */}
            <div className="card-campus-glass p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label fw-medium">Username</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-person text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-campus border-start-0"
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      value={form.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
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
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
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
                  className="btn btn-campus w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing In...
                    </span>
                  ) : (
                    <span>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Sign In
                    </span>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-decoration-none fw-medium">
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            <div className="text-center mt-4">
              <p className="text-white-50 small">
                Connecting students, faculty, and staff
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{zIndex: -1}}>
        <div className="position-absolute animate-float" 
             style={{top: '10%', right: '10%', width: '100px', height: '100px', 
                    background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
        <div className="position-absolute animate-float" 
             style={{bottom: '20%', left: '15%', width: '80px', height: '80px', 
                    background: 'rgba(255,255,255,0.1)', borderRadius: '50%', animationDelay: '2s'}}></div>
        <div className="position-absolute animate-float" 
             style={{top: '60%', right: '20%', width: '60px', height: '60px', 
                    background: 'rgba(255,255,255,0.1)', borderRadius: '50%', animationDelay: '4s'}}></div>
      </div>
    </div>
  );
}