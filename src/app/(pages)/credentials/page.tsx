import AwardsTimeline from '@/app/components/about/AwardsTimeline';
import CholanToursComponent from '@/app/components/about/CholanToursComponent';
import Accreditation from '@/app/components/accreditation/accreditation';
import { getCanonical } from '@/app/lib/getCanonical';
import { accreditationData } from '@/app/services/staticPagesServices';
import React from 'react';

export async function generateMetadata() {
  const data = await accreditationData();
  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical('/credentials');
  const currentUrl = canonical;

  // Extract the meta_details from API
  const metaDetails = meta.meta_details || '';

  return {
    title: meta?.meta_title || 'cholan tours',
    description: meta?.meta_description || 'cholan tours',
    keywords: meta.meta_keywords || '',
    alternates: { canonical },

    openGraph: {
      title: meta?.meta_title || 'cholan tours',
      url: currentUrl,
      description: meta?.meta_description || 'cholan tours',
    },

    twitter: {
      title: meta?.meta_title || 'cholan tours',
      url: currentUrl,
      description: meta?.meta_description || 'cholan tours',
    },

  };
}

export default async function Page() {
  return (
    <>
      <Accreditation />
     
    </>
  );
}
