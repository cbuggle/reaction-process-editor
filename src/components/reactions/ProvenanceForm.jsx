import React, { useState } from 'react'

import { Form, Button, FormGroup, Label, Input } from 'reactstrap'

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher'

import DateTimePicker from 'react-datetime-picker'

const ProvenanceForm = ({ provenance, handleCancel, handleSave }) => {

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
    api.updateProvenance(provenanceForm).then(() => {
      handleSave()
    })
  }

  return (
    <Form>
      <FormGroup>
        <Label>Reaction starts at</Label>
        <br />
        <DateTimePicker
          onChange={value => updateStartsAt(value)}
          format={dateTimePickerFormat}
          value={provenanceForm.starts_at}
        />
        <br />
        <Label>Reaction Name</Label>
        <Input
          value={provenanceForm.name}
          placeholder="Reaction Name"
          onChange={event => onInputChange({ name: 'name', value: event.target.value })}
        />

        <Label>Conducted by (Username)</Label>
        <Input
          value={provenanceForm.username}
          placeholder="Conducted by"
          onChange={event => onInputChange({ name: 'username', value: event.target.value })}
          disabled={true}
        />

        <Label>Conducted by (Email)</Label>
        <Input
          value={provenanceForm.email}
          placeholder="Email"
          onChange={event => onInputChange({ name: 'email', value: event.target.value })}
          disabled={true}
        />

        <Label>Place (City)</Label>
        <Input
          value={provenanceForm.city}
          placeholder="Place (City)"
          onChange={event => onInputChange({ name: 'city', value: event.target.value })}
        />

        <Label>DOI</Label>
        <Input
          value={provenanceForm.doi}
          placeholder="DOI"
          onChange={event => onInputChange({ name: 'doi', value: event.target.value })}
        />

        <Label>Patent</Label>
        <Input
          value={provenanceForm.patent}
          placeholder="Patent"
          onChange={event => onInputChange({ name: 'patent', value: event.target.value })}
        />

        <Label>Publication URL</Label>
        <Input
          value={provenanceForm.publication_url}
          placeholder="Publication URL"
          onChange={event => onInputChange({ name: 'publication_url', value: event.target.value })}
        />

        <Label>Orcid</Label>
        <Input
          value={provenanceForm.orcid}
          placeholder="Orcid"
          onChange={event => onInputChange({ name: 'orcid', value: event.target.value })}
        />

        <Label>Organisation</Label>
        <Input
          value={provenanceForm.organization}
          placeholder="Organisation"
          onChange={event => onInputChange({ name: 'organization', value: event.target.value })}
        />
      </FormGroup>
      <Button color="secondary" onClick={handleCancel}>Cancel</Button>
      <Button color="success" className="float-end" onClick={onSave}>Save</Button>
    </Form >
  )
}

export default ProvenanceForm
