import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Link } from "react-router-dom";

import PartsTable from "../../components/PartsTable/PartsTable";
import Section from "../../components/_StyledComponents/Section";
import Button, { FormButton } from "../../components/_StyledComponents/Button";
import FlexDivCenter from "../../components/_StyledComponents/FlexDiv";
import SectionElement from "../../components/_StyledComponents/SectionElement";
import Loading from "../../components/_SharedComponents/Loading/Loading";
import ErrorComponent from "../../components/_SharedComponents/ErrorComponent/ErrorComponent";

import ScannerButton from "../../components/_SharedComponents/Buttons/ScannerButton";
import CenterDiv from "../../components/_StyledComponents/CenteredDiv";
import GET_ALL_PARTS_QUERY from "../../querys/parts/GetAllPartsQuery";
import COUNT_PARTS_QUERY from "../../querys/parts/GetPartCount";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	faStepBackward,
	faStepForward,
	faFastBackward,
} from "@fortawesome/free-solid-svg-icons";

const StyledIcon = styled(FontAwesomeIcon)`
	cursor: pointer;
	color: black;
`;

const SearchBar = styled.form`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 0.1fr 0.1fr;
	margin-bottom: 0.7rem;
	align-items: end;
`;

const SearchParts = ({
	setSearchValue,
	doSearch,
	setSearchLimit,
	limit,
}: any) => {
	return (
		<SearchBar onSubmit={(e) => e.preventDefault()}>
			<SectionElement>
				<label style={{ display: "grid" }}>
					Search Query
					<input
						style={{ padding: "0.5rem 0.21rem" }}
						name="searchQuery"
						type="text"
						placeholder="Part Name / Number"
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
					/>
				</label>
			</SectionElement>
			<SectionElement>
				<label style={{ display: "grid" }}>
					Limit
					<select
						style={{ height: "2.5rem" }}
						onChange={(e) => {
							setSearchLimit(parseInt(e.target.value));
						}}
						value={limit}
					>
						<option value={10}>10</option>
						<option value={25}>25</option>
						<option value={50}>50</option>
						<option value={100}>100</option>
					</select>
				</label>
			</SectionElement>
			<SectionElement style={{ alignItems: "end" }}>
				<Button
					style={{ height: "2.5rem", marginBottom: "0.25rem", width: "100%" }}
					onClick={doSearch}
				>
					Search
				</Button>
			</SectionElement>
		</SearchBar>
	);
};

const AddPartButton = () => {
	return (
		<Link to="/newpart">
			<Button>Add Part</Button>
		</Link>
	);
};

const Count = ({ page, searchLimit }: any) => {
	const { data } = useQuery(COUNT_PARTS_QUERY);
	return (
		<FlexDivCenter>
			Page {page} of {data && Math.ceil(data.countParts.data / searchLimit)}
		</FlexDivCenter>
	);
};

const PartsPage = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchLimit, setSearchLimit] = useState<number>(25);
	const [page, setPage] = useState<number>(1);

	const [doSearch, { called, loading, data, error, refetch }] = useLazyQuery(
		GET_ALL_PARTS_QUERY,
		{
			fetchPolicy: "cache-and-network",
			variables: {
				query: searchValue,
				limit: searchLimit,
				page: page,
			},
		}
	);
	useEffect(() => {
		doSearch();
	}, [doSearch]);
	// console.log(data);

	const GoFirstPage = () => {
		setPage(1);
		if (refetch) refetch();
	};

	const GoUpPage = () => {
		setPage(page + 1);
		if (refetch) refetch();
	};
	const GoDownPage = () => {
		if (page === 1) return;
		setPage(page - 1);
		if (refetch) refetch();
	};

	return (
		<>
			<FlexDivCenter>
				<AddPartButton />
				<ScannerButton />
			</FlexDivCenter>

			<Section style={{ padding: 0 }} title="Search All Parts">
				{error && <ErrorComponent error={error} />}
				<SearchParts
					limit={searchLimit}
					doSearch={doSearch}
					setSearchLimit={setSearchLimit}
					setSearchValue={setSearchValue}
				/>
				{loading && <Loading />}
				{!called && (
					<FlexDivCenter>Enter a search term and submit</FlexDivCenter>
				)}
				{!loading && !error && data && data.parts.success && (
					<PartsTable data={data.parts.data} />
				)}
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
								<FormButton onClick={GoFirstPage}>
									<StyledIcon icon={faFastBackward} />
								</FormButton>
								<FormButton onClick={GoDownPage}>
									<StyledIcon
										style={{ paddingRight: "0.5rem" }}
										icon={faStepBackward}
									/>
									Prev
								</FormButton>
							</>
						)}
					</div>
					<Count page={page} searchLimit={searchLimit} />
					<FormButton onClick={GoUpPage}>
						Next
						<StyledIcon
							style={{ paddingLeft: "0.5rem" }}
							icon={faStepForward}
						/>
					</FormButton>
				</CenterDiv>
			</Section>
		</>
	);
};

export default PartsPage;
