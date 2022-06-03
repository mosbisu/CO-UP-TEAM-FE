import { User } from "../../api/UserQuery";

// 프로젝트 본인 프로필
const TeamMe = ({ profileImage, nickname, aboutMe, url }: User) => {
  return (
    <div className="group w-full mt-[12px] relative flex items-center space-x-2">
      <img className="rounded-full m-0" width={36} height={36} src={profileImage} alt="" />
      <span className="font-semibold dark:text-white">{nickname}</span>
      <div className="left-[-13%] bottom-[36px] hidden w-[280px] sm:w-[275px] min-h-[120px] z-50 bg-5 dark:bg-8 border-[#E7EBF2] dark:border-[#666666] border-[1px] border-solid group-hover:flex sm:group-focus:block absolute right-[-315px] rounded-lg shadow-md">
        <div className="w-full h-full px-[22px] py-[12px] flex flex-col">
          <div className="w-full h-full flex">
            <div className="h-full flex items-center span">
              <img className="rounded-full" width={36} height={36} src={profileImage} alt="" />
            </div>
            <div className="flex flex-col w-[210px] h-full pl-[12px] pt-[12px]">
              <span className="font-semibold ">{nickname}</span>
              <span className="whitespace-pre-wrap break-all pt-[12px] pb-[18px]">{aboutMe}</span>
              <a
                href={url}
                target="_blank"
                className="text-xs text-8 dark:text-2 text-ellipsis overflow-hidden whitespace-nowrap"
                rel="noreferrer"
              >
                {url}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMe;
