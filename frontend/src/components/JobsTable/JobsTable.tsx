import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import StatusImage from "../StyledComponents/StatusImage";

interface JobPropType {
	job: Job;
}

const JobsTableRow = ({ job }: JobPropType) => {
	const history = useHistory();

	const handleRowClick = (id: string) => {
		history.push(`/job/${id}`);
	};

	return (
		<tr
			style={{ cursor: "pointer", padding: "0 0.25rem" }}
			onClick={() => handleRowClick(job._id)}
			title={`To Do: \n ${job.todo}`}
		>
			<td width="55px">
				<StatusImage status={job.status} />
			</td>
			<td className="hide-sm">{job._id}</td>
			<td className="hide-md" style={{ padding: "0.2rem 1rem" }}>
				{job.make === "" && job.model === "" && (
					<span
						style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "2" }}
					>
						Unknown
						<br />
					</span>
				)}
				{(job.make !== "" || job.model !== "") && (
					<>
						<span
							style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "2" }}
						>
							{job.make} {job.model}
						</span>
						<br />
					</>
				)}
				{job.todo &&
					job.todo.length >= 100 &&
					job.todo.substring(0, 100) + " [...]"}
				{job.todo && job.todo.length < 100 && job.todo}
			</td>
			<td>
				{job.firstname} {job.lastname}
			</td>

			<td>
				{dayjs(job.created).format("DD-MM-YY")}
				<br />
				{dayjs(job.created).format("HH:mm")}
			</td>
		</tr>
	);
};

const JobsTable = ({ jobs, subscribeToNewJobs, playAlert }: any) => {
	useEffect(() => {
		if (subscribeToNewJobs !== undefined) subscribeToNewJobs();
	}, [subscribeToNewJobs]);

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
						<td width="50px">
							<span className="hide-sm">Status</span>
						</td>
						<td className="hide-sm">Job ID</td>
						<td className="hide-md">Description</td>
						<td>Client</td>
						<td width="90px">Created</td>
					</tr>
				</thead>
				<tbody>
					{jobs &&
						jobs.jobs.map((job: Job) => (
							<JobsTableRow key={job._id} job={job} />
						))}
				</tbody>
			</table>
		</>
	);
};

export default JobsTable;
