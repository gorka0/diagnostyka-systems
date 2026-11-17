/**
 * Promocje aparatury i wyposażenia Diagnostyka-Systems s.c.
 * Źródło: www.beissbarth-service.pl
 *
 * Edytowalna lista: zmiana wartości `active: false` wyłącza wyświetlanie promocji.
 */

export interface PromotionItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceNetto: string;
  bonus: string;
  active: boolean;
  modelCode?: string;
  category?: string;
  details?: string;
}

export const PROMOTIONS_DATA: PromotionItem[] = [
  {
    id: 'promo-ml-8-roc',
    slug: 'ml-8-roc-promocja',
    title: 'System do pomiaru geometrii kół Beissbarth ML 8 ROC',
    description: 'Zestaw z wyposażeniem, kompensacja przez przetaczanie, certyfikat ITS dla SKP.',
    priceNetto: '46 900 zł netto',
    bonus: 'Dostawa i szkolenie w cenie zestawu',
    active: true,
    modelCode: 'ML 8 ROC',
    category: 'Geometria',
    details: 'Urządzenie 4-głowicowe, 8 kamer CCD, atest dopuszczający stosowanie na Stacjach Kontroli Pojazdów.',
  },
];
