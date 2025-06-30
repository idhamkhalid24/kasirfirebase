// --- Firebase Variables (Akan diinisialisasi dari window.firebaseApp, dll.) ---
let app;
let auth;
let db;
let currentUserId = null; // UID pengguna yang sedang login dari Firebase Auth
let userRole = null;    // Role pengguna (misal: 'admin', 'cashier')

// --- Data Variables (Sekarang akan dimuat dari Firestore) ---
let products = [];
let currentTransactionItems = [];
// FIX: transactionHistory dan expenses sekarang akan jadi global (bukan per user)
let transactionHistory = [];
let expenses = [];
// Pengguna tidak lagi disimpan di sini secara lokal, melainkan di Firebase Auth dan Firestore
// let users = [];
let loggedInUser = null; // Objek pengguna yang sedang login dari Firebase Auth + role dari Firestore

// FIX: dailyRevenue, lastRecordedDate, monthlyNetProfit, monthlyExpenses, lastRecordedMonth
// sekarang akan diambil dari dokumen publik, bukan dari appState per user.
let dailyRevenue = 0;
let lastRecordedDate = ''; // Format:YYYY-MM-DD
let monthlyNetProfit = 0;
let monthlyExpenses = 0;
let lastRecordedMonth = ''; // Format:YYYY-MM

// Variabel user-specific yang tetap di appState pribadi
let isRevenueVisible = true;
let isDarkMode = false;

// Bluetooth Printer variables (tetap lokal atau disimpan di Firestore appState)
let bluetoothPrinterDevice = null;
let printerCharacteristic = null;

// QR Scanner variables
let html5QrCodeScanner = null;

// --- DOM Elements (Declared here, assigned on DOMContentLoaded) ---
// Main App Containers
let loginScreen;
let mainAppContainer;

// Login Screen Elements
let loginScreenEmailInput; // Diubah ke email
let loginScreenPasswordInput;
let loginScreenBtn;
let loginScreenMessage;

let itemList;
let totalAmountInput;
let discountAmountInput;
let paymentAmountInput;
let paymentMethodSelect;
let changeAmountHeader;
let statusElement;
let newTransactionButton;
let printReceiptButton;
let processOnlyPaymentButton;
let noItemsMessage;
let headerDateTime;
let headerDailyRevenue;
let headerDailyRevenueAmountContainer;
let toggleDailyRevenueVisibilityButton;
let eyeIcon;
let eyeSlashIcon;
let cashierDisplay;
let cashierRole;
let logoutButton;
let darkModeToggle;

// Monthly Financial Bar elements
let monthlyFinancialBarContainer;
let monthlyProfitBar;
let monthlyExpenseBar;


// Registered product input elements
let productCodeInput;
let productNameInput;
let priceInput;
let quantityInput;
let addRegisteredItemButton;
let searchProductByCodeBtn;
let productCodeDatalist;

// Custom product input elements
let customProductCodeInput;
let customProductNameInput;
let customProductPriceInput;
let customProductQtyInput;
let addCustomItemButton;

let showRegisteredProductsButton;
let showCustomProductsButton;
let showScannerProductsButton;
let customProductSection;
let registeredProductSection;
let scannerSection;
let reader;
let scannerResult;
let startScannerBtn;
let stopScannerBtn;

// Admin menu elements
let adminMenuButton;
let adminMenuDropdown;
let openStoreProductsModalBtn;
let openAddProductModalBtn;
let openFinancialReportModalBtn;
let openExpensesModalBtn;
let openUserSettingsModalBtn;
let openPriceCalculatorModalBtn;
let exportProductsBtn;
let importProductsFileInput;
let importProductsBtn;
let exportDataBtn;
let importFileInput;
let importDataBtn;
let resetAllDataBtn;

// Store Products Modal elements
let storeProductsModal;
let closeStoreProductsModalBtn;
let storeProductsTableBody;
let searchStoreProductsInput;
let storeProductsTableContainer;
let editProductForm;
let editProductIdInput;
let editProductNameInput;
let editProductCostInput;
let editProductPriceInput;
let editProductStockInput;
let saveProductEditBtn;
let cancelProductEditBtn;

// Add Product Modal elements
let addProductModal;
let closeAddProductModalBtn;
let addProductCodeInput;
let addProductNameInput;
let addProductCostInput;
let addProductPriceInput;
let addProductProfitInput;
let addProductStockInput;
let saveNewProductBtn;
let cancelAddProductBtn;

// Expenses Modal elements
let expensesModal;
let closeExpensesModalBtn;
let expenseDateInput;
let expenseDescriptionInput;
let expenseAmountInput;
let addExpenseBtn;
let expensesListBody;
let emptyExpensesMessage;
let expenseStatusMessage;
let expenseSearchInput;
let expenseFilterStartDate;
let expenseFilterEndDate;
let applyExpenseFilterBtn;
let clearExpenseFilterBtn;
let totalExpensesDisplayModal;


// Financial Report Modal elements
let financialReportModal;
let closeFinancialReportModalBtn;
let reportStartDateInput;
let reportEndDateInput;
let applyFinancialFilterBtn;
let clearFinancialFilterBtn;
let totalRevenueDisplay;
let totalExpensesDisplay;
let grossProfitDisplay;
let netProfitDisplay;
let financialChartCanvas;
let financialReportMessageBox;

// Transaction History Modal elements
let openTransactionHistoryBtn;
let transactionHistoryModal;
let closeTransactionHistoryModalBtn;
let transactionHistoryTableBody;
let historyStartDateInput;
let historyEndDateInput;
let applyHistoryFilterBtn;
let clearHistoryFilterBtn;
let transactionHistoryMessageBox;
let transactionDetailSection;
let detailTransactionId;
let detailTransactionDate;
let detailCashier;
let detailSubtotal;
let detailDiscount;
let detailTotalAmount;
let detailPaymentAmount;
let detailChangeAmount;
let detailItemList;
let closeTransactionDetailBtn;
let reprintReceiptBtn;
let historyFilterControls;
let totalTransactionsAmount;

// Confirmation Modal elements
let confirmationModal;
let confirmationMessage;
let confirmOkBtn;
let confirmCancelBtn;
let confirmPromiseResolve;

// User Settings Modal
let userSettingsModal;
let closeUserSettingsModalBtn;
let userSettingsLoginSection;
let userSettingsLoginEmailInput; // Diubah ke email
let userSettingsLoginPasswordInput;
let userSettingsLoginButton;
let userSettingsLoginStatusMessage;
let userManagementSection;
let newUseEmailInput; // Diubah ke email
let newUserPasswordInput;
let newUserRoleSelect;
let addUserButton;
let addUserStatusMessage;
let userListBody;
let emptyUserMessage;

// Printer Settings Modal
let openPrinterSettingsBtn;
let printerSettingsModal;
let closePrinterSettingsModalBtn;
let printerStatus;
let connectPrinterBtn;
let disconnectPrinterBtn;
let testPrintBtn;

// Price Calculator Modal
let priceCalculatorModal;
let closePriceCalculatorModalBtn;
let priceCalcProductCodeInput;
let copyProductCodeBtn;
let priceCalcProductNameInput;
let priceCalcModalInput;
let priceCalcMarginPercentInput;
let priceCalcTaxPercentInput;
let priceCalcDiscountPercentInput;
let calculatePriceBtn;
let priceCalcSellingPriceInput;
let copySellingPriceBtn;
let priceCalcProfitInput;
let priceCalcStatusMessage;

// Nominal Quick Pay Buttons
let nominalButtonsContainer;
let nominalButtons;

// Audio elements for sounds
let scanSuccessSound;
let transactionSuccessSound;

// Reset data modal elements
let resetDataModal;
let resetPasswordInput;
let resetDataConfirmBtn;
let resetDataCancelBtn;
let resetDataMessage;


// --- Firestore Collection References (untuk dibaca di fungsi) ---
// APP_ID akan disediakan oleh lingkungan Canvas
const APP_ID = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

const PUBLIC_PRODUCTS_COLLECTION_PATH = `artifacts/${APP_ID}/products`; 
const USER_APP_STATE_DOC_PATH = (uid) => `artifacts/${APP_ID}/users/${uid}/appState/settings`;
const USER_ROLES_COLLECTION_PATH = `users`; // Top-level collection for user roles, indexed by UID

// FIX: Menambahkan path baru untuk data keuangan toko global
const STORE_METRICS_DOC_PATH = `artifacts/${APP_ID}/storeMetrics/global`;

// FIX: Mengubah path transaksi dan pengeluaran menjadi publik
const PUBLIC_TRANSACTIONS_COLLECTION_PATH = `artifacts/${APP_ID}/transactions`;
const PUBLIC_EXPENSES_COLLECTION_PATH = `artifacts/${APP_ID}/expenses`;


// --- Hardcoded password for reset (sesuai permintaan pengguna) ---
const RESET_PASSWORD = "alfajrihanif24@gmail.com";


// --- Firebase Listener Unsubscribe Functions ---
// Kita akan menyimpan fungsi unsubscribe di sini agar bisa membersihkan listener saat logout
let unsubscribeProducts = null;
// FIX: Mengubah unsubscribe untuk transaksi dan pengeluaran ke listener publik
let unsubscribePublicTransactions = null;
let unsubscribePublicExpenses = null;
// FIX: Menambahkan unsubscribe untuk store metrics
let unsubscribeStoreMetrics = null;
let unsubscribeAppState = null; // Tetap untuk appState pribadi
let unsubscribeUserRoles = null; // Listener untuk role pengguna saat ini

// --- General Utility Functions (Penting: Pindahkan ke atas agar bisa dipanggil duluan) ---

// Toggles dark mode on/off and applies corresponding Tailwind classes.
function applyDarkMode() {
    const body = document.body;
    if (isDarkMode) {
        body.classList.add('dark-mode');
        body.classList.remove('bg-gray-100'); // Remove light background
        body.classList.add('bg-gray-800'); // Add dark background
        // Apply dark mode specific styles to modals, inputs, etc.
        document.querySelectorAll('.modal-content, .bg-white').forEach(el => {
            el.classList.add('dark:bg-gray-800', 'dark:text-gray-100');
            el.classList.remove('bg-white', 'text-gray-800');
        });
        document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), select, textarea').forEach(el => {
            el.classList.add('dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-gray-200');
            el.classList.remove('bg-white', 'border-gray-300', 'text-gray-900');
        });
        document.querySelectorAll('.text-gray-700').forEach(el => el.classList.add('dark:text-gray-200'));
        document.querySelectorAll('.text-gray-800').forEach(el => el.classList.add('dark:text-gray-100'));
        document.querySelectorAll('.text-gray-500').forEach(el => el.classList.add('dark:text-gray-400'));
        document.querySelectorAll('.border-gray-200').forEach(el => el.classList.add('dark:border-gray-700'));
        document.querySelectorAll('.shadow-md').forEach(el => el.classList.add('dark:shadow-lg', 'dark:shadow-gray-900'));
        document.querySelectorAll('.bg-gray-200').forEach(el => {
            if (el.id !== 'darkModeToggle') el.classList.replace('bg-gray-200', 'bg-gray-700');
        });

        if (totalAmountInput) totalAmountInput.classList.add('bg-gray-700', 'text-white');
        if (discountAmountInput) discountAmountInput.classList.add('bg-red-700', 'text-white');
        if (paymentAmountInput) paymentAmountInput.classList.add('bg-green-700', 'text-white');

    } else {
        body.classList.remove('dark-mode');
        body.classList.remove('bg-gray-800'); // Remove dark background
        body.classList.add('bg-gray-100'); // Add light background

        document.querySelectorAll('.modal-content, .dark\\:bg-gray-800').forEach(el => {
            el.classList.remove('dark:bg-gray-800', 'dark:text-gray-100');
            el.classList.add('bg-white', 'text-gray-800');
        });
        document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), select, textarea').forEach(el => {
            el.classList.remove('dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-gray-200');
            el.classList.add('bg-white', 'border-gray-300', 'text-gray-900');
        });
        document.querySelectorAll('.dark\\:text-gray-200').forEach(el => el.classList.remove('dark:text-gray-200'));
        document.querySelectorAll('.dark\\:text-gray-100').forEach(el => el.classList.remove('dark:text-gray-100'));
        document.querySelectorAll('.dark\\:text-gray-400').forEach(el => el.classList.remove('dark:text-gray-400'));
        document.querySelectorAll('.dark\\:border-gray-700').forEach(el => el.classList.remove('dark:border-gray-700'));
        document.querySelectorAll('.dark\\:shadow-lg').forEach(el => el.classList.remove('dark:shadow-lg', 'dark:shadow-gray-900'));
         document.querySelectorAll('.bg-gray-700').forEach(el => {
            if (el.id !== 'darkModeToggle') el.classList.replace('bg-gray-700', 'bg-gray-200');
        });

        if (totalAmountInput) totalAmountInput.classList.remove('bg-gray-700', 'text-white');
        if (discountAmountInput) discountAmountInput.classList.remove('bg-red-700', 'text-white');
        if (paymentAmountInput) paymentAmountInput.classList.remove('bg-green-700', 'text-white');
    }
    // Update chart if visible
    if (!financialReportModal.classList.contains('hidden')) {
        calculateFinancialReport(); // Re-render chart with new theme colors
    }
}


// Displays a status message to the user.
function displayStatus(message, type, element = statusElement) {
    if (!element) return;
    element.textContent = message;
    // Using Tailwind classes dynamically based on theme for status messages
    let bgColorClass, textColorClass;
    if (isDarkMode) {
        bgColorClass = type === 'success' ? 'bg-green-700' :
                       type === 'error' ? 'bg-red-700' :
                       'bg-blue-700'; // Default for info/loading
        textColorClass = type === 'success' ? 'text-green-200' :
                         type === 'error' ? 'text-red-200' :
                         'text-blue-200'; // Default for info/loading
    } else {
        bgColorClass = type === 'success' ? 'bg-green-100' :
                       type === 'error' ? 'bg-red-100' :
                       'bg-blue-100'; // Default for info/loading
        textColorClass = type === 'success' ? 'text-green-800' :
                         type === 'error' ? 'text-red-700' :
                         'text-blue-800'; // Default for info/loading
    }
    element.className = `mt-4 p-3 text-center rounded-md text-sm ${bgColorClass} ${textColorClass}`;
    element.classList.remove('hidden'); // Ensure message box is visible
}


// --- Fungsi Inisialisasi Firebase dan Listener ---

/**
 * Menginisialisasi variabel Firebase dari objek global yang diekspor di index.html
 * dan menyiapkan listener otentikasi.
 */
async function initializeFirebase() {
    // Pastikan objek Firebase sudah diekspor dari script module di index.html
    app = window.firebaseApp;
    auth = window.firebaseAuth;
    db = window.firebaseDb;

    if (!app || !auth || !db) {
        console.error("Firebase tidak diinisialisasi dengan benar. Pastikan Firebase CDN dimuat dan diekspor di index.html.");
        displayStatus("Error: Firebase tidak siap. Harap muat ulang halaman.", "error");
        return;
    }

    // Listener untuk perubahan status otentikasi
    // Ini adalah bagian KRITIS untuk mengelola UI dan pemuatan data
    window.onAuthStateChanged(auth, async (user) => { // Menggunakan window.onAuthStateChanged
        if (user) {
            // Pengguna login
            currentUserId = user.uid;
            console.log("Pengguna login:", user.email, "UID:", user.uid);
            // FIX: Menggunakan fungsi baru untuk menangani penentuan/pengambilan role
            await assignUserRole(user);
            loggedInUser = { email: user.email, uid: user.uid, role: userRole }; // Gabungkan data Auth dan role

            // Setelah mendapatkan role, baru tampilkan UI dan muat data
            updateCashierDisplay(); // Perbarui display kasir
            mainAppContainer.classList.remove('hidden'); // Tampilkan aplikasi utama
            loginScreen.classList.add('hidden'); // Sembunyikan layar login

            setupFirestoreListeners(); // Siapkan semua listener Firestore untuk data
            startNewTransaction(); // Mulai transaksi baru setelah login
            loadSavedPrinter(); // Coba sambungkan kembali printer
            applyDarkMode(); // Terapkan mode gelap (ini sekarang dijamin sudah terdefinisi)
        } else {
            // Pengguna logout atau tidak ada pengguna login
            currentUserId = null;
            userRole = null;
            loggedInUser = null;
            console.log("Pengguna logout.");

            cleanupFirestoreListeners(); // Bersihkan semua listener Firestore
            updateCashierDisplay(); // Perbarui display kasir
            loginScreen.classList.remove('hidden'); // Tampilkan layar login
            mainAppContainer.classList.add('hidden'); // Sembunyikan aplikasi utama
            startNewTransaction(); // Reset state transaksi
        }
    });
}

/**
 * Mengambil atau menetapkan role pengguna dari/ke Firestore.
 * Jika dokumen role tidak ada, akan membuat role default ('cashier')
 * atau 'admin' jika ini adalah pengguna pertama di sistem.
 * @param {object} user - Objek pengguna dari Firebase Auth.
 */
async function assignUserRole(user) {
    const userRef = window.doc(db, USER_ROLES_COLLECTION_PATH, user.uid);
    try {
        const userDoc = await window.getDoc(userRef);
        if (userDoc.exists()) {
            userRole = userDoc.data().role;
            console.log("Role pengguna:", userRole);
        } else {
            // Dokumen role tidak ada untuk pengguna ini.
            // Cek apakah ada pengguna lain di koleksi 'users' sama sekali.
            const usersSnapshot = await window.getDocs(window.collection(db, USER_ROLES_COLLECTION_PATH));
            if (usersSnapshot.empty) {
                // Jika ini adalah pengguna pertama, jadikan admin.
                userRole = 'admin';
                await window.setDoc(userRef, { email: user.email, role: 'admin' });
                console.log("Pengguna pertama didaftarkan sebagai Admin:", user.email);
            } else {
                // Bukan pengguna pertama, tetapkan role default 'cashier'.
                userRole = 'cashier';
                await window.setDoc(userRef, { email: user.email, role: 'cashier' });
                console.warn("Dokumen role pengguna tidak ditemukan untuk UID:", user.uid, ". Defaulting to 'cashier'.");
            }
        }
    } catch (error) {
        console.error("Error fetching or assigning user role:", error);
        userRole = 'cashier'; // Fallback to cashier on error
    }
}

/**
 * Menyiapkan semua listener real-time Firestore untuk data aplikasi.
 */
