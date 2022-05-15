# PROIECT Cloud Computing


### Buică Elena-Alexandra, grupa 1117, SIMPRE, an I<br />

### Link video prezentare proiect: https://www.youtube.com/watch?v=JBY3SfJJHZ0


## Link aplicație: https://young-depths-04473.herokuapp.com/ 

<br />

### Introducere și descrierea problemei

Aplicația propusă este o aplicație web bazată pe tehnologiile Node JS și React. Stocarea datelor (Google Cloud Platform) și deploy-ul aplicației (Heroku) se fac în cloud. Aplicația funcționează ca un dicționar în limba engleză, utilizatorul având posibilitatea de a căuta cuvinte pentru a afla definiții, tipul de parte de vorbire și fonetica.

Aplicația are trei secțiuni: o listă cu numele utilizatorilor și cuvintele căutate anterior în dicționar, o secțiune de căutare implementată ca un formular și o listă care prezintă informațiile returnate de API-ul dicționar pentru cuvintele căutate.

La apăsarea butonului Search apare o alertă prin care utilizatorul este anunțat că dicționarul a returnat cu succes detalii despre cuvânt (definiție, parte de vorbire, fonetica) sau că nu s-a putut returna nicio informație. (după caz)

În cadrul aplicației utilizatorul își poate adăuga numele și e-mailul, întrucât într-o implementare viitoare acesta ar putea primi rezultatul căutării în dicționar pe adresa de mail. (Nu am putut crea un cont pe platforma SendGrid).

![](https://github.com/alexandrabuica/PROIECT-CC/blob/Frontend_Setup/Capture1.PNG)

### API

API-ul folosit pentru a implementa funcționalitățile de back-end ale aplicației este unul gratis, disponibil online la următorul link: https://dictionaryapi.dev/.
<br />
API-ul are următoarea sintaxă:
https://api.dictionaryapi.dev/api/v2/entries/en/WORD
unde WORD substituie cuvântul pe care utilizatorul dorește să îl caute în dicționar.
API-ul returnează un obiect complex de tip JSON, din care am extras câteva proprietăți: definiția, partea de vorbire și fonetica.
  
  
### Flux de date
  
Am creat în acest sens rute de GET, POST, PUT, DELETE care asigură comunicarea dintre back-end si baza de date.
Baza de date este o instanță de tip SQL în cadrul Google Cloud și conține două tabele: tabela searches (în care se stochează numele user-ului, mail-ul și cuvântul căutat de acesta) și tabela words (în care se stochează cuvintele, definițiile, părțile de vorbire și fonetica obținute ca răspuns de la API).

Mai jos se pot observa rutele de GET și POST care permit afișarea unui istoric al căutărilor utilizatorilor în aplicație.<br>

  
    router.get('/', (req, res) => {
        connection.query("SELECT * FROM searches", (err, results) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }

            return res.json({
                searches: results,
            })
        })
    });

    router.post("/", (req, res) => {
          const {
              userName,
              userMail,
              wordSearch
          } = req.body;

          if (!userName || !userMail || !wordSearch) {
              return res.status(400).json({
                  error: "All fields are required",
              })
          }

        connection.query(`INSERT INTO searches (userName, userMail, wordSearch) values (${mysql.escape(userName)}, ${mysql.escape(userMail)}, ${mysql.escape(wordSearch)})`, (err, results) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }

            return res.json({
                results,
            })
        })
    });
  
Pentru a obține datele necesare de la API-ul folosit am implementat funcția <b>getWordDef</b>, ce returnează un obiect JSON:
  
    async function getWordDef(word){
        try {
            let response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            let wordMeanings = [];
            let wordPartsOfSpeech = [];
            let meaningsLength = response.data[0].meanings.length;
            for (let i=0; i<meaningsLength; i++) {
                wordMeanings.push(response.data[0].meanings[i].definitions[0].definition)
                wordPartsOfSpeech.push(response.data[0].meanings[i].partOfSpeech)
            }
            let phonetics = response.data[0].phonetics[1].text;

            return {
                _wordMeanings: wordMeanings,
                _wordPartsOfSpeech: wordPartsOfSpeech,
                _wordPhonetics: phonetics
            }
        } catch (err) {
            console.warn(err)
        }
    }

                                            
Similar, am implementat metode de GET și POST pentru a stoca și regăsi cuvinte în tabela words din baza de date.

![](https://github.com/alexandrabuica/PROIECT-CC/blob/Frontend_Setup/Capture2.PNG)


În urma implementării metodei GET folosind API-ul de dicționar - URL-ul de back-end rezultat din deploy pe Heroku + cuvântul căutat (i.e. "bird") - putem observa răspunsul (obiect de tip JSON) primit:

![](https://github.com/alexandrabuica/PROIECT-CC/blob/Frontend_Setup/Capture5.PNG)

Tabelele și câmpurile din baza de date:
![](https://github.com/alexandrabuica/PROIECT-CC/blob/Frontend_Setup/Capture3.PNG) 
![](https://github.com/alexandrabuica/PROIECT-CC/blob/Frontend_Setup/Capture4.PNG)

### Referințe
- https://gurita-alexandru.gitbook.io/cloud-computing-2022-simpre/seminar-1/set-up-back-end-local
- https://gurita-alexandru.gitbook.io/cloud-computing-2022-simpre/seminar-3/construire-stilizare-front-end
- https://gurita-alexandru.gitbook.io/cloud-computing-2022-simpre/seminar-3/deploy-heroku

