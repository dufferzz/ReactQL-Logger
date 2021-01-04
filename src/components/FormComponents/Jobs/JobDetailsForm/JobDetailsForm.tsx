import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";

import CustomerInfo from "../CustomerInfo";
import JobDetails from "../JobDetails";
import InternalUse from "../InternalUse";
import Parts from "../Parts";

import SubmitFormButton from "../../../SharedComponents/SubmitFormButton";
import UpdateJobSuccessModal from "../UpdateJobSuccessModal/UpdateJobSuccessModal";
import FormErrorModal from "../../FormErrorModal/FormErrorModal";
import FormSubmitErrorModal from "../../FormSubmitErrorModal/FormSubmitErrorModal";

import UPDATE_JOB_MUTATION from "./UpdateJobMutation";

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

const JobDetailsForm = ({ job }: JobPropType) => {
	const [updateJob, { data, error }] = useMutation(UPDATE_JOB_MUTATION);

	return (
		<Formik
			initialValues={{
				_id: `${job._id}`,
				firstname: `${job.firstname}`,
				lastname: `${job.lastname}`,
				email: `${job.email}`,
				city: `${job.city}`,
				district: `${job.district}`,
				postcode: `${job.postcode}`,
				todo: `${job.todo}`,
				done: `${job.done}`,
				status: `${job.status}`,
				assigned: `${job.assigned}`,
				make: `${job.make}`,
				model: `${job.model}`,
				year: `${job.year}`,
				serial: `${job.serial}`,
				labourHours: `${job.labourHours}`,
			}}
			validationSchema={JobSchema}
			onSubmit={async (values, { setSubmitting }) => {
				console.log(values);
				await updateJob({ variables: values });

				setSubmitting(false);
			}}
		>
			{({ isSubmitting, values, errors, handleSubmit, handleChange }) => (
				<Form onSubmit={handleSubmit}>
					<CustomerInfo />
					<JobDetails values={values} handleChange={handleChange} />

					<Parts parts={job.parts} />
					<InternalUse id={job._id} />
					{error && <FormSubmitErrorModal error={error} />}
					{errors && (
						<FormErrorModal isSubmitting={isSubmitting} errors={errors} />
					)}
					{data && (
						<UpdateJobSuccessModal
							isSubmitting={isSubmitting}
							errors={errors}
						/>
					)}

					<SubmitFormButton isSubmitting={isSubmitting} />
				</Form>
			)}
		</Formik>
	);
};

export default JobDetailsForm;
