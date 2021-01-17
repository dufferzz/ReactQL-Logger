import React from "react";
import Loading from "../../components/Loading/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import FlexDivCenter from "../../components/StyledComponents/FlexDiv";
import Section from "../../components/StyledComponents/Section";
import SectionHeader from "../../components/StyledComponents/SectionHeader";
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
