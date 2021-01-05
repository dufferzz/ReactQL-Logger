import React, { useState } from "react";
import Section from "../../StyledComponents/Section";
import SectionHeader from "../../StyledComponents/SectionHeader";
import Button from "../../StyledComponents/Button";
import CenterDiv from "../../StyledComponents/CenteredDiv";
import styled from "styled-components";
import { Field, ErrorMessage } from "formik";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SectionElement from "../../StyledComponents/SectionElement";

const MySwal = withReactContent(Swal);

const AddItemDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	align-items: flex-end;
`;

const PartsItem = ({ part }: PartPropType) => {
	return (
		<tr>
			<td> X </td>
			<td>{part.partName}</td>
			<td>{part.partNumber}</td>
			<td>{part.partQty}</td>
			<td>{part.partPrice} kr</td>
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
					<td width="30px">Del</td>
					<td>Name</td>
					<td>#</td>
					<td>Qty</td>
					<td>Price</td>
				</tr>
			</thead>
			<tbody>
				{parts &&
					parts.length > 0 &&
					parts.map((part) => {
						return <PartsItem key={part.partNumber} part={part} />;
					})}
				{parts && parts.length === 0 && (
					<tr>
						<td colSpan={5}>No Items</td>
					</tr>
				)}
				{!parts && (
					<tr>
						<td colSpan={5}>No Items</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

const PartsView = ({ parts, setParts }: JobPartsProp) => {
	const [partName, setPartName] = useState("");
	const [partNumber, setpartNumber] = useState("");
	const [partQty, setPartQty] = useState("");
	const [partPrice, setPartPrice] = useState("");

	const addPart = () => {
		if (
			partName === "" ||
			partQty === "" ||
			partQty === "0" ||
			partPrice === ""
		) {
			MySwal.fire({
				title: <p>Invalid Part</p>,
				icon: "error",
			});
			return;
		}
		const newPart = {
			partName,
			partPrice,
			partQty,
			partNumber,
		};
		if (parts && setParts) {
			setParts([...parts, newPart]);
			console.log(parts);
		} else if (parts && !setParts) {
			parts.push(newPart);
		}
	};

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
			<PartsTable parts={parts} setParts={setParts} />
			<CenterDiv>
				<AddItemDiv>
					<SectionElement>
						<label htmlFor="partName">Name</label>
						<input
							onChange={(e) => {
								setPartName(e.target.value);
							}}
							type="text"
							name="partName"
						/>
						<ErrorMessage name="partName" component="div" />
					</SectionElement>
					<SectionElement>
						<label htmlFor="partQty">Qty</label>
						<input
							onChange={(e) => {
								setPartQty(e.target.value);
							}}
							type="number"
							name="partQty"
						/>
						<ErrorMessage name="partQty" component="div" />
					</SectionElement>
					<SectionElement>
						<label htmlFor="partPrice">Price</label>
						<input
							onChange={(e) => {
								setPartPrice(e.target.value);
							}}
							type="number"
							name="partPrice"
						/>
						<ErrorMessage name="partPrice" component="div" />
					</SectionElement>
					<SectionElement style={{ alignItems: "flex-end" }}>
						<Button
							type="button"
							onClick={addPart}
							style={{ width: "100%", height: "2.5rem" }}
						>
							Add
						</Button>
					</SectionElement>
				</AddItemDiv>
			</CenterDiv>
		</Section>
	);
};

export default PartsView;
