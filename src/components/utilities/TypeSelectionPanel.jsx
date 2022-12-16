import React from 'react';
import {Button, ButtonGroup} from "reactstrap";

const TypeSelectionPanel = ({clusters}) => {
    const styles = {
        typeSelectionPanel: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            height: '360px'
        }
    }

    return (
        <div style={styles.typeSelectionPanel}>
            {clusters.map((cluster, cIndex) => (
                <div key={cluster.id + cIndex} className='type-selection__cluster'>
                    <h4>{cluster.label}</h4>
                    <ButtonGroup vertical>
                        {cluster.types.map((type, tIndex) => (
                            <Button key={type.id + tIndex}>
                                {type.createLabel}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
            ))}
        </div>
    );
};

export default TypeSelectionPanel;
