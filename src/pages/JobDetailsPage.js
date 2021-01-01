import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import Loading from "../components/Loading";
import JobDetailsForm from "../components/JobDetailsForm";

const JobDetails = () => {
	const { id } = useParams();
	const queryParams = { id };
	const { loading, error, data } = useQuery(genQuery(queryParams), {
		errorPolicy: "all",
	});

	if (loading) return <Loading />;
	if (error) {
		console.error(error);
		return <p>Error :( {JSON.stringify(error)}</p>;
	}
	console.log(data);
	return (
		<div>
			<h2 style={{ textAlign: "center", width: "100%" }}>Job Details: {id}</h2>
			<JobDetailsForm data={data?.getJob} />
		</div>
	);
};

const genQuery = ({ id }) => gql`
query {
    getJob (_id: "${id}") {
        _id
        firstname
        lastname
        email
        city
        district
        postcode
        date
        todo
        done
        status
        created
		make
		model
		year
		serial
		assigned
		labourHours
    }
}
`;

export default JobDetails;
