import React, { useEffect, useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

import {Link} from "react-router-dom";

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
      const options = data['reactions'].map(({id, short_label}) => ({
        key: id,
        url: "/reactions/" + id,
        label: id + ': ' + short_label
      }))
      options.unshift({
        key: 'index',
        url: '/reactions',
        label: 'Reaction Index'
      })
      setReactionOptions(options)
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
        <Nav navbar className="me-auto">
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
          <UncontrolledDropdown nav>
            <DropdownToggle nav caret>
              Reactions ({reactionOptions.length-1})
            </DropdownToggle>
            <DropdownMenu>
              {reactionOptions.map((reaction) =>
                <DropdownItem key={reaction.key} tag={Link} to={reaction.url}>{reaction.label}</DropdownItem>)}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Nav navbar className="justify-content-end align-items-center">
          <NavItem className="me-3">
            <NavbarText className="d-flex align-items-center" >
              <FontAwesomeIcon icon="user-circle" className="pt-1 me-2 h2 mb-0" />
              <span>{localStorage.getItem('username')}</span>
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
    <Navbar className='bg-secondary main-header' dark expand={true}>
      <NavbarBrand href={brandHref()} className='main-header__brand'><span className='main-header__brand-name'>ELN Process Editor</span></NavbarBrand>
      {localStorage.getItem('username') ? renderNavbarLoggedIn() : renderLoginHint()}
    </Navbar>
  )
}

export default MainHeader




