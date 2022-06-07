import React from "react";
import {NextRouter, useRouter} from 'next/router'

export const Lang = {
    PL: "pl",
    EN: "en"
}

export const Langs = [Lang.PL, Lang.EN]

export function useTranslations() {
    return useRouter().locale === Lang.PL ? PL_desc : EN_desc
}

export function useLang(): { key: string, pathPrefix: string, flag: string, rssLink: string } {
    const locale = useRouter().locale;
    return {
        key: locale,
        pathPrefix: localeToPathPrefix(locale),
        flag: locale === Lang.PL ? "/images/pl-flag.png" : "/images/uk-flag.png",
        rssLink: locale === Lang.PL ? "/rss-pl.xml" : "/rss.xml",
    }
}

export function localeToPathPrefix(locale: string): string {
    return locale.toLowerCase() === Lang.PL ? "/pl" : ""
}

type PangElement = {
    key: string,
    path: string,
    flagIcon: string,
}

export function useLanguagesList(): PangElement[] {
    const path = useRouter().pathname.replace("/pl", "");
    return [
        {key: Lang.PL, path: "/pl" + path, flagIcon: "pl-flag.png"},
        {key: Lang.EN, path: path, flagIcon: "uk-flag.png"}
    ]
}

export function changeLocaleTo(router: NextRouter, newLocale: string) {
    const path = router.asPath;
    router.push(path, path, {locale: newLocale})
}

