import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/RoomID";

const ProjectSummary = () => {
  const Project = useRecoilValue(ProjectKey);
  return (
    <div className="w-10/12 h-full flex items-center sm:flex-col sm:items-start">
      <img className="rounded-full" width="76px" height="76px" src={Project.thumbnail} alt="" />
      <div className="flex flex-col justify-center space-y-2 ml-[26px] sm:ml-0 sm:mt-[14px]">
        <div className="w-full flex items-center">
          <span className="text-3xl sm:text-2xl font-bold">{Project.title}</span>
        </div>
        <span className="text-base break-all">{Project.summary}</span>
      </div>
    </div>
  );
};

export default ProjectSummary;
