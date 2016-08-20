module.exports = {
    apply: (dbTable, query) => {
        for (var criterion in query) {
            if (!query.hasOwnProperty(criterion)) {
                continue;
            }
            if (criterion === 'username') {
                dbTable = addUsernameCriteria(dbTable, query[criterion]);
            }
        }
        return dbTable;
    },
}

var addUsernameCriteria = (dbTable, username) => {
    var escaped = username.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    // escaped - any special characters (e.g. '$') are escaped
    // to be used as regexp
    return dbTable.filter(user => {
        return user('username').match('(?i)' + escaped);
    });
};
