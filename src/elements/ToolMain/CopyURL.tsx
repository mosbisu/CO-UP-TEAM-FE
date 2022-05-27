import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/RoomID";
import Swal from "sweetalert2";

const CopyURL = () => {
  const { inviteCode } = useRecoilValue(ProjectKey);
  const textInput = useRef<HTMLInputElement>(null);
  const copy = () => {
    const el = textInput.current;
    if (el === null) return;
    el.select();
    document.execCommand("copy");
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "초대코드 복사 완료😊",
    });
  };
  return (
    <div className="w-1/5 h-20 flex items-end justify-end">
      <input
        className="w-[100px] opacity-0 pointer-events-none"
        value={inviteCode || ""}
        ref={textInput}
        readOnly
      />
      <div className="flex">
        <button onClick={copy} className="w-[86px] h-[39px] bg-[#D7DCE5] rounded">
          초대코드
        </button>
      </div>
    </div>
  );
};

export default CopyURL;
