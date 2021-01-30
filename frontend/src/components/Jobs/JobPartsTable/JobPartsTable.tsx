import React from "react";
import Table from "../../DataTable/DataTable";
import iconError from "../../../assets/icons/error.svg";

const RemovePartIcon = (props: any) => {
	return (
		<img
			onClick={() => {
				handleRemovePart(props.part);
			}}
			style={{
				cursor: "pointer",
				filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))",
				zIndex: 100000,
				width: "30px",
			}}
			alt="Remove Part"
			src={iconError}
		/>
	);
};
const handleRemovePart = (part: any) => {
	console.log("Remove part:", part.partNumber, part.partQty);
};

const columns = [
	{
		name: "",
		selector: "",

		width: "40px",
		cell: (row: any) => (
			<div style={{}} data-tag="allowRowEvents">
				<RemovePartIcon part={row} />
			</div>
		),
	},
	{
		name: "Part Name",
		selector: "partName",

		cell: (row: any) => <div data-tag="allowRowEvents">{row.partName}</div>,
	},
	{
		name: "Part Number",
		selector: "partNumber",
		maxWidth: "200px",

		sortable: true,
		hide: 580,

		cell: (row: any) => <div data-tag="allowRowEvents">{row.partNumber}</div>,
	},
	{
		name: "Qty",
		selector: "partQty",
		maxWidth: "100px",
		sortable: true,

		cell: (row: any) => <div data-tag="allowRowEvents">{row.partQty}</div>,
	},

	{
		name: "Price",
		selector: "price",
		maxWidth: "100px",
		sortable: true,

		cell: (row: any) => <div data-tag="allowRowEvents">{row.price},-</div>,
	},
];

const JobPartsTable = ({ data }: any) => {
	console.log(data);
	return (
		<Table
			columns={columns}
			data={data}
			onRowClicked={(e: any) => {
				console.log(e);
				// history.push(`/job/${e._id}`);
			}}
		/>
	);
};

export default React.memo(JobPartsTable);
