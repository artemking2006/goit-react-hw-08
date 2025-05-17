import React, { useId } from "react";
import s from "./SearchBox.module.css";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/filtersSlice";

const SearchBox = () => {
    const filterId = useId();
    const dispatch = useDispatch();
    const onFilter = (filter) => {
        dispatch(changeFilter(filter));
    };

    return (
        <div className={s.form}>
            <label htmlFor={filterId}>Find contacts by name or phone</label>
            <input className={s.input} type="text" name="filter" id="filterId" onChange={(e) => onFilter(e.target.value)} />
        </div>
    );
};

export default SearchBox;