import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import styled from "styled-components";

import PartsTable from "../../components/PartsTable/PartsTable";
import Section from "../../components/_StyledComponents/Section";
import Button from "../../components/_StyledComponents/Button";
import SectionHeader from "../../components/_StyledComponents/SectionHeader";
import FlexDivCenter from "../../components/_StyledComponents/FlexDiv";
import SectionElement from "../../components/_StyledComponents/SectionElement";
import Loading from "../../components/_SharedComponents/Loading/Loading";
import ErrorComponent from "../../components/_SharedComponents/ErrorComponent/ErrorComponent";

import GET_ALL_PARTS_QUERY from "../../querys/parts/GetAllPartsQuery";

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
				<Button style={{ height: "2.5rem" }} onClick={doSearch}>
					Search
				</Button>
			</SectionElement>
		</SearchBar>
	);
};

const PartsPage = () => {
	const [searchValue, setSearchValue] = useState("");
	const [searchLimit, setSearchLimit] = useState(25);

	const [doSearch, { called, loading, data, error }] = useLazyQuery(
		GET_ALL_PARTS_QUERY,
		{
			variables: {
				query: searchValue,
				limit: searchLimit,
			},
		}
	);
	useEffect(() => {
		doSearch();
	}, [doSearch]);
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
