import React, { useEffect, useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

import { useNavigate, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoutButton from '../login/LogoutButton';

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

const MainHeader = () => {

  const navigate = useNavigate();
  const api = useReactionsFetcher();

  const [reactionOptions, setReactionOptions] = useState([])
  const [collectionOptions, setCollectionOptions] = useState([])
  const filterCollectionId = localStorage.getItem('filter_collection_id')

  const auth_token = new URLSearchParams(useLocation().search).get('auth');

  useEffect(() => {
    if (auth_token) {
      localStorage.setItem('bearer_auth_token', auth_token);
    }
    if (localStorage.getItem('bearer_auth_token')) {
      fetchCollectionOptions()
      fetchReactionOptions()
    }
  }, []);

  const fetchReactionOptions = () => {
    api.reactionSelectOptions().then((data) => {
      setReactionOptions(data['reactions'])
    })
  }

  const fetchCollectionOptions = () => {
    api.collectionSelectOptions().then((data) => {
      setCollectionOptions(data['collection_select_options'])
    })
  }

  const selectCollection = (event) => {
    localStorage.setItem('filter_collection_id', event.target.value)
    fetchReactionOptions()
  }

  const selectReaction = (event) => {
    console.log("selectReaction " + event.target.value)
    navigate("/reactions/" + event.target.value);
    window.location.reload();
  }

  const brandHref = () => {
    return localStorage.getItem('username') ? '/reactions' : '/'

  }

  const renderLoginHint = () => {
    return (
      <>
        <NavItem>
          <NavbarText>
            Please Login with your eln credentials
          </NavbarText>
        </NavItem>

      </>
    )
  }

  const renderNavbarLoggedIn = () => {
    return (
      <>
        <Nav navbar className="justify-content-evenly flex-grow-1">
          <NavItem>
            <NavLink href="/reactions">
              Reaction Index
            </NavLink>
          </NavItem>
          <NavItem>
            <ul>
              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  Collections
                </DropdownToggle>
                <DropdownMenu>
                  {collectionOptions.map((collection) =>
                    <DropdownItem key={collection.value} value={collection.value} onClick={selectCollection} selected={filterCollectionId === collection.value}>
                      {collection.label}
                    </DropdownItem>)}
                </DropdownMenu>
              </UncontrolledDropdown>
            </ul>
          </NavItem>
          <NavItem>
            <ul>

              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  Reactions ({reactionOptions.length})
                </DropdownToggle>
                <DropdownMenu>
                  {reactionOptions.map((reaction) =>
                    <DropdownItem key={reaction.id} value={reaction.id} onClick={selectReaction}>{reaction.id + ': ' + reaction.short_label}</DropdownItem>)}
                </DropdownMenu>
              </UncontrolledDropdown>
            </ul>
          </NavItem>
        </Nav>
        <Nav navbar className="justify-content-end">
          <NavItem className="me-2">
            <NavbarText className="d-flex" >
              <FontAwesomeIcon icon="user-circle" className="pt-1 me-1" />
              {localStorage.getItem('username')}
            </NavbarText>
          </NavItem>
          <NavItem>
            <LogoutButton />
          </NavItem>
        </Nav>
      </>
    )
  }

  return (
    <Navbar color='primary' dark >
      <NavbarBrand href={brandHref()}>ELN Process Editor</NavbarBrand>
      {localStorage.getItem('username') ? renderNavbarLoggedIn() : renderLoginHint()}
    </Navbar>
  )
}

export default MainHeader




