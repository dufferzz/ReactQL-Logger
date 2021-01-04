import React from "react";

import styled from "styled-components";
import { Field, ErrorMessage } from "formik";

import Section from "../../StyledComponents/Section";
import SectionHeader from "../../StyledComponents/SectionHeader";
import SectionElement from "../../StyledComponents/SectionElement";
import ErrorField from "../../StyledComponents/ErrorField";

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

const JobDetails = ({ values, handleChange }: IProps) => (
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

			<SectionElement>
				<label htmlFor="status">Job Status</label>
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