const EN_desc = {
    "motto": "Teaching programming, with focus on the best practices.",
    "description": "Kt. Academy - Teaching is our passion. If you want to migrate from Java to Kotlin or improve your's team Kotlin skills, our workshops are definitely for you. Check our workshop: Kotlin for Android Developers, Effective Kotlin, Kotlin Coroutines, Kotlin for Backend Developers. We focus on good practices and we make our workshops as practical as possible.",
    "tagsSEO": "Kotlin, workshop, training, Android, programming, coding, development, java, move to kotlin, java to kotlin",
    "title": "Kt. Academy - workshops with focus on best practices",
    "trustedBy": "Trusted by",
    "menu": {
        "home": "Home",
        "offer": "Offer",
        "whyUs": "Why Us",
        "trainer": "Trainer",
        "materials": "Materials",
        "workshops": "Workshops",
        "courses": "Courses",
        "upcomingWorkshops": "Workshops",
        "privateWorkshops": "Workshops",
        "books": "Books",
        "articles": "Articles",
        "tools": "Extra tools",
        "music": "Coding Music",
        "generate": "Generate DTO",
        "json": "JSON formatter",
        "workshopMaterial": "Topics",
        "register": "Register",
        "contact": "Contact",
        "profile": {
            "me": "Profile",
            "sendFeedback": "Send private feedback",
            "removeAccount": "Remove account",
            "newsletterOn": "Turn on newsletter",
            "newsletterOff": "Turn off newsletter",
            "signOut": "Sign out",
        }
    },
    "flag": {
        "imgLink": "/images/uk-flag.png",
        "lang": "EN"
    },
    "slogan": {
        "title": "WE TEACH PROGRAMMING",
        "subtitle": "WITH FOCUS ON THE BEST PRACTICES"
    },
    "workshopOffer": {
        "title": "What training do you need?",
        "subtitle": "",
        "kotlinTitle": "Kotlin",
        "kotlinDesc": "Workshops dedicated to Kotlin ecosystem, including Coroutines and Android.",
        "dataScienceTitle": "Data Science",
        "dataScienceDesc": "Workshops dedicated to data analysis, engineering, machine learning and artificial intelligence.",
        "button": "Check the most popular workshops",
        "bestPracticesTitle": "Best practices",
        "bestPracticesDesc": "Workshops for all kinds of developers, teaching best practices, design patterns and refactoring.",
        "beginnersTitle": "Beginner",
        "beginnersDesc": "Practical workshops for new or aspiring developers.",
        "testingTitle": "Testing",
        "testingDesc": "Workshops dedicated to testing, both business hypothesis and software correctness.",
        "frontendTitle": "Frontend",
        "frontendDesc": "JavaScript, TypeScript, making websites and everything around it.",
        "androidTitle": "Android",
        "androidDesc": "Workshops teaching Android as well as tools and libraries used there.",
        "dotNetTitle": ".NET",
        "dotNetDesc": "Teaching .NET framework, and connected tools",
        "publicTitle": "Open workshops",
        "publicSubtitle": "Planned workshops that anyone can join",
    },
    "whyUs": {
        "title": "Why training with us?",
        "subtitle": "Our workshops are conducted by world-class experts, focused on the best practices and made as practical as possible.",
        "practicalTitle": "Learn by doing",
        "practicalDesc1": "We support learning with practical exercises, programming puzzlers and challenges.",
        "practicalDesc2": "Check examples to know what to expect from the workshop.",
        "puzzlers": "Puzzlers",
        "puzzlersButton": "Check example puzzler!",
        "challenges": "Coding challenges",
        "challengesButton": "Check example challenge!",
        "app": "Build practical applications ",
        "bestTitle": "Learn from the best"
    },
    "trainer": {
        "name": {
            "abTestingExperts": "A/B testing experts from Allegro",
            "teachingExperts": "A group of professional developers and teachers",
        },
        "bio": {
            "marcinmoskala": 'Marcin Moskała is an experienced Android developer, teacher and <a href=\"https://www.jetbrains.com/company/partners/#countries=Poland&profession=TrainingPartner&speciality=Kotlin&technologies=Kotlin\"> an official Jetbrains\' Kotlin training partner</a>. He is the founder of <a href=\"https://kt.academy\"> Kt. Academy</a>, author of the books <a href=\"https://leanpub.com/effectivekotlin/\"> \"Effective Kotlin\"</a> and <a href=\"https://www.packtpub.com/application-development/android-development-kotlin\"> \"Android Development with Kotlin\"</a>, and an active programming community member. He is also the main author on <a href=\"https://blog.kotlin-academy.com\"> the biggest medium publication about Kotlin </a> and a speaker invited to many programming conferences.',
            "wlodek": "Experienced developer, trainer and a speaker on international conferences. Specialised in handling and refactoring legacy code.",
            "abTestingExperts": "Eksperci od testów A/B od podstaw tworzący w Allegro platformę Chi, najbardziej zaawansowane polskie rozwiązanie do prowadzenia testów A/B. Doskonale rozumiejący nie tylko filozofię testowania, ale i stojącą za nią statystykę.",
            "teachingExperts": "A group of developers passionate and experienced in teaching, lead by Martin Moskała, the founder of Kt. Academy.",
        },
    },
    "certificateTitle": "One of the first certified Kotlin training worldwide",
    "certificateDesc": "You will be trained by an expert who is an official JetBrains' Kotlin training partner. The quality of his workshops was checked and certified by the creators of the Kotlin language itself.",
    "materialsSection": {
        "title": "Professional training materials",
        "book": "All attendees of the workshop will receive a printed book plus a code to download the Effective Kotlin ebook for free.",
        "onlineTasks": "All attendees will get access to our exclusive learning platform, containing recordings from a full 3-day Kotlin course, additional materials and exercises.",
        "printedMaterials": "All participants of the in-company workshop will receive printed course materials, including a book with slides, exercises, tasks and a cheat sheet.",
    },
    "testimonials": {
        "subtitle": "We've helped over 300 developers from more than 40 companies around the world in a smooth transition to Kotlin",
        "saramak": "\"On this workshop, I not only systematized knowledge about Kotlin syntax but also, thanks to Marcin, I changed my way of thinking about problem-solving to functional way - I got a new tool that I can use at work on a daily basis. It seems to me that whole training is focused on immediate use of new knowledge in daily work. Big +\"",
        "nazaruk": "\"I have participated in great Kotlin for Android Developers training, with extremely competent Marcin Moskala from Kt. Academy as a trainer. It was an intensive 3-days Kotlin workshop, ended with a quite difficult and thorough exam. With experience and knowledge under my belt acquired in this course, I feel confident about my future as an Android Developer.\"",
        "grajewski": "\"Very good workshop. Perfect for developers that want to move easily from Java to Kotlin. During the workshop, we did plenty of exercises that enabled checking new knowledge in practice.\"",
        "button": "Book a practical workshop tailored to your needs"
    },
    "contact": {
        "title": "Let's talk!",
        "stayInTouch": "Stay in touch!",
        "twitter": {
            "title": "Follow us on Twitter",
            "description": "We have a community of more than 3000 followers and we only post programming-related content."
        },
        "mail": {
            "title": "Write an email",
            "description": "We are happy to talk about our workshops and adjust them to your needs. Contact us if you have any questions.",
            "button": "Contact Us"
        },
        "newsletter": {
            "title": "Sign up to our newsletter",
            "description": "Stay updated with our articles and workshops. We only send programming-related content.",
            "button": "Sign up"
        }
    },
    "footerContact": "Contact Us:",
    "privacyPolicy": "Privacy policy",
    "workshopsList": {
        "offerDesc": "You can choose from the proposals below, or we can prepare something tailored to your needs. We conduct both in-company and online trainings. ",
        "button": "More information",
        "otherOption": "We list only the most popular workshops on our website. If you don't see the course you need or require a customized version of it, please email us: ",
    },
    "workshopPage": {
        "knowledgeSources": {
            "title": "On the workshop you will",
            "lecture": "Learn from lecture supported by slides",
            "exercises": "Complete practical exercises",
            "puzzlers": "Solve puzzlers",
            "challenges": "Solve coding challenges",
            "android": "Write an Android application in Kotlin",
            "discussion": "Group discussions",
        },
        "titleToc": "During the workshop we cover:",
        "titleRequirements": "Requirements",
        "titleAbout": "About the course",
        "titleHowLong": "How long does it take?",
        "registration": {
            "title": "Register",
            "register": "Register",
            "private": {
                "buttonText": "Private workshop",
                "chooseOption": "Choose this option if you need a workshop for your team or company. ",
                "explanation": 'The basic price is {workshop_price} for the group for {days_num} days.',
            },
            "public": {
                "buttonText": "Open online workshop",
                "chooseOption": "Choose this option if you need a workshop for yourself or for a small group of people. ",
                "explanation": 'The basic price is {workshop_person_price} per person for the whole workshop.',
            },
            "consultations": {
                "text": "Our experts offer consultations for both companies and individuals. The price is set individually. ",
                "chooseOption": "Contact us",
            },
            "publicPlanned": {
                "explanation": 'Join online workshop in {start_date} to {end_date} at {time}. The price is {workshop_person_price} per person.',
            }
        },
        trainerBio: {
            "rafalgrzesik": "Experienced software engineer, programming trainer and mentor in the fields of JavaScript, TypeScript, Angular, C#, design patterns and DDD. Increased hundreds programmers skill and knowledge by providing robust on site and online trainings. Conducted many workshops all rated above 4/5 points in after surveys. "
        }
    },
    "puzzler": {
        "descriptionSEO": "Check exemplary puzzlers that you will be solving during the Kt. Academy workshops. We believe that training should be as practical as possible.",
        "tagsSEO": "Kotlin, workshop, Android, programming, coding, development, puzzler, exercise, practical workshop",
        "title": "Learn by doing",
        "subtitle": "Train new Kotlin skills by solving practical puzzlers",
        "whatArePuzzlers": "What are the puzzlers?",
        "description": "Puzzlers are tricky programming challenges with often surprising answers. They show how bad practices can lead to problems.",
        "examplesTitle": "Exemplary puzzlers",
        "whatPrint": "What will it print?",
        "whatDisplay": "What does it display?",
        "showAnswers": "Show the answer and an explanation",
        "correctAnswer": "Correct answer",
        "explanation": "Explanation",
        "puzzle1Title": "Order of nullable operators",
        "puzzle1Answers": {
            "a": "a) 3",
            "b": "b) 5",
            "c": "c) 2",
            "d": "d) 0"
        },
        "puzzle1Explanation": "Elvis operator has lower precedence than + so plus is evaluated first and y lend on the right side of Elvis operator. Use brackets to correct this.",
        "puzzle2Title": "Extensions are resolved statically",
        "puzzle2Answers": {
            "a": "a) Doesn't compile",
            "b": "b) Runtime error",
            "c": "c) \"c\"",
            "d": "d) \"d\""
        },
        "puzzle2Explanation": "This example will print \\\"c\\\" because the extension function being called depends only on the declared type of the parameter c, which is the C class.</p>\"+\n            \"<p>Extensions do not actually modify classes they extend. By defining an extension you do not insert new members into a class, but merely make new functions callable with the dot-notation on variables of this type."
    },
    "challenge": {
        "descriptionSEO": "Check exemplary challenge that you will be solving during the Kt. Academy workshops. We believe that training should be as practical as possible.",
        "tagsSEO": "Kotlin, workshop, Android, programming, coding, development, puzzler, exercise, practical workshop",
        "title": "Learn by doing",
        "subtitle": "Train new Kotlin skills by solving practical challenges",
        "whatAreChallenges": "What are the challenges?",
        "description": "Small programming tasks that require you to implement a function or a class in Kotlin. Thanks to them, you can check in practice if you understand the material correctly and train it to be able to use it immediately after the workshop. All challenges are verified by unit tests.",
        "examplesTitle": "Exemplary challenges"
    },
    "form": {
        "private": {
            "title": "Private workshop request",
            "intro": "Fill this form to request private workshop [{workshop_name}]({workshop_link}) for your company.",
            "inCompanyWarning": "In the case of a workshop outside of Warsaw, we will have to add travel and accommodation costs to the price."
        },

        "public": {
            "title": "Open workshop request",
            "intro": "Fill this form to request open workshop [{workshop_name}]({workshop_link}). You will be added to the waiting list of developers interested in this workshop. We will contact you once we have gathered enough attendees in your time zone."
        },

        "plannedPublic": {
            "title": "Open workshop request",
            "intro": "Fill this form to register for the workshop [{workshop_name}]({workshop_link}) starting on {start_date} at {time}."
        },

        "consultations": {
            "title": "Consultations",
            "intro": "This form is to request a consultation on a topic related to the [{workshop_name}]({workshop_link}) workshop. Once you fill it, we will contact the expert and get back to you as soon as possible.",

            "consultationType": {
                question: "Who are these consultations for?",
                private: "A private person",
                company: "A company",
            },
        },

        "namePrompt": "Your name",
        "emailPrompt": "Your email",
        "companyNamePrompt": "Company name",
        "groupSizePrompt": "For how many people do you need this workshop?",
        "orMore": "or more",
        "justMe": "Just me",
        "countryPrompt": "Country or region",
        "datePrompt": "What dates suit you best?",
        "extraPrompt": "Is there anything else you would like to share?",
        "privateGroupSizePrompt": "How many developers would you like to register?",
        "dialogSent": "Request sent",
        "dialogSetYourProfileContinuation": ", please fill your profile data as well",
        "dialogError": "A problem occurred, please send later",

        "isOnline": {
            "question": "Are you interested in online or in-company training?",
            "inCompany": "In-company",
            "online": "Online",
        },

        "registerKind": {
            "question": "Who would you like to register?",
            "myself": "Myself",
            "developerCompany": "A developer from my company",
            "myselfAndGroupCompany": "Myself and other developers from my company",
            "groupCompany": "Developers from my company",
        },

        "invoiceTo": {
            "question": "To whom issue the invoice?",
            "company": "The company I work for",
            "privateCompany": "My own company",
            "person": "Myself",
        },

        "developerExperience": {
            "questionMyself": "What is your professional experience as a developer?",
            "questionOther": "What is the registered person's experience as a developer?",
            "no": "No experience",
            "junior": "Junior developer",
            "mid": "Developer",
            "senior": "Senior developer",
        },

        "priceAcceptance": {
            "question": "The base price for this workshop is {price} per person for the whole workshop. Does it work for you?",
            "ok": "Yes",
            "discountNeeded": "This is too much for me, I need a discount",
            "wayTooMuch": "Sorry, but my budget is less than half of that",
        },

        "required": "Required",
        "invalidEmail": "Invalid email",
        "invalidNumber": "Invalid number",
        "shouldBeUrl": "To powinien być link",
        "shouldNotBeUrl": "To nie powinien być link",
        "submit": "Submit",
        "save": "Save",

        "requestOpenInsteadInfo": "This form should be used to request private workshops for companies. If it is just you or a small group of people, we suggest to use [this form]({openFormLink}) to request an open online workshop.",
        "notForBeginnerInfo": "We are sorry, but this workshop is for developers with professional experience. Check out our [workshops for beginners](https://kt.academy/workshop#tag-beginners). If you want to learn Kotlin, our recommendations are [here](https://blog.kotlin-academy.com/best-kotlin-free-online-courses-5838cb7063c6).",
        "noVatIdInfo": "We may not be able to offer you any discount as for a private person we will have to pay an additional tax of 23%.",

        "howDoYouKnow": {
            "title": "How did you hear about the workshop?",
            "ad": "From Facebook/Twitter ad",
            "post": "From Facebook/Twitter post",
            "newsletter": "From a newsletter",
            "recommendation": "From recommendation",
            "linkedin": "From LinkedIn",
            "article": "From an article",
            "search": "From Google",
            "other": "Other",
            "explain": "Please specify",
        }
    },
    "generate": {
        "title": "Generate DTO",
        "pastePrompt": "Paste your code here: ",
        "dtoName": "DTO name: ",
        "dtoSuffix": "(or) suffix: ",
        "generateButton": "Generate",
    },
    "errorMessage": "An error occurred. We are sorry. You can contact us using contact@kt.academy",
    "feedback": {
        "button": 'Feedback',
        "prompt": 'What do you think? What can we improve?',
        "placeholder": 'Type your feedback here...',
        "thankYou": "Thank you for your feedback",
    },
    "music": {
        "recommendationAdded": "Recommendation added,\nthank you",
        "volume": "Volume",
        "pickerWorkTime": "Work time",
        "pickerBreakTime": "Break time",
        "displayWorkTime": "Work time",
        "displayBreakTime": "Break",
        "sessionTime": "Session length: ",
        "timeUntilWork": "Time until work: ",
        "timeUntilBreak": "Time until break: ",
        "totalConcentrationTime": "Total concentration time: ",
        "startWork": "Start work",
        "startBreak": "Start break",
        "ratePrompt": "Rate this video:",
        "recommendButton": "Recommend",
        "youtubeKey": "YouTube video key: ",
        "recommendationsList": "Recommendations: ",
        "blocked": "Blocked",
        "block": "Block",
        "favourite": "Favourite",
        "makeFavourite": "Add to favourites",
    },
    "article": {
        "more": "More articles on ",
        "notTranslated": "The article hasn't been translated yet.",
        author: {
            title: "The author:"
        },
        reviewer: {
            title: "Reviewers:",
            open: {
                name: "You?"
            }
        },
        prev: "Previous",
        next: "Next",
    },
    "editProfile": {
        "pageVisibleOn": "Your profile is visible on ",
        "publicKeyLabel": "User public key",
        becomeTrainer: "Become a trainer",
        becomeAuthor: "Become an author",
        "customImageUrlLabel": "Image url",
        "displayNameLabel": "Display name",
        "bioLabel": "Your bio",
        "bioPlLabel": "Your bio in polish",
        "publicKeyPlaceholder": "This key will be used to see your profile. Set to make your profile visible. Leave empty to not expose your profile.",
        "customImageUrlPlaceholder": "The url to your profile image. Keep empty to use image from Google.",
        "displayNamePlaceholder": "The name others will see. Keep empty to use name and surname.",
        "bioPlaceholder": "Write something about yourself here (accepts Markdown).",
        "websiteLabel": "Your website link",
        "githubLabel": "Username on GitHub",
        "twitterLabel": "Twitter identifier",
        "linkedinLabel": "LinkedIn identifier",
    },
    book: {
        sharedChapters: "Chapters available as articles",
        updates: "Updates",
        author: "The Author",
        booksTitle: "Our books",
        authorSmall: "The author:",
    },
    user: {
        achievements: {
            title: "Achievements",
            kotlinCertified: "Certified Kotlin Developer",
            kotlinDeveloper: "Kotlin Developer",
            ekReviewer: "Effective Kotlin Reviewer",
            author: "Kt. Academy author",
        },
        trainer: {
            propositionForm: {
                title: "Become a trainer",
                intro: "Kt. Academy connects world-class trainers with companies of all the sizes. Do you want to become one of them? Fill this form. We will review it and contact you as soon as possible.",
                topicsPrompt: "The topics that you would like to teach. Split with comma (for example Java, JavaScript, Microservices, Agile)",
                descriptionPrompt: "Describe yourself as a trainer. Why the company should choose you? This is a public description.",
                experiencePrompt: "What is your experience as a trainer? What is your profesional experience? This is an additional info for the Kt. Academy team.",
                shortDescription: "Short description, to show it on website when presented among other trainers.",
                privateConsultationTitle: "Your rate per hour for private consultations (optional)",
                companyConsultingTitle: "Your rate per day for in-company consultations (optional)",
                rateAmount: "Rate (example 123.00)",
                rateCurrency: "Currency",
            },
            consultationForm: {
                companyTitle: "Business consultation form",
                personalTitle: "Personal consultation form",
                email: "Email",
                topic: "The topic of the consultation",
                companyName: "Company name",
                studentExperience: "Your experience in the topic",
                when: "Preferred dates",
            },
        },
        author: {
            form: {
                title: "Author form",
                intro: "Would you like to become an author? Fill this form and soon we will contact you.",
                email: "Your email",
                type: "What would you like to write?",
                article: "An article",
                book: "A book",
                titleIdea: "Do you have an idea for a title?",
                idea: "Describe the main idea here",
            }
        },
        articlesAuthored: "Published articles",
        articlesReviewed: "Reviewed articles",
    },
    login: {
        pageLoginRequired: "You need to login to access this page",
        button: "Login",
        login: "Login to gain an access to courses",
        success: 'Successful login!',
        goToCourses: 'Go to courses page',
        hasAccess: 'You already have an access to courses',
    },
    trainers: {
        sectionTitle: "Among our trainers are:",
    },
    comment: {
        login: "Login to comment",
        prompt: "Your comment:",
        title: "Comments",
        delete: "Delete",
    },
}

