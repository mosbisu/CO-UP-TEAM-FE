import React from "react";
import styled from "styled-components";
import Chart from "../Components/ToolMain/Chart";
import Member from "../Components/ToolMain/Member";

// 프로젝트 팀 정보 레이아웃
const TeamList = () => {
  return (
    <React.Fragment>
      <Scroll className="w-72 h-full flex flex-col sm:h-screen bg-[#fff] dark:bg-6 dark:border-[#606468] border-r-[1px] border-solid border-[#E7EBF2] overflow-auto">
        <div className="w-72 h-[310px] sm:h-[280px] flex flex-col items-center sm:mt-16">
          <Chart />
          <div className="w-[248px] h-[1px] bg-[#E5E7EB] dark:bg-[#E7EBF2] -mt-1" />
        </div>
        <div className="w-full h-[calc(100%-29rem)] px-4">
          <Member />
        </div>
      </Scroll>
    </React.Fragment>
  );
};

export default TeamList;

const Scroll = styled.div`
  &::-webkit-scrollbar-thumb {
    background: #ebebeb;
  }
`;
