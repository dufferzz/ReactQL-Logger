import React from "react";
import Section from "../../styledComponents/Section";
import SectionHeader from "../../styledComponents/SectionHeader";
import Button from "../../styledComponents/Button";
import styled from "styled-components";
import { Field, ErrorMessage } from "formik";

import SectionElement from "../../styledComponents/SectionElement";

type Part = {
	partName: string;
	partNumber: string;
	partQty: string;
	partPrice: string;
};

interface Partss {
	parts?: Part[];
}

const AddItemDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	align-items: flex-end;
`;

const PartsItems = ({ parts }: Partss) => {
	if (parts && parts.length > 0) {
		let i: number = 0;
		const listItems = parts.map((part) => {
			i++;
			return (
				<>
					<td>{part.partName}</td>
					<td>{part.partNumber}</td>
					<td>{part.partQty}</td>
					<td>{part.partPrice}</td>
				</>
			);
		});
		return <tr key={i}>{listItems}</tr>;
	}

	return (
		<tr>
			<td colSpan={4}>No Parts</td>
		</tr>
	);
};

const Parts = ({ parts }: Partss) => {
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
					<PartsItems parts={parts} />
				</tbody>
			</table>
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

export default Parts;
