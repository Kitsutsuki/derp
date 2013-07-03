/**
* Header object constructor
* @param type String Should be either '\0REQ' or '\0RES'
* @param num Number See protocols
* @param size Number Size of the data after the header
*
* @return Header object
*/
function Header(type, num, size) {
    if(typeof type === 'undefined') this.type = null;
    else this.type = type;
    if(typeof num === 'undefined') this.num = null;
    else this.num = num;
    if(typeof size === 'undefined') this.size = 0;
    else this.size = size;
}

/**
* Parse the Buffer, and fill the Header object with the correct informations
* @param buffer Buffer object
*
* @return String
*/
Header.prototype.parseHeader = function(buffer) {
    if(buffer.length >= 12) {
        this.type = buffer.toString('utf8', 0, 4);
        this.num = buffer.readInt32BE(4);
        //Check if little endian or big endian
        if(typeof this.num === 'number' && this.num > 1000) {
            this.num = buffer.readInt32LE(4);
            this.size = buffer.readInt32LE(8);
        }
        else {
            this.size = buffer.readInt32BE(8);
        }
        if( !(
            (this.type === '\0REQ' || this.type === '\0RES') &&
            typeof this.num === 'number' &&
            typeof this.size === 'number')
        ) return false;
    }
    else {
        return false;
    }
    return true;
}

/**
* Generate and returns the Buffer corresponding to the header
* @return Buffer object
*/
Header.prototype.createHeader = function() {
    var buffer = new Buffer(12);
    buffer.write(this.type);
    buffer.writeInt32BE(this.num, 4);
    buffer.writeInt32BE(this.size, 8);
    return buffer;
}

/**
* Append the header to the data
* @param data Buffer object
*
* @return Buffer object
*/
Header.prototype.appendHeader = function(data) {
    if(data.__proto__ === Buffer.prototype) {
        this.size = data.length;
        var headerBuffer = this.createHeader();
        data = Buffer.concat(Array(headerBuffer, data), headerBuffer.length+data.length);
        return data;
    }
    else {
        this.size = data.toString().length;
        var tmpBuffer = new Buffer(this.size);
        tmpBuffer.write(data.toString());
        var headerBuffer = this.createHeader();
        data = Buffer.concat(Array(headerBuffer, tmpBuffer), headerBuffer.length+tmpBuffer.length);
        return data;
    }
}

/**
* toString() function
* @return String
*/
Header.prototype.toString = function() { return 'Type:'+this.type+' #'+this.num+' Size:'+this.size;}

module.exports = Header;
/**
Constants definition of header values
**/
module.exports.REQ = '\0REQ';
module.exports.RES = '\0RES';
module.exports.SUBMIT_JOB = 3;
module.exports.JOB_CREATED = 4;
module.exports.WORK_AVAILABLE = 5;
module.exports.NO_WORK = 6;
module.exports.WORK_READY = 7;
module.exports.SUBMIT_WORKLOAD = 8;
module.exports.WORKLOAD_RECEIVED = 9;
module.exports.JOB_STATUS_IS = 10;
module.exports.JOB_STATUS = 11;
module.exports.WORK_STATUS_REQ = 12;
module.exports.WORK_STATUS = 13;
module.exports.WORK_COMPLETE = 14;
module.exports.WORK_FAIL = 15;
module.exports.ECHO_REQ = 16;
module.exports.ECHO_RES = 17;
module.exports.ERROR = 18;
module.exports.WORKER_SPECS_REQ = 19;
module.exports.WORKER_SPECS_RES = 20;
module.exports.SET_WORKER_OPTS = 21;
module.exports.SET_WORKER_OPTS_DONE = 22;
module.exports.GET_WORKER_OPTS = 23;
module.exports.GET_WORKER_OPTS_DONE = 24;
module.exports.SET_GROUP = 25;
module.exports.SET_GROUP_DONE = 26;
module.exports.GET_GROUP = 27;
module.exports.GET_GROUP_DONE = 28;
module.exports.WORKER_CONNEC_REQ = 29;
module.exports.WORKER_CONNEC = 30;
