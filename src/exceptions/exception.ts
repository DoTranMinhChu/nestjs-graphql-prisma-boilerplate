
export const EXCEPTION = {
    // DEFUALT DATABASE
    RECORD_NOT_FOUND: {
        message: 'Record Not Found.',
        exceptionCode: 10000,
    },

    // DEFUALT AUTH
    UNAUTHORIZED: {
        message: 'Unauthorized.',
        exceptionCode: 10001,
    },
    YOU_NOT_PERMISSIONS: {
        message: 'You are not permissions.',
        exceptionCode: 10002,
    },
    TOKEN_EXPIRED: {
        message: 'Token Expried.',
        exceptionCode: 10003,
    },
    USER_BLOCK: {
        message: 'User Blocked.',
        exceptionCode: 10004,
    },
    BAD_TOKEN: {
        message: 'Bad Token.',
        exceptionCode: 10005,
    },

    // DEFUALT ROUTER
    SORRY_SOMETHING_WENT_WRONG: {
        message: 'Sorry! Something went wrong.',
        exceptionCode: 10006,
    },
    THE_API_NOT_SUPPORTED: {
        message: 'The API is not supported.',
        exceptionCode: 10007,
    },
    BAD_REQUEST: {
        message: 'Bad Request.',
        exceptionCode: 10008,
    },
    // Auth
    USERNAME_DOES_NOT_EXIST: {
        message: "Username does not exist.",
        codeNumber: 20001
    },
    THIS_ACCOUNT_IS_APPLE: {
        message: "This account is an account logged in through APPLE.",
        codeNumber: 20002
    },
    THIS_ACCOUNT_IS_PHONE: {
        message: "This account is an account logged in through PHONE.",
        codeNumber: 20003
    },
    THIS_ACCOUNT_IS_NAVER: {
        message: "This account is an account logged in through NAVER.",
        codeNumber: 20004
    },
    THIS_ACCOUNT_IS_KAKAOTALK: {
        message: "This account is an account logged in through KAKAOTALK.",
        codeNumber: 20005
    },
    THIS_ACCOUNT_IS_GOOGLE: {
        message: "This account is an account logged in through GOOGLE.",
        codeNumber: 20006
    },
    THIS_ACCOUNT_IS_INAPP: {
        message: "This account is an account logged in through username and password.",
        codeNumber: 20007
    },
    USERNAME_ALREADY_REGISTERED: {
        message: "Username already registered.",
        codeNumber: 20008
    },
    PASSWORD_OR_USERNAME_INCORRECT: {
        message: "Password or username incorrect.",
        codeNumber: 20009
    },
    LOGIN_METHOD_NOT_SUPPORTED: {
        message: "This login method is not supported.",
        codeNumber: 20010
    },
    ACCOUNT_NOT_FOUND: {
        message: "This account could not be found.",
        codeNumber: 20011
    },
    ACCOUNT_HAS_BEEN_DELETED: {
        message: 'This account has been deleted. Check back with your manager.',
        exceptionCode: 20012,
    },
    ACCOUNT_HAS_BEEN_BLOCKED: {
        message: 'This account has been blocked.',
        exceptionCode: 20013,
    },
    ACCOUNT_DOES_NOT_EXIST: {
        message: 'Account does not exist.',
        exceptionCode: 20014,
    }

}