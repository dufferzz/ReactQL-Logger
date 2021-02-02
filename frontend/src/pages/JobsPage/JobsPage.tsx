import React, { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useSubscription } from "@apollo/client";
import { Link } from "react-router-dom";
import FlexDiv from "../../components/_StyledComponents/FlexDiv";

import CenterDiv from "../../components/_StyledComponents/CenteredDiv";

import Section from "../../components/_StyledComponents/Section";
import Button from "../../components/_StyledComponents/Button";
import Loading from "../../components/_SharedComponents/Loading/Loading";
import ErrorComponent from "../../components/_SharedComponents/ErrorComponent/ErrorComponent";
import ErrorBoundary from "../../components/_SharedComponents/ErrorBoundary/ErrorBoundary";
import { useHistory } from "react-router-dom";

import GET_ALL_JOBS_QUERY from "../../querys/jobs/GetAllJobsQuery";
import JOB_COUNT_QUERY from "../../querys/jobs/GetJobCount";
import ASSIGNED_JOB_COUNT_QUERY from "../../querys/jobs/GetAssignedJobCount";

import GET_ASSIGNED_JOBS_QUERY from "../../querys/jobs/GetAssignedJobsQuery";

import JOB_ADDED_SUBSCRIPTION from "../../querys/jobs/JobAddedSubscription";
import ANY_JOB_UPDATED_SUBSCRIPTION from "../../querys/jobs/AnyJobUpdatedSubscription";
import ANY_JOB_DELETED_SUBSCRIPTION from "../../querys/jobs/AnyJobDeletedSubscription";

import Table from "../../components/DataTable/DataTable";

import { columns } from "../../components/Jobs/JobsTable/JobsTable";

import UserIcon from "../../assets/icons/user.svg";
import ClipboardIcon from "../../assets/icons/clipboard.svg";

import ScannerButton from "../../components/_SharedComponents/Buttons/ScannerButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import {
	faStepBackward,
	faStepForward,
	faFastBackward,
} from "@fortawesome/free-solid-svg-icons";
import { couldStartTrivia } from "typescript";

const StyledIcon = styled(FontAwesomeIcon)`
	cursor: pointer;
	color: black;
`;

const AssignedJobs = ({ user }: any) => {
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(10);

	useSubscription(ANY_JOB_DELETED_SUBSCRIPTION, {
		shouldResubscribe: true,
	});

	useSubscription(ANY_JOB_UPDATED_SUBSCRIPTION, {
		shouldResubscribe: true,
	});

	const history = useHistory();

	const GoFirstPage = () => {
		setPage(1);
		refetch();
	};

	const GoUpPage = () => {
		setPage(page + 1);
		refetch();
	};

	const GoDownPage = () => {
		if (page === 1) return;
		setPage(page - 1);
		refetch();
	};

	const Count = () => {
		const { data } = useQuery(ASSIGNED_JOB_COUNT_QUERY, {
			fetchPolicy: "network-only",
			variables: { user: user.nickname },
		});
		console.log(data);
		return (
			<FlexDiv>
				Page {page} of {data && Math.ceil(data.countAssignedJobs.data / limit)}
			</FlexDiv>
		);
	};

	const {
		data,
		error,
		loading,
		refetch,
		subscribeToMore,
		...result
	} = useQuery(GET_ASSIGNED_JOBS_QUERY, {
		variables: { user: user.nickname, limit: limit, page: page },
		fetchPolicy: "cache-and-network",
	});

	return (
		<Section
			icon={UserIcon}
			title={`${user.nickname}'s Jobs`}
			style={{ padding: "0" }}
		>
			{loading && <Loading />}
			{error && <ErrorComponent error={error} />}
			{!loading && data && data.getAssignedJobs.success && subscribeToMore && (
				<ErrorBoundary>
					<Table
						columns={columns}
						data={data.getAssignedJobs.data}
						onRowClicked={(e: any) => {
							history.push(`/job/${e._id}`);
						}}
						{...result}
						subscribeToNew={() => {
							subscribeToMore({
								document: JOB_ADDED_SUBSCRIPTION,
								updateQuery: (currentData: any, { subscriptionData }: any) => {
									if (!subscriptionData.data) {
										return currentData.getAssignedJobs.data;
									}
									const newJobItem = subscriptionData.data.jobAdded.data;

									if (currentData.getAssignedJobs.data) {
										return Object.assign({}, currentData, {
											getAssignedJobs: [
												newJobItem,
												...currentData.getAssignedJobs.data,
											],
										});
									}
								},
							});
						}}
					/>
					<CenterDiv
						style={{
							display: "flex",
							justifyContent: "space-between",
							// margin: "0.5rem",
							paddingTop: "0.25rem",
						}}
					>
						<div>
							{page > 1 && (
								<>
									<Button onClick={GoFirstPage}>
										<StyledIcon icon={faFastBackward} />
									</Button>
									<Button onClick={GoDownPage}>
										<StyledIcon
											style={{ paddingRight: "0.5rem" }}
											icon={faStepBackward}
										/>
										Prev
									</Button>
								</>
							)}
						</div>
						<Count />
						<Button onClick={GoUpPage}>
							Next
							<StyledIcon
								style={{ paddingLeft: "0.5rem" }}
								icon={faStepForward}
							/>
						</Button>
					</CenterDiv>
				</ErrorBoundary>
			)}
			{data && !data.getAssignedJobs.success && (
				<ErrorComponent error={data.getAssignedJobs.error} />
			)}
		</Section>
	);
};

