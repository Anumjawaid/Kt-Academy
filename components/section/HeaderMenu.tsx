import React, {useEffect} from "react";
import {changeLocaleTo, useLang, useLanguagesList, useTranslations} from "../../src/Translations";
import Link from "../../src/Link";
import {useGlobalState} from "../../src/GlobalState";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {MenuItem} from "@material-ui/core";
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import {UserLoginMenuIcon} from "../component/UserLoginMenuIcon";
import {useRouter} from "next/router";
import Image from 'next/image'

export type LinkTo = {
    text: string,
    to?: string,
    onClick?: () => void,
    divider?: boolean,
    translate?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        customColor: {
            backgroundColor: "white"
        },
        grow: {
            flexGrow: 1,
        },
        flex: {
            display: 'flex'
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'none',
            [theme.breakpoints.between(400, 'sm')]: {
                display: 'flex',
            },
        },
        sectionSmallMobile: {
            display: 'none',
            [theme.breakpoints.down(400)]: {
                display: 'flex',
            },
        },
    })
);

export function HeaderMenu({links, allowedLangs}: { links: LinkTo[], allowedLangs?: string[] }) {
    const t = useTranslations()
    const {user} = useGlobalState()
    const lang = useLang()

    links = links.concat([
        {to: "/workshop", text: t.menu.workshops},
        {to: "/course", text: t.menu.courses, translate: false},
        {to: "/book", text: t.menu.books}
    ])
    const extraLinks = [
        {to: "/music", text: t.menu.music},
        {to: "/generate", text: t.menu.generate},
        {to: "/json", text: t.menu.json}
    ]
    const articlesLink = {to: "/article", text: t.menu.articles}

    const allLinksForMobile = [...links, ...extraLinks, articlesLink]

    const rssLink = {to: lang.rssLink, text: "RSS"}

    const classes = useStyles();

    return <div className={classes.root}>
        <AppBar color="default" className={classes.customColor}>
            <Toolbar>
                <div className={classes.title}>
                    <Link title="Kt. Academy" target="_top" to="/" className="pointer logo-img">
                        <Image className={classes.flex} src={'/images/logo_full.png'}
                               height={70}
                               width={182}
                               quality={100}
                               alt="Kt. Academy Logo"/>
                    </Link>
                </div>

                <div className={classes.grow}/>
                <div className={classes.sectionDesktop}>
                    {links.map(link =>
                        <LinkMenuItem link={link} key={link.text}/>
                    )}

                    <MenuDropdown
                        menuId="mobile-menu"
                        links={extraLinks}
                        icon={(handleMenuOpen) => <MenuItem onClick={handleMenuOpen}>
                            <Link to="" className="nav__icon pointer">{t.menu.tools}</Link>
                        </MenuItem>}
                    />

                    <LinkMenuItem link={articlesLink}/>
                    <RssButton/>
                    <LangFlagIcon allowedLangs={allowedLangs}/>
                    <UserLoginMenuIcon key={user?.id}/>
                </div>
                <div className={classes.sectionMobile}>
                    <MenuDropdown
                        menuId="mobile-menu"
                        links={allLinksForMobile}
                        icon={(handleMobileMenuOpen) =>
                            <IconButton
                                aria-label="show more"
                                aria-controls="menu-mobile"
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit">
                                <MoreIcon/>
                            </IconButton>
                        }
                    />

                    <RssButton/>
                    <LangFlagIcon allowedLangs={allowedLangs}/>
                    <UserLoginMenuIcon key={user?.id}/>
                </div>
                <div className={classes.sectionSmallMobile}>
                    <MenuDropdown
                        menuId="mobile-menu"
                        links={[...allLinksForMobile, rssLink]}
                        icon={(handleMobileMenuOpen) =>
                            <IconButton
                                aria-label="show more"
                                aria-controls="menu-mobile"
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit">
                                <MoreIcon/>
                            </IconButton>
                        }
                    />
                    <LangFlagIcon allowedLangs={allowedLangs}/>
                    <UserLoginMenuIcon key={user?.id}/>
                </div>
            </Toolbar>
        </AppBar>
    </div>
}

const RssButton = () => {
    const lang = useLang()
    return <IconButton color="inherit" style={{
        height: "36px",
        top: "50%",
        margin: "auto",
    }}>
        <a href={lang.rssLink} target="_blank">
            <i className="fa fa-rss" aria-hidden="true" style={{fontSize: "18px", color: "var(--blue-color)"}}/>
        </a>
    </IconButton>;
};

type MenuDropdownProps = {
    menuId: string,
    links: LinkTo[],
    icon: (setAnchorType: any) => any,
    open?: boolean,
    setOpen?: (boolean) => void
}

export function MenuDropdown({menuId, links, icon, open, setOpen}: MenuDropdownProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    useEffect(() => {
        setAnchorEl(open ? document.getElementById(menuId) : null)
    }, [open])
    useEffect(() => {
        if (setOpen) setOpen(!!anchorEl)
    }, [anchorEl])

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const close = () => setAnchorEl(null);

    return <>
        {icon(handleMenuOpen)}
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={!!anchorEl}
            onClose={close}>
            {links.map(link => <LinkMenuItem key={link.text} link={link} dropdown={true} close={close}/>)}
        </Menu>
    </>
}

type LinkMenuItemProps = { link: LinkTo, dropdown?: boolean, close?: () => void };

function LinkMenuItem({link: {text, to, onClick}, dropdown, close}: LinkMenuItemProps) {

    const handleClick = () => {
        if (onClick) onClick();
        if (close) close();
    }

    const style = {
        color: "var(--blue-color)",
        margin: dropdown ? "10px" : 'inherit',
    }

    return <MenuItem onClick={handleClick} component={Link} to={to ?? ""}>
        <span style={style}>{text}</span>
    </MenuItem>
}

export function LangFlagIcon({allowedLangs}: { allowedLangs?: string[] }) {
    const router = useRouter()
    const currentLang = useLang()
    const allLanguages = useLanguagesList().map(it => it.key)

    const changeLocale = () => {
        const languages = allowedLangs ?? allLanguages
        const currentLangIndex = languages.map(it => it.toLowerCase()).indexOf(currentLang.key.toLowerCase()) + 1;
        const nextLang = languages[(currentLangIndex % languages.length)]
        changeLocaleTo(router, nextLang.toLowerCase());
    }

    return <IconButton color="inherit" onClick={changeLocale}>
        <img src={currentLang.flag} alt={currentLang.key} className="flag" height="15"/>
    </IconButton>;
}
