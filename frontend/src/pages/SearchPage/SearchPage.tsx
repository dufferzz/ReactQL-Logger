import React from "react";
import Loading from "../../components/Loading/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import FlexDivCenter from "../../components/StyledComponents/FlexDiv";
import Section from "../../components/StyledComponents/Section";
import SectionHeader from "../../components/StyledComponents/SectionHeader";
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
