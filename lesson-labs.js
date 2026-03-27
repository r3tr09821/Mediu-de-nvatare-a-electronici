const ctl = (label, min, max, step, value, unit) => ({ label, min, max, step, value, unit });

const lessonLabConfigs = {
  "cc-resistor": { title: "Model academic pentru rezistenta in curent continuu", sum: "Rezistenta limiteaza curentul si stabileste caderea de tensiune in circuit.", pri: "In regim stationar, componenta nu stocheaza energie, ci o transforma in principal in caldura.", rel: "I = U / R, P = U x I", scope: "Albastru = tensiune aplicata, lime = curent scalat. Raspunsul este imediat, fara inertie proprie.", obs: ["Tensiune mai mare inseamna curent mai mare.", "Rezistenta mai mare inseamna curent mai mic.", "Puterea disipata trebuie verificata."], tr: ["Tensiune aplicata", "Curent scalat"], kind: "resistor", family: "dc", a: ctl("Tensiune sursa", 1, 24, 0.5, 12, "V"), b: ctl("Rezistenta", 10, 1000, 10, 220, "ohm") },
  "cc-capacitor": { title: "Model academic pentru condensator in curent continuu", sum: "Condensatorul stocheaza energie electrica si are raspuns tranzitoriu la conectare.", pri: "La aplicarea unei trepte de tensiune, tensiunea pe condensator creste progresiv, iar curentul descreste.", rel: "uC(t) = U x (1 - e^(-t / tau))", scope: "Albastru = tensiune pe condensator, lime = curent de incarcare. Se observa clar tranzitoriul.", obs: ["Tau mai mare inseamna incarcare mai lenta.", "Curentul initial este maxim.", "In regim stationar curentul tinde spre zero."], tr: ["Tensiune pe condensator", "Curent de incarcare"], kind: "capacitor", family: "dc", a: ctl("Tensiune sursa", 1, 24, 0.5, 12, "V"), b: ctl("Constanta de timp", 1, 10, 0.5, 4, "tau") },
  "cc-inductor": { title: "Model academic pentru bobina in curent continuu", sum: "Bobina se opune variatiilor de curent si introduce un raspuns tranzitoriu.", pri: "Curentul prin bobina nu poate creste instantaneu, iar tensiunea inductiva descreste in timp.", rel: "iL(t) = Imax x (1 - e^(-t / tau))", scope: "Albastru = tensiune inductiva, lime = curent prin bobina. Se vede opozitia la schimbari rapide.", obs: ["Inductanta mai mare incetineste cresterea curentului.", "La conectare tensiunea inductiva este maxima.", "In regim stabil bobina ideala devine aproape conductor."], tr: ["Tensiune inductiva", "Curent prin bobina"], kind: "inductor", family: "dc", a: ctl("Tensiune sursa", 1, 24, 0.5, 12, "V"), b: ctl("Inductanta relativa", 1, 10, 0.5, 5, "L") },
  "cc-battery": { title: "Model academic pentru acumulator in curent continuu", sum: "Acumulatorul se studiaza prin tensiune nominala si comportamentul la sarcina.", pri: "Tensiunea la borne scade cand sarcina creste, din cauza rezistentei interne.", rel: "Vborne = Vnom - I x Rint", scope: "Albastru = tensiune nominala, lime = tensiune la borne. Diferenta explica efectul sarcinii.", obs: ["Sarcina mai mare produce cadere de tensiune mai mare.", "Rezistenta interna conteaza la curenti ridicati.", "Stabilitatea sursei este importanta pentru roboti."], tr: ["Tensiune nominala", "Tensiune la borne"], kind: "battery", family: "dc", a: ctl("Tensiune nominala", 3, 24, 0.5, 12, "V"), b: ctl("Nivel sarcina", 1, 10, 1, 4, "lvl") },
  "cc-diode": { title: "Model academic pentru dioda in curent continuu", sum: "Dioda este neliniara si conduce preferabil intr-un singur sens.", pri: "In polarizare directa, conducerea apare dupa depasirea tensiunii prag.", rel: "Pentru Vin > Vf, Vout = Vin - Vf", scope: "Albastru = tensiune aplicata, lime = tensiune dupa dioda. Se observa rolul pragului de conducere.", obs: ["Sub prag, conducerea este foarte mica.", "Peste prag, iesirea urmeaza intrarea minus caderea proprie.", "Modelul simplificat ajuta la intelegerea polarizarii."], tr: ["Tensiune aplicata", "Tensiune dupa dioda"], kind: "diode", family: "dc", a: ctl("Tensiune aplicata", 0, 12, 0.1, 5, "V"), b: ctl("Prag de conducere", 0.2, 1.2, 0.1, 0.7, "V") },
  "cc-transistor": { title: "Model academic pentru tranzistor in curent continuu", sum: "Tranzistorul poate functiona ca intrerupator electronic controlat.", pri: "O comanda mica poate controla curentul unei sarcini mai mari in regim de comutatie.", rel: "Comanda bazei stabileste starea sarcinii", scope: "Albastru = comanda de intrare, lime = raspunsul sarcinii. Trecerea OFF/ON se vede clar.", obs: ["Sub pragul de comanda sarcina ramane blocata.", "Peste prag tranzistorul conduce.", "Modelul este util pentru LED-uri, relee si motoare."], tr: ["Comanda intrare", "Raspuns sarcina"], kind: "transistor", family: "dc", a: ctl("Tensiune sarcina", 3, 24, 0.5, 12, "V"), b: ctl("Comanda baza", 0, 100, 1, 65, "%") },
  "cc-overview": { title: "Model academic pentru un circuit complet de curent continuu", sum: "Un lant CC include sursa, elemente pasive, componente active si sarcina.", pri: "Analiza completa cere verificarea simultana a tensiunilor, curentilor si puterilor din circuit.", rel: "Legea lui Ohm si legile lui Kirchhoff se aplica impreuna", scope: "Albastru = intrarea sistemului, lime = iesirea utila. Diferenta sugereaza pierderi si conditionari.", obs: ["Toate componentele trebuie alese coerent.", "Iesirea scade cand lantul devine mai incarcat.", "Bilantul energetic este esential."], tr: ["Intrare sistem", "Iesire utila"], kind: "overview-dc", family: "dc", a: ctl("Nivel sursa", 3, 24, 0.5, 12, "V"), b: ctl("Complexitate circuit", 1, 10, 1, 6, "lvl") },
  "ac-resistor": { title: "Model academic pentru rezistenta in curent alternativ", sum: "O sarcina pur rezistiva pastreaza tensiunea si curentul in faza.", pri: "In lipsa reactantei, energia este transformata in principal in caldura.", rel: "u(t) = Umax sin(wt), i(t) = Imax sin(wt)", scope: "Cele doua trase raman in faza: maximele si zerourile apar in aceleasi momente.", obs: ["Frecventa schimba doar perioada.", "Curentul ramane in faza cu tensiunea.", "Puterea activa este dominanta."], tr: ["Tensiune AC", "Curent AC"], kind: "resistor", family: "ac", a: ctl("Amplitudine", 1, 20, 0.5, 10, "V"), b: ctl("Frecventa", 10, 100, 1, 50, "Hz") },
  "ac-capacitor": { title: "Model academic pentru condensator in curent alternativ", sum: "Condensatorul introduce reactanta capacitiva si avans de faza al curentului.", pri: "La frecvente mai mari, reactanta capacitiva scade si componenta lasa mai usor semnalul sa varieze.", rel: "Xc = 1 / (wC)", scope: "Trasa lime este in avans fata de trasa albastra, sugerand ca varful curentului apare mai devreme.", obs: ["Frecventa mare accentueaza efectul capacitiv.", "Curentul conduce tensiunea.", "Defazajul este semnatura sa functionala."], tr: ["Tensiune AC", "Curent in avans"], kind: "capacitor", family: "ac", a: ctl("Amplitudine", 1, 20, 0.5, 10, "V"), b: ctl("Frecventa", 10, 100, 1, 50, "Hz") },
  "ac-inductor": { title: "Model academic pentru bobina in curent alternativ", sum: "Bobina introduce reactanta inductiva si intarziere de faza a curentului.", pri: "Campul magnetic asociat se opune schimbarilor rapide, iar efectul creste cu frecventa.", rel: "Xl = wL", scope: "Trasa lime este deplasata spre dreapta fata de trasa albastra, ceea ce indica intarzierea curentului.", obs: ["Frecventa mai mare creste reactanta inductiva.", "Defazajul este opus cazului capacitiv.", "Bobinele apar frecvent in filtre si surse."], tr: ["Tensiune AC", "Curent intarziat"], kind: "inductor", family: "ac", a: ctl("Amplitudine", 1, 20, 0.5, 10, "V"), b: ctl("Frecventa", 10, 100, 1, 50, "Hz") },
  "ac-source": { title: "Model academic pentru surse si transformatoare in curent alternativ", sum: "Sursele AC si transformatoarele se studiaza prin amplitudine, frecventa si raport de transformare.", pri: "Transformatorul transfera energie prin cuplaj magnetic, pastrand forma generala a semnalului.", rel: "V2 / V1 = N2 / N1", scope: "Albastru = semnal primar, lime = semnal secundar. Diferenta de amplitudine arata raportul de transformare.", obs: ["Raportul de transformare modifica tensiunea de iesire.", "Frecventa ramane neschimbata in modelul ideal.", "Izolarea galvanica este un avantaj important."], tr: ["Semnal primar", "Semnal secundar"], kind: "source-ac", family: "ac", a: ctl("Tensiune intrare", 10, 240, 10, 120, "V"), b: ctl("Raport transformare", 1, 10, 1, 4, "n") },
  "ac-diode": { title: "Model academic pentru dioda in curent alternativ", sum: "Dioda redreseaza semnalul alternativ si selecteaza polaritatea utila.", pri: "Prin blocarea unei alternante sau folosirea ambelor alternante, se obtine un semnal unidirectional pulsatoriu.", rel: "Redresare de semialternanta sau de unda completa", scope: "Albastru = semnal sinusoidal initial, lime = semnal redresat. Forma arata imediat modul de redresare.", obs: ["Semialternanta foloseste doar alternantele pozitive.", "Unda completa este mai utila pentru filtrare.", "Redresarea este primul pas spre obtinerea unei surse CC."], tr: ["Semnal AC", "Semnal redresat"], kind: "diode-ac", family: "ac", a: ctl("Amplitudine AC", 1, 20, 0.5, 10, "V"), b: ctl("Tip redresare", 1, 2, 1, 1, "mode") },
  "ac-transistor": { title: "Model academic pentru tranzistor in curent alternativ", sum: "Tranzistorul poate functiona ca element de amplificare a semnalelor alternative.", pri: "Daca este polarizat corespunzator, un semnal mic la intrare poate produce un semnal mai mare la iesire.", rel: "Av = Vout / Vin", scope: "Albastru = semnal intrare, lime = semnal iesire. Diferenta de amplitudine ilustreaza castigul.", obs: ["Castigul mai mare mareste amplitudinea iesirii.", "Forma semnalului ramane asemanatoare in modelul simplificat.", "Punctul de lucru limiteaza distorsiunile."], tr: ["Semnal intrare", "Semnal iesire"], kind: "transistor-ac", family: "ac", a: ctl("Semnal intrare", 1, 10, 0.5, 3, "V"), b: ctl("Castig", 1, 10, 0.5, 4, "x") },
  "ac-overview": { title: "Model academic pentru un circuit complet de curent alternativ", sum: "Un lant AC se analizeaza prin amplitudine, frecventa, impedanta si faza.", pri: "Sursa, elementele rezistive si reactive trebuie privite ca un ansamblu functional influentat de frecventa.", rel: "Impedanta si faza rezulta din combinatia dintre R, L si C", scope: "Albastru = intrare sistem, lime = iesire sistem. Se observa simultan atenuarea si defazajul.", obs: ["Frecventa schimba comportamentul tuturor elementelor reactive.", "Raspunsul global se citeste prin amplitudine si faza.", "Abordarea pe blocuri ajuta la intelegerea sistemelor reale."], tr: ["Intrare sistem", "Iesire sistem"], kind: "overview-ac", family: "ac", a: ctl("Amplitudine sistem", 1, 20, 0.5, 10, "V"), b: ctl("Frecventa", 10, 100, 1, 50, "Hz") }
};

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const fmt = (v, unit = "") => {
  if (typeof v !== "number" || Number.isNaN(v)) return String(v);
  const abs = Math.abs(v);
  const d = abs >= 100 ? 0 : abs >= 10 ? 1 : 2;
  const text = v.toFixed(d).replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
  return unit ? `${text} ${unit}` : text;
};
const phase = (v) => `${v > 0 ? "+" : ""}${Math.round(v)} deg`;
const ctlText = (c, v) => c.unit === "mode" ? (v < 1.5 ? "semialternanta" : "unda completa") : c.unit === "%" ? `${Math.round(v)} %` : c.unit === "lvl" ? `nivel ${Math.round(v)}` : c.unit === "n" ? `${Math.round(v)}:1` : fmt(v, c.unit);

