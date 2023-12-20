import React from 'react'
import { Button } from 'reactstrap'

import { QRCodeSVG } from 'qrcode.react'
import Barcode from 'react-barcode'

const Vessel = ({ vessel, onSelect }) => {
	return (
		<>
			<b> Attribute aus VesselTemplate </b>
			<div>{"id: " + vessel.vessel_template_id}</div>
			<div>{"Template Name: " + vessel.vessel_template_name}</div>
			<div>{"Typ: " + vessel.vessel_type}</div>
			<div>{"Material: " + vessel.material_type}</div>
			<b>
				<i>Typ und Material haben eine vorgegebene Wertemenge wie sie im ORD definiert sind (Derzeit 20 Typen, 13 Materialien).</i>
				Alles andere sind Freitexte.
			</b>
			<div>{"Material Details: " + vessel.material_details}</div>
			{
				// Volume, Amount sind intern float. Das toString() schneidet hässliche Nachkomma-Nullen ab.
			}
			<div>{"Volume: " + vessel.volume_amount.toString() + ' ' + vessel.volume_unit}</div>
			<div>{"Weight: " + vessel.weight_amount.toString() + ' ' + vessel.weight_unit}</div>
			<b> Attribute aus Vessel</b>
			<div>{"id: " + vessel.id}</div>

			<div>{"Short_label: " + vessel.short_label}</div>
			<div>{"Name: " + vessel.name}</div>

			<div>{"Description: " + vessel.description}</div>
			<div>{"Details :" + vessel.details}</div>
			<div>{'BAR_CODE: ' + vessel.bar_code}</div>
			<Barcode value={vessel.bar_code} />
			<QRCodeSVG value={vessel.qr_code} />
			<div>{'QR_CODE:  ' + vessel.qr_code}</div>

			<Button onClick={onSelect}> Assign </Button>
		</>
	)
}

export default Vessel
