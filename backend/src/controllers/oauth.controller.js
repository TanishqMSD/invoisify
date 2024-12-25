import asyncHandler from '../utils/asynchandler.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const callback = asyncHandler(async (req, res) => {
    console.log(`Welcome ${JSON.stringify(req.user)}`);
        console.log(`Full name: ${req.user.displayName}`); // Welcome Sameer Suroshe
        console.log(`Email: ${req.user.emails[0].value}`); // Email: sameersuroshe50@gmail.com
        console.log(`Profile Picture: ${req.user.photos[0].value}`); // Profile Picture URL
        console.log(`First Name: ${req.user.name.givenName}`); // First Name: Sameer
        console.log(`Last Name: ${req.user.name.familyName}`); // Last Name: Suroshe

        res.send("Logged in successfully");
});

const loginFailure = asyncHandler(async (req, res) => {
    throw new ApiError(401, "Login Failed");
});

const loginSuccess = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "User Not Authenticated");
    }

    const option = {
        httpOnly: 'true' === process.env.HTTP_ONLY,
        secure: 'true' === process.env.COOKIE_SECURE,
        maxAge: Number(process.env.COOKIE_MAX_AGE),
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Successfully logged in")
    )
});

const profile = asyncHandler(async (req, res) => {
    return res.send(`Welcome ${req.user.displayName}`);
});

export {
    callback,
    loginFailure,
    loginSuccess,
    profile
}