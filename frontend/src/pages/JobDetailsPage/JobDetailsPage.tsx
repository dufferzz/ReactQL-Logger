import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useSubscription } from "@apollo/client";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import dayjs from "dayjs";
import PageHeading from "../../components/StyledComponents/PageHeading";

import CenterDiv from "../../components/StyledComponents/CenteredDiv";
import Loading from "../../components/Loading/Loading";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import JobDetailsForm from "../../components/FormComponents/Jobs/JobDetailsForm/JobDetailsForm";
import FlexDivCenter from "../../components/StyledComponents/FlexDiv";

import JOB_ID_UPDATED_SUBSCRIPTION from "../../querys/jobs/JobIDUpdatedSubscription";
import JOB_ID_DELETED_SUBSCRIPTION from "../../querys/jobs/JobIDDeletedSubscription";
import GET_JOB_QUERY from "../../querys/jobs/JobDetailsQuery";

const MySwal = withReactContent(Swal);

const DeleteModal = ({ id }: any) => {
	const { data } = useSubscription(JOB_ID_DELETED_SUBSCRIPTION, {
		variables: id,
	});
	if (data) {
		console.log(data);
		MySwal.fire({
			title: <p>Job Deleted!</p>,
			icon: "warning",
			text: `Job has been deleted!`,
		});
	}

	return <></>;
};

const UpdateModal = ({ id }: any) => {
	const { data } = useSubscription(JOB_ID_UPDATED_SUBSCRIPTION, {
		variables: id,
	});
	if (data) {
		console.log(data);
		MySwal.fire({
			title: <p>Job Updated!</p>,
			icon: "info",
			text: `Job has been updated!`,
		});
	}
	return <></>;
};

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
			<UpdateModal id={id} />
			<DeleteModal id={id} />
			<JobDetailsForm job={data.getJob} />
			<FlexDivCenter>
				Last Modified:
				{dayjs(data.getJob.modified).format("DD/MM/YYYY - HH:mm:ss")}
			</FlexDivCenter>
		</CenterDiv>
	);
};

export default withAuthenticationRequired(JobDetails, {
	onRedirecting: () => <Loading />,
});
