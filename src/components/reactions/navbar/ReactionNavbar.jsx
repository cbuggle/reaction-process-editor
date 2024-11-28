import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionItem,
  Button,
  Nav,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleUp,
  faAngleDoubleDown,
} from "@fortawesome/free-solid-svg-icons";

import IconButton from "../../utilities/IconButton";
import OrdDownloadButton from "./OrdDownloadButton";
import ProvenanceFormButton from "./ProvenanceFormButton";
import ReactionConditionsFormButton from "./ReactionConditionsFormButton";

import { useReactionsFetcher } from "../../../fetchers/ReactionsFetcher";
import {
  SubFormController,
  SubFormToggle,
} from "../../../contexts/SubFormController";

const ReactionNavbar = ({ reactionProcess }) => {
  const api = useReactionsFetcher();
  const [open, setOpen] = useState("");
  const [schemeIsEnlarged, setSchemeIsEnlarged] = useState(false);
  const zoomIcon = schemeIsEnlarged ? "search-minus" : "search-plus";
  const schemeImageClass = schemeIsEnlarged
    ? "reaction-header__scheme-image reaction-header__scheme-image--enlarged"
    : "reaction-header__scheme-image";

  const toggleScheme = () => {
    if (open) {
      setOpen("");
    } else {
      setOpen("");
    }
  };
  const toggleSchemeEnlarge = () => {
    setSchemeIsEnlarged(!schemeIsEnlarged);
  };
  return (
    <SubFormController.Provider value={SubFormToggle()}>
      <div className="reaction-header">
        <Navbar className="reaction-navbar bg-primary" dark>
          <NavbarBrand>
            <span className="h3 reaction-name">
              Reaction: {reactionProcess.short_label}
            </span>
            <span className="reaction-id">{reactionProcess.id}</span>
          </NavbarBrand>
          <Nav>
            <ReactionConditionsFormButton
              defaultConditions={reactionProcess.reaction_default_conditions}
              preconditions={reactionProcess.user_default_conditions}
            />
            <ProvenanceFormButton provenance={reactionProcess.provenance} />
            <OrdDownloadButton reactionProcessId={reactionProcess.id} />
          </Nav>
        </Navbar>
        <Accordion
          open={open}
          toggle={toggleScheme}
          flush
          className="bg-primary container-fluid pb-2 reaction-header__scheme-accordion"
        >
          <AccordionItem>
            <AccordionBody accordionId="scheme" className="text-center">
              <div className="reaction-header__scheme-container">
                <img
                  src={api.svgImage(reactionProcess)}
                  alt={reactionProcess.short_label}
                  className={schemeImageClass}
                />
                <div className="reaction-header__scheme-enlarge-button-container">
                  <IconButton
                    icon={zoomIcon}
                    positive={true}
                    size="lg"
                    onClick={toggleSchemeEnlarge}
                  />
                </div>
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
        <div className="text-center scheme-drawer-button-container">
          <Button
            color="primary"
            className="scheme-drawer-button"
            size="sm"
            onClick={toggleScheme}
          >
            <FontAwesomeIcon
              icon={open ? faAngleDoubleUp : faAngleDoubleDown}
            />
            <span>Scheme</span>
            <FontAwesomeIcon
              icon={open ? faAngleDoubleUp : faAngleDoubleDown}
            />
          </Button>
        </div>
      </div>
    </SubFormController.Provider>
  );
};

export default ReactionNavbar;
