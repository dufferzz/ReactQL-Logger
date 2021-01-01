import React from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Section from "./styledComponents/Section";
import SectionHeader from "./styledComponents/SectionHeader";
import SectionElement from "./styledComponents/SectionElement";
const SubmitButton = styled.button`
	width: 100%;
	background-color: rgba(0, 200, 0, 0.7);
	border: 1px solid #aaa;
	border-radius: 5px;
	font-size: 1rem;
	padding: 0.7rem;
	outline: none;
	&:hover {
		box-shadow: 0 0 7px rgba(137, 195, 235, 1);
		border: 1px solid rgba(137, 195, 235, 1);
		transition: box-shadow 0.2s;
		cursor: pointer;
	}
`;

const deleteJob = (id) => {
	console.log(`deleting job ${id}!`);
};

const CustomerInfoSection = styled(Section)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-areas:
		"header header header"
		"content content content";
	@media (max-width: 500px) {
		grid-template-columns: 1fr 1fr;
		grid-template-areas:
			"header header "
			"content content";
	}
`;

const JobDetailsSection = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gridarea: "machineDetails";
	@media (max-width: 500px) {
		grid-template-columns: 1fr 1fr;
	}
`;

export const CustomerInfo = () => {
	return (
		<CustomerInfoSection style={{}}>
			<SectionHeader>Customer Information</SectionHeader>
			<SectionElement>
				<label htmlFor="firstName">First Name</label>
				<Field type="firstName" name="firstName" />
				<ErrorMessage
					style={{ color: "red" }}
					name="firstName"
					component="div"
				/>
			</SectionElement>
			<SectionElement>
				<label htmlFor="lastName">Last Name</label>
				<Field type="lastName" name="lastName" />
				<ErrorMessage
					style={{ color: "red" }}
					name="lastName"
					component="div"
				/>
			</SectionElement>
			<SectionElement>
				<label htmlFor="email">E-Mail</label>
				<Field type="email" name="email" />
				<ErrorMessage style={{ color: "red" }} name="email" component="div" />
			</SectionElement>
			<SectionElement>
				<label htmlFor="city">City</label>
				<Field type="city" name="city" />
				<ErrorMessage style={{ color: "red" }} name="city" component="div" />
			</SectionElement>
			<SectionElement>
				<label htmlFor="district">District</label>
				<Field type="district" name="district" />
				<ErrorMessage
					style={{ color: "red" }}
					name="district"
					component="div"
				/>
			</SectionElement>
			<SectionElement>
				<label htmlFor="postCode">Postcode</label>
				<Field type="postcode" name="postcode" />
				<ErrorMessage
					style={{ color: "red" }}
					name="postcode"
					component="div"
				/>
			</SectionElement>
		</CustomerInfoSection>
	);
};

const YearSelection = () => {
	let years = [];
	for (let year = 2021; year > 1980; year--) {
		years.push(year);
	}

	return years.map((year) => (
		<option key={year} value={year}>
			{year}
		</option>
	));
};

export const JobDetails = ({ values, handleChange }) => (
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
				<ErrorMessage style={{ color: "red" }} name="make" component="div" />
			</SectionElement>

			<SectionElement>
				<label htmlFor="model">Model</label>
				<Field type="model" name="model" />
				<ErrorMessage style={{ color: "red" }} name="model" component="div" />
			</SectionElement>

			<SectionElement>
				<label htmlFor="year">Year</label>

				<Field style={{ height: "2.5rem" }} as="select" name="year">
					<YearSelection />
				</Field>

				<ErrorMessage style={{ color: "red" }} name="year" component="div" />
			</SectionElement>

			<SectionElement>
				<label htmlFor="serial">Serial</label>
				<Field type="serial" name="serial" />
				<ErrorMessage style={{ color: "red" }} name="serial" component="div" />
			</SectionElement>

			<SectionElement>
				<label htmlFor="status">Job Status</label>
				<Field
					style={{ height: "2.5rem" }}
					as="select"
					type="status"
					name="status"
				>
					<option default value="not-started">
						Not Started
					</option>
					<option value="await">Awaiting Parts</option>
					<option value="fuck">FUCK!</option>
					<option value="completed">Completed</option>
				</Field>
				<ErrorMessage style={{ color: "red" }} name="status" component="div" />
			</SectionElement>

			<SectionElement>
				<label htmlFor="labourHours">Labour (hrs)</label>
				<Field type="labourHours" name="labourHours" />
				<ErrorMessage
					style={{ color: "red" }}
					name="labourHours"
					component="div"
				/>
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
			<textarea
				onChange={handleChange}
				name="todo"
				value={values.todo}
				rows="7"
			></textarea>
			<ErrorMessage name="todo" component="div" />

			<label htmlFor="done">Done</label>
			<textarea
				rows="7"
				onChange={handleChange}
				name="done"
				value={values.done}
			></textarea>
			<ErrorMessage name="done" component="div" />
		</div>
	</Section>
);

export const InternalUse = ({ id }) => (
	<Section
		style={{
			display: "grid",
			gridTemplateColumns: "1fr 1fr 1fr",
			gridTemplateAreas: `
                        'header header header '
                        'content content content '
                    `,
		}}
	>
		<SectionHeader>Internal Use</SectionHeader>
		stuff
		<button
			type="button"
			onClick={() => {
				deleteJob(id);
			}}
		>
			Delete Job
		</button>
	</Section>
);

export const Parts = () => {
	return (
		<Section
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr 1fr",
				gridTemplateAreas: `
								'header header header '
								'content content content '
							`,
			}}
		>
			<SectionHeader>Parts</SectionHeader>
			stuff
		</Section>
	);
};

export const Submit = ({ isSubmitting }) => (
	<div style={{ width: "100%", textAlign: "center" }}>
		<SubmitButton type="submit" disabled={isSubmitting}>
			Save Job
		</SubmitButton>
	</div>
);

export const JobDetailsForm = ({ data }) => {
	return (
		<Formik
			initialValues={{
				firstName: `${data?.firstname}`,
				lastName: `${data?.lastname}`,
				email: `${data?.email}`,
				city: `${data?.city}`,
				district: `${data?.district}`,
				postcode: `${data?.postcode}`,
				date: `${data?.date}`,
				todo: `${data?.todo}`,
				done: `${data?.done}`,
				status: `${data?.status}`,
				assigned: `${data?.assigned}`,
				make: `${data?.make}`,
				model: `${data?.model}`,
				year: `${data?.year}`,
				serial: `${data?.serial}`,
				labourHours: `${data?.labourHours}`,
			}}
			validate={(values) => {
				const errors = {};
				if (!values.email) {
					errors.email = "Required";
				} else if (
					!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
				) {
					errors.email = "Invalid email address";
				}
				if (!values.firstName) {
					errors.firstName = "Required";
				} else if (values.firstName.length > 15) {
					errors.firstName = "Name Too Long. Max 15 Chars";
				}
				return errors;
			}}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}, 400);
			}}
		>
			{({ isSubmitting, values, handleSubmit, handleChange }) => (
				<Form onSubmit={handleSubmit}>
					<CustomerInfo />
					<JobDetails values={values} handleChange={handleChange} />

					<Parts />
					<InternalUse id={data?._id} />
					<Submit isSubmitting={isSubmitting} />
				</Form>
			)}
		</Formik>
	);
};

export default JobDetailsForm;
