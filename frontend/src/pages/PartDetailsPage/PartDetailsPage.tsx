import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/_SharedComponents/_Loading/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useQuery } from "@apollo/client";
import GET_PART_DETAILS_QUERY from "../../querys/parts/PartDetailsQuery";
import CenterDiv from "../../components/_StyledComponents/CenteredDiv";
import ErrorComponent from "../../components/_SharedComponents/_ErrorComponent/ErrorComponent";
import Section from "../../components/_StyledComponents/Section";
import SectionHeader from "../../components/_StyledComponents/SectionHeader";
import FlexDiv from "../../components/_StyledComponents/FlexDiv";
import Button, {
	DangerButton,
} from "../../components/_StyledComponents/Button";
import styled from "styled-components";

import Placeholder from "../../assets/images/placeholder.png";
import FlexDivCenter from "../../components/_StyledComponents/FlexDiv";

const PartsPageGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 5fr;
	grid-template-rows: 1fr auto;
	@media (max-width: 800px) {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		align-items: center;
		justify-content: center;
	}
`;

const PartsPageContent = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr auto;
`;

const Item = ({ title, value }: any) => {
	return (
		<h3>
			{title}:
			<div style={{ fontSize: "1rem", fontWeight: "normal" }}>{value}</div>
		</h3>
	);
};

const PartDetailsPage = () => {
	const { id } = useParams<ID>();
	const { loading, error, data } = useQuery(GET_PART_DETAILS_QUERY, {
		variables: { _id: id },
		errorPolicy: "all",
	});

	if (loading) return <Loading />;
	if (error)
		return (
			<CenterDiv>
				<ErrorComponent error={error} />
			</CenterDiv>
		);
	console.log(data);

	const part = data.getPart;

	return (
		<Section>
			<SectionHeader>Part ID: {id}</SectionHeader>
			<PartsPageGrid>
				<div style={{ textAlign: "center" }}>
					{part.thumbnail !== "Hello World" ? (
						<img
							style={{ width: "250px", borderRadius: "10px" }}
							src={part.thumbnail}
							alt={part.partName}
						/>
					) : (
						<img
							style={{ width: "250px", borderRadius: "10px" }}
							src={Placeholder}
							alt={part.partName}
						/>
					)}
					<div style={{ textAlign: "center", padding: "0.25rem" }}>
						Click to Enlarge
					</div>
				</div>
				<div
					style={{
						textAlign: "center",
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gridTemplateRows: "auto auto",
						gridTemplateAreas: `'name name' 'left right'`,
					}}
				>
					<div style={{ gridArea: "name" }}>
						<h1>{part.partName}</h1>
					</div>
					<div style={{ gridArea: "left" }}>
						<Item title="Sell Price" value={part.price} />
						<Item title="Buy Price" value={part.price} />
						<Item title="Location" value={part.Location} />
					</div>
					<div style={{ gridArea: "right" }}>
						<Item title="Stock" value={part.stock} />
						<Item title="Supplier" value={part.supplier} />
						<Item title="Part Number" value={part.partNumber} />
					</div>
				</div>

				<div>
					<h2 style={{ textAlign: "center" }}>Alternate Images</h2>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							paddingTop: "0.5rem",
							flexWrap: "wrap",
						}}
					>
						<img
							style={{
								width: "80px",
								height: "55px",
								margin: "0.25rem",
								borderRadius: "7px",
							}}
							src={Placeholder}
							alt=""
						/>
						<img
							style={{
								width: "80px",
								height: "55px",
								margin: "0.25rem",
								borderRadius: "7px",
							}}
							src={Placeholder}
							alt=""
						/>
						<img
							style={{
								width: "80px",
								height: "55px",
								margin: "0.25rem",
								borderRadius: "7px",
							}}
							src={Placeholder}
							alt=""
						/>
					</div>
				</div>

				<FlexDivCenter>
					<h2>Description</h2>
					<div style={{ padding: "0 1rem", lineHeight: "1.5" }}>
						I don't think anybody knows it was Russia that wrote Lorem Ipsum,
						but I don't know, maybe it was. It could be Russia, but it could
						also be China. It could also be lots of other people. It also could
						be some wordsmith sitting on their bed that weights 400 pounds. Ok?
						Some people have an ability to write placeholder text... It's an art
						you're basically born with. You either have it or you don't. An
						‘extremely credible source’ has called my office and told me that
						Barack Obama’s placeholder text is a fraud. Lorem Ipsum better hope
						that there are no "tapes" of our conversations before he starts
						leaking to the press! You’re disgusting. Trump Ipsum is calling for
						a total and complete shutdown of Muslim text entering your website.
						If Trump Ipsum weren’t my own words, perhaps I’d be dating it. We
						have so many things that we have to do better... and certainly ipsum
						is one of them. Look at that text! Would anyone use that? Can you
						imagine that, the text of your next webpage?! I'm speaking with
						myself, number one, because I have a very good brain and I've said a
						lot of things.
					</div>
				</FlexDivCenter>
				<FlexDivCenter></FlexDivCenter>
				<div style={{ marginTop: "1rem" }}>
					<h2 style={{ textAlign: "center", margin: 0 }}>
						Additional Information
					</h2>
					<PartsPageContent style={{ padding: "1rem", textAlign: "center" }}>
						<Item title="SKU" value={part.SKU} />
					</PartsPageContent>
				</div>
			</PartsPageGrid>
			<FlexDiv>
				<Button>Edit Part</Button>
				<DangerButton>Delete Part</DangerButton>
			</FlexDiv>
		</Section>
	);
};

export default withAuthenticationRequired(PartDetailsPage, {
	onRedirecting: () => <Loading />,
});
