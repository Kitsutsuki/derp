/**
This should have all the parts concerning the handling of the groups
**/
var _ = require('../modules').underscore;

/**
* Group constructor
* @param object Object
*
* @return Group object
*/
function Group(object) {
    this._id = null;
    this.name = 'group_name';
    this.numberWin = 0;
    this.numberLinux = 0;
    this.numberMac = 0;
    this.st_year = 0;
    this.st_month = 0;
    this.st_day = 0;
    this.st_hour = 22;
    this.st_min = 0;
    this.end_year = 0;
    this.end_month = 0;
    this.end_day = 0;
    this.end_hour = 8;
    this.end_min = 0;
    
    // Kind of copy constructor
    if(typeof object === 'object') _.extend(this, object);
};

/**
* Asks the dbManager to save the group
* @param dbManager DBManager object
*/
Group.prototype.save = function(dbManager) {
    dbManager.saveGroup(this);
}

module.exports = Group;