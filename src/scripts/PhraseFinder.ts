import levenshtein from 'fast-levenshtein';

const xslBoilerplate = {
    "header": 
    `<?xml version="1.0" encoding="utf-8"?>
    <document version="2">
    <interlinear-text guid="dcca1a8a-95bf-4814-897e-6587e7a2e75d">
    <paragraphs>
    <paragraph>
    <phrases>
    <phrase>`,

    "tail": 
    `</phrase>
    </phrases>
    </paragraph>
    </paragraphs>
    </interlinear-text>
    </document>`
};

const lineHeaders = [
    "Word",
    "Morphemes",
    "Lex.Entries", //spaces removed before referenced
    "Lex.Gloss",
    "Lex.Gram.Info",
    "WordGloss",
    "WordCat.",
    "Free",
    "Lit.",
]

enum LineTypes {
    CitationForm = "morphcf",
    Gloss = "morphgls",
    HN = "morphhn",
    GramInfo = "morphmsa",
    Category = "morphpos",
    Text = "morphtxt",
    Literal = "phraselit",
    Note = "phrasenote",
    Punctuation = "wordpunct",
    Word = "wordtxt",
    WordCat = "wordcat",
    Free = "phrasegls",
}

interface PhraseScore {
    index: number,
    score: number
}

class PhraseFinder {
    xml: string;
    phrases: Element[] | undefined;
    cliplines: string[];

    constructor(xml: string) {
        this.xml = xml;
        if (typeof this.xml !== 'string')
            this.phrases = undefined;
        else {
            let flextextDoc = new DOMParser().parseFromString(xml, "text/xml");
            this.phrases = Array.prototype.slice.apply(flextextDoc?.getElementsByTagName("phrase"));
        }
        this.cliplines = [];
        
    }

    //applies boilerplate and returns complete .flextext phrase
    getPhrase(clipboard: string): string {
        this.cliplines = clipboard.split("\n")

        if(!this.phrases)
            return "";

        return xslBoilerplate.header + this.getMatch() + xslBoilerplate.tail;
    }

    formatInput() {
        this.cliplines.forEach((line, index) => {
            line = line.split(" ").join("");
            let lexemes = line.split("\t");
            lexemes.shift();
            if(lexemes.length >= 1) {
                if(lineHeaders.includes(lexemes[0]))
                    lexemes.shift(); //remove first item from lexemes
            }

            this.cliplines[index] = lexemes.join("");
        })
    }

    //find phrase that matches clipboard contents and return it as a string
    getMatch(): string {
        if(!this.phrases || this.phrases.length < 1)
            return "";

        else {        
            if(this.phrases.length === 1)
                return this.phrases[0].innerHTML;

            this.parseByIndex();
            if(this.phrases.length === 1)
                return this.phrases[0].innerHTML;

            this.formatInput();

            this.parseByContent();

            return this.phrases[0].innerHTML;
        }
    }

    parseByIndex() {
        // should have been handled, just keeping compiler happy
        if(!this.phrases)
            return;

        //try to find index from clipboard
        let clipIndex = parseFloat(this.cliplines[0].split("\t")[0]);
        let passed: Element[] = [];

        this.phrases.forEach(phrase  => {
            //firstElementChild of a phrase is segment number
            let phraseIndex = phrase.firstElementChild?.innerHTML;
            if(phraseIndex && parseFloat(phraseIndex) === clipIndex)
                passed.push(phrase);
        })

        if(passed.length >= 1)
            this.phrases = passed;
    }

    parseByContent() {
        let bestScore: PhraseScore = {index: 0, score: 10000};

        this.phrases?.forEach((phrase, index) => {

            //populate dictionary with empty string for each line type
            let itemMap: Map<LineTypes, string> = new Map([]);
            
            let items = Array.prototype.slice.apply(phrase.getElementsByTagName("item"));

            items.forEach((item: Element) => {
                let parent = item.parentElement?.nodeName as string;
                let type = item.getAttribute("type") as string;

                let lineType = parent + type as LineTypes;
                let content = itemMap.get(lineType);
                
                if(content)
                    itemMap.set(lineType, content + item.innerHTML);
                else
                itemMap.set(lineType, item.innerHTML);
            });

            //score this phrase
            let lineScore = this.getLineScore(itemMap);

            //update best score
            if(lineScore < bestScore.score)
                bestScore = {index, score: lineScore};
        })

        //update phrases with best scoring phrase
        if(this.phrases)
            this.phrases = [this.phrases[bestScore.index]];
    }

    getLineScore(itemMap: Map<LineTypes, string>): number {
        let scores: number[] = [];

        itemMap.forEach((value: string) => {
            this.cliplines.forEach(clipline => {
                scores.push(levenshtein.get(clipline, value));
            })
        });

        return Math.min(...scores);
    }
}

export default PhraseFinder;