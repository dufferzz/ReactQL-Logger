const { jobMutation } = require("./job.mutation");
const { jobQuery } = require("./job.query");
const { jobSubscription } = require("./job.subscription");
const { jobType } = require("./job.type");

module.exports = { jobQuery, jobMutation, jobSubscription, jobType };