const getLabDerivedValues = (config, state) => {
  const a = Number(state.a);
  const b = Number(state.b);
  switch (config.kind) {
    case "resistor":
      return config.family === "dc"
        ? { vin: a, vout: a, current: a / Math.max(b, 1), aux: b, phase: 0, frequency: 0, schematicMain: `${Math.round(b)} ohm`, metrics: [["Tensiune", fmt(a, "V")], ["Curent", fmt((a / Math.max(b, 1)) * 1000, "mA")], ["Rezistenta", fmt(b, "ohm")], ["Putere", fmt(a * (a / Math.max(b, 1)), "W")]] }
        : { vin: a, vout: a, current: a / 10, aux: b, phase: 0, frequency: b, schematicMain: `${Math.round(b)} Hz`, metrics: [["Vmax", fmt(a, "V")], ["Imax", fmt(a / 10, "A")], ["Frecventa", fmt(b, "Hz")], ["Faza", phase(0)]] };
    case "capacitor":
      return config.family === "dc"
        ? { vin: a, vout: a * (1 - Math.exp(-1 / b)), current: a / Math.max(b * 40, 1), aux: b, phase: 0, frequency: 0, schematicMain: `${b.toFixed(1)} tau`, metrics: [["Tensiune sursa", fmt(a, "V")], ["uC(t)", fmt(a * (1 - Math.exp(-1 / b)), "V")], ["Constanta timp", fmt(b, "tau")], ["iC(t)", fmt((a / Math.max(b * 40, 1)) * 1000, "mA")]] }
        : { vin: a, vout: a, current: a / 6, aux: b, phase: 70, frequency: b, schematicMain: `${Math.round(b)} Hz`, metrics: [["Vmax", fmt(a, "V")], ["Imax", fmt(a / 6, "A")], ["Frecventa", fmt(b, "Hz")], ["Faza I/V", phase(70)]] };
    case "inductor":
      return config.family === "dc"
        ? { vin: a, vout: a, current: a / (8 + b), aux: b, phase: 0, frequency: 0, schematicMain: `${b.toFixed(1)} L`, metrics: [["Tensiune sursa", fmt(a, "V")], ["iL(t)", fmt(a / (8 + b), "A")], ["Inductanta rel.", fmt(b, "L")], ["uL(0+)", fmt(a, "V")]] }
        : { vin: a, vout: a, current: a / 8, aux: b, phase: -70, frequency: b, schematicMain: `${Math.round(b)} Hz`, metrics: [["Vmax", fmt(a, "V")], ["Imax", fmt(a / 8, "A")], ["Frecventa", fmt(b, "Hz")], ["Faza I/V", phase(-70)]] };
    case "battery":
      return { vin: a, vout: Math.max(0, a - b * 0.25), current: b * 0.18, aux: b, phase: 0, frequency: 0, schematicMain: `${a.toFixed(1)} V`, metrics: [["V nominala", fmt(a, "V")], ["V la borne", fmt(Math.max(0, a - b * 0.25), "V")], ["Nivel sarcina", fmt(b, "lvl")], ["Curent estimat", fmt(b * 0.18, "A")]] };
    case "diodes":
      return { vin: a, vout: a > b ? a - b : 0, current: a > b ? (a - b) / 100 : 0, aux: b, phase: 0, frequency: 0, schematicMain: `Vf ${b.toFixed(2)} V`, metrics: [["Vin", fmt(a, "V")], ["V prag", fmt(b, "V")], ["Vout", fmt(a > b ? a - b : 0, "V")], ["Conduce", a > b ? "da" : "nu"]] };
    case "transistor":
      return { vin: a, vout: b > 50 ? a * 0.12 : a, current: (b / 100) * 0.24, aux: b, phase: 0, frequency: 0, schematicMain: `${Math.round(b)} %`, metrics: [["Tensiune sarcina", fmt(a, "V")], ["Comanda", `${Math.round(b)} %`], ["Stare", b > 50 ? "ON" : "OFF"], ["Ic", fmt((b / 100) * 0.24, "A")]] };
    case "overview-dc":
      return { vin: a, vout: Math.max(0, a - b * 0.35), current: (a / 12) * (b / 10), aux: b, phase: 0, frequency: 0, schematicMain: `nivel ${Math.round(b)}`, metrics: [["Intrare", fmt(a, "V")], ["Iesire utila", fmt(Math.max(0, a - b * 0.35), "V")], ["Curent sistem", fmt((a / 12) * (b / 10), "A")], ["Complexitate", fmt(b, "lvl")]] };
    case "source-ac":
      return { vin: a, vout: a / Math.max(b, 1), current: (a / Math.max(b, 1)) / 10, aux: b, phase: 0, frequency: 50, schematicMain: `n=${Math.round(b)}`, metrics: [["Vin", fmt(a, "V")], ["Vsec", fmt(a / Math.max(b, 1), "V")], ["Raport", `${Math.round(b)}:1`], ["Frecventa", "50 Hz"]] };
    case "diode-ac":
      return { vin: a, vout: b < 1.5 ? a * 0.45 : a * 0.82, current: a / 12, aux: b, phase: 0, frequency: 50, schematicMain: b < 1.5 ? "semialternanta" : "unda completa", metrics: [["Vac", fmt(a, "V")], ["Mod", b < 1.5 ? "1/2 unda" : "unda completa"], ["Vdc echiv.", fmt(b < 1.5 ? a * 0.45 : a * 0.82, "V")], ["Curent", fmt(a / 12, "A")]] };
    case "transistor-ac":
      return { vin: a, vout: a * Math.max(1, b), current: (a * Math.max(1, b)) / 20, aux: Math.max(1, b), phase: 0, frequency: 50, schematicMain: `A=${Math.max(1, b).toFixed(1)}`, metrics: [["Vin", fmt(a, "V")], ["Vout", fmt(a * Math.max(1, b), "V")], ["Castig", fmt(Math.max(1, b), "x")], ["Iout", fmt((a * Math.max(1, b)) / 20, "A")]] };
    case "overview-ac":
      return { vin: a, vout: a * 0.72, current: a / 11, aux: b, phase: 22, frequency: b, schematicMain: `${Math.round(b)} Hz`, metrics: [["Intrare", fmt(a, "V")], ["Iesire", fmt(a * 0.72, "V")], ["Frecventa", fmt(b, "Hz")], ["Faza", phase(22)]] };
    default:
      return { vin: a, vout: a, current: 0, aux: b, phase: 0, frequency: 0, schematicMain: "", metrics: [] };
  }
};

