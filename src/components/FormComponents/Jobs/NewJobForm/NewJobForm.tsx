import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";

import CustomerInfo from "../CustomerInfo";
import JobDetails from "../JobDetails";
import InternalUse from "../InternalUse";
import Parts from "../Parts";
import SubmitFormButton from "../../../SharedComponents/SubmitFormButton";
import FormErrorModal from "../../FormErrorModal/FormErrorModal";
import FormSubmitErrorModal from "../../FormSubmitErrorModal/FormSubmitErrorModal";
import NewJobSuccessModal from "../NewJobSuccessModal/NewJobSuccessModal";
import NEWJOB_MUTATION from "./NewJobMutation";
import * as Yup from "yup";

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
});

export const NewJobForm = () => {
	const [addJob, { data, error }] = useMutation(NEWJOB_MUTATION);

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
				labourHours: "",
			}}
			validationSchema={JobSchema}
			onSubmit={(values, { setSubmitting }) => {
				console.log(values);
				addJob({ variables: values });
				setSubmitting(false);
			}}
		>
			{({ isSubmitting, values, errors, handleSubmit, handleChange }) => (
				<Form onSubmit={handleSubmit}>
					<CustomerInfo />
					<JobDetails values={values} handleChange={handleChange} />

					<Parts />
					<InternalUse />
					<SubmitFormButton isSubmitting={isSubmitting} />
					{error && <FormSubmitErrorModal error={error} />}
					{errors && (
						<FormErrorModal isSubmitting={isSubmitting} errors={errors} />
					)}

					{data && <NewJobSuccessModal data={data} />}
				</Form>
			)}
		</Formik>
	);
};

export default NewJobForm;
