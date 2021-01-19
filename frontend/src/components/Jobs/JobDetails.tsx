import React from "react";

import styled from "styled-components";
import { Field } from "formik";

import Section from "../_StyledComponents/Section";
import SectionHeader from "../_StyledComponents/SectionHeader";
import SectionElement from "../_StyledComponents/SectionElement";
import ErrorField from "../_StyledComponents/ErrorField";

const JobDetailsSection = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gridarea: "machineDetails";
	@media (max-width: 500px) {
		grid-template-columns: 1fr 1fr;
	}
`;

const YearSelection = () => {
	let years = [];
	for (let year = 2021; year > 1980; year--) {
		years.push(year);
	}

	return (
		<Field style={{ height: "2.5rem" }} as="select" name="year">
			{years.map((year) => (
				<option key={year} value={year}>
					{year}
				</option>
			))}
		</Field>
	);
};

const JobDetails = ({ values, handleChange }: JobDetailsFormProps) => (
	<Section
		style={{
			display: "grid",
			gridTemplateColumns: "1fr",
			gridTemplateAreas: `
			'header '
			'machineDetails'
         	'contentt '
        `,
		}}
	>
		<JobDetailsSection>
			<SectionElement>
				<label htmlFor="make">Make</label>
				<Field type="make" name="make" />
				<ErrorField name="make" component="div" />
			</SectionElement>

			<SectionElement>
				<label htmlFor="model">Model</label>
				<Field type="model" name="model" />
				<ErrorField name="model" component="div" />
			</SectionElement>

			<SectionElement>
				<label htmlFor="year">Year</label>

				<YearSelection />

				<ErrorField name="year" component="div" />
			</SectionElement>

			<SectionElement>
				<label htmlFor="serial">Serial</label>
				<Field type="serial" name="serial" />
				<ErrorField name="serial" component="div" />
			</SectionElement>
		</JobDetailsSection>
		<SectionHeader>Job Details</SectionHeader>

		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr",
				gridArea: "contentt",
			}}
		>
			<label htmlFor="todo">Todo</label>
			{values ? (
				<textarea
					onChange={handleChange}
					name="todo"
					value={values.todo}
					rows={7}
				></textarea>
			) : (
				<textarea onChange={handleChange} name="todo" rows={7}></textarea>
			)}

			<ErrorField name="todo" component="div" />

			<label htmlFor="done">Done</label>
			{values ? (
				<textarea
					rows={7}
					onChange={handleChange}
					name="done"
					value={values.done}
				></textarea>
			) : (
				<textarea rows={7} onChange={handleChange} name="done"></textarea>
			)}
			<ErrorField name="done" component="div" />
		</div>
	</Section>
);

export default JobDetails;
export {};
