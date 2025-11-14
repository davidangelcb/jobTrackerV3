import { openDB } from 'idb';
import { useGlobalStore } from "../store/useGlobalStore";

const DB_VERSION = 1;
const STORE_PHOTOS = 'photos';

export const getDB = async () => {
  const fromStore = useGlobalStore.getState().dbName;
  console.log('fromStore', fromStore);
  
  return openDB(fromStore, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_PHOTOS)) {
        const store = db.createObjectStore(STORE_PHOTOS, {
          keyPath: 'id',
          autoIncrement: true,
        });

        // indices para búsquedas
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
 * @param {string} sectionId
 * @param {Blob} blob
 * @param {string} tabType
 */
export const addPhoto = async (sectionId, blob, tabType) => {
  const db = await getDB();

  // Convertir Blob a ArrayBuffer
  const buffer = await blob.arrayBuffer();

  return db.add(STORE_PHOTOS, {
    sectionId,
    buffer,          // ArrayBuffer
    type: blob.type, // Campo importante para conservar el MIME
    tabType,
    createdAt: Date.now(),
  });
};


/**
 * Registro IndexedDB a un objeto Blob y URL
 */
const revivePhoto = (item) => {
  if (!item?.buffer) return null;

  const blob = new Blob([item.buffer], { type: item.type || "image/jpeg" });
  const url = URL.createObjectURL(blob);

  return {
    ...item,
    blob,
    url
  };
};

/**
 * Obtiene todas las fotos de una sección y tab específico
 */
export const getPhotosBySection = async (sectionId, tabType) => {
  const db = await getDB();
  const tx = db.transaction(STORE_PHOTOS, 'readonly');
  const store = tx.objectStore(STORE_PHOTOS);
  const index = store.index('sectionId_tabType');
  
  const items = await index.getAll([sectionId, tabType]);
  await tx.done;

  return items
    .map(revivePhoto)
    .filter(Boolean); // elimina fotos corruptas
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
