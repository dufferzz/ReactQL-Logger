import React from "react";
import { useQuery } from "@apollo/client";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../components/Loading/Loading";

import GET_ALL_PARTS_QUERY from "../../querys/parts/GetAllPartsQuery";

type DBPart = {
	partName: string;
	price: string;
	partNumber: string;
	Location: string;
	thumbnail: string;
};

interface PartPropType {
	part: DBPart;
	key: string;
}

const PartsTableRow = ({ part }: PartPropType) => {
	return (
		<tr>
			<td width="75px">
				<img style={{ width: "75px" }} alt="" src={part.thumbnail} />
			</td>
			<td>{part.partName}</td>
			<td>{part.partNumber}</td>
			<td>{part.price}</td>
			<td>{part.Location}</td>
		</tr>
	);
};

const PartsTable = () => {
	const { data, loading, error } = useQuery(GET_ALL_PARTS_QUERY);
	console.log(data, error);
	return (
		<table style={{ width: "100%" }}>
			<thead style={{ fontSize: "1.1rem" }}>
				<tr>
					<td></td>
					<td>Part Name</td>
					<td>Part Number</td>
					<td>Part Price</td>
					<td>Location</td>
				</tr>
			</thead>
			<tbody>
				{loading && (
					<tr>
						<td colSpan={3}>Loading..</td>
					</tr>
				)}
				{error && (
					<tr>
						<td colSpan={3}>{JSON.stringify(error)}</td>
					</tr>
				)}
				{data &&
					data.parts.map((part: DBPart) => (
						<PartsTableRow key={part.partName} part={part} />
					))}
			</tbody>
		</table>
	);
};

export default withAuthenticationRequired(PartsTable, {
	onRedirecting: () => <Loading />,
});
