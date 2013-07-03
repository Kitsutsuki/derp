/**
This is the routes file for a worker (test/dev purpose for now), where each action corresponding to the header are defined
**/
var requestHandlers = require('./requestHandlersWorker')
, H = require('../models/Header')
, handle = {};


handle[H.REQ] = {};
handle[H.RES] = {};

//handle[H.REQ][1] = undefined; 
//handle[H.RES][2] = undefined;
//handle[H.REQ][H.SUBMIT_JOB] = undefined;
//handle[H.RES][H.JOB_CREATED] = undefined;
//handle[H.REQ][H.WORK_AVAILABLE] = requestHandlers.work_available;
handle[H.RES][H.NO_WORK] = requestHandlers.noWork;
handle[H.RES][H.WORK_READY] = requestHandlers.workReady; //RESPONSE TO WORKER
handle[H.REQ][H.SUBMIT_WORKLOAD] = requestHandlers.submitWorkload; //REQUEST TO WORKER
//handle[H.RES][H.WORKLOAD_RECEIVED] = requestHandlers.workload_received;
handle[H.REQ][H.JOB_STATUS_IS] = requestHandlers.jobStatus;
//handle[H.RES][H.JOB_STATUS] = undefined; //RESPONSE TO BROWSER
handle[H.REQ][H.WORK_STATUS_REQ] = requestHandlers.workload_status_req;
//handle[H.RES][H.WORK_STATUS] = requestHandlers.workload_status;
//handle[H.RES][H.WORK_COMPLETE] = requestHandlers.workload_status_complete;
//handle[H.RES][H.WORK_FAIL] = requestHandlers.workload_status_fail;
handle[H.REQ][H.ECHO_REQ] = requestHandlers.echo_request;
handle[H.RES][H.ECHO_RES] = requestHandlers.echo_response;
handle[H.RES][H.ERROR] = requestHandlers.error;  //ERROR
handle[H.REQ][H.WORKER_SPECS_REQ] = requestHandlers.workerSpecsReq; //To this, or worker
//handle[H.RES][H.WORKER_SPECS_RES] = requestHandlers.worker_specs_res; //From this, or worker
//handle[H.REQ][H.SET_WORKER_OPTS] = requestHandlers.set_worker_opts;
//handle[H.RES][H.SET_WORKER_OPTS_DONE] = undefined;
//handle[H.REQ][H.GET_WORKER_OPTS] = requestHandlers.get_worker_opts;
//handle[H.RES][H.GET_WORKER_OPTS_DONE] = undefined;
//handle[H.REQ][H.SET_GROUP] = requestHandlers.set_group;
//handle[H.RES][H.SET_GROUP_DONE] = undefined;
//handle[H.REQ][H.GET_GROUP] = requestHandlers.get_group;
//handle[H.RES][H.GET_GROUP_DONE] = undefined;
//handle[H.REQ][H.WORKER_CONNEC_REQ] = requestHandlers.worker_conec_req;
handle[H.RES][H.WORKER_CONNEC] = requestHandlers.workerConecRes;

module.exports = handle;