function setupFirestoreListeners() {
    // Pastikan listener sebelumnya dibersihkan
    cleanupFirestoreListeners();

    if (!db || !currentUserId) {
        console.error("Firestore DB atau UID tidak tersedia untuk menyiapkan listener.");
        return;
    }

    // Listener untuk Products (Publik)
    unsubscribeProducts = window.onSnapshot(window.collection(db, PUBLIC_PRODUCTS_COLLECTION_PATH), (snapshot) => { // Menggunakan window.onSnapshot dan window.collection
        products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Produk dimuat dari Firestore:", products);
        renderProductDatalist();
        // Render store products jika modalnya terbuka (opsional, bisa dipicu saat modal dibuka)
        if (!storeProductsModal.classList.contains('hidden')) {
            renderStoreProducts(searchStoreProductsInput.value);
        }
    }, (error) => {
        console.error("Error fetching products:", error);
        displayStatus("Error memuat produk dari Firestore.", "error");
    });

    // FIX: Listener untuk Transactions (Sekarang Publik)
    unsubscribePublicTransactions = window.onSnapshot(window.collection(db, PUBLIC_TRANSACTIONS_COLLECTION_PATH), (snapshot) => {
        transactionHistory = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Riwayat transaksi dimuat dari Firestore (publik):", transactionHistory);
        // Render riwayat transaksi jika modalnya terbuka
        if (!transactionHistoryModal.classList.contains('hidden')) {
            renderTransactionHistory(historyStartDateInput.value, historyEndDateInput.value);
        }
        // Perbarui laporan keuangan juga
        if (!financialReportModal.classList.contains('hidden')) {
            calculateFinancialReport();
        }
    }, (error) => {
        console.error("Error fetching public transactions:", error);
        displayStatus("Error memuat riwayat transaksi dari Firestore.", "error");
    });

    // FIX: Listener untuk Expenses (Sekarang Publik)
    unsubscribePublicExpenses = window.onSnapshot(window.collection(db, PUBLIC_EXPENSES_COLLECTION_PATH), (snapshot) => {
        expenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Pengeluaran dimuat dari Firestore (publik):", expenses);
        // Render pengeluaran jika modalnya terbuka
        if (!expensesModal.classList.contains('hidden')) {
            renderExpenses();
        }
        // Perbarui laporan keuangan juga
        if (!financialReportModal.classList.contains('hidden')) {
            calculateFinancialReport();
        }
    }, (error) => {
        console.error("Error fetching public expenses:", error);
        displayStatus("Error memuat pengeluaran dari Firestore.", "error");
    });

    // FIX: Listener baru untuk Store Metrics (Pendapatan Harian/Bulanan Global)
    unsubscribeStoreMetrics = window.onSnapshot(window.doc(db, STORE_METRICS_DOC_PATH), (docSnapshot) => {
        if (docSnapshot.exists()) {
            const storeMetricsData = docSnapshot.data();
            dailyRevenue = storeMetricsData.dailyRevenue || 0;
            lastRecordedDate = storeMetricsData.lastRecordedDate || '';
            monthlyNetProfit = storeMetricsData.monthlyNetProfit || 0;
            monthlyExpenses = storeMetricsData.monthlyExpenses || 0;
            lastRecordedMonth = storeMetricsData.lastRecordedMonth || '';

            console.log("Store metrics dimuat dari Firestore:", storeMetricsData);
            checkAndResetDailyRevenue(); // Panggil ini untuk update UI dan reset jika tanggal/bulan berubah
            updateHeaderDailyRevenue();
            renderMonthlyFinancialBar();
        } else {
            console.log("Dokumen storeMetrics tidak ditemukan, membuat default.");
            // Buat dokumen storeMetrics default jika tidak ada
            window.setDoc(window.doc(db, STORE_METRICS_DOC_PATH), {
                dailyRevenue: 0,
                lastRecordedDate: new Date().toISOString().slice(0, 10),
                monthlyNetProfit: 0,
                monthlyExpenses: 0,
                lastRecordedMonth: new Date().toISOString().slice(0, 7)
            });
        }
    }, (error) => {
        console.error("Error fetching store metrics:", error);
        displayStatus("Error memuat metrik toko dari Firestore.", "error");
    });

    // Listener untuk App State (Privat per pengguna) - tetap sama
    unsubscribeAppState = window.onSnapshot(window.doc(db, USER_APP_STATE_DOC_PATH(currentUserId)), (docSnapshot) => { // Menggunakan window.onSnapshot dan window.doc
        if (docSnapshot.exists()) {
            const appStateData = docSnapshot.data();
            // FIX: Hanya load user-specific settings dari appState
            isRevenueVisible = typeof appStateData.isRevenueVisible !== 'undefined' ? appStateData.isRevenueVisible : true;
            isDarkMode = typeof appStateData.isDarkMode !== 'undefined' ? appStateData.isDarkMode : false;
            // lastConnectedPrinterId juga user-specific
            const savedPrinterId = appStateData.lastConnectedPrinterId || null;
            if (savedPrinterId) {
                // Logic untuk reconnect printer, tidak diubah.
            }
            console.log("User-specific app state dimuat dari Firestore:", appStateData);
            // FIX: applyDarkMode perlu dipanggil ulang kalau isDarkMode berubah
            applyDarkMode();
            updateHeaderDailyRevenue(); // Update display karena isRevenueVisible bisa berubah
        } else {
            console.log("Dokumen appState pribadi tidak ditemukan, membuat default.");
            // Buat dokumen appState default jika tidak ada
            window.setDoc(window.doc(db, USER_APP_STATE_DOC_PATH(currentUserId)), { // Menggunakan window.setDoc dan window.doc
                isRevenueVisible: true,
                isDarkMode: false,
                lastConnectedPrinterId: null
            });
        }
    }, (error) => {
        console.error("Error fetching user app state:", error);
        displayStatus("Error memuat pengaturan aplikasi pribadi dari Firestore.", "error");
    });


    // Listener untuk User Roles (hanya untuk pengguna saat ini)
    unsubscribeUserRoles = window.onSnapshot(window.doc(db, USER_ROLES_COLLECTION_PATH, currentUserId), (docSnapshot) => { // Menggunakan window.onSnapshot dan window.doc
        if (docSnapshot.exists()) {
            userRole = docSnapshot.data().role;
            if (loggedInUser) loggedInUser.role = userRole; // Perbarui role di objek loggedInUser
            console.log("Role pengguna diperbarui:", userRole);
            updateCashierDisplay(); // Perbarui tampilan kasir dan menu admin
            if (!userSettingsModal.classList.contains('hidden')) {
                showUserManagementSection(); // Re-render bagian manajemen user jika modalnya terbuka
            }
        }
    }, (error) => {
        console.error("Error fetching user's role in real-time:", error);
    });
}

/**
 * Membersihkan semua listener real-time Firestore.
 */
function cleanupFirestoreListeners() {
    if (unsubscribeProducts) unsubscribeProducts();
    // FIX: Bersihkan listener publik yang baru
    if (unsubscribePublicTransactions) unsubscribePublicTransactions();
    if (unsubscribePublicExpenses) unsubscribePublicExpenses();
    if (unsubscribeStoreMetrics) unsubscribeStoreMetrics();

    if (unsubscribeAppState) unsubscribeAppState();
    if (unsubscribeUserRoles) unsubscribeUserRoles();

    unsubscribeProducts = null;
    unsubscribePublicTransactions = null;
    unsubscribePublicExpenses = null;
    unsubscribeStoreMetrics = null;
    unsubscribeAppState = null;
    unsubscribeUserRoles = null;
}

// --- Fungsi Penyimpanan Firebase (Menggantikan Local Storage) ---

/**
 * Menyimpan produk ke Firestore.
 * Biasanya dipicu setelah perubahan pada array `products` lokal.
 */
async function saveProductsToFirestore() {
    if (!db || !currentUserId) {
        console.warn("Tidak dapat menyimpan produk: DB atau UID tidak tersedia.");
        return;
    }
    try {
        // Ambil dokumen produk yang sudah ada di Firestore
        const existingDocs = await window.getDocs(window.collection(db, PUBLIC_PRODUCTS_COLLECTION_PATH)); // Menggunakan window.getDocs dan window.collection
        const existingProductIds = existingDocs.docs.map(doc => doc.id);
        const newProductIds = products.map(p => p.id);

        // Hapus produk yang tidak lagi ada di array lokal
        for (const id of existingProductIds) {
            if (!newProductIds.includes(id)) {
                await window.deleteDoc(window.doc(db, PUBLIC_PRODUCTS_COLLECTION_PATH, id)); // Menggunakan window.deleteDoc dan window.doc
            }
        }

        // Tambahkan atau perbarui produk yang ada di array lokal
        for (const product of products) {
            await window.setDoc(window.doc(db, PUBLIC_PRODUCTS_COLLECTION_PATH, product.id), product); // Menggunakan window.setDoc dan window.doc
        }
        console.log("Produk berhasil disimpan ke Firestore.");
        renderProductDatalist(); // Perbarui datalist setelah save
    } catch (e) {
        console.error("Gagal menyimpan produk ke Firestore:", e);
        displayStatus("Error: Gagal menyimpan produk. Periksa koneksi internet atau hak akses.", "error");
    }
}


/**
 * Menyimpan transaksi ke Firestore.
 * Dipanggil saat ada transaksi baru.
 * @param {object} transactionRecord - Objek transaksi yang akan disimpan.
 */
async function saveTransactionToFirestore(transactionRecord) {
    if (!db || !currentUserId) { // currentUserId tetap diperlukan untuk loggedInUser.email/uid
        console.warn("Tidak dapat menyimpan transaksi: DB atau UID tidak tersedia.");
        return false;
    }
    try {
        // FIX: Simpan ke koleksi transaksi publik
        await window.setDoc(window.doc(db, PUBLIC_TRANSACTIONS_COLLECTION_PATH, transactionRecord.id), transactionRecord);
        console.log("Transaksi berhasil disimpan ke Firestore (publik):", transactionRecord.id);
        return true;
    } catch (e) {
        console.error("Gagal menyimpan transaksi ke Firestore:", e);
        displayStatus("Error: Gagal menyimpan transaksi. Periksa koneksi internet atau hak akses.", "error");
        return false;
    }
}

/**
 * Menyimpan pengeluaran ke Firestore.
 * Dipanggil saat ada pengeluaran baru atau perubahan.
 */
async function saveExpenseToFirestore(expenseRecord) {
    if (!db || !currentUserId) { // currentUserId tetap diperlukan untuk otentikasi
        console.warn("Tidak dapat menyimpan pengeluaran: DB atau UID tidak tersedia.");
        return false;
    }
    try {
        // FIX: Simpan ke koleksi pengeluaran publik
        await window.setDoc(window.doc(db, PUBLIC_EXPENSES_COLLECTION_PATH, expenseRecord.id), expenseRecord);
        console.log("Pengeluaran berhasil disimpan ke Firestore (publik):", expenseRecord.id);
        return true;
    } catch (e) {
        console.error("Gagal menyimpan pengeluaran ke Firestore:", e);
        displayStatus("Error: Gagal menyimpan pengeluaran. Periksa koneksi internet atau hak akses.", "error");
        return false;
    }
}

/**
 * Menyimpan state aplikasi user-specific ke Firestore (mode gelap, printer id).
 */
async function saveAppStateToFirestore() {
    if (!db || !currentUserId) {
        console.warn("Tidak dapat menyimpan app state pribadi: DB atau UID tidak tersedia.");
        return;
    }
    try {
        const appStateData = {
            isRevenueVisible: isRevenueVisible,
            isDarkMode: isDarkMode,
            lastConnectedPrinterId: bluetoothPrinterDevice ? bluetoothPrinterDevice.id : null // Simpan ID printer
        };
        await window.setDoc(window.doc(db, USER_APP_STATE_DOC_PATH(currentUserId)), appStateData, { merge: true }); // Menggunakan window.setDoc dan window.doc
        console.log("App state pribadi berhasil disimpan ke Firestore.");
    } catch (e) {
        console.error("Gagal menyimpan app state pribadi ke Firestore:", e);
        displayStatus("Error: Gagal menyimpan pengaturan aplikasi pribadi. Periksa koneksi internet atau hak akses.", "error");
    }
}

/**
 * FIX: Fungsi baru untuk menyimpan metrik toko global ke Firestore.
 */
async function saveStoreMetricsToFirestore() {
    if (!db) {
        console.warn("Tidak dapat menyimpan metrik toko: DB tidak tersedia.");
        return;
    }
    try {
        const storeMetricsData = {
            dailyRevenue: dailyRevenue,
            lastRecordedDate: lastRecordedDate,
            monthlyNetProfit: monthlyNetProfit,
            monthlyExpenses: monthlyExpenses,
            lastRecordedMonth: lastRecordedMonth
        };
        // Menggunakan merge: true agar tidak menimpa field lain jika ada
        await window.setDoc(window.doc(db, STORE_METRICS_DOC_PATH), storeMetricsData, { merge: true });
        console.log("Store metrics berhasil disimpan ke Firestore.");
    } catch (e) {
        console.error("Gagal menyimpan store metrics ke Firestore:", e);
        displayStatus("Error: Gagal menyimpan metrik toko. Periksa koneksi internet.", "error");
    }
}


// Updates the daily revenue display in the header based on visibility.
function updateHeaderDailyRevenue() {
    if (headerDailyRevenue) {
        headerDailyRevenue.textContent = dailyRevenue.toLocaleString('id-ID');
    }
    // Update visibility of the container and toggle icons
    if (headerDailyRevenueAmountContainer) {
        headerDailyRevenueAmountContainer.style.visibility = isRevenueVisible ? 'visible' : 'hidden';
    }
    if (eyeIcon && eyeSlashIcon) {
        eyeIcon.classList.toggle('hidden', !isRevenueVisible);
        eyeSlashIcon.classList.toggle('hidden', isRevenueVisible);
    }
}

// Checks if the date has changed and resets daily revenue if so.
// Also checks if the month has changed and resets monthly financial data.
async function checkAndResetDailyRevenue() {
    const today = new Date().toISOString().slice(0, 10); //YYYY-MM-DD
    const thisMonth = new Date().toISOString().slice(0, 7); //YYYY-MM

    if (lastRecordedDate !== today) {
        console.log(`Date changed from ${lastRecordedDate} to ${today}. Resetting daily revenue.`);
        dailyRevenue = 0;
        lastRecordedDate = today;
        // FIX: Simpan ke store metrics global
        await saveStoreMetricsToFirestore();
        displayStatus("Pendapatan harian direset untuk hari baru.", "info");
    }
    updateHeaderDailyRevenue(); // Always update header with current daily revenue

    if (lastRecordedMonth !== thisMonth) {
        console.log(`Month changed from ${lastRecordedMonth} to ${thisMonth}. Resetting monthly financial data.`);
        monthlyNetProfit = 0;
        monthlyExpenses = 0;
        lastRecordedMonth = thisMonth;
        // FIX: Simpan ke store metrics global
        await saveStoreMetricsToFirestore();
    }
    renderMonthlyFinancialBar(); // Always update the monthly bar
}

// Renders the monthly financial profit/expense bar in the header.
function renderMonthlyFinancialBar() {
    if (!monthlyProfitBar || !monthlyExpenseBar || !monthlyFinancialBarContainer) return;

    const total = monthlyNetProfit + monthlyExpenses; // Use the sum of profit and expenses as the base
    let profitWidth = 0;
    let expenseWidth = 0;

    if (total > 0) {
        // If profit is higher, scale profit to 100% and expenses relative to profit
        if (monthlyNetProfit >= monthlyExpenses) {
            profitWidth = 100;
            expenseWidth = (monthlyExpenses / monthlyNetProfit) * 100;
        } else { // If expenses are higher, scale expenses to 100% and profit relative to expenses
            expenseWidth = 100;
            profitWidth = (monthlyNetProfit / monthlyExpenses) * 100;
        }
    }

    // Adjust to ensure they always add up to 100% of the bar, proportionally
    // If both are 0, both widths should be 0.
    if (monthlyNetProfit === 0 && monthlyExpenses === 0) {
        profitWidth = 0;
        expenseWidth = 0;
    } else if (monthlyNetProfit > 0 && monthlyExpenses === 0) {
        profitWidth = 100;
        expenseWidth = 0;
    } else if (monthlyNetProfit === 0 && monthlyExpenses > 0) {
        profitWidth = 0;
        expenseWidth = 100;
    } else {
        const combinedTotal = monthlyNetProfit + monthlyExpenses;
        profitWidth = (monthlyNetProfit / combinedTotal) * 100;
        expenseWidth = (monthlyExpenses / combinedTotal) * 100;
    }


    monthlyProfitBar.style.width = `${profitWidth}%`;
    monthlyExpenseBar.style.width = `${expenseWidth}%`;

    // Apply rounded corners based on which side is present
    monthlyProfitBar.classList.remove('rounded-l-full', 'rounded-r-full');
    monthlyExpenseBar.classList.remove('rounded-l-full', 'rounded-r-full');

    if (profitWidth > 0 && expenseWidth > 0) {
        monthlyProfitBar.classList.add('rounded-l-full');
        monthlyExpenseBar.classList.add('rounded-r-full');
    } else if (profitWidth > 0) {
        monthlyProfitBar.classList.add('rounded-full');
    } else if (expenseWidth > 0) {
        monthlyExpenseBar.classList.add('rounded-full');
    }

    // Set the container background if both are zero
    if (profitWidth === 0 && expenseWidth === 0) {
        monthlyFinancialBarContainer.style.backgroundColor = '#ccc'; // Default gray
    } else {
        monthlyFinancialBarContainer.style.backgroundColor = 'transparent'; // Transparent if bars are visible
    }
}

// Function to copy text to clipboard
function copyTextToClipboard(text, successMessageElement) {
    if (!navigator.clipboard) {
        // Fallback for older browsers or if clipboard API is not available (e.g., in some iframes)
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";  // Avoid scrolling to bottom
        textArea.style.opacity = "0";       // Hide
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            displayStatus("Berhasil disalin!", "success", successMessageElement);
        } catch (err) {
            console.error('Gagal menyalin: ', err);
            displayStatus("Gagal menyalin teks.", "error", successMessageElement);
        }
        document.body.removeChild(textArea);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        displayStatus("Berhasil disalin!", "success", successMessageElement);
    }).catch(function(err) {
        console.error('Gagal menyalin: ', err);
        displayStatus("Gagal menyalin teks.", "error", successMessageElement);
    });
}

// Function to play scan success sound
function playScanSuccessSound() {
    if (scanSuccessSound) {
        scanSuccessSound.play().catch(e => console.error("Error playing scan success sound:", e));
    }
}

// Function to play transaction success sound
function playTransactionSuccessSound() {
    if (transactionSuccessSound) {
        transactionSuccessSound.play().catch(e => console.error("Error playing transaction success sound:", e));
    }
}


// --- Core Application Logic ---

// Adds a product to the transaction list.
function addProductToTransaction(id, name, price, qty, isCustom = false) {
    // For custom products, we give them a unique ID. Registered products use their original ID.
    const finalId = isCustom ? 'custom-' + Date.now() : id;

    // Check if product already exists in the cart (only for registered products)
    // Custom products are always added as new lines, even if they have the same name/price.
    const existingItemIndex = currentTransactionItems.findIndex(item => item.productId === finalId && !isCustom);

    // Find the product in the global products array to get its cost and current stock
    // For custom products, productData will be undefined as they don't exist in the 'products' array.
    const productData = products.find(p => p.id === id);

    // Check stock for registered products before adding/updating quantity
    if (!isCustom && productData && productData.stock !== undefined) {
        const currentQtyInCart = existingItemIndex > -1 ? currentTransactionItems[existingItemIndex].qty : 0;
        const newTotalQty = currentQtyInCart + qty;

        if (productData.stock < newTotalQty) {
            displayStatus(`Error: Stok ${productData.name} tidak cukup. Stok tersedia: ${productData.stock}`, "error");
            return;
        }
    }

    if (existingItemIndex > -1) {
        // If it's a registered product and already in the list, just update quantity
        currentTransactionItems[existingItemIndex].qty += qty;
    } else {
        // Add new product to list
        currentTransactionItems.push({
            productId: finalId,
            name: name,
            qty: qty,
            price: price,
            // Store cost for financial report
            // For registered products: use actual cost
            // For custom products: calculate cost as 80% of price (20% margin)
            cost: isCustom ? (price * 0.8) : (productData?.cost || 0),
            isCustom: isCustom // Add a flag to identify custom products
        });
    }
    renderTransactionItems();
    // Clear product code input after adding to cart
    productCodeInput.value = '';
    productNameInput.value = '';
    priceInput.value = '0';
    quantityInput.value = '1';
    productCodeInput.focus(); // Focus back on product code input for next scan/entry
}

