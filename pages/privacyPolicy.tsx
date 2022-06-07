import React from 'react';
import {registerPage} from "../src/Utils";
import FooterSection from "../components/section/FooterSection";
import Header from "../components/section/Header";

export default function PrivacyPolicy() {
    registerPage("privacy-policy")
    return <>
        <Header/>
        <section className="privacy-policy">
            <div className="content-container text-align-left">
                <h1 className="margin-top-20">Polityka prywatności</h1>
                <h2>O nas</h2>
                <p> Marcin Moskała z siedzibą w 02-776 Warszawa, ul. Indiry Gandhi 27/58, wpisanym do rejestru
                    przedsiębiorców prowadzonego przez Centralną Ewidencję i Informację o Działalności Gospodarczej, NIP
                    9512339640, REGON 363258941, e-mail: contact@kt.academy, zwana dalej Marcin Moskała. Dane osobowe są
                    pozyskiwane i przetwarzane w sposób i na zasadach określonych w niniejszej Polityce.</p>

                <h2> Postanowienia ogólne </h2>
                <p>W Podmiocie przywiązujemy szczególną wagę do ochrony prywatności naszych klientów, kontrahentów i
                    pracowników. Jednym z jej kluczowych aspektów jest ochrona praw i wolności osób fizycznych w związku
                    przetwarzaniem ich danych osobowych.</p>
                <p>Dbamy, by przetwarzanie danych osobowych odbywało się zgodne z przepisami Ogólnego Rozporządzenia o
                    Ochronie Danych 2016/679/WE (zwanego dalej „RODO”), ustawy o ochronie danych osobowych, a także
                    przepisami szczególnymi (zawartymi m.in. w prawie pracy, czy ustawie o rachunkowości).</p>
                <p>Podmiot jest administratorem danych osobowych w rozumieniu art. 4 pkt 7 RODO, korzystamy też z usług
                    podmiotów przetwarzających, o których mowa w art. 4 pkt. 8 RODO – przetwarzają one dane osobowe w
                    imieniu administratora (są to np. firmy księgowe, informatyczne, konsultingowe, podwykonawcze).</p>
                <p>Jako Podmiot wdrażamy odpowiednie środki techniczne i organizacyjne, aby zapewnić stopień
                    bezpieczeństwa odpowiadający ewentualnemu ryzyku naruszenia praw lub wolności osób fizycznych o
                    różnym prawdopodobieństwie wystąpienia i wadze zagrożenia. Opracowujemy także polityki i procedury,
                    jak również organizujemy regularne szkolenia podnoszące wiedzę i kompetencje naszych pracowników w
                    tym obszarze.</p>

                <h2>Do czego wykorzystujemy Twoje dane osobowe</h2>
                <p>Jako pracodawca, przetwarzamy dane pracowników oraz osób, które współpracują z nami na innej
                    podstawie niż stosunek pracy. Dane kontaktowe pozyskiwane od kontrahentów (np. ich pracowników)
                    służą zawieraniu i sprawnej realizacji umów. Prowadzimy także działalność marketingową i w jej
                    ramach staramy się dotrzeć do potencjalnych klientów, by zapewnić im aktualne informacje o naszych
                    produktach i usługach.</p>
                <p>Podmiotom trzecim udostępniamy dane osobowe na podstawie obowiązujących przesłanek legalizacyjnych
                    (podstaw przetwarzania danych osobowych). Przetwarzania dokonujemy za zgodą, w związku z zawieranymi
                    umowami, uzasadnionym interesem administratora lub gdy jesteśmy do tego zobowiązani na podstawie
                    przepisów prawa.</p>

                <h2>Na jakich zasadach i na jakiej podstawie przetwarzamy dane osobowe</h2>
                <p>Dokładamy staranności w celu ochrony interesów osób, których dane dotyczą, a w szczególności
                    zapewniamy, aby dane te były:</p>
                <ul>
                    <li>przetwarzane zgodnie z prawem, rzetelnie i przedstawione w sposób przejrzysty dla osoby, której
                        dane dotyczą;
                    </li>
                    <li>zbierane w konkretnych, wyraźnych i prawnie uzasadnionych celach i nieprzetwarzane dalej w
                        sposób niezgodny z tymi celami;
                    </li>
                    <li>adekwatne, stosowne oraz ograniczone do tego, co niezbędne do celów, w których są
                        przetwarzane;
                    </li>
                    <li>prawidłowe i w razie potrzeby uaktualniane; podejmujemy działania, aby dane osobowe, które są
                        nieprawidłowe w świetle celów ich przetwarzania, zostały niezwłocznie usunięte lub sprostowane;
                    </li>
                    <li>przechowywane w formie umożliwiającej identyfikację osoby, której dane dotyczą, przez okres nie
                        dłuższy, niż jest to niezbędne do celów;
                    </li>
                    <li>przetwarzane w sposób zapewniający odpowiednie bezpieczeństwo danych osobowych, w tym ochronę
                        przed niedozwolonym lub niezgodnym z prawem przetwarzaniem oraz przypadkową utratą,
                        zniszczeniem.
                    </li>
                </ul>
                <p>Twoje dane przetwarzamy zwykle w celach niezbędnych do wykonania umowy, której jesteś stroną lub do
                    podjęcia działań na Twoje żądanie, jeszcze przed zawarciem umowy. Dane przetwarzamy także na
                    podstawie zgody, która może zostać wycofana w każdym momencie.</p>
                <p>W niektórych sytuacjach przetwarzanie jest niezbędne do wypełnienia obowiązku prawnego ciążącego na
                    administratorze. Takie obowiązki wynikają np. z przepisów prawa pracy czy ustawy o
                    rachunkowości.</p>
                <p>Przetwarzanie może być także niezbędne do celów wynikających z naszych prawnie uzasadnionych
                    interesów, czego przykładem jest dochodzenie roszczeń z prowadzonej przez nas działalności
                    gospodarczej.</p>

                <h2>Jakie prawa Ci przysługują</h2>
                <p>Podejmujemy odpowiednie środki, aby w zwięzłej, przejrzystej, zrozumiałej i łatwo dostępnej formie,
                    jasnym i prostym językiem, udzielić wszelkich stosownych informacji oraz prowadzić z Tobą wszelką
                    komunikację w sprawie przetwarzania danych osobowych w związku z realizacją przysługującego Ci prawa
                    do:</p>
                <ul>
                    <li>informacji udzielanych przy pozyskiwaniu danych osobowych,</li>
                    <li>informacji udzielanych na wniosek - o tym, czy dane są przetwarzane, oraz innych kwestiach
                        określonych w art. 15 RODO, w tym prawa do kopii danych,
                    </li>
                    <li>sprostowania danych;</li>
                    <li>bycia zapomnianym;</li>
                    <li>ograniczenia przetwarzania;</li>
                    <li>przenoszenia danych;</li>
                    <li>sprzeciwu;</li>
                    <li>niepodlegania decyzji opierającej się wyłącznie na zautomatyzowanym przetwarzaniu (w tym
                        profilowaniu),
                    </li>
                    <li>informacji o naruszeniu ochrony danych.</li>
                </ul>
                <p>W celu kontaktu odnośnie realizacji danego prawa wyślij wiadomość na adres contact@kt.academy.</p>


                <h2>Jak będziemy się z Tobą kontaktować</h2>
                <p>Informacji udzielamy na piśmie lub w inny sposób, w tym – w stosownych przypadkach – elektronicznie.
                    Jeżeli tego zażądasz, informacji możemy udzielić ustnie, o ile innymi sposobami potwierdzimy Twoją
                    tożsamość. Jeśli przekażesz swoje żądanie elektronicznie, w miarę możliwości informacje także
                    zostaną przekazane elektronicznie, chyba że wskażesz nam inną preferowaną formę komunikacji. </p>

                <h2>W jakim terminie spełnimy Twoje żądanie</h2>
                <p>Informacji staramy się udzielać bez zbędnej zwłoki – z zasady w terminie miesiąca od otrzymania
                    żądania. W razie potrzeby termin ten przedłużymy o kolejne dwa miesiące z uwagi na skomplikowany
                    charakter żądania lub liczbę żądań. Jednak w każdym przypadku, w terminie miesiąca od otrzymania
                    żądania, poinformujemy Cię o podjętych działaniach i (w stosownych przypadkach) o przedłużeniu
                    terminu, z podaniem przyczyny takiego opóźnienia.</p>

                <h2>Podwykonawcy/podmioty przetwarzające</h2>
                <p>Jeżeli współpracujemy z podmiotami, które w naszym imieniu przetwarzają dane osobowe, korzystamy
                    wyłącznie z usług takich podmiotów przetwarzających, które zapewniają wystarczające gwarancje
                    wdrożenia odpowiednich środków technicznych i organizacyjnych, by przetwarzanie spełniało wymogi
                    RODO i chroniło prawa osób, których dane dotyczą.</p>
                <p>Szczegółowo sprawdzamy podmioty, którym powierzamy przetwarzanie Twoich danych – stosujemy wobec nich
                    Procedurę wyboru kontrahenta. Zawieramy z nimi szczegółowe umowy, a także dokonujemy okresowych
                    kontroli zgodności operacji przetwarzania z treścią takiej umowy i przepisami prawa.</p>

                <h2>Jak dbamy o przetwarzanie Twoich danych</h2>
                <p>Aby sprostać wymogom prawa opracowaliśmy szczegółowe procedury obejmujące takie zagadnienia, jak
                    m.in.:</p>
                <ul>
                    <li>ochrona danych w fazie projektowania i domyślna ochrona danych,</li>
                    <li>ocena skutków dla ochrony danych,</li>
                    <li>notyfikacja naruszeń,</li>
                    <li>sporządzanie rejestru czynności przetwarzania danych,</li>
                    <li>retencja danych,</li>
                    <li>realizacja praw osób, których dane dotyczą.</li>
                </ul>
                <p>Regularnie sprawdzamy i aktualizujemy naszą dokumentację, by móc wykazać spełnienie wymagań prawa
                    zgodnie ze sformułowaną w RODO zasadą rozliczalności, ale też w trosce o interesy osób, których dane
                    dotyczą staramy się inkorporować do niej najlepsze praktyki rynkowe.</p>

                <h2>Retencja danych</h2>

                <p>Dane osobowe przechowujemy w formie umożliwiającej identyfikację osoby, której dane dotyczą, przez
                    okres nie dłuższy, niż jest to niezbędne do celów, w których dane te są przetwarzane. Po upływie
                    takiego okresu dane anonimizujemy (pozbawiamy cech umożliwiających zidentyfikowanie danej osoby)
                    albo usuwamy. Usuwanie danych osobowych jest całkowite i trwałe. W procedurze retencji
                    zapewniamy:</p>
                <ul>
                    <li>ograniczenie okresu przechowywania danych osobowych do ścisłego minimum,</li>
                    <li>ustalenie terminu usuwania danych osobowych i kryteriów ustalania tego terminu lub okresowego
                        przeglądu.
                    </li>
                </ul>
                <p>Okres przetwarzania danych określamy w pierwszej kolejności na podstawie przepisów prawa (np. czas
                    przechowywania dokumentacji pracowniczej, dokumentów rachunkowych), a także usprawiedliwionego
                    interesu administratora (np. działalność marketingowa). Polityka retencji obejmuje zarówno dane
                    przetwarzane w postaci papierowej, jak i elektronicznej.</p>

                <h2>Upoważnienia</h2>
                <p>Zapewniamy, by każda osoba działająca z naszego upoważnienia i mająca dostęp do Twoich danych
                    osobowych przetwarzała je wyłącznie na nasze polecenie, chyba że inne wymagania wynikają z prawa
                    Unii lub prawa państwa członkowskiego.</p>


                <h1>Polityka plików Cookies</h1>
                <h2>Czym jest plik Cookie?</h2>
                <p>Pliki Cookie to niewielkie pliki tekstowe przechowywane na urządzeniu końcowym Użytkownika
                    (komputerze stacjonarnym, laptopie, tablecie, smartfonie etc).</p>
                <p>Tworzone są przez Twoją przeglądarkę internetową i przechowują ustawienia i informacje potrzebne (a
                    często niezbędne) do prawidłowego funkcjonowania serwisu internetowego. Przy kolejnych odwiedzinach
                    serwisu z tego samego urządzenia przeglądarka może sprawdzić, czy istnieją pliki cookies
                    przechowujące ważne informacje i przesłać je ponownie do odwiedzanej witryny, która wcześniej
                    zapisała ciasteczko w Twoim urządzeniu. Witryna w ten sposób może rozpoznać, że użytkownik odwiedził
                    ją wcześniej i np. dopasować prezentowaną treść do odbiorcy.</p>

                <h2>Zalety plików Cookie</h2>
                <p>Pliki cookie ułatwiają użytkownikowi korzystanie z wcześniej odwiedzanych przez niego stron
                    internetowych. Jeśli użytkownik korzysta z tego samego urządzenia i przeglądarki co wcześniej,
                    umożliwia to zapamiętanie jego preferencji i pozwala odpowiednio wyświetlić stronę internetową,
                    dostosowaną do jego indywidualnych preferencji. Pliki cookies pozwalają tworzyć statystyki,
                    które pomagają zrozumieć, w jaki sposób Użytkownicy korzystają ze strony internetowej, a to z
                    kolei pozwala na ulepszanie jej struktury i zawartości. Pozwalają również na utrzymanie sesji
                    Użytkownika Serwisu (po zalogowaniu), dzięki temu każda kolejna podstrona serwisu nie wymaga
                    ponownego logowania.</p>

                <h2>Kontrolowanie i usuwanie plików Cookie</h2>
                <p>Użytkownik w dowolnym momencie może zmieniać sposób korzystania z plików cookies. Większość
                    przeglądarek oferuje możliwość akceptowania lub odrzucania wszystkich plików cookie,
                    akceptowania tylko niektórych rodzajów albo informowania użytkownika za każdym razem, gdy strona
                    internetowa próbuje je zapisać. Użytkownik może również z łatwością usuwać pliki cookie, które
                    zostały już zapisane na urządzeniu przez przeglądarkę. Możliwości zarządzania i usuwania plików
                    cookie różnią się w zależności od używanej przeglądarki. Wszystkie niezbędne informacje
                    Użytkownik może znaleźć wykorzystując funkcję Pomoc w swojej przeglądarce lub odwiedzając stronę
                    internetową http://www.aboutcookies.org/, na której wyjaśniono, jak kontrolować i usuwać pliki
                    cookie w najpopularniejszych przeglądarkach. Pamiętaj, że zablokowanie wszystkich ciasteczek
                    może spowodować trudności w działaniu lub zupełnie uniemożliwić korzystanie z niektórych
                    funkcjonalności strony.</p>

                <h2>Jakie pliki Cookie wykorzystuje witryna?</h2>
                <p>Serwis wykorzystuje pliki cookies, które można podzielić w następujący sposób:</p>
                <ul>
                    <li>„niezbędne” – czyli umożliwiające korzystanie z usług dostępnych w ramach Serwisu, np.
                        podtrzymujące sesję po zalogowaniu użytkownika;
                    </li>
                    <li>„funkcjonalne” – pliki umożliwiające „zapamiętanie” wybranych ustawień i wpływające na
                        personalizację interfejsu;
                    </li>
                    <li>„funkcjonalne” – pliki umożliwiające „zapamiętanie” wybranych ustawień i wpływające na
                        personalizację interfejsu;
                    </li>
                    <li>„zabezpieczające” – wspomagające zapewnienie bezpieczeństwa</li>
                    <li>„wydajnościowe” – pliki umożliwiające zbieranie informacji o sposobie korzystania z
                        Serwisu.
                    </li>
                </ul>

                <h2>Jak zmienić ustawienia plików Cookie w Twojej przeglądarce?</h2>
                <p>Informacje dotyczące zmiany ustawień plików cookies w poszczególnych przeglądarkach dostępne są
                    na poniższych stronach:</p>
                <ul>
                    <li>Ustawienia plików cookies Internet Explorer <br/>
                        http://support.microsoft.com/kb/196955
                    </li>
                    <li>Ustawienia plików cookies Chrome <br/>
                        https://support.google.com/chrome/answer/95647?hl=pl
                    </li>
                    <li>Ustawienia plików cookies Firefox <br/>
                        https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences
                    </li>
                    <li>Ustawienia plików cookies Opera <br/>
                        http://help.opera.com/Windows/12.10/pl/cookies.html
                    </li>
                    <li>Ustawienia plików cookies Safari <br/>
                        http://support.apple.com/kb/PH5042
                    </li>
                </ul>

                <p> Informacje dla urządzeń mobilnych dostępne są na poniższych stronach:</p>
                <ul>
                    <li>Pliki cookies w Android <br/>
                        https://support.google.com/chrome/answer/95647?hl=pl
                    </li>
                    <li>Pliki cookies w Blackberry <br/>
                        https://docs.blackberry.com/en
                    </li>
                    <li>Pliki cookies w iOS (Safari) <br/>
                        http://support.apple.com/kb/HT1677?viewlocale=pl_PL
                    </li>
                    <li>Pliki cookies w Windows Phone <br/>
                        https://support.microsoft.com/en-gb/help/11696/windows-phone-7
                    </li>
                </ul>
            </div>
        </section>
        <FooterSection/>
    </>
}