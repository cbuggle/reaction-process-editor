import React from 'react'
import { Button } from 'reactstrap'

import { QRCodeSVG } from 'qrcode.react'
import Barcode from 'react-barcode'

const Vessel = ({ vessel, onSelect }) => {
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
			<div>{vessel.volume_amount + ' ' + vessel.volume_unit}</div>
			<div>{vessel.weight_amount + ' ' + vessel.weight_unit}</div>
			<div>{'BAR_CODE: ' + vessel.bar_code}</div>
			<Barcode value={vessel.bar_code}/>
			<QRCodeSVG value={vessel.qr_code}/>
			<div>{'QR_CODE:  ' + vessel.qr_code}</div>

			<Button onClick={onSelect}> Assign </Button>
		</>
	)
}

export default Vessel