// Renders items in the transaction list and updates totals.
function renderTransactionItems() {
    if (!itemList || !noItemsMessage || !totalAmountInput) return; // Ensure elements exist

    itemList.innerHTML = ''; // Clear existing items
    let subtotal = 0; // Changed from total to subtotal

    if (currentTransactionItems.length === 0) {
        noItemsMessage.classList.remove('hidden'); // Show "No items" message
        itemList.appendChild(noItemsMessage); // Ensure it's in the list
    } else {
        noItemsMessage.classList.add('hidden'); // Hide "No items" message
        currentTransactionItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            // Adjust classes for dark mode dynamically
            const itemBgClass = isDarkMode ? 'bg-gray-700' : 'bg-white';
            const itemBorderClass = isDarkMode ? 'border-gray-600' : 'border-gray-200';
            const itemTextClass = isDarkMode ? 'text-gray-200' : 'text-gray-800';
            const itemQtyInputBg = isDarkMode ? 'bg-gray-600' : 'bg-white';
            const itemQtyInputBorder = isDarkMode ? 'border-gray-500' : 'border-gray-300';
            const itemQtyInputText = isDarkMode ? 'text-gray-200' : 'text-gray-900';
            const itemPriceText = isDarkMode ? 'text-gray-300' : 'text-gray-700';
            const itemTotalText = isDarkMode ? 'text-gray-100' : 'text-gray-900';


            itemDiv.className = `flex flex-col sm:flex-row items-center gap-2 mb-3 p-3 rounded-md shadow-sm border ${itemBgClass} ${itemBorderClass}`;
            itemDiv.innerHTML = `
                <span class="flex-1 font-medium ${itemTextClass}">${item.name}</span>
                <input type="number" value="${item.qty}" data-item-index="${index}" class="item-qty-input px-2 py-1 border rounded-md text-center focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm ${itemQtyInputBg} ${itemQtyInputBorder} ${itemQtyInputText}">
                <span class="font-semibold w-24 text-right ${itemPriceText}">Rp ${item.price.toLocaleString('id-ID')}</span>
                <span class="font-bold w-28 text-right ${itemTotalText}">Rp ${(item.qty * item.price).toLocaleString('id-ID')}</span>
                <button class="removeItem bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md shadow-sm transition duration-300 ease-in-out text-sm" data-item-index="${index}">Hapus</button>
            `;
            itemList.appendChild(itemDiv);
            subtotal += item.qty * item.price;
        });
    }

    // Apply discount to the total displayed
    const discount = parseFloat(discountAmountInput.value) || 0;
    const finalTotal = subtotal - discount;
    totalAmountInput.value = `Rp ${finalTotal.toLocaleString('id-ID')}`; // Update to show final total after discount
    calculateChange();
    updateHeaderDateTime();
    updateCashierDisplay(); // Cashier display updated from Firebase Auth
}

// Calculates and displays the change.
function calculateChange() {
    if (!totalAmountInput || !paymentAmountInput || !changeAmountHeader) return;
    const total = parseFloat(totalAmountInput.value.replace(/[^0-9,-]+/g, "").replace(",", ".")) || 0;
    const payment = parseFloat(paymentAmountInput.value) || 0;
    const change = payment - total;

    // Update the change amount in the header
    changeAmountHeader.textContent = `Rp ${(change > 0 ? change : 0).toLocaleString('id-ID')}`;
}

// Updates the current date and time display in the header.
function updateHeaderDateTime() {
    if (!headerDateTime) return;
    const now = new Date();
    const options = {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    };
    headerDateTime.textContent = now.toLocaleDateString('id-ID', options);
}

// Updates cashier display in header and controls admin menu visibility.
function updateCashierDisplay() {
    if (!cashierDisplay || !cashierRole || !adminMenuButton || !adminMenuDropdown) return;

    if (loggedInUser && loggedInUser.email) {
        cashierDisplay.textContent = loggedInUser.email;
        cashierRole.textContent = loggedInUser.role; // Tampilkan role dari Firestore
        // Tampilkan menu admin hanya jika pengguna yang login adalah admin
        if (loggedInUser.role === 'admin') {
            adminMenuButton.classList.remove('hidden');
        } else {
            adminMenuButton.classList.add('hidden');
            adminMenuDropdown.classList.add('hidden'); // Pastikan dropdown disembunyikan untuk non-admin
        }
    } else {
        cashierDisplay.textContent = 'Tidak Login';
        cashierRole.textContent = '';
        adminMenuButton.classList.add('hidden'); // Sembunyikan menu admin jika tidak login
        adminMenuDropdown.classList.add('hidden'); // Pastikan dropdown disembunyikan
    }
}

// Resets the transaction for a new one.
function startNewTransaction() {
    currentTransactionItems = [];
    if (paymentAmountInput) paymentAmountInput.value = '0';
    if (discountAmountInput) discountAmountInput.value = '0';
    if (changeAmountHeader) changeAmountHeader.textContent = 'Rp 0';
    if (paymentMethodSelect) paymentMethodSelect.value = "Tunai";

    renderTransactionItems();

    displayStatus("", ""); // Clear status
    updateHeaderDateTime();
    updateCashierDisplay();
    updateHeaderDailyRevenue(); // Ambil dari data global
    renderMonthlyFinancialBar(); // Ambil dari data global

    if (productCodeInput) productCodeInput.value = '';
    if (productNameInput) productNameInput.value = '';
    if (priceInput) priceInput.value = '0';
    if (quantityInput) quantityInput.value = '1';

    if (customProductCodeInput) customProductCodeInput.value = '';
    if (customProductNameInput) customProductNameInput.value = '';
    if (customProductPriceInput) customProductPriceInput.value = '0';
    if (customProductQtyInput) customProductQtyInput.value = '1';

    stopQrScanner();

    showSection('registered');
}

// Function to toggle sections (Registered/Custom/Scanner Products).
function showSection(mode) {
    currentTransactionMode = mode;

    // Hide all sections first
    registeredProductSection.classList.add('hidden');
    customProductSection.classList.add('hidden');
    scannerSection.classList.add('hidden');

    // Reset button styles
    showRegisteredProductsButton.classList.remove('bg-green-500', 'hover:bg-green-600', 'bg-gray-400', 'hover:bg-gray-500');
    showCustomProductsButton.classList.remove('bg-green-500', 'hover:bg-green-600', 'bg-gray-400', 'hover:bg-gray-500');
    showScannerProductsButton.classList.remove('bg-green-500', 'hover:bg-green-600', 'bg-blue-500', 'hover:bg-blue-600');

    // Stop scanner if switching away from scanner section
    if (mode !== 'scanner') {
        stopQrScanner();
    }

    // Show the selected section and apply active button style
    if (mode === 'registered') {
        registeredProductSection.classList.remove('hidden');
        showRegisteredProductsButton.classList.add('bg-green-500', 'hover:bg-green-600');
        showCustomProductsButton.classList.add('bg-gray-400', 'hover:bg-gray-500');
        showScannerProductsButton.classList.add('bg-gray-400', 'hover:bg-gray-500');
    } else if (mode === 'custom') {
        customProductSection.classList.remove('hidden');
        showRegisteredProductsButton.classList.add('bg-gray-400', 'hover:bg-gray-500');
        showCustomProductsButton.classList.add('bg-green-500', 'hover:bg-green-600');
        showScannerProductsButton.classList.add('bg-gray-400', 'hover:bg-gray-500');
    } else if (mode === 'scanner') {
        scannerSection.classList.remove('hidden');
        showRegisteredProductsButton.classList.add('bg-gray-400', 'hover:bg-gray-500');
        showCustomProductsButton.classList.add('bg-gray-400', 'hover:bg-gray-500');
        showScannerProductsButton.classList.add('bg-green-500', 'hover:bg-green-600'); // Use green for active scanner button
        // Automatically start scanner when switching to this section
        startQrScanner();
    }
}

// Function to prepare transaction object and decrement stock
async function createTransactionObjectAndDecrementStock() {
    const total = parseFloat(totalAmountInput.value.replace(/[^0-9,-]+/g, "").replace(",", ".")) || 0;
    let payment = parseFloat(paymentAmountInput.value) || 0;
    const discount = parseFloat(discountAmountInput.value) || 0;
    const paymentMethod = paymentMethodSelect.value;

    if (paymentMethod === 'QRIS' || paymentMethod === 'Transfer Bank') {
        payment = total;
        paymentAmountInput.value = total.toLocaleString('id-ID');
    }

    if (payment < total) {
        displayStatus("Error: Jumlah pembayaran kurang dari total!", "error");
        return null;
    }

    if (currentTransactionItems.length === 0) {
        displayStatus("Error: Tambahkan setidaknya satu item untuk memproses transaksi!", "error");
        return null;
    }

    // Hitung profit untuk transaksi saat ini
    let transactionGrossProfit = 0;
    currentTransactionItems.forEach(item => {
        const itemTotal = item.qty * item.price;
        const itemCost = item.qty * item.cost;
        transactionGrossProfit += (itemTotal - itemCost);
    });
    const transactionNetProfit = transactionGrossProfit - discount;

    // Dekrement stok untuk semua produk (hanya produk terdaftar)
    // Perbarui stok di array lokal products, lalu simpan ke Firestore
    for (const item of currentTransactionItems) {
        if (!item.productId.startsWith('custom-')) {
            const product = products.find(p => p.id === item.productId);
            if (product && product.stock !== undefined) {
                product.stock -= item.qty;
                if (product.stock < 0) product.stock = 0;
                // Langsung update di Firestore untuk produk ini
                try {
                    await window.setDoc(window.doc(db, PUBLIC_PRODUCTS_COLLECTION_PATH, product.id), product); // Menggunakan window.setDoc dan window.doc
                } catch (e) {
                    console.error("Gagal update stok produk di Firestore:", e);
                    displayStatus(`Error: Gagal update stok untuk ${product.name}.`, "error");
                    return null; // Batalkan transaksi jika update stok gagal
                }
            }
        }
    }
    // Tidak perlu saveProducts() lagi karena sudah update per produk di loop

    const transactionRecord = {
        id: 'TRX-' + Date.now(),
        date: new Date().toISOString(),
        items: currentTransactionItems.map(item => ({...item})), // Deep copy items
        subtotalAmount: currentTransactionItems.reduce((sum, item) => sum + (item.qty * item.price), 0),
        discountAmount: discount,
        totalAmount: total,
        paymentAmount: payment,
        changeAmount: payment - total,
        cashierEmail: loggedInUser ? loggedInUser.email : 'Unknown', // Gunakan email pengguna
        cashierUid: currentUserId, // Simpan UID kasir
        transactionNetProfit: transactionNetProfit,
        paymentMethod: paymentMethod
    };

    return transactionRecord;
}

// Function to revert stock decrement (if print fails or transaction not committed)
// Sekarang ini akan mengembalikan stok di Firestore
async function revertStockDecrement(items) {
    for (const item of items) {
        if (!item.productId.startsWith('custom-')) {
            const product = products.find(p => p.id === item.productId);
            if (product && product.stock !== undefined) {
                product.stock += item.qty;
                try {
                    await window.setDoc(window.doc(db, PUBLIC_PRODUCTS_COLLECTION_PATH, product.id), product); // Menggunakan window.setDoc dan window.doc
                } catch (e) {
                    console.error("Gagal mengembalikan stok produk di Firestore:", e);
                    displayStatus(`Error: Gagal mengembalikan stok untuk ${product.name}.`, "error");
                }
            }
        }
    }
    console.log("Stok berhasil dikembalikan karena transaksi tidak di-commit.");
}

// Function to commit transaction data (add to history, update revenue)
// Sekarang ini akan menyimpan ke Firestore
async function commitTransactionData(transactionRecord) {
    const success = await saveTransactionToFirestore(transactionRecord);
    if (!success) return; // Jika gagal disimpan ke Firestore, jangan lanjutkan

    // FIX: Update dailyRevenue dan monthlyNetProfit di store metrics global
    dailyRevenue += transactionRecord.totalAmount;
    monthlyNetProfit += transactionRecord.transactionNetProfit;

    // Simpan perubahan daily dan monthly revenue ke Firestore storeMetrics (global)
    await saveStoreMetricsToFirestore();

    updateHeaderDailyRevenue();
    renderMonthlyFinancialBar();

    displayStatus("Transaksi berhasil diproses!", "success");
    playTransactionSuccessSound();
    startNewTransaction();
}

// Function to generate and send receipt content to printer
async function printReceiptContent(transactionRecord) {
    if (!bluetoothPrinterDevice || !printerCharacteristic) {
        displayStatus("Printer belum terhubung. Silakan sambungkan printer melalui Pengaturan Printer.", "error");
        printerSettingsModal.classList.remove('hidden');
        return false; // Indicate print failure
    }

    displayStatus("Mengirim struk ke printer...", "info");

    const companyName = "UNIX FASHION";
    const companyAddress = "cilebut-bogor";
    const companyPhone = "0851-7210-7731";

    const transactionNumber = transactionRecord.id;
    const cashier = transactionRecord.cashierEmail; // Gunakan email kasir
    const paymentMethod = transactionRecord.paymentMethod;

    const total = transactionRecord.totalAmount;
    const payment = transactionRecord.paymentAmount;
    const change = transactionRecord.changeAmount;
    const discount = transactionRecord.discountAmount;
    const subtotalBeforeDiscount = transactionRecord.subtotalAmount;

    const now = new Date(transactionRecord.date);
    const dateTimeFormatted = now.toLocaleString('id-ID', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    });

    try {
        const encoder = new TextEncoder();
        let printText = "";

        // Header
        printText += centerText(companyName.toUpperCase()) + "\n";
        printText += centerText(companyAddress) + "\n";
        printText += centerText(companyPhone) + "\n";
        printText += "\n";

        // Transaction Info
        printText += `No.Transaksi: ${transactionNumber}\n`;
        printText += `Kasir: ${cashier}\n`;
        printText += `Waktu: ${dateTimeFormatted}\n`;
        printText += "--------------------------------\n";

        // Items
        for (let item of transactionRecord.items) {
            if (item.name && item.qty > 0) {
                printText += `${item.name}\n`;
                const itemSubtotal = item.qty * item.price;
                printText += `  ${item.qty} pcs x ${item.price.toLocaleString('id-ID')}    Rp ${itemSubtotal.toLocaleString('id-ID')}\n`;
            }
        }
        printText += "--------------------------------\n";

        // Totals and Payment
        printText += `Subtotal :     Rp ${subtotalBeforeDiscount.toLocaleString('id-ID')}\n`;
        if (discount > 0) {
            printText += `Diskon   :     Rp ${discount.toLocaleString('id-ID')}\n`;
        }
        printText += `Total    :     Rp ${total.toLocaleString('id-ID')}\n`;
        printText += `Bayar    :     Rp ${payment.toLocaleString('id-ID')}\n`;
        printText += `Kembali  :     Rp ${change.toLocaleString('id-ID')}\n`;
        printText += `Metode   :     ${paymentMethod}\n`;
        printText += "\n";

        // Footer
        printText += centerText("Terimakasih sudah berbelanja") + "\n";
        printText += centerText("UNIX FASHION") + "\n";
        printText += "\n\n\n";

        await printerCharacteristic.writeValue(encoder.encode(printText));
        displayStatus("Struk berhasil dicetak!", "success");
        return true;

    } catch (error) {
        displayStatus(`Error saat mencetak: ${error.message}.`, "error");
        console.error("Printing error:", error);
        return false;
    }
}

// Function to handle printing a NEW receipt (processes transaction, decrements stock, then prints)
async function processAndPrintTransaction() {
    const transactionRecord = await createTransactionObjectAndDecrementStock(); // Validate and decrement stock in Firestore
    if (!transactionRecord) {
        return;
    }

    const printSuccess = await printReceiptContent(transactionRecord);

    if (printSuccess) {
        await commitTransactionData(transactionRecord); // Commit ONLY if print was successful
    } else {
        await revertStockDecrement(transactionRecord.items); // Revert stock if printing fails
    }
}

// Function to handle reprinting an existing receipt from history (does not affect stock/history)
async function reprintTransactionReceipt(transactionId) {
    const transactionToReprint = transactionHistory.find(t => t.id === transactionId);
    if (!transactionToReprint) {
        displayStatus("Error: Transaksi tidak ditemukan untuk dicetak ulang.", "error");
        return;
    }

    displayStatus("Mencetak ulang struk...", "info");
    await printReceiptContent(transactionToReprint);
}


// Helper function to center text for receipt printing
function centerText(text, width = 32) {
    const padding = Math.max(0, width - text.length);
    const leftPadding = Math.floor(padding / 2);
    const rightPadding = padding - leftPadding;
    return " ".repeat(leftPadding) + text + " ".repeat(rightPadding);
}


// --- Store Products Functions ---

// Renders the list of products in the store products modal, with optional search filter.
function renderStoreProducts(searchTerm = '') {
    if (!storeProductsTableBody) return;
    storeProductsTableBody.innerHTML = '';

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filteredProducts = products.filter(product => {
        const productName = product.name ? product.name.toLowerCase() : '';
        const productId = product.id ? product.id.toLowerCase() : '';
        return productName.includes(lowerCaseSearchTerm) || productId.includes(lowerCaseSearchTerm);
    });

    if (filteredProducts.length === 0 && searchTerm) {
        const noResultsRow = document.createElement('tr');
        const textClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';
        noResultsRow.innerHTML = `<td colspan="5" class="py-4 text-center ${textClass}">Tidak ada produk ditemukan untuk '${searchTerm}'</td>`;
        storeProductsTableBody.appendChild(noResultsRow);
        return;
    } else if (filteredProducts.length === 0 && !searchTerm) {
        const noProductsRow = document.createElement('tr');
        const textClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';
        noProductsRow.innerHTML = `<td colspan="5" class="py-4 text-center ${textClass}">Tidak ada produk terdaftar.</td>`;
        storeProductsTableBody.appendChild(noProductsRow);
        return;
    }

    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        const hoverClass = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
        const textClass = isDarkMode ? 'text-gray-200' : 'text-gray-700';
        const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-200';

        row.className = hoverClass;
        row.innerHTML = `
            <td class="py-2 px-4 border-b ${borderColor} ${textClass}">${product.id}</td>
            <td class="py-2 px-4 border-b ${borderColor} ${textClass}">${product.name}</td>
            <td class="py-2 px-4 border-b ${borderColor} text-right ${textClass}">Rp ${product.price.toLocaleString('id-ID')}</td>
            <td class="py-2 px-4 border-b ${borderColor} text-right ${textClass}">${product.stock !== undefined ? product.stock : 'N/A'}</td>
            <td class="py-2 px-4 border-b ${borderColor} text-center">
                <button class="edit-product-btn text-blue-500 hover:text-blue-700 mr-2" data-product-id="${product.id}" title="Edit Produk">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.827-2.828z" />
                    </svg>
                </button>
                <button class="delete-product-btn text-red-500 hover:text-red-700" data-product-id="${product.id}" title="Hapus Produk">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </td>
        `;
        storeProductsTableBody.appendChild(row);
    });
    // saveProductsToFirestore() tidak dipanggil di sini karena perubahan dipicu oleh `onSnapshot`
    // atau oleh fungsi edit/delete/addProduct.
}

// Opens the edit form with product data.
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        editProductIdInput.value = product.id;
        editProductNameInput.value = product.name;
        editProductCostInput.value = product.cost !== undefined ? product.cost : 0;
        editProductPriceInput.value = product.price;
        editProductStockInput.value = product.stock !== undefined ? product.stock : 0;
        editProductForm.classList.remove('hidden');
        storeProductsTableContainer.classList.add('hidden');
        searchStoreProductsInput.classList.add('hidden');
    } else {
        console.error("Produk tidak ditemukan untuk diedit:", productId);
    }
}

// Saves changes from the edit form to Firestore.
async function saveProductEdit() {
    const id = editProductIdInput.value;
    const name = editProductNameInput.value.trim();
    const cost = parseFloat(editProductCostInput.value);
    const price = parseFloat(editProductPriceInput.value);
    const stock = parseInt(editProductStockInput.value);

    if (!name || isNaN(cost) || cost < 0 || isNaN(price) || price < 0 || isNaN(stock) || stock < 0) {
        displayStatus("Error: Nama produk, modal, harga, dan stok harus valid!", "error");
        return;
    }

    try {
        const productRef = window.doc(db, PUBLIC_PRODUCTS_COLLECTION_PATH, id); // Menggunakan window.doc
        await window.updateDoc(productRef, { // Menggunakan window.updateDoc
            name: name,
            cost: cost,
            price: price,
            stock: stock
        });
        displayStatus("Produk berhasil diperbarui!", "success");
        editProductForm.classList.add('hidden');
        storeProductsTableContainer.classList.remove('hidden');
        searchStoreProductsInput.classList.remove('hidden');
        // onSnapshot akan memicu renderStoreProducts
    } catch (e) {
        console.error("Gagal menyimpan perubahan produk ke Firestore:", e);
        displayStatus("Error: Gagal menyimpan produk. Periksa koneksi internet atau hak akses.", "error");
    }
}

