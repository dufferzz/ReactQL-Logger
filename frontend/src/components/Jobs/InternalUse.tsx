import React from "react";
import { Field } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import Section from "../_StyledComponents/Section";
import Button, { DangerButton } from "../_StyledComponents/Button";
import SectionElement from "../_StyledComponents/SectionElement";
import ErrorField from "../_StyledComponents/ErrorField";
import ClipboardIcon from "../../assets/icons/clipboard.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import DELETE_JOB_MUTATION from "../../querys/jobs/DeleteJobMutation";

const MySwal = withReactContent(Swal);

const deleteJob = async (id: String, sendDeleteJob: any, history: any) => {
	console.log(`deleting job ${id}!`);
	await sendDeleteJob(id)
		.then(({ data }: any) => {
			const res = data.deleteJob;
			console.log(res);
			if (res.success) {
				MySwal.fire({
					title: <p>Job Deleted!</p>,
					icon: "success",
					text: `Job ${res.data._id} has been deleted`,
				}).then(() => {
					history.push(`/`);
				});
			} else {
				MySwal.fire({
					title: <p>Error!</p>,
					icon: "error",
					text: `${res.error}`,
				});
			}
		})
		.catch((err: any) => {
			MySwal.fire({
				title: <p>Error!</p>,
				icon: "error",
				text: `${err.message}`,
			});
		});
};
interface IDProp {
	id?: string;
}

const ManagementButtons = ({ id }: IDProp) => {
	const [sendDeleteJob] = useMutation(DELETE_JOB_MUTATION, {
		variables: { _id: id },
	});
	const history = useHistory();

	if (!id) return <></>;

	return (
		<div
			style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
		>
			<DangerButton
				type="button"
				style={{ color: "white" }}
				onClick={() => {
					deleteJob(id, sendDeleteJob, history);
				}}
			>
				Delete
			</DangerButton>
			<Button type="button">Generate Invoice</Button>
			<Button type="button">Contact</Button>
		</div>
	);
};

const InternalUse = ({ id }: IDProp) => {
	return (
		<Section
			title="Internal Use"
			icon={ClipboardIcon}
			style={{
				display: "grid",
				gridTemplateColumns: "1fr",
				gridTemplateAreas: `
							'header'
							'content'
							'buttons'
						`,
			}}
		>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr",
				}}
			>
				<SectionElement>
					<label htmlFor="assigned">Assigned To*</label>
					<Field type="assigned" name="assigned" />
					<ErrorField name="assigned" component="div" />
				</SectionElement>

				<SectionElement>
					<label htmlFor="status">Job Status*</label>
					<Field
						style={{ height: "2.5rem" }}
						as="select"
						type="status"
						name="status"
					>
						<option value="not-started">Not Started</option>
						<option value="await">Awaiting Parts</option>
						<option value="fuck">FUCK!</option>
						<option value="completed">Completed</option>
					</Field>
					<ErrorField name="status" component="div" />
				</SectionElement>

				<SectionElement>
					<label htmlFor="labourHours">Labour (hrs)</label>
					<Field
						style={{ height: "2.5rem" }}
						as="select"
						type="labourHours"
						name="labourHours"
					>
						<option value={0}>0</option>

						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
					</Field>
					<ErrorField name="labourHours" component="div" />
				</SectionElement>
			</div>
			<ManagementButtons id={id} />
		</Section>
	);
};
export default InternalUse;
