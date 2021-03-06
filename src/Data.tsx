import {Lang, useTranslations} from "./Translations";
import React, {useMemo} from "react";
import {Book} from "./Model";

export type WorkshopCategory = {
    icon: string,
    title: string,
    desc: string,
    tag: string,
}

export function useWorkshopCategories(): WorkshopCategory[] {
    const t = useTranslations();

    return useMemo(() => {
        return [
            {
                title: t.workshopOffer.kotlinTitle,
                desc: t.workshopOffer.kotlinDesc,
                tag: "kotlin",
                icon: "kotlin-icon"
            },
            {
                title: t.workshopOffer.dataScienceTitle,
                desc: t.workshopOffer.dataScienceDesc,
                tag: "datascience",
                icon: "fas fa-robot"
            },
            {
                title: t.workshopOffer.bestPracticesTitle,
                desc: t.workshopOffer.bestPracticesDesc,
                tag: "bestpractices",
                icon: "fas fa-rocket"
            },
            {
                title: t.workshopOffer.frontendTitle,
                desc: t.workshopOffer.frontendDesc,
                tag: "machinelearning",
                icon: "fas fa-robot-astromech"
            },
            {
                title: t.workshopOffer.frontendTitle,
                desc: t.workshopOffer.frontendDesc,
                tag: "frontend",
                icon: "fab fa-js"
            },
            {
                title: t.workshopOffer.androidTitle,
                desc: t.workshopOffer.androidDesc,
                tag: "android",
                icon: "fab fa-android"
            },
            {
                title: t.workshopOffer.beginnersTitle,
                desc: t.workshopOffer.beginnersDesc,
                tag: "beginners",
                icon: "fas fa-chalkboard"
            },
            {
                title: t.workshopOffer.testingTitle,
                desc: t.workshopOffer.testingDesc,
                tag: "testing",
                icon: "fas fa-vial"
            },
            {
                title: t.workshopOffer.dotNetTitle,
                desc: t.workshopOffer.dotNetDesc,
                tag: ".NET",
                icon: "dotNet-icon"
            },
        ]
    }, [t])
}

