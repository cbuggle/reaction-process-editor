import React from 'react';
import {Card, CardBody, CardHeader} from "reactstrap";
import TypeSelectionPanel from "../utilities/TypeSelectionPanel";

const actionTypeClusters = [
    {
        id: 'add',
        label: 'Add',
        types: [
            {
                id: 'add_sample',
                createLabel: 'Sample'
            },
            {
                id: 'add_solvent',
                createLabel: 'Solvent'
            },
            {
                id: 'add_additive',
                createLabel: 'Additive'
            },
            {
                id: 'add_medium',
                createLabel: 'Medium'
            },
            {
                id: 'add_transfer',
                createLabel: 'Transfer'
            },
        ]
    },
    {
        id: 'time',
        label: 'Time',
        types: [
            {
                id: 'time_wait',
                createLabel: 'Wait'
            }
        ]
    },
    {
        id: 'remove_exchange',
        label: 'Remove / Exchange',
        types: [
            {
                id: 'remove_exchange_sample',
                createLabel: 'Sample'
            },
            {
                id: 'remove_exchange_solvent',
                createLabel: 'Solvent'
            },
            {
                id: 'remove_exchange_medium',
                createLabel: 'Medium'
            },
        ]
    }
]

const ActionCard = ({children}) => {
    return (
        <Card>
            <CardHeader>
                Action No. {children}
            </CardHeader>
            <CardBody>
                <TypeSelectionPanel clusters={actionTypeClusters} />
            </CardBody>
        </Card>
    );
};

export default ActionCard;
