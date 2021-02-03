import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { FormButton } from "../../components/_StyledComponents/Button";

import {
	faStepBackward,
	faStepForward,
	faFastBackward,
} from "@fortawesome/free-solid-svg-icons";

const StyledIcon = styled(FontAwesomeIcon)`
	cursor: pointer;
	color: black;
`;

const TableFooter = ({ data, page, limit, refetch, setPage }: any) => {
	const GoFirstPage = () => {
		setPage(1);
		refetch();
	};

	const GoUpPage = () => {
		setPage(page + 1);
		refetch();
	};

	const GoDownPage = () => {
		if (page === 1) return;
		setPage(page - 1);
		refetch();
	};
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				paddingTop: "0.25rem",
				alignItems: "center",
				textAlign: "center",
			}}
		>
			<div>
				{page > 1 && (
					<>
						<FormButton onClick={GoFirstPage}>
							<StyledIcon icon={faFastBackward} />
						</FormButton>
						<FormButton onClick={GoDownPage}>
							<StyledIcon
								style={{ paddingRight: "0.5rem" }}
								icon={faStepBackward}
							/>
							Prev
						</FormButton>
					</>
				)}
			</div>
			<div>
				Page {page} of {data && Math.ceil(data / limit)}
				<br />
				{data && data} Results
			</div>
			<FormButton onClick={GoUpPage}>
				Next
				<StyledIcon style={{ paddingLeft: "0.5rem" }} icon={faStepForward} />
			</FormButton>
		</div>
	);
};

export default TableFooter;