// Deletes a product from Firestore.
async function deleteProduct(productId) {
    // Hanya admin yang bisa menghapus produk
    if (loggedInUser && loggedInUser.role !== 'admin') {
        displayStatus("Akses Ditolak: Hanya admin yang dapat menghapus produk.", "error");
        return;
    }

    const confirmed = await confirmAction("Apakah Anda yakin ingin menghapus produk ini?");
    if (confirmed) {
        try {
            await window.deleteDoc(window.doc(db, PUBLIC_PRODUCTS_COLLECTION_PATH, productId)); // Menggunakan window.deleteDoc dan window.doc
            displayStatus("Produk berhasil dihapus!", "success");
            // onSnapshot akan memicu renderStoreProducts
        } catch (e) {
            console.error("Gagal menghapus produk dari Firestore:", e);
            displayStatus("Error: Gagal menghapus produk. Periksa koneksi internet atau hak akses.", "error");
        }
    }
}

// Custom confirmation modal function.
function confirmAction(message) {
    return new Promise(resolve => {
        confirmationMessage.textContent = message;
        confirmationModal.classList.remove('hidden');
        confirmPromiseResolve = resolve;
    });
}

// Closes the store products modal.
function closeStoreProductsModal() {
    storeProductsModal.classList.add('hidden');
    editProductForm.classList.add('hidden');
    searchStoreProductsInput.value = '';
    storeProductsTableContainer.classList.remove('hidden');
    searchStoreProductsInput.classList.remove('hidden');
    displayStatus("", "");
}

// --- Add New Product Functions ---
// Calculates and updates the profit field.
function calculateProfit() {
    const cost = parseFloat(addProductCostInput.value) || 0;
    const price = parseFloat(addProductPriceInput.value) || 0;
    const profit = price - cost;
    addProductProfitInput.value = `Rp ${profit.toLocaleString('id-ID')}`;
    if (profit < 0) {
        addProductProfitInput.style.color = 'red';
    } else {
        addProductProfitInput.style.color = '';
    }
}

// Adds a new product to Firestore.
async function addNewProduct() {
    // Hanya admin yang bisa menambah produk baru
    if (loggedInUser && loggedInUser.role !== 'admin') {
        displayStatus("Akses Ditolak: Hanya admin yang dapat menambah produk baru.", "error");
        return;
    }

    const id = addProductCodeInput.value.trim();
    const name = addProductNameInput.value.trim();
    const cost = parseFloat(addProductCostInput.value);
    const price = parseFloat(addProductPriceInput.value);
    const stock = parseInt(addProductStockInput.value);

    if (!id || !name || isNaN(cost) || cost < 0 || isNaN(price) || price < 0 || isNaN(stock) || stock < 0) {
        displayStatus("Error: Pastikan semua kolom wajib diisi dengan nilai yang valid!", "error");
        return;
    }

    // Cek duplikasi ID produk di array lokal (yang sudah disinkronkan dari Firestore)
    if (products.some(p => p.id.toLowerCase() === id.toLowerCase())) {
        displayStatus("Error: Kode Barang sudah ada. Gunakan kode lain atau edit produk yang sudah ada.", "error");
        return;
    }

    const newProduct = { id: id, name: name, price: price, cost: cost, stock: stock };

    try {
        await window.setDoc(window.doc(db, PUBLIC_PRODUCTS_COLLECTION_PATH, id), newProduct); // Menggunakan window.setDoc dan window.doc
        // Clear form
        addProductCodeInput.value = '';
        addProductNameInput.value = '';
        addProductCostInput.value = '0';
        addProductPriceInput.value = '0';
        addProductStockInput.value = '0';
        calculateProfit(); // Reset profit display

        closeAddProductModal();
        displayStatus("Produk baru berhasil ditambahkan!", "success");
        // onSnapshot akan memicu renderProductDatalist dan renderStoreProducts
    } catch (e) {
        console.error("Gagal menambah produk baru ke Firestore:", e);
        displayStatus("Error: Gagal menambah produk. Periksa koneksi internet atau hak akses.", "error");
    }
}

// Closes the add product modal.
function closeAddProductModal() {
    addProductModal.classList.add('hidden');
    displayStatus("", "");
}

// --- Expenses Functions ---
// Adds a new expense to Firestore.
async function addExpense() {
    if (!db || !currentUserId) {
        displayStatus("Error: Tidak dapat menambah pengeluaran, pengguna belum login.", "error", expenseStatusMessage);
        return;
    }

    const date = expenseDateInput.value;
    const description = expenseDescriptionInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    if (!date || !description || isNaN(amount) || amount <= 0) {
        displayStatus("Error: Tanggal, deskripsi, dan jumlah pengeluaran harus valid!", "error", expenseStatusMessage);
        return;
    }

    const newExpense = { id: 'EXP-' + Date.now(), date: date, description: description, amount: amount, cashierEmail: loggedInUser ? loggedInUser.email : 'Unknown', cashierUid: currentUserId };

    try {
        // FIX: Simpan ke koleksi pengeluaran publik
        await window.setDoc(window.doc(db, PUBLIC_EXPENSES_COLLECTION_PATH, newExpense.id), newExpense);
        displayStatus("Pengeluaran berhasil ditambahkan!", "success", expenseStatusMessage);
        // FIX: Update monthly expenses di store metrics global
        monthlyExpenses += amount;
        await saveStoreMetricsToFirestore();
        renderMonthlyFinancialBar();
        // Clear form
        expenseDateInput.value = new Date().toISOString().slice(0, 10);
        expenseDescriptionInput.value = '';
        expenseAmountInput.value = '0';
        // onSnapshot akan memicu renderExpenses
    } catch (e) {
        console.error("Gagal menambah pengeluaran ke Firestore:", e);
        displayStatus("Error: Gagal menambah pengeluaran. Periksa koneksi internet atau hak akses.", "error", expenseStatusMessage);
    }
}

