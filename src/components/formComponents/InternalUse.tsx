import React from "react";
import Section from "../styledComponents/Section";
import SectionHeader from "../styledComponents/SectionHeader";
import Button, { DangerButton } from "../styledComponents/Button";

const deleteJob = (id: String) => {
	console.log(`deleting job ${id}!`);
};

interface IProps {
	id?: string;
}

const ManagementButtons = ({ id }: IProps) => {
	if (!id) return <></>;

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
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
		<div></div>
		<ManagementButtons id={id} />
	</Section>
);
export default InternalUse;
