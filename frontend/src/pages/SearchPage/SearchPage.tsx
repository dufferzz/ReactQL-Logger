import React from "react";
import Loading from "../../components/_SharedComponents/Loading/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import FlexDivCenter from "../../components/_StyledComponents/FlexDiv";
import Section from "../../components/_StyledComponents/Section";
const SearchPage = () => {
	return (
		<Section title="Search">
			<FlexDivCenter>Gimme data</FlexDivCenter>
		</Section>
	);
};

export default withAuthenticationRequired(SearchPage, {
	onRedirecting: () => <Loading />,
});
