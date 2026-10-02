/**
 * AgroPlan SV IPB — Authentication Engine (Supabase)
 * Login, Register, and Email Verification Handling
 */

(function () {
  let supabaseClient = null;
  let currentUser = null;

  // Inisialisasi Supabase Client
  function getSupabaseClient() {
    if (supabaseClient) return supabaseClient;

    const config = window.SUPABASE_CONFIG || {};
    const url = config.url || localStorage.getItem("agroplan_supabase_url") || localStorage.getItem("agritimeline_supabase_url");
    const anonKey = config.anonKey || localStorage.getItem("agroplan_supabase_key") || localStorage.getItem("agritimeline_supabase_key");

    if (!url || !anonKey || url === "" || anonKey === "") {
      return null;
    }

    if (!window.supabase) {
      console.error("Supabase JS SDK belum dimuat.");
      return null;
    }

    supabaseClient = window.supabase.createClient(url, anonKey);
    return supabaseClient;
  }

  // Toast Notification
  function showToast(message, type = "info") {
    let toast = document.getElementById("authToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "authToast";
      toast.className = "fixed bottom-5 right-5 z-[100] max-w-sm px-4 py-3 rounded-2xl shadow-xl text-xs font-medium flex items-center gap-2.5 transition-all duration-300 transform translate-y-10 opacity-0";
      document.body.appendChild(toast);
    }

    // Color by type
    if (type === "success") {
      toast.className = "fixed bottom-5 right-5 z-[100] max-w-sm px-4 py-3 rounded-2xl shadow-xl text-xs font-medium flex items-center gap-2.5 transition-all duration-300 bg-white text-[#2D231B] border border-orange-300 shadow-orange-950/5";
    } else if (type === "error") {
      toast.className = "fixed bottom-5 right-5 z-[100] max-w-sm px-4 py-3 rounded-2xl shadow-xl text-xs font-medium flex items-center gap-2.5 transition-all duration-300 bg-rose-50 text-rose-900 border border-rose-200 shadow-rose-950/5";
    } else {
      toast.className = "fixed bottom-5 right-5 z-[100] max-w-sm px-4 py-3 rounded-2xl shadow-xl text-xs font-medium flex items-center gap-2.5 transition-all duration-300 bg-white text-[#2D231B] border border-[#E8DFD3] shadow-stone-900/5";
    }

    toast.innerHTML = `
      <div class="flex-1 leading-relaxed">${message}</div>
      <button class="text-[#8A7B6E] hover:text-[#2D231B] font-bold text-sm px-1 cursor-pointer" onclick="this.parentElement.classList.add('opacity-0', 'translate-y-10')">&times;</button>
    `;

    // Show
    setTimeout(() => {
      toast.classList.remove("opacity-0", "translate-y-10");
    }, 10);

    // Auto-hide after 5s
    setTimeout(() => {
      if (toast) {
        toast.classList.add("opacity-0", "translate-y-10");
      }
    }, 5000);
  }

  // Update UI berdasarkan session user
  function updateAuthUI(user) {
    currentUser = user;
    const openAuthBtn = document.getElementById("openAuthModalBtn");
    const userProfileNav = document.getElementById("userProfileNav");
    const userEmailNav = document.getElementById("userEmailNav");

    if (user) {
      if (openAuthBtn) openAuthBtn.classList.add("hidden");
      if (userProfileNav) userProfileNav.classList.remove("hidden");
      if (userEmailNav) userEmailNav.innerText = user.email;
    } else {
      if (openAuthBtn) openAuthBtn.classList.remove("hidden");
      if (userProfileNav) userProfileNav.classList.add("hidden");
      if (userEmailNav) userEmailNav.innerText = "";
    }

    // Beritahu script lain (seperti app.js) bahwa status auth berubah
    window.dispatchEvent(new CustomEvent("agroplan:auth-changed", { detail: { user } }));
  }

  // Modal Controls
  function openAuthModal(defaultTab = "login", customMessage = null) {
    const modal = document.getElementById("authModal");
    if (!modal) return;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    switchAuthTab(defaultTab);
    clearAuthAlert();

    if (customMessage) {
      showAuthAlert(customMessage, "warning");
    }

    // Check if configuration is missing
    const client = getSupabaseClient();
    const configWarning = document.getElementById("supabaseConfigWarning");
    if (!client && configWarning) {
      configWarning.classList.remove("hidden");
    } else if (configWarning) {
      configWarning.classList.add("hidden");
    }
  }

  function closeAuthModal() {
    const modal = document.getElementById("authModal");
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    clearAuthAlert();
  }

  function switchAuthTab(tab) {
    const loginTabBtn = document.getElementById("tabLoginBtn");
    const registerTabBtn = document.getElementById("tabRegisterBtn");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const modalTitle = document.getElementById("authModalTitle");

    clearAuthAlert();

    if (tab === "login") {
      if (loginTabBtn) {
        loginTabBtn.className = "flex-1 py-2 text-xs font-semibold rounded-lg bg-orange-500 text-white shadow-sm transition cursor-pointer";
      }
      if (registerTabBtn) {
        registerTabBtn.className = "flex-1 py-2 text-xs font-medium rounded-lg text-[#7A6B5D] hover:text-[#2D231B] transition cursor-pointer";
      }
      if (loginForm) loginForm.classList.remove("hidden");
      if (registerForm) registerForm.classList.add("hidden");
      if (modalTitle) modalTitle.innerText = "Masuk ke AgroPlan";
    } else {
      if (registerTabBtn) {
        registerTabBtn.className = "flex-1 py-2 text-xs font-semibold rounded-lg bg-orange-500 text-white shadow-sm transition cursor-pointer";
      }
      if (loginTabBtn) {
        loginTabBtn.className = "flex-1 py-2 text-xs font-medium rounded-lg text-[#7A6B5D] hover:text-[#2D231B] transition cursor-pointer";
      }
      if (loginForm) loginForm.classList.add("hidden");
      if (registerForm) registerForm.classList.remove("hidden");
      if (modalTitle) modalTitle.innerText = "Daftar Akun Baru";
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function showAuthAlert(message, type = "error") {
    const alertBox = document.getElementById("authAlert");
    if (!alertBox) return;

    alertBox.classList.remove("hidden", "bg-rose-50", "border-rose-200", "text-rose-900", "bg-emerald-50", "border-emerald-200", "text-emerald-900", "bg-amber-50", "border-amber-200", "text-amber-900");

    if (type === "success") {
      alertBox.classList.add("bg-emerald-50", "border-emerald-200", "text-emerald-900");
    } else if (type === "warning") {
      alertBox.classList.add("bg-amber-50", "border-amber-200", "text-amber-900");
    } else {
      alertBox.classList.add("bg-rose-50", "border-rose-200", "text-rose-900");
    }

    alertBox.innerHTML = message;
  }

  function clearAuthAlert() {
    const alertBox = document.getElementById("authAlert");
    if (alertBox) {
      alertBox.classList.add("hidden");
      alertBox.innerHTML = "";
    }
  }

  // Handle Register (Daftar Akun)
  async function handleRegister(e) {
    e.preventDefault();
    const client = getSupabaseClient();
    if (!client) {
      showAuthAlert("⚠️ Kredensial Supabase belum diatur. Silakan isi URL & Anon Key di file <code>supabase-config.js</code>.", "warning");
      return;
    }

    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const submitBtn = document.getElementById("registerSubmitBtn");

    if (!email || !password) {
      showAuthAlert("Email dan password wajib diisi.");
      return;
    }

    if (password.length < 6) {
      showAuthAlert("Password minimal 6 karakter.");
      return;
    }

    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Mengirim link verifikasi...
      `;

      // Signup dengan email confirmation redirect
      const { data, error } = await client.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: window.location.origin + window.location.pathname
        }
      });

      if (error) {
        throw error;
      }

      // Supabase mengirimkan email verifikasi
      if (data?.user && (!data.session || data.user.identities?.length === 0)) {
        showAuthAlert(`
          <div class="space-y-1.5">
            <p class="font-bold flex items-center gap-1.5 text-orange-700">
              <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              Pendaftaran Berhasil!
            </p>
            <p class="text-xs text-[#5D5044]">
              Email konfirmasi telah dikirim ke <strong>${email}</strong>.
            </p>
            <p class="text-[11px] text-[#7A6B5D] bg-[#F5EFEB] p-2.5 rounded-xl border border-[#E8DFD3]">
              Silakan buka inbox atau folder spam email Anda, lalu klik tautan <strong>Confirm your mail</strong> untuk mengaktifkan akun Anda.
            </p>
          </div>
        `, "success");
        document.getElementById("registerForm").reset();
      } else if (data?.session) {
        // Jika verifikasi email dimatikan di Supabase, langsung login
        showToast("Pendaftaran berhasil dan Anda telah masuk!", "success");
        closeAuthModal();
      }
    } catch (err) {
      console.error("Register error:", err);
      let errorMsg = err.message || "Gagal melakukan pendaftaran.";
      if (errorMsg.includes("User already registered")) {
        errorMsg = "Email ini sudah terdaftar. Silakan login atau gunakan email lain.";
      }
      showAuthAlert(errorMsg, "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Daftar Akun</span>`;
    }
  }

  // Handle Login (Masuk Akun)
  async function handleLogin(e) {
    e.preventDefault();
    const client = getSupabaseClient();
    if (!client) {
      showAuthAlert("⚠️ Kredensial Supabase belum diatur. Silakan isi URL & Anon Key di file <code>supabase-config.js</code>.", "warning");
      return;
    }

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const submitBtn = document.getElementById("loginSubmitBtn");

    if (!email || !password) {
      showAuthAlert("Email dan password wajib diisi.");
      return;
    }

    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Memproses masuk...
      `;

      const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        throw error;
      }

      showToast(`Selamat datang kembali, ${data.user.email}!`, "success");
      closeAuthModal();
      document.getElementById("loginForm").reset();
    } catch (err) {
      console.error("Login error:", err);
      let errorMsg = err.message || "Gagal masuk.";
      if (errorMsg.includes("Email not confirmed")) {
        errorMsg = `
          <strong>Email Belum Dikonfirmasi</strong><br>
          Silakan periksa inbox/spam email Anda dan klik link konfirmasi dari Supabase sebelum masuk.
        `;
      } else if (errorMsg.includes("Invalid login credentials")) {
        errorMsg = "Email atau password salah. Silakan coba lagi.";
      }
      showAuthAlert(errorMsg, "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Masuk Sekarang</span>`;
    }
  }

  // Handle Logout
  async function handleLogout() {
    const client = getSupabaseClient();
    if (!client) {
      updateAuthUI(null);
      return;
    }

    try {
      await client.auth.signOut();
      showToast("Anda telah keluar dari akun.", "info");
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  // Simpan Kredensial Langsung dari UI jika belum diatur di file
  function saveManualCredentials(e) {
    e.preventDefault();
    const urlInput = document.getElementById("setupSupabaseUrl").value.trim();
    const keyInput = document.getElementById("setupSupabaseKey").value.trim();

    if (!urlInput || !keyInput) {
      alert("Harap masukkan URL dan Anon Key Supabase.");
      return;
    }

    localStorage.setItem("agroplan_supabase_url", urlInput);
    localStorage.setItem("agroplan_supabase_key", keyInput);
    localStorage.setItem("agritimeline_supabase_url", urlInput);
    localStorage.setItem("agritimeline_supabase_key", keyInput);

    // Reset client
    supabaseClient = null;
    initAuth();
    showToast("Kredensial Supabase berhasil disimpan!", "success");
    const warning = document.getElementById("supabaseConfigWarning");
    if (warning) warning.classList.add("hidden");
  }

  // Inisialisasi Auth & Event Listeners
  async function initAuth() {
    const client = getSupabaseClient();

    // Event listeners modal
    const openAuthBtn = document.getElementById("openAuthModalBtn");
    if (openAuthBtn) {
      openAuthBtn.addEventListener("click", () => openAuthModal("login"));
    }

    const closeAuthBtn = document.getElementById("closeAuthModalBtn");
    if (closeAuthBtn) {
      closeAuthBtn.addEventListener("click", closeAuthModal);
    }

    const authModalBackdrop = document.getElementById("authModalBackdrop");
    if (authModalBackdrop) {
      authModalBackdrop.addEventListener("click", closeAuthModal);
    }

    const tabLoginBtn = document.getElementById("tabLoginBtn");
    if (tabLoginBtn) {
      tabLoginBtn.addEventListener("click", () => switchAuthTab("login"));
    }

    const tabRegisterBtn = document.getElementById("tabRegisterBtn");
    if (tabRegisterBtn) {
      tabRegisterBtn.addEventListener("click", () => switchAuthTab("register"));
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", handleLogin);
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
      registerForm.addEventListener("submit", handleRegister);
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", handleLogout);
    }

    const saveConfigForm = document.getElementById("saveConfigForm");
    if (saveConfigForm) {
      saveConfigForm.addEventListener("submit", saveManualCredentials);
    }

    // Jika Supabase client belum ada, tampilkan instruksi
    if (!client) {
      console.warn("Supabase belum dikonfigurasi. Silakan isi supabase-config.js.");
      return;
    }

    // Periksa status sesi pengguna saat ini
    try {
      const { data: { session } } = await client.auth.getSession();
      if (session?.user) {
        updateAuthUI(session.user);
      } else {
        updateAuthUI(null);
      }

      // Cek apakah baru saja redirect dari link konfirmasi email di URL
      const hash = window.location.hash;
      const search = window.location.search;
      if (hash && (hash.includes("access_token=") || hash.includes("type=signup") || hash.includes("type=recovery"))) {
        showToast("🎉 Email berhasil diverifikasi! Selamat datang di AgroPlan.", "success");
        // Bersihkan hash dari URL agar rapi
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (search && search.includes("code=")) {
        showToast("🎉 Email berhasil diverifikasi! Selamat datang di AgroPlan.", "success");
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      // Listen perubahan auth state (misal login, logout, atau token refresh)
      client.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          updateAuthUI(session.user);
        } else if (event === "SIGNED_OUT") {
          updateAuthUI(null);
        }
      });
    } catch (err) {
      console.error("Gagal memeriksa sesi auth:", err);
    }
  }

  // Jalankan saat DOM siap
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAuth);
  } else {
    initAuth();
  }

  // Export helper ke global window bila dibutuhkan
  window.AgroPlanAuth = window.AgroAuth = window.AgriAuth = {
    openModal: openAuthModal,
    closeModal: closeAuthModal,
    getClient: getSupabaseClient,
    getUser: () => currentUser
  };
})();
