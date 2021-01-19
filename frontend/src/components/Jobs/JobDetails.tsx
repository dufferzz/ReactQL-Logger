import React, { useState } from "react";

import styled from "styled-components";
import { Field } from "formik";

import Section from "../_StyledComponents/Section";
import SectionHeader from "../_StyledComponents/SectionHeader";
import SectionElement from "../_StyledComponents/SectionElement";
import ErrorField from "../_StyledComponents/ErrorField";
import ToggleHideButton from "../ToggleHideButton/ToggleHideButton";

const JobDetailsSection = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
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

const JobDetails = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
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
			<SectionHeader
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				Job Details
				<ToggleHideButton isOpen={isOpen} />
			</SectionHeader>
			{isOpen && (
				<>
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
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr",
							gridArea: "contentt",
						}}
					>
						<label htmlFor="todo">Todo</label>
						<Field component="textarea" name="todo" rows={7}></Field>
						<ErrorField name="todo" component="div" />

						<label htmlFor="done">Done</label>
						<Field component="textarea" rows={7} name="done"></Field>
						<ErrorField name="done" component="div" />
					</div>
				</>
			)}
		</Section>
	);
};

export default JobDetails;
export {};