// Renders the list of expenses with search and date filters.
function renderExpenses() {
    if (!expensesListBody || !totalExpensesDisplayModal) return;
    expensesListBody.innerHTML = '';

    const searchTerm = expenseSearchInput.value.toLowerCase();
    const startDateStr = expenseFilterStartDate.value;
    const endDateStr = expenseFilterEndDate.value;

    let filteredExpenses = expenses;

    // Apply search filter
    if (searchTerm) {
        filteredExpenses = filteredExpenses.filter(expense =>
            expense.description.toLowerCase().includes(searchTerm) ||
            (expense.cashierEmail && expense.cashierEmail.toLowerCase().includes(searchTerm))
        );
    }

    // Apply date filter
    if (startDateStr && endDateStr) {
        const startDate = new Date(startDateStr);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(endDateStr);
        endDate.setHours(23, 59, 59, 999);

        filteredExpenses = filteredExpenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= startDate && expenseDate <= endDate;
        });
    } else if (startDateStr) {
        const startDate = new Date(startDateStr);
        startDate.setHours(0, 0, 0, 0);
        filteredExpenses = filteredExpenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= startDate;
        });
    } else if (endDateStr) {
        const endDate = new Date(endDateStr);
        endDate.setHours(23, 59, 59, 999);
        filteredExpenses = filteredExpenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate <= endDate;
        });
    }

    let totalFilteredExpenses = 0;

    if (filteredExpenses.length === 0) {
        emptyExpensesMessage.classList.remove('hidden');
    } else {
        emptyExpensesMessage.classList.add('hidden');
        // Sort expenses by date, newest first
        filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
        filteredExpenses.forEach(expense => {
            const row = document.createElement('tr');
            const hoverClass = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
            const textClass = isDarkMode ? 'text-gray-200' : 'text-gray-700';
            const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-200';

            row.className = hoverClass;
            const expenseDate = new Date(expense.date).toLocaleDateString('id-ID');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ${textClass} ${borderColor}">${expenseDate}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm ${textClass} ${borderColor}">${expense.description}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm ${textClass} text-right ${borderColor}">Rp ${expense.amount.toLocaleString('id-ID')}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm ${textClass} ${borderColor}">${expense.cashierEmail || 'N/A'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${borderColor}">
                    <button class="delete-expense-btn text-red-600 hover:text-red-900" data-expense-id="${expense.id}" title="Hapus Pengeluaran">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </td>
            `;
            expensesListBody.appendChild(row);
            totalFilteredExpenses += expense.amount;
        });
    }
    totalExpensesDisplayModal.textContent = `Rp ${totalFilteredExpenses.toLocaleString('id-ID')}`;
}

// Deletes an expense from Firestore.
async function deleteExpense(expenseId) {
    if (!db || !currentUserId) {
        displayStatus("Error: Tidak dapat menghapus pengeluaran, pengguna belum login.", "error", expenseStatusMessage);
        return;
    }
    // Hanya admin yang bisa menghapus pengeluaran
    if (loggedInUser && loggedInUser.role !== 'admin') {
        displayStatus("Akses Ditolak: Hanya admin yang dapat menghapus pengeluaran.", "error");
        return;
    }


    const confirmed = await confirmAction("Apakah Anda yakin ingin menghapus pengeluaran ini?");
    if (confirmed) {
        try {
            const deletedExpense = expenses.find(e => e.id === expenseId);
            // FIX: Hapus dari koleksi pengeluaran publik
            await window.deleteDoc(window.doc(db, PUBLIC_EXPENSES_COLLECTION_PATH, expenseId));
            displayStatus("Pengeluaran berhasil dihapus!", "success", expenseStatusMessage);

            // Perbarui monthly expenses jika pengeluaran yang dihapus berasal dari bulan ini
            const thisMonth = new Date().toISOString().slice(0, 7);
            const expenseMonth = new Date(deletedExpense.date).toISOString().slice(0, 7);
            if (expenseMonth === thisMonth) {
                monthlyExpenses -= deletedExpense.amount;
                if (monthlyExpenses < 0) monthlyExpenses = 0;
                // FIX: Simpan ke store metrics global
                await saveStoreMetricsToFirestore();
                renderMonthlyFinancialBar();
            }
        } catch (e) {
            console.error("Gagal menghapus pengeluaran dari Firestore:", e);
            displayStatus("Error: Gagal menghapus pengeluaran. Periksa koneksi internet atau hak akses.", "error", expenseStatusMessage);
        }
    } else {
        displayStatus("Penghapusan pengeluaran dibatalkan.", "info", expenseStatusMessage);
    }
}

// Closes the expenses modal.
function closeExpensesModal() {
    expensesModal.classList.add('hidden');
    displayStatus("", "", expenseStatusMessage);
    displayStatus("", "");
    expenseSearchInput.value = '';
    expenseFilterStartDate.value = '';
    expenseFilterEndDate.value = '';
}

// --- Financial Report Functions ---
function calculateFinancialReport() {
    const startDateStr = reportStartDateInput.value;
    const endDateStr = reportEndDateInput.value;
    // FIX: Filter dari data transaksi dan pengeluaran publik
    let filteredTransactions = transactionHistory;
    let filteredExpenses = expenses;

    if (startDateStr && endDateStr) {
        const startDate = new Date(startDateStr);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(endDateStr);
        endDate.setHours(23, 59, 59, 999);

        filteredTransactions = transactionHistory.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
        filteredExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= startDate && expenseDate <= endDate;
        });

    } else if (startDateStr) {
        const startDate = new Date(startDateStr);
        startDate.setHours(0, 0, 0, 0);
        filteredTransactions = transactionHistory.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startDate;
        });
        filteredExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= startDate;
        });
    } else if (endDateStr) {
        const endDate = new Date(endDateStr);
        endDate.setHours(23, 59, 59, 999);
        filteredTransactions = filteredTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate <= endDate;
        });
        filteredExpenses = filteredExpenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate <= endDate;
        });
    }

    let totalRevenue = 0;
    let totalCostOfGoodsSold = 0;
    let totalExpensesSum = 0; // Menggunakan nama yang berbeda untuk menghindari konflik dengan variabel global

    filteredTransactions.forEach(transaction => {
        totalRevenue += transaction.totalAmount;
        transaction.items.forEach(item => {
            if (item.isCustom) {
                totalCostOfGoodsSold += (item.price * 0.8) * item.qty;
            } else {
                totalCostOfGoodsSold += item.cost * item.qty;
            }
        });
    });

    filteredExpenses.forEach(expense => {
        totalExpensesSum += expense.amount;
    });

    const grossProfit = totalRevenue - totalCostOfGoodsSold;
    const netProfit = grossProfit - totalExpensesSum;

    totalRevenueDisplay.textContent = `Rp ${totalRevenue.toLocaleString('id-ID')}`;
    totalExpensesDisplay.textContent = `Rp ${totalExpensesSum.toLocaleString('id-ID')}`;
    grossProfitDisplay.textContent = `Rp ${grossProfit.toLocaleString('id-ID')}`;
    netProfitDisplay.textContent = `Rp ${netProfit.toLocaleString('id-ID')}`;

    if (financialReportMessageBox) {
        if (filteredTransactions.length === 0 && filteredExpenses.length === 0) {
            financialReportMessageBox.classList.remove('hidden');
            financialReportMessageBox.textContent = "Tidak ada data transaksi atau pengeluaran untuk rentang tanggal yang dipilih.";
        } else {
            financialReportMessageBox.classList.add('hidden');
            financialReportMessageBox.textContent = '';
        }
    }

    const chartData = [totalRevenue, totalExpensesSum, grossProfit, netProfit];
    renderFinancialReportChart(chartData);
}

// Renders the financial report chart using Chart.js.
function renderFinancialReportChart(data) {
    const ctx = financialChartCanvas.getContext('2d');
    if (window.myFinancialChart) {
        window.myFinancialChart.destroy();
    }

    const textColor = isDarkMode ? '#e2e8f0' : '#1a202c';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    window.myFinancialChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Pendapatan', 'Pengeluaran', 'Laba Kotor', 'Laba Bersih'],
            datasets: [{
                label: 'Jumlah (Rp)',
                data: data,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Ringkasan Keuangan',
                    color: textColor
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: gridColor
                    }
                },
                x: {
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: gridColor
                    }
                }
            }
        }
    });
}

// --- Data Import/Export Functions (Hanya lokal, belum terintegrasi penuh dengan Firestore) ---
// Note: Fungsi ekspor/impor ini masih akan bekerja dengan data lokal `products`, `transactionHistory`, dll.
// Untuk ekspor/impor langsung dari/ke Firestore, akan butuh implementasi yang lebih kompleks
// melibatkan data dumping/restoring dari database. Untuk saat ini, fungsi ini masih akan
// mengekspor/impor data lokal yang sudah disinkronkan dari Firestore.

// Exports all products to a JSON file.
function exportProducts() {
    const dataStr = JSON.stringify(products, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pos_products_export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    displayStatus("Data produk berhasil diekspor!", "success");
}

// Imports products from a JSON file to Firestore.
async function importProducts(event) {
    // Hanya admin yang bisa mengimpor produk
    if (loggedInUser && loggedInUser.role !== 'admin') {
        displayStatus("Akses Ditolak: Hanya admin yang dapat mengimpor produk.", "error");
        return;
    }

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const importedProducts = JSON.parse(e.target.result);
            if (!Array.isArray(importedProducts) || !importedProducts.every(p => p.id && p.name && typeof p.price === 'number')) {
                displayStatus("Error: Format file produk tidak valid.", "error");
                return;
            }

            const confirmed = await confirmAction("Ini akan menimpa data produk yang ada. Lanjutkan?");
            if (confirmed) {
                // Hapus produk lama di Firestore, lalu tambahkan yang baru
                displayStatus("Mengimpor produk...", "info");
                const existingProductDocs = await window.getDocs(window.collection(db, PUBLIC_PRODUCTS_COLLECTION_PATH)); // Menggunakan window.getDocs dan window.collection
                for (const docSnapshot of existingProductDocs.docs) {
                    await window.deleteDoc(docSnapshot.ref); // Menggunakan window.deleteDoc
                }

                for (const product of importedProducts) {
                    await window.setDoc(window.doc(db, PUBLIC_PRODUCTS_COLLECTION_PATH, product.id), product); // Menggunakan window.setDoc dan window.doc
                }

                displayStatus("Data produk berhasil diimpor!", "success");
                // onSnapshot akan memicu pembaruan array `products` lokal dan render ulang
            } else {
                displayStatus("Impor produk dibatalkan.", "info");
            }

        } catch (error) {
            displayStatus("Error memproses file produk: " + error.message + " Pastikan file JSON valid.", "error");
            console.error("Error importing products:", error);
        }
    };
    reader.readAsText(file);
}

// Exports all application data (products and transactions) to a JSON file.
function exportAllData() {
    // Data produk publik
    const publicProducts = products;

    // FIX: Ambil data transaksi dan pengeluaran dari koleksi publik
    const allTransactions = transactionHistory;
    const allExpenses = expenses;

    // FIX: Ambil data store metrics global
    const storeMetrics = {
        dailyRevenue: dailyRevenue,
        lastRecordedDate: lastRecordedDate,
        monthlyNetProfit: monthlyNetProfit,
        monthlyExpenses: monthlyExpenses,
        lastRecordedMonth: lastRecordedMonth,
    };

    // Data pribadi pengguna yang sedang login (appState)
    const currentUserAppState = {
        isRevenueVisible: isRevenueVisible,
        isDarkMode: isDarkMode,
        lastConnectedPrinterId: bluetoothPrinterDevice ? bluetoothPrinterDevice.id : null
    };

    const appData = {
        appId: APP_ID, // Sertakan app ID
        exportedByUid: currentUserId, // Sertakan UID pengguna yang mengekspor
        exportDate: new Date().toISOString(),
        publicData: {
            products: publicProducts,
            transactions: allTransactions, // FIX: Menyertakan semua transaksi
            expenses: allExpenses,       // FIX: Menyertakan semua pengeluaran
            storeMetrics: storeMetrics   // FIX: Menyertakan metrik toko global
        },
        userData: {
            appState: currentUserAppState
        }
    };

    const dataStr = JSON.stringify(appData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pos_app_data_full_export_${currentUserId || 'unknown'}_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    displayStatus("Data aplikasi lengkap berhasil diekspor!", "success");
}

// Imports all application data from a JSON file to Firestore.
async function importAllData(event) {
    if (!currentUserId) {
        displayStatus("Error: Anda harus login untuk mengimpor data.", "error");
        return;
    }
    // Hanya admin yang bisa mengimpor data publik (produk, transaksi, pengeluaran, storeMetrics)
    // Pengguna biasa bisa mengimpor data pribadinya (appState).
    const isAdmin = loggedInUser && loggedInUser.role === 'admin';

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            // FIX: Periksa struktur data impor yang baru
            if (!importedData.publicData || !importedData.userData) {
                displayStatus("Error: Format file data aplikasi tidak valid. Pastikan berisi 'publicData' dan 'userData'.", "error");
                return;
            }

            const confirmed = await confirmAction("Ini akan menimpa SEMUA data aplikasi Anda (produk, transaksi, dll). Lanjutkan?");
            if (confirmed) {
                displayStatus("Mengimpor data aplikasi...", "info");

                // Import data produk (hanya jika admin)
                if (isAdmin && importedData.publicData.products) {
                    const existingProductDocs = await window.getDocs(window.collection(db, PUBLIC_PRODUCTS_COLLECTION_PATH)); // Menggunakan window.getDocs dan window.collection
                    for (const docSnapshot of existingProductDocs.docs) {
                        await window.deleteDoc(docSnapshot.ref); // Menggunakan window.deleteDoc
                    }
                    for (const product of importedData.publicData.products) {
                        await window.setDoc(window.doc(db, PUBLIC_PRODUCTS_COLLECTION_PATH, product.id), product); // Menggunakan window.setDoc dan window.doc
                    }
                    console.log("Produk publik berhasil diimpor.");
                } else if (!isAdmin) {
                    displayStatus("Anda bukan Admin. Data produk publik tidak diimpor.", "warning");
                }

                // FIX: Import data transaksi publik (hanya jika admin)
                if (isAdmin && importedData.publicData.transactions) {
                    const existingTransactionDocs = await window.getDocs(window.collection(db, PUBLIC_TRANSACTIONS_COLLECTION_PATH));
                    for (const docSnapshot of existingTransactionDocs.docs) {
                        await window.deleteDoc(docSnapshot.ref);
                    }
                    for (const transaction of importedData.publicData.transactions) {
                        await window.setDoc(window.doc(db, PUBLIC_TRANSACTIONS_COLLECTION_PATH, transaction.id), transaction);
                    }
                    console.log("Transaksi publik berhasil diimpor.");
                } else if (!isAdmin && importedData.userData.transactions) {
                    // Jika bukan admin, hanya impor transaksi pribadi jika ada di file lama
                    // Ini untuk kompatibilitas mundur jika user mengimpor file lama (sebelum transaksi publik)
                    const existingTransactionDocs = await window.getDocs(window.collection(db, PUBLIC_TRANSACTIONS_COLLECTION_PATH)); // Now it's public
                    for (const docSnapshot of existingTransactionDocs.docs) {
                        await window.deleteDoc(docSnapshot.ref);
                    }
                    for (const transaction of importedData.userData.transactions) {
                         // Still save to public, but ensure it's from user's old private data if exists
                        await window.setDoc(window.doc(db, PUBLIC_TRANSACTIONS_COLLECTION_PATH, transaction.id), transaction);
                    }
                     console.log("Transaksi pribadi (dari format lama) berhasil diimpor ke koleksi publik.");
                }


                // FIX: Import data pengeluaran publik (hanya jika admin)
                if (isAdmin && importedData.publicData.expenses) {
                    const existingExpenseDocs = await window.getDocs(window.collection(db, PUBLIC_EXPENSES_COLLECTION_PATH));
                    for (const docSnapshot of existingExpenseDocs.docs) {
                        await window.deleteDoc(docSnapshot.ref);
                    }
                    for (const expense of importedData.publicData.expenses) {
                        await window.setDoc(window.doc(db, PUBLIC_EXPENSES_COLLECTION_PATH, expense.id), expense);
                    }
                    console.log("Pengeluaran publik berhasil diimpor.");
                } else if (!isAdmin && importedData.userData.expenses) {
                     // Jika bukan admin, hanya impor pengeluaran pribadi jika ada di file lama
                     const existingExpenseDocs = await window.getDocs(window.collection(db, PUBLIC_EXPENSES_COLLECTION_PATH)); // Now it's public
                    for (const docSnapshot of existingExpenseDocs.docs) {
                        await window.deleteDoc(docSnapshot.ref);
                    }
                    for (const expense of importedData.userData.expenses) {
                        await window.setDoc(window.doc(db, PUBLIC_EXPENSES_COLLECTION_PATH, expense.id), expense);
                    }
                    console.log("Pengeluaran pribadi (dari format lama) berhasil diimpor ke koleksi publik.");
                }


                // FIX: Import store metrics (hanya jika admin)
                if (isAdmin && importedData.publicData.storeMetrics) {
                    await window.setDoc(window.doc(db, STORE_METRICS_DOC_PATH), importedData.publicData.storeMetrics, { merge: true });
                    console.log("Store metrics berhasil diimpor.");
                } else if (!isAdmin) {
                    displayStatus("Anda bukan Admin. Data metrik toko tidak diimpor.", "warning");
                }


                // Import app state pribadi (tetap berlaku untuk semua user)
                if (importedData.userData.appState) {
                    await window.setDoc(window.doc(db, USER_APP_STATE_DOC_PATH(currentUserId)), importedData.userData.appState, { merge: true }); // Menggunakan window.setDoc dan window.doc
                    console.log("App state pribadi berhasil diimpor.");
                }

                displayStatus("Data aplikasi berhasil diimpor! Silakan muat ulang halaman untuk pembaruan penuh.", "success");
                // Memuat ulang halaman untuk memastikan semua data dan listener diinisialisasi ulang
                // window.location.reload(); // Mungkin terlalu agresif, lebih baik biarkan listener yang bekerja
            } else {
                displayStatus("Impor data aplikasi dibatalkan.", "info");
            }

        } catch (error) {
            displayStatus("Error memproses file data aplikasi: " + error.message + " Pastikan file JSON valid.", "error");
            console.error("Error importing all data:", error);
        }
    };
    reader.readAsText(file);
}

// Function to perform the actual data reset
async function performResetAllData() {
    if (!currentUserId) {
        displayStatus("Error: Anda harus login untuk mereset data.", "error", resetDataMessage);
        return;
    }

    const isAdmin = loggedInUser && loggedInUser.role === 'admin';

    try {
        // FIX: Reset data transaksi publik
        displayStatus("Mereset data transaksi publik...", "info", resetDataMessage);
        const publicTransactionsRef = window.collection(db, PUBLIC_TRANSACTIONS_COLLECTION_PATH);
        const publicTransactionDocs = await window.getDocs(publicTransactionsRef);
        for (const d of publicTransactionDocs.docs) { await window.deleteDoc(d.ref); }

        // FIX: Reset data pengeluaran publik
        displayStatus("Mereset data pengeluaran publik...", "info", resetDataMessage);
        const publicExpensesRef = window.collection(db, PUBLIC_EXPENSES_COLLECTION_PATH);
        const publicExpenseDocs = await window.getDocs(publicExpensesRef);
        for (const d of publicExpenseDocs.docs) { await window.deleteDoc(d.ref); }

        // FIX: Reset store metrics global
        displayStatus("Mereset metrik toko global...", "info", resetDataMessage);
        const storeMetricsRef = window.doc(db, STORE_METRICS_DOC_PATH);
        await window.deleteDoc(storeMetricsRef); // Hapus dokumen store metrics global

        // Reset appState pribadi (tetap sama)
        displayStatus("Mereset app state pribadi...", "info", resetDataMessage);
        const appStateRef = window.doc(db, USER_APP_STATE_DOC_PATH(currentUserId));
        await window.deleteDoc(appStateRef);

        // Reset data publik (produk) hanya jika admin
        if (isAdmin) {
            displayStatus("Mereset data produk publik...", "info", resetDataMessage);
            const productsRef = window.collection(db, PUBLIC_PRODUCTS_COLLECTION_PATH); // Menggunakan window.collection
            const productDocs = await window.getDocs(productsRef); // Menggunakan window.getDocs
            for (const d of productDocs.docs) { await window.deleteDoc(d.ref); } // Menggunakan window.deleteDoc
            // Setelah menghapus, buat kembali beberapa produk default jika diinginkan
            await addDefaultProductsToFirestore();
        } else {
            displayStatus("Anda bukan Admin. Data produk publik tidak direset.", "warning", resetDataMessage);
        }

        // Opsional: Buat kembali storeMetrics default setelah reset
        await window.setDoc(window.doc(db, STORE_METRICS_DOC_PATH), {
            dailyRevenue: 0,
            lastRecordedDate: new Date().toISOString().slice(0, 10),
            monthlyNetProfit: 0,
            monthlyExpenses: 0,
            lastRecordedMonth: new Date().toISOString().slice(0, 7)
        });

        // Opsional: Buat kembali appState default setelah reset
        await window.setDoc(window.doc(db, USER_APP_STATE_DOC_PATH(currentUserId)), { // Menggunakan window.setDoc dan window.doc
            isRevenueVisible: true,
            isDarkMode: false,
            lastConnectedPrinterId: null
        });


        // Membersihkan variabel lokal dan UI setelah reset
        currentTransactionItems = [];
        dailyRevenue = 0; // Reset variabel lokal
        lastRecordedDate = ''; // Reset variabel lokal
        isRevenueVisible = true;
        isDarkMode = false;
        monthlyNetProfit = 0; // Reset variabel lokal
        monthlyExpenses = 0; // Reset variabel lokal
        lastRecordedMonth = ''; // Reset variabel lokal
        bluetoothPrinterDevice = null;
        printerCharacteristic = null;

        // Tidak perlu load ulang dari Firestore karena listener akan memicu itu
        // dan dokumen default appState sudah dibuat.

        startNewTransaction(); // Reset UI
        updateHeaderDailyRevenue();
        updateCashierDisplay();
        applyDarkMode();
        renderMonthlyFinancialBar();
        updatePrinterConnectionStatus("Silahkan sambungkan printer");
        displayStatus("Semua data aplikasi telah direset!", "success");

    } catch (e) {
        console.error("Error saat mereset data:", e);
        displayStatus("Error: Gagal mereset data. Periksa koneksi internet atau hak akses.", "error", resetDataMessage);
    }
}

// Fungsi untuk menambahkan produk default ke Firestore jika kosong
async function addDefaultProductsToFirestore() {
    const productsRef = window.collection(db, PUBLIC_PRODUCTS_COLLECTION_PATH); // Menggunakan window.collection
    const existingProducts = await window.getDocs(productsRef); // Menggunakan window.getDocs
    if (existingProducts.empty) {
        const defaultProducts = [
            { id: 'prod001', name: "Kopi Hitam", price: 15000, cost: 10000, stock: 100 },
            { id: 'prod002', name: "Kopi Susu", price: 18000, cost: 12000, stock: 80 },
            { id: 'prod003', name: "Teh Manis", price: 10000, cost: 6000, stock: 150 },
            { id: 'prod004', name: "Es Jeruk", price: 12000, cost: 7000, stock: 90 },
            { id: 'prod005', name: "Roti Bakar Keju", price: 25000, cost: 18000, stock: 50 },
            { id: 'prod006', name: "Mie Ayam", price: 22000, cost: 15000, stock: 70 },
            { id: 'prod007', name: "Nasi Goreng", price: 28000, cost: 20000, stock: 60 },
            { id: 'prod008', name: "Air Mineral", price: 5000, cost: 2000, stock: 200 },
        ];
        for (const product of defaultProducts) {
            await window.setDoc(window.doc(db, PUBLIC_PRODUCTS_COLLECTION_PATH, product.id), product); // Menggunakan window.setDoc dan window.doc
        }
        console.log("Produk default ditambahkan ke Firestore.");
    }
}


// Function to open the reset data confirmation modal
function openResetDataConfirmation() {
    resetDataModal.classList.remove('hidden');
    resetPasswordInput.value = '';
    resetDataMessage.classList.add('hidden');
}


// --- Transaction History Functions ---
// Renders the list of transactions in the history modal, with optional date filter.
function renderTransactionHistory(startDateStr = '', endDateStr = '') {
    if (!transactionHistoryTableBody || !totalTransactionsAmount) return;
    transactionHistoryTableBody.innerHTML = '';

    let filteredHistory = transactionHistory;

    if (startDateStr && endDateStr) {
        const startDate = new Date(startDateStr);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(endDateStr);
        endDate.setHours(23, 59, 59, 999);

        filteredHistory = transactionHistory.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
    } else if (startDateStr) {
        const startDate = new Date(startDateStr);
        startDate.setHours(0, 0, 0, 0);
        filteredHistory = transactionHistory.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startDate;
        });
    } else if (endDateStr) {
        const endDate = new Date(endDateStr);
        endDate.setHours(23, 59, 59, 999);
        filteredHistory = filteredHistory.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate <= endDate;
        });
    }

    let totalAmountFilteredTransactions = 0;

    if (filteredHistory.length === 0) {
        transactionHistoryMessageBox.classList.remove('hidden');
        transactionHistoryMessageBox.textContent = "Tidak ada transaksi dalam riwayat." + (startDateStr || endDateStr ? " untuk rentang tanggal yang dipilih." : "");
        totalAmountFilteredTransactions = 0;
    } else {
        transactionHistoryMessageBox.classList.add('hidden');
    }

    filteredHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

    filteredHistory.forEach(transaction => {
        const row = document.createElement('tr');
        const hoverClass = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
        const textClass = isDarkMode ? 'text-gray-200' : 'text-gray-700';
        const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-200';

        row.className = hoverClass;
        const transactionDate = new Date(transaction.date).toLocaleString('id-ID', {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
        row.innerHTML = `
            <td class="py-2 px-4 border-b ${borderColor} ${textClass}">${transaction.id}</td>
            <td class="py-2 px-4 border-b ${borderColor} ${textClass}">${transactionDate}</td>
            <td class="py-2 px-4 border-b ${borderColor} ${textClass}">${transaction.cashierEmail || 'N/A'}</td>
            <td class="py-2 px-4 border-b ${borderColor} text-right ${textClass}">Rp ${transaction.totalAmount.toLocaleString('id-ID')}</td>
            <td class="py-2 px-4 border-b ${borderColor} text-center">
                <button class="view-detail-btn text-blue-500 hover:text-blue-700 mr-2" data-transaction-id="${transaction.id}" title="Lihat Detail">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </button>
                <button class="delete-transaction-btn text-red-500 hover:text-red-700" data-transaction-id="${transaction.id}" title="Hapus Transaksi">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                </button>
            </td>
        `;
        transactionHistoryTableBody.appendChild(row);
        totalAmountFilteredTransactions += transaction.totalAmount;
    });
    totalTransactionsAmount.textContent = `Rp ${totalAmountFilteredTransactions.toLocaleString('id-ID')}`;
}

// Displays detailed information for a specific transaction.
function viewTransactionDetails(transactionId) {
    const transaction = transactionHistory.find(t => t.id === transactionId);
    if (!transaction) {
        displayStatus("Error: Transaksi tidak ditemukan.", "error");
        return;
    }

    document.getElementById('transaction-history-table-body').parentElement.classList.add('hidden');
    document.getElementById('transaction-history-message-box').classList.add('hidden');
    historyFilterControls.classList.add('hidden');
    totalTransactionsAmount.parentElement.classList.add('hidden');
    transactionDetailSection.classList.remove('hidden');

    reprintReceiptBtn.dataset.transactionId = transaction.id;

    detailTransactionId.textContent = transaction.id;
    detailTransactionDate.textContent = new Date(transaction.date).toLocaleString('id-ID', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    detailCashier.textContent = transaction.cashierEmail || 'N/A'; // Gunakan email kasir
    detailSubtotal.textContent = `Rp ${transaction.subtotalAmount.toLocaleString('id-ID')}`;
    detailDiscount.textContent = `Rp ${transaction.discountAmount.toLocaleString('id-ID')}`;
    detailTotalAmount.textContent = `Rp ${transaction.totalAmount.toLocaleString('id-ID')}`;
    detailPaymentAmount.textContent = `Rp ${transaction.paymentAmount.toLocaleString('id-ID')}`;
    detailChangeAmount.textContent = `Rp ${transaction.changeAmount.toLocaleString('id-ID')}`;

    detailItemList.innerHTML = '';
    if (transaction.items && transaction.items.length > 0) {
        transaction.items.forEach(item => {
            const row = document.createElement('tr');
            const textClass = isDarkMode ? 'text-gray-200' : 'text-gray-700';
            const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-200';
            row.innerHTML = `
                <td class="py-2 px-4 border-b ${borderColor} ${textClass}">${item.name}</td>
                <td class="py-2 px-4 border-b ${borderColor} text-right ${textClass}">${item.qty}</td>
                <td class="py-2 px-4 border-b ${borderColor} text-right ${textClass}">Rp ${item.price.toLocaleString('id-ID')}</td>
                <td class="py-2 px-4 border-b ${borderColor} text-right ${textClass}">Rp ${(item.qty * item.price).toLocaleString('id-ID')}</td>
            `;
            detailItemList.appendChild(row);
        });
    } else {
        const textClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';
        detailItemList.innerHTML = `<tr><td colspan="4" class="py-4 text-center ${textClass}">Tidak ada item dalam transaksi ini.</td></tr>`;
    }
}

// Hides the transaction detail section and shows the history list.
function closeTransactionDetails() {
    transactionDetailSection.classList.add('hidden');
    document.getElementById('transaction-history-table-body').parentElement.classList.remove('hidden');
    historyFilterControls.classList.remove('hidden');
    totalTransactionsAmount.parentElement.classList.remove('hidden');
    renderTransactionHistory(historyStartDateInput.value, historyEndDateInput.value);
}

// Deletes a transaction from Firestore and returns stock for registered products.
async function deleteTransaction(transactionId) {
    if (!db || !currentUserId) {
        displayStatus("Error: Tidak dapat menghapus transaksi, pengguna belum login.", "error");
        return;
    }
    // Hanya admin yang bisa menghapus transaksi
    if (loggedInUser && loggedInUser.role !== 'admin') {
        displayStatus("Akses Ditolak: Hanya admin yang dapat menghapus transaksi.", "error");
        return;
    }

    const confirmed = await confirmAction("Apakah Anda yakin ingin menghapus transaksi ini? Stok produk terdaftar akan dikembalikan.");
    if (!confirmed) return;

    try {
        const transactionToDelete = transactionHistory.find(t => t.id === transactionId);
        if (!transactionToDelete) {
            displayStatus("Error: Transaksi tidak ditemukan untuk dihapus.", "error");
            return;
        }

        // Kembalikan stok untuk semua produk yang terdaftar
        for (const item of transactionToDelete.items) {
            if (!item.productId.startsWith('custom-')) {
                const product = products.find(p => p.id === item.productId);
                if (product && product.stock !== undefined) {
                    product.stock += item.qty;
                    await window.setDoc(window.doc(db, PUBLIC_PRODUCTS_COLLECTION_PATH, product.id), product); // Update stok di Firestore // Menggunakan window.setDoc dan window.doc
                }
            }
        }

        // FIX: Hapus dokumen transaksi dari koleksi publik
        await window.deleteDoc(window.doc(db, PUBLIC_TRANSACTIONS_COLLECTION_PATH, transactionId));
        displayStatus("Transaksi berhasil dihapus dan stok dikembalikan!", "success");

        // Perbarui daily dan monthly revenue di store metrics global
        const today = new Date().toISOString().slice(0, 10);
        const transactionDate = new Date(transactionToDelete.date).toISOString().slice(0, 10);
        if (transactionDate === today) {
            dailyRevenue -= transactionToDelete.totalAmount;
            if (dailyRevenue < 0) dailyRevenue = 0;
        }

        const thisMonth = new Date().toISOString().slice(0, 7);
        const transactionMonth = new Date(transactionToDelete.date).toISOString().slice(0, 7);
        if (transactionMonth === thisMonth && transactionToDelete.transactionNetProfit !== undefined) {
            monthlyNetProfit -= transactionToDelete.transactionNetProfit;
        }
        await saveStoreMetricsToFirestore(); // Simpan perubahan ke store metrics global
        // onSnapshot akan memicu pembaruan array `transactionHistory` lokal dan render ulang UI
    } catch (e) {
        console.error("Gagal menghapus transaksi dari Firestore:", e);
        displayStatus("Error: Gagal menghapus transaksi. Periksa koneksi internet atau hak akses.", "error");
    }
}

// --- User Management Functions (Menggunakan Firebase Auth & Firestore) ---

// Main login function for the initial login screen.
async function loginUser() {
    if (!auth) {
        displayStatus("Error: Firebase Auth tidak diinisialisasi.", "error", loginScreenMessage);
        return;
    }

    const email = loginScreenEmailInput.value.trim();
    const password = loginScreenPasswordInput.value.trim();

    if (!email || !password) {
        displayStatus("Email dan password wajib diisi!", "error", loginScreenMessage);
        return;
    }

    try {
        displayStatus("Login...", "info", loginScreenMessage);
        const userCredential = await window.signInWithEmailAndPassword(auth, email, password); // Menggunakan window.signInWithEmailAndPassword
        // onAuthStateChanged akan menangani pembaruan UI dan pemuatan data
        displayStatus(`Selamat datang, ${userCredential.user.email}!`, "success", loginScreenMessage);
        // Clear login fields
        loginScreenEmailInput.value = '';
        loginScreenPasswordInput.value = '';
    } catch (error) {
        console.error("Login Error:", error);
        let errorMessage = "Login gagal. Periksa email dan password lo.";
        if (error.code === 'auth/user-not-found') {
            errorMessage = "Pengguna tidak ditemukan. Email tidak terdaftar.";
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = "Password salah.";
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = "Format email tidak valid.";
        }
        displayStatus(errorMessage, "error", loginScreenMessage);
    }
}

// Handles user login *within the user settings modal*.
async function userSettingsLogin() {
    if (!auth) {
        displayStatus("Error: Firebase Auth tidak diinisialisasi.", "error", userSettingsLoginStatusMessage);
        return;
    }

    const email = userSettingsLoginEmailInput.value.trim();
    const password = userSettingsLoginPasswordInput.value.trim();

    if (!email || !password) {
        displayStatus("Email dan password wajib diisi!", "error", userSettingsLoginStatusMessage);
        return;
    }

    try {
        displayStatus("Login...", "info", userSettingsLoginStatusMessage);
        const userCredential = await window.signInWithEmailAndPassword(auth, email, password); // Menggunakan window.signInWithEmailAndPassword
        // onAuthStateChanged akan menangani pembaruan UI dan pemuatan data
        displayStatus(`Selamat datang, ${userCredential.user.email}!`, "success", userSettingsLoginStatusMessage);
        // Clear login fields
        userSettingsLoginEmailInput.value = '';
        userSettingsLoginPasswordInput.value = '';
    } catch (error) {
        console.error("User Settings Login Error:", error);
        let errorMessage = "Login gagal. Periksa email dan password lo.";
        if (error.code === 'auth/user-not-found') {
            errorMessage = "Pengguna tidak ditemukan. Email tidak terdaftar.";
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = "Password salah.";
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = "Format email tidak valid.";
        }
        displayStatus(errorMessage, "error", userSettingsLoginStatusMessage);
    }
}

// Handles user logout.
async function logoutUser() {
    if (!auth) return;

    const confirmed = await confirmAction("Apakah Anda yakin ingin logout?");
    if (!confirmed) return;

    try {
        await window.signOut(auth); // Menggunakan window.signOut
        displayStatus("Anda telah logout.", "info");
        // onAuthStateChanged akan menangani pembaruan UI
    } catch (error) {
        console.error("Logout Error:", error);
        displayStatus(`Error saat logout: ${error.message}`, "error");
    }
}

// Adds a new user (cashier or admin) to Firebase Auth and Firestore.
async function addNewUser() {
    if (!auth || !db) {
        displayStatus("Error: Firebase tidak diinisialisasi.", "error", addUserStatusMessage);
        return;
    }
    // Hanya admin yang bisa menambah pengguna baru
    if (loggedInUser && loggedInUser.role !== 'admin') {
        displayStatus("Akses Ditolak: Hanya admin yang dapat menambah pengguna baru.", "error", addUserStatusMessage);
        return;
    }

    const email = newUseEmailInput.value.trim();
    const password = newUserPasswordInput.value.trim();
    const role = newUserRoleSelect.value;

    if (!email || !password) {
        displayStatus("Email dan password wajib diisi!", "error", addUserStatusMessage);
        return;
    }
    if (password.length < 6) {
        displayStatus("Password minimal 6 karakter!", "error", addUserStatusMessage);
        return;
    }

    try {
        displayStatus("Menambah pengguna...", "info", addUserStatusMessage);
        const userCredential = await window.createUserWithEmailAndPassword(auth, email, password); // Menggunakan window.createUserWithEmailAndPassword
        const uid = userCredential.user.uid;

        // Simpan role pengguna di Firestore
        await window.setDoc(window.doc(db, USER_ROLES_COLLECTION_PATH, uid), { // Menggunakan window.setDoc dan window.doc
            email: email,
            role: role
        });

        displayStatus("Pengguna baru berhasil ditambahkan!", "success", addUserStatusMessage);
        newUseEmailInput.value = '';
        newUserPasswordInput.value = '';
        newUserRoleSelect.value = 'cashier';
        // onSnapshot untuk user roles akan memicu renderUserList
    } catch (error) {
        console.error("Error adding new user:", error);
        let errorMessage = "Gagal menambah pengguna.";
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = "Email sudah digunakan oleh pengguna lain.";
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = "Format email tidak valid.";
        } else if (error.code === 'auth/weak-password') {
            errorMessage = "Password terlalu lemah (minimal 6 karakter).";
        }
        displayStatus(errorMessage, "error", addUserStatusMessage);
    }
}

// Renders the list of users in the user management section.
async function renderUserList() {
    if (!userListBody || !emptyUserMessage || !db) return;
    userListBody.innerHTML = '';

    // Hanya admin yang bisa melihat daftar pengguna
    if (loggedInUser && loggedInUser.role !== 'admin') {
        userListBody.innerHTML = `<tr><td colspan="3" class="text-center py-4 text-gray-500">Akses Ditolak: Hanya admin yang dapat melihat daftar pengguna.</td></tr>`;
        emptyUserMessage.classList.add('hidden');
        return;
    }

    try {
        const querySnapshot = await window.getDocs(window.collection(db, USER_ROLES_COLLECTION_PATH)); // Menggunakan window.getDocs dan window.collection
        const usersInFirestore = querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));

        if (usersInFirestore.length === 0) {
            emptyUserMessage.classList.remove('hidden');
        } else {
            emptyUserMessage.classList.add('hidden');
            usersInFirestore.forEach(user => {
                const row = document.createElement('tr');
                const hoverClass = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
                const textClass = isDarkMode ? 'text-gray-200' : 'text-gray-700';
                const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-200';

                row.className = hoverClass;
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ${textClass} ${borderColor}">${user.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm ${textClass} ${borderColor}">${user.role}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${borderColor}">
                        ${(loggedInUser && loggedInUser.uid === user.uid) ? '' : ` <!-- Prevent deleting the currently logged-in user -->
                        ${user.email.toLowerCase() !== 'admin@admin.com' ? ` <!-- Prevent deleting hardcoded admin (contoh, kalau ada admin default) -->
                        <button class="delete-user-btn text-red-600 hover:text-red-900" data-uid="${user.uid}" data-email="${user.email}" title="Hapus Pengguna">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        ` : ''}
                        `}
                    </td>
                `;
                userListBody.appendChild(row);
            });
        }
    } catch (e) {
        console.error("Error fetching user list from Firestore:", e);
        userListBody.innerHTML = `<tr><td colspan="3" class="text-center py-4 text-gray-500">Error memuat daftar pengguna.</td></tr>`;
    }
}

