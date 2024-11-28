import userModel from '../models/user.model.js';

export default async function createUser({
    firstname, lastname, email, password
}) {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }

    // Assuming userModel.create is the correct method to insert a user into the DB
    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });

    return user;
}
