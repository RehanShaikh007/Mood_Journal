const STORAGE_KEY = 'mood-journal-entries';

export const saveEntry = (entry) => {
  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const getEntries = () => {
  const entries = localStorage.getItem(STORAGE_KEY);
  return entries ? JSON.parse(entries) : [];
};

export const clearEntries = () => {
  localStorage.removeItem(STORAGE_KEY);
}; 