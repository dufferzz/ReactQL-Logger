import React from "react";
import { useQuery, gql } from "@apollo/client";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import iconNew from "../assets/icons/new.svg";
import iconSpanner from "../assets/icons/spanner.svg";
import iconPackage from "../assets/icons/package.svg";
import iconError from "../assets/icons/error.svg";
import iconCash from "../assets/icons/cash.svg";
import iconClock from "../assets/icons/clock.svg";
import iconSuccess from "../assets/icons/success.svg";

const StatusImage = ({ status }) => {
	let image = null;
	switch (status) {
		case "not-started":
			image = iconNew;
			break;
		case "in-progress":
			image = iconSpanner;
			break;
		case "await":
			image = iconPackage;
			break;
		case "completed":
			image = iconSuccess;
			break;
		case "fuck":
			image = iconError;
			break;
		default:
			break;
	}
	if (image != null)
		return (
			<img
				style={{
					width: "30px",
					filter: "drop-shadow( 2px 2px 2px rgba(0, 0, 0, 0.3))",
				}}
				alt=""
				src={image}
			></img>
		);
	return <></>;
};

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

	return data.jobs.map((job, i) => (
		<tr
			style={{ cursor: "pointer", padding: "0 0.25rem" }}
			onClick={() => handleRowClick(job._id)}
			key={job._id}
		>
			<td width="55px">
				<StatusImage status={job.status} />
			</td>
			<td>{job._id}</td>
			<td>
				{job.firstname} {job.lastname}
			</td>
			<td>{dayjs(job.date).format("DD-MM-YY")}</td>
		</tr>
	));
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
