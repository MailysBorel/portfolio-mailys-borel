/* Maïlys Borel — Portfolio 2026 */
(() => {
  const IMG = "images/";

  /* ---------- Galeries des projets ---------- */
  const GALLERIES = {
    mairie: {
      title: "Mairie de Villeparisis",
      files: [
        ["2025-octobre-rose.png", "Octobre Rose 2025"],
        ["Affiche FDM 2025.png", "Fête de la musique 2025"],
        ["affiche_dalle.png", "Fête de la musique — Dalle du Parisis"],
        ["affiche_jacques.png", "Fête de la musique — Centre Culturel Jacques Prévert"],
        ["affiche_mauriac.png", "Fête de la musique — Place François Mauriac"],
        ["cérémonie des jeunes diplomés 2025.png", "Cérémonie des jeunes diplômés 2025"],
        ["colos apprenantes 2025.png", "Colonies apprenantes 2025"],
        ["fete du personnel laura_v3.png", "Fête du personnel"],
        ["forum des association 2025.png", "Forum des associations 2025"],
        ["mercredis de l'été.png", "Les mercredis de l'été"],
        ["Plan de travail 1.png", "Commémoration - Guerre 14/18"],
        ["Plan de travail 1 copie.png", "Commémoration - Guerre d'Algerie"],
        ["Plan de travail 1 copie 2.png", "Commémoration - Guerre 39/45"],
        ["Plan de travail 1 copie 3.png", "Commémoration - Abolition de l'esclavage"],
        ["Plan de travail 1 copie 5.png", "Commémoration - Appel du 18 juin"],
        ["Plan de travail 1 copie 6.png", "Commémoration - Héros de la déportation"],
        ["Plan de travail 1 copie 7.png", "Commémoration - Mémorial Day"],
        ["Plan de travail 1 copie 8.png", "Commémoration - Guerre d'Indochine"],
        ["Plan de travail 1 copie 9.png", "Commémoration - Hommage aux Harkis"],
        ["Plan de travail 1 copie 10.png", "Commémoration - Anniversaire de la libération de Villeparisis"],
      ],
    },
    foot: {
      title: "Affiches avant-match",
      files: [
        ["warren_zaire_emery_33.png", "Warren Zaïre-Emery"],
        ["psg vs liverpool.png", "PSG vs Liverpool"],
        ["lamine yamal.png", "Lamine Yamal"],
        ["Jude Bellingham.png", "Jude Bellingham"],
        ["vitinha v2.png", "Vitinha"],
        ["barcola.png", "Bradley Barcola"],
        ["brest vs psg.png", "Brest vs PSG"],
        ["real madrid cf.png", "Real Madrid CF"],
        ["tottenham.png", "Tottenham Hotspur"],
        ["zaire emery psg_monaco.png", "Zaïre-Emery — PSG vs Monaco"],
        ["Alexandre Lacazette.png", "Alexandre Lacazette"],
        ["brice samba.png", "Brice Samba"],
        ["mateo_beaslas_parisfc.png", "Mateo Beaslas — Paris FC"],
        ["affiche Adrien.png", "Adrien"],
      ],
    },
    circuit: {
      title: "Circuit des 24h du Mans",
      files: [
        ["circuit_1.png", "Le globe satellite"],
        ["circuit_2.png", "Le circuit modélisé en 3D"],
      ],
    },
    datasense: {
      title: "DataSense",
      files: [
        ["datasense_1.png", "Graphiques par région"],
        ["datasense_2.png", "Comparaison entre départements"],
      ],
    },
  };
  const src = (f) => IMG + encodeURIComponent(f);

  /* ---------- Fallback si une image est absente ---------- */
  const fallback = (img) => {
    if (img.dataset.failed) return;
    img.dataset.failed = "1";
    const box = document.createElement("span");
    box.className = img.className + " img-fallback";
    box.textContent = img.dataset.fallback || img.alt || "image";
    box.style.cssText = getComputedStyle(img).position === "absolute" ? "" : "width:100%;height:100%;";
    img.replaceWith(box);
  };
  document.querySelectorAll("main img").forEach((img) => {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fallback(img);
    img.addEventListener("error", () => fallback(img));
  });

  /* ---------- Menu mobile ---------- */
  const menu = document.querySelector(".menu");
  const burger = document.querySelector(".nav__burger");
  const toggleMenu = (open) => {
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggleMenu(true));
  menu.querySelector(".menu__close").addEventListener("click", () => toggleMenu(false));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  /* ---------- Lightbox ---------- */
  const lb = document.querySelector(".lightbox");
  const lbImg = lb.querySelector("figure img");
  const lbCap = lb.querySelector("figcaption");
  const lbTitle = lb.querySelector(".lightbox__title");
  const lbCount = lb.querySelector(".lightbox__count");
  const lbThumbs = lb.querySelector(".lightbox__thumbs");
  let current = null, index = 0, lastFocus = null;

  const show = (i) => {
    const files = GALLERIES[current].files;
    index = (i + files.length) % files.length;
    const [file, label] = files[index];
    lbImg.src = src(file);
    lbImg.alt = label;
    lbCap.textContent = label;
    lbCount.textContent = String(index + 1).padStart(2, "0") + " / " + String(files.length).padStart(2, "0");
    lbThumbs.querySelectorAll("button").forEach((b, j) => b.classList.toggle("is-active", j === index));
    lbThumbs.children[index]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };
  const open = (key, i = 0) => {
    current = key;
    lastFocus = document.activeElement;
    lbTitle.textContent = GALLERIES[key].title;
    lbThumbs.innerHTML = "";
    GALLERIES[key].files.forEach(([file, label], j) => {
      const b = document.createElement("button");
      b.setAttribute("aria-label", label);
      b.innerHTML = `<img src="${src(file)}" alt="" loading="lazy">`;
      b.addEventListener("click", () => show(j));
      lbThumbs.appendChild(b);
    });
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    show(i);
    lb.querySelector(".lightbox__close").focus();
  };
  const close = () => {
    lb.hidden = true;
    document.body.style.overflow = "";
    lastFocus?.focus();
  };
  document.querySelectorAll("[data-open]").forEach((el) =>
    el.addEventListener("click", () => open(el.dataset.open))
  );
  lb.querySelector(".lightbox__close").addEventListener("click", close);
  lb.querySelector(".lightbox__nav--prev").addEventListener("click", () => show(index - 1));
  lb.querySelector(".lightbox__nav--next").addEventListener("click", () => show(index + 1));
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) { if (e.key === "Escape") toggleMenu(false); return; }
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(index + 1);
    if (e.key === "ArrowLeft") show(index - 1);
  });
  // swipe mobile
  let sx = null;
  lb.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    sx = null;
  });

  /* ---------- Copier l'email ---------- */
  const toast = document.querySelector(".toast");
  let toastTimer;
  const say = (msg) => {
    toast.textContent = msg;
    toast.classList.add("is-shown");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-shown"), 2200);
  };
  document.querySelectorAll("[data-copy]").forEach((btn) =>
    btn.addEventListener("click", async () => {
      const mail = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(mail);
        say("Copié ! À très vite ✺");
      } catch {
        window.location.href = "mailto:" + mail;
      }
    })
  );

  /* ---------- Étiquettes déplaçables ---------- */
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.style.setProperty("--r", (Math.random() * 10 - 5).toFixed(1) + "deg");
    let startX, startY, baseX = 0, baseY = 0;
    chip.addEventListener("pointerdown", (e) => {
      chip.setPointerCapture(e.pointerId);
      chip.classList.add("is-dragging");
      startX = e.clientX - baseX;
      startY = e.clientY - baseY;
    });
    chip.addEventListener("pointermove", (e) => {
      if (!chip.classList.contains("is-dragging")) return;
      baseX = e.clientX - startX;
      baseY = e.clientY - startY;
      chip.style.translate = `${baseX}px ${baseY}px`;
    });
    const drop = () => chip.classList.remove("is-dragging");
    chip.addEventListener("pointerup", drop);
    chip.addEventListener("pointercancel", drop);
  });

  /* ---------- Bouton retour en haut ---------- */
  const toTop = document.querySelector(".to-top");
  const onScroll = () => toTop.classList.toggle("is-shown", window.scrollY > 300);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0 });
  });

  /* ---------- Apparitions au scroll ---------- */
  const targets = document.querySelectorAll(".project, .section-head, .about__grid > *, .board, .contact__title");
  targets.forEach((el) => el.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add("is-in"));
  }
})();
