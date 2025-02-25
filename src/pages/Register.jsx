import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import react from "react"
import { useNavigate } from "react-router";
import * as yup from "yup"
import { registerUser, verifyUser } from "../rtk/features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

function Register() {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { user, errors } = useSelector(state => state.auth)

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPass: "",
        phone: ""
    };

    const validationSchema = yup.object().shape({
        name: yup.string().min(2, "Min length is 2 char").max(16, "Max length is 16 char").required("Name is required"),
        email: yup
            .string()
            .required("Email is required")
            .email("Invalid Email"),
        password: yup
            .string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Weak Password"
            )
            .required("Password is required"),
        confirmPass: yup.string().oneOf([yup.ref("password")], "Confirm pass must match password").required("Confirm password is required"),
        phone: yup.string().matches(/^(010|011|012|015)[0-9]{8}/, "Invalid phone").required("Phone is required")

    });

    const submitHandler = (values) => {
        dispatch(registerUser(values))
    };

    async function register(data) {
        try {
            let res = await axios.post("http://localhost:3000/api/v1/users/signup", data)

            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    console.log("suer" , user)
    return (
        <div className="login-page">
            <div className="container">
                {!user &&
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={submitHandler}
                    >
                        {({ values, errors, touched }) => {
                            return (
                                <Form method="post" className="needs-validation w-50 m-auto p-5 rounded shadow mt-5" noValidate >
                                    <label htmlFor="email" className="form-label">
                                        Name
                                    </label>
                                    <div className="input-group has-validation mb-4">
                                        <span
                                            className="input-group-text  rounded-0 rounded-start"
                                            id="basic-addon1"
                                        >
                                            <i class="fa-solid fa-user"></i>
                                        </span>
                                        <Field
                                            type="text"
                                            id="name"
                                            name="name"
                                            className={`form-control ${touched.name && errors.name && "is-invalid"
                                                } rounded-0 rounded-end`}
                                            placeholder="Enter your name"
                                            aria-describedby="basic-addon1"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="invalid-feedback d-block fs-6 fw-bold"
                                        />
                                    </div>
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <div className="input-group has-validation mb-4">
                                        <span
                                            className="input-group-text  rounded-0 rounded-start"
                                            id="basic-addon1"
                                        >
                                            <i className="fa-regular fa-envelope"></i>
                                        </span>
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            className={`form-control ${touched.email && errors.email && "is-invalid"
                                                } rounded-0 rounded-end`}
                                            placeholder="Enter your email"
                                            aria-describedby="basic-addon1"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="invalid-feedback d-block fs-6 fw-bold"
                                        />
                                    </div>
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <div className="input-group has-validation mb-4">
                                        <span
                                            className="input-group-text  rounded-0 rounded-start"
                                            id="basic-addon1"
                                        >
                                            <i className="fa-solid fa-lock"></i>
                                        </span>
                                        <Field
                                            type="password"
                                            id="password"
                                            name="password"
                                            className={`form-control ${touched.password && errors.password && "is-invalid"
                                                } rounded-0 rounded-end`}
                                            placeholder="Enter your password"
                                            aria-describedby="basic-addon1"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="invalid-feedback d-block fs-6 fw-bold"
                                        />
                                    </div>
                                    <label htmlFor="password" className="form-label">
                                        Confirm Password
                                    </label>
                                    <div className="input-group has-validation mb-4">
                                        <span
                                            className="input-group-text  rounded-0 rounded-start"
                                            id="basic-addon1"
                                        >
                                            <i className="fa-solid fa-lock"></i>
                                        </span>
                                        <Field
                                            type="password"
                                            id="confirmPass"
                                            name="confirmPass"
                                            className={`form-control ${touched.confirmPass && errors.confirmPass && "is-invalid"
                                                } rounded-0 rounded-end`}
                                            placeholder="Confirm Password"
                                            aria-describedby="basic-addon1"
                                        />
                                        <ErrorMessage
                                            name="confirmPass"
                                            component="div"
                                            className="invalid-feedback d-block fs-6 fw-bold"
                                        />
                                    </div>
                                    <label htmlFor="password" className="form-label">
                                        Phone
                                    </label>
                                    <div className="input-group has-validation mb-4">
                                        <span
                                            className="input-group-text  rounded-0 rounded-start"
                                            id="basic-addon1"
                                        >
                                            <i class="fa-solid fa-phone"></i>
                                        </span>
                                        <Field
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            className={`form-control ${touched.phone && errors.phone && "is-invalid"
                                                } rounded-0 rounded-end`}
                                            placeholder="Enter phone"
                                            aria-describedby="basic-addon1"
                                        />
                                        <ErrorMessage
                                            name="phone"
                                            component="div"
                                            className="invalid-feedback d-block fs-6 fw-bold"
                                        />
                                    </div>
                                    <button
                                        className="text-white submit-btn btn d-block w-50 py-2 mb-4 mx-auto fs-4"
                                        type="submit"
                                        style={{ backgroundColor: "rgb(5 72 25 / 52%)" }}
                                    >
                                        Register
                                    </button>
                                </Form>
                            );
                        }}
                    </Formik>
                }
                {user && !user.emailVerified &&
                    <Formik
                        initialValues={{ code: "" }}
                        validationSchema={yup.object().shape({
                            code: yup.string().length(6, "code must be 6 character").required("Code is required")
                        })}
                        onSubmit={(values) => {
                            console.log(values)
                            dispatch(verifyUser(values))
                        }}
                    >
                        {({ values, errors, touched }) => {
                            return (
                                <>

                                    <Form method="post" className="needs-validation w-50 m-auto p-5 rounded shadow mt-5" noValidate >
                                        <label htmlFor="code" className="form-label">
                                            Code
                                        </label>
                                        <div className="input-group has-validation mb-4">
                                            <span
                                                className="input-group-text  rounded-0 rounded-start"
                                                id="basic-addon1"
                                            >
                                                <i class="fa-solid fa-key"></i>
                                            </span>
                                            <Field
                                                type="text"
                                                id="code"
                                                name="code"
                                                className={`form-control ${touched.code && errors.code && "is-invalid"
                                                    } rounded-0 rounded-end`}
                                                placeholder="Enter your code"
                                                aria-describedby="basic-addon1"
                                            />
                                            <ErrorMessage
                                                name="code"
                                                component="div"
                                                className="invalid-feedback d-block fs-6 fw-bold"
                                            />
                                        </div>
                                        <button
                                            className="text-white submit-btn btn d-block w-50 py-2 mb-4 mx-auto fs-4"
                                            type="submit"
                                            style={{ backgroundColor: "rgb(5 72 25 / 52%)" }}
                                        >
                                            Verify
                                        </button>

                                    </Form>
                                </>
                            )
                        }}
                    </Formik>
                }
            </div>
        </div>
    )
}

export default Register
