import React from 'react';
import './info.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
const ReactMarkdown = require('react-markdown');

const hallintoelimet = url => `
# Hallintoelimet

P.E. Svinhufvudin muistosäätiö
Hallintoneuvosto 2018–2019

Toimitusjohtaja Jyri Häkämies (pj)

Hovioikeuden presidentti Jussi Kivinen (vpj)

Professori Aura Korppi-Tommola (vpj)

Alivaltiosihteeri, eläkkeellä Heikki Aaltonen

Prikaatikenraali evp Pentti Airio

Puheenjohtaja Pirjo Björk

Puheenjohtaja Timo Erkkilä

Professori emer. Seikko Eskola

Europarlamentaarikko Heidi Hautala

Diplomi-insinööri Matti Hirvikallio

Kansanedustaja Anneli Kiljunen

Filosofian tohtori Keijo K. Kulha

Dosentti Lasse Laaksonen

Dosentti Jari Leskinen

Ministeri Jari Lindström

Professori emer. Ohto Manninen

Filosofian tohtori Vesa Määttä

Kulttuurineuvos Eero Niinikoski

Dosentti Jyrki Paaskoski

Valtiopäiväneuvos Mikko Pesälä

Maakuntaneuvos Timo Puttonen

Dosentti Hannu Rautkallio

Dosentti Heikki Roiko-Jokela

Yrittäjä Lea Sairanen

Vuorineuvos Ebbe Sommar

Kunnanjohtaja Anne Ukkonen

Yhteiskuntatieteiden maisteri Anneli Taina

Pormestari Jan Vapaavuori

Lehdistöneuvos Jyrki Vesikansa

Professori Mikko Viitasalo

  

Hallitus 2018–2019


Professori Martti Häikiö (pj)

Toimittaja Viivi Berghem

Dosentti Mikko Karjalainen

Dosentti Marko Paavilainen

Varatuomari Eino Svinhufvud


Johtaja Marjo Timonen

Toimittaja Kalle Virtapohja

Filosofian tohtori Maritta Pohls, asiamies, taloudenhoitaja

`;

