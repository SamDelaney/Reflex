![](./src/resources/HorizontalLogo.png)
## A Reflexive Flextext Refactoring Tool
This webtool allows users to easily transform and transfer interlinear texts from SIL's Fieldworks Language Explorer into word processing tools in a format which should be accepted by journals and publishing companies.

### Getting Started
Before you can use Reflex, it needs access to your language data. 
 - Get a .flextext file of the texts you'll be using.
   - In FieldWorks, navigate to `Texts & Words` and select `Interlinear Texts`.
   - Then, open the `File` menu in the top left corner and click `Export Interlinear`.
   - Select the line which has the extension 'FLEXTEXT' and click Export.
   - Select the texts you want to be able to access and click OK.
   - Choose a location to store your .flextext file.
 - Upload the .flextext file to Reflex
    - In Reflex, click `UPLOAD DATA SOURCE`.
    - Select the file you want to upload and click Open to upload it. \
    ( This file is now added to a list of available .flextext data sources which can be accessed in the `Data Source` dropdown. )

Now that it has your interlinear texts, tell Reflex which phrase you want by putting text into the `Input` field.
   - I recommend copying and pasting the data directly from the Fieldworks `Interlinear Texts`, from either the `Gloss`, `Analyze`, or `Print View` tabs.

When you're satisfied with the content of the `Output` field, click `COPY TO CLIPBOARD`.
 - You should see a pop-up notification of success.

Now go to your supported word processor and paste your formatted phrase into your document. Congratulations!

#### Having problems? Feel free to create an issue [here](https://github.com/samdelaney/Reflex/issues). Don't be a stranger!

### Supported Word Processors
 - Microsoft Word
 - Google Docs (sub-optimally)

(If you're using Google Docs, you'll have better results if you paste without formatting using `ctrl`+`shift`+`v`. I intend to improve this in the future.)

### Planned Support
 - Google Docs (improved)
 - LaTeX
 - XLingPaper
 - LibreOffice

### Supported Browsers
 - Google Chrome
 - Mozilla Firefox

This tool is based heavily on Larry Hayashi's ["Linguistic Interlinear Text Exampler"](https://sites.google.com/canil.ca/tutorials/fieldworks/litexampler) XSLT Script and [our joint application](github.com/samdelaney/LITE) of the same name. Many thanks to him for his work and mentorship.

The tool is built in Typescript and React, making use of several well-known libraries such as Material-UI and Redux, and hosted right [here](https://samdelaney.github.io/Reflex) on Github Pages. If you'd like to contribute to this tool, feel free to shoot me a message here, and check out [the CRA scripts I use in development](docs/scripts.md).