# BiConnect

> Aplikacja wspierająca towarzystwo biznesowe.

Aplikacja frontendowa do zarządzania spotkaniami Towarzystwa Biznesowego.
Umożliwia dodawanie nowych spotkań, a w ramach nich wystąpień poszczególnych członków.
Każde wystąpienie składa się z opisu działalności, opisu potrzeb i rekomendacji.


### Instrukcja obsługi

1. Wejdź w panel „Spotkania”
2. Wybierz istniejące spotkanie lub dodaj nowe z wybraną datą
3. Możesz dodać nowe wystąpienie lub edytować istniejące - wybór w panelu po lewej stronie
4. Treść wystąpienia wprowadzana jest w panelu po prawej stronie
  1. Osobę możesz wybrać z listy lub dodać nową (jako gościa)
  2. Po wprowadzeniu treści wystąpienia należy je zapisać
5. Po spotkaniu możesz wygenerować tekstowe podsumowanie spotkania - notatkę
6. Po spotkaniu możesz wysłać maile do osób występujących z podsumowaniem ich wystąpienia
oraz linkiem do formularza umożliwiającego edycję / zatwierdzenie wystąpienia.

### Technologie

[Vue.js](https://vuejs.org/)

Szczegółowy spis znajduje się w pliku `package.json`

### Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
