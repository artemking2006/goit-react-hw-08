import React, { useId } from "react";
import s from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Container from "../Container";

const initialValues = {
  userName: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const RegistrationForm = () => {
    const dispatch = useDispatch();

    const userName = useId();
    const email = useId();
    const password = useId();
    const passwordConfirm = useId();

    const RegistrationSchema = Yup.object().shape({
        userName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().min(7, "Minimum 7 characters").required("Required"),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords do not match")
            .required("Confirm the password"),
    });

    const handleSubmit = async (values, actions) => {
        try {
            await dispatch(
                register({
                    name: values.userName,
                    email: values.email,
                    password: values.password,
                })
            ).unwrap();

            actions.resetForm();
        } catch (errors) {
            const formattedErrors = {};

            if (errors.name) {
                formattedErrors.userName = errors.name.message;
            }
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
            validationSchema={RegistrationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ isValid, dirty, touched, errors }) => (
                <Form className={s.form}>
                    <Container wrapper="wrapper">
                        <label htmlFor={userName}>Name:</label>
                        <Field
                            className={`${s.input} ${touched.userName && errors.userName ? s.wrong : ""
                                }`}
                            type="text"
                            name="userName"
                            id={userName}
                            placeholder="Enter your name here"
                        />
                        <ErrorMessage
                            name="userName"
                            component="span"
                            className={s.error}
                        />
                    </Container>
                    <Container wrapper="wrapper">
                        <label htmlFor={email}>Email:</label>
                        <Field
                            className={`${s.input} ${touched.email && errors.email ? s.wrong : ""
                                }`}
                            type="text"
                            name="email"
                            id={email}
                            placeholder="Enter your email here"
                        />
                        <ErrorMessage
                            name="email"
                            component="span"
                            className={s.error}
                        />
                    </Container>
                    <Container wrapper="wrapper">
                        <label htmlFor={password}>Password:</label>
                        <Field
                            className={`${s.input} ${touched.password && errors.password ? s.wrong : ""
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
                    <Container wrapper="wrapper">
                        <label htmlFor={passwordConfirm}>Confirm Password:</label>
                        <Field
                            className={`${s.input} ${touched.passwordConfirm && errors.passwordConfirm ? s.wrong : ""
                                }`}
                            type="password"
                            name="passwordConfirm"
                            id={passwordConfirm}
                            placeholder="Enter your password here"
                        />
                        <ErrorMessage
                            name="passwordConfirm"
                            component="span"
                            className={s.error}
                        />
                    </Container>


                    <button className={s.button} type="submit" disabled={!isValid || !dirty}>
                        Register
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default RegistrationForm;