type Job = {
	_id: string;
	firstname: string;
	lastname: string;
	customername: string;
	parts: JobPart[];
	email: string;
	city: string;
	district: string;
	postcode: string;
	created: Date;
	address1?: string;
	address2?: string;
	modified: Date;
	todo: string;
	done: string;
	status: string;
	assigned: string;
	make: string;
	model: string;
	year: string;
	serial: string;
	labourHours: string;
};

interface StatusType {
	status: string;
}

type ID = {
	id: string;
};

type JobPart = {
	partName: string;
	partNumber: string;
	partQty: string;
	price: string;
};

type DBPart = {
	_id: string;
	partName: string;
	price: string;
	partNumber: string;
	Location: string;
	thumbnail: string;
	supplier: string;
};

type WidthHeight = {
	width: number;
	height: number;
};
