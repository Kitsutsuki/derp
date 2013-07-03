/**
This is the routes file, where each action corresponding to the header are defined
**/
var requestHandlers = require('./requestHandlers')
, handle = new Array();

handle['\0REQ'] = new Array();
handle['\0RES'] = new Array();

//handle['\0REQ'][1] = undefined; 
//handle['\0RES'][2] = undefined;
handle['\0REQ'][3] = requestHandlers.newJob;
//handle['\0RES'][4] = undefined; //To me
handle['\0REQ'][5] = requestHandlers.work_available;
//handle['\0RES'][6] = undefined; //RESPONSE TO WORKER
//handle['\0RES'][7] = undefined; //RESPONSE TO WORKER
//handle['\0REQ'][8] = undefined; //REQUEST TO WORKER
handle['\0RES'][9] = requestHandlers.workload_received;
handle['\0REQ'][10] = requestHandlers.job_status;
//handle['\0RES'][11] = undefined; //RESPONSE TO BROWSER
handle['\0REQ'][12] = requestHandlers.workload_status;
handle['\0RES'][13] = requestHandlers.workload_status_is;
handle['\0RES'][14] = requestHandlers.workload_status_complete;
handle['\0RES'][15] = requestHandlers.workload_status_fail;
handle['\0REQ'][16] = requestHandlers.echo_request;
handle['\0RES'][17] = requestHandlers.echo_response;
handle['\0RES'][18] = requestHandlers.error;  //ERROR
handle['\0REQ'][19] = requestHandlers.worker_specs_req; //To this, or worker
handle['\0RES'][20] = requestHandlers.worker_specs_res; //From this, or worker
handle['\0REQ'][21] = requestHandlers.set_worker_opts;
//handle['\0RES'][22] = undefined;
handle['\0REQ'][23] = requestHandlers.get_worker_opts;
//handle['\0RES'][24] = undefined;
handle['\0REQ'][25] = requestHandlers.set_group;
//handle['\0RES'][26] = undefined;
handle['\0REQ'][27] = requestHandlers.get_group;
//handle['\0RES'][28] = undefined;
handle['\0REQ'][29] = requestHandlers.worker_conec_req;
//handle['\0RES'][30] = undefined;

module.exports = handle;