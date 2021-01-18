import React from "react";

import dayjs from "dayjs";
import StatusImage from "../_StyledComponents/StatusImage";
import Table from "../DataTable/DataTable";
import { useHistory } from "react-router-dom";

const columns = [
	{
		name: "",
		selector: "status",
		width: "50px",
		cell: (row: any) => (
			<div style={{ width: "50px" }} data-tag="allowRowEvents">
				<StatusImage status={row.status} />
			</div>
		),
	},
	{
		name: "ID",
		selector: "_id",
		maxWidth: "250px",
		hide: 768,
		sortable: true,
		cell: (row: any) => (
			<div style={{ lineBreak: "anywhere" }} data-tag="allowRowEvents">
				{row._id}
			</div>
		),
	},
	{
		name: "Description",

		selector: "todo",
		cell: (row: any) => (
			<div
				style={{ textAlign: "center", width: "100%" }}
				data-tag="allowRowEvents"
			>
				{row.make === "" && row.model === "" && (
					<span
						style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "2" }}
					>
						Unknown
						<br />
					</span>
				)}
				{(row.make !== "" || row.model !== "") && (
					<>
						<span
							style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "2" }}
						>
							{row.make} {row.model}
						</span>
						<br />
					</>
				)}
				{row.todo &&
					row.todo.length >= 100 &&
					row.todo.substring(0, 100) + "..."}
				{row.todo && row.todo.length < 100 && row.todo}
			</div>
		),
	},
	{
		name: "Client",
		selector: "firstname",
		maxWidth: "150px",
		sortable: true,
		hide: 580,

		cell: (row: any) => (
			<div data-tag="allowRowEvents">
				{row.firstname} {row.lastname}
			</div>
		),
	},
	{
		name: "Make",
		selector: "make",
		maxWidth: "100px",
		sortable: true,
		hide: 1200,

		cell: (row: any) => <div data-tag="allowRowEvents">{row.make}</div>,
	},
	{
		name: "Model",
		selector: "model",
		maxWidth: "100px",
		hide: 1300,
		sortable: true,

		cell: (row: any) => <div data-tag="allowRowEvents">{row.model}</div>,
	},
	{
		name: "Date",
		sortable: true,

		width: "110px",
		selector: "created",
		cell: (row: any) => (
			<div style={{ textAlign: "center" }} data-tag="allowRowEvents">
				<span style={{ fontSize: "1.1rem" }}>
					{dayjs(row.created).format("DD MMM YY")}
				</span>
				<br />
				{dayjs(row.created).format("HH:mm")}
			</div>
		),
	},
];

const JobsTable = ({ data, subscribeToMore, subQuery, result }: any) => {
	const history = useHistory();

	return (
		<Table
			columns={columns}
			data={data}
			onRowClicked={(e: any) => {
				history.push(`/job/${e._id}`);
			}}
			{...result}
			subscribeToNew={() => {
				if (subscribeToMore !== undefined)
					subscribeToMore({
						document: subQuery,
						updateQuery: (currentData: any, { subscriptionData }: any) => {
							if (!subscriptionData.data) {
								return currentData;
							}
							const newJobItem = subscriptionData.data.jobAdded;
							return Object.assign({}, currentData, {
								jobs: [newJobItem, ...currentData.jobs],
							});
						},
					});
			}}
		/>
	);
};

export default JobsTable;
