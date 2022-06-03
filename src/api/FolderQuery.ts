import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { dfId } from "../recoil/AtomDocument";
import { instance } from "../servers/axios";
import { SweetAlertHook } from "../servers/Sweet";
import { Docs } from "./DocumentQuery";

export interface Folders {
  title?: string;
  dfId?: string;
  docs?: Docs[];
  isFetching?: boolean;
}

export interface IFolders {
  data: Folders[];
}

export interface Folder {
  pjId: string;
  title: string;
}

// 폴더 불러오기
export const useGetFolders = (pjId: string) => {
  return useQuery<IFolders, AxiosError>("getFolders", () => {
    return instance.get(`api/folders/?pjId=${pjId}`);
  });
};

// 폴더 생성
export const useAddFolder = () => {
  const setDfId = useSetRecoilState(dfId);
  return useMutation(async (Folder: Folder) => {
    await instance.post("api/folders/", Folder).then((res) => setDfId(res.data.dfId));
  });
};

// 폴더 삭제
export const useDelFolder = (dfId: string) => {
  return useMutation(async () => {
    await instance.delete(`api/folders/?dfId=${dfId}`).then(() => {
      SweetAlertHook(1000, "error", "폴더 삭제 완료😊");
    });
  });
};

// 폴더 수정
export const useUpdateFolder = (dfId: string) => {
  return useMutation(async (Folder: Folders) => {
    await instance.patch(`api/folders/?dfId=${dfId}`, Folder).then(() => {
      SweetAlertHook(1000, "success", "폴더 수정 완료😊");
    });
  });
};
