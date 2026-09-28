import editIcon from "@/assets/ui/edit.svg";
import newTabIcon from "@/assets/ui/newTab.svg";
import trashIcon from "@/assets/ui/trash.svg";
import Image from "next/image";

interface ActionButtonsProps {
  handleEdit?: () => void;
  confirmDelete?: () => void;
  deleteButtonDisabled?: boolean;
  viewUrl?: string;
}

const ActionButtons = ({
  handleEdit,
  confirmDelete,
  deleteButtonDisabled = false,
  viewUrl,
}: ActionButtonsProps) => {
  return (
    <>
      {handleEdit && (
        <>
          <button
            onClick={handleEdit}
            title="Edit"
            className="cursor-pointer pr-2"
          >
            <Image src={editIcon} width={20} height={20} alt="Edit" />
          </button>
          <div className="bg-gray h-5 w-px"></div>
        </>
      )}
      {viewUrl && (
        <>
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Preview"
            className="cursor-pointer px-2"
          >
            <Image src={newTabIcon} width={20} height={20} alt="Preview" />
          </a>
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