const labBuildSchematic = (config, d) => {
  const s = getComputedStyle(document.body).getPropertyValue("--text").trim() || "#ffffff";
  const base = `<svg viewBox="0 0 760 220" class="component-lab__svg" aria-hidden="true" style="color:${s}"><line x1="40" y1="110" x2="180" y2="110" stroke="${s}" stroke-width="4"/><line x1="580" y1="110" x2="720" y2="110" stroke="${s}" stroke-width="4"/><text x="52" y="92" fill="${s}" font-size="18">Vin ${d.vin.toFixed(1)} V</text><text x="590" y="92" fill="${s}" font-size="18">Vout ${d.vout.toFixed(1)} V</text>`;
  const end = `<circle cx="32" cy="110" r="6" fill="${s}"/><circle cx="728" cy="110" r="6" fill="${s}"/></svg>`;
  switch (config.kind) {
    case "resistor": return `${base}<polyline points="180,110 220,80 260,140 300,80 340,140 380,80 420,140 460,110 580,110" fill="none" stroke="${s}" stroke-width="4"/><text x="305" y="62" text-anchor="middle" fill="${s}" font-size="18">Rezistenta ${d.schematicMain}</text>${end}`;
    case "capacitor": return `${base}<line x1="270" y1="70" x2="270" y2="150" stroke="${s}" stroke-width="6"/><line x1="330" y1="70" x2="330" y2="150" stroke="${s}" stroke-width="6"/><line x1="180" y1="110" x2="270" y2="110" stroke="${s}" stroke-width="4"/><line x1="330" y1="110" x2="580" y2="110" stroke="${s}" stroke-width="4"/><text x="300" y="52" text-anchor="middle" fill="${s}" font-size="18">Condensator ${d.schematicMain}</text>${end}`;
    case "inductor": return `${base}<path d="M180 110 C200 70, 220 70, 240 110 C260 70, 280 70, 300 110 C320 70, 340 70, 360 110 C380 70, 400 70, 420 110 C440 70, 460 70, 480 110" fill="none" stroke="${s}" stroke-width="4"/><line x1="480" y1="110" x2="580" y2="110" stroke="${s}" stroke-width="4"/><text x="360" y="52" text-anchor="middle" fill="${s}" font-size="18">Bobina ${d.schematicMain}</text>${end}`;
    case "battery": return `${base}<line x1="250" y1="70" x2="250" y2="150" stroke="${s}" stroke-width="5"/><line x1="295" y1="82" x2="295" y2="138" stroke="${s}" stroke-width="3"/><line x1="180" y1="110" x2="250" y2="110" stroke="${s}" stroke-width="4"/><line x1="295" y1="110" x2="580" y2="110" stroke="${s}" stroke-width="4"/><text x="380" y="52" text-anchor="middle" fill="${s}" font-size="18">Acumulator ${d.schematicMain}</text>${end}`;
    case "diodes":
    case "diode-ac": return `${base}<polygon points="250,70 250,150 330,110" fill="none" stroke="${s}" stroke-width="4"/><line x1="340" y1="70" x2="340" y2="150" stroke="${s}" stroke-width="5"/><line x1="180" y1="110" x2="250" y2="110" stroke="${s}" stroke-width="4"/><line x1="340" y1="110" x2="580" y2="110" stroke="${s}" stroke-width="4"/><text x="380" y="52" text-anchor="middle" fill="${s}" font-size="18">Dioda ${d.schematicMain}</text>${end}`;
    case "transistor":
    case "transistor-ac": return `${base}<circle cx="340" cy="110" r="46" fill="none" stroke="${s}" stroke-width="4"/><line x1="340" y1="64" x2="340" y2="156" stroke="${s}" stroke-width="4"/><line x1="180" y1="110" x2="294" y2="110" stroke="${s}" stroke-width="4"/><line x1="386" y1="84" x2="462" y2="56" stroke="${s}" stroke-width="4"/><line x1="386" y1="136" x2="470" y2="164" stroke="${s}" stroke-width="4"/><line x1="470" y1="164" x2="580" y2="164" stroke="${s}" stroke-width="4"/><line x1="462" y1="56" x2="580" y2="56" stroke="${s}" stroke-width="4"/><text x="380" y="40" text-anchor="middle" fill="${s}" font-size="18">Tranzistor ${d.schematicMain}</text>${end}`;
    case "source-ac": return `${base}<circle cx="235" cy="110" r="34" fill="none" stroke="${s}" stroke-width="4"/><path d="M216 110 C224 92, 246 92, 254 110 C262 128, 284 128, 292 110" fill="none" stroke="${s}" stroke-width="4"/><rect x="350" y="65" width="95" height="90" fill="none" stroke="${s}" stroke-width="4"/><line x1="370" y1="78" x2="370" y2="142" stroke="${s}" stroke-width="3"/><line x1="425" y1="78" x2="425" y2="142" stroke="${s}" stroke-width="3"/><line x1="269" y1="110" x2="350" y2="110" stroke="${s}" stroke-width="4"/><line x1="445" y1="110" x2="580" y2="110" stroke="${s}" stroke-width="4"/><text x="400" y="48" text-anchor="middle" fill="${s}" font-size="18">Transformator ${d.schematicMain}</text>${end}`;
    case "overview-dc": return `${base}<line x1="180" y1="110" x2="230" y2="110" stroke="${s}" stroke-width="4"/><polyline points="230,110 248,88 266,132 284,88 302,132 320,110" fill="none" stroke="${s}" stroke-width="4"/><line x1="320" y1="110" x2="360" y2="110" stroke="${s}" stroke-width="4"/><line x1="380" y1="76" x2="380" y2="144" stroke="${s}" stroke-width="5"/><line x1="418" y1="76" x2="418" y2="144" stroke="${s}" stroke-width="5"/><line x1="418" y1="110" x2="470" y2="110" stroke="${s}" stroke-width="4"/><polygon points="470,76 470,144 530,110" fill="none" stroke="${s}" stroke-width="4"/><line x1="540" y1="76" x2="540" y2="144" stroke="${s}" stroke-width="5"/><line x1="540" y1="110" x2="580" y2="110" stroke="${s}" stroke-width="4"/><text x="380" y="44" text-anchor="middle" fill="${s}" font-size="18">Lant CC complet ${d.schematicMain}</text>${end}`;
    case "overview-ac": return `${base}<circle cx="220" cy="110" r="28" fill="none" stroke="${s}" stroke-width="4"/><path d="M204 110 C210 96, 228 96, 234 110 C240 124, 258 124, 264 110" fill="none" stroke="${s}" stroke-width="4"/><line x1="248" y1="110" x2="305" y2="110" stroke="${s}" stroke-width="4"/><polyline points="305,110 323,88 341,132 359,88 377,132 395,110" fill="none" stroke="${s}" stroke-width="4"/><line x1="395" y1="110" x2="440" y2="110" stroke="${s}" stroke-width="4"/><line x1="460" y1="76" x2="460" y2="144" stroke="${s}" stroke-width="5"/><line x1="498" y1="76" x2="498" y2="144" stroke="${s}" stroke-width="5"/><line x1="498" y1="110" x2="580" y2="110" stroke="${s}" stroke-width="4"/><text x="390" y="44" text-anchor="middle" fill="${s}" font-size="18">Lant AC complet ${d.schematicMain}</text>${end}`;
    default: return `${base}${end}`;
  }
};

