import React from "react";

import styled from "styled-components";
import { Field, ErrorMessage } from "formik";

import Section from "../styledComponents/Section";
import SectionHeader from "../styledComponents/SectionHeader";
import SectionElement from "../styledComponents/SectionElement";

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

type Part = {
	partName: string;
	partNumber: string;
	partQty: string;
	partPrice: string;
};

type Values = {
	_id?: string | undefined;
	firstname: string;
	lastname: string;
	email: string;
	city: string;
	district: string;
	postcode: string;
	date: string;
	todo: string;
	done: string;
	modified?: string;
	created?: string | undefined;
	status: string;
	model: string;
	make: string;
	year: string;
	serial: string;
	parts?: Part[];
	assigned: string;
	labourHours: string;
};

interface IProps {
	values?: Values;
	handleChange: any;
}
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
				<ErrorMessage name="make" component="div" />
			</SectionElement>

			<SectionElement>
				<label htmlFor="model">Model</label>
				<Field type="model" name="model" />
				<ErrorMessage name="model" component="div" />
			</SectionElement>

			<SectionElement>
				<label htmlFor="year">Year</label>

				<YearSelection />

				<ErrorMessage name="year" component="div" />
			</SectionElement>

			<SectionElement>
				<label htmlFor="serial">Serial</label>
				<Field type="serial" name="serial" />
				<ErrorMessage name="serial" component="div" />
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
				<ErrorMessage name="status" component="div" />
			</SectionElement>

			<SectionElement>
				<label htmlFor="labourHours">Labour (hrs)</label>
				<Field type="labourHours" name="labourHours" />
				<ErrorMessage name="labourHours" component="div" />
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

			<ErrorMessage name="todo" component="div" />

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
			<ErrorMessage name="done" component="div" />
		</div>
	</Section>
);

export default JobDetails;
export {};
