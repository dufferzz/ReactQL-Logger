import React from "react";

const FormSubmitError = ({ error }: any) => {
	return <div>{JSON.stringify(error)}</div>;
};

export default FormSubmitError;
