import React, { useState } from "react";
import { AgGridReact} from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ICols } from "../helpers/ArrayOfFilters";

interface IProps {
    rows:[],
    cols:[],
    loading:boolean,
    filteredRows?:[]
}

const Grid = ({cols, rows, loading, filteredRows}: IProps) => {
    const [rowData, setRowData] = useState<any[]>([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState<any[]>([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ]);

    return (
        <div
            className="ag-theme-quartz" // applying the grid theme
            style={{ height: 500 }} // the grid will fill the size of the parent container
        >
            <AgGridReact
                columnDefs={cols}
                rowData={ filteredRows && filteredRows.length ? filteredRows : rows}
            />
        </div>
    )
}

export default React.memo(Grid);