//Création d'une base de données fictive

var http = require('http')
, mongoose = require('mongoose');

http.createServer(function(req, res) {
    console.log('Nouveau client');
}).listen(1337);

mongoose.connect('mongodb://localhost/derp', function(err) {
    if(err) { throw err; }
    else { console.log('Connecté à MongoDB'); }
});

//Creation des schémas et des models

var userSchema = new mongoose.Schema({
    _id: Number,
    login: String,
    pass: String,
    status: String,
    jobs: String    
});

var groupSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    numberWin: Number,
    numberLin: Number,
    numberMac: Number,
    st_year: Number,
    st_month: Number,
    st_day: Number,
    st_hour: Number,
    st_min: Number,
    end_year: Number,
    end_month: Number,
    end_day: Number,
    end_hour: Number,
    end_min: Number
});

var workerSchema = new mongoose.Schema({
    _id: Number,
    hostName: String,
    state: String,
    groupName: String,
    workload: String,
    ipAddress: String,
    nbOfCore: Number,
    cpuFrequence: Number,
    RAM: Number,
    os: String,
    archi: Number,
    socket: String
});

var jobSchema = new mongoose.Schema({
    _id: Number,
    path: String,
    winPath: String,
    linPath: String,
    macPath: String,
    owner: String,
    name: String,
    minRam: Number,
    maxRam: Number,
    minCpuFrequence: Number,
    filesCreated: Boolean,
    filesNamePatterns: String,
    isUsingCG: Boolean,
    nbRun: Number,
    archi: Number,
    parametersList: String,
    priority: Number,
    status: String,
    progress: Number,
    dir: String,
    resultFile: String
});

var userModel = mongoose.model('userModel', userSchema);
var groupModel = mongoose.model('groupModel', groupSchema);
var workerModel = mongoose.model('workerModel', workerSchema);
var jobModel = mongoose.model('jobModel', jobSchema);

//Fin de la création des schemas et des models

var job = [];
var worker = [];
var group = [];
var user = [];

for(var i = 0; i <10; i++) {
    
    //Création des entrées de la base de données : Jobs
    job[i] = new jobModel({
        _id: i,
        path: "jobPath" + i,
        winPath: "winPath" + i,
        linPath: "linPath" + i,
        macPath: "macPath" + i,
        owner: "owner" + i,
        name: "jobName" + i,
        minRam: i,
        maxRam: i+256,
        minCpuFrequence: i,
        filesCreated: true,
        filesNamePatterns: "fnp"+i,
        isUsingCG: true,
        nbRun: i,
        archi: 32,
        priority: i,
        status: "pending",
        progress: i*10,
        dir: "dit"+i,
        resultFile: "result" + i,
        parametersList: ["parameters"+i, "parameters"+i+1]
    });
    
    //Création des entrées de la base de données : Workers
    worker[i] = new workerModel({
        _id: i,
        hostName: "name"+i,
        state: "state"+i,
        groupName: "gName"+i,
        workload: "workload"+i,
        ipAddress: "addr"+i,
        nbOfCore: i,
        cpuFrequence: i,
        RAM: i,
        os: "os"+i,
        archi: 32,
        socket: "sock"+i
    });
    
    //Création des entrées de la base de données : Groups
    group[i] = new groupModel({
        _id: i,
        name: "name"+i,
        numberWin: i,
        numberLin: i,
        numberMac: i,
        st_year: 0,
        st_month: 0,
        st_day: 0,
        st_hour: 22,
        st_min: 0,
        end_year: 0,
        end_month: 0,
        end_day: 0,
        end_hour: 8,
        end_min: 0
    });    
    
    //Création des entrées de la base de données : Users
    user[i] = new userModel({
        _id: i,
        login: "login"+i,
        pass: "pass"+1,
        status: "Admin",
        jobs: "jobs"+i
    });
    
    job[i].save(function(err) {
        if(err) { throw err; }
        console.log('job['+i+'] enregistré');
    });
    worker[i].save(function(err) {
        if(err) { throw err; }
        console.log('worker['+i+'] enregistré');
    });
    group[i].save(function(err) {
        if(err) { throw err; }
        console.log('group['+i+'] enregistré');
    });
    user[i].save(function(err) {
        if(err) { throw err; }
        console.log('user['+i+'] enregistré');
    });
    
}