const PL_desc = {
    "motto": "Uczymy programowania, skupiając się na najlepszych praktykach.",
    "description": "Kt. Academy - Uczenie to nasza pasja. Jeśli chcesz przejść z języka Java na Kotlin lub doskonalić umiejętności programowania w Kotline Twojego zespołu, nasze szkolenia są zdecydowanie dla Ciebie. Sprawdź warsztaty: Kotlin dla programistów Android, Effective Kotlin, Kotlin Coroutines, Kotlin dla programistów backend. Skupiamy się na najlepszych praktykach i na praktyce.",
    "tagsSEO": "Kotlin, warsztat, szkolenie, Android, programowanie, kodowanie, development, java, przejść na kotlin, java na kotlin",
    "title": "Kt. Academy - Szkolenia skupiające się na najlepszych praktykach",
    "trustedBy": "Zaufali nam",
    "menu": {
        "home": "Strona Główna",
        "offer": "Oferta",
        "whyUs": "Dlaczego my?",
        "workshopMaterial": "Zagadnienia",
        "trainer": "Trener",
        "materials": "Materiały",
        "workshops": "Warsztaty",
        "courses": "Kursy online",
        "upcomingWorkshops": "Warsztaty",
        "privateWorkshops": "Warsztaty",
        "books": "Książki",
        "articles": "Artykuły",
        "music": "Muzyka",
        "tools": "Narzędzia",
        "generate": "Generuj DTO",
        "json": "JSON formatter",
        "register": "Rejestracja",
        "contact": "Kontakt",
        "profile": {
            "me": "Profil",
            "sendFeedback": "Wyślij prywatny feedback",
            "removeAccount": "Usuń konto",
            "newsletterOn": "Włącz newsletter",
            "newsletterOff": "Wyłącz newsletter",
            "signOut": "Wyloguj",
        }
    },
    "flag": {
        "imgLink": "/images/pl-flag.png",
        "lang": "PL"
    },
    "slogan": {
        "title": "UCZYMY PROGRAMOWANIA",
        "subtitle": "SKUPIAJĄC SIĘ NA NAJLEPSZYCH PRAKTYKACH"
    },
    "workshopOffer": {
        "title": "Jakiego warsztatu szukasz?",
        "subtitle": "",
        "kotlinTitle": "Kotlin",
        "kotlinDesc": "Warsztaty dedykowane ekosystemowi Kotlina, w tym Coroutines i Android.",
        "dataScienceTitle": "Data Science",
        "dataScienceDesc": "Warsztaty dotyczące przetwarzania danych, sztucznej inteligencji i uczenia maszynowego.",
        "button": "Sprawdź najpopularniejsze warsztaty",
        "bestPracticesTitle": "Najlepsze praktyki",
        "bestPracticesDesc": "Warsztaty dla programistów różnych języków i technologii, dedykowane jakości kodu, wzorcom projektowym, refaktoryzacji oraz najlepszym praktykom.",
        "beginnersTitle": "Dla początkujących",
        "beginnersDesc": "Praktyczne szkolenia dla nowych i aspirujących programistów.",
        "testingTitle": "Testowanie",
        "testingDesc": "Warsztaty poświęcone testowaniu, zarówno hipotez biznesowych, jak i testom automatycznym oprogramowania.",
        "frontendTitle": "Frontend",
        "frontendDesc": "JavaScript, TypeScript, tworzenie stron i wszystko wokół.",
        "androidTitle": "Android",
        "androidDesc": "Warsztaty z Androida oraz narzędzi i bibliotek w nim używanych.",
        "dotNetTitle": ".NET",
        "dotNetDesc": "Warsztaty z .NET framework oraz najistotniejszych jego bibliotek.",
        "publicTitle": "Warsztaty otwarte",
        "publicSubtitle": "Zaplanowane warsztaty do których każdy może dołączyć",
    },
    "whyUs": {
        "title": "Dlaczego warto szkolić się z nami?",
        "subtitle": "Nasze warsztaty prowadzone są przez ekspertów światowej klasy, nastawione są na dobre praktyki i skupiają się na ćwiczeniach praktycznych.",
        "practicalTitle": "Ucz się poprzez praktyczne zadania",
        "bestTitle": "Ucz się od najlepszych",
        "practicalDesc1": "Wspieramy naukę poprzez praktyczne ćwiczenia, puzzlery i wyzwania programistyczne.",
        "practicalDesc2": "Sprawdź przykłady, żeby wiedzieć czego spodziewać się na warsztacie.",
        "puzzlers": "Puzzlery",
        "puzzlersButton": "Sprawdź przykładowy puzzler!",
        "challenges": "Wyzwania programistyczne",
        "challengesButton": "Sprawdź przykładowe wyzwanie!",
        "app": "Tworzenie praktycznych aplikacji"
    },
    "trainer": {
        "name": {
            "abTestingExperts": "Eksperci od testów A/B z Allegro",
            "teachingExperts": "Grupa zawodowych nauczycieli-programistów",
        },
        "bio": {
            "marcinmoskala": 'Marcin Moskała jest doświadczonym programistą Android, nauczycielem Kotlina z zamiłowania i <a href=\"https://www.jetbrains.com/company/partners/#countries=Poland&profession=TrainingPartner&speciality=Kotlin&technologies=Kotlin\"> oficjalnym partnerem szkoleniowym Jetbrains\' w zakresie szkoleń z języka Kotlin</a>. Jest założycielem <a href=\"https://kt.academy\"> Kt. Academy</a>, autorem książek <a href=\"https://leanpub.com/effectivekotlin/\"> \"Effective Kotlin\"</a> i <a href=\"https://www.packtpub.com/application-development/android-development-kotlin\"> \"Android Development with Kotlin\"</a>, a także aktywnym członkiem społeczności programistycznej. Jest też głównym autorem artykułów na <a href=\"https://blog.kotlin-academy.com\"> największej publikacji medium o Kotlinie </a> oraz prelegentem zapraszanym na wiele programistycznych konferencji.',
            "wlodek": "Jestem trenerem technicznym oraz prelegentem na konferencjach, specjalizującym się w zagadnieniach pracy z kodem zastanym i długiem technicznym poprzez techniki refaktoryzacji kodu. Mieszkam w Krakowie, ale często podróżuję po Polsce, Europie i świecie, aby wspierać moich klientów w ich działaniach.",
            "abTestingExperts": "Eksperci od testów A/B od podstaw tworzący w Allegro platformę Chi, najbardziej zaawansowane polskie rozwiązanie do prowadzenia testów A/B. Doskonale rozumieją nie tylko filozofię testowania, ale i stojącą za nią statystykę.",
            "teachingExperts": "Grupa kilku doświadczonych programistów z pasją do uczenia programowania. W tym Marcin Moskała, założyciel Kt. Academy.",
        },
    },
    "certificateTitle": "Jeden z pierwszych certyfikowanych treningów z Kotlina",
    "certificateDesc": "Jakość tego warsztatu została sprawdzona i certyfikowana przez twórców języka Kotlin. Szkolić Was będzie trener, który jest oficjalnym partnerem JetBrains w zakresie szkoleń z języka Kotlin.",
    "materialsSection": {
        "title": "Profesjonalne materiały szkoleniowe",
        "book": "Wszyscy uczestnicy warsztatu dostaną papierową wersję oraz kod na ebook książki Effective Kotlin w języku angielskim.",
        "onlineTasks": "Wszyscy uczestnicy będą mieli dostęp do naszej platformy edukacyjnej, na której znajdą pełne nagranie 3-dniowego kursu z Kotlina, dodatkowe materiały, a także ćwiczenia i wyzwania programistyczne.",
        "printedMaterials": "W przypadku szkoleń na miejscu, wszyscy uczestnicy otrzymają pełny zestaw materiałów w formie drukowanej, zawierający książkę ze slajdami, ćwiczenia, zadania oraz cheat sheet."
    },
    "testimonials": {
        "subtitle": "Pomogliśmy ponad 300 programistom z ponad 40 firm na całym świecie w przejściu na język Kotlin",
        "saramak": "\"Na warsztacie nie tylko usystematyzowałem sobie wiedzę ze składni języka kotlin, ale dzięki Marcinowi przestawiłem swoje myślenie o możliwości rozwiązania problemu w funkcjonalny sposób - dostałem do ręki nowe narzędzie, które moge wykorzystać w codziennej pracy. Wydaje mi się, że całe szkolenie jest nastawione na natychmiastowy zwrot zdobytej wiedzu w codziennej pracy. Duży +\"",
        "nazaruk": "\"Kotlin dla programistów Android to świetne warsztaty, prowadzone przez niezwykle kompetentnego trenera z Kt. Academy, Marcina Moskałę. To był intensywny, 3-dniowy kurs Kotlina, zakończony niełatwym egzaminem. Jestem pewna, że z wiedzą zdobytą na kursie, oraz certyfikatem wydanym po zdanym egzaminie mogę z optymizmem spojrzeć na swoją przyszłość jako Android Developer.\"",
        "grajewski": "\"Bardzo dobre szkolenie. W sam raz dla programistów, którzy w łatwy sposób chcą przenieść się z Javy na Kotlina. Szkolenie zawiera także ćwiczenia, które umożliwiają sprawdzenie nowej wiedzy w praktyce.\"",
        "button": "Zarezerwuj szkolenie dopasowane do Twoich potrzeb"
    },
    "contact": {
        "title": "Porozmawiajmy!",
        "stayInTouch": "Bądźmy w kontakcie!",
        "twitter": {
            "title": "Obserwuj nas na Twitter",
            "description": "Zrzeszamy społeczność ponad 3000 obserwujących i publikujemy tylko treści związane z programowaniem."
        },
        "mail": {
            "title": "Skontaktuj się z nami",
            "description": "Z chęcią opowiemy o naszych warsztatach i dostosujemy je do Twoich potrzeb. Napisz, jeżeli masz jakieś pytania.",
            "button": "Napisz do nas"
        },
        "newsletter": {
            "title": "Zapisz się do newslettera",
            "description": "Bądź na bieżąco z naszymi artykułami i szkoleniami. Wysyłamy tylko informacje związane z programowaniem.",
            "button": "Zapisz się"
        }
    },
    "footerContact": "Napisz do nas:", "privacyPolicy": "Polityka prywatności",
    "workshopsList": {
        "button": "Więcej informacji",
        "otherOption": "Na stronie umieszczamy najpopularniejsze warsztaty. Jeśli nie widzisz szkolenia, które Cię interesuje lub chciałbyś dopasować materiał do potrzeb i poziomu zespołu, skontaktuj się z nami: ",
    },
    "workshopPage": {
        "knowledgeSources": {
            "title": "Podczas warsztatu nauczysz się poprzez:",
            "lecture": "Wykład wspierany slajdami",
            "exercises": "Wykonanie praktycznych ćwiczeń",
            "puzzlers": "Rozwiązanie Kotlinowych puzzler'ów",
            "challenges": "Rozwiązanie programistycznych wyzwań",
            "android": "Napisanie aplikacji Android w Kotlinie",
            "discussion": "Dyskusje grupowe",
        },
        "titleToc": "Materiał omawiany podczas warsztatu:",
        "titleRequirements": "Wymagania",
        "titleAbout": "O kursie",
        "titleHowLong": "Ile trwa ten warsztat?",
        "registration": {
            "title": "Wyślij zgłoszenie",
            "register": "Wyślij zgłoszenie",
            "private": {
                "buttonText": "Szkolenie prywatne",
                "chooseOption": "Wybierz tę opcję, jeśli potrzebujesz szkolenia dla swojego zespołu lub firmy. ",
                "explanation": 'Podstawowa cena w Polsce i w języku polskim to {workshop_price_pl} za grupę (w innym przypadku {workshop_price}) za {days_num} dni szkolenia.',
            },
            "public": {
                "buttonText": "Szkolenie otwarte online",
                "chooseOption": "Wybierz tę opcję, jeśli potrzebujesz szkolenia dla siebie lub małej grupy. ",
                "explanation": 'Podstawowa cena to {workshop_person_price_pl} za osobę za całe szkolenie w języku polskim.',
            },
            "consultations": {
                "text": "Nasi eksperci oferują konsultacje zarówno dla firm, jak i osób prywatnych. Cena ustalana jest indywidualnie.",
                "chooseOption": "Nawiąż kontakt",
            },
            "publicPlanned": {
                "explanation": 'Dołącz do szkolenia online w dniach {start_date} do {end_date}, w godzinach {time}. Cena to {workshop_person_price_pl} za osobę.',
            }
        },
        trainerBio: {
            "rafalgrzesik": "Doświadczony programista, trener i mentor w obszarach JavaScript, TypeScript, Angular, C#, wzorce projektowe i DDD. Pomógł już setkom programistów poprzez szkolenia, których oceny w ankietach uzyskują średnią powyżej 4/5."
        }
    },
    "puzzler": {
        "descriptionSEO": "Sprawdź przykładowe puzzlery, które programiści rozwiązują na warsztatach Kt. Academy. Wierzymy, że szkolenie powinno być tak praktyczne, jak to tylko możliwe.",
        "tagsSEO": "Kotlin, warsztat, Android, programowanie, ćwiczenia Kotlin, puzzler, wyzwania programistyczne",
        "title": "Ucz się przez praktykę",
        "subtitle": "Rozwiąż Kotlinowe puzzlery",
        "whatArePuzzlers": "Co to są puzzlery?",
        "description": "Puzzlery to podchwytliwe programistyczne wyzwania, z często zaskakującymi odpowiedziami. Pokazują, jak złe praktyki mogą prowadzić do problemów.",
        "examplesTitle": "Przykładowe puzzlery",
        "whatPrint": "Co zostanie wydrukowane?",
        "whatDisplay": "Co zostanie wyświetlone?",
        "showAnswers": "Pokaż odpowiedź i wyjaśnienie",
        "correctAnswer": "Poprawna odpowiedź",
        "explanation": "Wyjaśnienie",
        "puzzle1Title": "Kolejność",
        "puzzle1Answers": {
            "a": "a) 3",
            "b": "b) 5",
            "c": "c) 2",
            "d": "d) 0"
        },
        "puzzle1Explanation": "Jest to programistyczny odpowiednik równania 1 + 2 * 3 = ?. Operator Elvisa ma niższy priorytet niż plus, w związku z czym będzie on wykonany później. Mylący jest tutaj brak spacji. Używaj nawiasów, nie białych znaków.",
        "puzzle2Title": "Funkcje rozszerzające",
        "puzzle2Answers": {
            "a": "a) Doesn't compile",
            "b": "b) Runtime error",
            "c": "c) c",
            "d": "d) d"
        },
        "puzzle2Explanation": "Zostanie wydrukowane c ze względu na to, czym są funkcje rozszerzające - są zwykłymi funkcjami, a receiver (tutaj C i D) jest pierwszym parametrem. Zachowywać się więc będą tak, jak byśmy mieli 2 funkcje statyczne foo z różnymi parametrami. To, która z nich zostanie ostatecznie wybrana, będzie zależeć od tego jaki jest typ przekazanej wartości. Zostanie to określone statycznie w czasie kompilacji."
    },
    "challenge": {
        "descriptionSEO": "Sprawdź przykładowe wyzwania, które programiści rozwiązują na warsztatach Kt. Academy. Wierzymy, że szkolenie musi być tak praktyczne, jak to tylko możliwe.",
        "tagsSEO": "Kotlin, warsztat, Android, programowanie, ćwiczenia Kotlin, puzzler, wyzwania programistyczne",
        "title": "Ucz się przez praktykę",
        "subtitle": "Wyćwicz nowe umiejętności rozwiązując programistyczne wyzwania",
        "whatAreChallenges": "Co to są wyzwania programistyczne?",
        "description": "Małe programistyczne zadania, które wymagają zaimplementowania funkcji lub klasy w języku Kotlin. Dzięki temu możesz sprawdzić w praktyce czy poprawnie rozumiesz materiał z kursu i wyćwiczyć to tak, aby być w stanie używać nowych umiejętności od razu po warsztacie. Wszystkie wyzwania zostały zweryfikowane przez testy jednostkowe.",
        "examplesTitle": "Przykładowe wyzwania"
    },

    "form": {
        "private": {
            "title": "Szkolenie prywatne",
            "intro": "Wypełnij ten formularz aby zgłosić grupę na prywatne szkolenie [{workshop_name}]({workshop_link}).",
            "inCompanyWarning": "W przypadku szkoleń poza Warszawą do ceny zostaną dodane koszty dojazdu i zakwaterowania"
        },

        "public": {
            "title": "Szkolenie otwarte online",
            "intro": "Wypełnij ten formularz, aby zapisać się na otwarte szkolenie online [{workshop_name}]({workshop_link}). Zostaniesz umieszczony na liście oczekujących zainteresowanych tym warsztatem. Skontaktujemy się z Tobą, kiedy zbierze się odpowiednia liczba osób do utworzenia grupy i przeprowadzenia kursu."
        },

        "plannedPublic": {
            "title": "Szkolenie otwarte online",
            "intro": "Wypełnij ten formularz, aby zapisać się na otwarte szkolenie online [{workshop_name}]({workshop_link}) odbywające się w dniach {start_date} w godzinach {time}."
        },

        "consultations": {
            "title": "Konsultacje",
            "intro": "Ten formularz dotyczy konsultacji w temacie szkolenia [{workshop_name}]({workshop_link}). Wypełnij go, a my skontaktujemy się z trenerem i wrócimy do Ciebie najszybciej, jak to możliwe.",

            "consultationType": {
                question: "Dla kogo będą te konsultacje?",
                private: "Dla osoby prywatnej",
                company: "Dla firmy",
            },
        },

        "namePrompt": "Twoje imię",
        "emailPrompt": "Twój email",
        "companyNamePrompt": "Nazwa firmy",
        "groupSizePrompt": "Ile osób będzie uczestniczyć w szkoleniu?",
        "orMore": "albo więcej",
        "justMe": "Tylko ja",
        "countryPrompt": "Kraj lub region",
        "datePrompt": "Jaki termin Ci odpowiada?",
        "extraPrompt": "Czy jest jeszcze coś, co chciałbyś dodać?",
        "privateGroupSizePrompt": "Ilu programistów chciałbyś/chciałabyś zarejestrować?",
        "dialogSent": "Zgłoszenie wysłane",
        "dialogSetYourProfileContinuation": ", pamiętaj także uzupełnić swój profil",
        "dialogError": "Wystąpił problem, wyślij później",

        "isOnline": {
            "question": "Jesteś zainteresowany szkoleniem zdalnym czy w siedzibie firmy?",
            "inCompany": "W siedzibie firmy",
            "online": "Zdalnie",
        },

        "registerKind": {
            "question": "Kogo chcesz zarejestrować?",
            "myself": "Tylko siebie",
            "developerCompany": "Programistę z mojej firmy",
            "myselfAndGroupCompany": "Siebie oraz innych programistów z mojej firmy",
            "groupCompany": "Innych programistów z mojej firmy",
        },

        "invoiceTo": {
            "question": "Na kogo będzie wystawiana faktura?",
            "company": "Na firmę, dla której pracuję",
            "privateCompany": "Na moją własną firmę",
            "person": "Na mnie",
        },

        "developerExperience": {
            "questionMyself": "Jakie jest Twoje doświadczenie w pracy jako programista?",
            "questionOther": "Jakie jest doświadczenie zapisywanych osób w pracy jako programiści?",
            "no": "Brak doświadczenia",
            "junior": "Junior developer",
            "mid": "Developer",
            "senior": "Senior developer",
        },

        "priceAcceptance": {
            "question": "Podstawowa cena tego szkolenia to {price_pl} za całe szkolenie. Czy Ci to odpowiada?",
            "ok": "Tak",
            "discountNeeded": "To dla mnie za dużo, potrzebuję zniżki",
            "wayTooMuch": "Mój budżet to mniej niż połowa tej ceny",
        },

        "required": "Pole wymagane",
        "invalidEmail": "Niepoprawny adres email",
        "invalidNumber": "Niepoprawny numer",
        "shouldBeUrl": "To powinien być link",
        "shouldNotBeUrl": "To nie powinien być link",
        "submit": "Wyślij",
        "save": "Zapisz",

        "requestOpenInsteadInfo": "Dla mniejszych grup sugerujemy warsztaty otwarte, gdzie cena ustalona jest od osoby. Aby zapisać się na takie szkolenie użyj [tego formularza]({openFormLink}).",
        "notForBeginnerInfo": "Niestety, ale to szkolenie jest skierowane do doświadczonych programistów. Sprawdź nasze [szkolenia dla początkujących](https://kt.academy/workshop#tag-beginners). Jeśli natomiast Twoim celem jest nauczenie się języka Kotlin, to [w tym artykule](https://blog.kotlin-academy.com/best-kotlin-free-online-courses-5838cb7063c6) znajdziesz polecane przez nas darmowe kursy.",
        "noVatIdInfo": "Możliwe, że nie będziemy w stanie zaoferować Ci żadnej zniżki, ponieważ w przypadku osoby prywatnej jesteśmy zobligowani zapłacić dodatkowy podatek w wysokości 23%.",

        "howDoYouKnow": {
            "title": "Jak dowiedziałeś się o szkoleniu?",
            "ad": "Z reklamy na Facebook/Twitter",
            "post": "Z postu na Facebook/Twitter",
            "newsletter": "Z newslettera",
            "recommendation": "Z polecenia",
            "linkedin": "Z LinkedIn",
            "article": "Z artykułu",
            "search": "Google",
            "other": "Inne",
            "explain": "Proszę sprecyzuj",
        }
    },
    "generate": {
        "title": "Generuj DTO",
        "pastePrompt": "Wklej swój kod tutaj: ",
        "dtoName": "Nazwa DTO: ",
        "dtoSuffix": "(albo) suffix: ",
        "generateButton": "Generuj",
    },
    "errorMessage": "Wystąpił błąd. Przykro nam. Możesz się z nami skontaktować przez email contact@kt.academy",
    "feedback": {
        "button": "Feedback",
        "prompt": 'Co o tym myślisz? Co moglibyśmy ulepszyć?',
        "placeholder": 'Twój feedback tutaj...',
        "thankYou": "Bardzo dziękuję za komentarz, jest to dla nas bardzo ważne :)",
    },
    "music": {
        "recommendationAdded": "Rekomendacja dodana, dziękujemy :)",
        "volume": "Głośność",
        "pickerWorkTime": "Czas pracy",
        "pickerBreakTime": "Czas przerwy",
        "displayWorkTime": "Czas pracy",
        "displayBreakTime": "Przerwa",
        "sessionTime": "Długość sesji: ",
        "timeUntilWork": "Czas do pracy: ",
        "timeUntilBreak": "Czas do przerwy: ",
        "totalConcentrationTime": "Całkowity czas skupienia: ",
        "startWork": "Rozpocznij pracę",
        "startBreak": "Rozpocznij przerwę",
        "ratePrompt": "Oceń ten klip:",
        "youtubeKey": "Klucz filmu na YouTube: ",
        "recommendButton": "Poleć",
        "recommendationsList": "Polecenia: ",
        "blocked": "Zablokowane",
        "block": "Zablokuj",
        "favourite": "Ulubione",
        "makeFavourite": "Dodaj do ulubionych",
    },
    "article": {
        "more": "Więcej naszych artykułów znajdziesz na ",
        "notTranslated": "Artykuł nie został przetłumaczony. Jeśli chcesz być bohaterem, [zgłoś się jako tłumacz](https://marcinmoskala.typeform.com/to/MI3Lxn0Y).",
        author: {
            title: "Autor:"
        },
        reviewer: {
            title: "Recenzenci:",
            open: {
                name: "Ty?"
            }
        },
        prev: "Poprzedni",
        next: "Następny",
    },
    "editProfile": {
        "pageVisibleOn": "Twój profil jest widoczny pod ",
        becomeTrainer: "Zostań trenerem",
        becomeAuthor: "Zostań autorem",
        "publicKeyLabel": "Klucz publiczny użytkownika",
        "publicKeyPlaceholder": "Ten klucz będzie identyfikował twój profil i określał link pod jakim będzie można go odnaleźć. Jeśli chcesz by twój profil pozostał prywatny, zostaw to pole puste.",
        "customImageUrlLabel": "Url zdjęcia",
        "customImageUrlPlaceholder": "Link do zdjęcia, które chcesz by wyświetlało się na twoim profilu. Pozostaw puste, by użyte zostało zdjęcie z Google.",
        "displayNameLabel": "Nazwa widoczna dla innych użytkowników",
        "displayNamePlaceholder": "Nazwa widoczna dla innych użytkowników. Pozostaw to pole puste by używane było imię i nazwisko.",
        "bioLabel": "Twój opis po angielsku",
        "bioPlLabel": "Twój opis po polsku",
        "bioPlaceholder": "Napisz swoje bio (możesz użyć formatu Markdown).",
        "websiteLabel": "Link do strony internetowej",
        "githubLabel": "Nazwa użytkownika na GitHub",
        "twitterLabel": "Identyfikator na Twitter",
        "linkedinLabel": "Identyfikator na LinkedIn",
    },
    book: {
        sharedChapters: "Rozdziały dostępne jako artykuły",
        updates: "Nowości",
        author: "Autor",
        booksTitle: "Nasze książki",
        authorSmall: "Autor:",
    },
    user: {
        achievements: {
            title: "Osiągnięcia",
            kotlinCertified: "Certyfikowany Programista Kotlin",
            kotlinDeveloper: "Programista Kotlin",
            ekReviewer: "Recenzent Effective Kotlin",
            author: "Autor na Kt. Academy",
        },
        trainer: {
            propositionForm: {
                title: "Zostań trenerem",
                intro: "Kt. Academy zrzesza światowej sławy trenerów by wspomagać ich w dostarczaniu jakościowych szkoleń. Chcesz zostać jednym z nich? Uzupełnij ten formularz. Ostrzegamy jednak, że byś został trenerem, nasz zespół musi wyrazić na to zgodę. W tej sprawie możemy się z tobą kontaktować. Wypełnij ten formularz w języku angielskim.",
                topicsPrompt: "Wymień tematy, w jakich czujesz się mocny/mocna i których chciałbyś/chciałabyć uczyć.",
                descriptionPrompt: "Opisz siebie jako trenera. Czemu to właśnie Twoje szkolenie lub konsultacje ktoś miałby kupić? Ten opis będzie widoczny publicznie.",
                experiencePrompt: "Jakie masz doświadczenie jako trener? Jakie masz doświadczenia zawodowe? To jest opis dla nas, zespołu Kt. Academy.",
                shortDescription: "Krótki opis do wyświetlenia przy krótkiej prezentacji wśród trenerów.",
                privateConsultationTitle: "Twoja stawka za godzinę konsultacji prywatnych (dla osób prywatnych)",
                companyConsultingTitle: "Twoja stawka za dzień konsultacji dla firmy",
                rateAmount: "Stawka (np. 123.00)",
                rateCurrency: "Waluta",
            },
            consultationForm: {
                companyTitle: "Formularz konsultacji biznesowych",
                personalTitle: "Formularz konsultacji personalnych",
                email: "Email do osoby kontaktowej",
                topic: "Temat konsultacji",
                companyName: "Nazwa firmy",
                studentExperience: "Twoje doświadczenie w tym temacie",
                when: "Preferowany termin",
            },
        },
        author: {
            form: {
                title: "Formularz autora",
                intro: "Chciałbyś zostać autorem? Wypełnij ten formularz, a odezwiemy się niedługo.",
                email: "Twój email",
                type: "Co chciałbyś napisać",
                article: "Artykuł",
                book: "Książkę",
                titleIdea: "Masz już pomysł na tytuł?",
                idea: "Opisz główną ideę",
            }
        },
        articlesAuthored: "Opublikowane artykuły",
        articlesReviewed: "Zrecenzowane artykuły",
    },
    login: {
        pageLoginRequired: "Musisz być zalogowany by przejść do strony",
        button: "Zaloguj się",
        login: "Zaloguj się aby mieć dostęp do kursu",
        success: 'Udane logowanie!',
        goToCourses: 'Przejdź na stronę kursów',
        hasAccess: 'Masz już dostęp do kursów',
    },
    trainers: {
        sectionTitle: "Nasi trenerzy to między innymi:",
    },
    comment: {
        login: "Zaloguj się by skomentować",
        prompt: "Twój komentarz:",
        title: "Komentarze",
        delete: "Usuń",
    },
}
