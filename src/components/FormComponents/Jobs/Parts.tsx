import React from "react";
import Section from "../../StyledComponents/Section";
import SectionHeader from "../../StyledComponents/SectionHeader";
import Button from "../../StyledComponents/Button";
import styled from "styled-components";
import { Field, ErrorMessage } from "formik";

import SectionElement from "../../StyledComponents/SectionElement";

const AddItemDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	align-items: flex-end;
`;

const PartsItem = ({ part }: PartPropType) => {
	return (
		<tr key={part.partNumber}>
			<td>{part.partName}</td>
			<td>{part.partNumber}</td>
			<td>{part.partQty}</td>
			<td>{part.partPrice}</td>
		</tr>
	);
};

const PartsTable = ({ parts }: JobPartsProp) => {
	return (
		<table
			style={{
				width: "100%",
				textAlign: "center",
			}}
		>
			<thead>
				<tr style={{ fontSize: "1.1rem" }}>
					<td>#</td>
					<td>Name</td>
					<td>Qty</td>
					<td>Price</td>
				</tr>
			</thead>
			<tbody>
				{parts &&
					parts.length > 0 &&
					parts.map((part) => {
						return <PartsItem part={part} />;
					})}
				{parts && parts.length === 0 && (
					<tr>
						<td colSpan={4}>No Items</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

const PartsView = ({ parts }: JobPartsProp) => {
	return (
		<Section
			style={{
				display: "grid",
				gridTemplateColumns: "1fr",
				gridTemplateAreas: `
								'header '
								'content '
							`,
			}}
		>
			<SectionHeader>Parts</SectionHeader>
			<PartsTable parts={parts} />
			<div
				style={{ display: "block", width: "100%", justifyContent: "center" }}
			>
				<AddItemDiv>
					<SectionElement>
						<label htmlFor="partName">Name</label>
						<Field type="partName" name="partName" />
						<ErrorMessage name="partName" component="div" />
					</SectionElement>
					<SectionElement>
						<label htmlFor="partQty">Qty</label>
						<Field type="partQty" name="partQty" />
						<ErrorMessage name="partQty" component="div" />
					</SectionElement>
					<SectionElement>
						<label htmlFor="partPrice">Price</label>
						<Field type="partPrice" name="partPrice" />
						<ErrorMessage name="partPrice" component="div" />
					</SectionElement>
					<SectionElement style={{ alignItems: "flex-end" }}>
						<Button style={{ width: "100%", height: "2.5rem" }}>Add</Button>
					</SectionElement>
				</AddItemDiv>
			</div>
		</Section>
	);
};

export default PartsView;
