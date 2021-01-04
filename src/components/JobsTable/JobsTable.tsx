import React from "react";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import StatusImage from "../StyledComponents/StatusImage";

const JobsTableRow = ({ job }: JobPropType) => {
	const history = useHistory();

	const handleRowClick = (id: string) => {
		history.push(`/job/${id}`);
	};

	return (
		<tr
			style={{ cursor: "pointer", padding: "0 0.25rem" }}
			onClick={() => handleRowClick(job._id)}
		>
			<td width="55px">
				<StatusImage status={job.status} />
			</td>
			<td>{job._id}</td>
			<td>
				{job.firstname} {job.lastname}
			</td>
			<td>{dayjs(job.created).format("DD/MM/YYYY")}</td>
		</tr>
	);
};

const JobsTable = ({ jobs }: any) => {
	return (
		<>
			<table
				style={{
					width: "100%",
					textAlign: "center",
				}}
			>
				<thead>
					<tr style={{ fontSize: "1.1rem" }}>
						<td>Status</td>
						<td>ID</td>
						<td>Client</td>
						<td>Created</td>
					</tr>
				</thead>
				<tbody>
					{jobs &&
						jobs.map((job: Job) => <JobsTableRow key={job._id} job={job} />)}
				</tbody>
			</table>
		</>
	);
};

export default JobsTable;
