import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";

import Section from "../_StyledComponents/Section";
import Loading from "../_SharedComponents/Loading/Loading";
import ErrorComponent from "../_SharedComponents/ErrorComponent/ErrorComponent";
import ErrorBoundary from "../_SharedComponents/ErrorBoundary/ErrorBoundary";

import ASSIGNED_JOB_COUNT_QUERY from "../../querys/jobs/GetAssignedJobCount";
import GET_ASSIGNED_JOBS_QUERY from "../../querys/jobs/GetAssignedJobsQuery";

import JobsTable from "../Jobs/JobsTable/JobsTable";
import TableFooter from "../TableFooter/TableFooter";
import UserIcon from "../../assets/icons/user.svg";

const AssignedJobsSection = () => {
	const { user } = useAuth0();

	const [page, setPage] = useState<number>(1);
	//eslint-disable-next-line
	const [limit, setLimit] = useState<number>(11);
	const { data, error, loading, refetch, startPolling, stopPolling } = useQuery(
		GET_ASSIGNED_JOBS_QUERY,

		{
			fetchPolicy: "cache-and-network",
			variables: { user: user.nickname, limit: limit, page: page },
		}
	);
	const { data: countData } = useQuery(ASSIGNED_JOB_COUNT_QUERY, {
		fetchPolicy: "cache-and-network",
		variables: { user: user.nickname },
	});
	let count = null;
	if (countData && countData.countAssignedJobs.success)
		count = countData.countAssignedJobs.data;

	useEffect(() => {
		startPolling(10000);
		return () => {
			stopPolling();
		};
	});
	return (
		<ErrorBoundary>
			<Section
				icon={UserIcon}
				title={`${user.nickname}'s Jobs`}
				style={{ padding: "0" }}
			>
				{loading && <Loading />}
				{error && <ErrorComponent error={error} />}
				{!loading && data && countData && data.getAssignedJobs.success && (
					<>
						<JobsTable data={data.getAssignedJobs.data} />
						{count && (
							<TableFooter
								setPage={setPage}
								page={page}
								limit={limit}
								refetch={refetch}
								data={count}
							/>
						)}
					</>
				)}
				{data && !data.getAssignedJobs.success && (
					<ErrorComponent error={data.getAssignedJobs.error} />
				)}
			</Section>
		</ErrorBoundary>
	);
};

export default AssignedJobsSection;