const labDrawScopeGrid = (ctx, w, h) => {
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(127, 148, 166, 0.24)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += w / 10) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
  for (let y = 0; y <= h; y += h / 6) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
};

const labPlotTrace = (ctx, w, h, fn, color) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.2;
  for (let i = 0; i <= w; i += 2) {
    const t = i / w;
    const py = clamp(h * (0.5 - fn(t) * 0.38), 8, h - 8);
    if (i === 0) ctx.moveTo(i, py); else ctx.lineTo(i, py);
  }
  ctx.stroke();
};

const labRenderScope = (canvas, config, d, scopeState) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  const blue = "#38aef5";
  const lime = "#b7ff3c";
  const text = getComputedStyle(document.body).getPropertyValue("--text").trim() || "#ffffff";
  const cycles = clamp(((d.frequency || 50) / 20) * scopeState.timeScale, 1, 8);
  const omega = Math.PI * 2 * cycles;
  const shift = (d.phase * Math.PI) / 180;
  const wave = (t, p = 0) => Math.sin(t * omega + p);
  const amp = (value) => clamp(value * scopeState.ampScale + scopeState.offset, -1.2, 1.2);
  labDrawScopeGrid(ctx, w, h);
  switch (config.kind) {
    case "resistor":
      if (config.family === "dc") { labPlotTrace(ctx, w, h, () => amp(0.78), blue); labPlotTrace(ctx, w, h, () => amp(clamp(d.current * 10, 0.08, 0.62)), lime); }
      else { labPlotTrace(ctx, w, h, (t) => amp(wave(t)), blue); labPlotTrace(ctx, w, h, (t) => amp(wave(t)), lime); }
      break;
    case "capacitor":
      if (config.family === "dc") { labPlotTrace(ctx, w, h, (t) => amp(1 - Math.exp(-t * (1 + d.aux))), blue); labPlotTrace(ctx, w, h, (t) => amp(Math.exp(-t * (1 + d.aux))), lime); }
      else { labPlotTrace(ctx, w, h, (t) => amp(wave(t)), blue); labPlotTrace(ctx, w, h, (t) => amp(wave(t, shift)), lime); }
      break;
    case "inductor":
      if (config.family === "dc") { labPlotTrace(ctx, w, h, (t) => amp(Math.exp(-t * (1 + d.aux * 0.2))), blue); labPlotTrace(ctx, w, h, (t) => amp(1 - Math.exp(-t * (1 + d.aux * 0.2))), lime); }
      else { labPlotTrace(ctx, w, h, (t) => amp(wave(t)), blue); labPlotTrace(ctx, w, h, (t) => amp(wave(t, shift)), lime); }
      break;
    case "battery": labPlotTrace(ctx, w, h, () => amp(0.84), blue); labPlotTrace(ctx, w, h, () => amp(clamp(0.84 - d.aux * 0.03, 0.18, 0.84)), lime); break;
    case "diodes": labPlotTrace(ctx, w, h, () => amp(clamp(d.vin / 12, 0, 1)), blue); labPlotTrace(ctx, w, h, () => amp(clamp(d.vout / 12, 0, 1)), lime); break;
    case "diode-ac": labPlotTrace(ctx, w, h, (t) => amp(wave(t)), blue); labPlotTrace(ctx, w, h, (t) => amp(d.aux < 1.5 ? Math.max(0, wave(t)) : Math.abs(wave(t))), lime); break;
    case "transistor": labPlotTrace(ctx, w, h, () => amp(d.aux / 100), blue); labPlotTrace(ctx, w, h, () => amp(d.aux > 50 ? 0.88 : 0.16), lime); break;
    case "transistor-ac": labPlotTrace(ctx, w, h, (t) => amp(wave(t) * 0.3), blue); labPlotTrace(ctx, w, h, (t) => amp(wave(t) * Math.min(0.95, 0.3 * d.aux)), lime); break;
    case "source-ac": labPlotTrace(ctx, w, h, (t) => amp(wave(t)), blue); labPlotTrace(ctx, w, h, (t) => amp(wave(t) / Math.max(1, d.aux)), lime); break;
    case "overview-dc": labPlotTrace(ctx, w, h, () => amp(clamp(d.vin / 16, 0.1, 0.95)), blue); labPlotTrace(ctx, w, h, (t) => amp(clamp(d.vout / 16 + Math.exp(-t * 8) * 0.18, 0.08, 0.92)), lime); break;
    case "overview-ac": labPlotTrace(ctx, w, h, (t) => amp(wave(t)), blue); labPlotTrace(ctx, w, h, (t) => amp(wave(t, shift) * 0.72), lime); break;
    default: labPlotTrace(ctx, w, h, (t) => amp(wave(t)), blue); labPlotTrace(ctx, w, h, (t) => amp(wave(t, 0.5)), lime); break;
  }
  ctx.fillStyle = text;
  ctx.font = '12px "Space Grotesk", sans-serif';
  ctx.fillText("Osciloscop didactic", 14, 18);
};

