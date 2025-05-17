import React, { useId } from "react";
import s from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Container from "../Container";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();

  const email = useId();
  const password = useId();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(7, "Minimum 7 characters").required("Required"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(
        login({
          email: values.email,
          password: values.password,
        })
      ).unwrap();

      actions.resetForm();
    } catch (errors) {
      const formattedErrors = {};

      if (errors.email) {
        formattedErrors.email = errors.email.message;
      }
      if (errors.password) {
        formattedErrors.password = errors.password.message;
      }

      actions.setErrors(formattedErrors);
    }
  };

  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty, touched, errors }) => (
        <Form className={s.form}>
          <Container wrapper="wrapper">
            <label htmlFor={email}>Email:</label>
            <Field
              className={`${s.input} ${
                touched.email && errors.email ? s.wrong : ""
              }`}
              type="text"
              name="email"
              id={email}
              placeholder="Enter your email here"
            />
            <ErrorMessage name="email" component="span" className={s.error} />
          </Container>
          <Container wrapper="wrapper">
            <label htmlFor={password}>Password:</label>
            <Field
              className={`${s.input} ${
                touched.password && errors.password ? s.wrong : ""
              }`}
              type="password"
              name="password"
              id={password}
              placeholder="Enter your password here"
            />
            <ErrorMessage
              name="password"
              component="span"
              className={s.error}
            />
          </Container>
          <button
            className={s.button}
            type="submit"
            disabled={!isValid || !dirty}
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;