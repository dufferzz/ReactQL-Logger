import React, { useState } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../components/Loading/Loading";
import { useHistory } from "react-router-dom";

import DataTable, { createTheme } from "react-data-table-component";

createTheme("inherit", {
	background: {
		default: "inherit",
	},
});

const PartsTable = ({ data }: any) => {
	const history = useHistory();
	const handleRowClick = (id: string) => {
		history.push(`/part/${id}`);
	};
	const customStyles = {
		headRow: {
			style: {
				// backgroundColor: "rgba(0,0,0,0.5)",

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

	const columns = React.useMemo(
		() => [
			{
				name: "Image",
				selector: "thumbnail",
				width: "75px",
				cell: (row: any) => (
					<div style={{ width: "50px" }} data-tag="allowRowEvents">
						<img
							src={row.thumbnail}
							alt={row.productName}
							style={{ width: "50px" }}
						/>
					</div>
				),
			},
			{
				name: "Name",
				selector: "partName",
				sortable: true,

				maxWidth: "50vw",
				cell: (row: any) => (
					<div style={{ lineBreak: "anywhere" }} data-tag="allowRowEvents">
						{row.partName}
					</div>
				),
			},
			{
				name: "Part Number",

				selector: "partNumber",
				sortable: true,
				maxWidth: "250px",
			},
			{
				name: "Price",
				selector: "price",
				sortable: true,
				hide: 768,

				maxWidth: "100px",
			},
			{
				name: "Supplier",
				selector: "supplier",
				sortable: true,
				hide: 1024,
			},
			{
				name: "Location",
				maxWidth: "90px",
				hide: 580,

				center: true,
				selector: "Location",
				sortable: true,
			},
		],
		[]
	);

	return (
		<div>
			{data && (
				<DataTable
					pointerOnHover
					style={{ maxWidth: "98%" }}
					noHeader
					striped
					columns={columns}
					responsive={false}
					theme="inherit"
					customStyles={customStyles}
					data={data.parts}
					dense
					onRowClicked={(e) => {
						handleRowClick(e._id);
					}}
				/>
			)}
		</div>
	);
};

export default withAuthenticationRequired(PartsTable, {
	onRedirecting: () => <Loading />,
});
