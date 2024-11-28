
    const fullscreenIconHeader = document.getElementById("fullscreen-icon");
    const fullscreenIconPopup = document.getElementById("popup-fullscreen-icon");

    // Fungsi untuk toggle full screen
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen(); // Masuk full screen
            syncFullscreenIcons(true); // Sinkronkan ikon
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen(); // Keluar dari full screen
                syncFullscreenIcons(false); // Sinkronkan ikon
            }
        }
    }

    // Fungsi untuk sinkronisasi ikon fullscreen
    function syncFullscreenIcons(isFullscreen) {
        if (isFullscreen) {
            fullscreenIconHeader.classList.remove("fa-expand");
            fullscreenIconHeader.classList.add("fa-compress");
            fullscreenIconPopup.querySelector("i").classList.remove("fa-expand");
            fullscreenIconPopup.querySelector("i").classList.add("fa-compress");
        } else {
            fullscreenIconHeader.classList.remove("fa-compress");
            fullscreenIconHeader.classList.add("fa-expand");
            fullscreenIconPopup.querySelector("i").classList.remove("fa-compress");
            fullscreenIconPopup.querySelector("i").classList.add("fa-expand");
        }
    }

    // Event listener untuk ikon pada header
    fullscreenIconHeader.addEventListener("click", toggleFullScreen);

    // Event listener untuk ikon pada popup
    fullscreenIconPopup.addEventListener("click", toggleFullScreen);

    // Event listener untuk deteksi perubahan status full screen
    document.addEventListener("fullscreenchange", () => {
        const isFullscreen = !!document.fullscreenElement;
        syncFullscreenIcons(isFullscreen); // Sinkronkan status ikon
    });