const saannot = url => `
# Säännöt

1 §

Säätiön nimi on ”P.E. Svinhufvudin muistosäätiö – P.E. Svinhufvuds minnesstiftelse” ja sen kotipaikka on Helsingin kaupunki. Säätiö on kaksikielinen.

2 §

Säätiön tarkoituksena on vaalia ja kehittää kansamme keskuudessa isänmaallisia perinteitä ja niissä merkeissä säilyttää P.E. Svinhufvudin muisto ja elämäntyö jälkipolville.

3 §

Tarkoituksensa toteuttamiseksi säätiö mm.:

-   jakaa stipendejä ja apurahoja itsenäisyysajan ja sitä edeltäneen ajan historian tutkimiseksi sekä siihen keskeisesti liittyvän P.E. Svinhufvudin osuuden tunnetuksi tekemiseksi;
    
-   julkaisee tai avustaa sanotunlaisen tutkimuksen julkaisemista;
    
-   ja vaalii muullakin arvokkaalla tavalla hänen muistonsa säilyttämistä tuleville sukupolville.
    

4 §

Säätiön peruspääomana, jota ei saa vähentää, on säädekirjassa mainittu 500.000 vanhan markan suuruinen pohjarahasto.

Säätiö on oikeutettu vastaanottamaan lahjoja, testamentteja ja avustuksia sekä muillakin laillisilla keinoilla kartuttamaan omaisuuttaan. Säätiön rahavarat on sijoitettava turvaavasti ja tuottavasti.

Säätiö voi myös hankkia ja omistaa kiinteistöjä.

5 §

Säätiöllä on kaksi toimielintä: hallintoneuvosto ja hallitus. Neuvosto täydentää itseään.

Hallintoneuvostoon kuuluu sen puheenjohtaja varapuheenjohtajat mukaan luettuina vähintään 15 ja enintään 30 jäsentä, jotka valitaan kolmeksi vuodeksi kerrallaan yhden kolmasosan jäsenistä ollessa vuosittain erovuorossa. Ensimmäisellä kerralla erovuoron ratkaisee arpa. Sama henkilö voidaan valita hallintoneuvostoon uudelleen kaikkiaan yhdeksäksi vuodeksi peräkkäin. Jäsenen erotessa tai kuollessa hänen tilalleen voidaan valita uusi jäsen jäljellä olevaksi toimikaudeksi.

Hallintoneuvoston puheenjohtaja ja kaksi varapuheenjohtajaa valitaan kolmeksi vuodeksi kerrallaan. Heidät voidaan valita uudelleen kaikkiaan yhdeksäksi vuodeksi peräkkäin.

Hallituksen puheenjohtaja ja jäsen ei voi saman aikaisesti kuulua hallintoneuvostoon.

Hallituksen puheenjohtaja valitaan kolmeksi vuodeksi kerrallaan. Hänet voidaan valita korkeintaan kuudeksi vuodeksi peräkkäin.

Kuusi hallituksen jäsentä valitaan kolmeksi vuodeksi kerrallaan yhden kolmasosan jäsenistä ollessa vuosittain erovuorossa. Ensimmäisellä kerralla erovuoron ratkaisee arpa. Jäsenet voidaan valita uudelleen, kuitenkin vain kuudeksi vuodeksi peräkkäin.

Hallituksen puheenjohtajan tai jäsenen erotessa tai kuollessa hänen tilalleen voidaan valita uusi henkilö jäljellä olevaksi toimikaudeksi.

6 §

Hallintoneuvosto kokoontuu varsinaiseen kokoukseen vuosittain 15. joulukuuta tai sitä lähellä olevana, hallituksen määräämänä päivänä ja valitsee siinä erovuoroisten tilalle hallintoneuvoston puheenjohtajan ja kaksi varapuheenjohtajaa, hallintoneuvoston jäsenet, hallituksen puheenjohtajan ja jäsenet sekä vuosittain tilintarkastajan ja varatilintarkastajan. Vuosittain voidaan lisäksi valita uusia hallintoneuvoston jäseniä, jos sen jäsenistön enimmäismäärä ei ylity.

Kokouksessa esitetään vuosikertomus, tilinpäätös ja tilintarkastajan lausunto, päätetään tilivapauden myöntämisestä ja tilinpäätöksestä mahdollisesti aiheutuvista muista toimenpiteistä, vahvistetaan toimintasuunnitelma ja tulo- ja menoarvio kuluvaa toimintavuotta varten sekä käsitellään muut kokouskutsussa mainitut asiat. Toimintavuosi käsittää ajan 1. lokakuuta – 30. syyskuuta.

Tarpeen vaatiessa voidaan pitää ylimääräisiä hallintoneuvoston kokouksia.

7 §

Kutsun hallintoneuvoston kokoukseen toimittaa hallituksen puheenjohtaja tai hänen estyneenä ollessaan varapuheenjohtaja kirjeellisesti kullekin jäsenelle vähintään kaksi viikkoa ennen kokousta. Kutsussa on mainittava kaikki kokouksessa esille tulevat asiat.

Muut tiedonannot hallintoneuvoston jäsenille toimitetaan samalla tavalla tai sähköpostilla.

8 §

Hallintoneuvosto on päätösvaltainen, kun sen jäsenistä vähintään puolet, puheenjohtaja tai hänen estyneenä ollessaan jompikumpi varapuheenjohtaja mukaan luettuna, on saapuvilla.

Hallintoneuvostossa on jokaisella jäsenellä yksi ääni. Äänten mennessä tasan ratkaisee puheenjohtajan ääni, vaaleissa kuitenkin arpa.

9 §

Hallitus edustaa säätiötä ja hoitaa sen asiat.

Hallitus valitsee keskuudestaan varapuheenjohtajan.

Hallitus on päätösvaltainen, kun vähintään puolet sen jäsenistä, puheenjohtaja tai hänen estyneenä ollessaan varapuheenjohtaja mukaan luettuna, on kokouksessa saapuvilla. Hallituksessa on jokaisella jäsenellä yksi ääni. Äänten mennessä tasan ratkaisee puheenjohtajan ääni, vaaleissa kuitenkin arpa.

Kutsun hallituksen kokoukseen toimittaa sähköpostilla tai kirjeellisesti hallituksen puheenjohtaja tai hänen estyneenä ollessaan varapuheenjohtaja tai sihteeri kullekin jäsenelle vähintään viikkoa ennen kokousta. Kutsussa on mainittava kaikki kokouksessa esille tulevat asiat.

Hallitus valitsee säätiölle sihteerin ja taloudenhoitajan sekä muut tarpeelliset toimihenkilöt. He voivat olla saman aikaisesti hallituksen jäseniä.

10 §

Säätiön nimen kirjoittavat hallituksen puheenjohtaja tai hänen estyneenä ollessaan varapuheenjohtaja, sihteeri ja taloudenhoitaja, aina kaksi yhdessä.

11 §

Säätiö ei suorita kokouspalkkiota, matkakulut kuitenkin korvataan.

12 §

Säätiön tilit päätetään toimintavuosittain. Tilit on marraskuussa annettava tilintarkastajalle, jolle suoritetaan palkkio laskun mukaan.

13 §

Säätiön toimintakertomus, jäljennös tilinpäätöksestä ja tilintarkastajan lausunnosta on vuosittain lähetettävä patentti- ja rekisterihallitukselle ennen helmikuun loppua.

14 §

Hallintoneuvosto voi muuttaa säätiön sääntöjä hallituksen ehdotuksesta, joka on lähetettävä kokouskutsun mukana. Muutos astuu voimaan patentti- ja rekisterihallituksen vahvistettua sen.

15 §

Muutoin on noudatettava mitä säätiölaissa säädetään.
`;

