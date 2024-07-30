import React, { useContext } from "react";
import Select, { components } from "react-select";

import OptionsDecorator from "../../decorators/OptionsDecorator";
import SamplesDecorator from "../../decorators/SamplesDecorator";

import { SelectOptions } from "../../contexts/SelectOptions";

const SamplesIconSelect = ({ samples, isMulti, onChange }) => {

	const { Option } = components;
	const selectOptions = useContext(SelectOptions);

	const IconOption = (props) => {
		let sample = OptionsDecorator.optionForKey(props.value, props.options)
		return (
			<Option {...props}>
				<div className="flex items-center gap-2">
					{SamplesDecorator.sampleSvgImg(sample)}
					<span>{sample.label}</span>
				</div>
			</Option>
		);
	}

	const IconSingleValue = ({ children, ...props }) => {
		return (
			<div className="items-center gap-2">
				<components.SingleValue {...props}>
					{SamplesDecorator.sampleSvgImg(props.data)}
					{children}
				</components.SingleValue >
			</div>
		)
	};

	const IconMultiValue = ({ children, ...props }) => {
		return (
			<components.MultiValue {...props} className="">
				{SamplesDecorator.sampleSvgImg(props.data)}
				{children}
			</components.MultiValue >
		)
	};

	return (
		<Select
			isMulti={isMulti}
			className="react-select--overwrite sample-selection__select"
			classNamePrefix="react-select"
			name="select_samples"
			renderIcon={SamplesDecorator.sampleSvgImg}
			options={selectOptions.materials['SAMPLE']}
			value={samples}
			onChange={onChange}
			components={{ Option: IconOption, SingleValue: IconSingleValue, MultiValue: IconMultiValue }}
		/>
	)
}

export default SamplesIconSelect
