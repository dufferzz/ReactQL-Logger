type Job = {
	_id: string;
	firstname: string;
	parts: Part[];
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

interface Jobs {
	job: Job[];
}

interface JobPropType {
	job: Job;
}
interface StatusType {
	status?: string;
}

type ID = {
	id: string;
};

type StatusImage = {
	image: string;
	status?: string;
};

type Values = {
	_id?: string | undefined;
	firstname: string;
	lastname: string;
	email: string;
	city: string;
	district: string;
	postcode: string;
	todo: string;
	done: string;
	modified?: string;
	created?: string | undefined;
	status: string;
	model: string;
	make: string;
	year: string;
	serial: string;
	parts?: Part[];
	assigned: string;
	labourHours: string;
};

interface IProps {
	values?: Values;
	handleChange: any;
}

type Part = {
	partName: string;
	partNumber: string;
	partQty: string;
	partPrice: string;
};

interface PartPropType {
	part: Part;
}
interface JobPartsProp {
	parts?: Part[];
	setParts?: any;
}
