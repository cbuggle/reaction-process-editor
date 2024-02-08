import React, { useContext, useState } from "react";

import VesselDecorator from "../../decorators/VesselDecorator";
import { Button } from "reactstrap";
import { VesselOptions } from "../../contexts/VesselOptions";
import { AgGridReact } from "ag-grid-react";

const VesselIndex = ({ onSelectVessel, typeColor }) => {
  const vessels = useContext(VesselOptions);
  const [colDefs] = useState([
    {
      field: "id",
      headerName: "",
      cellRenderer: (params) => {
        return (
          <Button
            onClick={onSelectVessel(params.value)}
            color={typeColor}
            size="sm"
          >
            Assign
          </Button>
        );
      },
      maxWidth: 85,
    },
    {
      field: "name",
      headerName: "Name",
      filter: true,
      flex: 4,
    },
    {
      field: "type",
      headerName: "Type",
      filter: true,
      flex: 3,
      maxWidth: 300,
    },
    {
      field: "material",
      headerName: "Material",
      filter: true,
      flex: 2,
      maxWidth: 200,
    },
    {
      field: "volume",
      headerName: "Vol.",
      filter: true,
      maxWidth: 105,
      comparator: (valueA, valueB) => parseFloat(valueA) - parseFloat(valueB)
    },
    {
      field: "template",
      headerName: "Template",
      suppressSizeToFit: true,
      filter: true,
      flex: 4,
    },
    {
      field: "bar_code",
      headerName: "Bar Code",
      filter: true,
      flex: 2,
      maxWidth: 180,
    },
  ]);

  return (
    <>
      <div className={"ag-theme-kit ag-theme-kit--" + typeColor}>
        <AgGridReact
          suppressMenuHide={true}
          domLayout="autoHeight"
          rowData={VesselDecorator.vesselTabularData(vessels)}
          columnDefs={colDefs}
          autoSizeStrategy={{ type: "fitGridWidth", defaultMinWidth: 70 }}
        />
      </div>
    </>
  );
};

export default VesselIndex;
