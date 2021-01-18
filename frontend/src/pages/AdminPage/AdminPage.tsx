import React from "react";
import Loading from "../../components/_SharedComponents/_Loading/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import FlexDivCenter from "../../components/_StyledComponents/FlexDiv";
import Section from "../../components/_StyledComponents/Section";
import SectionHeader from "../../components/_StyledComponents/SectionHeader";
const AdminPage = () => {
	return (
		<Section>
			<SectionHeader>Administration</SectionHeader>
			<FlexDivCenter>There is nothing here!?</FlexDivCenter>
		</Section>
	);
};

export default withAuthenticationRequired(AdminPage, {
	onRedirecting: () => <Loading />,
});
