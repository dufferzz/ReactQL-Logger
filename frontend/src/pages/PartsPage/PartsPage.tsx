import React from "react";
import PartsTable from "../../components/PartsTable/PartsTable";
import Section from "../../components/StyledComponents/Section";
import Button from "../../components/StyledComponents/Button";
import SectionHeader from "../../components/StyledComponents/SectionHeader";
import SectionElement from "../../components/StyledComponents/SectionElement";

import styled from "styled-components";

const SearchBar = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 0.1fr;
	margin-bottom: 0.7rem;
`;

const SearchParts = () => {
	return (
		<SearchBar>
			<SectionElement>
				<input
					style={{ padding: "0.5rem 0.21rem" }}
					name="searchQuery"
					type="text"
					placeholder="Search Query.."
				/>
			</SectionElement>
			<SectionElement style={{ textAlign: "right" }}>
				<Button>Search</Button>
			</SectionElement>
		</SearchBar>
	);
};

const PartsPage = () => {
	return (
		<Section>
			<SectionHeader>Search All Parts (Limit 100)</SectionHeader>
			<SearchParts />
			<PartsTable />
		</Section>
	);
};

export default PartsPage;
