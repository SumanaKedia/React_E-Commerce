import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import userPool from './CognitoUserPool';


export const login = async (email, password) => {
    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    });

    const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
    });

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                const token = result.getIdToken().getJwtToken();
                cognitoUser.getUserAttributes((err, attributes) => {
                    if (err) {
                        reject(err);
                    } else {
                        const nameAttribute = attributes.find(attr => attr.Name === 'name');
                        const name = nameAttribute ? nameAttribute.Value : null;
                        resolve({ email, name, token });
                    }
                });
            },
            onFailure: (err) => {
                reject(err);
            },
        });
    });
};

export const register = async (email, password, attributes) => {
    return new Promise((resolve, reject) => {
        userPool.signUp(email, password, attributes, null, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export const confirmRegistration = async (email, code) => {
    const user = new CognitoUser({ Username: email, Pool: userPool });

    return new Promise((resolve, reject) => {
        user.confirmRegistration(code, true, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export const getToken = async () => {
    const cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser) {
        throw new Error('No user is currently logged in.');
    }

    return new Promise((resolve, reject) => {
        cognitoUser.getSession((err, session) => {
            if (err) {
                reject(err);
            } else {
                resolve(session.getIdToken().getJwtToken());
            }
        });
    });
};




export const logout = async () => {

    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
        return new Promise((resolve) => {
            cognitoUser.signOut();

            resolve();
        });
    }
};
