import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import CustomerInfo from "../CustomerInfo";
import JobDetails from "../JobDetails";
import InternalUse from "../InternalUse";
import PartsView from "../Parts";
import SubmitFormButton from "../../_SharedComponents/Buttons/SubmitFormButton";
import FormError from "../../FormError";

import UPDATE_JOB_MUTATION from "../../../querys/jobs/UpdateJobMutation";

import { useHistory } from "react-router-dom";

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

interface JobPropType {
	job: Job;
}

const handleResponse = (data: any, history: any) => {
	const resp = data.updateJob;
	console.log(resp);
	if (resp.success) {
		window.scrollTo({ top: 0, behavior: "smooth" });

		MySwal.fire({
			title: <p>Success!</p>,
			icon: "success",
			text: `Job Saved successfully. ${resp.data._id}`,
			showDenyButton: true,
			denyButtonText: "Home",
		}).then((data) => {
			if (data.isDenied) {
				history.push("/");
			}
		});
	} else {
		MySwal.fire({
			title: <p>Error!</p>,
			icon: "error",
			text: `${resp.error}`,
		});
	}
};

const JobDetailsForm = ({ job }: JobPropType) => {
	const history = useHistory();
	const [updateJob] = useMutation(UPDATE_JOB_MUTATION);
	const newParts = job.parts.map((item) => {
		return {
			partName: item.partName,
			partNumber: item.partNumber,
			partQty: item.partQty,
			price: item.price,
		};
	});
	const [parts, setParts] = useState<JobPart[]>([...newParts]);

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
				const newvalues: JobFormValuesProp = values;
				console.log(parts);
				newvalues.parts = parts;
				console.log(newvalues);
				await updateJob({ variables: newvalues })
					.then(({ data }: any) => {
						handleResponse(data, history);
						setSubmitting(false);
					})
					.catch((err: any) => {
						MySwal.fire({
							title: <p>Error!</p>,
							icon: "error",
							text: err.message,
						});
						setSubmitting(false);

						console.error(err);
					});
			}}
		>
			{({ isSubmitting, errors, handleSubmit }) => {
				return (
					<Form onSubmit={handleSubmit}>
						<CustomerInfo />
						<JobDetails />

						<PartsView parts={parts} setParts={setParts} />
						<InternalUse assigned={job.assigned} id={job._id} />
						{errors && (
							<FormError isSubmitting={isSubmitting} errors={errors} />
						)}

						<SubmitFormButton isSubmitting={isSubmitting} />
					</Form>
				);
			}}
		</Formik>
	);
};

export default JobDetailsForm;
