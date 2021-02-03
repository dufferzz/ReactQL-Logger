import { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import GET_ALL_JOBS_QUERY from "../../querys/jobs/GetAllJobsQuery";
import JOB_COUNT_QUERY from "../../querys/jobs/GetJobCount";

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

	const { data, error, loading, refetch, startPolling, stopPolling } = useQuery(
		GET_ALL_JOBS_QUERY,
		{
			fetchPolicy: "cache-and-network",
			variables: { limit: limit, page: page },
		}
	);

	const { data: countData } = useQuery(JOB_COUNT_QUERY, {
		fetchPolicy: "cache-and-network",
	});

	let count = null;
	if (countData) count = countData.countJobs.data;

	useEffect(() => {
		startPolling(10000);
		return () => {
			stopPolling();
		};
	});

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
