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

import { Link } from "react-router-dom";

import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoutButton from '../login/LogoutButton';

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

const MainHeader = () => {

  const location = useLocation();
  const reactionApi = useReactionsFetcher();

  const [reactions, setReactions] = useState([])
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
    window.addEventListener('indexRequiresReload', fetchReactionOptions);
    return () => {
      window.removeEventListener('indexRequiresReload', fetchReactionOptions);
    };

    // React's state model requires `fetchReactionOptions` in the dependencies array to assert state consistency.
    // When done however it will be called every time when dependencies are checked (i.e. after refetch),
    // triggering another refetch (endless loop).
    // Wrapping fetchReactionOptions in a useCallback as recommended by the React guidelines
    // does not work either as it depends on the api = useReactionsFetcher(),
    // which then again can not be used in hooks as useReactionsFetcher() is a hook itself.
    //
    // We ignore the warnings which is recommended only when you know exactly what you are doing which I do not. cbuggle.
    // eslint-disable-next-line
  }, [location, auth_token]);

  // Hardcoded routes are ok for now.
  const reactionLinkTarget = (id) => { return '/reactions/' + id }
  const reactionIndexLinkTarget = '/reactions'

  const fetchReactionOptions = () => {
    reactionApi.index().then((data) => {
      setReactions(data['reactions'])
      const options = data['reactions'].map(({ id, short_label }) => ({
        key: id,
        url: reactionLinkTarget(id),
        label: id + ': ' + short_label
      }))
      options.unshift({
        key: 'index',
        url: reactionIndexLinkTarget,
        label: 'Reaction Index'
      })
      setReactionOptions(options)
    })
  }

  const fetchCollectionOptions = () => {
    reactionApi.collectionSelectOptions().then((data) => {
      setCollectionOptions(data['collection_select_options'])
    })
  }

  const selectCollection = (event) => {
    localStorage.setItem('filter_collection_id', event.target.value)
    window.dispatchEvent(new Event("indexRequiresReload"))
  }

  const brandHref = () => {
    return localStorage.getItem('username') ? '/reactions' : '/'
  }

  const renderLoginButton = () => {
    return (
      <Nav navbar className="justify-content-end align-items-center">
        <a href='/' className='btn btn-outline-white btn-sm'>Login</a>
      </Nav>
    )
  }

  const renderNavbarLoggedIn = () => {
    return (
      <>
        <Nav navbar className="me-auto main-header__nav">
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
              Reactions ({reactions.length})
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
      {localStorage.getItem('username') ? renderNavbarLoggedIn() : renderLoginButton()}
    </Navbar>
  )
}

export default MainHeader




