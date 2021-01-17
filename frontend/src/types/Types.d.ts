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

interface SingleJobProp {
	job: Job;
}
interface StatusType {
	status: string;
}

type ID = {
	id: string;
};

type StatusImageProp = {
	image: string;
	status: string;
};

type JobFormValuesProp = {
	_id?: string;
	firstname: string;
	lastname: string;
	email: string;
	city: string;
	district: string;
	postcode: string;
	todo: string;
	done: string;
	modified?: string;
	created?: string;
	status: string;
	model: string;
	make: string;
	year: string;
	serial: string;
	parts?: JobPart[];
	assigned: string;
	labourHours: string;
};

interface JobDetailsFormProps {
	values?: JobFormValuesProp;
	handleChange: any;
}

type JobPart = {
	partName: string;
	partNumber: string;
	partQty: string;
	partPrice: string;
};

interface SinglePartProp {
	part: JobPart;
}
interface JobPartsProp {
	parts?: JobPart[];
	setParts?: any;
}

type DBPart = {
	_id: string;
	partName: string;
	price: string;
	partNumber: string;
	Location: string;
	thumbnail: string;
	supplier: string;
};

interface PartRowPropType {
	part: DBPart;
	key: string;
}
