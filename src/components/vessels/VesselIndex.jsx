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
      headerName: "",
      cellRenderer: (params) => {
        return <Button onClick={onSelectVessel(params.value)}>Assign</Button>;
      },
    },
    {
      field: "name",
      headerName: "Name",
      filter: true,
    },
    {
      field: "type",
      headerName: "Type",
      filter: true,
    },
    {
      field: "material",
      headerName: "Material",
      filter: true,
    },
    {
      field: "volume",
      headerName: "Volume",
      filter: true,
    },
    {
      field: "template",
      headerName: "Template",
      width: 300,
      suppressSizeToFit: true,
      filter: true,
    },
    {
      field: "bar_code",
      headerName: "Bar Code",
      filter: true,
    },
  ]);

  return (
    <>
      <div className="ag-theme-kit">
        <AgGridReact
          suppressMenuHide={true}
          domLayout="autoHeight"
          rowData={VesselDecorator.vesselTabularData(vessels)}
          columnDefs={colDefs}
          autoSizeStrategy={{ type: "fitCellContents" }}
        />
      </div>
    </>
  );
};

export default VesselIndex;
