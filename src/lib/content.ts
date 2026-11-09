// Small queries shared by pages.
import { getCollection, type CollectionEntry } from 'astro:content';
import { showPlaceholders } from '../data/site';

/** False for a "[…]" placeholder text. */
export const isFilled = (text: string) => !/^\[.*\]$/.test(text.trim());

export const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

export async function getPoles() {
  return (await getCollection('poles')).sort((a, b) => a.data.number - b.data.number);
}

export async function getPoleLeads(poleId?: string) {
  const leads = (await getCollection('crew', (m) => m.data.group === 'pole')).sort(byOrder);
  return poleId ? leads.filter((l) => l.data.pole === poleId) : leads;
}

export async function getDepartmentHeads(departmentId: string) {
  return (await getCollection('crew', (m) => m.data.group === 'department' && m.data.department === departmentId)).sort(byOrder);
}

export async function getEventsSorted() {
  const events = await getCollection('events');
  return events.sort((a, b) => +b.data.date - +a.data.date);
}

/** Researchers in display order; placeholder entries only while showPlaceholders is on. */
export async function getResearchers() {
  const all = (await getCollection('researchers')).sort((a, b) => a.data.order - b.data.order);
  return showPlaceholders ? all : all.filter((r) => !r.data.placeholder);
}

/** Partner labs; the placeholder entry only while showPlaceholders is on. */
export async function getPartners() {
  const all = await getCollection('partners');
  return showPlaceholders ? all : all.filter((p) => !p.data.placeholder);
}

export type Pole = CollectionEntry<'poles'>;
