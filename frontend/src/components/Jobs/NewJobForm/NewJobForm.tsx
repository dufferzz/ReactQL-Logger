import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";

import CustomerInfo from "../CustomerInfo";
import JobDetails from "../JobDetails";
import InternalUse from "../InternalUse";
import PartsView from "../Parts";

import SubmitFormButton from "../../_SharedComponents/Buttons/SubmitFormButton";
import FormError from "../../FormError";
import NEWJOB_MUTATION from "../../../querys/jobs/NewJobMutation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// import GET_ALL_JOBS_QUERY from "../../../../querys/JobsQuery";

import * as Yup from "yup";

const MySwal = withReactContent(Swal);

const JobSchema = Yup.object().shape({
	firstname: Yup.string()
		.min(2, "Too Short!")
		.max(70, "Too Long!")
		.required("Required"),

	lastname: Yup.string()
		.min(2, "Too Short!")
		.max(70, "Too Long!")
		.required("Required"),

	email: Yup.string().email("Invalid email").required("Required"),
	city: Yup.string().required("Required"),
	district: Yup.string().required("Required"),
	postcode: Yup.string().required("Required"),
	assigned: Yup.string().required("Required"),
	status: Yup.string().required("Required"),
});

// {
// 	partName: "Fake Item",
// 	partNumber: "234234",
// 	partQty: "2",
// 	partPrice: "342",
// },
export const NewJobForm = () => {
	const [addJob] = useMutation(NEWJOB_MUTATION, {});
	const [parts, setParts] = useState([]);

	return (
		<Formik
			initialValues={{
				firstname: "",
				lastname: "",
				email: "",
				city: "",
				district: "",
				postcode: "",
				date: "",
				todo: "",
				done: "",
				make: "",
				model: "",
				assigned: "nobody",
				year: "",
				serial: "",
				status: "not-started",
				labourHours: "0",
			}}
			validationSchema={JobSchema}
			onSubmit={async (values, { setSubmitting }) => {
				console.log(values);
				const newvalues: any = values;
				newvalues.parts = parts;
				await addJob({ variables: newvalues })
					.then((daa: any) => {
						console.log(daa);
						MySwal.fire({
							title: <p>Success!</p>,
							icon: "success",
							text: `Job Added successfully. ${daa.data.addJob._id}`,
						});
						setSubmitting(false);
					})
					.catch((err: any) => {
						MySwal.fire({
							title: <p>Error!</p>,
							icon: "error",
							text: err.message,
						});
						console.error(err);
					});
			}}
		>
			{({ isSubmitting, values, errors, handleSubmit, handleChange }) => (
				<Form onSubmit={handleSubmit}>
					<CustomerInfo />
					<JobDetails values={values} handleChange={handleChange} />

					<PartsView parts={parts} setParts={setParts} />
					<InternalUse />
					<SubmitFormButton isSubmitting={isSubmitting} />
					{errors && <FormError isSubmitting={isSubmitting} errors={errors} />}
				</Form>
			)}
		</Formik>
	);
};

export default NewJobForm;
