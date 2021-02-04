import { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import GET_ALL_JOBS_QUERY from "../../querys/jobs/GetAllJobsQuery";
import JOB_COUNT_QUERY from "../../querys/jobs/GetJobCount";
import JOB_ADDED_SUBSCRIPTION from "../../querys/jobs/JobAddedSubscription";
import Section from "../_StyledComponents/Section";
import Loading from "../_SharedComponents/Loading/Loading";
import ErrorComponent from "../_SharedComponents/ErrorComponent/ErrorComponent";
import ErrorBoundary from "../_SharedComponents/ErrorBoundary/ErrorBoundary";

import ClipboardIcon from "../../assets/icons/clipboard.svg";

import JobsTable from "../Jobs/JobsTable/JobsTable";
import TableFooter from "../TableFooter/TableFooter";

const AllJobsSection = () => {
	const [page, setPage] = useState<number>(1);
	//eslint-disable-next-line
	const [limit, setLimit] = useState<number>(11);

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

	useEffect(() => {
		const unsub = subscribeToMore({
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
		return () => {
			console.log("unsubbing");
			unsub();
		};
	}, [subscribeToMore]);

	const { data: countData } = useQuery(JOB_COUNT_QUERY, {
		fetchPolicy: "cache-and-network",
	});

	let count = null;
	if (countData) count = countData.countJobs.data;

	return (
		<ErrorBoundary>
			<Section icon={ClipboardIcon} title={`All Jobs`} style={{ padding: "0" }}>
				{loading && <Loading />}
				{error && <ErrorComponent error={error} />}
				{!loading && data && data.jobs.success && (
					<>
						<JobsTable data={data.jobs.data} />
						<TableFooter
							setPage={setPage}
							page={page}
							limit={limit}
							refetch={refetch}
							data={count}
							{...result}
						/>
					</>
				)}
				{data && !data.jobs.success && (
					<ErrorComponent error={data.jobs.error} />
				)}
			</Section>
		</ErrorBoundary>
	);
};

export default AllJobsSection;
