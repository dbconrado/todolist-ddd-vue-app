/**
 * This is a function that encapsulates
 * all the behaviors I've expected the login
 * page to have.
 * @todo this is not as good as I intended too. Need refactoring.
 * @todo the name definitely needs to change.
 *  
 */
export const triesToLogin = ({
    login,
    lockView,
    setProgress,
    onError,
    onSuccess
}) => async ({ username, password }) => {
    lockView(true);
    setProgress(true);
    try {
        
        const res = await login(username, password);
        if (!res.authenticated) {
            onError(res.error);
            lockView(false);
            setProgress(false);
        } else {
            lockView(false);
            setProgress(false);
            onSuccess(res);
        }

    }
    catch (err) {
        lockView(false);
        setProgress(false);
        onError(err.message);
    }
}