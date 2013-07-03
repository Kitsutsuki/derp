var Header = require('../models/Header');

function noWork(client, data) {
    console.log('noWork');
}

function workReady(client, data) {
}

function submitWorkload(client, data) {
}

function jobStatus(client, data) {
}

function workloadStatusReq(client, data) {
}

function echoRequest(client, data) {
}

function echoResponse(client, data) {
}

function error(client, data) {
}

function workerSpecsReq(client, data) {
    console.log('received worker specs req !',data);
    //TODO Need a model for a worker ... worker side
    //rep worker specs or something ...
    var header = new Header(Header.RES,Header.WORKER_SPECS_RES);
    var finalB = header.appendHeader(
        '{'hostname':'Sinewyk-Worker','nbOfCore':'2','os':'Windows 7','RAM':'16252928','ipAddress':'192.168.1.4'}');
    client.write(finalB,'binary',function() {
        console.log('Finished workerSpecsRes :\n'+finalB.toString());
    });
}

function workerConecRes(client, data) {
    console.log('Connected, need to send specs ...');
    //TODO auto specs launch or wait for specs request ?
    //To chose or not to chose ...
}

module.exports.noWork = noWork;
module.exports.workReady = workReady;
module.exports.submitWorkload = submitWorkload;
module.exports.jobStatus = jobStatus;
module.exports.workloadStatusReq = workloadStatusReq;
module.exports.echoRequest = echoRequest;
module.exports.echoResponse = echoResponse;
module.exports.error = error;
module.exports.workerConecRes = workerConecRes;
module.exports.workerSpecsReq = workerSpecsReq;
