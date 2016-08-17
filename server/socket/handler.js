module.exports =
    (handlers) =>
        (socket, r, connection) => {
            for (var i = 0; i < handlers.length; i++) {
                handlers[i](socket, r, connection);
            }
        };
