interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    };
}

export function signIn(): Promise<Response> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'afsdfasdfkmsdofjasdkfnasdfjasdansdf',
                user: {
                    name: 'willian',
                    email: 'wsilvadev@gmail.com',
                },
            });
        }, 2000);
    });
}
