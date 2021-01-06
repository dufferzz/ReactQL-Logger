import React from "react";
import { Field } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import Section from "../../StyledComponents/Section";
import SectionHeader from "../../StyledComponents/SectionHeader";
import Button, { DangerButton } from "../../StyledComponents/Button";
import SectionElement from "../../StyledComponents/SectionElement";
import ErrorField from "../../StyledComponents/ErrorField";

import DELETE_JOB_MUTATION from "../../../querys/jobs/DeleteJobMutation";
const deleteJob = async (id: String, sendDeleteJob: any, history: any) => {
	console.log(`deleting job ${id}!`);
	await sendDeleteJob(id)
		.then((daa: any) => {
			history.push(`/`);
		})
		.catch((err: any) => {
			console.error(err);
		});
};
interface IProps {
	id?: string;
}

const ManagementButtons = ({ id }: IProps) => {
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

const InternalUse = ({ id }: IProps) => (
	<Section
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
		<SectionHeader>Internal Use</SectionHeader>
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
export default InternalUse;
