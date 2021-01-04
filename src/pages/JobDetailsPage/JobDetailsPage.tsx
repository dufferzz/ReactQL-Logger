import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import Loading from "../../components/Loading/Loading";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import JobDetailsForm from "../../components/FormComponents/Jobs/JobDetailsForm/JobDetailsForm";

const JobDetails = () => {
	const { id } = useParams<ID>();
	const queryParams = { id };
	const { loading, error, data } = useQuery(genQuery(queryParams), {
		errorPolicy: "all",
	});

	if (loading) return <Loading />;
	if (error)
		return (
			<div style={{ width: "100%", textAlign: "center" }}>
				<ErrorComponent error={error} />
			</div>
		);

	console.log(data.getJob);
	return (
		<div>
			<h2 style={{ textAlign: "center", width: "100%" }}>Job Details: {id}</h2>
			<JobDetailsForm job={data.getJob} />
		</div>
	);
};

const genQuery = ({ id }: ID) => gql`
query GetJob{
    getJob (_id: "${id}") {
        _id
        firstname
        lastname
        email
        city
        district
        postcode
        todo
        done
		parts{
			partName
			partNumber
			partQty
			partPrice
		}
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

export default withAuthenticationRequired(JobDetails, {
	onRedirecting: () => <Loading />,
});
