import React from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Section = styled.div`
	grid-area: content;
	border: 1px solid #aaa;
	padding: 1rem;
	border-radius: 10px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
	grid-gap: 0.25rem;
	margin: 0 0 1.5rem 0;
	line-break: anywhere;
`;

const SectionHeader = styled.div`
	grid-area: header;
	padding: 0.75rem 0;
	text-align: center;
	font-size: 1.1rem;
	border: 1px solid #aaa;
	border-radius: 10px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
	width: 100%;
	margin-bottom: 0.5rem;
`;

const JobDetailsForm = ({ data }) => {
	return (
		<div style={{ width: "90%", margin: "auto", paddingTop: "1rem" }}>
			<Formik
				initialValues={{
					firstName: `${data.firstname}`,
					lastName: `${data.lastname}`,
					email: `${data.email}`,
					city: `${data.city}`,
					district: `${data.district}`,
					postcode: `${data.postcode}`,
					date: `${data.date}`,
					todo: `${data.todo}`,
					done: `${data.done}`,
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
						<Section
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr 1fr",
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
								<ErrorMessage
									style={{ color: "red" }}
									name="email"
									component="div"
								/>
							</div>
							<div style={{ display: "grid", margin: "0.25rem" }}>
								<label htmlFor="city">City</label>
								<Field type="city" name="city" />
								<ErrorMessage
									style={{ color: "red" }}
									name="city"
									component="div"
								/>
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
						<Section
							style={{
								display: "grid",
								gridTemplateColumns: "1fr",
								gridTemplateAreas: `
                        'header'
                        'content'
                    `,
							}}
						>
							<SectionHeader>Job Details</SectionHeader>

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
						</Section>

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

						<div style={{ width: "100%", textAlign: "center" }}>
							<button type="submit" disabled={isSubmitting}>
								Submit
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default JobDetailsForm;
