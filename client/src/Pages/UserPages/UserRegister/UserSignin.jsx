function UserSignin() {
    const navigate = useNavigate();

    // Validation schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(10, 'Name must be at least 10 characters long')
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
        validationSchema, // Attach validation schema
        onSubmit: (values, { resetForm }) => {
            axios
                .post("http://localhost:2004/register", values)
                .then((result) => {
                    const { status, message } = result.data;

                    if (status === "again") {
                        alert("An account with this email already exists. Please login.");
                    } else if (status === "success") {
                        console.log("Registration successful:", result.data);
                        localStorage.setItem(
                            "user",
                            JSON.stringify({
                                name: values.name,
                                email: values.email,
                                signInDate: new Date().toISOString(),
                            })
                        );
                        navigate("/login");
                        resetForm();
                    }
                })
                .catch((err) => {
                    console.error("Registration error:", err);
                    alert("Something went wrong. Please try again later.");
                });
        },
    });

    return (
        <div>
            <div>
                <div><img src="../../Media/red.png" alt="" /></div>
                <h3>Sign In</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {formik.errors.name && formik.touched.name && (
                            <div className="error">{formik.errors.name}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            name="email"
                            onChange={(e) => {
                                formik.setFieldValue('email', e.target.value.toLowerCase());
                            }}
                            value={formik.values.email}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className="error">{formik.errors.email}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <div className="error">{formik.errors.password}</div>
                        )}
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account?</p>
                <Link className="link" to="/login">Login</Link>
            </div>
        </div>
    );
}

export default UserSignin;