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
          <button onClick={handleEdit} className="pr-2 cursor-pointer">
            <Image src={"/assets/edit.svg"} width={20} height={20} alt="Edit" />
          </button>
          <div className="bg-gray h-5 w-px"></div>
        </>
      )}
      {confirmDelete && (
        <button
          title={deleteButtonDisabled ? "Not Allowed" : ""}
          disabled={deleteButtonDisabled}
          onClick={confirmDelete}
          className="pl-2 cursor-pointer"
        >
          <Image
            src={"/assets/trash.svg"}
            width={20}
            height={20}
            alt="Delete"
          />
        </button>
      )}
    </>
  );
};

export default ActionButtons;
