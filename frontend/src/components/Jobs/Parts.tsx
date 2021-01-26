import React, { useState } from "react";
import Section from "../_StyledComponents/Section";
import Button from "../_StyledComponents/Button";
import CenterDiv from "../_StyledComponents/CenteredDiv";
import styled from "styled-components";
import { ErrorMessage } from "formik";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SectionElement from "../_StyledComponents/SectionElement";

import JobPartsTable from "./JobPartsTable/JobPartsTable";

import PackageIcon from "../../assets/icons/package.svg";

const MySwal = withReactContent(Swal);

const AddItemDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	align-items: flex-end;
`;

const PartsView = ({ parts, setParts }: JobPartsProp) => {
	// const [jobParts, setJobParts] = useState<Array<JobPart>>([]);

	const [partName, setPartName] = useState<string>("");
	const [partNumber] = useState<string>("");
	const [partQty, setPartQty] = useState<string>("");
	const [price, setPartPrice] = useState<string>("");

	const addPart = () => {
		if (partName === "" || partQty === "" || partQty === "0" || price === "") {
			MySwal.fire({
				title: <p>Invalid Part</p>,
				icon: "error",
			});
			return;
		}
		const newPart = {
			partName,
			price,
			partQty,
			partNumber,
		};

		setParts([...parts, newPart]);
		console.log(parts);
	};

	return (
		<Section
			title="Parts"
			icon={PackageIcon}
			style={{
				display: "grid",
				gridTemplateColumns: "1fr",
				padding: 0,
				gridTemplateAreas: `
					'header '
					'content '
				`,
			}}
		>
			<JobPartsTable data={parts} />
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
								setPartPrice(e.target.value.toString());
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