const yleisesittely = url => `
# P.E. Svinhufvudin muistosäätiö – P.E. Svinhufvuds minnesstiftelse

Suomen itsenäisyysjulistuksen ensimmäisen allekirjoittajan, eduskunnan ensimmäisen puhemiehen ja valtionhoitajan, tasavallan presidentin Pehr Evind Svinhufvudin nimeä kantava kaksikielinen säätiö syntyi 1950-luvun alkuvuosina.

Säätiö rekisteröitiin 5.5.1955. Sen tehtävänä on sääntöjen mukaan ”vaalia ja kehittää kansamme keskuudessa isänmaallisia perinteitä ja niissä merkeissä säilyttää P.E. Svinhufvudin muisto ja elämäntyö jälkipolville”. 

Säätiön ensimmäisiä tavoitteita olivat akateemikko Wäinö Aaltosen toteuttaman muistopatsaan pystyttäminen eduskuntatalon eteen ja professori Einar W. Juvan laatiman elämäkerran julkaiseminen. Sittemmin säätiö mm. järjesti teiniseminaareja, joissa asiantuntijat esittelivät Suomen itsenäistymistä ja muuta lähihistoriaa.

Vuosina 2017–2018 säätiön toiminnassa korostuivat Suomen itsenäistymisen satavuotisuus, P. E. Svinhufvudin uuden elämäkerran julkistaminen sekä valmistautuminen [Kotkaniemen](http://www.kotkaniemi.fi/) uudelleen avautumiseen peruskorjauksen jälkeen.

Säätiö järjestää perinteisen 15.12. vietettävän vuosijuhlan ohella myös muita tilaisuuksia ja vaalii muilla tavoin P. E. Svinhufvudin muistoa sekä osallistuu muiden organisaatioiden järjestämiin tilaisuuksiin, jotka sivuavat P. E. Svinhufvudin merkittävää valtiomiesuraa.

Säätiö jakaa vuosittain palkinnon ”Ukko-Pekan hengessä”. Säätiö tukee ja pyrkii käynnistämään Svinhufvudia ja hänen arvomaailmaansa koskevaa tutkimusta, kirjallisuutta ja verkkoaineistoa.

Säätiön hallintoneuvoston puheenjohtajana on toimitusjohtaja Jyri Häkämies ja hallituksen puheenjohtajana professori Martti Häikiö.  Asiamiehenä ja taloudenhoitajana toimii filosofian tohtori Maritta Pohls. Säätiöllä on yhteistyötä mm. Svinhufvud af Qualstadt -sukuyhdistyksen kanssa. Sen puheenjohtajana on suvun päämies, varatuomari Eino Svinhufvud.  

# Yhteystiedot

Puheenjohtaja professori Martti Häikiö

Tehtaankatu 21 B 40, 00140 Helsinki

050 5057 140

martti.haikio@kolumbus.fi

Asiamies tohtori Maritta Pohls

Maininkitie 16 D 55, 02320 Espoo

050 5888 101

[maritta.pohls@tutkimuksenaika.com](mailto:maritta.pohls@tutkimuksenaika.com)

  



`;

//      <h3>{match.params.topicId}</h3>

function Topic({match}) {
  let data;
  switch (match.params.topicId) {
    case 'hallintoelimet':
      data = hallintoelimet;
      break;
    case 'saannot':
      data = saannot;
      break;
    default:
      data = yleisesittely;
  }
  return (
    <div>
      <ReactMarkdown source={data(match.url)} />
    </div>
  );
}

const Info = ({match}) => {
  return (
    <div className="info-container">
      <div className="info-links">
        <h3>
          <Link to={`${match.url}/yleisesittely`}>Yleisesittely</Link>
        </h3>
        <h3>
          <Link to={`${match.url}/saannot`}>Säännöt</Link>
        </h3>
        <h3>
          <Link to={`${match.url}/hallintoelimet`}>Hallinto</Link>
        </h3>
      </div>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <ReactMarkdown source={yleisesittely(match.url)} />}
      />
    </div>
  );
};

export default Info;
