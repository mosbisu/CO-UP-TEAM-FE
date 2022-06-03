/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult, resetServerContext } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { Board, useGetBoard } from "../api/BoardQuery";
import { useUpdateCards } from "../api/Optimistic";
import Bucket from "../Components/ToolBoard/Bucket";
import EmptyBoard from "../images/Board/board1.png";
import EmptyBoardM from "../images/Board/board_m.png";
import { ProjectKey } from "../recoil/RoomID";

const BoardList = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { data: board, isFetching } = useGetBoard(String(pjId));
  const [open, setOpen] = useState<boolean>(false);
  const { mutateAsync } = useUpdateCards(pjId);
  // 카드가 없을시 캐릭터 사진
  useEffect(() => {
    resetServerContext();
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += board?.data[i].cards.length;
    }
    sum === 0 ? setOpen(true) : setOpen(false);
  }, [board]);
  // End Drop function
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }
    // 같은 보드에서 드래그 이벤트
    if (destination?.droppableId === source.droppableId) {
      const boardCopy = [...board?.data[Number(source.droppableId)].cards];
      const taskObj = boardCopy[source.index];
      boardCopy.splice(Number(source.index), 1);
      boardCopy.splice(destination?.index, 0, taskObj);
      const post = {
        kbcId: taskObj.kbcId,
        kbbId: taskObj.kbbId,
        title: taskObj.title,
        manager: taskObj.manager,
        managerNickname: taskObj.managerNickname,
        contents: taskObj.contents,
        position: destination.index,
      };
      mutateAsync(post);
    }
    // 다른 보드에서 드래그 이벤트
    if (destination.droppableId !== source.droppableId) {
      const sourceBoard = [...board?.data[Number(source.droppableId)].cards];
      const taskObj = sourceBoard[source.index];
      const destinationBoard = [...board?.data[Number(destination.droppableId)].cards];
      const LastKbbId = board?.data[Number(destination.droppableId)].kbbId;
      sourceBoard.splice(source.index, 1);
      destinationBoard.splice(destination?.index, 0, taskObj);
      const post = {
        kbcId: taskObj.kbcId,
        kbbId: String(LastKbbId),
        title: taskObj.title,
        manager: taskObj.manager,
        managerNickname: taskObj.managerNickname,
        contents: taskObj.contents,
        position: destination.index,
      };
      mutateAsync(post);
    }
  };
  return (
    <div className="w-full h-full bg-[#F0F3F7] dark:bg-8 overflow-auto">
      <div className="max-w-[1300px] sm:h-auto h-full ml-16 md:ml-0 sm:ml-2 flex justify-center items-center relative sm:pb-36">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="w-full h-full flex">
            <div className="flex w-full h-full gap-7 md:justify-start overflow-auto">
              {board?.data.map((bucketId: Board, index: number) => {
                return (
                  <Bucket
                    kbbId={bucketId.kbbId}
                    bucketId={bucketId.title}
                    key={bucketId.title}
                    toDos={bucketId.cards}
                    index={index}
                    boardOpen={open}
                    isFetching={isFetching}
                  />
                );
              })}
            </div>
          </div>
        </DragDropContext>
        {open ? (
          <div className="w-full h-[calc(100%-5rem)]  absolute top-20 flex flex-col justify-center sm:justify-start sm:mt-10 items-center space-y-6 sm:items-center">
            <img className="block sm:hidden" width={370} height={337} src={EmptyBoard} alt="" />
            <img className="hidden sm:block" width={155} height={141} src={EmptyBoardM} alt="" />
            <div className="w-[420px] h-[135px] space-y-4 sm:w-[280px] flex flex-col">
              <div className="text-center space-x-2 font-semibold text-4xl sm:text-3xl mb-4 w-full flex sm:flex-col">
                <span>새로운 보드를</span>
                <span>{`추가해 보세요`}</span>
              </div>
              <div className="text-center text-lg sm:text-sm">
                <span>보드를 사용하여 팀원들과 현재 대기중인, 진행중인, </span>
                <span>완료된 보드의 작업 상태를 공유할 수 있습니다.</span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default React.memo(BoardList);
