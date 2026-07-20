import { sanityClient } from './sanity.client';
import { projectsQuery } from './sanity.queries';
import type { SiteStats } from '@nova/content-model';

interface ProjectStatFields {
  capacityKw?: number;
  storageKwh?: number;
}

/**
 * Build Charter rule 5: "Metrics are derived, never typed in." Computes the
 * stat strip from real Project documents at fetch time -- it cannot go
 * stale silently, because there is no separate number to forget to update.
 */
export async function getDerivedStats(statesLabel: string): Promise<SiteStats> {
  const projects = await sanityClient.fetch<ProjectStatFields[]>(projectsQuery);

  const inverterCapacityKw = projects.reduce((sum, p) => sum + (p.capacityKw ?? 0), 0);
  const batteryStorageKwh = projects.reduce((sum, p) => sum + (p.storageKwh ?? 0), 0);

  return {
    projectsDelivered: projects.length,
    inverterCapacityKw,
    batteryStorageKwh,
    statesLabel,
  };
}

export function formatStatStrip(stats: SiteStats) {
  return [
    { value: `${stats.projectsDelivered}`, label: 'Projects delivered' },
    { value: `${stats.inverterCapacityKw}kW+`, label: 'Inverter capacity installed' },
    { value: `${stats.batteryStorageKwh}kWh`, label: 'Battery storage deployed' },
    { value: stats.statesLabel, label: 'Where we operate' },
  ];
}
