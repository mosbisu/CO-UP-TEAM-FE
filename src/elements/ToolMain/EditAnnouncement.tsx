import { Box, Modal } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { queryClient } from "../..";
import { useUpdateAnnouncement } from "../../api/AnnouncementQuery";
import { ProjectKey } from "../../recoil/RoomID";
import { SweetAlertHook } from "../../servers/Sweet";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
};

interface IProps {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  title?: string;
  contents?: string;
  noticeId?: string;
  modifiedTime?: string;
}

interface IForm {
  title: string;
  content: string;
  contents: string;
}

// 공지사항 수정 모달 폼
const EditAnnouncement = ({ title, contents, noticeId, modifiedTime, edit, setEdit }: IProps) => {
  const handleClose = () => setEdit(false);
  const { pjId } = useRecoilValue(ProjectKey);
  const { mutateAsync: UpdateAN } = useUpdateAnnouncement();
  const { register, handleSubmit } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = (data) => {
    if (!data.title) {
      SweetAlertHook(1000, "error", "공지 제목을 적어주세요😕");
      return;
    }
    if (!data.content) {
      SweetAlertHook(1000, "error", "공지 내용을 적어주세요😕");
      return;
    }

    const Update = {
      pjId,
      noticeId: String(noticeId),
      title: data.title,
      contents: data.content,
    };
    UpdateAN(Update).then(() => {
      queryClient.invalidateQueries("getAnnouncement");
    });
    setEdit(false);
  };
  return (
    <>
      <Modal
        open={edit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-[704px] h-[384px] rounded-xl sm:w-[90%]">
          <form className="w-full h-full relative" onSubmit={handleSubmit(onSubmit)}>
            <input
              autoFocus
              className="w-full mb-[10px] outline-none border-none text-2xl placeholder:text-[#B0B0B0] placeholder:font-semibold font-semibold"
              {...register("title")}
              type="text"
              maxLength={30}
              placeholder="공지 제목을 적어주세요 :)"
              defaultValue={title}
            />
            <div className="text-[#999999] pl-[2px]">
              {modifiedTime?.replaceAll("-", ".").slice(0, 10)}
            </div>
            <Scroll
              className="w-full h-[160px] outline-none border-none resize-none overflow-y-auto mt-[22px] text-lg placeholder:text-[#B0B0B0]"
              {...register("content")}
              placeholder="내용을 입력해주세요"
              maxLength={254}
              defaultValue={contents}
            />
            <div className="absolute bottom-0 right-0">
              <button
                className="text-white hover:bg-h1 bg-3 w-[58px] h-[37px] rounded-md leading-[21px]"
                type="submit"
              >
                수정
              </button>
              <button
                onClick={handleClose}
                className="hover:bg-h2 bg-5 w-[58px] h-[37px] rounded-md ml-[4px] leading-[21px]"
                type="button"
              >
                닫기
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default React.memo(EditAnnouncement);

const Scroll = styled.textarea`
  &::-webkit-scrollbar-thumb {
    background: #ebebeb;
  }
`;
