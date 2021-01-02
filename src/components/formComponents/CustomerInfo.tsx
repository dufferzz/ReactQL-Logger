import React from "react";
import styled from "styled-components";
import { Field, ErrorMessage } from "formik";

import Section from "../styledComponents/Section";
import SectionHeader from "../styledComponents/SectionHeader";
import SectionElement from "../styledComponents/SectionElement";

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

const CustomerInfo = () => {
	return (
		<CustomerInfoSection>
			<SectionHeader>Customer Information</SectionHeader>
			<SectionElement>
				<label htmlFor="firstname">First Name</label>
				<Field type="firstname" name="firstname" />
				<ErrorMessage name="firstname" component="div" />
			</SectionElement>
			<SectionElement>
				<label htmlFor="lastname">Last Name</label>
				<Field type="lastname" name="lastname" />
				<ErrorMessage name="lastName" component="div" />
			</SectionElement>
			<SectionElement>
				<label htmlFor="email">E-Mail</label>
				<Field type="email" name="email" />
				<ErrorMessage name="email" component="div" />
			</SectionElement>
			<SectionElement>
				<label htmlFor="city">City</label>
				<Field type="city" name="city" />
				<ErrorMessage name="city" component="div" />
			</SectionElement>
			<SectionElement>
				<label htmlFor="district">District</label>
				<Field type="district" name="district" />
				<ErrorMessage name="district" component="div" />
			</SectionElement>
			<SectionElement>
				<label htmlFor="postCode">Postcode</label>
				<Field type="postcode" name="postcode" />
				<ErrorMessage name="postcode" component="div" />
			</SectionElement>
		</CustomerInfoSection>
	);
};

export default CustomerInfo;
