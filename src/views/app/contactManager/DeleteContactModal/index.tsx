import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";

import { useDispatch } from "react-redux";
import {
  bulkDeleteContacts,
  clearSelectedContacts,
  deleteContact,
} from "../../../../redux/contactsSlice";

import "./deleteContactModal.scss";

type DeleteAlertModalProps = {
  openModal: boolean;
  selectedIds: string[];
  singleDeleteId?: string;
  setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleDeleteId?: React.Dispatch<React.SetStateAction<string>>;
};

const DeleteAlertModal: React.FC<DeleteAlertModalProps> = ({
  openModal,
  selectedIds,
  singleDeleteId,
  setIsDeleteModal,
  setSingleDeleteId,
}) => {
  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsDeleteModal(!openModal);
    setSingleDeleteId?.("");
    !singleDeleteId && dispatch(clearSelectedContacts());
  };

  const onDelete = () => {
    dispatch(
      singleDeleteId ? deleteContact(singleDeleteId) : bulkDeleteContacts()
    );
    toggleModal();
  };

  return (
    <Modal open={openModal}>
      <div className="delete-modal-container">
        <div className="top-section">
          <div style={{ display: "flex", alignItems: "center" }}>
            <DeleteOutlinedIcon color="error" />
            <p style={{ fontWeight: "bold" }}>Delete Contact</p>
          </div>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={toggleModal} />
        </div>
        <hr />

        <div style={{ padding: "16px" }}>
          Are you sure you want to delete {`${selectedIds.length || "this"}`}{" "}
          contact?
          <br /> This action cannot be undone.
        </div>

        <hr />
        <div
          style={{
            columnGap: "16px",
            padding: "16px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: "48%" }}>
            <Button
              label="Cancel"
              style={{ width: "100%" }}
              onClick={toggleModal}
            />
          </div>
          <div style={{ width: "48%" }}>
            <Button
              label="Delete"
              onClick={onDelete}
              style={{ backgroundColor: "#E11D48", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAlertModal;
