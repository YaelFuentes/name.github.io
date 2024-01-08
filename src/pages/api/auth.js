import { databaseServiceFactory } from "@/core/connection/databaseService"
import { authServiceFactory } from "@/core/connection/authService"
import withSession from "@/lib/session";

const dbService = databaseServiceFactory();
const authService = authServiceFactory();

export default withSession(async (req, res) => {
    const ERROR_CREDENTIALS = "Invalid username and/or password";

    const method = req.method.toLowerCase();
    const { username, password } = req.body;
    
    if (method !== "post") {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const userCredentials = await dbService.getUser(username);
        if (await authService.validate(password, userCredentials.password) === true) {
            await saveSession({username}, userCredentials.mail, req);
            res.status(200).json({username}, userCredentials.mail);
            return;
        }
    } catch (error) {
        console.log(error);
    }
    res.status(403).json({error: ERROR_CREDENTIALS});
})

async function saveSession(user, email, request) {
    request.session.set("user", user);
    request.session.set("email", email);
    await request.session.save();
}