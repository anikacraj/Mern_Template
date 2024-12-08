import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './UserSignin.css'; // Import the CSS file


function UserSignin() {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(20, 'Name must be at most 20 characters long')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .lowercase('Email must be lowercase')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            axios
                .post("http://localhost:2008/register", values)
                .then((result) => {
                    const { status } = result.data;
                    if (status === "again") {
                        alert("An account with this email already exists. Please login.");
                    } else if (status === "success") {
                        localStorage.setItem(
                            "user",
                            JSON.stringify({
                               _id:values.UserId,
                                name: values.name,
                                email: values.email,
                                signInDate: new Date().toISOString(),
                            })
                        );
                        navigate("/login");
                        resetForm();
                    }
                })
                .catch(() => {
                    alert("Something went wrong. Please try again later.");
                });
        },
    });

    return (
        <div className="signin-container">
            <div className="signin-card">
                <div className="logo">
                    <img src="../../Media/red.png" alt="Logo" />
                </div>
                <h3 className="signin-title">Sign Up</h3>
                <form onSubmit={formik.handleSubmit} className="signin-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className={formik.errors.name && formik.touched.name ? 'error-input' : ''}
                        />
                        {formik.errors.name && formik.touched.name && (
                            <div className="error-text">{formik.errors.name}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={(e) => {
                                formik.setFieldValue('email', e.target.value.toLowerCase());
                            }}
                            value={formik.values.email}
                            className={formik.errors.email && formik.touched.email ? 'error-input' : ''}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className="error-text">{formik.errors.email}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className={formik.errors.password && formik.touched.password ? 'error-input' : ''}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <div className="error-text">{formik.errors.password}</div>
                        )}
                    </div>

                    <button type="submit" className="submit-btn">Create Account</button>
                </form>
                <p className="signin-footer">
                    Already registered? <Link className="link" to="/login">Login</Link>
                </p>
                <h6 className="mt-4 text-center font-weight-bold">
                Or continue with social account
              </h6>
              <button className="loginWithGoogle">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJFOuaRWrmN_tJfIjNd6do_8sfaKh9IPNJ8Q&s"
                  className="w-100"
                  style={{ width: "150px", height: "auto" }}
                />
              </button>
            </div>
        </div>
    );
}

export default UserSignin;
