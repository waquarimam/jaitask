module.export= {
    success(data, status,  message = '' )
    {
        return {data: data, status: status, message: message , success: true};
    },
    error(errorType, errorMessage, status)
    {
        return { type : errorType, message: errorMessage, status: status, success: false };
    }
}