const JS_BOOK: Book = {
    key: "js",
    locale: Lang.PL,
    articleSeries: "JS_OD_PODSTAW",
    title: "JavaScript od podstaw",
    imageUrl: "/images/js.png",
    description: `
Ta ksi????ka zacznie Twoj?? przygod?? z programowaniem. Prezentuje wiedz?? w praktyczny, przyst??pny i zrozumia??y spos??b. 
Pomaga zbudowa?? solidne podwaliny pod nauk?? JavaScript oraz wytyczy?? dalszy kierunek. Je??li chcesz nauczy?? si?? 
programowania albo zastanawia Ci?? czym ono jest, to jest to ksi????ka dla Ciebie.

Razem z t?? ksi????k?? wejdziesz krok po kroku do ??wiata JavaScript. Poka??e Ci, ??e programowanie to ??wietna zabawa, a 
przy tym znacznie bardziej przydatna i dost??pna umiej??tno???? ni?? mo??e si?? wydawa??.
`,
    shortDescription: "Ksi????ka pomagaj??ca wej???? w ??wiat programowania od j??zyka JavaScript. Zach??ca i pokazuje jak uczy?? si?? skutecznie.",
    actions: [
        {text: "Allegro", href: "https://allegro.pl/oferta/javascript-od-podstaw-10973192038"},
        {text: "Ebook na LeanPub", href: "https://leanpub.com/javascript_od_podstaw/"},
        {text: "Rozdzia??y jako artyku??y", href: "#articles", social: true},
        {text: "Grupa na Facebook", href: "https://www.facebook.com/groups/javascriptodpodstaw", social: true},
        {text: "Twitter Kt. Academy PL", href: "https://twitter.com/ktdotacademyPL", social: true},
    ],
    sections: [
        {
            type: "text",
            key: "audience",
            text: `
# Dla kogo jest ta ksi????ka?

To jest ksi????ka dla ka??dego, kto chce nauczy?? si?? programowania. Zamierzam obali?? stereotypy i udowodni??, ??e zar??wno 53-letnia nauczycielka, 42-letni taks??wkarz, jak i 12-letnie ucze?? s?? w stanie z niej skorzysta??. Zak??adam wy????cznie do??wiadczenie w korzystaniu z komputera i internetu, a reszt?? postaram si?? wyja??ni??.

To nie jest ksi????ka dla os??b, kt??re ju?? potrafi?? programowa?? w innym j??zyku. T??umaczy wszystko od zupe??nych podstaw. Nie powinna by?? traktowana jako podr??cznik akademicki. U??ywane s??ownictwo upro??ci??em, a poj??cia zdefiniowa??em w spos??b nieformalny. Oczywi??cie, stara??em si?? zachowa?? maksimum poprawno??ci, ale przede wszystkim podstawi??em na zrozumia??o???? i praktyczno????.
        `
        },
        {
            type: "text",
            key: "structure",
            text: `
# O ksi????ce
    
Ksi????ka podzielona jest na cztery cz????ci:
1. *To co najwa??niejsze w JavaScript* ??? gdzie zaczynamy nasz?? przygod?? z programowaniem i poznajemy najistotniejsze funkcjonalno??ci tego j??zyka.
2. *G????bsze wody* - gdzie wyjdziemy poza podstawy i zaczniemy omawia?? bardziej zaawansowane funkcjonalno??ci j??zyka.
3. *Napiszmy razem gr??* - gdzie wykorzystamy zdobyte umiej??tno??ci do napisania gry.
4. *O programowaniu* - gdzie pom??wimy o wykorzystaniu tych umiej??tno??ci, o nauce programowania i o bran??y programistycznej.
        `
        },
        {
            type: "text",
            key: "whatYouLearn",
            text: `
# Czego nauczysz si?? z tej ksi????ki?

Ta ksi????ka nie wystarczy by nauczy?? si?? programowania. Nie wiem czy istnieje taka, kt??ra by wystarczy??a. To tak jakby??my chcieli si?? z jednej ksi????ki nauczy?? j??zyka fi??skiego od zupe??nych podstaw. Je??li jednak sumiennie przyst??pisz do nauki z tej ksi????ki (przyk??ad??w, zada??), to sko??czysz z wiedz?? wystarczaj??c?? by wykorzystywa?? JavaScript w prostych zastosowaniach. 

Z tej ksi????ki dowiesz si??:
- czym s?? zmienne i warto??ci,
- jak u??ywa?? warunk??w i p??tli,
- jak dzia??aj?? funkcje,
- o najwa??niejszych elementach programowania obiektowego i funkcyjnego,
- jak napisa?? gr?? Pong,
- jak wykorzysta?? zdobyt?? wiedz??  w praktyce,
- jak kontynuowa?? nauk??.
        `
        },
        {
            type: "text",
            key: "podajdalej",
            text: `
# Akcja "Podaj dalej"

Ksi????ce towarzyszy akcja spo??eczna "Podaj dalej". Wi??cej na ten temat akcji znajdziesz na [stronie akcji](https://kt.academy/podajdalej). 
        `
        },
        {
            type: "text",
            key: "toc",
            text: `
# Spis tre??ci

- Wst??p

## Cz?????? 1: To, co najwa??niejsze w JavaScript
### Pierwszy program
- Przegl??darka
- U??ywanie konsoli
- Edytory Online
- Komentarze
- Instrukcje, ??redniki i bia??e znaki
### Podstawowe warto??ci
- Teksty, znane jako stringi
- Liczby
- Warto??ci logiczne: prawda i fa??sz
- Operator r??wno??ci i nier??wno??ci
- Operatory por??wnania dla liczb
- Typy warto??ci
### Zmienne
- const i let
- Nazywanie zmiennych
- Przypisanie rozszerzaj??ce warto???? zmiennej
- Zmienne wskazuj?? na warto??ci
- Zmienne niezdefiniowane i warto???? undefined
- Warto???? null
### Warunki
- Instrukcja warunkowa if
- Wywo??anie warunkowe z alternatyw?? if-else
- If-else-if
- Operator warunkowy
### Wyra??enia logiczne
- Operator i &&
- Operator lub ||
- Operator negacji !
- Czytanie wyra??e?? logicznych
- Warto??ci falsy i truthy
- Zwracanie warto??ci przez && i ||
### P??tle
- P??tla while
- P??tla for
### Funkcje
- Wydzielanie cz????ci kodu
- Jak dzia??aj?? funkcje?
- Odnoszenie si?? do element??w spoza funkcji
- Parametry i argumenty funkcji
- Wynik funkcji
- Funkcje matematyczne
- Funkcje jako warto??ci

## Cz?????? 2: G????bsze wody
### Obiekty
- Definicja obiektu
- Obiekt jako w??a??ciwo????
- Modyfikowanie obiekt??w
- Dodawanie w??a??ciwo??ci
- Brakuj??ce w??a??ciwo??ci
- Format zapisu danych JSON
### Elementy programowania obiektowego
- Metody, czyli funkcje jako w??a??ciwo??ci
- Operator new
- Klasy
### Tablice
- Tworzenie tablic
- Dodawanie i wyci??ganie element??w
- Odnoszenie si?? do element??w tablicy
- ### Iteracja po tablicy
- Funkcja forEach
- Funkcja map
- Funkcja join
- Inne metody tablicy warte poznania
### Funkcje strza??kowe
- Przydatno???? funkcji strza??kowych
- Ograniczenia funkcji strza??kowych

## Cz?????? 3: Napiszmy razem gr??
### Daj mi p????tno, a namaluj?? ??wiat
- P????tno, czyli HTML canvas
- Pierwszy rysunek
- Paletka
- Tekst
- Pi??eczka
- Czyszczenie p????tna
- ### Stan oraz sta??e
- Sta??e
- Stan
- Zmiana stanu
### Przejmujemy sterowanie
- Ruch paletki
- Zatrzymanie paletki
- Blokowanie na skrajach
- Pauzowanie
- ### Lot pi??eczki
- Pi??eczka wraca na ??rodek
- Pi??eczka odbija si?? od ??cianek
- Pi??eczka odbija si?? od paletek
### Porz??dkujemy nasz?? gr??, wykorzystuj??c podej??cie obiektowe
- Pi??eczka jako obiekt
- Gracze i paletki jako obiekty
- Pozycja paletki
- Obiektowe rysowanie pi??eczki i paletek
- U??ycie klas

## Cz?????? 4: O programowaniu
### Co mo??na robi?? w JavaScript?
- Tworzenie stron internetowych
- Pisanie gier
- Aplikacje na telefony i komputery
- Pisanie bot??w
- Skrypty w Google Docs, Google Sheets i Google Slides
- Prezentacje
- Aplikacje serwerowe
- Wizualizacja danych
- Uczenie maszynowe
- Robotyka
- Muzyka, efekty wizualne, sztuka
- Hakowanie stron
- Wiele wi??cej...
### Jak nauczy?? si?? programowania?
- Kursy internetowe
- Akademickie kursy internetowe
- Nauka programowania na YouTube
- Ksi????ki
- Podcasty
- Bootcampy i kursy na ??ywo
- Mentoring
### Gry w s??u??bie programowania
### Nauka programowania na telefonie
- Kursy do nauki programowania na telefonie
- Platformy do kurs??w dost??pne na telefonie
- Gry programistyczne na telefonie
### Jak zosta?? programist???
- Geneza planu
- Dla kogo jest ten plan?
- Ile zajmuje przej??cie tej ??cie??ki?
- Plan w 7 krokach
### Przysz??o???? programowania
- Liczba programist??w jest du??a
- Liczba programist??w szybko ro??nie
- Specjalizacja post??puje, czyli bycie programist?? jak kiedy?? in??ynierem
- Programowanie u??atwia wiele zawod??w, mo??e u??atwia?? niemal ka??dy
- Przysz??o???? programowania
### Rozwi??zania do ??wicze??
### S??owniczek
        `
        },
    ],
    authorKey: "marcinmoskala",
    updates: [
        {
            title: "Ksi????ka w przedsprzeda??y na Allegro!",
            date: "3 Sie 2021",
            text: "Ksi????k?? ju?? mo??na kupi?? na [Allegro](https://allegro.pl/oferta/javascript-od-podstaw-10973192038). Zostanie wys??ana 7 Sierpnia 2021.",
        },
        {
            title: "Ju?? jest!",
            date: "3 Sie 2021",
            text: "Wreszcie dotar??a! Teraz wy??lemy j?? do hurtowni oraz wreszcie mo??emy zacz???? dzieli?? si?? egzemplarzami typu \"Podaj dalej\".",
        },
        {
            title: "Ksi????ka wys??ana do druku",
            date: "14 Lip 2021",
            text: "Ksi????ka posz??a do druku w Mazowieckim Centrum Poligrafii i liczymy na to, ??e ju?? nie d??ugo b??dziemy mogli j?? odebra?? i zacz???? rozdawa??.",
        },
        {
            title: "Podcast Przeprogramowani",
            date: "26 Cze 2021",
            text: "Autor ksi????ki wyst??pi?? w [podcast Przeprogramowani](https://www.youtube.com/watch?v=TXxuha3IfXI). Rozmawia?? mi??dzy innymi o ksi????ce.",
        },
    ]
}

