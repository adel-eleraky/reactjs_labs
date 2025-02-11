import axios from "axios";
import { ErrorMessage, Field, Form, Formik, replace } from "formik";
import react from "react"
import { useNavigate } from "react-router";
import * as yup from "yup"

function Login() {

  let navigate = useNavigate()
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
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
  });

  const submitHandler = (values) => {

    login(values).then(data => {
      localStorage.setItem("user" , JSON.stringify({data: data.data, token: data.token}))
      navigate("/" , {replace: true})
    })

  };


  async function login(data) {
    try {
      let res = await axios.post("http://localhost:3000/api/v1/users/login", data)

      return res.data
    }catch(err) {
      console.log(err)
    }
  }
  return (

    <div className="login-page">
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ values, errors, touched }) => {
            return (
              <Form method="post" className="needs-validation w-50 m-auto p-5 rounded shadow mt-5" noValidate >
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
                <button
                  className="text-white submit-btn btn d-block w-50 py-2 mb-4 mx-auto fs-4"
                  type="submit"
                  style={{ backgroundColor: "rgb(5 72 25 / 52%)"}}
                >
                  Login
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  )
}

export default Login