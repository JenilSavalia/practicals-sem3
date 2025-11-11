import fs from 'fs/promises';
import path from 'path';
// avoid importing project-local types here to keep the runtime code simple and avoid
// potential TS include/path issues in this workspace. Use a lightweight runtime shape.
type Booking = {
  id: string;
  hotelId: string;
  userId: string;
  startDate: string;
  endDate: string;
  guests?: number;
  notes?: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_PATH = path.join(DATA_DIR, 'bookings.json');

async function ensureDataFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_PATH);
  } catch (err) {
    // file doesn't exist -> create
    await fs.writeFile(DATA_PATH, '[]', 'utf8');
  }
}

export async function readBookings(): Promise<Booking[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  try {
    return JSON.parse(raw) as Booking[];
  } catch (err) {
    // if corrupted, reset
    await fs.writeFile(DATA_PATH, '[]', 'utf8');
    return [];
  }
}

export async function writeBookings(bookings: Booking[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(bookings, null, 2), 'utf8');
}

export function generateId(): string {
  // Prefer crypto.randomUUID when available (Node 14.17+/18+)
  try {
    // @ts-ignore
    if (typeof globalThis?.crypto?.randomUUID === 'function') {
      // @ts-ignore
      return globalThis.crypto.randomUUID();
    }
  } catch {}
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}
