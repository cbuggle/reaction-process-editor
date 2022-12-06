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

import ReactionsFetcher from '../../fetchers/ReactionsFetcher'

const MainNavbar = ({ onChangeCollection }) => {

  const navigate = useNavigate();

  const [reactionOptions, setReactionOptions] = useState([])
  const [collectionOptions, setCollectionOptions] = useState([])
  const [filterCollectionId, setFilterCollectionId] = useState(localStorage.getItem('filter_collection_id'))

  const auth_token = new URLSearchParams(useLocation().search).get('auth');

  useEffect(() => {
    if (auth_token) {
      localStorage.setItem('jwt', auth_token);
    }
    fetchCollectionOptions()
    fetchReactionOptions()
  }, []);

  const fetchReactionOptions = () => {
    ReactionsFetcher.getReactionOptions().then((result) => {
      setReactionOptions(result['reactions'])
    })
  }

  const fetchCollectionOptions = () => {
    ReactionsFetcher.getCollectionSelectOptions().then((result) => {
      setCollectionOptions(result['collection_select_options'])
    })
  }

  const redirectToReaction = (id) => {
    navigate("/reactions/" + id);
    window.location.reload();
  }

  const selectCollection = (event) => {
    localStorage.setItem('filter_collection_id', event.target.value)
    fetchReactionOptions()
    if (onChangeCollection) { onChangeCollection() }
  }

  const selectReaction = (event) => {
    redirectToReaction(event.target.value)
  }

  return (
    <Navbar fixed='top' color='primary' dark >
      <NavbarBrand href="/">ELN Process Editor</NavbarBrand>
      <Nav navbar className="justify-content-evenly flex-grow-1">
        <NavItem>
          <NavLink href="/reactions">
            Reaction Index
          </NavLink>
        </NavItem>

        <NavItem>
          <UncontrolledDropdown nav>
            <DropdownToggle nav caret>
              Collections {filterCollectionId}
            </DropdownToggle>
            <DropdownMenu>
              {collectionOptions.map((collection) =>
                <DropdownItem key={collection.value} value={collection.value} onClick={selectCollection} selected={filterCollectionId === collection.value}>
                  {collection.label}
                </DropdownItem>)}
            </DropdownMenu>
          </UncontrolledDropdown>
        </NavItem>

        <NavItem>
          <UncontrolledDropdown nav>
            <DropdownToggle nav caret>
              Reactions ({reactionOptions.length})
            </DropdownToggle>
            <DropdownMenu>
              {reactionOptions.map((reaction) =>
                <DropdownItem key={reaction.id} value={reaction.id} onClick={selectReaction}>{reaction.id + ': ' + reaction.short_label}</DropdownItem>)}
            </DropdownMenu>
          </UncontrolledDropdown>
        </NavItem>
        <NavbarText>
          <FontAwesomeIcon icon="user-circle" />

            {" " + localStorage.getItem('username')}
        </NavbarText>
        <NavItem>
          <LogoutButton />
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default MainNavbar