const theoryMarkup = (c) => `<div class="component-lab__theory"><article class="component-lab__card"><strong>Principiu</strong><p>${c.pri}</p></article><article class="component-lab__card"><strong>Relatie esentiala</strong><p class="component-lab__formula">${c.rel}</p></article><article class="component-lab__card"><strong>Citire pe osciloscop</strong><p>${c.scope}</p></article></div><div class="component-lab__observations">${c.obs.map((item) => `<article class="component-lab__card"><strong>Observatie</strong><p>${item}</p></article>`).join("")}</div>`;
const metricMarkup = (items) => items.map(([label, value]) => `<article class="component-lab__metric"><strong>${label}</strong><span>${value}</span></article>`).join("");

const lessonArticleDetails = {
  resistor: {
    model: "Analiza unei rezistente porneste de la proportionalitatea dintre tensiune si curent. In laboratorul de baza, aceasta componenta este referinta pentru masuratori simple, calcule de divizare a tensiunii si alegerea puterii disipate.",
    use: "In robotica pentru incepatori, rezistentele apar in limitarea curentului prin LED-uri, in citirea butoanelor si in adaptarea nivelurilor electrice pentru senzori."
  },
  capacitor: {
    model: "Condensatorul trebuie privit ca element de acumulare a sarcinii electrice. In analiza academica se urmareste constanta de timp, comportamentul la conectare si diferentele dintre regimul tranzitoriu si regimul stabilizat.",
    use: "In proiectele mici cu roboti, condensatoarele sunt folosite pentru filtrare, reducerea fluctuatiilor de tensiune si temporizari simple alaturi de rezistente."
  },
  inductor: {
    model: "Bobina este analizata prin energia stocata in campul magnetic si prin opozitia fata de variatiile rapide ale curentului. Tocmai de aceea raspunsul sau nu este instantaneu, ci evolueaza in timp.",
    use: "In practica, bobinele apar in filtre, surse in comutatie, actuatoare si etaje unde limitarea variatiilor de curent este importanta."
  },
  battery: {
    model: "Studiul unei surse reale nu se rezuma la tensiunea inscrisa pe carcasa. O abordare corecta include rezistenta interna, comportamentul la sarcina si modul in care tensiunea utila scade in functionare.",
    use: "Pentru un robot simplu, alegerea acumulatorului influenteaza autonomia, stabilitatea motoarelor si siguranta alimentarii pentru senzorii sensibili."
  },
  diodes: {
    model: "Dioda se analizeaza ca element neliniar, ceea ce inseamna ca nu respecta o relatie liniara simpla intre tensiune si curent. Pragul de conducere si sensul polarizarii sunt punctele cheie ale intelegerii sale.",
    use: "Ea este folosita in protectie la polaritate inversa, in separarea semnalelor si in multe scheme de baza unde sensul curentului trebuie controlat clar."
  },
  transistor: {
    model: "Tranzistorul este o componenta activa, iar diferenta fata de elementele pasive este ca poate controla o energie mai mare cu ajutorul unui semnal mai mic. Incepatorii il inteleg cel mai usor in regim de comutatie.",
    use: "In robotica educationala, tranzistorul devine puntea dintre controler si sarcini precum motoare mici, relee, benzi LED sau buzzer-e."
  },
  "overview-dc": {
    model: "Un circuit complet se studiaza prin relatia dintre sursa, elementele de limitare, protectie si comanda. Nu este suficient sa cunosti separat componentele; trebuie sa vezi cum interactioneaza in acelasi lant.",
    use: "Aceasta gandire de ansamblu este esentiala cand treci de la exemple izolate la un robot real, unde alimentarea, comanda si sarcina se influenteaza reciproc."
  },
  "source-ac": {
    model: "Sursele si transformatoarele AC se studiaza prin amplitudine, frecventa si raport de transformare. In modelul ideal, transferul energetic este magnetic, iar forma generala a semnalului se pastreaza.",
    use: "Intelegerea lor este importanta pentru alimentatoare, adaptoare si etaje de separare intre reteaua de intrare si electronica sensibila."
  },
  "diode-ac": {
    model: "In curent alternativ, dioda este legata direct de procesul de redresare. Analiza sa trebuie facuta nu doar pe valori instantanee, ci si pe forma de unda obtinuta la iesire.",
    use: "Aceasta lectie este fundamentul pentru surse de alimentare, puntea redresoare si toate circuitele care transforma semnalul AC in alimentare utila pentru electronica."
  },
  "transistor-ac": {
    model: "Pentru semnale alternative, tranzistorul se interpreteaza ca element de amplificare. Accentul cade pe castig, pastrarea formei semnalului si mentinerea unui punct de functionare util.",
    use: "Acest mod de lucru apare in preluarea semnalelor de la senzori, in etaje de conditionare si in circuite unde trebuie amplificat un semnal mic."
  },
  "overview-ac": {
    model: "Un lant AC complet se citeste prin amplitudine, frecventa, impedanta si faza. Din acest motiv, evaluarea unui sistem alternativ este mai bogata decat simpla citire a unei tensiuni medii.",
    use: "Abordarea de ansamblu este necesara pentru filtre, etaje de adaptare si surse unde coexistenta mai multor componente reactive schimba semnificativ raspunsul sistemului."
  }
};

