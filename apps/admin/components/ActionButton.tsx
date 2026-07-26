import editIcon from "@/assets/ui/edit.svg";
import trashIcon from "@/assets/ui/trash.svg";
import Image from "next/image";

interface ActionButtonsProps {
  handleEdit?: () => void;
  confirmDelete?: () => void;
  deleteButtonDisabled?: boolean;
}

const ActionButtons = ({
  handleEdit,
  confirmDelete,
  deleteButtonDisabled = false,
}: ActionButtonsProps) => {
  return (
    <>
      {handleEdit && (
        <>
          <button onClick={handleEdit} className="cursor-pointer pr-2">
            <Image src={editIcon} width={20} height={20} alt="Edit" />
          </button>
          <div className="bg-gray h-5 w-px"></div>
        </>
      )}
      {confirmDelete && (
        <button
          title={deleteButtonDisabled ? "Not Allowed" : ""}
          disabled={deleteButtonDisabled}
          onClick={confirmDelete}
          className="cursor-pointer pl-2"
        >
          <Image src={trashIcon} width={20} height={20} alt="Delete" />
        </button>
      )}
    </>
  );
};

export default ActionButtons;
