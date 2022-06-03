import { IconButton } from "@mui/material";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { queryClient } from "../..";
import { useUpdateRoom } from "../../api/ProjectQuery";
import { resizeFile } from "../../servers/resize";
import { SweetAlertHook } from "../../servers/Sweet";
import { SvgEdit } from "../Icon/SvgEdit";

interface IForm {
  title: string;
  summary: string;
  img?: string;
  name: string;
  id?: number;
}

interface IProps {
  setUpOpen: Dispatch<SetStateAction<boolean>>;
  roomID?: string;
  roomImg: string;
  roomTitle: string;
  roomSummary: string;
}

// 프로젝트 수정 모달 폼
const ProjectUpdateForm = ({ setUpOpen, roomID, roomImg, roomTitle, roomSummary }: IProps) => {
  const [imgBase64, setImgBase64] = useState<string>(roomImg);
  const fileInput = useRef<HTMLInputElement>(null);
  const { mutateAsync } = useUpdateRoom(String(roomID));
  const { register, handleSubmit } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    // file이 null일 경우 return
    if (fileInput?.current?.files === null) return;
    const size = fileInput?.current?.files[0];
    const project = {
      title: data.title,
      summary: data.summary,
      thumbnail: roomImg,
      pjId: roomID,
    };
    if (size === undefined) {
      mutateAsync(project).then(() => {
        queryClient.invalidateQueries("getProject");
        SweetAlertHook(1000, "success", "프로젝트 수정 완료😊");
        setUpOpen(false);
      });
    }
    // 이미지 수정이 발생했을 때 리사이징
    else {
      const image = await resizeFile(size, 100, 100, "base64");
      const project = {
        title: data.title,
        summary: data.summary,
        thumbnail: String(image),
        pjId: roomID,
      };
      mutateAsync(project).then(() => {
        queryClient.invalidateQueries("getProject");
        mutateAsync(project).then(() => {
          queryClient.invalidateQueries("getProject");
          SweetAlertHook(1000, "success", "프로젝트 수정 완료😊");
          setUpOpen(false);
        });
        setUpOpen(false);
      });
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    const files = e.target.files[0];
    if (files) {
      reader.readAsDataURL(files);
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      <img className="rounded-full mb-4" width="100px" height="100px" alt="" src={imgBase64} />
      <label htmlFor="icon-button-file">
        <input
          type="file"
          id="icon-button-file"
          className="hidden"
          onChange={onChange}
          ref={fileInput}
        />
        <div className="w-8 h-8 rounded-full flex justify-center items-center bg-white border absolute top-[70px] right-[260px] sm:top-[80px] sm:right-[70px] ">
          <IconButton aria-label="upload picture" component="span">
            <SvgEdit />
          </IconButton>
        </div>
      </label>
      <div className="w-[418px] sm:w-[280px]">
        <form className="w-full h-full flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            <span className="w-14 mr-4 sm:hidden">팀 이름</span>
            <input
              autoFocus
              maxLength={15}
              className="w-[352px] h-10 p-2 rounded-md border-none border border-[#D1D1D1]"
              defaultValue={roomTitle}
              {...register("title")}
            />
          </div>
          <div className="flex">
            <span className="w-14 mr-4 mt-2 sm:hidden">소개</span>
            <textarea
              rows={4}
              maxLength={70}
              className="w-[352px] h-[95px] outline-none resize-none p-2 rounded-md border-none border border-[#D1D1D1]"
              defaultValue={roomSummary}
              {...register("summary")}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="w-24 h-[45px] leading-[27px] px-[18px] py-[10px] text-white bg-3 rounded-md"
              type="submit"
            >
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectUpdateForm;
