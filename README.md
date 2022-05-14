# PROIECT-CC

<b>Introducere și descrierea problemei</b>

Aplicația propusă este o aplicație web bazată pe tehnologiile Node JS și React. Stocarea datelor (Google Cloud) și deploy-ul aplicației (Heroku) se fac în cloud. Aplicația funcționează ca un dicționar, utilizatorul având posibilitatea de căuta cuvinte pentru a afla definiții, tipul de parte de vorbire și fonetica.

Aplicația are trei secțiuni: o listă cu numele utilizatorilor și cuvintele căutate anterior în dicționar, o secțiune de căutare implementată ca un formular și o listă care prezintă informațiile returnate de API-ul dicționar pentru cuvintele căutate.
În cadrul aplicației utilizatorul își poate adăuga numele și e-mailul, întrucât într-o implementare viitoare acesta ar putea primi rezultatul căutării în dicționar pe adresa de mail. (Nu am putut crea un cont de platforma SendGrid).


<b>API</b>

API-ul folosit pentru a implementa funcționalitățile de back-end ale aplicației este unul gratis, disponibil online la următorul link: https://dictionaryapi.dev/ .
API-ul are următoarea sintaxă:
https://api.dictionaryapi.dev/api/v2/entries/en/<word>
unde <word> substituie cuvântul pe care utilizatorul dorește să îl caute în dicționar.
API-ul returnează un obiect complex de tip JSON, din care am extras câteva proprietăți: definiția, partea de vorbire și fonetica.
  
  
<b>Flux de date</b>
  
Am creat în acest sens rute de GET, POST, PUT, DELETE care asigură comunicarea dintre back-end si baza de date.
Baza de date este o instanță de tip SQL în cadrul Google Cloud și conține două tabele: tabela searches (în care se stochează numele user-ului, mail-ul și cuvântul căutat de acesta) și tabela words (în care se stochează cuvintele, definițiile, părțile de vorbire și fonetica obținute ca răspuns de la API).

Mai jos se pot observa rutele de GET și POST care permit afișarea unui istoric al căutărilor utilizatorilor în aplicație.


