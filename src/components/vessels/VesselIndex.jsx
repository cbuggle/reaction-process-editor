import React, { useContext, useState } from "react";

import VesselDecorator from "../../decorators/VesselDecorator";
import { Button } from "reactstrap";
import { VesselOptions } from "../../contexts/VesselOptions";
import { AgGridReact } from "ag-grid-react";

const VesselIndex = ({ onSelectVessel }) => {
  const vessels = useContext(VesselOptions);
  const [colDefs, setColDefs] = useState([
    {
      field: "id",
      cellRenderer: (params) => {
        return <Button onClick={onSelectVessel(params.value)}>Assign</Button>;
      },
    },
    { field: "name", headerName: "Name" },
    { field: "bar_code", headerName: "Bar Code" },
    { field: "template", headerName: "Template" },
    { field: "type", headerName: "Type" },
    { field: "material", headerName: "Material" },
    { field: "volume", headerName: "Volume" },
  ]);

  return (
    <>
      <div className="ag-theme-quartz">
        <AgGridReact
          domLayout="autoHeight"
          rowData={VesselDecorator.vesselTabularData(vessels)}
          columnDefs={colDefs}
        />
      </div>
    </>
  );
};

export default VesselIndex;
