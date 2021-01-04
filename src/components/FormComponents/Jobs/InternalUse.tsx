import React from "react";
import { Field } from "formik";

import Section from "../../StyledComponents/Section";
import SectionHeader from "../../StyledComponents/SectionHeader";
import Button, { DangerButton } from "../../StyledComponents/Button";
import SectionElement from "../../StyledComponents/SectionElement";
import ErrorField from "../../StyledComponents/ErrorField";
const deleteJob = (id: String) => {
	console.log(`deleting job ${id}!`);
};

interface IProps {
	id?: string;
}

const ManagementButtons = ({ id }: IProps) => {
	if (!id) return <></>;

	return (
		<div
			style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
		>
			<DangerButton
				type="button"
				style={{ color: "white" }}
				onClick={() => {
					deleteJob(id);
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
                        'header  '
                        'content  '
                    `,
		}}
	>
		<SectionHeader>Internal Use</SectionHeader>

		<SectionElement>
			<label htmlFor="assigned">Assigned To*</label>
			<Field type="assigned" name="assigned" />
			<ErrorField name="assigned" component="div" />
		</SectionElement>
		<ManagementButtons id={id} />
	</Section>
);
export default InternalUse;
