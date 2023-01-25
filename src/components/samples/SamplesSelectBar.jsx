import React, { useMemo } from 'react'
import { Navbar, NavbarText } from 'reactstrap'

import SamplesSelectBarSection from './SamplesSelectBarSection'
const SamplesSelectBar = ({ reactionProcess }) => {

  const sections = useMemo(() => {
    return [
      { name: 'Starting Materials', samples: reactionProcess.starting_materials, layout: 'sample' },
      { name: 'Solvents', samples: reactionProcess.solvents, layout: 'sample' },
      { name: 'Purification Solvents ', samples: reactionProcess.purification_solvents, layout: 'solvent' },
      { name: 'Products', samples: reactionProcess.starting_materials, layout: 'solvent' },
      { name: 'Intermediates', samples: reactionProcess.starting_materials, layout: 'sample' },
    ]
  })

  const materialCount = useMemo(() => {
    return sections.reduce((sum, section) => sum + section.samples.length, 0 );
  })

  return (
    <>
      <Navbar className="navbar-sidebars center-content">
        <NavbarText>
          Materials ({materialCount})
        </NavbarText>
      </Navbar>
      <div className="samples-select-bar">
        {sections.map((section, idx) => (
          <SamplesSelectBarSection key={idx} section={section} />
        ))}
      </div>
    </>
  )
}

export default SamplesSelectBar
