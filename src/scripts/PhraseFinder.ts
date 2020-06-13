const xslBoilerplate = {
    "header": 
    `<?xml version="1.0" encoding="utf-8"?>
    <?xml-stylesheet type="text/xsl" href="localhost:3000/xml2LeipzigLITE2.xsl"?>
    <document version="2">
    <interlinear-text guid="dcca1a8a-95bf-4814-897e-6587e7a2e75d">
    <paragraphs>
    <paragraph>`,

    "tail": 
    `</paragraph>
    </paragraphs>
    </interlinear-text>
    </document>`
};

export class PhraseFinder {

    //applies boilerplate and returns complete .flextext phrase
    getPhrase(clipboard: string): string {
        return xslBoilerplate.header + this.getMatch(clipboard) + xslBoilerplate.tail;
    }

    getMatch(clipboard: string): string {
        return "";
    }


}