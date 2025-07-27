import Data from './data.js';

const DATABASE = {

    db: null,

    init() {
        
        this.openDatabase().then((success) => {
            this.db = success;
            this.collectData();
        }).catch((error) => {
            console.log(error); 
        });
    },

    openDatabase() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this.db);
                return false;
            }

            const requestDB = indexedDB.open('hyperkia');
            requestDB.addEventListener('upgradeneeded', (e) => {
                this.db = e.target.result;
                if (e.oldVersion === 0) this.createObjectsVersion0();
                if (e.oldVersion === 1) this.createObjectsVersion1();

            })

            requestDB.onsuccess = (e) => {
                resolve(e.target.result);
            }

            requestDB.onerror = (e) => {
                reject('Error opening Hyperkia Database');
            }

        });
    },

    collectData() {
        this.getAllObjects('layers').then((success) => {
            Data.layers = success;
            this.getAllObjects('pages').then((success) => {
                Data.pages = success;
                this.getKeyValueObject('options').then((success) => {
                    Data.options = success;
                    WBTR.app._componentsInitAfterDB();
                })
            })
        })
    },

    createObjectsVersion0() {
        const createObjectStore = ['pages', 'layers']
        createObjectStore.forEach((os) => {
            const objectStore = this.db.createObjectStore(os, {
                keyPath: 'index',
                autoIncrement: true
            })

            
            if (objectStore.name === 'pages') {
                objectStore.transaction.oncomplete = () => {
                    this.addObject('pages', {
                        name: `Page 1`,
                        'background-color': '#ffffffff',
                        width: '1920px',
                        height: '6000px',
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            }
        })

        const optionsObject = this.db.createObjectStore('options');

        
        optionsObject.add({
            "Poppins": [
                "100-Thin-italic",
                "200-ExtraLight-italic",
                "300-Light-italic",
                "400-Regular-italic",
                "500-Medium-italic",
                "600-SemiBold-italic",
                "700-Bold-italic",
                "800-ExtraBold-italic",
                "900-Black-italic",
                "100-Thin",
                "200-ExtraLight",
                "300-Light",
                "400-Regular",
                "500-Medium",
                "600-SemiBold",
                "700-Bold",
                "800-ExtraBold",
                "900-Black"
            ]
        }, 'font-family');
        optionsObject.add('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', 'available-fonts-href');

    },

    createObjectsVersion1() {},

    
    addObject(obJectStore, obj) {

        let objects = null;
        if (Array.isArray(obj)) {
            objects = obj;
        } else {
            objects = [obj];
        }

        const storeobjects = [];

        return new Promise((resolve, reject) => {
            const addTransaction = this.db.transaction([obJectStore], 'readwrite');
            const addObjectStore = addTransaction.objectStore(obJectStore);
            objects.forEach((o) => {
                const addRequest = addObjectStore.add(o);
                addRequest.onsuccess = (e) => {
                    storeobjects.push({
                        index: e.target.result,
                    });
                }

                addRequest.onerror = (e) => {
                    console.error(e); 
                }
            })

            addTransaction.oncomplete = (e) => resolve(storeobjects);
            addTransaction.onerror = (e) => reject(e);

        })
    },

    
    updateObject(obJectStore, index, obj) {

        return new Promise((resolve, reject) => {
            const transactionRequest = this.db.transaction([obJectStore], 'readwrite');
            const objectStoreRequest = transactionRequest.objectStore(obJectStore);

            const getRequest = objectStoreRequest.get(+index);

            getRequest.onsuccess = () => {
                const getObj = getRequest.result;

                Object.assign(getObj, obj);

                const putRequest = objectStoreRequest.put(getObj);

                putRequest.onsuccess = () => {
                    resolve(obj);
                }

                putRequest.onerror = (e) => {
                    reject(e);
                }
            }

            getRequest.onerror = (e) => {
                reject(e);
            }

        })
    },

    
    async getAllObjects(obJectStore, onload) {
        if (onload === 'onload' && !this.db) {
            this.db = await this.openDatabase();
        }

        return new Promise((resolve, reject) => {
            const transactionRequest = this.db.transaction([obJectStore], 'readwrite');
            const objectStoreRequest = transactionRequest.objectStore(obJectStore);
            const getAllRequest = objectStoreRequest.getAll();

            getAllRequest.onsuccess = () => {
                resolve(getAllRequest.result)
            }

            getAllRequest.onerror = (e) => {
                reject(e);
            }
        })
    },

    
    deleteObject(obJectStore, idsParam) {
        let ids = null;
        if (Array.isArray(idsParam)) {
            ids = idsParam;
        } else {
            ids = [idsParam];
        }

        const storeIds = [];

        return new Promise((resolve, reject) => {
            const deleteTransaction = this.db.transaction([obJectStore], 'readwrite');
            const deleteObjectStore = deleteTransaction.objectStore(obJectStore);
            ids.forEach((id) => {
                const deleteRequest = deleteObjectStore.delete(+id);
                deleteRequest.onsuccess = (e) => {
                    storeIds.push(+id);
                }

                deleteRequest.onerror = (e) => {
                    console.log(e); 
                }
            })

            deleteTransaction.oncomplete = (e) => resolve(storeIds);
            deleteTransaction.onerror = (e) => reject(e);

        })
    },


    
    async getKeyValueObject(obJectStore, keyName) {
        if (!this.db) {
            this.db = await this.openDatabase();
        }

        return new Promise((resolve, reject) => {
            const transactionRequest = this.db.transaction([obJectStore], 'readonly');
            const objectStoreRequest = transactionRequest.objectStore(obJectStore);
            const getKeys = objectStoreRequest.getAllKeys();
            const getValus = objectStoreRequest.getAll();

            transactionRequest.oncomplete = () => {

                const keys = getKeys.result;
                const valus = getValus.result;

                const keyValusPair = {};
                keys.forEach((k, i) => {
                    keyValusPair[k] = valus[i];
                });

                if (keyName) resolve({
                    [keyName]: keyValusPair[keyName] });
                if (!keyName) resolve(keyValusPair);

            }

            transactionRequest.onerror = (e) => {
                reject(e);
            }
        })
    },

    
    updateKeyValueObject(objects) {

        return new Promise((resolve, reject) => {
            const addTransaction = this.db.transaction(['options'], 'readwrite');
            const addObjectStore = addTransaction.objectStore('options');

            for (let prop in objects) {
                const addRequest = addObjectStore.put(objects[prop], prop);
                addRequest.onsuccess = (e) => {
                    
                }

                addRequest.onerror = (e) => {
                    console.log(e); 
                }
            }

            addTransaction.oncomplete = (e) => resolve('success');
            addTransaction.onerror = (e) => reject(e);

        })
    },

    
    downloadDB() {

        const DB = {};

        this.getAllObjects('layers').then((success) => {
            DB.layers = success;
            this.getAllObjects('pages').then((success) => {
                DB.pages = success;
                this.getKeyValueObject('options').then((success) => {
                    DB.options = success;

                    
                    let blob = new Blob([JSON.stringify(DB, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);

                    
                    const aEl = document.createElement('a');
                    aEl.href = url;
                    aEl.download = `hyperkia.json`;
                    document.body.appendChild(aEl);
                    aEl.click();
                    document.body.removeChild(aEl);
                    URL.revokeObjectURL(url);
                    aEl.remove();
                    blob = null;

                })
            })
        })
    },

    
    async mergeDatabases() {


    }


}



export default DATABASE;