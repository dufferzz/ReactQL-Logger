import React from "react";
import styled from "styled-components";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

const Section = styled.div`
	grid-area: content;
	border: 1px solid #aaa;
	padding: 1rem;
	border-radius: 10px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
	grid-gap: 0.25rem;
	margin: 0 0 1.5rem 0;
	line-break: anywhere;
	background-color: #eee;
	align-items: flex-start;
`;

const SectionHeader = styled.div`
	grid-area: header;
	text-align: center;
	font-size: 1.1rem;
	width: 100%;
	margin-bottom: 0.5rem;
`;

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

export const CustomerInfo = () => {
	return (
		<Section
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr 1fr",
				alignItems: "flex-start",
				gridTemplateAreas: `
                        'header header header'
                        'content content content'
                    `,
			}}
		>
			<SectionHeader>Customer Information</SectionHeader>
			<div style={{ display: "grid", gridGap: "0.25rem" }}>
				<label htmlFor="firstName">First Name</label>
				<Field type="firstName" name="firstName" />
				<ErrorMessage
					style={{ color: "red" }}
					name="firstName"
					component="div"
				/>
			</div>
			<div style={{ display: "grid", margin: "0.25rem" }}>
				<label htmlFor="lastName">Last Name</label>
				<Field type="lastName" name="lastName" />
				<ErrorMessage
					style={{ color: "red" }}
					name="lastName"
					component="div"
				/>
			</div>
			<div style={{ display: "grid", margin: "0.25rem" }}>
				<label htmlFor="email">E-Mail</label>
				<Field type="email" name="email" />
				<ErrorMessage style={{ color: "red" }} name="email" component="div" />
			</div>
			<div style={{ display: "grid", margin: "0.25rem" }}>
				<label htmlFor="city">City</label>
				<Field type="city" name="city" />
				<ErrorMessage style={{ color: "red" }} name="city" component="div" />
			</div>
			<div style={{ display: "grid", margin: "0.25rem" }}>
				<label htmlFor="district">District</label>
				<Field type="district" name="district" />
				<ErrorMessage
					style={{ color: "red" }}
					name="district"
					component="div"
				/>
			</div>
			<div style={{ display: "grid", margin: "0.25rem" }}>
				<label htmlFor="postCode">Postcode</label>
				<Field type="postcode" name="postcode" />
				<ErrorMessage
					style={{ color: "red" }}
					name="postcode"
					component="div"
				/>
			</div>
		</Section>
	);
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
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr 1fr",
				gridArea: "machineDetails",
				alignItems: "flex-start",
			}}
		>
			<div style={{ display: "grid", margin: "0.25rem" }}>
				<label htmlFor="make">Make</label>
				<Field type="make" name="make" />
				<ErrorMessage style={{ color: "red" }} name="make" component="div" />
			</div>

			<div style={{ display: "grid", margin: "0.25rem" }}>
				<label htmlFor="model">Model</label>
				<Field type="model" name="model" />
				<ErrorMessage style={{ color: "red" }} name="model" component="div" />
			</div>

			<div style={{ display: "grid", margin: "0.25rem" }}>
				<label htmlFor="year">Year</label>

				<Field style={{ height: "2.5rem" }} as="select" name="year">
					<YearSelection />
				</Field>

				<ErrorMessage style={{ color: "red" }} name="year" component="div" />
			</div>

			<div>1</div>
			<div>2</div>
			<div>3</div>
		</div>
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

export const InternalUse = () => (
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
			Add Job
		</SubmitButton>
	</div>
);

export const NewJobForm = () => {
	return (
		<Formik
			initialValues={{
				firstName: "",
				lastName: "",
				email: "",
				city: "",
				district: "",
				postcode: "",
				date: "",
				todo: "",
				done: "",
				make: "",
				model: "",
				year: "",
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
					<InternalUse />
					<Submit isSubmitting={isSubmitting} />
				</Form>
			)}
		</Formik>
	);
};

export default NewJobForm;
