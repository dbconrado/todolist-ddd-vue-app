export const triesToLogin = ({
    doLogin,
    lockView,
    setProgress,
    onError,
    next
}) => async ({ username, password }) => {
    lockView(true);
    setProgress(true);
    try {
        
        const res = await doLogin(username, password);
        if (!res.authenticated) {
            onError(res.error || 'Username/password not valid');
        } else {
            lockView(false);
            setProgress(true);
            next(res);
        }

    }
    catch (err) {
        lockView(false);
        setProgress(false);
        onError(err.message);
    }
}