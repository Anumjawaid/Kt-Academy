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
Ta książka zacznie Twoją przygodę z programowaniem. Prezentuje wiedzę w praktyczny, przystępny i zrozumiały sposób. 
Pomaga zbudować solidne podwaliny pod naukę JavaScript oraz wytyczyć dalszy kierunek. Jeśli chcesz nauczyć się 
programowania albo zastanawia Cię czym ono jest, to jest to książka dla Ciebie.

Razem z tą książką wejdziesz krok po kroku do świata JavaScript. Pokaże Ci, że programowanie to świetna zabawa, a 
przy tym znacznie bardziej przydatna i dostępna umiejętność niż może się wydawać.
`,
    shortDescription: "Książka pomagająca wejść w świat programowania od języka JavaScript. Zachęca i pokazuje jak uczyć się skutecznie.",
    actions: [
        {text: "Allegro", href: "https://allegro.pl/oferta/javascript-od-podstaw-10973192038"},
        {text: "Ebook na LeanPub", href: "https://leanpub.com/javascript_od_podstaw/"},
        {text: "Rozdziały jako artykuły", href: "#articles", social: true},
        {text: "Grupa na Facebook", href: "https://www.facebook.com/groups/javascriptodpodstaw", social: true},
        {text: "Twitter Kt. Academy PL", href: "https://twitter.com/ktdotacademyPL", social: true},
    ],
    sections: [
        {
            type: "text",
            key: "audience",
            text: `
# Dla kogo jest ta książka?

To jest książka dla każdego, kto chce nauczyć się programowania. Zamierzam obalić stereotypy i udowodnić, że zarówno 53-letnia nauczycielka, 42-letni taksówkarz, jak i 12-letnie uczeń są w stanie z niej skorzystać. Zakładam wyłącznie doświadczenie w korzystaniu z komputera i internetu, a resztę postaram się wyjaśnić.

To nie jest książka dla osób, które już potrafią programować w innym języku. Tłumaczy wszystko od zupełnych podstaw. Nie powinna być traktowana jako podręcznik akademicki. Używane słownictwo uprościłem, a pojęcia zdefiniowałem w sposób nieformalny. Oczywiście, starałem się zachować maksimum poprawności, ale przede wszystkim podstawiłem na zrozumiałość i praktyczność.
        `
        },
        {
            type: "text",
            key: "structure",
            text: `
# O książce
    
Książka podzielona jest na cztery części:
1. *To co najważniejsze w JavaScript* — gdzie zaczynamy naszą przygodę z programowaniem i poznajemy najistotniejsze funkcjonalności tego języka.
2. *Głębsze wody* - gdzie wyjdziemy poza podstawy i zaczniemy omawiać bardziej zaawansowane funkcjonalności języka.
3. *Napiszmy razem grę* - gdzie wykorzystamy zdobyte umiejętności do napisania gry.
4. *O programowaniu* - gdzie pomówimy o wykorzystaniu tych umiejętności, o nauce programowania i o branży programistycznej.
        `
        },
        {
            type: "text",
            key: "whatYouLearn",
            text: `
# Czego nauczysz się z tej książki?

Ta książka nie wystarczy by nauczyć się programowania. Nie wiem czy istnieje taka, która by wystarczyła. To tak jakbyśmy chcieli się z jednej książki nauczyć języka fińskiego od zupełnych podstaw. Jeśli jednak sumiennie przystąpisz do nauki z tej książki (przykładów, zadań), to skończysz z wiedzą wystarczającą by wykorzystywać JavaScript w prostych zastosowaniach. 

Z tej książki dowiesz się:
- czym są zmienne i wartości,
- jak używać warunków i pętli,
- jak działają funkcje,
- o najważniejszych elementach programowania obiektowego i funkcyjnego,
- jak napisać grę Pong,
- jak wykorzystać zdobytą wiedzę  w praktyce,
- jak kontynuować naukę.
        `
        },
        {
            type: "text",
            key: "podajdalej",
            text: `
# Akcja "Podaj dalej"

