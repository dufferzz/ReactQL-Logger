import React, { useState } from "react";
import QrReader from "react-qr-reader";

import Section from "../../components/_StyledComponents/Section";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory } from "react-router-dom";
import FlexDivCenter from "../../components/_StyledComponents/FlexDiv";
import Button from "../../components/_StyledComponents/Button";
const MySwal = withReactContent(Swal);

const ScanCodePage = () => {
	return (
		<Section style={{ maxWidth: "600px", padding: 0 }} title="Barcode Scanner">
			<FlexDivCenter>
				I will make this into a pop-over modal eventually..
			</FlexDivCenter>

			<ScannerButton />
		</Section>
	);
};

const ScannerButton = () => {
	const history = useHistory();
	const [scanData, setScanData] = useState<string>();

	const handleScan = (input: any) => {
		setScanData(input);
		if (input) {
			console.log(input);
			MySwal.close();
			const scanned = input.split(":");
			let type: string;
			if (scanned[1]) {
				type = scanned[0];
			} else {
				type = "Unknown";
			}

			MySwal.fire({
				title: "Scan Successful",
				confirmButtonText: "Search",
				html: `
                    <p>Type: ${type}</p>
                    <p>Content: ${input}</p>
                `,
				showCancelButton: true,
			}).then((data) => {
				if (data.isConfirmed) {
					history.push(`/search/${input}`);
				}
				if (data.isDismissed) {
				}
			});
		}
	};

	const handleError = (err: any) => {
		console.error(err);
	};

	const openModal = () => {
		MySwal.fire({
			showConfirmButton: false,
			showCancelButton: true,
			html: (
				<QrReader
					delay={300}
					onError={handleError}
					onScan={handleScan}
					style={{ width: "100%" }}
				/>
			),
		});
	};
	return <Button onClick={openModal}>Open Scanner</Button>;
};

export { ScanCodePage, ScannerButton };