const buildLessonArticle = (config) => {
  const details = lessonArticleDetails[config.kind] || lessonArticleDetails.resistor;
  const regimeText = config.family === "dc"
    ? "In regim de curent continuu, accentul cade pe stabilirea valorilor stationare si pe felul in care apare eventualul tranzitoriu de la conectare."
    : "In regim de curent alternativ, accentul cade pe amplitudine, frecventa, forma de unda si pe relatia de faza dintre marimile electrice.";
  const controlText = `In schema interactiva poti modifica ${config.a.label.toLowerCase()} si ${config.b.label.toLowerCase()}, iar modificarile se vad imediat in forma schemei, in trasele de pe osciloscop si in parametrii afisati dedesubt.`;
  const observationText = config.obs.join(" ");
  return `
    <section class="lesson-article">
      <p class="eyebrow">Lectie extinsa</p>
      <h2>${config.title}</h2>
      <article class="lesson-article__section">
        <h3>Cadru teoretic</h3>
        <p>${config.sum} ${config.pri} ${regimeText}</p>
      </article>
      <article class="lesson-article__section">
        <h3>Model de analiza</h3>
        <p>${details.model} Relatia centrala folosita in aceasta lectie este ${config.rel}. Ea ofera baza pentru intelegerea sensului fizic al parametrilor si pentru estimarea marimilor care pot fi masurate in circuit.</p>
      </article>
      <article class="lesson-article__section">
        <h3>Interpretare experimentala</h3>
        <p>${controlText} ${config.scope} ${observationText}</p>
      </article>
      <article class="lesson-article__section">
        <h3>Aplicatii si legatura cu robotica</h3>
        <p>${details.use} Din acest motiv, lectia trebuie citita nu doar ca teorie de componenta, ci ca baza pentru proiectarea unui montaj functional, sigur si usor de depanat.</p>
      </article>
    </section>
  `;
};

