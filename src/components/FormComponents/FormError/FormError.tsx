import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const isEmptyObject = (errors: any) => JSON.stringify(errors) === "{}";

const FormError = ({ errors, isSubmitting }: any) => {
	if (isSubmitting && !isEmptyObject(errors)) {
		MySwal.fire({
			title: <p>Invalid Form</p>,
			icon: "error",
			text: JSON.stringify(errors),
			didOpen: () => {
				// `MySwal` is a subclass of `Swal`
				//   with all the same instance & static methods
				// MySwal.clickConfirm();
			},
		});
	}
	return <></>;
};

export default FormError;
