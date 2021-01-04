import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import CustomerInfo from "../CustomerInfo";
import JobDetails from "../JobDetails";
import InternalUse from "../InternalUse";
import PartsView from "../Parts";
import SubmitFormButton from "../../../SharedComponents/SubmitFormButton";
import FormErrorModal from "../../FormErrorModal/FormErrorModal";

import UPDATE_JOB_MUTATION from "./UpdateJobMutation";

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

const submitForm = async (
	updateJob: any,
	values: any,
	job: any,
	setSubmitting: any
) => {
	await updateJob({ variables: values })
		.then((daa: any) => {
			console.log(daa);
			MySwal.fire({
				title: <p>Success!</p>,
				icon: "success",
				text: `Job Saved successfully. ${daa.data.updateJob._id}`,
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

const JobDetailsForm = React.memo(({ job }: JobPropType) => {
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
				await submitForm(updateJob, values, job, setSubmitting);
			}}
		>
			{({ isSubmitting, values, errors, handleSubmit, handleChange }) => {
				return (
					<Form onSubmit={handleSubmit}>
						<CustomerInfo />
						<JobDetails values={values} handleChange={handleChange} />

						<PartsView parts={job.parts} />
						<InternalUse id={job._id} />
						{errors && (
							<FormErrorModal isSubmitting={isSubmitting} errors={errors} />
						)}

						<SubmitFormButton isSubmitting={isSubmitting} />
					</Form>
				);
			}}
		</Formik>
	);
});

export default JobDetailsForm;
