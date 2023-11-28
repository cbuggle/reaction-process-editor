import React from 'react'

const Vessel = ({ vessel }) => {
	return (
		<>
			<div>{vessel.id}</div>
			<div>{vessel.name}</div>
			<div>{vessel.description}</div>
			<div>{vessel.short_label}</div>
			<div>{vessel.details}</div>
			<div>{vessel.material_details}</div>
			<div>{vessel.material_type}</div>
			<div>{vessel.vessel_type}</div>
			<div>{vessel.volume_amount}</div>
			<div>{vessel.volume_unit}</div>
		</>
	)
}

export default Vessel