// Deletes a user from Firebase Auth and Firestore.
async function deleteUser(uid, emailToDelete) {
    if (!auth || !db) {
        displayStatus("Error: Firebase tidak diinisialisasi.", "error", addUserStatusMessage);
        return;
    }
    // Hanya admin yang bisa menghapus pengguna
    if (loggedInUser && loggedInUser.role !== 'admin') {
        displayStatus("Akses Ditolak: Hanya admin yang dapat menghapus pengguna.", "error", addUserStatusMessage);
        return;
    }
    // Jangan izinkan admin menghapus dirinya sendiri atau admin@admin.com
    if (loggedInUser && loggedInUser.uid === uid) {
        displayStatus("Tidak dapat menghapus akun Anda sendiri saat ini.", "error", addUserStatusMessage);
        return;
    }
    if (emailToDelete.toLowerCase() === 'admin@admin.com') {
        displayStatus("Tidak dapat menghapus akun admin default.", "error", addUserStatusMessage);
        return;
    }


    const confirmed = await confirmAction(`Apakah Anda yakin ingin menghapus pengguna '${emailToDelete}'?`);
    if (confirmed) {
        try {
            // Hapus dokumen role dari Firestore terlebih dahulu
            await window.deleteDoc(window.doc(db, USER_ROLES_COLLECTION_PATH, uid)); // Menggunakan window.deleteDoc dan window.doc

            // Perhatian: Menghapus pengguna dari Firebase Auth secara langsung di client-side
            // adalah tindakan yang TIDAK DISARANKAN untuk aplikasi produksi karena masalah keamanan.
            // Seharusnya ini dilakukan di server (misalnya, dengan Cloud Functions).
            // Namun, untuk tujuan demo ini, kita akan melakukannya di client.
            // Perlu re-autentikasi admin jika sesi sudah lama
            // const user = auth.currentUser;
            // await user.reauthenticateWithCredential(...)
            // await user.delete();

            // Karena kita tidak bisa menghapus Auth user langsung tanpa otentikasi ulang
            // di client side (dan tidak ada UI untuk itu), kita hanya akan menghapus role-nya dari Firestore
            // dan akan menganggapnya "tidak aktif".
            // Jika user harus benar-benar dihapus, ini butuh Cloud Function.
            displayStatus("Pengguna berhasil dihapus (role dihapus, akun Auth mungkin masih ada).", "success", addUserStatusMessage);
            renderUserList(); // Perbarui daftar pengguna
        } catch (e) {
            console.error("Error deleting user from Firestore:", e);
            displayStatus(`Error menghapus pengguna: ${e.message}.`, "error", addUserStatusMessage);
        }
    } else {
        displayStatus("Penghapusan pengguna dibatalkan.", "info", addUserStatusMessage);
    }
}


// Shows/hides sections within the User Settings modal based on login status and role.
function showUserManagementSection() {
    if (loggedInUser && loggedInUser.role === 'admin') {
        userSettingsLoginSection.classList.add('hidden');
        userManagementSection.classList.remove('hidden');
        renderUserList(); // Render user list when admin section is shown
    } else {
        userSettingsLoginSection.classList.remove('hidden');
        userManagementSection.classList.add('hidden');
        // Clear login fields and messages when showing login section
        userSettingsLoginEmailInput.value = '';
        userSettingsLoginPasswordInput.value = '';
        displayStatus("", "", userSettingsLoginStatusMessage);
    }
}

// Opens the user settings modal.
function openUserSettingsModal() {
    userSettingsModal.classList.remove('hidden');
    adminMenuDropdown.classList.add('hidden');
    showUserManagementSection(); // Determine which section to show
}

// Closes the user settings modal.
function closeUserSettingsModal() {
    userSettingsModal.classList.add('hidden');
    displayStatus("", "", userSettingsLoginStatusMessage);
    displayStatus("", "", addUserStatusMessage);
}

// --- Bluetooth Printer Functions ---

// Updates the printer connection status in the modal and button states.
function updatePrinterConnectionStatus(message, isConnected = false) {
    if (printerStatus) printerStatus.textContent = `Status: ${message}`;
    if (connectPrinterBtn) connectPrinterBtn.disabled = isConnected;
    if (disconnectPrinterBtn) disconnectPrinterBtn.disabled = !isConnected;
    if (testPrintBtn) testPrintBtn.disabled = !isConnected;
}

// Stores the connected printer's ID in Firestore AppState.
async function savePrinterAddress(deviceId) {
    if (!currentUserId) return;
    try {
        // FIX: Hanya update lastConnectedPrinterId di appState pribadi user
        await window.setDoc(window.doc(db, USER_APP_STATE_DOC_PATH(currentUserId)), { lastConnectedPrinterId: deviceId }, { merge: true });
        console.log("Printer ID saved to Firestore AppState:", deviceId);
    } catch (e) {
        console.error("Gagal menyimpan ID printer ke Firestore:", e);
    }
}

// Clears the stored printer ID from Firestore AppState.
async function clearSavedPrinter() {
    if (!currentUserId) return;
    try {
        // FIX: Hanya update lastConnectedPrinterId di appState pribadi user
        await window.updateDoc(window.doc(db, USER_APP_STATE_DOC_PATH(currentUserId)), { lastConnectedPrinterId: null });
        console.log("Printer ID dihapus dari Firestore AppState.");
    } catch (e) {
        console.error("Gagal menghapus ID printer dari Firestore:", e);
    }
}

// Attempts to load and reconnect to a previously saved printer.
async function loadSavedPrinter() {
    if (!currentUserId) {
        console.warn("Tidak dapat memuat printer tersimpan: UID tidak tersedia.");
        updatePrinterConnectionStatus("Silahkan sambungkan printer");
        return;
    }

    try {
        // Ambil ID printer dari Firestore AppState pribadi user
        const appStateDoc = await window.getDoc(window.doc(db, USER_APP_STATE_DOC_PATH(currentUserId))); // Menggunakan window.getDoc dan window.doc
        const savedPrinterId = appStateDoc.exists() ? appStateDoc.data().lastConnectedPrinterId : null;

        if (savedPrinterId) {
            updatePrinterConnectionStatus("Mencoba menghubungkan kembali ke printer terakhir...", false);
            if (!navigator.bluetooth || typeof navigator.bluetooth.getDevices !== 'function') {
                console.warn("navigator.bluetooth.getDevices is not supported in this browser/environment. Auto-reconnect will not work.");
                updatePrinterConnectionStatus("Fitur auto-reconnect printer tidak didukung browser ini. Silahkan hubungkan secara manual.");
                await clearSavedPrinter();
                return;
            }

            const devices = await navigator.bluetooth.getDevices();
            const foundDevice = devices.find(d => d.id === savedPrinterId);

            if (foundDevice) {
                bluetoothPrinterDevice = foundDevice;
                bluetoothPrinterDevice.addEventListener('gattserverdisconnected', onPrinterDisconnected);

                const server = await bluetoothPrinterDevice.gatt.connect();
                const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
                printerCharacteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');

                updatePrinterConnectionStatus(`Printer terhubung kembali: ${bluetoothPrinterDevice.name || bluetoothPrinterDevice.id}`, true);
            } else {
                updatePrinterConnectionStatus("Printer tersimpan tidak ditemukan. Silahkan hubungkan secara manual.");
                await clearSavedPrinter();
            }
        } else {
            updatePrinterConnectionStatus("Silahkan sambungkan printer");
        }
    } catch (error) {
        console.error("Gagal menghubungkan kembali ke printer tersimpan:", error);
        updatePrinterConnectionStatus(`Gagal menghubungkan kembali: ${error.message}`);
        bluetoothPrinterDevice = null;
        printerCharacteristic = null;
        await clearSavedPrinter();
    }
}

async function testPrint() {
    if (!bluetoothPrinterDevice || !printerCharacteristic) {
        updatePrinterConnectionStatus("Printer belum terhubung.");
        return;
    }

    updatePrinterConnectionStatus("Mengirim test print...", true);

    try {
        const text = "=== TEST PRINT ===\n" +
                     "Aplikasi Kasir POS\n" +
                     "Tanggal: " + new Date().toLocaleString() + "\n" +
                     "------------------\n" +
                     "Cetak Berhasil!\n\n\n";

        const encoder = new TextEncoder();
        await printerCharacteristic.writeValue(encoder.encode(text));

        updatePrinterConnectionStatus("Test print berhasil!", true);
    } catch (error) {
        console.error("Test print error:", error);
        updatePrinterConnectionStatus(`Test print error: ${error.message}`);
    }
}

// --- Price Calculator Functions ---
function openPriceCalculatorModal() {
    priceCalculatorModal.classList.remove('hidden');
    adminMenuDropdown.classList.add('hidden');
    priceCalcProductCodeInput.value = '';
    priceCalcProductNameInput.value = '';
    priceCalcModalInput.value = '0';
    priceCalcMarginPercentInput.value = '0';
    priceCalcTaxPercentInput.value = '0';
    priceCalcDiscountPercentInput.value = '0';
    priceCalcSellingPriceInput.value = 'Rp 0';
    priceCalcProfitInput.value = 'Rp 0';
    priceCalcStatusMessage.classList.add('hidden');
}

function closePriceCalculatorModal() {
    priceCalculatorModal.classList.add('hidden');
    priceCalcStatusMessage.classList.add('hidden');
}

function calculateSellingPriceAndProfit() {
    const modal = parseFloat(priceCalcModalInput.value) || 0;
    const marginPercent = parseFloat(priceCalcMarginPercentInput.value) || 0;
    const taxPercent = parseFloat(priceCalcTaxPercentInput.value) || 0;
    const discountPercent = parseFloat(priceCalcDiscountPercentInput.value) || 0;
    const productCode = priceCalcProductCodeInput.value.trim();

    priceCalcStatusMessage.classList.add('hidden');

    if (isNaN(modal) || modal < 0 || isNaN(marginPercent) || marginPercent < 0 ||
        isNaN(taxPercent) || taxPercent < 0 || isNaN(discountPercent) || discountPercent < 0) {
        displayStatus("Error: Semua input angka harus valid dan tidak negatif.", "error", priceCalcStatusMessage);
        priceCalcSellingPriceInput.value = 'Rp 0';
        priceCalcProfitInput.value = 'Rp 0';
        return;
    }

    if (productCode) {
        const isCodeRegistered = products.some(p => p.id.toLowerCase() === productCode.toLowerCase());
        if (isCodeRegistered) {
            displayStatus(`Peringatan: Kode Barang '${productCode}' sudah terdaftar pada produk yang ada.`, "warning", priceCalcStatusMessage);
        }
    }

    const sellingPrice = modal * (1 + marginPercent / 100);

    const marginAmount = modal * (marginPercent / 100);
    const taxAmountOnModal = modal * (taxPercent / 100);
    const discountAmountOnModal = modal * (discountPercent / 100);

    const profit = marginAmount - taxAmountOnModal - discountAmountOnModal;

    priceCalcSellingPriceInput.value = `Rp ${sellingPrice.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    priceCalcProfitInput.value = `Rp ${profit.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// --- QR Scanner Functions ---
// Initializes and starts the QR scanner
async function startQrScanner() {
    if (!reader) {
        console.error("Elemen QR Reader tidak ditemukan.");
        displayStatus("Error: Elemen pembaca QR tidak ditemukan.", "error", scannerResult);
        return;
    }

    await stopQrScanner();

    html5QrCodeScanner = new Html5Qrcode("reader");

    const qrCodeConfig = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCodeScanner.start({ facingMode: "environment" }, qrCodeConfig,
        (decodedText, decodedResult) => {
            console.log(`QR/Barcode terdeteksi: ${decodedText}`);
            scannerResult.textContent = `Produk terdeteksi: ${decodedText}`;
            handleScannedProduct(decodedText);
            playScanSuccessSound();
        },
        (errorMessage) => {
        })
    .then(() => {
        displayStatus("Scanner dimulai. Arahkan kamera ke QR/Barcode.", "info", scannerResult);
        startScannerBtn.disabled = true;
        stopScannerBtn.disabled = false;
    })
    .catch((err) => {
        console.error(`Error memulai QR scanner: ${err}`);
        displayStatus(`Error: Tidak dapat memulai scanner. Pastikan kamera tersedia.`, "error", scannerResult);
        startScannerBtn.disabled = false;
        stopScannerBtn.disabled = true;
    });
}

// Stops the QR scanner
async function stopQrScanner() {
    if (html5QrCodeScanner && typeof html5QrCodeScanner.isScanning === "function" && html5QrCodeScanner.isScanning()) {
        try {
            await html5QrCodeScanner.stop();
            displayStatus("Scanner dihentikan.", "info", scannerResult);
            startScannerBtn.disabled = false;
            stopScannerBtn.disabled = true;
        } catch (err) {
            console.error(`Error menghentikan scanner: ${err}`);
            displayStatus(`Error menghentikan scanner: ${err.message}`, "error", scannerResult);
        }
    } else {
        displayStatus("Scanner tidak berjalan.", "info", scannerResult);
        startScannerBtn.disabled = false;
        stopScannerBtn.disabled = true;
    }
}

// Handles the scanned product code
function handleScannedProduct(code) {
    const product = products.find(p => p.id.toLowerCase() === code.toLowerCase());
    if (product) {
        if (product.stock !== undefined && product.stock <= 0) {
            displayStatus(`Error: Stok ${product.name} habis.`, "error", scannerResult);
            return;
        }
        addProductToTransaction(product.id, product.name, product.price, 1);
        displayStatus(`Produk "${product.name}" ditambahkan.`, "success", scannerResult);
        playScanSuccessSound();
    } else {
        displayStatus(`Produk dengan kode "${code}" tidak ditemukan.`, "error", scannerResult);
    }
}

// Function to populate the product code datalist for suggestions
function renderProductDatalist() {
    if (!productCodeDatalist) return;
    productCodeDatalist.innerHTML = '';

    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        productCodeDatalist.appendChild(option);
    });
}


