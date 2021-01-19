import React from "react";
import styled from "styled-components";
import { Field } from "formik";

import Section from "../_StyledComponents/Section";
import SectionHeader from "../_StyledComponents/SectionHeader";
import SectionElement from "../_StyledComponents/SectionElement";
import ErrorField from "../_StyledComponents/ErrorField";

const CustomerInfoSection = styled(Section)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: flex-start;
	grid-template-areas:
		"header header header"
		"content content content";
	@media (max-width: 580px) {
		grid-template-columns: 1fr 1fr;
		grid-template-areas:
			"header header "
			"content content";
		padding: 0.5rem;
	}
`;

const CustomerInfo = () => {
	return (
		<CustomerInfoSection>
			<SectionHeader>Customer Information</SectionHeader>
			<SectionElement>
				<label htmlFor="firstname">First Name*</label>
				<Field type="firstname" name="firstname" />
				<ErrorField name="firstname" component="div" />
			</SectionElement>
			<SectionElement>
				<label htmlFor="lastname">Last Name*</label>
				<Field type="lastname" name="lastname" />
				<ErrorField name="lastname" component="div" />
			</SectionElement>
			<SectionElement>
				<label htmlFor="email">E-Mail*</label>
				<Field type="email" name="email" />
				<ErrorField name="email" component="div" />
			</SectionElement>
			<SectionElement>
				<label htmlFor="city">City*</label>
				<Field type="city" name="city" />
				<ErrorField name="city" component="div" />
			</SectionElement>
			<SectionElement>
				<label htmlFor="district">District*</label>
				<Field type="district" name="district" />
				<ErrorField name="district" component="div" />
			</SectionElement>
			<SectionElement>
				<label htmlFor="postCode">Postcode*</label>
				<Field type="postcode" name="postcode" />
				<ErrorField name="postcode" component="div" />
			</SectionElement>
		</CustomerInfoSection>
	);
};

export default CustomerInfo;
