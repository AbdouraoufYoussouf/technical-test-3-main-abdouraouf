/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";

import ProgressBar from "../../../components/ProgressBar";

import api from "../../../services/api";

export const Budget = ({ project }) => {
    const [activities, setActivities] = useState([10, 29, 18, 12]);
  
    useEffect(() => {
      (async () => {
        let d = new Date();
        if (project.paymentCycle === "ONE_TIME") d = new Date(project.created_at);
        let dateQuery = "";
        if (project.paymentCycle === "ONE_TIME") {
          d = new Date(project.created_at);
          dateQuery = "gte:";
        }
        const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
        const { data } = await api.get(`/activity?projectId=${encodeURIComponent(project._id)}&date=${dateQuery}${date.getTime()}`);
        setActivities(data);
      })();
    }, []);
  
    const total = activities.reduce((acc, cur) => acc + cur.value, 0);
    const budget_max_monthly = project.budget_max_monthly;
    const width = (100 * total) / budget_max_monthly || 0;
  
    if (!project.budget_max_monthly) return <div className="mt-2 text-[24px] text-[#212325] font-semibold">{total.toFixed(2)}€</div>;
    return <ProgressBar percentage={width} max={budget_max_monthly} value={total} />;
  };