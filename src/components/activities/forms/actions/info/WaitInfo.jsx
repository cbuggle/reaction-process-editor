const WaitInfo = ({ activity }) => {
	return activity.workup.duration ? "" : "Duration undefined"
}

export default WaitInfo
