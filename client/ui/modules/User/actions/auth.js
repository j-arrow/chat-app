export const REGISTER = 'auth:REGISTER';
export const LOG_IN = 'auth:LOG_IN';
export const LOG_OUT = 'auth:LOG_OUT';

export const register = (registrationData) => ({
    type: REGISTER,
    username: registrationData.username,
    password: registrationData.password,
    repeatPassword: registrationData.repeatPassword,
});

export const logIn = (data) => ({
    type: LOG_IN,
    username: data.username,
    sessionId: data.sessionId,
});

export const logOut = () => ({
    type: LOG_OUT,
});