const PY_BOOK: Book = {
    key: "py",
    locale: Lang.PL,
    articleSeries: "PYTHON_OD_PODSTAW",
    title: "Python od podstaw",
    imageUrl: "/images/python_od_podstaw.png",
    description: `
Ta ksi????ka zacznie Twoj?? przygod?? z programowaniem. Prezentuje wiedz?? w praktyczny, przyst??pny i zrozumia??y spos??b. 
Pomaga zbudowa?? solidne podwaliny pod nauk?? j??zyka Python oraz wytyczy?? dalszy kierunek. Je??li chcesz nauczy?? si?? 
programowania albo zastanawia Ci?? czym ono jest, to jest to ksi????ka dla Ciebie.

Razem z t?? ksi????k?? wejdziesz krok po kroku do ??wiata Python. Poka??e Ci, ??e programowanie to ??wietna zabawa, a 
przy tym znacznie bardziej przydatna i dost??pna umiej??tno???? ni?? mo??e si?? wydawa??.
`,
    shortDescription: "Ksi????ka pomagaj??ca wej???? w ??wiat programowania od j??zyka Python. Zach??ca i pokazuje jak uczy?? si?? skutecznie.",
    actions: [
        // {text: "Allegro", href: "https://allegro.pl/oferta/javascript-od-podstaw-10973192038"},
        // {text: "Ebook na LeanPub", href: "https://leanpub.com/javascript_od_podstaw/"},
        {text: "Rozdzia??y jako artyku??y", href: "#articles", social: true},
        {text: "Grupa na Facebook", href: "https://www.facebook.com/groups/javascriptodpodstaw", social: true},
        {text: "Twitter Kt. Academy PL", href: "https://twitter.com/ktdotacademyPL", social: true},
    ],
    sections: [
        {
            type: "text",
            key: "audience",
            text: `
# Dla kogo jest ta ksi????ka?

To jest ksi????ka dla ka??dego, kto chce nauczy?? si?? programowania. Zamierzam obali?? stereotypy i udowodni??, ??e zar??wno 53-letnia nauczycielka, 42-letni taks??wkarz, jak i 12-letnie ucze?? s?? w stanie z niej skorzysta??. Zak??adam wy????cznie do??wiadczenie w korzystaniu z komputera i internetu, a reszt?? postaram si?? wyja??ni??.

To nie jest ksi????ka dla os??b, kt??re ju?? potrafi?? programowa?? w innym j??zyku. T??umaczy wszystko od zupe??nych podstaw. Nie powinna by?? traktowana jako podr??cznik akademicki. U??ywane s??ownictwo upro??ci??em, a poj??cia zdefiniowa??em w spos??b nieformalny. Oczywi??cie, stara??em si?? zachowa?? maksimum poprawno??ci, ale przede wszystkim podstawi??em na zrozumia??o???? i praktyczno????.
        `
        },
        {
            type: "text",
            key: "structure",
            text: `
# O ksi????ce
    
Ksi????ka podzielona jest na pi???? cz????ci:
1. *To co najwa??niejsze w Python* ??? gdzie zaczynamy nasz?? przygod?? z programowaniem i poznajemy najistotniejsze funkcjonalno??ci tego j??zyka.
2. *G????bsze wody* - gdzie wyjdziemy poza podstawy i zaczniemy omawia?? bardziej zaawansowane funkcjonalno??ci j??zyka.
3. *Napiszmy razem gr??* - gdzie wykorzystamy zdobyte umiej??tno??ci do napisania klasycznej gry w w????a.
4. *Praktyczne projekty* - gdzie prezentujemy kilka kluczowych zastosowa?? j??zyka Python - do analizy danych, uczenia maszynowego, klienta do popularnego portalu Twitter oraz bota zbieraj??cego dane ze strony. 
5. *O programowaniu* - gdzie pom??wimy o wykorzystaniu tych umiej??tno??ci, o nauce programowania i o bran??y programistycznej.
        `
        },
        {
            type: "text",
            key: "whatYouLearn",
            text: `
# Czego nauczysz si?? z tej ksi????ki?

Ta ksi????ka nie wystarczy by nauczy?? si?? programowania. Nie wiem czy istnieje taka, kt??ra by wystarczy??a. To tak jakby??my chcieli si?? z jednej ksi????ki nauczy?? j??zyka fi??skiego od zupe??nych podstaw. Je??li jednak sumiennie przyst??pisz do nauki z tej ksi????ki (przyk??ad??w, zada??), to sko??czysz z wiedz?? wystarczaj??c?? by wykorzystywa?? Python w prostych zastosowaniach. 

Z tej ksi????ki dowiesz si??:
- czym s?? zmienne i warto??ci,
- jak u??ywa?? warunk??w i p??tli,
- jak dzia??aj?? funkcje,
- jak u??ywa?? klas,
- jak dzia??aj?? tablice oraz jak je przekszta??ca??,
- czym s?? operatory i jak je nadpisywa??,
- jak importowa?? i instalowa?? pakiety,
- jak napisa?? gr?? W????,
- jak wykorzysta?? zdobyt?? wiedz??  w praktyce,
- jak kontynuowa?? nauk??.
        `
        },
//         {
//             type: "text",
//             key: "podajdalej",
//             text: `
// # Akcja "Podaj dalej"
//
// Ksi????ce towarzyszy akcja spo??eczna "Podaj dalej". Wi??cej na ten temat akcji znajdziesz na [stronie akcji](https://kt.academy/podajdalej).
//         `
//         },
//         {
//             type: "text",
//             key: "toc",
//             text: `
// # Spis tre??ci
//
// - Wst??p
//
// ## Cz?????? 1: To, co najwa??niejsze w Python
// ### Pierwszy program
// - Przegl??darka
// - U??ywanie konsoli
// - Edytory Online
// - Komentarze
// - Instrukcje, ??redniki i bia??e znaki
// ### Podstawowe warto??ci
// - Teksty, znane jako stringi
// - Liczby
// - Warto??ci logiczne: prawda i fa??sz
// - Operator r??wno??ci i nier??wno??ci
// - Operatory por??wnania dla liczb
// - Typy warto??ci
// ### Zmienne
// - const i let
// - Nazywanie zmiennych
// - Przypisanie rozszerzaj??ce warto???? zmiennej
// - Zmienne wskazuj?? na warto??ci
// - Zmienne niezdefiniowane i warto???? undefined
// - Warto???? null
// ### Warunki
// - Instrukcja warunkowa if
// - Wywo??anie warunkowe z alternatyw?? if-else
// - If-else-if
// - Operator warunkowy
// ### Wyra??enia logiczne
// - Operator i &&
// - Operator lub ||
// - Operator negacji !
// - Czytanie wyra??e?? logicznych
// - Warto??ci falsy i truthy
// - Zwracanie warto??ci przez && i ||
// ### P??tle
// - P??tla while
// - P??tla for
// ### Funkcje
// - Wydzielanie cz????ci kodu
// - Jak dzia??aj?? funkcje?
// - Odnoszenie si?? do element??w spoza funkcji
// - Parametry i argumenty funkcji
// - Wynik funkcji
// - Funkcje matematyczne
// - Funkcje jako warto??ci
//
// ## Cz?????? 2: G????bsze wody
// ### Obiekty
// - Definicja obiektu
// - Obiekt jako w??a??ciwo????
// - Modyfikowanie obiekt??w
// - Dodawanie w??a??ciwo??ci
// - Brakuj??ce w??a??ciwo??ci
// - Format zapisu danych JSON
// ### Elementy programowania obiektowego
// - Metody, czyli funkcje jako w??a??ciwo??ci
// - Operator new
// - Klasy
// ### Tablice
// - Tworzenie tablic
// - Dodawanie i wyci??ganie element??w
// - Odnoszenie si?? do element??w tablicy
// - ### Iteracja po tablicy
// - Funkcja forEach
// - Funkcja map
// - Funkcja join
// - Inne metody tablicy warte poznania
// ### Funkcje strza??kowe
// - Przydatno???? funkcji strza??kowych
// - Ograniczenia funkcji strza??kowych
//
// ## Cz?????? 3: Napiszmy razem gr??
// ### Daj mi p????tno, a namaluj?? ??wiat
// - P????tno, czyli HTML canvas
// - Pierwszy rysunek
// - Paletka
// - Tekst
// - Pi??eczka
// - Czyszczenie p????tna
// - ### Stan oraz sta??e
// - Sta??e
// - Stan
// - Zmiana stanu
// ### Przejmujemy sterowanie
// - Ruch paletki
// - Zatrzymanie paletki
// - Blokowanie na skrajach
// - Pauzowanie
// - ### Lot pi??eczki
// - Pi??eczka wraca na ??rodek
// - Pi??eczka odbija si?? od ??cianek
// - Pi??eczka odbija si?? od paletek
// ### Porz??dkujemy nasz?? gr??, wykorzystuj??c podej??cie obiektowe
// - Pi??eczka jako obiekt
// - Gracze i paletki jako obiekty
// - Pozycja paletki
// - Obiektowe rysowanie pi??eczki i paletek
// - U??ycie klas
//
// ## Cz?????? 4: O programowaniu
// ### Co mo??na robi?? w JavaScript?
// - Tworzenie stron internetowych
// - Pisanie gier
// - Aplikacje na telefony i komputery
// - Pisanie bot??w
// - Skrypty w Google Docs, Google Sheets i Google Slides
// - Prezentacje
// - Aplikacje serwerowe
// - Wizualizacja danych
// - Uczenie maszynowe
// - Robotyka
// - Muzyka, efekty wizualne, sztuka
// - Hakowanie stron
// - Wiele wi??cej...
// ### Jak nauczy?? si?? programowania?
// - Kursy internetowe
// - Akademickie kursy internetowe
// - Nauka programowania na YouTube
// - Ksi????ki
// - Podcasty
// - Bootcampy i kursy na ??ywo
// - Mentoring
// ### Gry w s??u??bie programowania
// ### Nauka programowania na telefonie
// - Kursy do nauki programowania na telefonie
// - Platformy do kurs??w dost??pne na telefonie
// - Gry programistyczne na telefonie
// ### Jak zosta?? programist???
// - Geneza planu
// - Dla kogo jest ten plan?
// - Ile zajmuje przej??cie tej ??cie??ki?
// - Plan w 7 krokach
// ### Przysz??o???? programowania
// - Liczba programist??w jest du??a
// - Liczba programist??w szybko ro??nie
// - Specjalizacja post??puje, czyli bycie programist?? jak kiedy?? in??ynierem
// - Programowanie u??atwia wiele zawod??w, mo??e u??atwia?? niemal ka??dy
// - Przysz??o???? programowania
// ### Rozwi??zania do ??wicze??
// ### S??owniczek
//         `
//         },
    ],
    authorKey: "marcinmoskala",
    updates: [
        // {
        //     title: "Ksi????ka w przedsprzeda??y na Allegro!",
        //     date: "3 Sie 2021",
        //     text: "Ksi????k?? ju?? mo??na kupi?? na [Allegro](https://allegro.pl/oferta/javascript-od-podstaw-10973192038). Zostanie wys??ana 7 Sierpnia 2021.",
        // },
        // {
        //     title: "Ju?? jest!",
        //     date: "3 Sie 2021",
        //     text: "Wreszcie dotar??a! Teraz wy??lemy j?? do hurtowni oraz wreszcie mo??emy zacz???? dzieli?? si?? egzemplarzami typu \"Podaj dalej\".",
        // },
        // {
        //     title: "Ksi????ka wys??ana do druku",
        //     date: "14 Lip 2021",
        //     text: "Ksi????ka posz??a do druku w Mazowieckim Centrum Poligrafii i liczymy na to, ??e ju?? nie d??ugo b??dziemy mogli j?? odebra?? i zacz???? rozdawa??.",
        // },
        {
            title: "Recenzenci ju?? czytaj??!",
            date: "1 Lut 2022",
            text: "Ksi????ka jest niemal gotowa, a nasi pierwsi recenzenci ju?? j?? czytaj??! Zar??wno do??wiadczeni programi??ci koryguj??cy merytoryk??, jak i osoby kt??re nie znaj?? j??zyka Python i sprawdzaj?? czy materia?? jest odpowiednio dobrany i zbilansowany. Szczeg??lne podzi??kowania dla Roberta Dudy i Agnieszki Witkowskiej.",
        },
    ]
}

