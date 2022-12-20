import React, {useState} from 'react';
import ColumnContainerCard from "../utilities/ColumnContainerCard";
import CreateButton from "../utilities/CreateButton";
import ActionCard from "../actions/ActionCard";

const StepColumCard = ({index, amount, stepName, children}) => {
    const [actions, setActions] = useState([])

    const createAction = () => {
        setActions([...actions, {id:String(actions.length + 1)}])
    }
    const title = (index + 1) + ' / ' + amount + ' ' + stepName
    return (
        <ColumnContainerCard title={title} minWidth='548'>
            {actions.map(prep => (
                <ActionCard key={prep.id}>{prep.id}</ActionCard>
            ))}
            <CreateButton label='New Action' type='action' onClick={createAction}/>
        </ColumnContainerCard>
    );
};

export default StepColumCard;
