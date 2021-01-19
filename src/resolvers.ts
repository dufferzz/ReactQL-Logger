import { jobResolver } from "./sources/jobs";
import { partResolver } from "./sources/parts";
import { uploadResolver } from "./sources/uploads";

const resolvers = [jobResolver, partResolver, uploadResolver];

export default resolvers;
