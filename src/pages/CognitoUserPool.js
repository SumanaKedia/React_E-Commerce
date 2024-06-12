import { CognitoUserPool } from "amazon-cognito-identity-js";
import awsConfig from "../awsConfig"; // Adjust the path to awsConfig.js accordingly

const userPool = new CognitoUserPool({
    UserPoolId: awsConfig.userPoolId,
    ClientId: awsConfig.clientId,
    endpoint: `https://cognito-idp.${awsConfig.region}.amazonaws.com/`
});

export default userPool;