// --- Event Listeners (Moved inside DOMContentLoaded) ---
document.addEventListener('DOMContentLoaded', (event) => {
    // Assign DOM elements once the DOM is ready
    loginScreen = document.getElementById('login-screen');
    mainAppContainer = document.getElementById('main-app-container');

    loginScreenEmailInput = document.getElementById('login-email-input'); // Diubah ke email
    loginScreenPasswordInput = document.getElementById('login-password-input');
    loginScreenBtn = document.getElementById('login-screen-btn');
    loginScreenMessage = document.getElementById('login-screen-message');


    itemList = document.getElementById('itemList');
    totalAmountInput = document.getElementById('totalAmount');
    discountAmountInput = document.getElementById('discountAmount');
    paymentAmountInput = document.getElementById('paymentAmount');
    paymentMethodSelect = document.getElementById('paymentMethod');
    changeAmountHeader = document.getElementById('changeAmountHeader');
    statusElement = document.getElementById('status');
    newTransactionButton = document.getElementById('newTransaction');
    printReceiptButton = document.getElementById('printReceipt');
    processOnlyPaymentButton = document.getElementById('processOnlyPayment');
    noItemsMessage = document.getElementById('noItemsMessage');
    headerDateTime = document.getElementById('headerDateTime');
    headerDailyRevenue = document.getElementById('headerDailyRevenue');
    headerDailyRevenueAmountContainer = document.getElementById('headerDailyRevenueAmountContainer');
    toggleDailyRevenueVisibilityButton = document.getElementById('toggleDailyRevenueVisibility');
    eyeIcon = document.getElementById('eyeIcon');
    eyeSlashIcon = document.getElementById('eyeSlashIcon');
    cashierDisplay = document.getElementById('cashierDisplay');
    cashierRole = document.getElementById('cashierRole');
    logoutButton = document.getElementById('logoutButton');
    darkModeToggle = document.getElementById('darkModeToggle');

    // Monthly Financial Bar elements
    monthlyFinancialBarContainer = document.getElementById('monthly-financial-bar-container');
    monthlyProfitBar = document.getElementById('monthly-profit-bar');
    monthlyExpenseBar = document.getElementById('monthly-expense-bar');


    // Registered product input elements
    productCodeInput = document.getElementById('product-code');
    productNameInput = document.getElementById('product-name');
    priceInput = document.getElementById('price');
    quantityInput = document.getElementById('quantity');
    addRegisteredItemButton = document.getElementById('add-to-cart-btn-registered');
    searchProductByCodeBtn = document.getElementById('searchProductByCodeBtn');
    productCodeDatalist = document.getElementById('product-code-datalist');

    // Custom product input elements
    customProductCodeInput = document.getElementById('custom-product-code');
    customProductNameInput = document.getElementById('custom-product-name');
    customProductPriceInput = document.getElementById('custom-price');
    customProductQtyInput = document.getElementById('custom-quantity');
    addCustomItemButton = document.getElementById('add-to-cart-btn-custom');

    showRegisteredProductsButton = document.getElementById('showRegisteredProducts');
    showCustomProductsButton = document.getElementById('showCustomProducts');
    showScannerProductsButton = document.getElementById('showScannerProducts');
    customProductSection = document.getElementById('customProductSection');
    registeredProductSection = document.getElementById('registeredProductSection');
    scannerSection = document.getElementById('scannerSection');
    reader = document.getElementById('reader');
    scannerResult = document.getElementById('scanner-result');
    startScannerBtn = document.getElementById('startScannerBtn');
    stopScannerBtn = document.getElementById('stopScannerBtn');

    // Admin menu elements
    adminMenuButton = document.getElementById('adminMenuButton');
    adminMenuDropdown = document.getElementById('admin-menu-dropdown');
    openStoreProductsModalBtn = document.getElementById('open-store-products-modal-btn');
    openAddProductModalBtn = document.getElementById('open-add-product-modal-btn');
    openFinancialReportModalBtn = document.getElementById('open-financial-report-modal-btn');
    openExpensesModalBtn = document.getElementById('open-expenses-modal-btn');
    openUserSettingsModalBtn = document.getElementById('open-user-settings-modal-btn');
    openPriceCalculatorModalBtn = document.getElementById('open-price-calculator-modal-btn');
    exportProductsBtn = document.getElementById('export-products-btn');
    importProductsFileInput = document.getElementById('import-products-file-input');
    importProductsBtn = document.getElementById('import-products-btn');
    exportDataBtn = document.getElementById('export-data-btn');
    importFileInput = document.getElementById('import-file-input');
    importDataBtn = document.getElementById('import-data-btn');
    resetAllDataBtn = document.getElementById('reset-all-data-btn');

    // Store Products Modal elements
    storeProductsModal = document.getElementById('store-products-modal');
    closeStoreProductsModalBtn = document.getElementById('close-store-products-modal');
    storeProductsTableBody = document.getElementById('store-products-table-body');
    searchStoreProductsInput = document.getElementById('search-store-products-input');
    storeProductsTableContainer = document.getElementById('store-products-table-container');
    editProductForm = document.getElementById('edit-product-form');
    editProductIdInput = document.getElementById('edit-product-id-input');
    editProductNameInput = document.getElementById('edit-product-name-input');
    editProductCostInput = document.getElementById('edit-product-cost-input');
    editProductPriceInput = document.getElementById('edit-product-price-input');
    editProductStockInput = document.getElementById('edit-product-stock-input');
    saveProductEditBtn = document.getElementById('save-product-edit-btn');
    cancelProductEditBtn = document.getElementById('cancel-product-edit-btn');

    // Add Product Modal elements
    addProductModal = document.getElementById('add-product-modal');
    closeAddProductModalBtn = document.getElementById('close-add-product-modal');
    addProductCodeInput = document.getElementById('add-product-code');
    addProductNameInput = document.getElementById('add-product-name');
    addProductCostInput = document.getElementById('add-product-cost');
    addProductPriceInput = document.getElementById('add-product-price');
    addProductProfitInput = document.getElementById('add-product-profit');
    addProductStockInput = document.getElementById('add-product-stock');
    saveNewProductBtn = document.getElementById('save-new-product-btn');
    cancelAddProductBtn = document.getElementById('cancel-add-product-btn');

    // Expenses Modal elements
    expensesModal = document.getElementById('expenses-modal');
    closeExpensesModalBtn = document.getElementById('close-expenses-modal');
    expenseDateInput = document.getElementById('expense-date');
    expenseDescriptionInput = document.getElementById('expense-description');
    expenseAmountInput = document.getElementById('expense-amount');
    addExpenseBtn = document.getElementById('add-expense-btn');
    expensesListBody = document.getElementById('expenses-list-body');
    emptyExpensesMessage = document.getElementById('empty-expenses-message');
    expenseStatusMessage = document.getElementById('expense-status-message');
    expenseSearchInput = document.getElementById('expense-search-input');
    expenseFilterStartDate = document.getElementById('expense-filter-start-date');
    expenseFilterEndDate = document.getElementById('expense-filter-end-date');
    applyExpenseFilterBtn = document.getElementById('apply-expense-filter-btn');
    clearExpenseFilterBtn = document.getElementById('clear-expense-filter-btn');
    totalExpensesDisplayModal = document.getElementById('total-expenses-display-modal');


    // Financial Report Modal elements
    financialReportModal = document.getElementById('financial-report-modal');
    closeFinancialReportModalBtn = document.getElementById('close-financial-report-modal-btn');
    reportStartDateInput = document.getElementById('report-start-date');
    reportEndDateInput = document.getElementById('report-end-date');
    applyFinancialFilterBtn = document.getElementById('apply-financial-filter-btn');
    clearFinancialFilterBtn = document.getElementById('clear-financial-filter-btn');
    totalRevenueDisplay = document.getElementById('total-revenue-display');
    totalExpensesDisplay = document.getElementById('total-expenses-display');
    grossProfitDisplay = document.getElementById('gross-profit-display');
    netProfitDisplay = document.getElementById('net-profit-display');
    financialChartCanvas = document.getElementById('financial-chart');
    financialReportMessageBox = document.getElementById('financial-report-message-box');

    // Transaction History Modal elements
    openTransactionHistoryBtn = document.getElementById('open-transaction-history-btn');
    transactionHistoryModal = document.getElementById('transaction-history-modal');
    closeTransactionHistoryModalBtn = document.getElementById('close-transaction-history-modal');
    transactionHistoryTableBody = document.getElementById('transaction-history-table-body');
    historyStartDateInput = document.getElementById('history-start-date');
    historyEndDateInput = document.getElementById('history-end-date');
    applyHistoryFilterBtn = document.getElementById('apply-history-filter-btn');
    clearHistoryFilterBtn = document.getElementById('clear-history-filter-btn');
    transactionHistoryMessageBox = document.getElementById('transaction-history-message-box');
    transactionDetailSection = document.getElementById('transaction-detail-section');
    detailTransactionId = document.getElementById('detail-transaction-id');
    detailTransactionDate = document.getElementById('detail-transaction-date');
    detailCashier = document.getElementById('detail-cashier');
    detailSubtotal = document.getElementById('detail-subtotal');
    detailDiscount = document.getElementById('detail-discount');
    detailTotalAmount = document.getElementById('detail-total-amount');
    detailPaymentAmount = document.getElementById('detail-payment-amount');
    detailChangeAmount = document.getElementById('detail-change-amount');
    detailItemList = document.getElementById('detail-item-list');
    closeTransactionDetailBtn = document.getElementById('close-transaction-detail-btn');
    reprintReceiptBtn = document.getElementById('reprint-receipt-btn');
    historyFilterControls = document.getElementById('history-filter-controls');
    totalTransactionsAmount = document.getElementById('total-transactions-amount');

    // Confirmation Modal elements
    confirmationModal = document.getElementById('confirmation-modal');
    confirmationMessage = document.getElementById('confirmation-message');
    confirmOkBtn = document.getElementById('confirm-ok-btn');
    confirmCancelBtn = document.getElementById('confirm-cancel-btn');

    // User Settings Modal
    userSettingsModal = document.getElementById('user-settings-modal');
    closeUserSettingsModalBtn = document.getElementById('close-user-settings-modal');
    userSettingsLoginSection = document.getElementById('user-settings-login-section');
    userSettingsLoginEmailInput = document.getElementById('user-settings-login-email'); // Diubah ke email
    userSettingsLoginPasswordInput = document.getElementById('user-settings-login-password');
    userSettingsLoginButton = document.getElementById('user-settings-login-btn');
    userSettingsLoginStatusMessage = document.getElementById('user-settings-login-status-message');
    userManagementSection = document.getElementById('user-management-section');
    newUseEmailInput = document.getElementById('new-user-email'); // Diubah ke email
    newUserPasswordInput = document.getElementById('new-user-password');
    newUserRoleSelect = document.getElementById('new-user-role');
    addUserButton = document.getElementById('add-user-btn');
    addUserStatusMessage = document.getElementById('add-user-status-message');
    userListBody = document.getElementById('user-list-body');
    emptyUserMessage = document.getElementById('empty-user-message');

    // Printer Settings Modal
    openPrinterSettingsBtn = document.getElementById('open-printer-settings-btn');
    printerSettingsModal = document.getElementById('printer-settings-modal');
    closePrinterSettingsModalBtn = document.getElementById('close-printer-settings-modal');
    printerStatus = document.getElementById('printer-status');
    connectPrinterBtn = document.getElementById('connect-printer-btn');
    disconnectPrinterBtn = document.getElementById('disconnect-printer-btn');
    testPrintBtn = document.getElementById('test-print-btn');

    // Price Calculator Modal
    priceCalculatorModal = document.getElementById('price-calculator-modal');
    closePriceCalculatorModalBtn = document.getElementById('close-price-calculator-modal');
    priceCalcProductCodeInput = document.getElementById('price-calc-product-code');
    copyProductCodeBtn = document.getElementById('copy-product-code-btn');
    priceCalcProductNameInput = document.getElementById('price-calc-product-name');
    priceCalcModalInput = document.getElementById('price-calc-modal');
    priceCalcMarginPercentInput = document.getElementById('price-calc-margin-percent');
    priceCalcTaxPercentInput = document.getElementById('price-calc-tax-percent');
    priceCalcDiscountPercentInput = document.getElementById('price-calc-discount-percent');
    calculatePriceBtn = document.getElementById('calculate-price-btn');
    priceCalcSellingPriceInput = document.getElementById('price-calc-selling-price');
    copySellingPriceBtn = document.getElementById('copy-selling-price-btn');
    priceCalcProfitInput = document.getElementById('price-calc-profit');
    priceCalcStatusMessage = document.getElementById('price-calc-status-message');

    // Nominal Quick Pay Buttons
    nominalButtonsContainer = document.getElementById('nominal-buttons-container');
    nominalButtons = document.querySelectorAll('.nominal-btn');

    // Audio elements for sounds
    scanSuccessSound = document.getElementById('scanSuccessSound');
    transactionSuccessSound = document.getElementById('transactionSuccessSound');

    // Reset data modal elements
    resetDataModal = document.getElementById('reset-data-modal');
    resetPasswordInput = document.getElementById('reset-password-input');
    resetDataConfirmBtn = document.getElementById('reset-data-confirm-btn');
    resetDataCancelBtn = document.getElementById('reset-data-cancel-btn');
    resetDataMessage = document.getElementById('reset-data-message');


    // --- Chart.js library (for financial chart placeholder) ---
    const chartJsScript = document.createElement('script');
    chartJsScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    chartJsScript.onload = () => {
        renderFinancialReportChart([]);
    };
    document.head.appendChild(chartJsScript);

    // --- Inisialisasi Firebase ---
    initializeFirebase();

    // Event listener for product code input (registered products)
    if (productCodeInput) {
        productCodeInput.addEventListener('input', function() {
            const code = this.value.trim();
            const foundProduct = products.find(p => p.id.toLowerCase() === code.toLowerCase());

            if (foundProduct) {
                productNameInput.value = foundProduct.name;
                priceInput.value = foundProduct.price.toLocaleString('id-ID');
                if (code.toLowerCase() === foundProduct.id.toLowerCase()) {
                    if (foundProduct.stock !== undefined && foundProduct.stock <= 0) {
                        displayStatus(`Error: Stok ${foundProduct.name} habis. Tidak bisa menjual produk ini.`, "error");
                        productCodeInput.value = '';
                        productNameInput.value = '';
                        priceInput.value = '0';
                        quantityInput.value = '1';
                        productCodeInput.focus();
                        return;
                    }
                    let qty = parseInt(quantityInput.value);
                    if (isNaN(qty) || qty <= 0) qty = 1;

                    const currentQtyInCart = currentTransactionItems.find(item => item.productId === foundProduct.id)?.qty || 0;
                    if (foundProduct.stock !== undefined && (currentQtyInCart + qty) > foundProduct.stock) {
                        displayStatus(`Error: Stok ${foundProduct.name} tidak cukup. Stok tersedia: ${foundProduct.stock}`, "error");
                        return;
                    }

                    addProductToTransaction(foundProduct.id, foundProduct.name, foundProduct.price, qty);
                    displayStatus(`Produk "${foundProduct.name}" ditambahkan.`, "success");
                    productCodeInput.value = '';
                    productNameInput.value = '';
                    priceInput.value = '0';
                    quantityInput.value = '1';
                    productCodeInput.focus();
                }
            } else {
                const anyProductMatchesPrefix = products.some(p => p.id.toLowerCase().startsWith(code.toLowerCase()));
                if (!anyProductMatchesPrefix && code !== '') {
                    productNameInput.value = '';
                    priceInput.value = '0';
                    displayStatus("", "");
                } else if (code === '') {
                     productNameInput.value = '';
                    priceInput.value = '0';
                    displayStatus("", "");
                }
            }
        });
    }

    if (productNameInput) {
        productNameInput.addEventListener('input', function() {
            searchProductAndPopulateByName();
        });
    }

    if (searchProductByCodeBtn) {
        searchProductByCodeBtn.addEventListener('click', () => {
            const code = productCodeInput.value.trim();
            const foundProduct = products.find(p => p.id.toLowerCase() === code.toLowerCase());
            if (foundProduct) {
                if (foundProduct.stock !== undefined && foundProduct.stock <= 0) {
                    displayStatus(`Error: Stok ${foundProduct.name} habis. Tidak bisa menjual produk ini.`, "error");
                    return;
                }
                let qty = parseInt(quantityInput.value);
                if (isNaN(qty) || qty <= 0) qty = 1;

                const currentQtyInCart = currentTransactionItems.find(item => item.productId === foundProduct.id)?.qty || 0;
                if (foundProduct.stock !== undefined && (currentQtyInCart + qty) > foundProduct.stock) {
                    displayStatus(`Error: Stok ${foundProduct.name} tidak cukup. Stok tersedia: ${foundProduct.stock}`, "error");
                    return;
                }
                addProductToTransaction(foundProduct.id, foundProduct.name, foundProduct.price, qty);
                displayStatus(`Produk "${foundProduct.name}" ditambahkan.`, "success");
                productCodeInput.value = '';
                productNameInput.value = '';
                priceInput.value = '0';
                quantityInput.value = '1';
                productCodeInput.focus();
            } else {
                displayStatus(`Produk dengan kode "${code}" tidak ditemukan.`, "error");
            }
        });
    }

    function searchProductAndPopulateByName() {
        const name = productNameInput.value.trim();
        const foundProduct = products.find(p => p.name.toLowerCase().includes(name.toLowerCase()));

        if (foundProduct) {
            productCodeInput.value = foundProduct.id;
            priceInput.value = foundProduct.price.toLocaleString('id-ID');
            displayStatus(`Produk "${foundProduct.name}" ditemukan.`, "info");
            quantityInput.focus();
        } else {
            productCodeInput.value = '';
            priceInput.value = '0';
            displayStatus("", "");
        }
    }


    if (addRegisteredItemButton) {
        addRegisteredItemButton.addEventListener('click', function() {
            const id = productCodeInput.value.trim();
            const name = productNameInput.value.trim();
            const price = parseFloat(priceInput.value.replace(/[^0-9,-]+/g, "").replace(",", ".")) || 0;
            let qty = parseInt(quantityInput.value);
            if (isNaN(qty) || qty <= 0) qty = 1;

            const product = products.find(p => p.id === id);

            if (!id || !name || price <= 0) {
                displayStatus("Error: Pastikan Kode Produk terisi, Nama Produk & Harga muncul untuk Produk Terdaftar.", "error");
                return;
            }
            if (isNaN(qty) || qty <= 0) {
                displayStatus("Error: Jumlah valid diperlukan untuk Produk Terdaftar.", "error");
                return;
            }

            if (product && product.stock !== undefined && product.stock <= 0) {
                displayStatus(`Error: Stok ${product.name} habis. Tidak bisa menjual produk ini.`, "error");
                return;
            }

            if (product && product.stock !== undefined && product.stock < qty) {
                displayStatus(`Error: Stok ${product.name} tidak cukup. Stok tersedia: ${product.stock}`, "error");
                return;
            }

            addProductToTransaction(id, name, price, qty);
            productCodeInput.value = '';
            productNameInput.value = '';
            priceInput.value = '0';
            quantityInput.value = '1';
            displayStatus("", "");
        });
    }

    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('item-qty-input')) {
            const index = e.target.dataset.itemIndex;
            const oldQty = currentTransactionItems[index].qty;
            let newQty = parseInt(e.target.value);

            if (isNaN(newQty) || newQty < 0) {
                newQty = 0;
                e.target.value = 0;
            }

            const itemProductId = currentTransactionItems[index].productId;
            if (!itemProductId.startsWith('custom-')) {
                const product = products.find(p => p.id === itemProductId);
                if (product && product.stock !== undefined) {
                    const quantityDifference = newQty - oldQty;

                    if (quantityDifference > 0 && product.stock < (currentTransactionItems[index].qty + quantityDifference)) {
                        displayStatus(`Error: Stok ${product.name} tidak cukup. Stok tersedia: ${product.stock}`, "error");
                        e.target.value = oldQty;
                        return;
                    }
                }
            }

            currentTransactionItems[index].qty = newQty;

            if (newQty === 0) {
                currentTransactionItems.splice(index, 1);
            }
            renderTransactionItems();
        }

        if (e.target.id === 'paymentAmount') {
            calculateChange();
        }

        if (e.target.id === 'discountAmount') {
            renderTransactionItems();
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('removeItem')) {
            const index = e.target.dataset.itemIndex;
            currentTransactionItems.splice(index, 1);
            renderTransactionItems();
        }
    });

    if (newTransactionButton) newTransactionButton.addEventListener('click', startNewTransaction);

    if (showRegisteredProductsButton) showRegisteredProductsButton.addEventListener('click', () => showSection('registered'));
    if (showCustomProductsButton) showCustomProductsButton.addEventListener('click', () => showSection('custom'));
    if (showScannerProductsButton) showScannerProductsButton.addEventListener('click', () => showSection('scanner'));

    if (addCustomItemButton) addCustomItemButton.addEventListener('click', function() {
        const name = customProductNameInput.value.trim();
        const price = parseFloat(customProductPriceInput.value);
        let qty = parseInt(customProductQtyInput.value);
        const code = customProductCodeInput.value.trim();

         if (!name) {
            displayStatus("Error: Nama produk kustom wajib diisi!", "error");
            return;
        }
        if (isNaN(price) || price < 0) {
            displayStatus("Error: Harga jual kustom tidak valid!", "error");
            return;
        }
        if (isNaN(qty) || qty <= 0) {
            displayStatus("Error: Jumlah produk kustom tidak valid!", "error");
            return;
        }

        if (code) {
            const isCodeRegistered = products.some(p => p.id.toLowerCase() === code.toLowerCase());
            if (isCodeRegistered) {
                displayStatus("Error: Kode produk kustom tidak boleh sama dengan kode produk terdaftar.", "error");
                return;
            }
        }

        addProductToTransaction(code || 'custom', name, price, qty, true);
        if (customProductCodeInput) customProductCodeInput.value = '';
        if (customProductNameInput) customProductNameInput.value = '';
        if (customProductPriceInput) customProductPriceInput.value = '0';
        if (customProductQtyInput) customProductQtyInput.value = '1';
        displayStatus("", "");
    });

    if (printReceiptButton) printReceiptButton.addEventListener('click', processAndPrintTransaction);

    if (processOnlyPaymentButton) {
        processOnlyPaymentButton.addEventListener('click', async function() {
            const transactionRecord = await createTransactionObjectAndDecrementStock();
            if (transactionRecord) {
                await commitTransactionData(transactionRecord);
            }
        });
    }

    // --- Admin Menu Dropdown Toggle ---
    if (adminMenuButton) {
        adminMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (adminMenuDropdown) {
                adminMenuDropdown.classList.toggle('hidden');
            } else {
                console.error('Admin menu dropdown element is null inside click handler!');
            }
        });

        document.addEventListener('click', (e) => {
            if (adminMenuDropdown && !adminMenuDropdown.contains(e.target) && !adminMenuButton.contains(e.target)) {
                adminMenuDropdown.classList.add('hidden');
            }
        });
    }

    // --- Store Products Modal Event Listeners ---
    if (openStoreProductsModalBtn) {
        openStoreProductsModalBtn.addEventListener('click', () => {
            if (loggedInUser && loggedInUser.role === 'admin') {
                storeProductsModal.classList.remove('hidden');
                renderStoreProducts();
                adminMenuDropdown.classList.add('hidden');
            } else {
                displayStatus("Akses Ditolak: Anda harus login sebagai Admin untuk melihat Produk Toko.", "error");
                adminMenuDropdown.classList.add('hidden');
            }
        });
    }
    if (closeStoreProductsModalBtn) {
        closeStoreProductsModalBtn.addEventListener('click', closeStoreProductsModal);
    }
    if (storeProductsTableBody) {
        storeProductsTableBody.addEventListener('click', (e) => {
            if (e.target.closest('.edit-product-btn')) {
                const productId = e.target.closest('.edit-product-btn').dataset.productId;
                editProduct(productId);
            } else if (e.target.closest('.delete-product-btn')) {
                const productId = e.target.closest('.delete-product-btn').dataset.productId;
                deleteProduct(productId);
            }
        });
    }
    if (searchStoreProductsInput) {
        searchStoreProductsInput.addEventListener('input', (e) => {
            renderStoreProducts(e.target.value);
        });
    }

    if (saveProductEditBtn) {
        saveProductEditBtn.addEventListener('click', saveProductEdit);
    }

    if (cancelProductEditBtn) {
        cancelProductEditBtn.addEventListener('click', () => {
            editProductForm.classList.add('hidden');
            storeProductsTableContainer.classList.remove('hidden');
            searchStoreProductsInput.classList.remove('hidden');
            displayStatus("", "");
        });
    }


    // --- Add New Product Modal Event Listeners ---
    if (openAddProductModalBtn) {
        openAddProductModalBtn.addEventListener('click', () => {
            if (loggedInUser && loggedInUser.role === 'admin') {
                addProductModal.classList.remove('hidden');
                adminMenuDropdown.classList.add('hidden');
                calculateProfit();
            } else {
                displayStatus("Akses Ditolak: Anda harus login sebagai Admin untuk menambah Produk Baru.", "error");
                adminMenuDropdown.classList.add('hidden');
            }
        });
    }
    if (closeAddProductModalBtn) {
        closeAddProductModalBtn.addEventListener('click', closeAddProductModal);
    }
    if (addProductCostInput) {
        addProductCostInput.addEventListener('input', calculateProfit);
    }
    if (addProductPriceInput) {
        addProductPriceInput.addEventListener('input', calculateProfit);
    }
    if (saveNewProductBtn) {
        saveNewProductBtn.addEventListener('click', addNewProduct);
    }
    if (cancelAddProductBtn) {
        cancelAddProductBtn.addEventListener('click', closeAddProductModal);
    }

    // --- Expenses Modal Event Listeners ---
    if (openExpensesModalBtn) {
        openExpensesModalBtn.addEventListener('click', () => {
             // Admin bisa melihat semua pengeluaran, kasir juga bisa melihat pengeluaran, tapi hanya admin yang bisa hapus
            if (loggedInUser) { // Semua user bisa melihat pengeluaran
                expensesModal.classList.remove('hidden');
                adminMenuDropdown.classList.add('hidden');
                expenseDateInput.value = new Date().toISOString().slice(0, 10);
                expenseSearchInput.value = '';
                expenseFilterStartDate.value = '';
                expenseFilterEndDate.value = '';
                renderExpenses();
            } else {
                displayStatus("Akses Ditolak: Anda harus login untuk melihat Pengeluaran.", "error");
                adminMenuDropdown.classList.add('hidden');
            }
        });
    }
    if (closeExpensesModalBtn) {
        closeExpensesModalBtn.addEventListener('click', closeExpensesModal);
    }
    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', addExpense);
    }
    if (expensesListBody) {
        expensesListBody.addEventListener('click', (e) => {
            if (e.target.closest('.delete-expense-btn')) {
                const expenseId = e.target.closest('.delete-expense-btn').dataset.expenseId;
                deleteExpense(expenseId); // Periksa role di dalam deleteExpense
            }
        });
    }
    if (expenseSearchInput) {
        expenseSearchInput.addEventListener('input', renderExpenses);
    }
    if (applyExpenseFilterBtn) {
        applyExpenseFilterBtn.addEventListener('click', renderExpenses);
    }
    if (clearExpenseFilterBtn) {
        clearExpenseFilterBtn.addEventListener('click', () => {
            expenseFilterStartDate.value = '';
            expenseFilterEndDate.value = '';
            renderExpenses();
        });
    }


    // --- Financial Report Modal Event Listeners ---
    if (openFinancialReportModalBtn) {
        openFinancialReportModalBtn.addEventListener('click', () => {
            if (loggedInUser && loggedInUser.role === 'admin') {
                financialReportModal.classList.remove('hidden');
                adminMenuDropdown.classList.add('hidden');
                calculateFinancialReport();
            } else {
                displayStatus("Akses Ditolak: Anda harus login sebagai Admin untuk melihat Laporan Keuangan.", "error");
                adminMenuDropdown.classList.add('hidden');
            }
        });
    }
    if (closeFinancialReportModalBtn) {
        closeFinancialReportModalBtn.addEventListener('click', () => {
            financialReportModal.classList.add('hidden');
            if (financialReportMessageBox) {
                financialReportMessageBox.classList.add('hidden');
                financialReportMessageBox.textContent = '';
            }
            displayStatus("", "");
        });
    }
    if (applyFinancialFilterBtn) {
        applyFinancialFilterBtn.addEventListener('click', calculateFinancialReport);
    }
    if (clearFinancialFilterBtn) {
        clearFinancialFilterBtn.addEventListener('click', () => {
            reportStartDateInput.value = '';
            reportEndDateInput.value = '';
            calculateFinancialReport();
        });
    }

    // --- Transaction History Functions ---
    if (openTransactionHistoryBtn) {
        openTransactionHistoryBtn.addEventListener('click', () => {
            if (loggedInUser) { // Semua user bisa melihat history transaksi
                transactionHistoryModal.classList.remove('hidden');
                transactionDetailSection.classList.add('hidden');
                if (transactionHistoryTableBody && transactionHistoryTableBody.parentElement) {
                    transactionHistoryTableBody.parentElement.classList.remove('hidden');
                }
                if (historyFilterControls) {
                    historyFilterControls.classList.remove('hidden');
                }
                totalTransactionsAmount.parentElement.classList.remove('hidden');
                historyStartDateInput.value = '';
                historyEndDateInput.value = '';
                renderTransactionHistory();
            } else {
                displayStatus("Akses Ditolak: Anda harus login untuk melihat Riwayat Transaksi.", "error");
            }
        });
    }
    if (closeTransactionHistoryModalBtn) {
        closeTransactionHistoryModalBtn.addEventListener('click', () => {
            transactionHistoryModal.classList.add('hidden');
            displayStatus("", "");
        });
    }
    if (applyHistoryFilterBtn) {
        applyHistoryFilterBtn.addEventListener('click', () => {
            renderTransactionHistory(historyStartDateInput.value, historyEndDateInput.value);
        });
    }
    if (clearHistoryFilterBtn) {
        clearHistoryFilterBtn.addEventListener('click', () => {
            historyStartDateInput.value = '';
            historyEndDateInput.value = '';
            renderTransactionHistory();
        });
    }
    if (transactionHistoryTableBody) {
        transactionHistoryTableBody.addEventListener('click', (e) => {
            if (e.target.closest('.view-detail-btn')) {
                const transactionId = e.target.closest('.view-detail-btn').dataset.transactionId;
                viewTransactionDetails(transactionId);
            } else if (e.target.closest('.delete-transaction-btn')) {
                const transactionId = e.target.closest('.delete-transaction-btn').dataset.transactionId;
                deleteTransaction(transactionId); // Periksa role di dalam deleteTransaction
            }
        });
    }
    if (closeTransactionDetailBtn) {
        closeTransactionDetailBtn.addEventListener('click', closeTransactionDetails);
    }
    if (reprintReceiptBtn) {
        reprintReceiptBtn.addEventListener('click', () => {
            const transactionId = reprintReceiptBtn.dataset.transactionId;
            if (transactionId) {
                reprintTransactionReceipt(transactionId);
            } else {
                displayStatus("Error: Tidak ada ID transaksi untuk dicetak ulang.", "error");
            }
        });
    }


    // --- Data Import/Export & Reset Event Listeners ---
    if (exportProductsBtn) {
        exportProductsBtn.addEventListener('click', exportProducts);
    }
    if (importProductsBtn) {
        importProductsBtn.addEventListener('click', () => {
            importProductsFileInput.click();
        });
    }
    if (importProductsFileInput) {
        importProductsFileInput.addEventListener('change', importProducts);
    }

    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', exportAllData);
    }
    if (importDataBtn) {
        importDataBtn.addEventListener('click', () => {
            importFileInput.click();
        });
    }
    if (importFileInput) {
        importFileInput.addEventListener('change', importAllData);
    }
    if (resetAllDataBtn) {
        resetAllDataBtn.addEventListener('click', openResetDataConfirmation);
    }

    // --- Confirmation Modal Event Listeners --
    if (confirmOkBtn) {
        confirmOkBtn.addEventListener('click', () => {
            confirmationModal.classList.add('hidden');
            if (confirmPromiseResolve) confirmPromiseResolve(true);
        });
    }
    if (confirmCancelBtn) {
        confirmCancelBtn.addEventListener('click', () => {
            confirmationModal.classList.add('hidden');
            if (confirmPromiseResolve) confirmPromiseResolve(false);
        });
    }

    // New: Reset Data Modal Event Listeners
    if (resetDataConfirmBtn) {
        resetDataConfirmBtn.addEventListener('click', async () => { // Make async
            const enteredPassword = resetPasswordInput.value;
            if (enteredPassword === RESET_PASSWORD) {
                await performResetAllData(); // Call the actual reset function
                resetDataModal.classList.add('hidden');
                displayStatus("Semua data aplikasi telah direset!", "success");
            } else {
                displayStatus("Kata sandi salah. Reset data dibatalkan.", "error", resetDataMessage);
            }
        });
    }
    if (resetDataCancelBtn) {
        resetDataCancelBtn.addEventListener('click', () => {
            resetDataModal.classList.add('hidden');
            displayStatus("Reset data dibatalkan.", "info");
        });
    }


    // --- Toggle Daily Revenue Visibility Event Listener ---
    if (toggleDailyRevenueVisibilityButton) {
        toggleDailyRevenueVisibilityButton.addEventListener('click', async () => { // Make async
            isRevenueVisible = !isRevenueVisible;
            await saveAppStateToFirestore(); // Save user-specific state to Firestore
            updateHeaderDailyRevenue();
        });
    }

    // --- User Settings Modal Event Listeners ---
    if (openUserSettingsModalBtn) {
        openUserSettingsModalBtn.addEventListener('click', openUserSettingsModal);
    }
    if (closeUserSettingsModalBtn) {
        closeUserSettingsModalBtn.addEventListener('click', closeUserSettingsModal);
    }
    if (loginScreenBtn) {
        loginScreenBtn.addEventListener('click', loginUser);
    }
    if (userSettingsLoginButton) {
        userSettingsLoginButton.addEventListener('click', userSettingsLogin);
    }
    if (logoutButton) {
        logoutButton.addEventListener('click', logoutUser);
    }
    if (addUserButton) {
        addUserButton.addEventListener('click', addNewUser);
    }
    if (userListBody) {
        userListBody.addEventListener('click', (e) => {
            if (e.target.closest('.delete-user-btn')) {
                const uid = e.target.closest('.delete-user-btn').dataset.uid;
                const email = e.target.closest('.delete-user-btn').dataset.email;
                deleteUser(uid, email);
            }
        });
    }

    // Dark Mode Toggle Event Listener
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', async () => { // Make async
            isDarkMode = !isDarkMode;
            await saveAppStateToFirestore(); // Save user-specific state to Firestore
            applyDarkMode();
            renderTransactionItems();
            renderStoreProducts(searchStoreProductsInput.value);
            renderExpenses();
            calculateFinancialReport();
        });
    }

    // --- Printer Settings Event Listeners ---
    if (openPrinterSettingsBtn) {
        openPrinterSettingsBtn.addEventListener('click', () => {
            printerSettingsModal.classList.remove('hidden');
            adminMenuDropdown.classList.add('hidden');
            if (bluetoothPrinterDevice && bluetoothPrinterDevice.gatt.connected) {
                updatePrinterConnectionStatus(`Terhubung ke: ${bluetoothPrinterDevice.name || bluetoothPrinterDevice.id}`, true);
            } else {
                updatePrinterConnectionStatus("Silahkan sambungkan printer", false);
            }
        });
    }
    if (closePrinterSettingsModalBtn) {
        closePrinterSettingsModalBtn.addEventListener('click', () => {
            printerSettingsModal.classList.add('hidden');
        });
    }
    if (connectPrinterBtn) {
        connectPrinterBtn.addEventListener('click', connectPrinter);
    }
    if (disconnectPrinterBtn) {
        disconnectPrinterBtn.addEventListener('click', disconnectPrinter);
    }
    if (testPrintBtn) {
        testPrintBtn.addEventListener('click', testPrint);
    }

    // --- Price Calculator Functions ---
    if (openPriceCalculatorModalBtn) {
        openPriceCalculatorModalBtn.addEventListener('click', openPriceCalculatorModal);
    }
    if (closePriceCalculatorModalBtn) {
        closePriceCalculatorModalBtn.addEventListener('click', closePriceCalculatorModal);
    }
    if (calculatePriceBtn) {
        calculatePriceBtn.addEventListener('click', calculateSellingPriceAndProfit);
    }
    if (priceCalcModalInput) priceCalcModalInput.addEventListener('input', calculateSellingPriceAndProfit);
    if (priceCalcMarginPercentInput) priceCalcMarginPercentInput.addEventListener('input', calculateSellingPriceAndProfit);
    if (priceCalcTaxPercentInput) priceCalcTaxPercentInput.addEventListener('input', calculateSellingPriceAndProfit);
    if (priceCalcDiscountPercentInput) priceCalcDiscountPercentInput.addEventListener('input', calculateSellingPriceAndProfit);
    if (priceCalcProductCodeInput) {
        priceCalcProductCodeInput.addEventListener('input', calculateSellingPriceAndProfit);
    }

    // Copy buttons
    if (copyProductCodeBtn) {
        copyProductCodeBtn.addEventListener('click', () => {
            copyTextToClipboard(priceCalcProductCodeInput.value, priceCalcStatusMessage);
        });
    }
    if (copySellingPriceBtn) {
        copySellingPriceBtn.addEventListener('click', () => {
            const sellingPriceNum = priceCalcSellingPriceInput.value.replace(/[^0-9]/g, '');
            copyTextToClipboard(sellingPriceNum, priceCalcStatusMessage);
        });
    }

    // --- Nominal Quick Pay Buttons Event Listener ---
    if (nominalButtonsContainer) {
        nominalButtonsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('nominal-btn')) {
                const nominalValue = parseInt(e.target.dataset.nominal);
                if (!isNaN(nominalValue)) {
                    let currentPayment = parseFloat(paymentAmountInput.value) || 0;
                    paymentAmountInput.value = currentPayment + nominalValue;
                    calculateChange();
                }
            }
        });
    }

    // --- QR Scanner Event Listeners ---
    if (startScannerBtn) {
        startScannerBtn.addEventListener('click', startQrScanner);
    }
    if (stopScannerBtn) {
        stopScannerBtn.addEventListener('click', stopScanner);
    }

    // Event listener for Enter key on username/password inputs in login screen
    if (loginScreenEmailInput) { // Diubah ke email
        loginScreenEmailInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                loginScreenPasswordInput.focus();
            }
        });
    }

    if (loginScreenPasswordInput) {
        loginScreenPasswordInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                loginUser();
            }
        });
    }

    // New: Event listener for payment method select to auto-fill payment amount
    if (paymentMethodSelect) {
        paymentMethodSelect.addEventListener('change', function() {
            if (paymentMethodSelect.value === 'QRIS' || paymentMethodSelect.value === 'Transfer Bank') {
                const total = parseFloat(totalAmountInput.value.replace(/[^0-9,-]+/g, "").replace(",", ".")) || 0;
                paymentAmountInput.value = total.toLocaleString('id-ID');
                calculateChange();
            } else {
                paymentAmountInput.value = '0';
                calculateChange();
            }
        });
    }

    // Event listener for email/password inputs in user settings modal
    if (userSettingsLoginEmailInput) {
        userSettingsLoginEmailInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                userSettingsLoginPasswordInput.focus();
            }
        });
    }

    if (userSettingsLoginPasswordInput) {
        userSettingsLoginPasswordInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                userSettingsLogin();
            }
        });
    }
});

