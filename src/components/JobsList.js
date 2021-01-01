import React from "react";
import { useQuery, gql } from "@apollo/client";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";

const JobsList = () => {
	const { loading, error, data } = useQuery(QUERY);

	const history = useHistory();
	const handleRowClick = (row) => {
		history.push(`/job/${row}`);
	};

	if (loading)
		return (
			<tr>
				<td colSpan="4"> Loading... </td>
			</tr>
		);
	if (error)
		return (
			<tr>
				<td colSpan="4">Error :( {JSON.stringify(error)} </td>
			</tr>
		);

	return data.jobs.map((job, i) => {
		return (
			<tr
				style={{ cursor: "pointer", padding: "0 0.25rem" }}
				onClick={() => handleRowClick(job._id)}
				key={job._id}
			>
				<td>{job.status}</td>
				<td>{job._id}</td>
				<td>
					{job.firstname} {job.lastname}
				</td>
				<td>{dayjs(job.date).format("DD-MM-YY")}</td>
			</tr>
		);
	});
};

const QUERY = gql`
	query {
		jobs {
			firstname
			lastname
			created
			status
			_id
		}
	}
`;

export default JobsList;
