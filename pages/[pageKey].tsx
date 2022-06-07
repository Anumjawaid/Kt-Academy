import React from 'react';
import {makeStaticPathsWithLocales, makeStaticProps} from "../src/Utils";
import GenericPage, {GenericPageData} from "../components/page/GenericPage";

export async function getStaticProps({params, locale}) {
    const pagesWithKey = PAGES.filter(p => p.key === params.pageKey)
    const page = pagesWithKey.find(p => p.lang === locale) ?? pagesWithKey[0] ?? PAGE_NOT_FOUND
    return makeStaticProps({page})
}

export async function getStaticPaths({locale}) {
    return makeStaticPathsWithLocales(PAGES.map(w => ({pageKey: w.key})))
}

export default function TextualPage({page}: { page: GenericPageData }) {
    return <GenericPage page={page}/>
};

const PAGE_NOT_FOUND: GenericPageData =
    {
        key: "not_found",
        lang: "en",
        pageTitle: 'Page not found',
        pageDescription: `Page not found`,
        sections: [
            {
                type: "text",
                text: "Sorry, but page not found"
            },
        ]
    }

const PAGES: GenericPageData[] = [
    PAGE_NOT_FOUND,
    {
        key: "podajdalej",
        lang: "pl",
        pageTitle: 'Akcja "Podaj dalej"',
        pageDescription: `Strona akcji "Podaj dalej"`,
        imgSrc: "/images/baner_podaj_dalej.png",
        sections: [
            {
                type: "intro",
                title: 'Akcja "Podaj dalej"',
                description: `
Cześć, z tej strony autor książki [JavaScript od podstaw](/pl/book/js). Napisałem ją, by dzielić się i pomagać w rozpowszechnianiu wiedzy na temat programowania. Nie każdy może pozwolić sobie na kolejny wydatek, więc chciałbym, by była ona dostępna za darmo, dla każdego. Dlatego też wszystkie jej części dostępne są jako [artykuły](https://kt.academy/pl/book/js#articles).

Z książką chciałbym jednak dotrzeć przede wszystkim do osób, które same nie wyszukają takiej wiedzy w internecie. Czy to dlatego, że nie wiedzą jak to zrobić, czy to przez przekonania utrudniające postawienie pierwszego kroku. Dlatego zdecydowałem się ufundować 1000 książek w wersji "Podaj dalej".

Mam nadzieję, że będą one krążyć między ludźmi i jak najwięcej osób będzie mogło z nich skorzystać. Liczę na to, że już niedługo jedna z nich trafi także w Twoje ręce. 

Poniżej szczegółowe informacje dotyczące akcji. 
            `,
                imgSrc: "/images/js_podajdalej.png"
            },
            {
                type: "text",
                key: "goal",
                imgSrc: "/images/baner_podaj_dalej.png",
                text: `
## O co chodzi w akcji?

Akcja "Podaj dalej", w ramach której razem z ambasadorami rozdam 1000 książek ze specjalną etykietą "Podaj dalej" - oznaczającą, że po przeczytaniu książki należy przekazać ją następnej osobie. 
To pierwsza taka akcja prospołeczna. 

Książka "JavaScript od podstaw" pisana była specjalnie z myślą o tej akcji. 
Przedstawia użyteczne podstawy JavaScript w przystępny sposób (jako dobry wstęp), a potem pokazuje do czego można wykorzystać zdobytą wiedzę oraz jak kontynuować naukę. 
Prezentuje różne, nowoczesne (także darmowe) metody nauki programowania: od interaktywnych kursów, aż po gry programistyczne. 
Liczę na to, że otworzy ona oczy wielu osobom na naukę programowania. 
        `
            },
            {
                type: "text",
                key: "who",
                text: `
## Dla kogo? 

Książka jest skierowana do każdego, kto chce zacząć swoją przygodę z programowaniem. W czasie rozdawania nie wykluczam nikogo. Każdą osobę informuję jednak, że nie dostaje tej książki na zawsze, i że powinna niedługo przekazać ją następnej osobie. 
        `
            },
            {
                type: "text",
                key: "dates",
                text: `
## Harmonogram

W ramach akcji, planuję koleje tury rozdawania książek:

* 9.08.2021 - 13.08.2021 (każdego dnia), godz. 13:00-13:30, Warszawa, ul. Nowy Świat 15/17, pod Empikiem
* 16.08.2021 - 20.08.2021 (każdego dnia), godz. 13:00-13:30, Warszawa, pod Galerią Mokotów (wejście główne)
* 21.08.2021 (sobota), godz. 13:00- 13:30, Warszawa, ul. Nowy Świat 15/17, pod Empikiem
* 23.08.2021 - 25.08.2021 (każdego dnia), godz. 13:00-13:30, Warszawa, Metro Ratusz Arsenał (pod pomnikiem Stefana Starzyńskiego)
* 6.09.2021, godz. 17:30-17:45, Warszawa, Metro Pole Mokotowskie, pod Zieloną Gęsią (al. Niepodległości 177)
* 27.09.2021, godz. 17:30-17:45, Warszawa, Metro Pole Mokotowskie, pod Zieloną Gęsią (al. Niepodległości 177)

Wszystkie zmiany ogłaszane będą na [moim polskim Twitterze](https://twitter.com/MarcinMoskalaPL) oraz wprowadzane będą do tego grafiku.

Do osób z innych miast: liczę, że książka w wersji "Podaj dalej" dotrze do Was dzięki ambasadorom. W przyszłości chciałbym także wysłać paczki do szkół i bibliotek.
`
            },
            {
                type: "video",
                title: "Filmy z rozdawania książek",
                videoKeys: ["GBmTHqODtsg", "aj4n8zIm7aI"],
            },
            {
                type: "text",
                key: "patrons",
                text: `
## Patroni i ambasadorzy akcji

Patronami akcji zostali:
* Allegro
* ZnanyLekarz
* Bulldogjob
* Pro Progressio
* Magazyn Programista
* [Twoje Miasto](https://twoje-miasto.pl/)
* [Mądre Książki](http://madreksiazki.org/)

W akcję włączyli się również Ambasadorzy. Wspierają oni projekt oraz dbają o to, by książki dotarły do osób, które na nich skorzystają.

Ambasadorami zostali między innymi:

* Mirosław Zelent z kanału [Pasja Informatyki](https://www.youtube.com/user/MiroslawZelent)
* Kamil Brzeziński z [Jak nauczyć się programowania](https://www.youtube.com/channel/UCxFUKrMr2RNOUm8jztlKCAA)
* Marcin Czarkowski z podcastu [Przeprogramowani](https://anchor.fm/przeprogramowani)
* Aleksandra Miśtak z [4developers](https://4developers.org.pl)
* Krzysztof Piersa [KrzysztofPiersa](http://krzysztofpiersa.pl)
* Mateusz Kupilas z podcastu [Retrospektywa.com](https://open.spotify.com/show/2xM0IjcFx5OHaYIgu0CfDh?si=IqplL1DaSeGfFqgO947-KQ&nd=1)
* Krzysztof Kempiński z [Porozmawiajmy o IT](https://porozmawiajmyoit.pl/)
* Artur Molendowski z podcastu [Chwila dla Admina](https://chwiladlaadmina.pl/)
* Mateusz Michalski z kanału [Zaprogramuj życie](https://www.youtube.com/c/Zaprogramuj%C5%BBycie/)

i wielu innych. 
        `
            },
            {
                type: "text",
                key: "why",
                text: `
## Skąd pomysł?

Jestem programistą, ale przede wszystkim pasjonatem wiedzy i uczenia się. Dawniej dostęp do nauki programowania nie był taki łatwy, dzisiaj wiedza jest na wyciągnięcie ręki (głównie w internecie). Wielu jednak wciąż nie zdaje sobie z tego sprawy. Chciałbym więc zbudować most, wyjść do ludzi by pokazać, że nauka programowania może być przydatna, oraz wskazać drogę jak tę ścieżkę (możliwie bezkosztowo) kontynuować. 
        `
            },
            {
                type: "text",
                key: "kta",
                text: `
## Czym jest Kt. Academy?

Kt. Academy to firma, którą założyłem pierwotnie by prowadzić własne szkolenia. Z czasem nawiązałem kontakty z innymi trenerami, a obecnie firma zrzesza różnych świetnych i wykwalifikowanych nauczycieli programowania. Kiedy więc pomyślałem o projekcie książki "JavaScript od podstaw", naturalnym stało się wydanie jej przy współpracy z  Kt. Academy. Na stronach Kt. Academy znajdują się kolejne części książki w formie ogólnodostępnych, bezpłatnych artykułów.         `
            },
            {
                type: "text",
                key: "media",
                text: `
## Paczka dla mediów

- [Brief informacji prasowej](https://docs.google.com/document/d/1QdRxY3o03ieqAtpkaOXwside3xMnpdqM1nwSiiwdUoE/edit)
- [Brief artykułu](https://docs.google.com/document/d/17jq-LUwJjZHt9SIk4IGrd_lWxCU2iKHX__1bolpZc54/edit)
- [Ciekawe dane i statystyki](https://docs.google.com/document/d/1obg_SjjoIOScNwyRWlCIyRaNQ9h5D6WUHcsMJ7Iy5Tc/edit)
- [Zdjęcia z akcji](https://photos.app.goo.gl/YA2biYcW7EyChA1p8)
- Filmy z rozdawania: [Pierwszy](https://www.youtube.com/watch?v=GBmTHqODtsg) i [drugi](https://www.youtube.com/watch?v=aj4n8zIm7aI). 
- Banner poziomy: [PNG](/images/baner_podaj_dalej.png), [PDF](/images/baner_podaj_dalej.pdf)
- Banner pionowy: [PNG](/images/baner_podaj_dalej_pion.png), [PDF](/images/baner_podaj_dalej_pion.pdf)
- [Rozdział *Przyszłość programowania*](/images/przyszlosc_programowania.pdf)
- [Rozdziały o nauce programowania](/images/jak_nauczyc_sie_js.pdf)
- [Instrukcja dla ambasadorów akcji](/instrukcja_podaj_dalej.pdf)
- **Hasło akcji**: Podaj Dalej Programowanie
- **Hashtag**:  **#podajdalejprogramowanie**
`
            },
            {
                type: "updates",
                updates: [
                    {
                        title: "1500 egzemplarzy książki od Allegro!",
                        date: "16 Sie 2021",
                        text: "Nasz ambasador Allegro ufundowało 1500 egzemplarzy typu \"Podaj dalej\". Serdecznie dziękujemy, niech wiedza krąży!",
                    },
                    {
                        title: "Już jest!",
                        date: "3 Sie 2021",
                        text: "Nareszcie dotarła! Teraz wyślemy ją do hurtowni, i wreszcie możemy zacząć dzielić się egzemplarzami typu \"Podaj dalej\".",
                    },
                    {
                        title: "Książka wysłana do druku",
                        date: "14 Lip 2021",
                        text: "Książka poszła do druku w Mazowieckim Centrum Poligrafii i liczymy na to, że już niedługo będziemy mogli ją odebrać i zacząć rozdawać.",
                    },
                    {
                        title: "Podcast Przeprogramowani",
                        date: "26 Cze 2021",
                        text: "Autor książki wystąpił w [podcast Przeprogramowani](https://www.youtube.com/watch?v=TXxuha3IfXI). Rozmawiał między innymi o akcji \"Podaj dalej Programowanie\".",
                    },
                ]
            }
        ]
    },
    {
        key: "otwartewyklady",
        lang: "pl",
        pageTitle: 'Czwartki z programowaniem w ramach akcji Podaj dalej programowanie',
        pageDescription: `Strona wykładów Czwartki z programowaniem realizowanych w ramach akcji Podaj dalej programowanie`, // TODO
        imgSrc: "/images/czwartki_z_programowaniem.jpg",
        sections: [
            {
                type: "intro",
                title: 'Czwartki z programowaniem w ramach akcji Podaj dalej programowanie',
                description: `
W ramach akcji Podaj dalej programowanie organizujemy cykl wykładów przy współpracy
z samorządami warszawskich uczelni SGH i UW. Do eventu zostali zaproszeni programiści
i entuzjaści programowania, którzy podzielą się wiedzą i najlepszymi praktykami w tematach takich jak m.in:

 - Podstawy programowania w różnych językach.
 - Podstawy Sztucznej Inteligencji czy wykorzystanie Pythona w uczeniu maszynowym.
 - Warsztat z wykorzystaniem płytek Arduino.
 - Bezpieczeństwo aplikacji.
 - Podstawy Wordpressa.
 
i wiele więcej.
                `,
                imgSrc: "/images/czwartki_z_programowaniem.jpg"
            },
            {
                type: "text",
                key: "podajdalej",
                imgSrc: "/images/baner_podaj_dalej.png",
                text: `
## O akcji Podaj dalej programowanie

Prowadzimy ogólnopolską akcję prospołeczną Podaj dalej programowanie. Jej celem jest edukacja i zachęta do nauki programowania dla osób rozpoczynających swoją przygodę z tym tematem.To pierwsza taka akcja prospołeczna.

W ramach akcji wydaliśmy książkę JavaScript od podstaw, zacznij swoją przygodę z programowaniem autorstwa Marcina Moskały. Książka została napisana specjalnie z myślą o tej akcji. Razem z ambasadorami w wielu polskich miastach rozdaliśmy 2500 takich książek ze specjalną etykietą "Podaj dalej" - oznaczającą, że po przeczytaniu książki należy przekazać ją następnej osobie. 
`
            },
            {
                type: "text",
                key: "audience",
                text: `
## Dla Kogo?

Dla każdego od wieku licealnego wzwyż, zainteresowanego nowoczesnymi technologiami i programowaniem. Prelegenci dostosowują tematy przede wszystkim do osób początkujących.
`
            },
            {
                type: "text",
                key: "localizations",
                text: `
## Lokalizacje

Wykłady odbywać się będą w następujących lokalizacjach:

 - Wydział Fizyki Uniwersytetu Warszawskiego, Ludwika Pasteura 5, 02-093 Warszawa
 - Wydział Chemii Uniwersytetu Warszawskiego, Ludwika Pasteura 1, 02-093 Warszawa
 - Szkoła Główna Handlowa, al. Niepodległości 162, 02-554 Warszawa

Dla osób spoza Warszawy, planujemy streaming wykładów on-line. 
        `
            },
            {
                type: "text",
                key: "timetable",
                text: `
## Harmonogram

Przewidziany jest następujący harmonogram wykładów:
 - *Jak nie dać się zhackować - #cyberbezpieczeństwo*, Damian Wróblewski, na UW Fizyka, 07.10.2021 - godz. 18.30
 - ...
        `
            },
            {
                type: "text",
                key: "timetable",
                text: `
## Harmonogram

Przewidziany jest następujący harmonogram wykładów:
 - *Jak nie dać się zhackować - #cyberbezpieczeństwo*, Damian Wróblewski, na UW Fizyka, 07.10.2021 - godz. 18.30
 - ...
        `
            },
            {
                type: "text",
                key: "partners",
                text: `
#### Sponsorzy

 - Allegro Tech
 
#### Patroni medialni

 - Bulldogjob
 
#### Organizatorzy

 - Kt.Academy
 - Wydziałowa Rada Studentów Fizyki Uniwersytetu Warszawskiego pod przewodnictwem Michała Chrzanowskiego
 - Wydziałowa Rada Studentów Chemii Uniwersytetu Warszawskiego przy wsparciu Piotra Łętowskiego
 - Samorząd Studencki Szkoły Głównej Handlowej w Warszawie pod przewodnictwem Wojciecha Godlewskiego
        `
            },
            {
                type: "talks",
                title: "Harmonogram",
                talks: [
                    {
                        title: "Jak nie dać się zhackować - #cyberbezpieczeństwo",
                        description: `Włamania na konto, kradzież tożsamości, żądania okupu (ransomware), oszustwa na Facebooku czy OLX - to codzienność w mojej pracy.
To także codzienność wielu osób, które każdego dnia padają ofiarą działań cyberprzestępców.
Wbrew pozorom to nie tylko osoby starsze lub mało zorientowane w technologii.

Wiele przypadków dotyczy studentów. 

Przestępcy stają są coraz bardziej aktywni (dynamicznie rośnie liczba ataków) i pomysłowi (co tydzień pojawia się nowa metoda oszustwa). 

Jeśli chcesz być na bieżąco z najnowszymi zagrożeniami oraz metodami obrony, nie przegap wykładu:

  "Jak nie dać się zhackować" #cyberbezpieczeństwo

W jego trakcie dowiesz się:
Dowiesz się czym są "silne" hasła oraz jak ich używać
Dowiesz się, jak naprawdę chronić Twoją prywatność (mimo aktywności na Facebooku). 
Bezpiecznie sprzedawać i kupować w Internecie`,
                        speaker: {
                            name: "Damian Wróblewski",
                            imgSrc: "/images/DamianWroblewski.jpg",
                            link: "#DamianWroblewski"
                        }
                    }
                ],
            }
//             {
//                 type: "text",
//                 key: "media",
//                 text: `
// ## Paczka dla mediów
//
// - [Brief informacji prasowej](https://docs.google.com/document/d/1QdRxY3o03ieqAtpkaOXwside3xMnpdqM1nwSiiwdUoE/edit)
// - [Brief artykułu](https://docs.google.com/document/d/17jq-LUwJjZHt9SIk4IGrd_lWxCU2iKHX__1bolpZc54/edit)
// - [Ciekawe dane i statystyki](https://docs.google.com/document/d/1obg_SjjoIOScNwyRWlCIyRaNQ9h5D6WUHcsMJ7Iy5Tc/edit)
// - [Zdjęcia z akcji](https://photos.app.goo.gl/YA2biYcW7EyChA1p8)
// - Filmy z rozdawania: [Pierwszy](https://www.youtube.com/watch?v=GBmTHqODtsg) i [drugi](https://www.youtube.com/watch?v=aj4n8zIm7aI).
// - Banner poziomy: [PNG](/images/baner_podaj_dalej.png), [PDF](/images/baner_podaj_dalej.pdf)
// - Banner pionowy: [PNG](/images/baner_podaj_dalej_pion.png), [PDF](/images/baner_podaj_dalej_pion.pdf)
// - [Rozdział *Przyszłość programowania*](/images/przyszlosc_programowania.pdf)
// - [Rozdziały o nauce programowania](/images/jak_nauczyc_sie_js.pdf)
// - [Instrukcja dla ambasadorów akcji](/instrukcja_podaj_dalej.pdf)
// - **Hasło akcji**: Podaj Dalej Programowanie
// - **Hashtag**:  **#podajdalejprogramowanie**
// `
//             },
//             {
//                 type: "updates",
//                 updates: [
//                     {
//                         title: "1500 egzemplarzy książki od Allegro!",
//                         date: "16 Sie 2021",
//                         text: "Nasz ambasador Allegro ufundowało 1500 egzemplarzy typu \"Podaj dalej\". Serdecznie dziękujemy, niech wiedza krąży!",
//                      },
//                      {
//                         title: "Już jest!",
//                         date: "3 Sie 2021",
//                         text: "Nareszcie dotarła! Teraz wyślemy ją do hurtowni, i wreszcie możemy zacząć dzielić się egzemplarzami typu \"Podaj dalej\".",
//                     },
//                     {
//                         title: "Książka wysłana do druku",
//                         date: "14 Lip 2021",
//                         text: "Książka poszła do druku w Mazowieckim Centrum Poligrafii i liczymy na to, że już niedługo będziemy mogli ją odebrać i zacząć rozdawać.",
//                     },
//                     {
//                         title: "Podcast Przeprogramowani",
//                         date: "26 Cze 2021",
//                         text: "Autor książki wystąpił w [podcast Przeprogramowani](https://www.youtube.com/watch?v=TXxuha3IfXI). Rozmawiał między innymi o akcji \"Podaj dalej Programowanie\".",
//                     },
//                 ]
//             }
        ]
    }
]

