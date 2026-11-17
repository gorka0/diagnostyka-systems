/**
 * Historia firmy Diagnostyka-Systems s.c.
 * Wyekstrahowano 1:1 ze starej strony (podstrony: O nas, O firmie).
 */

export interface HistoryMilestone {
  year: string;
  title: string;
  description: string;
}

export interface HistoryData {
  companyName: string;
  foundingYear: number;
  lead: string;
  milestones: HistoryMilestone[];
  coreActivities: string[];
}

export const COMPANY_HISTORY: HistoryData = {
  companyName: 'Diagnostyka-Systems s.c.',
  foundingYear: 2004,
  lead: 'Firma Diagnostyka-Systems powstała w 2004 roku. Za cel obraliśmy sobie zapewnienie profesjonalnej obsługi serwisowej produktów firmy Beissbarth. Początkowo skupialiśmy się na działalności serwisowej, z czasem rozszerzając zakres świadczonych usług o sprzedaż nowych urządzeń Beissbarth.',
  milestones: [
    {
      year: '2004',
      title: 'Powstanie firmy',
      description: 'Rozpoczęcie działalności ukierunkowanej na profesjonalną obsługę serwisową urządzeń niemieckiej marki Beissbarth.',
    },
    {
      year: '2005',
      title: 'Autoryzacja Beissbarth GmbH',
      description: 'Uzyskanie oficjalnej autoryzacji fabrycznej Beissbarth GmbH w zakresie serwisu i dystrybucji urządzeń warsztatowych.',
    },
    {
      year: '2007',
      title: 'Certyfikat ITS do Stacji Kontroli Pojazdów',
      description: 'Wprowadzenie do oferty systemów do pomiaru geometrii kół i osi pojazdów posiadających certyfikat Instytutu Transportu Samochodowego (ITS), dopuszczający stosowanie na SKP. Wyposażenie szeregu autoryzowanych i niezależnych serwisów.',
    },
    {
      year: '2007',
      title: 'Autoryzacja serwisowa grupy SPX',
      description: 'Uzyskanie statusu autoryzowanego partnera serwisowego grupy SPX w zakresie obsługi stacji klimatyzacji marek Valeo, OTC oraz Robinair.',
    },
    {
      year: '2011',
      title: 'Nowa siedziba i magazyn w Lisim Ogonie',
      description: 'Przeniesienie firmy do nowego obiektu w Lisim Ogonie k. Bydgoszczy. Nowa siedziba z większą przestrzenią magazynową umożliwiła zapewnienie bieżącej dostępności maszyn i części zamiennych, a także organizację szkoleń i prezentacji aparatury geometrii.',
    },
  ],
  coreActivities: [
    'Doradztwo w zakresie doboru i kompletacji odpowiedniego wyposażenia warsztatowego i SKP',
    'Dostawa, montaż urządzeń oraz profesjonalne szkolenia w zakresie obsługi i pomiaru geometrii kół pojazdów',
    'Autoryzowany serwis gwarancyjny i pogwarancyjny sprzedawanych urządzeń firmy Beissbarth',
    'Autoryzowany serwis urządzeń do obsługi klimatyzacji VALEO',
    'Modernizacja już eksploatowanego sprzętu oraz wykonywanie generalnych remontów maszyn',
    'Dystrybucja sprawdzonego sprzętu używanego z pisemną gwarancją',
  ],
};
