import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useDelFolder } from "../../api/FolderQuery";
import { queryClient } from "../..";
import { MoreHorizontal } from "../../elements/Icon/MoreHorizontal";
import { ProjectKey } from "../../recoil/RoomID";
import Swal from "sweetalert2";

interface IProps {
  dfId?: string;
  setEditTitle: Dispatch<SetStateAction<boolean>>;
  setDfId: Dispatch<SetStateAction<string>>;
}

// 폴더 수정 관련 모달
const FolderFiexd = ({ dfId, setEditTitle, setDfId }: IProps) => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { mutateAsync: DelFolder } = useDelFolder(String(dfId));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = () => {
    navigate(`/tool/${pjId}/document/add`, { state: dfId });
  };

  const DeleteFolder = () => {
    setAnchorEl(null);
    Swal.fire({
      title: "폴더를 삭제하시겠습니까?",
      text: "삭제한 폴더는 복구되지 않습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제하기",
      cancelButtonText: "돌아가기",
      confirmButtonColor: "#5F99FF",
      cancelButtonColor: "#D7DCE5",
    }).then((result) => {
      if (result.value) {
        DelFolder().then(() => {
          queryClient.invalidateQueries("getFolders");
          queryClient.invalidateQueries("getNewDoc");
        });
      }
    });
  };

  const onEdit = () => {
    setEditTitle(true);
    setAnchorEl(null);
    setDfId(String(dfId));
  };
  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizontal />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "180px",
            height: "130px",
            display: "flex",
            alignItems: "center",
            marginLeft: "40px",
            marginTop: "-30px",
            border: "1px solid #BEBEBE",
            padding: 0,
          },
        }}
      >
        <button className="px-4 py-[12px] hover:text-[#2C78FF]" onClick={onClick}>
          문서 생성하기
        </button>
        <button className="px-4 py-[12px] hover:text-[#2C78FF]" onClick={onEdit}>
          폴더 이름 바꾸기
        </button>
        <button className="px-4 py-[12px] hover:text-[#2C78FF]" onClick={DeleteFolder}>
          폴더 지우기
        </button>
      </Menu>
    </>
  );
};

export default FolderFiexd;
