import React, { useEffect } from "react";
import Layout from "../Layout";
import RoutresSet from "../RoutresSet";
import "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import Loader from "../Loader";
import { Toaster } from "react-hot-toast";

const App = () => {
    const dispatch = useDispatch();
    const isRefreshing = useSelector(selectIsRefreshing);

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    return (
        <>
            <Toaster position="top-center" />
            {isRefreshing ? (
                <Loader />
            ) : (
                <>
                    <Layout />
                    <RoutresSet />
                </>
            )}
        </>
    );
};

export default App;