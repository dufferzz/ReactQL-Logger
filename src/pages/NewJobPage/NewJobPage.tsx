import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../components/Loading/Loading";

import { NewJobForm } from "../../components/FormComponents/Jobs/NewJobForm/NewJobForm";

const NewJob = () => {
	return (
		<div>
			<div style={{ width: "100%", textAlign: "center" }}>
				<h2>Create New Job</h2>
			</div>
			<NewJobForm />
		</div>
	);
};

export default withAuthenticationRequired(NewJob, {
	onRedirecting: () => <Loading />,
});
