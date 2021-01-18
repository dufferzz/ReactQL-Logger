import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useQuery, useSubscription } from "@apollo/client";
import { Link } from "react-router-dom";
import FlexDiv from "../../components/StyledComponents/FlexDiv";
import Section from "../../components/StyledComponents/Section";
import SectionHeader from "../../components/StyledComponents/SectionHeader";
import Button from "../../components/StyledComponents/Button";
import Loading from "../../components/Loading/Loading";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";

import GET_ALL_JOBS_QUERY from "../../querys/jobs/GetAllJobsQuery";

import JOB_ADDED_SUBSCRIPTION from "../../querys/jobs/JobAddedSubscription";
import ANY_JOB_UPDATED_SUBSCRIPTION from "../../querys/jobs/AnyJobUpdatedSubscription";
import ANY_JOB_DELETED_SUBSCRIPTION from "../../querys/jobs/AnyJobDeletedSubscription";

import Table from "../../components/DataTable/DataTable";
import StatusImage from "../../components/StyledComponents/StatusImage";

const columns = [
	{
		name: "",
		selector: "status",
		width: "75px",
		cell: (row: any) => (
			<div style={{ width: "50px" }} data-tag="allowRowEvents">
				<StatusImage status={row.status} />
			</div>
		),
	},
	{
		name: "ID",
		selector: "_id",
		maxWidth: "250px",
		hide: 768,
		sortable: true,
		cell: (row: any) => (
			<div style={{ lineBreak: "anywhere" }} data-tag="allowRowEvents">
				{row._id}
			</div>
		),
	},
	{
		name: "Description",
		maxWidth: "60vw",
		selector: "todo",
		cell: (row: any) => (
			<div
				style={{ textAlign: "center", width: "100%" }}
				data-tag="allowRowEvents"
			>
				{row.make === "" && row.model === "" && (
					<span
						style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "2" }}
					>
						Unknown
						<br />
					</span>
				)}
				{(row.make !== "" || row.model !== "") && (
					<>
						<span
							style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "2" }}
						>
							{row.make} {row.model}
						</span>
						<br />
					</>
				)}
				{row.todo &&
					row.todo.length >= 100 &&
					row.todo.substring(0, 100) + "..."}
				{row.todo && row.todo.length < 100 && row.todo}{" "}
			</div>
		),
	},
	{
		name: "Client",
		selector: "firstname",
		maxWidth: "150px",
		sortable: true,
		hide: 580,

		cell: (row: any) => (
			<div data-tag="allowRowEvents">
				{row.firstname} {row.lastname}
			</div>
		),
	},
	{
		name: "Make",
		selector: "make",
		maxWidth: "100px",
		sortable: true,
		hide: 1200,

		cell: (row: any) => <div data-tag="allowRowEvents">{row.make}</div>,
	},
	{
		name: "Model",
		selector: "model",
		maxWidth: "100px",
		hide: 1300,
		sortable: true,

		cell: (row: any) => <div data-tag="allowRowEvents">{row.model}</div>,
	},
	{
		name: "Date",
		sortable: true,

		width: "110px",
		selector: "created",
		cell: (row: any) => (
			<div style={{ textAlign: "center" }} data-tag="allowRowEvents">
				<span style={{ fontSize: "1.1rem" }}>
					{dayjs(row.created).format("DD MMM YY")}
				</span>
				<br />
				{dayjs(row.created).format("HH:mm")}
			</div>
		),
	},
];

const JobsPage = () => {
	const { data, error, loading, subscribeToMore, ...result } = useQuery(
		GET_ALL_JOBS_QUERY,
		{
			fetchPolicy: "cache-and-network",
		}
	);
	const history = useHistory();
	const handleRowClick = (id: string) => {
		history.push(`/job/${id}`);
	};
	console.log(data);

	useSubscription(ANY_JOB_DELETED_SUBSCRIPTION);
	useSubscription(ANY_JOB_UPDATED_SUBSCRIPTION);
	const time: any = Date.now();

	return (
		<>
			<FlexDiv>
				<Link to="/newjob">
					<Button>Create Job</Button>
				</Link>
			</FlexDiv>
			<Section style={{ padding: "1rem 0 0 0" }}>
				<SectionHeader>All Jobs</SectionHeader>
				<FlexDiv style={{ margin: 0, padding: 0 }}>
					{!loading && (
						<span>Last Update: {dayjs(time).format("HH:mm:ss")}</span>
					)}
				</FlexDiv>

				{loading && <Loading />}
				{error && <ErrorComponent error={error} />}
				{!loading && data && subscribeToMore && (
					<ErrorBoundary>
						<Table
							columns={columns}
							data={data.jobs}
							onRowClicked={(e: any) => {
								handleRowClick(e._id);
							}}
							{...result}
							subscribeToNew={() =>
								subscribeToMore({
									document: JOB_ADDED_SUBSCRIPTION,
									updateQuery: (currentData, { subscriptionData }) => {
										if (!subscriptionData.data) {
											return currentData;
										}
										const newJobItem = subscriptionData.data.jobAdded;
										return Object.assign({}, currentData, {
											jobs: [newJobItem, ...currentData.jobs],
										});
									},
								})
							}
						/>
						{/* <JobsTable
							jobs={data}
							{...result}
							
						/> */}
					</ErrorBoundary>
				)}
			</Section>
		</>
	);
};

export default withAuthenticationRequired(JobsPage, {
	onRedirecting: () => <Loading />,
});
