import React, { useState } from 'react'

import { Form, FormGroup, Label, Input } from 'reactstrap'

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher'

import DateTimePicker from 'react-datetime-picker'
import FormButtons from "../utilities/FormButtons";
import SingleLineFormGroup from "../utilities/SingleLineFormGroup";
import MultiInputFormGroup from "../utilities/MultiInputFormGroup";

const ProvenanceForm = ({ provenance, closeForm }) => {

  const api = useReactionsFetcher();

  const dateTimePickerFormat = "dd.MM.y HH:mm:ss"

  const [provenanceForm, updateProvenanceForm] = useState({
    reaction_process_id: provenance.reaction_process_id,
    starts_at: new Date(provenance.starts_at),
    name: provenance.name,
    city: provenance.city,
    doi: provenance.doi,
    patent: provenance.patent,
    publication_url: provenance.publication_url,
    username: provenance.username,
    orcid: provenance.orcid,
    organization: provenance.organization,
    email: provenance.email
  })

  const onInputChange = (field) => {
    const { name, value } = field;
    updateProvenanceForm(prevState => ({
      ...prevState, [name]: value
    }));
  }

  const updateStartsAt = (value) => {
    onInputChange({ name: 'starts_at', 'value': value })
  }

  const onSave = () => {
    api.updateProvenance(provenanceForm)
    closeForm()
  }

  return (
    <Form>
      <SingleLineFormGroup label='Reaction starts at'>
        <DateTimePicker
          onChange={value => updateStartsAt(value)}
          format={dateTimePickerFormat}
          value={provenanceForm.starts_at}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Reaction Name'>
        <Input
          value={provenanceForm.name}
          placeholder="Reaction Name"
          onChange={event => onInputChange({ name: 'name', value: event.target.value })}
        />
      </SingleLineFormGroup>
      <MultiInputFormGroup label='Conducted by' type='primary'>
        <SingleLineFormGroup label='Username'>
          <Input
            value={provenanceForm.username}
            placeholder="Conducted by"
            onChange={event => onInputChange({ name: 'username', value: event.target.value })}
            disabled={true}
          />
        </SingleLineFormGroup>
        <SingleLineFormGroup label='Email'>
          <Input
            value={provenanceForm.email}
            placeholder="Email"
            onChange={event => onInputChange({ name: 'email', value: event.target.value })}
            disabled={true}
          />
        </SingleLineFormGroup>
      </MultiInputFormGroup>
      <SingleLineFormGroup label='Place (City)'>
        <Input
          value={provenanceForm.city}
          placeholder="Place (City)"
          onChange={event => onInputChange({ name: 'city', value: event.target.value })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='DOI'>
        <Input
          value={provenanceForm.doi}
          placeholder="DOI"
          onChange={event => onInputChange({ name: 'doi', value: event.target.value })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Patent'>
        <Input
          value={provenanceForm.patent}
          placeholder="Patent"
          onChange={event => onInputChange({ name: 'patent', value: event.target.value })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Publication URL'>
        <Input
          value={provenanceForm.publication_url}
          placeholder="Publication URL"
          onChange={event => onInputChange({ name: 'publication_url', value: event.target.value })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Orcid'>
        <Input
          value={provenanceForm.orcid}
          placeholder="Orcid"
          onChange={event => onInputChange({ name: 'orcid', value: event.target.value })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Organisation'>
        <Input
          value={provenanceForm.organization}
          placeholder="Organisation"
          onChange={event => onInputChange({ name: 'organization', value: event.target.value })}
        />
      </SingleLineFormGroup>
      <FormButtons onSave={onSave} onCancel={closeForm} type='primary' />
    </Form >
  )
}

export default ProvenanceForm
