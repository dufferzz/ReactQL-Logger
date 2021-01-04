import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";

import CustomerInfo from "../CustomerInfo";
import JobDetails from "../JobDetails";
import InternalUse from "../InternalUse";
import Parts from "../Parts";

import SubmitFormButton from "../../../SharedComponents/SubmitFormButton";
import FormErrorModal from "../../FormErrorModal/FormErrorModal";
import NEWJOB_MUTATION from "./NewJobMutation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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

const submitForm = async (addJob: any, values: any, setSubmitting: any) => {
	await addJob({ variables: values })
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
};

export const NewJobForm = () => {
	const [addJob, { data }] = useMutation(NEWJOB_MUTATION);

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
				assigned: "",
				year: "",
				serial: "",
				status: "not-started",
				labourHours: "0",
			}}
			validationSchema={JobSchema}
			onSubmit={async (values, { setSubmitting }) => {
				// console.log(values);
				await submitForm(addJob, values, setSubmitting);
			}}
		>
			{({ isSubmitting, values, errors, handleSubmit, handleChange }) => (
				<Form onSubmit={handleSubmit}>
					<CustomerInfo />
					<JobDetails values={values} handleChange={handleChange} />

					<Parts />
					<InternalUse />
					<SubmitFormButton isSubmitting={isSubmitting} />
					{errors && (
						<FormErrorModal isSubmitting={isSubmitting} errors={errors} />
					)}
				</Form>
			)}
		</Formik>
	);
};

export default NewJobForm;
