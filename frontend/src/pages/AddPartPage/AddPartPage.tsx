import React from "react";
import Section from "../../components/_StyledComponents/Section";
import SectionElement from "../../components/_StyledComponents/SectionElement";
import PackageIcon from "../../assets/icons/package.svg";
import Placeholder from "../../assets/images/placeholder.png";
import Button from "../../components/_StyledComponents/Button";
import Dropzone from "react-dropzone";

import theme from "../../config/theme";

const AddPartPage = () => {
	const handleSubmit = (files: any) => {
		// console.log(files);
		// uploadFile({ variables: { file: files, title: "test" } }).then((res) => {
		// console.log(res);
		// });
	};
	const handleFileUpload = (acceptedFiles: any) => {};
	return (
		<Section title="Create New Part" icon={PackageIcon}>
			<div style={{ textAlign: "center" }}>
				<img style={{ width: "200px" }} src={Placeholder} alt="placeholder" />
			</div>
			<div
				style={{
					display: "grid",
					alignItems: "center",
					justifyContent: "center",
					border: "1px dashed black",
					borderRadius: theme.defaultBorderRadius,
					height: "200px",
					textAlign: "center",
					gridGap: "0.25rem",
				}}
			>
				<Dropzone
					onDrop={(acceptedFiles: any) => handleFileUpload(acceptedFiles)}
				>
					{({ getRootProps, getInputProps }: any) => (
						<section>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<p>Drag 'n' drop some files here, or click to select files</p>
							</div>
						</section>
					)}
				</Dropzone>
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gridGap: "0.25rem",
					marginTop: "0.25rem",
				}}
			>
				<SectionElement>
					<label>Part Name:</label>
					<input name="partName" type="text"></input>
				</SectionElement>
				<SectionElement>
					<label>Part Number:</label>
					<input name="partNumber" type="text"></input>
				</SectionElement>
				<SectionElement>
					<label>Location:</label>
					<input name="location" type="text"></input>
				</SectionElement>

				<SectionElement>
					<label>Price:</label>
					<input name="price" type="text"></input>
				</SectionElement>
				<SectionElement>
					<label>SKU:</label>
					<input name="sku" type="text"></input>
				</SectionElement>

				<SectionElement>
					<label>Stock:</label>
					<input name="stock" type="text"></input>
				</SectionElement>
				<SectionElement>
					<label>Location:</label>
					<input name="Location" type="text"></input>
				</SectionElement>
				<SectionElement>
					<label>Supplier:</label>
					<input name="Location" type="text"></input>
				</SectionElement>
			</div>
			<Button
				onClick={handleSubmit}
				style={{ width: "100%", height: "3rem", marginTop: "0.5rem" }}
			>
				Submit
			</Button>
		</Section>
	);
};

export default AddPartPage;