const AllJobs = () => {
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(10);

	useSubscription(ANY_JOB_DELETED_SUBSCRIPTION, {
		shouldResubscribe: true,
	});

	useSubscription(ANY_JOB_UPDATED_SUBSCRIPTION, {
		shouldResubscribe: true,
	});

	const GoFirstPage = () => {
		setPage(1);
		refetch();
	};

	const GoUpPage = () => {
		setPage(page + 1);
		refetch();
	};
	const GoDownPage = () => {
		if (page === 1) return;
		setPage(page - 1);
		refetch();
	};

	const Count = () => {
		const { data } = useQuery(JOB_COUNT_QUERY, {
			fetchPolicy: "network-only",
		});

		return (
			<FlexDiv>
				Page {page} of {data && Math.ceil(data.countJobs.data / limit)}
			</FlexDiv>
		);
	};

	const history = useHistory();

	const {
		data,
		error,
		loading,
		refetch,
		subscribeToMore,
		...result
	} = useQuery(GET_ALL_JOBS_QUERY, {
		fetchPolicy: "cache-and-network",
		variables: { limit: limit, page: page },
	});

	return (
		<Section icon={ClipboardIcon} title={`All Jobs`} style={{ padding: "0" }}>
			{loading && <Loading />}
			{error && <ErrorComponent error={error} />}
			{!loading && data && data.jobs.success && subscribeToMore && (
				<ErrorBoundary>
					<Table
						columns={columns}
						data={data.jobs.data}
						onRowClicked={(e: any) => {
							history.push(`/job/${e._id}`);
						}}
						{...result}
						subscribeToNew={() => {
							subscribeToMore({
								document: JOB_ADDED_SUBSCRIPTION,
								updateQuery: (currentData: any, { subscriptionData }: any) => {
									if (!subscriptionData.data) {
										return currentData.jobs.data;
									}
									const newJobItem = subscriptionData.data.jobAdded.data;
									console.log(currentData);

									if (currentData.jobs.data) {
										return Object.assign({}, currentData, {
											jobs: [newJobItem, ...currentData.jobs.data],
										});
									}
								},
							});
						}}
					/>

					<CenterDiv
						style={{
							display: "flex",
							justifyContent: "space-between",
							// margin: "0.5rem",
							paddingTop: "0.25rem",
						}}
					>
						<div>
							{page > 1 && (
								<>
									<Button onClick={GoFirstPage}>
										<StyledIcon icon={faFastBackward} />
									</Button>
									<Button onClick={GoDownPage}>
										<StyledIcon
											style={{ paddingRight: "0.5rem" }}
											icon={faStepBackward}
										/>
										Prev
									</Button>
								</>
							)}
						</div>
						<Count />
						<Button onClick={GoUpPage}>
							Next
							<StyledIcon
								style={{ paddingLeft: "0.5rem" }}
								icon={faStepForward}
							/>
						</Button>
					</CenterDiv>
				</ErrorBoundary>
			)}
			{data && !data.jobs.success && <ErrorComponent error={data.jobs.error} />}
		</Section>
	);
};

const JobsPage = () => {
	const { user } = useAuth0();

	return (
		<>
			<FlexDiv>
				<Link to="/newjob">
					<Button>Create Job</Button>
				</Link>
				<ScannerButton />
			</FlexDiv>

			<AssignedJobs user={user} />
			<AllJobs />
		</>
	);
};

export default JobsPage;
