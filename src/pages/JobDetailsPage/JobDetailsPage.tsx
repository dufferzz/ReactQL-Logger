import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import PageHeading from "../../components/StyledComponents/PageHeading";
import CenterDiv from "../../components/StyledComponents/CenteredDiv";
import Loading from "../../components/Loading/Loading";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import JobDetailsForm from "../../components/FormComponents/Jobs/JobDetailsForm/JobDetailsForm";

import GET_JOB_QUERY from "../../querys/jobs/JobDetailsQuery";

const JobDetails = () => {
	const { id } = useParams<ID>();
	const { loading, error, data } = useQuery(GET_JOB_QUERY, {
		variables: { _id: id },
		errorPolicy: "all",
	});

	if (loading) return <Loading />;
	if (error)
		return (
			<CenterDiv>
				<ErrorComponent error={error} />
			</CenterDiv>
		);

	console.log(data.getJob);
	return (
		<CenterDiv>
			<PageHeading>Job Details: {id}</PageHeading>
			<JobDetailsForm job={data.getJob} />
		</CenterDiv>
	);
};

export default withAuthenticationRequired(JobDetails, {
	onRedirecting: () => <Loading />,
});
