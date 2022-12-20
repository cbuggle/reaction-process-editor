import React from 'react';
import { useState } from 'react';
import ColumnContainerCard from "../utilities/ColumnContainerCard";
import CreateButton from "../utilities/CreateButton";
import PreparationCard from "./PreparationCard";
import {Card} from "reactstrap";

const PreparationColumnCard = () => {
    const [preparations, setPreparations] = useState([])

    const createPreparation = () => {
        setPreparations([...preparations, {id:String(preparations.length + 1)}])
    }

    return (
        <ColumnContainerCard title='Preparations' minWidth='424'>
            {preparations.map(prep => (
                <PreparationCard key={prep.id}>{prep.id}</PreparationCard>
            ))}
            <CreateButton label='New Preparation' type='preparation' onClick={createPreparation}/>
        </ColumnContainerCard>
    )
}

export default PreparationColumnCard
