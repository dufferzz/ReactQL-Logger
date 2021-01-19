import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import Loading from "../../components/_SharedComponents/Loading/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import FlexDivCenter from "../../components/_StyledComponents/FlexDiv";
import Section from "../../components/_StyledComponents/Section";
import SectionHeader from "../../components/_StyledComponents/SectionHeader";

import NEW_UPLOAD_MUTATION from "../../querys/uploads/NewUploadMutation";
import GET_ALL_UPLOADS_QUERY from "../../querys/uploads/GetAllUploadsQuery";
import Dropzone from "react-dropzone";

const UploadsList = () => {
	const { data, error, loading } = useQuery(GET_ALL_UPLOADS_QUERY);
	return (
		<div>
			<ul>
				{!loading && !error && data && (
					<div>
						{data.uploads.data.map((item: any) => (
							<li>
								{item._id} - {item.title}
							</li>
						))}
					</div>
				)}
			</ul>
		</div>
	);
};

const AdminPage = () => {
	const [uploadFile, { data, error, loading }] = useMutation(
		NEW_UPLOAD_MUTATION
	);

	const handleSubmit = (files: any) => {
		console.log(files);
		uploadFile({ variables: { file: files, title: "test" } }).then((res) => {
			console.log(res);
		});
	};

	return (
		<Section>
			<SectionHeader>Administration</SectionHeader>
			<FlexDivCenter>There is nothing here!?</FlexDivCenter>
			<Dropzone onDrop={(acceptedFiles: any) => handleSubmit(acceptedFiles)}>
				{({ getRootProps, getInputProps }: any) => (
					<section>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<p>Drag 'n' drop some files here, or click to select files</p>
						</div>
					</section>
				)}
			</Dropzone>
			<div>
				{!loading && !error && data && <div>{JSON.stringify(data)}</div>}
			</div>
			<UploadsList />
		</Section>
	);
};

export default withAuthenticationRequired(AdminPage, {
	onRedirecting: () => <Loading />,
});
