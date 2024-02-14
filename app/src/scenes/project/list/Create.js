/* eslint-disable prettier/prettier */
import { Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

import LoadingButton from "../../../components/loadingButton";

import api from "../../../services/api";

export const Create = ({ onChangeSearch }) => {
    const [open, setOpen] = useState(false);

    const handleCreateClick = () => {
        setOpen(true);
    };

    const handleCloseClick = () => {
        setOpen(false);
    };


    const handleSubmit = async (values) => {
        try {
            values.status = "active";
            const res = await api.post("/project", values);
            if (!res.ok) throw res;

            toast.success("Created!");
                setOpen(false);
            
        } catch (e) {
            console.log(e);
            toast.error("Some Error!", e.code);
        }
    };

    return (
        <div className="mb-[10px] ">
            <div className="flex justify-between flex-wrap">
                {/* Search Input */}
                <div className="relative text-[#A0A6B1]">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button type="submit" className="p-1">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </span>
                    <input
                        type="search"
                        name="q"
                        className="py-2 w-[364px] h-[48px] text-[16px] font-medium text-[black] rounded-[10px] bg-[#F9FBFD] border border-[#FFFFFF] pl-10"
                        placeholder="Search"
                        onChange={(e) => onChangeSearch(e.target.value)}
                    />
                </div>
                {/* Create New Button */}
                <button
                    className="bg-[#0560FD] text-[#fff] py-[12px] px-[20px] rounded-[10px] text-[16px] font-medium"
                    onClick={handleCreateClick}>
                    Create new project
                </button>
            </div>

            {open ? (
                <div
                    className=" absolute top-0 bottom-0 left-0 right-0 bg-[#00000066] flex justify-center p-[1rem] z-50 "
                    onClick={handleCloseClick}>
                    <div
                        className="w-full md:w-[60%] max-h-[200px] bg-[white] p-[25px] rounded-md"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}>
                        {/* Modal Body */}
                        <Formik
                            initialValues={{ name: "" }}
                            onSubmit={handleSubmit}>
                            {({ values, handleChange, handleSubmit, isSubmitting }) => (
                                <React.Fragment>
                                    <div className="w-full md:w-6/12 text-left">
                                        <div>
                                            <div className="text-[14px] text-[#212325] font-medium	">Name</div>
                                            <input className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]" name="name" value={values.name} onChange={handleChange} />
                                        </div>
                                        <LoadingButton
                                            type='submit'
                                            className="mt-[1rem] bg-[#0560FD] text-[16px] font-medium text-[#FFFFFF] py-[12px] px-[22px] rounded-[10px]"
                                            loading={isSubmitting}
                                            onClick={handleSubmit}>
                                            Create
                                        </LoadingButton>
                                    </div>
                                </React.Fragment>
                            )}
                        </Formik>
                    </div>
                </div>
            ) : null}
        </div>
    );
};