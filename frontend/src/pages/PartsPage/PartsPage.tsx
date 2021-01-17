import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import styled from "styled-components";

import PartsTable from "../../components/PartsTable/PartsTable";
import Section from "../../components/StyledComponents/Section";
import Button from "../../components/StyledComponents/Button";
import SectionHeader from "../../components/StyledComponents/SectionHeader";
import FlexDivCenter from "../../components/StyledComponents/FlexDiv";
import SectionElement from "../../components/StyledComponents/SectionElement";
import Loading from "../../components/Loading/Loading";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";

import GET_ALL_PARTS_QUERY from "../../querys/parts/GetAllPartsQuery";

const SearchBar = styled.form`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 0.1fr 0.1fr;
	margin-bottom: 0.7rem;
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
						placeholder="Search Query.."
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
			<SectionElement style={{ textAlign: "right" }}>
				<Button onClick={doSearch}>Search</Button>
			</SectionElement>
		</SearchBar>
	);
};

const PartsPage = () => {
	const [searchValue, setSearchValue] = useState("");
	const [searchLimit, setSearchLimit] = useState(50);

	const [doSearch, { called, loading, data, error }] = useLazyQuery(
		GET_ALL_PARTS_QUERY,
		{
			variables: {
				query: searchValue,
				limit: searchLimit,
			},
		}
	);

	console.log(data, error);

	return (
		<Section style={{ padding: "1rem 0 0 0" }}>
			<SectionHeader>Search All Parts</SectionHeader>
			{error && <ErrorComponent error={error} />}
			<SearchParts
				limit={searchLimit}
				doSearch={doSearch}
				setSearchLimit={setSearchLimit}
				setSearchValue={setSearchValue}
			/>
			{loading && <Loading />}
			{/* {!loading && !error && data && <PartsTable data={data} />} */}
			{!called && <FlexDivCenter>Enter a search term and submit</FlexDivCenter>}
			{!loading && !error && data && <PartsTable data={data} />}
		</Section>
	);
};

export default PartsPage;
