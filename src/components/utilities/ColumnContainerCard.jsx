import React from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';

const ColumnContainerCard = ({ title, minWidth, children }) => {
    const styles = {
        cardStyle: {
            minWidth: minWidth+'px',
        }
    }
    return (
        <Card style={styles.cardStyle}>
            <CardHeader>
                <h3>{title}</h3>
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    )
}

export default ColumnContainerCard
