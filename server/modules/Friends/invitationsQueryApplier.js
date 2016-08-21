module.exports = {
    apply: (dbTable, query) => {
        for (var criterion in query) {
            if (!query.hasOwnProperty(criterion)) {
                continue;
            }
            if (criterion === 'type') {
                dbTable = addTypeCriteria(dbTable, query[criterion], query.userId);
            }
        }
        return dbTable;
    },
}

var addTypeCriteria = (dbTable, type, userId) => {
    return dbTable.filter(invitation => {
        var hasSenderId = invitation('senderId').eq(userId);
        var isNotRejected = invitation.hasFields('dateRejected');

        return hasSenderId;
    });
};
