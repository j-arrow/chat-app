const INSERT_SUFFIX = ':INSERT';
const UPDATE_SUFFIX = ':UPDATE';
const DELETE_SUFFIX = ':DELETE';

module.exports = function(socket, entityName) {
    return function(rows) {
        rows.each(function(err, row) {
            if (err) {
                return console.log(err);
            }

            if (row.new_val && !row.old_val) {
                socket.emit(
                    entityName + INSERT_SUFFIX,
                    row.new_val
                );
            } else if (row.new_val && row.old_val) {
                socket.emit(
                    entityName + UPDATE_SUFFIX,
                    row.new_val
                );
            } else if (row.old_val && !row.new_val) {
                socket.emit(
                    entityName + DELETE_SUFFIX,
                    {
                        id: row.old_val.id,
                    }
                );
            }
        });
    };
}
