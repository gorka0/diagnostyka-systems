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
    id: 'promo-ml-8-easy-ccd-excellence',
    slug: 'ml-8-easy-ccd-excellence',
    title: 'Geometria kół Beissbarth ML 8 Easy CCD Excellence',
    description: '8-sensorowy radiowy przyrząd CCD z elektronicznym kompensatorem, monitorem 27" i certyfikatem ITS do SKP.',
    priceNetto: '51 900 zł netto',
    bonus: 'Dostawa, montaż i szkolenie personelu w cenie zestawu',
    active: true,
    modelCode: 'ML 8 Easy CCD Excellence',
    category: 'Geometria',
    details: '4 zespoły pomiarowe z 8 sensorami CCD, radiowa transmisja, baza ponad 20 000 pojazdów, atest ITS do badań technicznych.',
  },
];