// Pastikan data disimpan saat pengguna mencoba menutup tab/browser
// Hanya appState yang perlu disimpan di sini, karena data lain diurus oleh real-time listener
window.addEventListener('beforeunload', async () => {
    // Pastikan scanner dihentikan saat unload
    if (html5QrCodeScanner && typeof html5QrCodeScanner.isScanning === "function" && html5QrCodeScanner.isScanning()) {
        html5QrCodeScanner.stop().catch(err => console.warn("Error stopping scanner on unload:", err));
    }

    // Save app state user-specific one last time, terutama untuk lastConnectedPrinterId jika ada
    if (currentUserId && db) {
        try {
            const appStateData = {
                isRevenueVisible: isRevenueVisible,
                isDarkMode: isDarkMode,
                lastConnectedPrinterId: bluetoothPrinterDevice ? bluetoothPrinterDevice.id : null
            };
            await window.setDoc(window.doc(db, USER_APP_STATE_DOC_PATH(currentUserId)), appStateData, { merge: true }); // Menggunakan window.setDoc dan window.doc
            console.log("App state pribadi berhasil disimpan saat unload.");
        } catch (e) {
            console.error("Gagal menyimpan app state pribadi saat unload:", e);
        }
    }

    // Save global store metrics one last time (dilakukan di commitTransactionData, tapi ini jaga-jaga)
    // FIX: Tambahkan saveStoreMetricsToFirestore di sini juga jika ada perubahan yang belum disimpan
    if (db) {
        try {
            await saveStoreMetricsToFirestore();
            console.log("Store metrics berhasil disimpan saat unload.");
        } catch (e) {
            console.error("Gagal menyimpan store metrics saat unload:", e);
        }
    }
});
