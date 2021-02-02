import React, { useState } from "react";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import CustomerInfo from "../CustomerInfo";
import JobDetails from "../JobDetails";
import InternalUse from "../InternalUse/InternalUse";
import PartsView from "../JobParts";
import SubmitFormButton from "../../_SharedComponents/Buttons/SubmitFormButton";
import FormError from "../../FormError";

import UPDATE_JOB_MUTATION from "../../../querys/jobs/UpdateJobMutation";

import { useHistory } from "react-router-dom";

import JobFormValidator from "../../../validators/JobFormValidator";

const MySwal = withReactContent(Swal);

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
				customername: `${job.customername}`,
				email: `${job.email}`,
				address1: `${job.address1}`,
				address2: `${job.address2}`,
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
			validationSchema={JobFormValidator}
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
					<>
						<CustomerInfo />
						<JobDetails />

						<PartsView parts={parts} setParts={setParts} />
						<InternalUse assigned={job.assigned} id={job._id} />
						{errors && (
							<FormError isSubmitting={isSubmitting} errors={errors} />
						)}

						<SubmitFormButton
							handleSubmit={handleSubmit}
							isSubmitting={isSubmitting}
						/>
					</>
				);
			}}
		</Formik>
	);
};

export default JobDetailsForm;
