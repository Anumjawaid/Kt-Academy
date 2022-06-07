import {useTranslations} from "../../src/Translations";
import {useGlobalState} from "../../src/GlobalState";
import {isAdmin, User} from "../../src/Model";
import React, {useEffect} from "react";
import {loginWithOneTap, registerGoogleSignInButton, showRemoveAccountPopup, signOutFromGoogle, signOutHandle } from "../../src/login";
import IconButton from "@material-ui/core/IconButton";
import {AccountCircle} from "@material-ui/icons";
import {LinkTo, MenuDropdown} from "../section/HeaderMenu";
import {NEWSLETTER_NAME, requestAllowNewsletter, requestDeleteUser} from "../../src/Network";
import {useFeedbackPopup} from "../../src/Popups";
import {isBrowser} from "../../src/Utils";

export function UserLoginMenuIcon() {
    const t = useTranslations()
    const {user, setUser} = useGlobalState()
    const admin = isAdmin(user)
    const [loginMenuOpen, setLoginMenuOpen] = React.useState<boolean>(false);
    const showFeedbackPopup = useFeedbackPopup("menu") // TODO: Use real key

    const newsletterName = "KT_ACADEMY";
    const profileLinks: LinkTo[] = [
        {text: t.menu.profile.me, to: "/user/edit/me"},
        ...(isBrowser() && user && user.publicKey ? [{text: "Public profile", to: `/user/${user.publicKey}`}] : []),
        ...(
            admin ? [
                {text: "Users", to: "/admin/users"},
                {text: "Submissions", to: "/admin/workshopSubmissions"},
                {text: "Statistics", to: "/admin/statistics"},
                {text: "Article Statistics", to: "/admin/articleStatistics"},
                {text: "Workshops", to: "/admin/workshop"},
            ] : []
        ),
        {text: t.menu.profile.sendFeedback, onClick: () => showFeedbackPopup()},
        ...(
            user && user.newsletters.includes(newsletterName) ?
                [{text: t.menu.profile.newsletterOff, onClick: () => setAllowNewsletter(false, user, setUser)}]
                : [{text: t.menu.profile.newsletterOn, onClick: () => setAllowNewsletter(true, user, setUser)}]
        ),
        {text: t.menu.profile.removeAccount, onClick: () => deleteUserHandle(setUser)},
        {text: t.menu.profile.signOut, onClick: () => signOutHandle(setUser)},
    ]

    return !user ?
        <LogInIconButton setLoginMenuOpen={setLoginMenuOpen}/>
        : <MenuDropdown
            menuId="profile-menu"
            links={profileLinks}
            open={loginMenuOpen}
            setOpen={setLoginMenuOpen}
            icon={(handleProfileOpen) =>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls='menu'
                    aria-haspopup="true"
                    onClick={handleProfileOpen}
                    color="inherit">
                    <img src={user.imageUrl} alt={user.displayName} className="flag" height="30"
                         style={{borderRadius: "50%"}}/>
                </IconButton>
            }
        />
}

function setAllowNewsletter(allow: boolean, user: User, setUser: (User) => void) {
    if (allow) {
        user.newsletters.push(NEWSLETTER_NAME)
    } else {
        user.newsletters = user.newsletters.filter(it => it !== NEWSLETTER_NAME)
    }
    setUser(user)
    requestAllowNewsletter(allow)
}

function LogInIconButton({setLoginMenuOpen}: { setLoginMenuOpen: (boolean) => void }) {
    let fabLoginId = "fab_login";

    const {user, setUser} = useGlobalState()

    useEffect(() => {
        registerGoogleSignInButton(fabLoginId, setUser, () => setLoginMenuOpen(true));
    }, [])

    useEffect(() => {
        if (!user) {
            loginWithOneTap(setUser, setLoginMenuOpen)
        }
    }, [])

    const handleClick = () => {
        document.getElementById(fabLoginId).click();
    }

    return <IconButton
        onClick={handleClick}
        id={fabLoginId}
        edge="end"
        aria-label="account of current user"
        aria-controls='menu'
        aria-haspopup="true"
        color="inherit">
        <AccountCircle />
    </IconButton>;
}

async function deleteUserHandle(setUser: (User) => void) {
    const accepted = await showRemoveAccountPopup()
    if (accepted) {
        await requestDeleteUser();
        signOutFromGoogle(setUser);
    }
}

