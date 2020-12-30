import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import JobDetailsForm from "../components/JobDetailsForm";

const JobDetails = () => {
	const { id } = useParams();
	const query = gql`query {
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
        }
    }
    `;
	const { loading, error, data } = useQuery(query);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :( {JSON.stringify(error)}</p>;

	return (
		<div>
			<JobDetailsForm data={data?.getJob} />
		</div>
	);
};

export default JobDetails;
