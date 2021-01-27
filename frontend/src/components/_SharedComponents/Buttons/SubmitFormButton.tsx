import React from "react";
import { SuccessButton } from "../../_StyledComponents/Button";

interface SubmitFormProps {
	isSubmitting: boolean;
}

const SubmitFormButton = ({ isSubmitting }: SubmitFormProps) => (
	<div style={{ width: "100%" }}>
		<SuccessButton
			style={{ width: "100%", height: "3rem" }}
			type="submit"
			disabled={isSubmitting}
		>
			Submit
		</SuccessButton>
	</div>
);

export default SubmitFormButton;
