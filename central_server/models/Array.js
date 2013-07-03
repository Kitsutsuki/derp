/**
Simple array extension to easily remove something(s)
**/
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

/**
The arguments global variable apparently slow considerably,
it should be used only when there's multiple things to delete
**/
Array.prototype.singleRemove = function(objectToRemove) {
    if ((index = this.indexOf(objectToRemove)) !== -1) {
        this.splice(index,1);
    }
    return this;
}
