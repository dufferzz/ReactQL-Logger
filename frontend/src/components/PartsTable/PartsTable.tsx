import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../../components/Loading/Loading";
import { useHistory } from "react-router-dom";

type DBPart = {
	_id: string;
	partName: string;
	price: string;
	partNumber: string;
	Location: string;
	thumbnail: string;
	supplier: string;
};

interface PartPropType {
	part: DBPart;
	key: string;
}

const PartsTableRow = ({ part }: PartPropType) => {
	const history = useHistory();
	const handleRowClick = (id: string) => {
		history.push(`/part/${id}`);
	};

	return (
		<tr
			onClick={() => handleRowClick(part._id)}
			title={`Supplier: ${part.supplier}`}
			style={{ cursor: "pointer", padding: "0.2rem" }}
		>
			<td style={{ padding: "5px 5px" }} width="75px">
				<img
					style={{ width: "75px", borderRadius: "7px" }}
					alt=""
					src={part.thumbnail}
				/>
			</td>
			<td style={{ lineBreak: "anywhere", padding: "0.25rem" }}>
				{part.partName}
			</td>
			<td className="hide-md">{part.partNumber}</td>
			<td style={{ padding: "0.25rem" }}>{part.price}</td>
			<td style={{ padding: "0.25rem" }}>{part.Location}</td>
		</tr>
	);
};

const PartsTable = ({ data }: any) => {
	return (
		<table style={{ width: "100%" }}>
			<thead style={{ fontSize: "1.1rem", textAlign: "center" }}>
				<tr>
					<td></td>
					<td>Name</td>
					<td className="hide-md">Part Number</td>
					<td>Price</td>
					<td>Bin</td>
				</tr>
			</thead>
			<tbody>
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