const getLessonReference = (config) => {
  switch (config.kind) {
    case "resistor":
      return config.family === "dc"
        ? { params: ["U [V] - tensiune", "I [A] - curent", "R [ohm] - rezistenta", "P [W] - putere"], symbols: ["U - tensiune", "I - curent", "R - rezistenta", "P - putere"], formulas: ["I = U / R", "U = R x I", "P = U x I", "P = I^2 x R"], si: ["1 ohm = 1 V / A", "1 W = 1 J / s", "1 mA = 10^-3 A", "1 kohm = 10^3 ohm"] }
        : { params: ["U [V] - tensiune", "I [A] - curent", "f [Hz] - frecventa", "phi [deg] - faza"], symbols: ["U - tensiune", "I - curent", "f - frecventa", "phi - faza"], formulas: ["U = R x I", "P = U x I", "f = 1 / T", "phi = 0 deg"], si: ["1 Hz = 1 / s", "1 kHz = 10^3 Hz", "1 mA = 10^-3 A", "1 Vrms se exprima in V"] };
    case "capacitor":
      return config.family === "dc"
        ? { params: ["U [V] - tensiune", "C [F] - capacitate", "Q [C] - sarcina", "tau [s] - constanta timp"], symbols: ["U - tensiune", "C - capacitate", "Q - sarcina", "tau - constanta timp"], formulas: ["Q = C x U", "i = C x du / dt", "tau = R x C", "W = C x U^2 / 2"], si: ["1 F = 1 C / V", "1 uF = 10^-6 F", "1 nF = 10^-9 F", "1 ms = 10^-3 s"] }
        : { params: ["U [V] - tensiune", "C [F] - capacitate", "f [Hz] - frecventa", "Xc [ohm] - reactanta"], symbols: ["U - tensiune", "I - curent", "C - capacitate", "Xc - reactanta"], formulas: ["Xc = 1 / (2 x pi x f x C)", "I = U / Xc", "f = 1 / T", "phi > 0 pentru curent"], si: ["1 F = 1 C / V", "1 uF = 10^-6 F", "1 Hz = 1 / s", "1 rad / s = 2 x pi x f"] };
    case "inductor":
      return config.family === "dc"
        ? { params: ["U [V] - tensiune", "L [H] - inductanta", "I [A] - curent", "tau [s] - constanta timp"], symbols: ["U - tensiune", "L - inductanta", "I - curent", "tau - constanta timp"], formulas: ["u = L x di / dt", "tau = L / R", "W = L x I^2 / 2", "iL(t) creste exponential"], si: ["1 H = 1 V x s / A", "1 mH = 10^-3 H", "1 uH = 10^-6 H", "1 ms = 10^-3 s"] }
        : { params: ["U [V] - tensiune", "L [H] - inductanta", "f [Hz] - frecventa", "Xl [ohm] - reactanta"], symbols: ["U - tensiune", "I - curent", "L - inductanta", "Xl - reactanta"], formulas: ["Xl = 2 x pi x f x L", "I = U / Xl", "f = 1 / T", "phi < 0 pentru curent"], si: ["1 H = 1 V x s / A", "1 mH = 10^-3 H", "1 Hz = 1 / s", "1 ohm = 1 V / A"] };
    case "battery":
      return { params: ["Vnom [V] - tensiune nominala", "Vborne [V] - tensiune la borne", "I [A] - curent", "Rint [ohm] - rezistenta interna"], symbols: ["Vnom - tensiune nominala", "Vborne - tensiune utila", "I - curent", "Rint - rezistenta interna"], formulas: ["Vborne = Vnom - I x Rint", "P = U x I", "E = U x I x t", "Q = I x t"], si: ["1 Ah = 3600 C", "1 W = 1 J / s", "1 Wh = 3600 J", "1 mA = 10^-3 A"] };
    case "diodes":
      return { params: ["Vin [V] - tensiune intrare", "Vf [V] - tensiune prag", "If [A] - curent direct", "Vout [V] - tensiune iesire"], symbols: ["Vin - intrare", "Vf - prag", "If - curent direct", "Vout - iesire"], formulas: ["Vout = Vin - Vf", "If = (Vin - Vf) / R", "P = Vf x If", "Conduce daca Vin > Vf"], si: ["1 mA = 10^-3 A", "1 uA = 10^-6 A", "1 V ramane unitatea de tensiune", "1 W = 1 V x A"] };
    case "transistor":
      return { params: ["Ib [A] - curent baza", "Ic [A] - curent colector", "beta - castig curent", "Vce [V] - tensiune colector-emitor"], symbols: ["Ib - curent baza", "Ic - curent colector", "beta - factor amplificare", "Vce - tensiune iesire"], formulas: ["Ic = beta x Ib", "P = Vce x Ic", "ON daca exista comanda suficienta", "OFF daca Ib este prea mic"], si: ["1 mA = 10^-3 A", "1 uA = 10^-6 A", "1 W = 1 J / s", "beta este fara unitate"] };
    case "overview-dc":
      return { params: ["U [V] - tensiune", "I [A] - curent", "R [ohm] - rezistenta echivalenta", "P [W] - putere"], symbols: ["U - tensiune", "I - curent", "R - rezistenta", "P - putere"], formulas: ["U = R x I", "P = U x I", "sum(U) = 0 pe bucla", "sum(I) = 0 in nod"], si: ["1 ohm = 1 V / A", "1 W = 1 J / s", "1 mA = 10^-3 A", "1 kohm = 10^3 ohm"] };
    case "source-ac":
      return { params: ["V1 [V] - tensiune primar", "V2 [V] - tensiune secundar", "f [Hz] - frecventa", "N - raport spire"], symbols: ["V1 - intrare", "V2 - iesire", "f - frecventa", "N1/N2 - spire"], formulas: ["V2 / V1 = N2 / N1", "f = 1 / T", "P = U x I", "I2 / I1 aprox. invers cu raportul"], si: ["1 Hz = 1 / s", "1 kHz = 10^3 Hz", "1 Vrms se exprima in V", "raportul de spire este fara unitate"] };
    case "diode-ac":
      return { params: ["Vac [V] - tensiune AC", "Vdc [V] - tensiune medie", "f [Hz] - frecventa", "mode - tip redresare"], symbols: ["Vac - intrare AC", "Vdc - iesire medie", "f - frecventa", "If - curent direct"], formulas: ["Vdc aprox. 0.45 x Vac pentru 1/2 unda", "Vdc aprox. 0.9 x Vac pentru unda completa", "f = 1 / T", "P = U x I"], si: ["1 Hz = 1 / s", "1 mA = 10^-3 A", "1 V ramane unitatea de tensiune", "1 W = 1 J / s"] };
    case "transistor-ac":
      return { params: ["Vin [V] - semnal intrare", "Vout [V] - semnal iesire", "Av - castig", "f [Hz] - frecventa"], symbols: ["Vin - intrare", "Vout - iesire", "Av - amplificare", "f - frecventa"], formulas: ["Av = Vout / Vin", "Vout = Av x Vin", "P = U x I", "f = 1 / T"], si: ["Av este fara unitate", "1 Hz = 1 / s", "1 mV = 10^-3 V", "1 W = 1 J / s"] };
    case "overview-ac":
      return { params: ["U [V] - tensiune", "I [A] - curent", "Z [ohm] - impedanta", "f [Hz] - frecventa"], symbols: ["U - tensiune", "I - curent", "Z - impedanta", "phi - faza"], formulas: ["Z = U / I", "Xl = 2 x pi x f x L", "Xc = 1 / (2 x pi x f x C)", "P = U x I x cos(phi)"], si: ["1 ohm = 1 V / A", "1 Hz = 1 / s", "1 H = 1 V x s / A", "1 F = 1 C / V"] };
    default:
      return null;
  }
};

