import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import PartsTable from "../../components/PartsTable/PartsTable";
import Section from "../../components/StyledComponents/Section";
import Button from "../../components/StyledComponents/Button";
import SectionHeader from "../../components/StyledComponents/SectionHeader";
import SectionElement from "../../components/StyledComponents/SectionElement";
import Loading from "../../components/Loading/Loading";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";

import GET_ALL_PARTS_QUERY from "../../querys/parts/GetAllPartsQuery";

const SearchBar = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 0.1fr;
	margin-bottom: 0.7rem;
`;

const SearchParts = ({ setSearchValue }: any) => {
	return (
		<SearchBar>
			<SectionElement>
				<input
					style={{ padding: "0.5rem 0.21rem" }}
					name="searchQuery"
					type="text"
					placeholder="Search Query.."
					onChange={(e) => {
						setSearchValue(e.target.value);
					}}
				/>
			</SectionElement>
			<SectionElement style={{ textAlign: "right" }}>
				<Button>Search</Button>
			</SectionElement>
		</SearchBar>
	);
};

const PartsPage = () => {
	const [searchValue, setSearchValue] = useState("");

	const { data, loading, error } = useQuery(GET_ALL_PARTS_QUERY, {
		variables: searchValue,
	});

	console.log(data, error);

	return (
		<Section style={{ padding: "1rem 0 0 0" }}>
			<SectionHeader>Search All Parts (Limit 100)</SectionHeader>
			{error && <ErrorComponent error={error} />}
			<SearchParts setSearchValue={setSearchValue} />
			{loading && <Loading />}
			{!loading && !error && data && <PartsTable data={data} />}
		</Section>
	);
};

export default PartsPage;
