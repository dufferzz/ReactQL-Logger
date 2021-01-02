import React from "react";
import { SuccessButton } from "../styledComponents/Button";
const SubmitFormButton = ({ isSubmitting }: any) => (
	<div style={{ width: "100%" }}>
		<SuccessButton
			style={{ width: "100%" }}
			type="submit"
			disabled={isSubmitting}
		>
			Save Job
		</SuccessButton>
	</div>
);

export default SubmitFormButton;
