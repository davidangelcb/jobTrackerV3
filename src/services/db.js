import { openDB } from 'idb';

const DB_NAME = 'photosDB';
const DB_VERSION = 2;
const STORE_PHOTOS = 'photos';

export const getDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_PHOTOS)) {
        const store = db.createObjectStore(STORE_PHOTOS, {
          keyPath: 'id',
          autoIncrement: true,
        });

        // indices útiles para búsquedas
        store.createIndex('sectionId', 'sectionId', { unique: false });
        store.createIndex('tabType', 'tabType', { unique: false });
        store.createIndex('sectionId_tabType', ['sectionId', 'tabType'], { unique: false });
      } else {
        // si el store ya existe pero no tiene los índices nuevos
        const store = db.transaction.objectStore(STORE_PHOTOS);
        if (!store.indexNames.contains('sectionId_tabType')) {
          store.createIndex('sectionId_tabType', ['sectionId', 'tabType'], { unique: false });
        }
      }
    },
  });
};

/**
 * Agrega una foto
 * @param {string} sectionId - ID de la sección
 * @param {Blob} blob - archivo de imagen
 * @param {string} tabType - 'before' o 'after'
 */
export const addPhoto = async (sectionId, blob, tabType) => {
  const db = await getDB();
  return db.add(STORE_PHOTOS, {
    sectionId,
    blob,
    tabType,
    createdAt: new Date(),
  });
};

/**
 * Obtiene todas las fotos de una sección y tab específica
 */
export const getPhotosBySection = async (sectionId, tabType) => {
  const db = await getDB();
  const tx = db.transaction(STORE_PHOTOS, 'readonly');
  const store = tx.objectStore(STORE_PHOTOS);
  const index = store.index('sectionId_tabType');
  const photos = await index.getAll([sectionId, tabType]);
  await tx.done;
  return photos;
};

/**
 * Elimina una foto por ID
 */
export const deletePhoto = async (id) => {
  const db = await getDB();
  const tx = db.transaction(STORE_PHOTOS, 'readwrite');
  await tx.objectStore(STORE_PHOTOS).delete(id);
  await tx.done;
};

/**
 * (Opcional) Limpia todas las fotos
 */
export const clearAllPhotos = async () => {
  const db = await getDB();
  const tx = db.transaction(STORE_PHOTOS, 'readwrite');
  await tx.objectStore(STORE_PHOTOS).clear();
  await tx.done;
};
