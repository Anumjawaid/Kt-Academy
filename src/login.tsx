import {User} from "./Model";
import Swal from "sweetalert2";
import {NEWSLETTER_NAME, registerUser, requestAllowNewsletter, requestSignOutUser} from "./Network";

declare global {
    const gapi: any
}

export async function loginWithOneTap(setUser: (user: User | null) => void, setLoginMenuOpen: (boolean) => void) {
    const options = {
        client_id: '835056603764-mg5hkv6l94tbfubod8mjgjvaing4makt.apps.googleusercontent.com',
    }

    googleOneTap(options, async (response: { credential: string }) => {
        let user = await registerUser(response.credential ?? getGoogleUserToken(response))
        setUser(user)
        if (!hasNewsletter(user)) {
            if (await showAllowNewsletterPopup()) {
                user = await requestAllowNewsletter(true)
            }
        }
        setUser(user)
        await setLoginMenuOpen(true)
    })
}

function googleOneTap({client_id, auto_select = false, cancel_on_tap_outside = false, context = 'signin'}, callback) {
    const contextValue = ['signin', 'signup', 'use'].includes(context) ? context : 'signin';
    const googleScript = document.createElement('script');
    googleScript.setAttribute('src', 'https://accounts.google.com/gsi/client');
    document.head.appendChild(googleScript)
    window.onload = function () {
        if (client_id) {
            // @ts-ignore
            window.google.accounts.id.initialize({
                client_id: client_id,
                callback: callback,
                auto_select: auto_select,
                cancel_on_tap_outside: cancel_on_tap_outside,
                context: contextValue
            });
            // @ts-ignore
            window.google.accounts.id.prompt();
        } else {
            console.error('client_id is missing');
        }
    };
}

function hasNewsletter(userData) {
    return userData.newsletters.includes(NEWSLETTER_NAME)
}

async function showAllowNewsletterPopup(): Promise<boolean> {
    return Swal.fire({
        title: 'Newsletter',
        html:
            'Would you like to receive updates from ' + name + ' on your email?',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        allowOutsideClick: false,
        imageUrl: 'https://learningdriven.fun/assets/images/cat_paws.gif',
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'Custom image',
        confirmButtonText:
            '<i class="fa fa-thumbs-up"/> OK',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
            '<i class="fa fa-thumbs-down"/>',
        cancelButtonAriaLabel: 'Thumbs down'
    }).then((result) => !!result.value)
}

export function signOutFromGoogle(setUser: (user: (User | null)) => void) {
    const auth2 = gapi.auth2.getAuthInstance()
    if (auth2 !== null) {
        auth2.signOut().then(function () {
            setUser(null)
        })
    } else {
        setUser(null)
    }
}

export function getGoogleUserToken(googleUser) {
    if (googleUser.getAuthResponse && googleUser.getAuthResponse().id_token) {
        return googleUser.getAuthResponse().id_token
    } else if (googleUser.credential) {
        return googleUser.credential
    } else if (googleUser.id_token) {
        return googleUser.id_token
    } else {
        return googleUser
    }
}

export function registerGoogleSignInButton(
    fabLogin: string,
    setUser: (User) => void,
    onLoggedIn: () => void = () => {}
) {
    gapi.load('auth2', function () {
        const auth2 = gapi.auth2.init({
            client_id: '835056603764-mg5hkv6l94tbfubod8mjgjvaing4makt.apps.googleusercontent.com',
            cookiepolicy: 'none',
        });
        auth2.attachClickHandler(document.getElementById(fabLogin), {}, googleUser =>
            registerUser(getGoogleUserToken(googleUser)) // should be googleUser.getAuthResponse().id_token
                .then((user) => {
                    setUser(user)
                    onLoggedIn()
                }))
    }, error => {
        console.log(error);
    });
}

export function showRemoveAccountPopup(): Promise<boolean> {
    return Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to remove your account? You won't be able to revert this! All your comments will become anonymous.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(res => !!res.value)
}

export async function signOutHandle(setUser: (user: (User | null)) => void) {
    await requestSignOutUser();
    signOutFromGoogle(setUser);
}

