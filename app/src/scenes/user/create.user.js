/* eslint-disable prettier/prettier */
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import LoadingButton from "../../components/loadingButton";
import api from "../../services/api";

export const Create = () => {
    const [open, setOpen] = useState(false);
    const [isSend, setIsSend] = useState(false);


    const history = useHistory();
    console.log('open', open)

    const handleCreateClick = () => {
        setOpen(true);
    };

    const handleCloseClick = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (isSend === true) {setOpen(false);}
    }, [isSend])

    const handleSubmit = async (values , {setSubmitting}) => {
        try {
            const abortController = new AbortController(); // Création d'un AbortController
            const signal = abortController.signal;

            values.status = "active";
            values.availability = "not available";
            values.role = "ADMIN";
            const res = await api.post("/user", values , { signal });
            if (!res.ok) throw res;
            toast.success("Created!");
            setIsSend(true);
            history.push(`/user/${res.data._id}`);
        } catch (e) {
            if (e.name === 'AbortError') return; // Gestion de l'annulation
            console.error(e);
            toast.error("Some Error!", e.code);
        }
    };

    return (
        <div style={{ marginBottom: 10 }}>
            <div className="text-right">
                <button className="bg-[#0560FD] text-[#fff] py-[12px] px-[22px] w-[170px] h-[48px]	rounded-[10px] text-[16px] font-medium" onClick={handleCreateClick}>
                    Create new user
                </button>
            </div>
            {open ? (
                <div className=" absolute top-0 bottom-0 left-0 right-0  bg-[#00000066] flex justify-center p-[1rem] z-50 " onClick={handleCloseClick}>
                    <div
                        className="w-full md:w-[60%] h-fit  bg-[white] p-[25px] rounded-md"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}>
                        <Formik initialValues={{ username: "", email: "", password: "" }} onSubmit={handleSubmit}>
                            {({ values, handleChange, handleSubmit, isSubmitting }) => (
                                <React.Fragment>
                                    <div>
                                        <div className="flex justify-between flex-wrap">
                                            <div className="w-full md:w-[48%] mt-2">
                                                <div className="text-[14px] text-[#212325] font-medium	">Name</div>
                                                <input className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]" name="username" value={values.username} onChange={handleChange} />
                                            </div>
                                            <div className="w-full md:w-[48%] mt-2">
                                                <div className="text-[14px] text-[#212325] font-medium	">Email</div>
                                                <input className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]" name="email" value={values.email} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="flex justify-between flex-wrap mt-3">
                                            {/* Password */}
                                            <div className="w-full md:w-[48%] mt-2">
                                                <div className="text-[14px] text-[#212325] font-medium	">Password</div>
                                                <input className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]" name="password" value={values.password} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <br />
                                    <LoadingButton
                                        className="mt-[1rem]  bg-[#0560FD] text-[16px] font-medium text-[#FFFFFF] py-[12px] px-[22px] rounded-[10px]"
                                        loading={isSubmitting}
                                        type="submit"
                                        onClick={handleSubmit}>
                                        Save
                                    </LoadingButton>
                                </React.Fragment>
                            )}
                        </Formik>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
