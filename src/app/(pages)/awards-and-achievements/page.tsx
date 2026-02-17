
import Accreditation from '@/app/components/accreditation/accreditation';
import AwardsAchievement from '@/app/components/awards-and-achievements/awards-and-achievement';
import { getCanonical } from '@/app/lib/getCanonical';
import { awardsandachievementsData } from '@/app/services/staticPagesServices';
import React from 'react';

export async function generateMetadata() {
    const data = await awardsandachievementsData();
    const meta = data?.data?.details?.meta || {};
    const canonical = await getCanonical('/awards-and-achievements');
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
    const data = await awardsandachievementsData();
    const details = data?.data?.details || {};
    const awards = data?.data?.awards || {};
    return (
        <>
            <AwardsAchievement details={details} awards={awards} />

        </>
    );
}
