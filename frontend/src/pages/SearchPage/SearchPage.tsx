import React from "react";
import Loading from "../../components/_SharedComponents/_Loading/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import FlexDivCenter from "../../components/_StyledComponents/FlexDiv";
import Section from "../../components/_StyledComponents/Section";
import SectionHeader from "../../components/_StyledComponents/SectionHeader";
const SearchPage = () => {
	return (
		<Section>
			<SectionHeader>Search</SectionHeader>
			<FlexDivCenter>Gimme data</FlexDivCenter>
		</Section>
	);
};

export default withAuthenticationRequired(SearchPage, {
	onRedirecting: () => <Loading />,
});