const EK_BOOK: Book = {
    key: "effectivekotlin",
    locale: Lang.EN,
    articleSeries: "EFFECTIVE_KOTLIN",
    title: "Effective Kotlin",
    subtitle: "BEST PRACTICES",
    imageUrl: "/images/ek_book_cover.png",
    description: `
Kotlin is a powerful and pragmatic language, but it's not enough
to know about its features. We also need to know when they should
be used and in what way. This book is a guide for Kotlin
developers on how to become excellent Kotlin developers. It
presents and explains in-depth the best practices for Kotlin
development. Each item is presented as a clear rule of thumb,
supported by detailed explanations and practical examples.

Effective Kotlin provides insights into the idiomatic way of
Kotlin development, as well as many general programming best
practices and details about advanced Kotlin features like DSL
creation, generics, platform types or inline functions and
classes. All that for experienced Kotlin developers to get more
effective when they use this programming language: to make safe,
well designed and efficient code.    
`,
    shortDescription: "A book dedicated for Kotlin developers, helping to become better by writing safer, cleaner and more efficient code.",
    actions: [
        {text: "LeanPub 20$", href: "https://leanpub.com/effectivekotlin"},
        {text: "Amazon 30$", href: "https://www.amazon.com/Effective-Kotlin-practices-Marcin-Moskala/dp/8395452837/"},
        {text: "@EffectiveKotlin", href: "https://twitter.com/EffectiveKotlin", icon: "fab fa-twitter", social: true},
        {text: "@MarcinMoskala", href: "https://twitter.com/marcinmoskala", icon: "fab fa-twitter", social: true},
    ],
    sections: [
        {
            type: "text",
            key: "purpose",
            text: `
# The purpose of this book
To really unleash the advantages of Kotlin, we need to use it
properly. To do so, not only do we need to know about different
Standard Library (stdlib) functions but even more, we need a good
understanding of Kotlin features, purpose, and design. The main goal
of this book is to explain how to use different Kotlin features to
achieve safe, readable, scalable, and efficient code. Since this book
is written to help developers get better at writing code, it also
touches many general rules for programmers. This book tries to compose
as much knowledge about best practices in Kotlin as possible. You can
call it a collection of best practices.  
        `
        },
        {
            type: "text",
            key: "audience",
            text: `
# For whom the book is written    
This book is not teaching basics. It assumes that you have enough
knowledge and skills to do Kotlin development. If you don???t, I
recommend starting first from some resource designed for beginners.

Effective Kotlin is directed to experienced Kotlin developers. Though
I will assume that even experienced developers might not know some
features. This is why I explain some concepts like:

* Property
* Platform type
* Named arguments
* Property delegation
* DSL creation
* Inline classes and functions
* Tail recursion

I want this book to be a complete guide for Kotlin developers on how
to become an amazing Kotlin developer.
        `
        },
        {
            type: "text",
            key: "structure",
            text: `
# Main parts of the book
Concepts in the book are grouped into three parts. Each part is
divided into chapters, which are subdivided into item. Those parts
are:

## Good code
More general rules about making good quality code. This part is for
every Kotlin developer, no matter how big their project is. It starts
from items about safety and later talks about readability. It is not a
coincidence that the first chapter is dedicated to safety. I believe
that program correctness generally is of the highest priority, and
safety is an important component. Readability is another item because
the code is not only for a compiler but also for programmers. Even
when we work alone, we want code that is readable and
self-explanatory.

## Code design
This section is for developers creating a project together with other
developers, or creating libraries. It is about conventions and setting
contracts. It will, in the end, reflect on readability and safety, but
all in terms of correct code design. This part is a bit more abstract
at the beginning, but thanks to that it can explore topics that are
often omitted in books about code quality. This section is also about
preparing our code for growth. A lot of items are about being ready
for changes in the future. Therefore it is an especially important
section for developers creating large projects.

## Efficiency
This section is for developers that care about code efficiency. Most
of the rules presented here do not come at the cost of development
time or readability, so they are suitable for everyone. However, they
are particularly important for developers implementing
high-performance applications, libraries, or applications for
millions.
        `
        },
        {
            type: "text",
            key: "toc",
            text: `
# Table of contents

Introduction: Be pragmatic

## Part 1: Good code

### Chapter 1: Safety
* Item 1: Limit mutability
* Item 2: Minimize the scope of variables
* Item 3: Eliminate platform types as soon as possible
* Item 4: Do not expose inferred types
* Item 5: Specify your expectations on arguments and state
* Item 6: Prefer standard errors to custom ones
* Item 7: Prefer null or Failure result when the lack of result is possible
* Item 8: Handle nulls properly
* Item 9: Close resources with use
* Item 10: Write unit tests

### Chapter 2: Readability
* Item 11: Design for readability
* Item 12: Operator meaning should be clearly consistent with its function name
* Item 12: Operator meaning should be clearly consistent with its function name
* Item 13: Avoid returning or operating on Unit?
* Item 14: Specify the variable type when it is not clear
* Item 14: Specify the variable type when it is not clear
* Item 15: Consider referencing receivers explicitly
* Item 16: Properties should represent state, not behavior
* Item 16: Properties should represent state, not behavior
* Item 17: Consider naming arguments
* Item 18: Respect coding conventions

## Part 2: Code design
### Chapter 3: Reusability
* Item 19: Do not repeat knowledge
* Item 20: Do not repeat common algorithms
* Item 21: Use property delegation to extract common property patterns
* Item 22: Reuse between different platforms by extracting common modules

### Chapter 4: Abstraction design
* Item 23: Each function should be written in terms of a single level of abstraction
* Item 24: Use abstraction to protect code against changes
* Item 25: Specify API stability
* Item 26: Consider wrapping external API
* Item 27: Minimize elements visibility
* Item 28: Define contract with documentation
* Item 29: Respect abstraction contracts

### Chapter 5: Object creation
* Item 30: Consider factory functions instead of constructors
* Item 31: Consider a primary constructor with named optional arguments
* Item 32: Consider defining a DSL for complex object creation

### Chapter 6: Class design
* Item 33: Prefer composition over inheritance
* Item 34: Use the data modifier to represent a bundle of data
* Item 35: Use function types instead of interfaces to pass operations and actions
* Item 36: Prefer class hierarchies to tagged classes
* Item 37: Respect the contract of equals
* Item 38: Respect the contract of hashCode
* Item 39: Respect the contract of compareTo
* Item 40: Consider extracting non-essential parts of your API into extensions
* Item 41: Avoid member extensions

## Part 3: Efficiency
### Chapter 7: Make it cheap
* Item 42: Avoid unnecessary object creation
* Item 43: Use inline modifier for functions with parameters of functional types
* Item 44: Consider using inline classes
* Item 45: Eliminate obsolete object references

### Chapter 8: Efficient collection processing
* Item 46: Prefer Sequence for big collections with more than one processing step
* Item 47: Limit number of operations
* Item 48: Consider Arrays with primitives for performance-critical processing
* Item 49: Consider using mutable collections

Dictionary
        `
        },
    ],
    authorKey: "marcinmoskala",
    updates: [
        {
            title: "Book update and public chapters",
            date: "25 April 2021",
            text: `
We start a process of updating the book, and sharing some chapters online as public articles. 
            `,
        },
        {
            title: "New items",
            date: "14 October 2019",
            text: `
Generics are important for effective Kotlin development, and yet many experienced developers
have trouble using them. That's is why we just introduced three new items dedicated to generics in Kotlin:

Item 22: Use generics when implementing common algorithms
Item 23: Avoid shadowing type parameters
Item 24: Consider variance for generic types
            `,
        },
        {
            title: "Beta version available!",
            date: "26 August 2019",
            text: `
The book is finally published! It took a lot of time and energy, but 
Effective Kotlin is finally available in e-book.
            `,
        },
        {
            title: "Alpha testing",
            date: "26 July 2019",
            text: `
Alpha testing started today - reviewers are reading the beta version
of the book and giving final suggestions. It means that Effective
Kotlin should be published within two months.            `,
        },
    ]
}

