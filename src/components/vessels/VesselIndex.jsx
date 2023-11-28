import React, { useContext } from 'react'

import Vessel from './Vessel';
import { VesselOptions } from '../../contexts/VesselOptions';

const VesselIndex = ({ onSelectVessel }) => {
	const vessels = useContext(VesselOptions)

	return (
		<>
			{
				vessels.map((vessel) =>
					<Vessel
						key={vessel.id}
						vessel={vessel}
						onSelect={onSelectVessel(vessel.id)}
					/>
				)
			}
		</>
	)
}

export default VesselIndex
