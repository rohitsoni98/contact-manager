import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import Button from "../../../../components/Button";
import DropDown from "../../../../components/DropDown";
import TextField from "../../../../components/TextField";
import Modal from "../../../../components/Modal";

import CloseIcon from "@mui/icons-material/Close";

import { ModalContentConfig } from "./constant";
import {
  addContact,
  Contact,
  editContact,
} from "../../../../redux/contactsSlice";

import "./addEditModal.scss";

const AddContactModal = ({
  open,
  setOpenModal,
  editModalData,
  setEditModalData,
}: {
  open: boolean;
  editModalData?: Contact | null;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditModalData: React.Dispatch<React.SetStateAction<null | Contact>>;
}) => {
  const dispatch = useDispatch();
  const [fieldData, setFieldData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editModalData) {
      setFieldData(editModalData as any);
    }
  }, [editModalData]);

  const toggleModal = () => {
    setOpenModal(false);
    setFieldData({});
    setEditModalData(null);
  };

  const handleFieldChange = (key: string, value: string) => {
    setFieldData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isValid = useMemo(() => {
    return ModalContentConfig.every(({ accessorKeyName, required }) => {
      const value = fieldData[accessorKeyName]?.trim() || "";

      if (required && !value) return false;
      if (accessorKeyName === "email" && value && !/^\S+@\S+\.\S+$/.test(value))
        return false;
      if (accessorKeyName === "number" && value && !/^\d+$/.test(value))
        return false;

      return true;
    });
  }, [fieldData]);

  const onCreateEntry = () => {
    if (!isValid) return;

    const newContact = {
      id: editModalData?.["id"] || uuidv4(),
      name: fieldData.name,
      email: fieldData.email,
      state: fieldData.state,
      number: fieldData.number,
      pincode: fieldData.pincode,
      addressLine1: fieldData.addressLine1,
      addressLine2: fieldData.addressLine2,
      address: `${fieldData.addressLine1} ${fieldData.addressLine2 || ""}, ${
        fieldData.state
      }, ${fieldData.pincode}`,
    };

    dispatch(editModalData ? editContact(newContact) : addContact(newContact));
    alert(`${editModalData ? "Update" : "Add"} Entry Successfully`);
    toggleModal();
  };

  return (
    <Modal open={open}>
      <div className="add-edit-details-modal">
        <div className="top-section">
          <p style={{ color: "#334155" }}>Add Contact</p>
          <CloseIcon
            sx={{ color: "#334155", cursor: "pointer" }}
            onClick={toggleModal}
          />
        </div>
        <hr />
        <div className="content-section">
          {ModalContentConfig.map(
            ({
              id,
              label,
              required,
              fieldType,
              type,
              options,
              accessorKeyName,
            }) => (
              <div key={id} style={{ width: "48%" }}>
                {fieldType === "selectBox" ? (
                  <DropDown
                    required={required}
                    label={label}
                    options={[{ name: "None", value: "" }, ...options]}
                    placeholder={`Enter ${label}`}
                    onChange={(option) =>
                      handleFieldChange(accessorKeyName, option.value)
                    }
                    value={fieldData[accessorKeyName] || ""}
                  />
                ) : (
                  <TextField
                    label={label}
                    required={required}
                    type={type || "text"}
                    placeholder={`Enter ${label}`}
                    name={accessorKeyName}
                    onChange={(e) =>
                      handleFieldChange(accessorKeyName, e.target.value)
                    }
                    value={fieldData[accessorKeyName] || ""}
                  />
                )}
              </div>
            )
          )}
        </div>
        <hr />
        <div className="action-section">
          <Button variant="text" label="Cancel" onClick={toggleModal} />
          <Button
            label={`${editModalData ? "Update" : "Add"} Contact`}
            onClick={onCreateEntry}
            disabled={!isValid}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddContactModal;
