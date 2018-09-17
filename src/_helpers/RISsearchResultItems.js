class RISweblinks {
    constructor() {
        this.web_url = '';
        this.pdf_url = '';
        this.doc_url = '';
        this.gesamt_url = '';
    }
}

class RISsearchResultItem {
    constructor(rechtsquelle,
                headline,
                resultInfoText,
                resultSmallprint,
                weblinks) {
        this.rechtsquelle = rechtsquelle;
        this.headline = headline;
        this.resultInfoText = resultInfoText;
        this.resultSmallprint = resultSmallprint;
        this.weblinks = weblinks;
    }
}

class BundesrechtItem extends RISsearchResultItem {
    constructor(bundesnormTyp, artikelParagraphAnlage, kurztitel,
                inkrafttreteDatum, kundmachungsorgan, weblinks) {
        super('Bundesrecht',
              bundesnormTyp,
              artikelParagraphAnlage + ', ' + kurztitel,
              'Inkrafttrete-Datum: ' + inkrafttreteDatum + '  |  ' + kundmachungsorgan,
              weblinks);
        this.bundesnormTyp = bundesnormTyp;
        this.artikelParagraphAnlage = artikelParagraphAnlage;
        this.kurztitel = kurztitel;
        this.inkrafttreteDatum = inkrafttreteDatum;
        this.kundmachungsorgan = kundmachungsorgan;
    }
}

class LandesrechtItem extends RISsearchResultItem {
    constructor(bundesland, landesnormTyp, artikelParagraphAnlage, kurztitel,
                inkrafttreteDatum, kundmachungsorgan, weblinks) {
        super('Landesrecht',
              bundesland + ': ' + landesnormTyp,
              artikelParagraphAnlage + ', ' + kurztitel,
              'Inkrafttrete-Datum: ' + inkrafttreteDatum + '  |  ' + kundmachungsorgan,
              weblinks);
        this.landesnormTyp = landesnormTyp;
        this.artikelParagraphAnlage = artikelParagraphAnlage;
        this.kurztitel = kurztitel;
        this.inkrafttreteDatum = inkrafttreteDatum;
        this.kundmachungsorgan = kundmachungsorgan;
    }
}

class VfghVwghItem extends RISsearchResultItem {
    constructor(rechtsquelle, entscheidungsart, dokumenttyp, schlagworte,
                entscheidungsdatum, geschaeftszahl, weblinks) {
        super(rechtsquelle,
              entscheidungsart,
              dokumenttyp + ': ' + schlagworte,
              'Entscheidungsdatum: ' + entscheidungsdatum + '  |  Geschäftszahl: ' + geschaeftszahl,
              weblinks);
        this.entscheidungsart = entscheidungsart;
        this.dokumenttyp = dokumenttyp;
        this.schlagworte = schlagworte;
        this.entscheidungsdatum = entscheidungsdatum;
        this.geschaeftszahl = geschaeftszahl;
    }
}

class RISsearchResultItemGroup {
    constructor(title, resultsMetaInfo, resultsArray, reduxActions) {
        this.title = title;
        this.pageNumber = resultsMetaInfo.pageNumber;
        this.totalNumberOfPages = resultsMetaInfo.totalNumberOfPages;
        this.totalNumberOfHits = resultsMetaInfo.totalNumberOfHits;
        this.resultsArray = resultsArray;
        this.reduxActions = reduxActions;
    }

    // Turns e.g. the number "1543" into "1.543"
    get totalNumberOfPagesFormatted() {
        const totalNumberOfPagesString = this.totalNumberOfPages.toString();
        const strLength = totalNumberOfPagesString.length;
        if (strLength > 3) return totalNumberOfPagesString.slice(0, strLength - 3) + "."
                              + totalNumberOfPagesString.slice(strLength - 3, strLength);
        else return totalNumberOfPagesString;
    }

    get totalNumberOfHitsFormatted() {
        const totalNumberOfHitsString = this.totalNumberOfHits.toString();
        const strLength = totalNumberOfHitsString.length;
        if (strLength > 3) return totalNumberOfHitsString.slice(0, strLength - 3) + "."
                              + totalNumberOfHitsString.slice(strLength - 3, strLength);
        else return totalNumberOfHitsString;
    }
}

export { RISweblinks, RISsearchResultItemGroup, BundesrechtItem, LandesrechtItem, VfghVwghItem };