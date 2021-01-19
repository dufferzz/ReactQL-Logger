type Job = {
	_id: string;
	firstname: string;
	parts: JobPart[];
	lastname: string;
	email: string;
	city: string;
	district: string;
	postcode: string;
	created: Date;
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
	partPrice: string;
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
