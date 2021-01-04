import React from "react";
import { SuccessButton } from "../StyledComponents/Button";
const SubmitFormButton = ({ isSubmitting }: any) => (
	<div style={{ width: "100%" }}>
		<SuccessButton
			style={{ width: "100%", height: "3rem" }}
			type="submit"
			disabled={isSubmitting}
		>
			Save Job
		</SuccessButton>
	</div>
);

export default SubmitFormButton;