Książce towarzyszy akcja społeczna "Podaj dalej". Więcej na ten temat akcji znajdziesz na [stronie akcji](https://kt.academy/podajdalej). 
        `
        },
        {
            type: "text",
            key: "toc",
            text: `
# Spis treści

- Wstęp

## Część 1: To, co najważniejsze w JavaScript
### Pierwszy program
- Przeglądarka
- Używanie konsoli
- Edytory Online
- Komentarze
- Instrukcje, średniki i białe znaki
### Podstawowe wartości
- Teksty, znane jako stringi
- Liczby
- Wartości logiczne: prawda i fałsz
- Operator równości i nierówności
- Operatory porównania dla liczb
- Typy wartości
### Zmienne
- const i let
- Nazywanie zmiennych
- Przypisanie rozszerzające wartość zmiennej
- Zmienne wskazują na wartości
- Zmienne niezdefiniowane i wartość undefined
- Wartość null
### Warunki
- Instrukcja warunkowa if
- Wywołanie warunkowe z alternatywą if-else
- If-else-if
- Operator warunkowy
### Wyrażenia logiczne
- Operator i &&
- Operator lub ||
- Operator negacji !
- Czytanie wyrażeń logicznych
- Wartości falsy i truthy
- Zwracanie wartości przez && i ||
### Pętle
- Pętla while
- Pętla for
### Funkcje
- Wydzielanie części kodu
- Jak działają funkcje?
- Odnoszenie się do elementów spoza funkcji
- Parametry i argumenty funkcji
- Wynik funkcji
- Funkcje matematyczne
- Funkcje jako wartości

## Część 2: Głębsze wody
### Obiekty
- Definicja obiektu
- Obiekt jako właściwość
- Modyfikowanie obiektów
- Dodawanie właściwości
- Brakujące właściwości
- Format zapisu danych JSON
### Elementy programowania obiektowego
- Metody, czyli funkcje jako właściwości
- Operator new
- Klasy
### Tablice
- Tworzenie tablic
- Dodawanie i wyciąganie elementów
- Odnoszenie się do elementów tablicy
- ### Iteracja po tablicy
- Funkcja forEach
- Funkcja map
- Funkcja join
- Inne metody tablicy warte poznania
### Funkcje strzałkowe
- Przydatność funkcji strzałkowych
- Ograniczenia funkcji strzałkowych

## Część 3: Napiszmy razem grę
### Daj mi płótno, a namaluję świat
- Płótno, czyli HTML canvas
- Pierwszy rysunek
- Paletka
- Tekst
- Piłeczka
- Czyszczenie płótna
- ### Stan oraz stałe
- Stałe
- Stan
- Zmiana stanu
### Przejmujemy sterowanie
- Ruch paletki
- Zatrzymanie paletki
- Blokowanie na skrajach
- Pauzowanie
- ### Lot piłeczki
- Piłeczka wraca na środek
- Piłeczka odbija się od ścianek
- Piłeczka odbija się od paletek
### Porządkujemy naszą grę, wykorzystując podejście obiektowe
- Piłeczka jako obiekt
- Gracze i paletki jako obiekty
- Pozycja paletki
- Obiektowe rysowanie piłeczki i paletek
- Użycie klas

## Część 4: O programowaniu
### Co można robić w JavaScript?
- Tworzenie stron internetowych
- Pisanie gier
- Aplikacje na telefony i komputery
- Pisanie botów
- Skrypty w Google Docs, Google Sheets i Google Slides
- Prezentacje
- Aplikacje serwerowe
- Wizualizacja danych
- Uczenie maszynowe
- Robotyka
- Muzyka, efekty wizualne, sztuka
- Hakowanie stron
- Wiele więcej...
### Jak nauczyć się programowania?
- Kursy internetowe
- Akademickie kursy internetowe
- Nauka programowania na YouTube
- Książki
- Podcasty
- Bootcampy i kursy na żywo
- Mentoring
### Gry w służbie programowania
### Nauka programowania na telefonie
- Kursy do nauki programowania na telefonie
- Platformy do kursów dostępne na telefonie
- Gry programistyczne na telefonie
### Jak zostać programistą?
- Geneza planu
- Dla kogo jest ten plan?
- Ile zajmuje przejście tej ścieżki?
- Plan w 7 krokach
### Przyszłość programowania
- Liczba programistów jest duża
- Liczba programistów szybko rośnie
- Specjalizacja postępuje, czyli bycie programistą jak kiedyś inżynierem
- Programowanie ułatwia wiele zawodów, może ułatwiać niemal każdy
- Przyszłość programowania
### Rozwiązania do ćwiczeń
### Słowniczek
        `
        },
    ],
    authorKey: "marcinmoskala",
    updates: [
        {
            title: "Książka w przedsprzedaży na Allegro!",
            date: "3 Sie 2021",
            text: "Książkę już można kupić na [Allegro](https://allegro.pl/oferta/javascript-od-podstaw-10973192038). Zostanie wysłana 7 Sierpnia 2021.",
        },
        {
            title: "Już jest!",
            date: "3 Sie 2021",
            text: "Wreszcie dotarła! Teraz wyślemy ją do hurtowni oraz wreszcie możemy zacząć dzielić się egzemplarzami typu \"Podaj dalej\".",
        },
        {
            title: "Książka wysłana do druku",
            date: "14 Lip 2021",
            text: "Książka poszła do druku w Mazowieckim Centrum Poligrafii i liczymy na to, że już nie długo będziemy mogli ją odebrać i zacząć rozdawać.",
        },
        {
            title: "Podcast Przeprogramowani",
            date: "26 Cze 2021",
            text: "Autor książki wystąpił w [podcast Przeprogramowani](https://www.youtube.com/watch?v=TXxuha3IfXI). Rozmawiał między innymi o książce.",
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
Ta książka zacznie Twoją przygodę z programowaniem. Prezentuje wiedzę w praktyczny, przystępny i zrozumiały sposób. 
Pomaga zbudować solidne podwaliny pod naukę języka Python oraz wytyczyć dalszy kierunek. Jeśli chcesz nauczyć się 
programowania albo zastanawia Cię czym ono jest, to jest to książka dla Ciebie.

Razem z tą książką wejdziesz krok po kroku do świata Python. Pokaże Ci, że programowanie to świetna zabawa, a 
przy tym znacznie bardziej przydatna i dostępna umiejętność niż może się wydawać.
`,
    shortDescription: "Książka pomagająca wejść w świat programowania od języka Python. Zachęca i pokazuje jak uczyć się skutecznie.",
    actions: [
        // {text: "Allegro", href: "https://allegro.pl/oferta/javascript-od-podstaw-10973192038"},
        // {text: "Ebook na LeanPub", href: "https://leanpub.com/javascript_od_podstaw/"},
        {text: "Rozdziały jako artykuły", href: "#articles", social: true},
        {text: "Grupa na Facebook", href: "https://www.facebook.com/groups/javascriptodpodstaw", social: true},
        {text: "Twitter Kt. Academy PL", href: "https://twitter.com/ktdotacademyPL", social: true},
    ],
    sections: [
        {
            type: "text",
            key: "audience",
            text: `
# Dla kogo jest ta książka?

To jest książka dla każdego, kto chce nauczyć się programowania. Zamierzam obalić stereotypy i udowodnić, że zarówno 53-letnia nauczycielka, 42-letni taksówkarz, jak i 12-letnie uczeń są w stanie z niej skorzystać. Zakładam wyłącznie doświadczenie w korzystaniu z komputera i internetu, a resztę postaram się wyjaśnić.

To nie jest książka dla osób, które już potrafią programować w innym języku. Tłumaczy wszystko od zupełnych podstaw. Nie powinna być traktowana jako podręcznik akademicki. Używane słownictwo uprościłem, a pojęcia zdefiniowałem w sposób nieformalny. Oczywiście, starałem się zachować maksimum poprawności, ale przede wszystkim podstawiłem na zrozumiałość i praktyczność.
        `
        },
        {
            type: "text",
            key: "structure",
            text: `
# O książce
    
Książka podzielona jest na pięć części:
1. *To co najważniejsze w Python* — gdzie zaczynamy naszą przygodę z programowaniem i poznajemy najistotniejsze funkcjonalności tego języka.
2. *Głębsze wody* - gdzie wyjdziemy poza podstawy i zaczniemy omawiać bardziej zaawansowane funkcjonalności języka.
3. *Napiszmy razem grę* - gdzie wykorzystamy zdobyte umiejętności do napisania klasycznej gry w węża.
4. *Praktyczne projekty* - gdzie prezentujemy kilka kluczowych zastosowań języka Python - do analizy danych, uczenia maszynowego, klienta do popularnego portalu Twitter oraz bota zbierającego dane ze strony. 
5. *O programowaniu* - gdzie pomówimy o wykorzystaniu tych umiejętności, o nauce programowania i o branży programistycznej.
        `
        },
        {
            type: "text",
            key: "whatYouLearn",
            text: `
# Czego nauczysz się z tej książki?

Ta książka nie wystarczy by nauczyć się programowania. Nie wiem czy istnieje taka, która by wystarczyła. To tak jakbyśmy chcieli się z jednej książki nauczyć języka fińskiego od zupełnych podstaw. Jeśli jednak sumiennie przystąpisz do nauki z tej książki (przykładów, zadań), to skończysz z wiedzą wystarczającą by wykorzystywać Python w prostych zastosowaniach. 

Z tej książki dowiesz się:
- czym są zmienne i wartości,
- jak używać warunków i pętli,
- jak działają funkcje,
- jak używać klas,
- jak działają tablice oraz jak je przekształcać,
- czym są operatory i jak je nadpisywać,
- jak importować i instalować pakiety,
- jak napisać grę Wąż,
- jak wykorzystać zdobytą wiedzę  w praktyce,
- jak kontynuować naukę.
        `
        },
//         {
//             type: "text",
//             key: "podajdalej",
//             text: `
// # Akcja "Podaj dalej"
//
// Książce towarzyszy akcja społeczna "Podaj dalej". Więcej na ten temat akcji znajdziesz na [stronie akcji](https://kt.academy/podajdalej).
//         `
//         },
//         {
//             type: "text",
//             key: "toc",
//             text: `
// # Spis treści
//
// - Wstęp
//
// ## Część 1: To, co najważniejsze w Python
// ### Pierwszy program
// - Przeglądarka
// - Używanie konsoli
// - Edytory Online
// - Komentarze
// - Instrukcje, średniki i białe znaki
// ### Podstawowe wartości
// - Teksty, znane jako stringi
// - Liczby
// - Wartości logiczne: prawda i fałsz
// - Operator równości i nierówności
// - Operatory porównania dla liczb
// - Typy wartości
// ### Zmienne
// - const i let
// - Nazywanie zmiennych
// - Przypisanie rozszerzające wartość zmiennej
// - Zmienne wskazują na wartości
// - Zmienne niezdefiniowane i wartość undefined
// - Wartość null
// ### Warunki
// - Instrukcja warunkowa if
// - Wywołanie warunkowe z alternatywą if-else
// - If-else-if
// - Operator warunkowy
// ### Wyrażenia logiczne
// - Operator i &&
// - Operator lub ||
// - Operator negacji !
// - Czytanie wyrażeń logicznych
// - Wartości falsy i truthy
// - Zwracanie wartości przez && i ||
// ### Pętle
// - Pętla while
// - Pętla for
// ### Funkcje
// - Wydzielanie części kodu
// - Jak działają funkcje?
// - Odnoszenie się do elementów spoza funkcji
// - Parametry i argumenty funkcji
// - Wynik funkcji
// - Funkcje matematyczne
// - Funkcje jako wartości
//
// ## Część 2: Głębsze wody
// ### Obiekty
// - Definicja obiektu
// - Obiekt jako właściwość
// - Modyfikowanie obiektów
// - Dodawanie właściwości
// - Brakujące właściwości
// - Format zapisu danych JSON
// ### Elementy programowania obiektowego
// - Metody, czyli funkcje jako właściwości
// - Operator new
// - Klasy
// ### Tablice
// - Tworzenie tablic
// - Dodawanie i wyciąganie elementów
// - Odnoszenie się do elementów tablicy
// - ### Iteracja po tablicy
// - Funkcja forEach
// - Funkcja map
// - Funkcja join
// - Inne metody tablicy warte poznania
// ### Funkcje strzałkowe
// - Przydatność funkcji strzałkowych
// - Ograniczenia funkcji strzałkowych
//
// ## Część 3: Napiszmy razem grę
// ### Daj mi płótno, a namaluję świat
// - Płótno, czyli HTML canvas
// - Pierwszy rysunek
// - Paletka
// - Tekst
// - Piłeczka
// - Czyszczenie płótna
// - ### Stan oraz stałe
// - Stałe
// - Stan
// - Zmiana stanu
// ### Przejmujemy sterowanie
// - Ruch paletki
// - Zatrzymanie paletki
// - Blokowanie na skrajach
// - Pauzowanie
// - ### Lot piłeczki
// - Piłeczka wraca na środek
// - Piłeczka odbija się od ścianek
// - Piłeczka odbija się od paletek
// ### Porządkujemy naszą grę, wykorzystując podejście obiektowe
// - Piłeczka jako obiekt
// - Gracze i paletki jako obiekty
// - Pozycja paletki
// - Obiektowe rysowanie piłeczki i paletek
// - Użycie klas
//
// ## Część 4: O programowaniu
// ### Co można robić w JavaScript?
// - Tworzenie stron internetowych
// - Pisanie gier
// - Aplikacje na telefony i komputery
// - Pisanie botów
// - Skrypty w Google Docs, Google Sheets i Google Slides
// - Prezentacje
// - Aplikacje serwerowe
// - Wizualizacja danych
// - Uczenie maszynowe
// - Robotyka
// - Muzyka, efekty wizualne, sztuka
// - Hakowanie stron
// - Wiele więcej...
// ### Jak nauczyć się programowania?
// - Kursy internetowe
// - Akademickie kursy internetowe
// - Nauka programowania na YouTube
// - Książki
// - Podcasty
// - Bootcampy i kursy na żywo
// - Mentoring
// ### Gry w służbie programowania
// ### Nauka programowania na telefonie
// - Kursy do nauki programowania na telefonie
// - Platformy do kursów dostępne na telefonie
// - Gry programistyczne na telefonie
// ### Jak zostać programistą?
// - Geneza planu
// - Dla kogo jest ten plan?
// - Ile zajmuje przejście tej ścieżki?
// - Plan w 7 krokach
// ### Przyszłość programowania
// - Liczba programistów jest duża
// - Liczba programistów szybko rośnie
// - Specjalizacja postępuje, czyli bycie programistą jak kiedyś inżynierem
// - Programowanie ułatwia wiele zawodów, może ułatwiać niemal każdy
// - Przyszłość programowania
// ### Rozwiązania do ćwiczeń
// ### Słowniczek
//         `
//         },
    ],
    authorKey: "marcinmoskala",
    updates: [
        // {
        //     title: "Książka w przedsprzedaży na Allegro!",
        //     date: "3 Sie 2021",
        //     text: "Książkę już można kupić na [Allegro](https://allegro.pl/oferta/javascript-od-podstaw-10973192038). Zostanie wysłana 7 Sierpnia 2021.",
        // },
        // {
        //     title: "Już jest!",
        //     date: "3 Sie 2021",
        //     text: "Wreszcie dotarła! Teraz wyślemy ją do hurtowni oraz wreszcie możemy zacząć dzielić się egzemplarzami typu \"Podaj dalej\".",
        // },
        // {
        //     title: "Książka wysłana do druku",
        //     date: "14 Lip 2021",
        //     text: "Książka poszła do druku w Mazowieckim Centrum Poligrafii i liczymy na to, że już nie długo będziemy mogli ją odebrać i zacząć rozdawać.",
        // },
        {
            title: "Recenzenci już czytają!",
            date: "1 Lut 2022",
            text: "Książka jest niemal gotowa, a nasi pierwsi recenzenci już ją czytają! Zarówno doświadczeni programiści korygujący merytorykę, jak i osoby które nie znają języka Python i sprawdzają czy materiał jest odpowiednio dobrany i zbilansowany. Szczególne podziękowania dla Roberta Dudy i Agnieszki Witkowskiej.",
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
knowledge and skills to do Kotlin development. If you don’t, I
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
Kotlin coroutines have revolutionized JVM development, especially on Android and the backend, as they let us easily implement efficient and reliable multithreading. Their cutting-edge design and features are ideally suited to modern use cases. In this book, we will explore how Kotlin coroutines work and how we can use them to improve our applications – using both the built-in support and the kotlinx.coroutines library.

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
