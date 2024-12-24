import asyncHandler from '../utils/asynchandler.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const check = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, {}, "Working fine!")
    )
});

export {
    check
}