const KC_BOOK: Book = {
    key: "coroutines",
    locale: Lang.EN,
    articleSeries: "KOTLIN_COROUTINES",
    title: "Kotlin Coroutines",
    subtitle: "DEEP DIVE",
    imageUrl: "/images/coroutines_book_cover.png",
    description: `
Kotlin coroutines have revolutionized JVM development, especially on Android and the backend, as they let us easily implement efficient and reliable multithreading. Their cutting-edge design and features are ideally suited to modern use cases. In this book, we will explore how Kotlin coroutines work and how we can use them to improve our applications ??? using both the built-in support and the kotlinx.coroutines library.

This is a practical book. It shows everything by examples and focuses on real-life use cases. As this technology is already widely used on Android and backend applications, we will see how we can use it there and what the best practices are.
`,
    shortDescription: "A practical book dedicated to Kotlin coroutines, explaining built-in support, kotlinx.coroutines library and the best practices for real-life projects.",
    actions: [
        {text: "LeanPub", href: "https://leanpub.com/coroutines"},
        {text: "@MarcinMoskala", href: "https://twitter.com/marcinmoskala", icon: "fab fa-twitter", social: true},
    ],
    sections: [
        {
            type: "text",
            key: "why",
            text: `
# Why coroutines?

The importance of concurrency is growing, but the classic techniques are not enough. Current trends suggest that coroutines are the direction in which our industry is clearly heading, and Kotlin Coroutines are a very solid step. Let me show them to you, with examples of how well they help in common use cases. I hope you will have a lot of fun reading this book.
        `
        },
        {
            type: "text",
            key: "audience",
            text: `
# Who is this book for? 

As a developer experienced in both backend and Android, in this book I try to mainly focus on these two perspectives. These are currently the two major industry applications of Kotlin, and it can be seen that coroutines were largely designed to suit these use cases well[^000_1]. So, you might say that this book is primarily designed for Android and backend developers, but it should be just as useful for other developers using Kotlin.
        `
        },
        {
            type: "text",
            key: "structure",
            text: `
# The structure of this book

The book is divided into the following parts:
- **Part 1: Understanding Kotlin Coroutines** - dedicated to explaining what Kotlin Coroutines are and how they really work.
- **Part 2: Kotlin Coroutines library** - explaining the most important concepts from the kotlinx.coroutines library and how to use them well.
- **Part 3: Channel and Flow** - focused on Channel and Flow from the kotlinx.coroutines library.
        `
        },
        {
            type: "text",
            key: "structure",
            text: `
# What will be covered?

This book is based on a workshop I conduct. During its iterations I have been able to observe what interested attendees and what did not. These are the elements that are most often mentioned by attendees, so I mainly focus on the following:
- **How do coroutines really work?** (Part 1)
- **How to use coroutines in practice?** (Part 2 and 3)
- **What are the best practices?** (Part 2 and 3)
- **Testing Kotlin coroutines** (*Testing Kotlin Coroutines* in Part 2)
- **What is Flow and how does it work?** (Part 3)
        `
        },
    ],
    authorKey: "marcinmoskala",
}

export const BOOKS = [PY_BOOK, KC_BOOK, JS_BOOK, EK_BOOK]
