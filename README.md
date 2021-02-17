![mockumeddyapp](https://user-images.githubusercontent.com/8554238/85066026-74c95980-b1ae-11ea-9f1a-e2b4ca9e08f3.png)

# Medicine scanner
Een webapplicatie die medicijn gebruikers helpt om de juiste informatie te verkrijgen over hun medicijn. Met het gebruik "Optical Character Recognition" oftewel OCR kunnen gebruikers simpel weg een foto uploaden en hierbij de juiste data binnen halen. Door op de juiste en betrouwbare manier data op te halen uit de medicijn-api, geproduceerd door de Voorhoede, is de applicatie voor iedereen toegankelijk.


## Introductie
In de Design Rationale en de Product Biografie kan je meer informatie vinden van dit project

1. [Design Rationale]()
2. [Product biografie]() 

## Inhoudsopgave

1. [Installatie](#installatie)
2. [Documentatie](#documentatie)
    1. Debrief 
    2. Programma van Eisen
3. [API](#api)
4. [Tesseract](#tesseract)
5. [Diagrammen](#diagrammen)
    1. Actordiagram
    2. Interactiondiagram
6. [Ontwerpkeuzes](#ontwerpkeuzes)
    1. Stijlgids
    2. Ontwerpen
7. [Applicatie](#applicatie)
    1. Tesseract
    2. Privacy
    3. Pakketten
8. [Wensen](#wensen)
9. [Conclusie](#conclusie)
10. [Source](#source)
11. [Credits](#credits)


## Installatie

1. Kloon repository
```
git clone https://github.com/joanpadolina/meesterproef-1920.git
```

2. Install packages
```
npm install 
```
3. Install tesseract lokaal
```
brew install tesseract
```
4. Start server
``` 
npm run dev 
```

## Documentatie

__<details><summary>Debrief</summary>__
<p>

## Medicijn Scanner
18 mei 2020

### Inleiding

Voorhoede is een bedrijf die zich bezighoudt met gebruikers en gebruikersbeleving op het internet. Aan ons is gevraagd om een concept te ontwikkelen waarbij medicijngebruikers de juiste medicijn binnen krijgt door gebruik te maken van Machine Learning. 
Hoofdvraag: Hoe maak je het zoeken, naar medicijn met de specifieke registratie nummer en actieve stoffen, makkelijker voor medicijngebruikers.
Opdracht
Voor dit project is aan ons gevraagd webapplicatie te maken waarmee je een medicijndoosje kunt scannen, met behulp van een webcam of met de camera van je mobiel. Het doel van de medicijn scanner is om informatie te verkrijgen over jou medicijn.
De gebruiker kan met de webapplicatie de naam of registratienummer van een medicijndoosje scannen en hiervoor zullen we gebruik maken van Machine Learning. Door middel van Optical Character Recognition (OCR), kunnen we teksten herkennen en koppelen aan de juiste data. Op basis hiervan kunnen we de juiste informatie beschikbaar stellen voor de gebruiker.
### Doelgroep
Ons doelgroep zijn medicijngebruikers die vaak of veel medicijnen van de apotheek halen.
Doel
Het doel van de webapplicatie is de gebruiker helpen met het verkrijgen van de juiste informatie over zijn of haar medicijn. Wij willen een goede gebruikers beleving creëren door de applicatie heen, zonder verwarringen en content gericht werken.
### Eisen en wensen
* Scannen: De gebruiker is in staat om informatie te verkrijgen van de desbetreffende medicijn door gebruik te maken van zijn of haar camera van de telefoon of computer.
* Informatie verkrijgen: De gebruiker krijgt door de scanner de juiste data binnen waardoor de informatie en de bijsluiter beschikbaar is.
* Error handelingen: Door de grote dataset kan het zijn dat er geen informatie beschikbaar is. Stel de gebruiker daarom tot rust door ze goed en duidelijk door te verwijzen.
### Technische eisen
* Dataset uit de geleverde API
* Teksten herkennen uit foto’s
* Foto’s als gescannde document kunnen opslaan
* *extra Bijsluiter toevoegen als er een pdf beschikbaar is

### Planning

|             |   maandag   |   dinsdag   |   woensdag    |   donderdag   |   vrijdag   |
| ----------  | ----------  |  -----------  | ------------  | ----------- | ----------- |
| sprint 0 `week 21`   | `9:30` <br> meeting kickoff case & vragen |  `9:30` <br> Debrief case inleveren op slack  |   |   |   |
| sprint 1 `week 22`  | `9:00` <br> Eerste demo  |   |   |   | `10:00` <br> Tweede Demo  |
| sprint 2 `week 23`  |   |   |   |   | `10:00` <br> Derde Demo   |
| sprint 3 `week 24`  |   |   |   |   | `10:00` <br> Vierde Demo   |
| sprint 3 `week 24`  |   |   |   | :star: __Demo Final__  |   |

</p>
</details>

__<details><summary> Programma van Eisen </summary>__  
 <p>
   
## Programma van Eisen
* Scan text door middel van een foto
* Geef meerdere suggesties vanuit de api aan de hand van de scan
* Handmatig zoeken door de medicijnlijst
* Geeft de meest recente zoekopdracht op de hoofdpagina
* Genoeg feedback als het scannen te lang duurt
* Zowel voor mobiel als voor laptop beschikbaar
* Offline beschikbaar
* *extra Mogelijkheid om de webapplicatie te downloaden?
* *extra Vind de juiste bijsluiter bij elke zoekresultaat
* *extra mogelijkheid om live te scannen door middel van je camera/webcam
</p>
</details>


## API
Dit project maakt gebruikt van de API die door Voorhoede is aangeleverd.
De volledige documentatie over deze API is te lezen in de volgende [ReadMe](https://github.com/typicode/json-server).

[Link naar de API](https://hva-cmd-meesterproef-ai.now.sh/medicines) 
### Data
```json
[
  {
    "id": Number,
    "registrationNumber": string,
    "name": string,
    "activeIngredient":string
  }
]
```

## Tesseract
Gelukkig bestaan OCR al een tijdje en hebben wij kunnen experimenteren met Tesseract.js. 
Om tesseract te gebruiken moet je dit eerst activeren.

```js
const tesseract = require('node-tesseract-ocr');
async function imageToText(image) {
	const config = {
		lang: "eng",
	}

	return tesseract.recognize(image, config)
		.then(text => text)
		.catch(error => {
			console.log(error.message)
		})
}
```
Deze tesseract draait op de server


## Diagrammen

### Actordiagram
![actor](https://i.imgur.com/wyqiLwB.png)
### Interaction diagram
![interaction](https://i.imgur.com/ITPSneO.png)

## Ontwerpkeuzes

Meddy is een applicatie waarbij gebruikers hun medicijndoosje kunnen scannen en op basis daarvan extra informatie verkrijgen. Hierbij is vooral mijn uitdaging om ervoor te zorgen dat de applicatie niet alleen gemakkelijk te gebruiken is, maar ook betrouwbaar is en dit ook uitstraalt.

Het idee is namelijk dat Meddy een soort hulpmiddel wordt waar gebruikers naar reiken als ze wat informatie willen over een medicijn. En een vriendelijke hulpmiddel zijn die het gevoel geven dat ze er altijd voor je zijn, en aan wie je ook graag wat wilt vragen

* vriendelijke
* zorgzame (caring)
* betrouwbare

### Styleguide
Voor Meddy heb we gekozen om een simpele styleguide op te zetten, zodat we er tijdens het developen gemakkelijk naar kunnen refereren..

![typo](https://imgur.com/IcVziG4.png)
![maincolor](https://imgur.com/gYdf5pF.png)
![colorpallet](https://imgur.com/7TWBoyo.png)

#### Kleurenpalet
We hebben voor dit project gekozen voor de kleur teal (blauw/groen) als hoofdkleur en als accent hebben we gekozen voor een wat zachte roze/rode kleur. Blauw staat dus voor het vertrouwen en de groene tint staat voor gezondheid/welzijn en roze/rode voor het zorgzame gedeelte van de applicatie.
Nadat we de kleuren voor de applicatie had gekozen zijn we begonnen met een simpele opzet van een styleguide in Figma. Dit is dan ook het begin van de design system, zodat het ontwerp consistent blijft en het makkelijker is om samen te werken.

### Ontwerpen

#### Logo

![logomeddy](https://imgur.com/KGo32zN.png)

Omdat de application werkt met medicijnen wilden we niet het gevoel wekken van ziekenhuis of apotheek. Het is een helper om de juiste medicijn te vinden. Meddy geeft een speels gevoel maar ook een personage die jouw er doorheen helpt. Ons logo heeft daarom een vorm van een hart en geeft de gebruiker een betrouwbaar en veilig gevoel.

Naast dat het een vorm van een hart heeft, is het ook een pil die geopend is met het idee dat je informatie uit de medicijn haalt. En gebruikers dus informatie over hun medicijn kunnen verkrijgen op een betrouwbare en vriendelijke manier.

#### Mobile first

De applicatie is zo ontworpen om onderweg gebruikt te kunnen maken van de medicijn scanner. Zo zorgt Meddy ervoor dat de gebruiker niet langer hoeft te wachten op bepaalde informatie. 

Voor het project medicijn scanner hadden wij een aantal ideeën waaronder:
* Live scanning
* Foto scannen

__Live scanning__

Een van onze eerste ideeën was om een live scanner te maken. Waar het gemakkelijker voor de gebruiker is om te zien of hetgeen dat ze voor de camera houden ook gelezen kan worden. Er is dus vrijwel meteen feedback voor gebruikers.
Hier hebben wij ook een paar schermen voor ontworpen, dit is een eerste versie.

![mockup1](https://imgur.com/r9xiUtE.png)

Tijdens het ontwerpen kwamen we al gauw achter dat deze versie vrijwel afhankelijk zal zijn van Javascript. En hebben we ook gekeken naar het uploaden van een afbeelding en dit op de server af te vangen.

Hiervoor hebben we een aantal schermen ontworpen. Het idee is dat de gebruiker een foto kan uitkiezen die vervolgens meteen wordt gescand. Dit werd al gauw onduidelijk en het geeft het de gebruiker minder controle over wat er gebeurt.

Aan de hand van de feedbackgesprekken hebben we er ook gekozen om het in 2 stappen op te breken. Waardoor de gebruiker eerst een foto kiest en vervolgens de optie krijgt om de foto te scannen.

![mockup2](https://imgur.com/d0bb5Qu.png)

_Scherm 1 - Home_

De primaire actie bevindt zich op het bovenste gedeelte van de applicatie. Daarom hebben we gekozen om twee derde van het scherm hiervoor te gebruiken. En een derde is voor het bijhouden van recent gescande medicijnen, zodat de gebruiker dit later weer opnieuw kan bekijken.
Voor de hoofdfunctionaliteit hebben we gekozen voor een contrasterende kleur, zodat het wat meer opvalt en de gebruikers aandacht trekt. Ook hebben we zoveel mogelijk rekening gehouden met de hoeveelheid kleurcontrast.

_Scherm 2 - Kies een foto_

De upload stappen zijn vrij simpel gehouden, zodat de gebruiker kan focussen op een hoofdactie per pagina. Het minimale wat ze nodig hebben laten we zien. Als eerst kunnen ze ervoor kiezen om een foto te maken of om er een uit te kiezen.

_Scherm 3 - Foto gekozen_

Nadat een foto uitgekozen is laten we pas de scan button zien. 

_Scherm 4 - Foto scannen met resultaat_

Op het moment dat er informatie gevonden is komt er een soort popup naar boven met een transitie. Om de gebruikers aandacht te trekken maar ook om te laten zien dat er nieuwe informatie beschikbaar is. Ook hebben we ervoor gekozen omdat er net te weinig informatie is voor een hele pagina.
Naast de popup over de medicijn krijgt de gebruiker ook de tekst die gescand is uit de foto te zien. Die zit achter de popup voor als ze het willen bekijken.

_Scherm 5 - Foto scannen zonder resultaat_

Als gebruikers een foto uploaden die of van slechte kwaliteit is of niet gelezen kan worden, willen we feedback geven. Om gebruikers te helpen met het achterhalen wat er fout is gegaan. In dat geval zijn er twee soorten scenario’s:

Scenario 1: De foto is niet duidelijk en er kan geen tekst worden gevonden.

Scenario 2: De foto is duidelijk, maar de medicijn kan niet gevonden worden.

Bij beide scenario's willen we de gebruiker zo snel mogelijk feedback geven. In de eerste scenario willen we gebruikers meteen laten weten er is geen tekst gevonden, zodat ze niet onnodig moeten wachten tot er een medicijn wordt gezocht.

## Applicatie

### Tesseract 
Tesseract is een van de mogelijke bibliotheek om dit doel te behalen. Er zijn veel meer andere met meer complexiteit natuurlijk. Tesseract was bedoeld voor enkele actie en hebben daarom gekozen om het niet moeilijker te maken. Optical character recognition is een nieuw onderwerp maar door een goede documentatie is het binnen enkele dagen opgezet. 
De moeilijkheid was er snel af, en hebben ons daarom niet gefocused om het te optimaliseren. Alleen wel veel gekeken naar hoe het wordt afgehandeld als er foute bestanden worden toegevoegd. Het grootste werk lag aan de errors afhandelen en op een veilige manier terug te gaan. 

### Pakketten

Dit project maakt gebruik van verschillende dependencies om tot een geheel te komen.
* Express // Deze applicatie draait via een server
* Fuzzy search //Voor de zoekfunctie maken we gebruik van fuzzy search
* Multer // Multer zorgt voor het uploaden van foto’s
* Node tesseract ocr // Tesseract wordt gebruikt om teksten uit foto’s af te lezen
* String similarity // Hiermee vergelijken wij twee teksten met elkaar en geven dan de beste resultaat
* EJS // Template engine om data te renderen
* Session // Opslaan van medicijnen na het scannen

### Privacy
<details> <summary>__Lees volledige onderzoek__</summary>
	
Naar aanleiding van de discussie over privacy aan het eind van het vorige blok met real time web, was dit project het perfecte project waar we dit kunnen toepassen. We hebben hier namelijk te maken met gevoelige data.

Dit leidde tot een onderzoek naar, op wat voor manieren we afbeeldingen tijdelijk bij konden houden zonder echt iets op te slaan. Daar komt ook nog bij dat we gebruik maken van een package genaamd node-tesseract-ocr voor OCR.
Aangezien medicijngebruikers vaak dezelfde medicijn gebruiken wilden wij het gemakkelijker maken door het medicijn beschikbaar te maken bij de volgenden app bezoek.

Om het gemakkelijk voor de gebruiker te maken om informatie te vinden van hun medicijn, zodat ze niet elke keer hun medicijn hoeven te scannen. De kans is namelijk groot dat ze vaak dezelfde medicijn gebruiken.

#### Onderzoek

__Localstorage vs Cookies vs Sessions__

We hebben er gekozen om het meest recente gescande data te bewaren. Alleen de manier waarop was nog onduidelijk. Wat we wel wisten was dat we gebruikers niet willen verplichten om in te loggen, dus verviel de optie voor de database weg. Dan blijven local storage en cookies over. Om achter te halen wat voor ons de beste optie was hebben wij onderzoek verricht naar de verschillen en voor welke doeleinden ze bedoeld zijn.

* later tijdstip kunnen bekijken
* server side

#### Wat is het verschil tussen local storage en cookies
Volgens het artikel van [Anum Siddiqui](https://medium.com/datadriveninvestor/cookies-vs-local-storage-2f3732c7d977#:~:text=Cookies%20and%20local%20storage%20serve,you%20more%20to%20work%20with.) zit het verschil voornamelijk in de manier waarop je het wilt gebruiken. Ze hebben namelijk andere doeleinden, local storage wordt client side gelezen en cookies daarentegen worden voornamelijk server side gelezen.

#### Wat is het verschil tussen local storage en cookies _en sessions_
Op [Paulund](https://paulund.co.uk/local-storage-vs-session-storage-vs-cookie-storage) is een mooi overzicht te zien wat de verschillen zijn tussen de local storage, cookies en sessions. Ook uit dit artikel is het al gauw duidelijk dat er twee groepen zijn, client side of server side. Sessions behoren tot de client side groep.

#### Cache en local storage
Caching en local storage lijken hetzelfde, maar toch zit er een [verschil](https://stackoverflow.com/questions/43519890/what-is-the-difference-between-local-storage-and-cache-in-the-browser#:~:text=What%20is%20the%20difference%20between%20local%20storage%20and%20cache%20in%20the%20browser%3F,-web%20google%2Dchrome&text=I%20know%20that%20cache%20is,stores%20in%20key%20value%20format.) in. Cache wordt gebruikt om bestanden te bewaren/onthouden en local storage wordt gebruikt om data te bewaren. Ook is het zo dat je als developer bijna tot geen controle hebt over de cache en met local storage heb je dat wel. Je kunt namelijk de local storage legen met behulp van javascript.

extra bronnen:
* [Verschil tussen cache en cookies - techblogout](https://medium.com/techblogout/whats-the-difference-between-cache-and-cookies-53e7f4f094bb)
* [cache en local storage - quora](https://www.quora.com/Should-I-use-localStorage-to-cache-assets)

#### Foto’s
Naast het opslaan van de informatie over de gescande medicijn hebben we ook onderzocht op welke manier we dit het beste konden doen. Een paar manieren die we tegenkwamen waren: 
tmp (temporarly) map, waar we tijdelijk foto’s bijhouden en vervolgens verwijderen.
memoryStorage, hierbij kun je tijdelijk bestanden bijhouden

</details>

#### Samenvatting

In eerste instantie was de keuze tussen local storage en cookies, maar tijdens het onderzoeken kwam dus sessions erbij. Local storage viel al gauw af, we renderen op dit moment de pagina's server side. 

Uiteindelijk is er gekozen voor sessions, omdat het vrij gevoelige data is waar we mee werken wouden we dat niet ergens opslaan. De sessions worden dus niet op de server opgeslagen, maar in de browser van de gebruiker en verwijderd op het moment dat ze hun browser afsluiten. Wat ervoor zorgt dat wij niks hoeven bij te houden van de gebruiker.

Daarnaast hebben we ook gekeken naar foto’s hier werd al gauw duidelijk dat memory storage de beste keuze was voor wat wij willen bereiken. Alleen liepen we tegen het probleem aan dat node-tesseract-ocr geen base64 string kon lezen. Tesseract.js kon dat wel en met wat extra tijd zouden we hier meer in kunnen verdiepen.

## Wensen

Als dit project nog een paar maanden door zouden gaan hebben wij natuurlijk meer ideeën om het helemaal af te maken. Het liefst hadden we de optie kunnen geven om live een scan uit te voeren door de camera aan te zetten en zoeken. Hierbij was er dan een doos aanwezig waarbij wordt aangegeven waar de focus van de camera ligt. Dit leek ons een goede manier om direct een medicijn te ontvangen. Niet alleen dat, hierdoor hoeven wij dan ook geen foto’s op te slaan en gaat het direct uit de server of client.

Het volgende wat we ook zouden willen toevoegen is door de zoekfunctie slimmer maken. Zoeken op nummers of een automatische suggesties. Hierdoor hoeft de gebruiker dan niet het medicijn volledig in te typen. Medicijn kunnen namelijk moeilijk spelling bevatten.

Voor de error handling hadden we graag meer feedback willen geven aan de gebruiker. Als er een foto is zonder text dan hadden we direct al feedback kunnen geven dat de foto geen tekst bevat. Dan hoeven ze niet te wachten op de loading state om vervolgens geen data te krijgen.

Als laatste zouden we graag de applicatie slimmer maken door het sneller te laten denken en sneller in bepaalde database van zijn eigen cluster te laten zoeken. We hebben gezien dat dit mogelijk is maar door tijdgebrek konden we dit niet implementeren. Ook gaat alles via een server en hadden dit graag willen omtoveren naar de browser.


## Conclusie

Het project heeft zijn goede en slechte kanten, zo hebben wij snel OCR kunnen toepassen en hebben wij op een andere manier onszelf uitgedaagd. Door te focussen op de interface en gebruikers op verschillende manieren te helpen om de juiste medicijn te verkrijgen.
Dit prototype heeft veel gekeken naar betrouwbaarheid maar ook hoe oogt op de gebruikers op verschillende devices. Omdat de content minimaal was konden wij veel invullen op onze eigen manier. De opdracht was alleen ervoor zorgen dan de gebruiker door middel van OCR de juiste medicijn konden krijgen.
Er zijn nog veel onderwerpen waar wij graag dieper in hadden willen duiken zoals, privacy en snelheid van de applicatie. Wij hebben het allemaal in de server laten draaien maar het had ook via die browser kunnen lopen.  
Desalniettemin had dit project een doel om gebruikers te helpen met het vinden van hun medicijn en vooral met een betrouwbare interface. We hebben daarom ons doel en de criteria van het project niet opzij gezet en hebben onszelf ondertussen genoeg uitgedaagd in het project.


## Source
* [Tesseract](https://github.com/tesseract-ocr/)
* [Stackoverflow](http://stackoverflow.com/)
* [Feather open source icons](https://feathericons.com/)
* [Undraw](https://undraw.co/illustrations)

## Credits
* [Damian](https://github.com/damian1997) // Multiple help on tesseract problems
* Janno // Feedback on error handling
* Laurens // Checkups
* [Bas](https://github.com/aaraar) // Explained how branches work
