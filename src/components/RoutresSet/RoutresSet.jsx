import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Loader from "../Loader";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const ContactsPage = lazy(() => import("../../pages/ContactsPage/ContactsPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() => import("../../pages/RegistrationPage/RegistrationPage"));
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));

const RoutresSet = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={
                    <RestrictedRoute redirectTo="/contacts" component={<RegistrationPage />} />
                }
                />
                <Route path="/login" element={
                    <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
                }
                />
                <Route path="/contacts" element={
                    <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
                }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default RoutresSet;