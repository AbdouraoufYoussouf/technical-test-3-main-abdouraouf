import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Loader from "../../../components/loader";

import api from "../../../services/api";
import { Create } from "./Create";
import { Budget } from "./Budjet";
const ProjectList = () => {
  const [projects, setProjects] = useState(null);
  const [activeProjects, setActiveProjects] = useState(null);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const { data: u } = await api.get("/project");
      setProjects(u);
    })();
  }, []);

  useEffect(() => {
    const p = (projects || []).filter((p) => p.status === "active");
    setActiveProjects(p);
  }, [projects]);

  if (!projects || !activeProjects) return <Loader />;

  const handleSearch = (searchedValue) => {
    const p = (projects || []).filter((p) => p.status === "active").filter((e) => e.name.toLowerCase().includes(searchedValue.toLowerCase()));
    setActiveProjects(p);
  };

  return (
    <div className="w-full p-2 md:!px-8">
      <Create onChangeSearch={handleSearch} />
      <div className="py-3">
        {activeProjects.map((hit) => {
          return (
            <div
              key={hit._id}
              onClick={() => history.push(`/project/${hit._id}`)}
              className="flex justify-between flex-wrap p-3 border border-[#FFFFFF] bg-[#F9FBFD] rounded-[16px] mt-3 cursor-pointer">
              <div className="flex w-full md:w-[25%] border-r border-[#E5EAEF]">
                <div className="flex flex-wrap gap-4 items-center">
                  {hit.logo && <img className="w-[85px] h-[85px] rounded-[8px] object-contain	" src={hit.logo} alt="ProjectImage.png" />}
                  <div className="flex flex-col flex-wrap flex-1">
                    <div className="text-[18px] text-[#212325] font-semibold flex flex-wrap">{hit.name}</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[50%] border-r border-[#E5EAEF] pl-[10px]">
                <span className="text-[14px] font-medium text-[#212325]">{hit.description ? hit.description : ""}</span>
              </div>
              <div className="w-full md:w-[25%]  px-[10px]">
                <span className="text-[16px] font-medium text-[#212325]">Budget consumed {hit.paymentCycle === "MONTHLY" && "this month"}:</span>
                <Budget project={hit} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;
