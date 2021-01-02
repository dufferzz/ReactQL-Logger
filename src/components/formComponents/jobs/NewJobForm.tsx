import React from "react";
import { Formik, Form } from "formik";

import CustomerInfo from "./CustomerInfo";
import JobDetails from "./JobDetails";
import InternalUse from "./InternalUse";
import Parts from "./Parts";
import SubmitFormButton from "../SubmitFormButton";

export const NewJobForm = () => {
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
				status: "",
				labourHours: "",
			}}
			validate={(values) => {
				const errors: any = {};
				if (!values.email) {
					errors.email = "Required";
				} else if (
					!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
				) {
					errors.email = "Invalid email address";
				}
				if (!values.firstname) {
					errors.firstName = "Required";
				} else if (values.firstname.length > 15) {
					errors.firstName = "Name Too Long. Max 15 Chars";
				}
				return errors;
			}}
			onSubmit={(values, { setSubmitting }) => {
				alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}}
		>
			{({ isSubmitting, values, handleSubmit, handleChange }) => (
				<Form onSubmit={handleSubmit}>
					<CustomerInfo />
					<JobDetails values={values} handleChange={handleChange} />

					<Parts />
					<InternalUse />
					<SubmitFormButton isSubmitting={isSubmitting} />
				</Form>
			)}
		</Formik>
	);
};

export default NewJobForm;
