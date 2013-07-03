/**
This is the routes file for a job server, where each action corresponding to the header are defined
**/
var requestHandlers = require('./requestHandlersServer')
, H = require('./models/Header')
, handle = {};


handle[H.REQ] = {};
handle[H.RES] = {};

//handle[H.REQ][1] = undefined; 
//handle[H.RES][2] = undefined;
handle[H.REQ][H.SUBMIT_JOB] = requestHandlers.newJob;
//handle[H.RES][H.JOB_CREATED] = undefined; //To me
handle[H.REQ][H.WORK_AVAILABLE] = requestHandlers.work_available;
//handle[H.RES][H.NO_WORK] = undefined; //RESPONSE TO WORKER
//handle[H.RES][H.WORK_READY] = undefined; //RESPONSE TO WORKER
//handle[H.REQ][H.SUBMIT_WORKLOAD] = undefined; //REQUEST TO WORKER
handle[H.RES][H.WORKLOAD_RECEIVED] = requestHandlers.workload_received;
handle[H.REQ][H.JOB_STATUS_IS] = requestHandlers.job_status;
//handle[H.RES][H.JOB_STATUS] = undefined; //RESPONSE TO BROWSER
handle[H.REQ][H.WORK_STATUS_REQ] = requestHandlers.workload_status_req;
handle[H.RES][H.WORK_STATUS] = requestHandlers.workload_status;
handle[H.RES][H.WORK_COMPLETE] = requestHandlers.workload_status_complete;
handle[H.RES][H.WORK_FAIL] = requestHandlers.workload_status_fail;
handle[H.REQ][H.ECHO_REQ] = requestHandlers.echo_request;
handle[H.RES][H.ECHO_RES] = requestHandlers.echo_response;
handle[H.RES][H.ERROR] = requestHandlers.error;  //ERROR
handle[H.REQ][H.WORKER_SPECS_REQ] = requestHandlers.worker_specs_req; //To this, or worker
handle[H.RES][H.WORKER_SPECS_RES] = requestHandlers.worker_specs_res; //From this, or worker
handle[H.REQ][H.SET_WORKER_OPTS] = requestHandlers.set_worker_opts;
//handle[H.RES][H.SET_WORKER_OPTS_DONE] = undefined;
handle[H.REQ][H.GET_WORKER_OPTS] = requestHandlers.get_worker_opts;
//handle[H.RES][H.GET_WORKER_OPTS_DONE] = undefined;
handle[H.REQ][H.SET_GROUP] = requestHandlers.set_group;
//handle[H.RES][H.SET_GROUP_DONE] = undefined;
handle[H.REQ][H.GET_GROUP] = requestHandlers.get_group;
//handle[H.RES][H.GET_GROUP_DONE] = undefined;
handle[H.REQ][H.WORKER_CONNEC_REQ] = requestHandlers.worker_conec_req;
//handle[H.RES][H.WORKER_CONNEC] = undefined;

handle.lostConnection = requestHandlers.lostConnection;

module.exports = handle;
