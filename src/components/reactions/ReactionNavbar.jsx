import React, { useState } from 'react'
import { Accordion, AccordionBody, AccordionItem, Button, Nav, Navbar, NavbarBrand } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp, faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";

import IconButton from "../utilities/IconButton";
import OrdDownloadButton from './OrdDownloadButton';
import ProvenanceFormButton from './ProvenanceFormButton';

import { useReactionsFetcher } from "../../fetchers/ReactionsFetcher";

const ReactionNavbar = ({ reactionProcess }) => {
  const api = useReactionsFetcher();
  const [open, setOpen] = useState('formula');
  const [formulaIsEnlarged, setFormulaIsEnlarged] = useState(false);
  const zoomIcon = formulaIsEnlarged ? 'search-minus' : 'search-plus'
  const formulaImageClass = formulaIsEnlarged ? 'reaction-header__formula-image reaction-header__formula-image--enlarged' : 'reaction-header__formula-image'
  const toggleFormula = () => {
    if (open) {
      setOpen('');
    } else {
      setOpen('formula');
    }
  };
  const toggleFormulaEnlarge = () => {
    setFormulaIsEnlarged(!formulaIsEnlarged)
  };
  return (
    <div className='reaction-header'>
      <Navbar className='reaction-navbar bg-primary' dark>
        <NavbarBrand>
          <span className='h3 reaction-name'>Reaction: {reactionProcess.short_label}</span>
          <span className='reaction-id'>{reactionProcess.id}</span>
        </NavbarBrand>
        <Nav>
          <ProvenanceFormButton provenance={reactionProcess.provenance} />
          <OrdDownloadButton reactionId={reactionProcess.reaction_id} />
        </Nav>
      </Navbar>
      <Accordion open={open} toggle={toggleFormula} flush className='bg-primary container-fluid pb-2 reaction-header__formula-accordion'>
        <AccordionItem>
          <AccordionBody accordionId='formula' className='text-center'>
            <div className='reaction-header__formula-container'>
              <img
                src={api.svgImage(reactionProcess)}
                alt={reactionProcess.short_label}
                className={formulaImageClass}
              />
              <div className='reaction-header__formula-enlarge-button-container'>
                <IconButton icon={zoomIcon} className='icon-button--positive' size='lg' onClick={toggleFormulaEnlarge} />
              </div>
            </div>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
      <div className='text-center formula-drawer-button-container'>
        <Button
          className='formula-drawer-button btn-primary'
          size='sm'
          onClick={toggleFormula}
        >
          <FontAwesomeIcon icon={open ? faAngleDoubleUp : faAngleDoubleDown} />
          <span>Formula</span>
          <FontAwesomeIcon icon={open ? faAngleDoubleUp : faAngleDoubleDown} />
        </Button>
      </div>
    </div>
  )
}

export default ReactionNavbar
