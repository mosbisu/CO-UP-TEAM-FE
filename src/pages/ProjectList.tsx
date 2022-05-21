import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useMyInfo } from "../api/UserQuery";
import ProjectData from "../Components/ProjectList/ProjectData";
import ProjectMake from "../Components/ProjectList/ProjectMake";
import ProjectOpen from "../Components/ProjectList/ProjectOpen";
import { MyProfile } from "../recoil/MyProfile";

const ProjectList = () => {
  const SetUser = useSetRecoilState(MyProfile);
  const { data } = useMyInfo();
  const user = data?.data;
  // const test = useRecoilValue(MyProfile);
  useEffect(() => {
    SetUser(user);
  }, [data]);
  return (
    <div className="w-full h-[calc(100vh-4rem)] bg-[#f0f3f7] flex flex-col items-center justify-center absolute bottom-0">
      <div className="w-full h-full flex flex-col items-center mt-20">
        <div className=" w-[1200px] flex justify-between items-center md:w-[90%]">
          <span className="text-4xl leading-[50px] sm:text-3xl">팀 리스트</span>
          <ProjectOpen />
        </div>
        <div className="w-[1200px] flex flex-wrap justify-start mt-8 sm:justify-center md:w-[90%]">
          <ProjectData />
          <div className="w-[288px] h-[320px] rounded-lg border-[1px] border-solid border-gray-300 flex justify-center items-center sm:w-full sm:m-0">
            <ProjectMake />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
