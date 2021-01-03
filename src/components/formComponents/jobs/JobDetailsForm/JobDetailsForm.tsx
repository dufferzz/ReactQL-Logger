import React from "react";
import { Formik, Form } from "formik";

import CustomerInfo from "../CustomerInfo";
import JobDetails from "../JobDetails";
import InternalUse from "../InternalUse";
import Parts from "../Parts";
import SubmitFormButton from "../../SubmitFormButton";

const JobDetailsForm = ({ data, id }: any) => {
	return (
		<Formik
			initialValues={{
				firstname: `${data.firstname}`,
				lastname: `${data.lastname}`,
				email: `${data.email}`,
				city: `${data.city}`,
				district: `${data.district}`,
				postcode: `${data.postcode}`,
				date: `${data.date}`,
				todo: `${data.todo}`,
				done: `${data.done}`,
				status: `${data.status}`,
				assigned: `${data.assigned}`,
				make: `${data.make}`,
				model: `${data.model}`,
				year: `${data.year}`,
				serial: `${data.serial}`,
				labourHours: `${data.labourHours}`,
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
				console.log(values);
				setSubmitting(false);
			}}
		>
			{({ isSubmitting, values, handleSubmit, handleChange }) => (
				<Form onSubmit={handleSubmit}>
					<CustomerInfo />
					<JobDetails values={values} handleChange={handleChange} />

					<Parts parts={data.parts} />
					<InternalUse id={id} />
					<SubmitFormButton isSubmitting={isSubmitting} />
				</Form>
			)}
		</Formik>
	);
};

export default JobDetailsForm;