const refCard = (title, items) => `<article class="lesson-reference__card"><h3>${title}</h3><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`;

const initLessonSidebar = () => {
  const config = lessonLabConfigs[document.body.dataset.lessonTopic];
  const sidebar = document.querySelector(".lesson-sidebar");
  if (!config || !sidebar || sidebar.querySelector(".lesson-reference")) return;
  const ref = getLessonReference(config);
  if (!ref) return;
  const section = document.createElement("section");
  section.className = "lesson-reference";
  section.innerHTML = `<p class="eyebrow">Fisa de calcul</p>${refCard("Parametri", ref.params)}${refCard("Simboluri", ref.symbols)}${refCard("Formule", ref.formulas)}${refCard("Unitati SI", ref.si)}`;
  sidebar.append(section);
};

const initLessonArticle = () => {
  const config = lessonLabConfigs[document.body.dataset.lessonTopic];
  const detail = document.querySelector(".lesson-detail");
  if (!config || !detail || detail.querySelector(".lesson-article")) return;
  const target = detail.querySelector(".next-nav");
  const article = document.createElement("section");
  article.innerHTML = buildLessonArticle(config);
  const node = article.firstElementChild;
  if (!node) return;
  if (target) detail.insertBefore(node, target); else detail.append(node);
};

const initLessonLabs = () => {
  const config = lessonLabConfigs[document.body.dataset.lessonTopic];
  const detail = document.querySelector(".lesson-detail");
  if (!config || !detail || detail.querySelector(".component-lab")) return;
  const target = detail.querySelector(".next-nav");
  const lab = document.createElement("section");
  lab.className = "component-lab";
  lab.innerHTML = `<div class="component-lab__header"><p class="eyebrow">Laborator didactic</p><h2>${config.title}</h2><p class="component-lab__summary">${config.sum}</p></div>${theoryMarkup(config)}<div class="component-lab__controls"><label class="component-lab__control"><span>${config.a.label}</span><input type="range" min="${config.a.min}" max="${config.a.max}" step="${config.a.step}" value="${config.a.value}" data-lab-control="a"></label><label class="component-lab__control"><span>${config.b.label}</span><input type="range" min="${config.b.min}" max="${config.b.max}" step="${config.b.step}" value="${config.b.value}" data-lab-control="b"></label></div><div class="component-lab__values"><span data-lab-value="a"></span><span data-lab-value="b"></span></div><div class="component-lab__schematic" data-lab-schematic></div><div class="component-lab__scope-wrap"><div class="component-lab__scope-header"><strong>Osciloscop</strong><div class="component-lab__legend"><span><i style="background:#38aef5"></i>${config.tr[0]}</span><span><i style="background:#b7ff3c"></i>${config.tr[1]}</span></div></div><div class="component-lab__scope-controls"><button type="button" class="component-lab__scope-button" data-scope-action="time-down">Timp -</button><button type="button" class="component-lab__scope-button" data-scope-action="time-up">Timp +</button><button type="button" class="component-lab__scope-button" data-scope-action="amp-down">Amplitudine -</button><button type="button" class="component-lab__scope-button" data-scope-action="amp-up">Amplitudine +</button><button type="button" class="component-lab__scope-button" data-scope-action="offset-down">Offset -</button><button type="button" class="component-lab__scope-button" data-scope-action="offset-up">Offset +</button><button type="button" class="component-lab__scope-button" data-scope-action="reset">Reset</button></div><div class="component-lab__scope-status"><span data-scope-readout="time"></span><span data-scope-readout="amp"></span><span data-scope-readout="offset"></span></div><canvas class="component-lab__scope" width="720" height="210" data-lab-scope></canvas><p class="component-lab__scope-note">${config.scope}</p></div><div class="component-lab__metrics" data-lab-metrics></div>`;
  if (target) detail.insertBefore(lab, target); else detail.append(lab);
  const a = lab.querySelector('[data-lab-control="a"]');
  const b = lab.querySelector('[data-lab-control="b"]');
  const va = lab.querySelector('[data-lab-value="a"]');
  const vb = lab.querySelector('[data-lab-value="b"]');
  const sch = lab.querySelector("[data-lab-schematic]");
  const met = lab.querySelector("[data-lab-metrics]");
  const scope = lab.querySelector("[data-lab-scope]");
  const scopeButtons = lab.querySelectorAll("[data-scope-action]");
  const scopeTimeReadout = lab.querySelector('[data-scope-readout="time"]');
  const scopeAmpReadout = lab.querySelector('[data-scope-readout="amp"]');
  const scopeOffsetReadout = lab.querySelector('[data-scope-readout="offset"]');
  if (!a || !b || !va || !vb || !sch || !met || !scope || !scopeTimeReadout || !scopeAmpReadout || !scopeOffsetReadout) return;
  const scopeState = { timeScale: 1, ampScale: 1, offset: 0 };
  const render = () => {
    const state = { a: Number(a.value), b: Number(b.value) };
    const d = getLabDerivedValues(config, state);
    va.textContent = `${config.a.label}: ${ctlText(config.a, state.a)}`;
    vb.textContent = `${config.b.label}: ${ctlText(config.b, state.b)}`;
    sch.innerHTML = labBuildSchematic(config, d);
    met.innerHTML = metricMarkup(d.metrics);
    scopeTimeReadout.textContent = `Timp: ${fmt(scopeState.timeScale, "x")}`;
    scopeAmpReadout.textContent = `Amplitudine: ${fmt(scopeState.ampScale, "x")}`;
    scopeOffsetReadout.textContent = `Offset: ${fmt(scopeState.offset, "div")}`;
    labRenderScope(scope, config, d, scopeState);
  };
  scopeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.scopeAction;
      if (action === "time-down") scopeState.timeScale = clamp(scopeState.timeScale - 0.2, 0.4, 3);
      if (action === "time-up") scopeState.timeScale = clamp(scopeState.timeScale + 0.2, 0.4, 3);
      if (action === "amp-down") scopeState.ampScale = clamp(scopeState.ampScale - 0.15, 0.4, 2.5);
      if (action === "amp-up") scopeState.ampScale = clamp(scopeState.ampScale + 0.15, 0.4, 2.5);
      if (action === "offset-down") scopeState.offset = clamp(scopeState.offset - 0.08, -0.8, 0.8);
      if (action === "offset-up") scopeState.offset = clamp(scopeState.offset + 0.08, -0.8, 0.8);
      if (action === "reset") {
        scopeState.timeScale = 1;
        scopeState.ampScale = 1;
        scopeState.offset = 0;
      }
      render();
    });
  });
  a.addEventListener("input", render);
  b.addEventListener("input", render);
  window.addEventListener("robo:appearance", render);
  render();
};

initLessonSidebar();
initLessonArticle();
initLessonLabs();
