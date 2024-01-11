const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID = '649940565348-6kgcrd1ji76u82fpkto7jb60davdu0ma.apps.googleusercontent.com';

const client = new OAuth2Client();

const validarGoogleIdToken = async ( token ) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [
                CLIENT_ID,
                '649940565348-0a9le6e2um23s5odumtiljvbnbha1br6.apps.googleusercontent.com',
                '649940565348-da93grum2s6gad7r519qnnaabcantpoo.apps.googleusercontent.com'
            ],  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        // const userid = payload['sub'];
        console.log(payload.name);
        // If request specified a G Suite domain:
        // const domain = payload['hd']; 
        return {
            name: payload.name,
            picture: payload.picture,
            email: payload.email
        }
    } catch (error) {
        return null;
    }
   
}

module.exports = {
    validarGoogleIdToken
}