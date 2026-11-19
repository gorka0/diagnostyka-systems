import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { OfferPage } from '@/pages/OfferPage';
import { ProductsPage } from '@/pages/products/ProductsPage';
import { CategoryPage } from '@/pages/products/CategoryPage';
import { ProductDetailPage } from '@/pages/products/ProductDetailPage';
import { OemProductsPage } from '@/pages/products/OemProductsPage';
import { UsedProductsPage } from '@/pages/products/UsedProductsPage';
import { RealizationsPage } from '@/pages/RealizationsPage';
import { RealizationDetailPage } from '@/pages/RealizationDetailPage';
import { PublicationsPage } from '@/pages/PublicationsPage';
import { PublicationDetailPage } from '@/pages/PublicationDetailPage';
import { ServicePage } from '@/pages/ServicePage';
import { ServiceTicketPage } from '@/pages/ServiceTicketPage';
import { ContactPage } from '@/pages/ContactPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'o-nas',
        element: <AboutPage />,
      },
      {
        path: 'oferta',
        element: <OfferPage />,
      },
      {
        path: 'produkty',
        element: <ProductsPage />,
      },
      {
        path: 'produkty/:kategoria',
        element: <CategoryPage />,
      },
      {
        path: 'produkty/:kategoria/:slug',
        element: <ProductDetailPage />,
      },
      {
        path: 'urzadzenia-oem',
        element: <OemProductsPage />,
      },
      {
        path: 'produkty-uzywane',
        element: <UsedProductsPage />,
      },
      {
        path: 'serwis',
        element: <ServicePage />,
      },
      {
        path: 'serwis/zgloszenie',
        element: <ServiceTicketPage />,
      },
      {
        path: 'zgloszenie-serwisowe',
        element: <ServiceTicketPage />,
      },
      {
        path: 'realizacje',
        element: <RealizationsPage />,
      },
      {
        path: 'realizacje/:slug',
        element: <RealizationDetailPage />,
      },
      {
        path: 'publikacje',
        element: <PublicationsPage />,
      },
      {
        path: 'publikacje/:slug',
        element: <PublicationDetailPage />,
      },
      {
        path: 'kontakt',
        element: <ContactPage />,
      },
      {
        path: 'polityka-prywatnosci',
        element: <PrivacyPolicyPage />,
      },
      {
        path: 'polityka-cookies',
        element: <PrivacyPolicyPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
