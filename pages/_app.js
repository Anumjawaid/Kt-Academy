import '../styles/globals.css'
import '../styles/Header.css'
import '../styles/TrustedBySection.css'
import '../styles/WorkhopFormStyle.css'
import '../styles/Music.css'
import 'react-tippy/dist/tippy.css'
import {GlobalStateWrapper} from "../src/GlobalState";
import Head from "next/head";

function MyApp({Component, pageProps}) {
    return <GlobalStateWrapper>
        <Head>
            <meta charSet="UTF-8"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <link rel="shortcut icon" href="/logo.png"/>

            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="theme-color" content="#137cb9"/>
            <script src="https://apis.google.com/js/api:client.js"/>

            {/*DELETE IT ALL TOGETHER*/}
            <script src="/js/jquery-3.5.1.js"/>
            <script src="https://learningdriven.fun/assets/js/js.cookie.min.js"/>
            <script src="https://learningdriven.fun/assets/js/uuid.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"/>
            {/***/}

            {/*Pinterest*/}
            <meta name="p:domain_verify" content="d544a1bcfd15d514119c212f86dafb80"/>

            <script async src="https://www.googletagmanager.com/gtag/js?id=G-5RCMMHTMYF"/>
            <script dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-5RCMMHTMYF');
            `
            }}/>

            {/*Leadinfo tracking code*/}
            <script dangerouslySetInnerHTML={{
                __html: `
        (function(l,e,a,d,i,n,f,o){if(!l[i]){l.GlobalLeadinfoNamespace=l.GlobalLeadinfoNamespace||[]; l.GlobalLeadinfoNamespace.push(i);l[i]=function(){(l[i].q=l[i].q||[]).push(arguments)};l[i].t=l[i].t||n; l[i].q=l[i].q||[];o=e.createElement(a);f=e.getElementsByTagName(a)[0];o.async=1;o.src=d;f.parentNode.insertBefore(o,f);} }(window,document,"script","https://cdn.leadinfo.net/ping.js","leadinfo","LI-609CF0F70BD8C"));
        `
            }}/>

            <link rel="stylesheet"
                  href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
                  integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
                  crossOrigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"/>
            <link rel="stylesheet" href="/css/animate.css"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <script src="https://unpkg.com/kotlin-playground@1" data-selector=".kotlin-code"/>

            {/*For React-Math*/}
            <link href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css" rel="stylesheet"/>
        </Head>
        <Component {...pageProps} />
    </GlobalStateWrapper>
}

export default MyApp
