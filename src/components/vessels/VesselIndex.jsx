import React, { useContext } from 'react'

import Vessel from './Vessel';
import { VesselOptions } from '../../contexts/VesselOptions';

const VesselIndex = () => {
	const vessels = useContext(VesselOptions)

	return (
		<>
			{
				vessels.map((vessel) =>
					<Vessel
						key={vessel.id}
						vessel={vessel}
					/>
				)
			}
		</>
	)
}

export default VesselIndex
