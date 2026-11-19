/**
 * Publikacje branżowe Diagnostyka-Systems s.c.
 * Źródło: Kwartalnik motoryzacyjny "Moto części" (artykuły drukowane zespołu inżynierskiego).
 */

export interface PublicationMetric {
  label: string;
  value: string;
  note: string;
}

export interface PublicationSection {
  id: string;
  title: string;
  paragraphs: string[];
  callout?: string;
}

export interface PublicationItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  sourceJournal: string;
  publicationDate: string;
  pageNumber?: string;
  summary: string;
  scanImage: string;
  scanImageJpg: string;
  sourceUrl: string;
  originalTitleInCms: string;
  lead: string;
  metrics: PublicationMetric[];
  sections: PublicationSection[];
  keyTakeaway: string;
}

export const PUBLICATIONS_DATA: PublicationItem[] = [
  {
    id: 'rentownosc-ogumienia',
    slug: 'rentownosc-ogumienia',
    title: 'Rentowność ogumienia',
    subtitle: 'Kalkulacja stopy zwrotu z inwestycji w profesjonalne stanowisko montażu i wyważania kół',
    sourceJournal: 'Kwartalnik motoryzacyjny "Moto części"',
    publicationDate: 'Wrzesień 2012',
    pageNumber: 'Strona 12',
    summary: 'Artykuł ekspercki analizujący wskaźniki rentowności i stopy zwrotu z inwestycji w profesjonalne stanowiska serwisowe montażu i wyważania kół oraz aparatury geometrii zawieszenia.',
    scanImage: '/images/18-rentownosc-ogumienia.webp',
    scanImageJpg: '/images/18-rentownosc-ogumienia.jpg',
    sourceUrl: 'https://www.beissbarth-service.pl/publikacje/18-rentownosc-ogumienia.html',
    originalTitleInCms: 'Rentowność ogumienia',
    lead: 'Niestabilna sytuacja ekonomiczna oraz nagłaśniane przez media widmo kryzysu skłania właścicieli warsztatów do kalkulacji celowości rozwoju i rozszerzania zakresu świadczonych usług. Wielu inwestorów, rozważając zakup urządzeń do obsługi ogumienia (wyważarka i montażownica), szczegółowo szacuje rentowność tej opcji.',
    metrics: [
      {
        label: 'Szacowany zwrot z inwestycji',
        value: 'ok. 1 rok',
        note: 'Dla zestawu Beissbarth MT 855ADT + MS 63',
      },
      {
        label: 'Przychód roczny z wyważeń',
        value: '25 000 – 30 000 zł',
        note: 'Przy założeniu 7 usług dziennie w cenie 40 zł',
      },
      {
        label: 'Dni robocze w sezonie',
        value: 'ok. 100 dni',
        note: 'Sezon przekładek 4–5 miesięcy w roku',
      },
    ],
    sections: [
      {
        id: 'inwestycja-kompleksowa',
        title: 'Kompleksowe wyposażenie stanowiska',
        paragraphs: [
          'W celu podniesienia konkurencyjności i zapewnienia usług na najwyższym poziomie należy przy takiej inwestycji uwzględnić także myjkę do kół (tylko czyste koło można poprawnie wyważyć) oraz szereg dodatkowych akcesoriów, takich jak uchwyty do felg nieprzelotowych czy precyzyjne stożki do aut dostawczych.',
        ],
      },
      {
        id: 'jakosc-urzadzen',
        title: 'Po pierwsze: jakość urządzeń',
        paragraphs: [
          'Wiele warsztatów nabyło maszyny do serwisu ogumienia, korzystając z dotacji unijnych. Często były to urządzenia najniższej klasy, importowane z rynków azjatyckich. W przypadku tego typu maszyn trudno uzyskać powtarzalność wyników pomiarowych oraz poprawnie wyważyć obręcze wykonane ze stopów metali lekkich.',
          'Klienci szybko rezygnują z usług warsztatów z niepowtarzalnymi wynikami i zwracają się do specjalistów dysponujących precyzyjną aparaturą pomiarową. Aby zbudować trwałą bazę lojalnych klientów, stanowisko ogumienia musi pracować na urządzeniach wysokiej klasy.',
        ],
      },
      {
        id: 'dostepnosc-serwisu',
        title: 'Po drugie: dostępność serwisu i części zamiennych',
        paragraphs: [
          'Znaczna liczba współczesnych pojazdów porusza się na kołach z felgami aluminiowymi i oponami niskoprofilowymi, co wymusza stosowanie montażownic z dodatkowym ramieniem pomocniczym do obsługi opon typu Run-Flat (RFT).',
          'Przy wyborze marki urządzeń kluczowym czynnikiem musi być dostępność autoryzowanego serwisu, który w szczycie sezonu wymiany opon gwarantuje błyskawiczną reakcję, kalibrację na miejscu oraz stały magazyn części zamiennych. Przestój maszyny w sezonie generuje straty wielokrotnie przewyższające początkową oszczędność na zakupie taniego zamiennika.',
        ],
        callout: 'Wyważarki renomowanych marek oferują możliwość precyzyjnego doposażenia w specjalistyczne tarcze dociskowe, uchwyty motocyklowe i pierścienie centrujące Haweka.',
      },
      {
        id: 'czy-to-sie-oplaca',
        title: 'Po trzecie: czy to się opłaca? Kalkulacja ekonomiczna',
        paragraphs: [
          'Szacując, że prężnie działający serwis wykonuje średnio 5–10 usług wyważania kół dziennie (przyjmując 4–5 miesięcy intensywnego sezonu wiosenno-jesiennego i 5-dniowy tydzień pracy), otrzymujemy około 100 dni intensywnej pracy.',
          'Przy wykonaniu średnio 7 usług dziennie w cenie 40 zł przychód wynosi około 25 000 – 30 000 zł rocznie. Zestaw urządzeń klasy premium (np. wyważarka Beissbarth MT 855ADT wraz z montażownicą MS 63) zamortyzuje się już po pierwszym pełnym sezonie.',
          'Powyższa kalkulacja nie uwzględnia dodatkowych strumieni przychodów: obrotu ze sprzedaży nowych opon, felg, wentyli, przechowalni kół (hotelu opon) oraz faktu, że przy wymianie kół obsługa niemal zawsze weryfikuje zużycie bieżnika i kwalifikuje pojazd do rentownej regulacji geometrii zawieszenia 3D.',
        ],
      },
    ],
    keyTakeaway: 'Rozszerzenie warsztatu o profesjonalny serwis ogumienia klasy Beissbarth zwraca się w około 12 miesięcy, stabilizuje przychody poza sezonem mechanicznym i bezpośrednio zasila stanowisko geometrii kół.',
  },
  {
    id: 'vademecum-warsztatu-samochodowego',
    slug: 'vademecum-warsztatu-samochodowego',
    title: 'Vademecum warsztatu samochodowego',
    subtitle: 'Wywiad ze specjalistą ds. wyposażenia serwisów o standardach nowoczesnego warsztatu i geometrii kół',
    sourceJournal: 'Kwartalnik motoryzacyjny "Moto części"',
    publicationDate: 'Marzec 2012',
    pageNumber: 'Strony 10–11',
    summary: 'Praktyczny poradnik wyposażenia warsztatu samochodowego i Stacji Kontroli Pojazdów: dobór urządzeń pomiarowych, wymogi dopuszczeń ITS oraz procedury kalibracyjne.',
    scanImage: '/images/17-wademecum-warsztatu-samochodowego.webp',
    scanImageJpg: '/images/17-wademecum-warsztatu-samochodowego.jpg',
    sourceUrl: 'https://www.beissbarth-service.pl/publikacje/17-wademecum-warsztatu-samochodowego.html',
    originalTitleInCms: 'Wademecum warsztatu samochodowego',
    lead: 'Cykl ekspercki poświęcony standardom nowoczesnego wyposażenia warsztatów motoryzacyjnych. Rozmowa z Marcinem Żakowskim, specjalistą ds. obsługi serwisów z Hurtowni Motoryzacyjnej GORDON, o opłacalności inwestycji, obsłudze wymagającego klienta oraz rentowności aparatury pomiarowej.',
    metrics: [
      {
        label: 'Przychód ze stanowiska geometrii',
        value: '40 000 zł',
        note: 'W pierwszych 200 dniach roboczych',
      },
      {
        label: 'Park zarejestrowanych aut w PL',
        value: '> 23 mln pojazdów',
        note: 'Stale rosnący rynek na diagnostykę',
      },
      {
        label: 'Rekomendowana technologia',
        value: 'Beissbarth Microline',
        note: 'Precyzyjny pomiar osi i zawieszenia',
      },
    ],
    sections: [
      {
        id: 'inwestycja-w-warsztat',
        title: 'Czy warsztat samochodowy to ciągle opłacalny biznes?',
        paragraphs: [
          '– Warsztat samochodowy to bardzo dobry pomysł na własną działalność gospodarczą. Dynamiczny rozwój motoryzacji wywiera coraz większy nacisk na jakość usług serwisowych i diagnostycznych. Nim jednak pojawią się oczekiwane zyski, niezbędna jest przemyślana inwestycja w aparaturę.',
          'Współczesnych samochodów nie da się serwisować przy pomocy przysłowiowego młotka i przecinaka. Nowoczesny serwis musi być wyposażony w precyzyjne przyrządy pomiarowe, dzięki którym każda naprawa wykonywana jest szybko, zgodnie z procedurą producenta i z zachowaniem pełnego bezpieczeństwa kierowcy.',
        ],
      },
      {
        id: 'obsluga-klienta-szkolenia',
        title: 'O co musi zadbać inwestor otwierający serwis?',
        paragraphs: [
          '– Oprócz samej infrastruktury maszynowej kluczowa jest inwestycja w regularne szkolenia personelu. Dzisiejszy klient warsztatu oczekuje profesjonalizmu nie tylko na hali, ale również w biurze obsługi: estetycznej poczekalni, przejrzystego kosztorysu, schludnego ubioru mechaników oraz możliwości skorzystania z auta zastępczego.',
          'Przez dekady samochód był w Polsce dobrem luksusowym – dziś jest niezbędnym narzędziem codziennej pracy. Klient wymaga natychmiastowej dyspozycyjności i bezbłędnej diagnozy usterki za pierwszym podejściem.',
        ],
      },
      {
        id: 'park-samochodowy',
        title: 'Potencjał polskiego rynku motoryzacyjnego',
        paragraphs: [
          '– Przeciętny polski kierowca porusza się samochodem kilkunastoletnim, najczęściej sprowadzonym z rynków zachodnich, ze średnim przebiegiem przekraczającym 250 tysięcy kilometrów. W Polsce zarejestrowanych jest przeszło 23 miliony pojazdów, co tworzy ogromne zapotrzebowanie na bieżące naprawy zawieszenia, hamulców i układów kierowniczych.',
          'Na rynku utrzymają się jednak tylko te serwisy, które potrafią poprawnie obsłużyć coraz bardziej zaawansowane układy jezdne z systemami asystującymi kierowcę.',
        ],
      },
      {
        id: 'geometria-rentownosc',
        title: 'Stanowisko geometrii: 40 000 zł w 200 dni roboczych',
        paragraphs: [
          '– Usługa pomiaru i regulacji geometrii kół to jedno z najbardziej dochodowych stanowisk w warsztacie samochodowym. Precyzyjne urządzenia pomiarowe (takie jak Beissbarth Microline) pozwalają wygenerować ponad 40 000 zł przychodu już w ciągu pierwszych 200 dni roboczych.',
          'Każda ingerencja w układ kierowniczy, wymiana wahacza, końcówki drążka czy amortyzatora bezwzględnie wymaga kontroli kątów zawieszenia. Warsztat posiadający własną geometrię nie tylko nie oddaje zysku podwykonawcom, ale zapewnia klientowi pełne bezpieczeństwo i prawidłowe zużycie opon.',
        ],
        callout: '40 000 zł czystego przychodu w 200 dni: stanowisko geometrii zawieszenia chroni opony klienta i stanowi fundament rentowności serwisu mechanicznego.',
      },
    ],
    keyTakeaway: 'Inwestycja w aparaturę geometrii kół Beissbarth Microline i certyfikowane szkolenia zwraca się już w pierwszych 200 dniach pracy warsztatu.',
  },
];
