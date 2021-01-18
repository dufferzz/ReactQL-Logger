import React, { useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";

createTheme("inherit", {
	background: {
		default: "inherit",
	},
});

const TableStyle = {
	headRow: {
		style: {
			fontSize: "1.2rem",
		},
	},
	headCells: {
		style: {
			fontWeight: 500,
			fontSize: "1.1rem",
		},
	},
	rows: {
		style: {
			fontSize: "1rem",
			lineHeight: "2",
			"&:hover": {
				backgroundColor: "rgba(0,0,0,0.1)",
			},
		},
	},
};

const Table = ({ data, columns, onRowClicked, subscribeToNew }: any) => {
	useEffect(() => {
		if (subscribeToNew !== undefined) subscribeToNew();
	}, [subscribeToNew]);

	return (
		<DataTable
			pointerOnHover
			noHeader
			striped
			columns={columns}
			responsive={false}
			theme="inherit"
			customStyles={TableStyle}
			data={data}
			dense
			onRowClicked={onRowClicked}
			// subscribeToNew={subscribeToNew}
		/>
	);
};

export default Table;
