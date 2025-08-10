import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import Button from "../../../components/Button";
import SearchInput from "../../../components/SearchInput";
import DataTable from "../../../components/Table";

import DeleteAlertModal from "./DeleteContactModal";
import AddContactModal from "./AddEditModal";

import {
  selectFilteredContacts,
  selectSelectedIds,
} from "../../../redux/selector";

import {
  Contact,
  setSearchQuery,
  toggleSelectAllContacts,
  toggleSelectContact,
} from "../../../redux/contactsSlice";
import { RootState } from "../../../redux/store";

import "./contactManager.scss";
import "../../pages.scss";

const initialEditModalData = {
  id: "",
  name: "",
  state: "",
  pincode: "",
  email: "",
  number: "",
  address: "",
  addressLine1: "",
};

const ContactManager = () => {
  const [editModalData, setEditModalData] =
    useState<Contact>(initialEditModalData);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [singleDeleteId, setSingleDeleteId] = useState("");

  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const selectedIdsList = useSelector(selectSelectedIds);
  const { searchQuery } = useSelector((state: RootState) => state["contacts"]);

  const selectedRows = useMemo(() => {
    return selectedIdsList.reduce<Record<string, boolean>>((acc, id) => {
      acc[id] = true;
      return acc;
    }, {});
  }, [selectedIdsList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleAddContactClick = () => {
    setOpenModal((prev) => !prev);
  };

  const Columns = useMemo(
    () => [
      { key: "name", label: "Name" },
      { key: "number", label: "Contact" },
      { key: "email", label: "Email" },
      { key: "address", label: "Address" },
      {
        key: "action",
        label: "Action",
        render: (row: Contact) => (
          <div className="action-buttons">
            <div>
              <div
                className={classNames({
                  "action-icon-primary": !selectedIdsList?.length,
                  "disabled-action-icon": selectedIdsList?.length,
                })}
                onClick={() => {
                  if (selectedIdsList?.length) return;
                  handleAddContactClick();
                  setEditModalData(row);
                }}
              >
                <EditOutlinedIcon color="primary" fontSize="small" />
              </div>
              <p style={{ fontSize: "11px" }}>Edit</p>
            </div>

            <div>
              <div
                className={classNames({
                  "action-icon-error": !selectedIdsList?.length,
                  "disabled-action-icon": selectedIdsList?.length,
                })}
                onClick={() => {
                  if (selectedIdsList?.length) return;
                  setIsDeleteModal(true);
                  setSingleDeleteId(row.id);
                }}
              >
                <DeleteOutlinedIcon color="error" fontSize="small" />
              </div>
              <p style={{ fontSize: "11px" }}>Delete</p>
            </div>
          </div>
        ),
      },
    ],
    [selectedIdsList]
  );

  return (
    <div className="contact-manager-container">
      {/* top nav section */}
      <div className="sticky">
        <div style={{ padding: "16px 16px 0" }}>
          <h2 style={{ userSelect: "none" }}>Contact Manager</h2>
        </div>
        <div className="top-nav">
          {/* search table field section */}
          <div className="search-container">
            <SearchInput
              role="search-contacts"
              placeholder="Search by name and email"
              value={searchQuery}
              onChange={handleSearchChange}
              disabled={!!selectedIdsList?.length}
            />
          </div>

          {/* add delete action section */}
          <div className="button-container">
            {selectedIdsList.some((el) => el) && (
              <Button
                label={`Bulk Delete Contacts ${selectedIdsList.length}`}
                onClick={() => setIsDeleteModal(true)}
              />
            )}
            <Button
              label="Add Contacts"
              disabled={!!selectedIdsList.length}
              onClick={handleAddContactClick}
            />
          </div>
        </div>
      </div>

      {/* table Section */}
      <DataTable
        data={contacts}
        columns={Columns}
        showCheckbox={true}
        selectedRows={selectedRows}
        onSelectRow={(id) => dispatch(toggleSelectContact(id))}
        onSelectAll={(selected) => dispatch(toggleSelectAllContacts(selected))}
      />

      {/* add edit modal section */}
      {openModal && (
        <AddContactModal
          open={openModal}
          setOpenModal={setOpenModal}
          editModalData={editModalData}
        />
      )}

      {/* delete alert modal */}
      {isDeleteModal && (
        <DeleteAlertModal
          openModal={isDeleteModal}
          selectedIds={selectedIdsList}
          singleDeleteId={singleDeleteId}
          setIsDeleteModal={setIsDeleteModal}
          setSingleDeleteId={setSingleDeleteId}
        />
      )}
    </div>
  );
};

export default ContactManager;
