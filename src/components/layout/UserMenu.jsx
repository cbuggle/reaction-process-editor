import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DefaultConditionsFormModal from "../utilities/DefaultConditionsFormModal";
import React, {useState} from "react";
import {useAuthenticationFetcher} from "../../fetchers/AuthenticationFetcher";

const UserMenu = (
  {
    preconditions,
    defaultConditions,
    conditionEquipmentOptions
  }) => {

  const api = useAuthenticationFetcher()
  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => { setShowModal(!showModal) }

  return (
    <>
      <DefaultConditionsFormModal
        preconditions={preconditions}
        defaultConditions={defaultConditions}
        conditionEquipmentOptions={conditionEquipmentOptions}
        scope='User'
        onToggleModal={toggleModal}
        isOpen={showModal}
      />
      <UncontrolledDropdown nav className='user-drop-down'>
        <DropdownToggle className='user-drop-down__toggle'>
          <FontAwesomeIcon icon="user-circle" className="me-2 h2 mb-0" />
          {localStorage.getItem('username')}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={toggleModal}>
            <FontAwesomeIcon icon='temperature-high' /> User Default Conditions
          </DropdownItem>
          <DropdownItem onClick={api.signOut}>
            <FontAwesomeIcon icon='sign-out' /> Logout
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  )
}

export default UserMenu
