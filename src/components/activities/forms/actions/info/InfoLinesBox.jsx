import React from 'react'

const InfoLinesBox = ({ title, lines }) => {
	return (
		<div className="activity-info__text-block">
			{title && <h6>{title}</h6>}
			{lines?.length > 0 && (
				<p>
					{lines.map((line, index) => (
						<span key={index} className="procedure-card__info-line">
							{line}
						</span>
					))}
				</p>
			)}
		</div>
	)
}
export default InfoLinesBox
