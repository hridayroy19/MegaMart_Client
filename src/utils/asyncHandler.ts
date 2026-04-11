/* eslint-disable @typescript-eslint/no-explicit-any */
export const asyncHandler = async <T>(
    promise: Promise<any>,
    rejectWithValue: (value: string) => any
): Promise<T | any> => {
    try {
        const res = await promise;
        return res.data.data || res.data; // Adjust based on your API response
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || "Request failed"
        );
    }
};
