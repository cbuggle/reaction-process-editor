import React, { useEffect, useState } from 'react'
import { FormGroup, Button, Row } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";

import IconButton from '../../../../utilities/IconButton';
import MetricsInput from '../../../../utilities/MetricsInput';
import OptionalFormSet from '../../../../utilities/OptionalFormSet';
import ActivityInfoDecorator from '../../../../../decorators/ActivityInfoDecorator';
import MetricsDecorator from '../../../../../decorators/MetricsDecorator';

const WavelengthListForm = (
  {
    wavelengths,
    onChange,
  }) => {

  const defaultPeak = MetricsDecorator.defaultAmount("WAVELENGTH")

  const [peaks, setPeaks] = useState(wavelengths?.peaks || [])
  const [isRange, setIsRange] = useState(!!wavelengths?.is_range);
  const [newPeak, setNewPeak] = useState({ value: undefined, unit: 'NM' })
  const [sortReverse, setSortReverse] = useState(false)

  useEffect(() => {
    resetForm()
    // eslint-disable-next-line
  }, [wavelengths])

  const handleSave = () => {
    onChange({
      is_range: isRange,
      peaks: isRange ? [peaks[0] || defaultPeak, peaks.at(-1) || defaultPeak] : sortedPeaks(peaks, sortReverse)
    })
  }
  const handleCancel = () => { resetForm() }

  const resetForm = () => {
    setIsRange(!!wavelengths?.is_range)
    setPeaks(wavelengths?.peaks || [])
  }

  const addPeak = () => { setPeaks(sortedPeaks(peaks.concat(newPeak), sortReverse)) }

  const handleChangePeak = (idx) => (value) => {
    let newPeaks = [...peaks]
    newPeaks[idx] = value
    setPeaks(newPeaks)
  }

  const sortedPeaks = (unsorted, reverse) => {
    let sorted = [...unsorted].sort((peak1, peak2) => peak1.value - peak2.value)
    reverse && sorted.reverse()

    return sorted
  }

  const sortPeaks = () => {
    setSortReverse(!sortReverse)
    // sortReserve() before calling sortedPeaks() does not manifest in state when calling sortedPeaks().
    // We need to pass !sortReverse as extra parameter. Thank you React state model.
    setPeaks(sortedPeaks(peaks, !sortReverse))
  }

  const deletePeak = (idx) => () => { setPeaks(peaks.toSpliced(idx, 1)) }

  const isInPeaks = (value) => peaks.find((peak) => peak.value === value.value)

  const renderAutomationToggle = () => {
    return (
      <FormGroup className="mb-2">
        <ButtonGroupToggle
          value={isRange}
          options={[{ value: false, label: 'Peaks' }, { value: true, label: 'Range' }]}
          onChange={setIsRange}
        />
      </FormGroup>
    )
  }

  const renderPeaksForm = () => {
    return (
      <>
        <Row className='gx-1 py-1 px-2 mx-0'>
          <div className='col-11 d-flex flex-column justify-content-end'>
            <MetricsInput
              label={"Add Peak "}
              metricName={'WAVELENGTH'}
              amount={newPeak}
              onChange={setNewPeak}
              displayMultiLine={false}
            />
          </div >
          <div className='d-flex flex-column justify-content-center'>
            <Button color='action' className='create-button' onClick={addPeak} size={'sm'} disabled={!newPeak.value || isInPeaks(newPeak)}>
              <FontAwesomeIcon icon={"plus"} />
              <span>Add Peak</span>
            </Button>
          </div>
        </Row>

        {
          peaks.map((peak, index) => {
            return (
              <Row className='gx-2 py-1 px-2 mx-0' key={'peak-' + index + ' + ' + peak.value}>
                <div className='col-11 d-flex flex-column justify-content-end'>
                  <MetricsInput
                    label={'Peak'}
                    metricName={'WAVELENGTH'}
                    amount={peak}
                    onChange={handleChangePeak(index)}
                  />
                </div>
                <div className='col-1 d-flex flex-column justify-content-center'>
                  <IconButton
                    positive={true}
                    icon='trash'
                    onClick={deletePeak(index)}
                  />
                </div>
              </Row>
            )
          })
        }
      </>
    )
  }

  const renderRangeForm = () => {
    let amount_start = peaks[0] || defaultPeak
    let amound_end = peaks.length > 1 ? peaks.at(-1) : newPeak
    return (
      <>
        <Row className='gx-2 py-1 px-2 mx-0' key={'peak-0'}>
          <div className='col-11'>
            <MetricsInput
              label={'Range min'}
              metricName={'WAVELENGTH'}
              amount={amount_start}
              max={amound_end.value - 1}
              onChange={handleChangePeak(0)}
            />
          </div>
          <div className='col-1 d-flex flex-column justify-content-center'>
          </div>
        </Row>
        <Row className='gx-2 py-1 px-2 mx-0' key={'peak-1'}>
          <div className='col-11'>
            <MetricsInput
              label={'Range max'}
              metricName={'WAVELENGTH'}
              amount={amound_end}
              min={amount_start.value + 1}
              onChange={handleChangePeak(1)}
            />
          </div>
          <div className='col-1 d-flex flex-column justify-content-center'>
          </div>
        </Row>
      </>
    )
  }

  const renderSortButton = () => {
    return (
      <OptionalFormSet.ExtraButton>
        <Button color="condition" onClick={sortPeaks} outline>
          <span className={"px-2"}>
            Sort
          </span>
          <FontAwesomeIcon icon={sortReverse ? "sort-down" : 'sort-up'} />
        </Button>
      </OptionalFormSet.ExtraButton>
    )
  }


  return (
    <OptionalFormSet
      subFormLabel="Wavelengths"
      valueSummary={ActivityInfoDecorator.wavelengthsInfo(wavelengths)}
      onSave={handleSave}
      onCancel={handleCancel}
      typeColor={'action'}
    >
      {renderAutomationToggle()}
      {isRange ? renderRangeForm() : renderPeaksForm()}

      {isRange || renderSortButton()}
    </OptionalFormSet>
  )
}

export default WavelengthListForm

