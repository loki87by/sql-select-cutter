# SQL Select cutter

## Техничиские характеристики проекта

* Приложение обрезает те столбцы SQL-выборки, в которых абсолютно все строки is null.
* Если в запросе встречаются символы *, приложение предлагает SQL-запрос, который нужно выполнить чтобы приложение получило данные таблицы из которой берутся все столбцы.
* Если режим копирования "SQL Inserts", приложение выдаст предупреждение сменить его на "CSV".
* Есть возможность фильтрации содержимого столбца по введенному тексту.
* Есть возможность копирования в буфер всех строк столбца.
* Если в результатах есть XML, то при клике на соответствующей ячейке выводится структурированный XML с возможностью копирования его содержимого.
* Если встречается столбец с датой в формате float (в названии столбца должно быть слово "date"), то при наведении курсора на float, подсвечивается дата со временем в строчном формате по текущему часовому поясу.
* Организован глобальный поиск по таблице с автоматическим скроллом к искомому элементу, если он вне видимой области.
* Есть возможность получить ссылку на изначальную или отфильтрованную таблицу для открытия этой таблицы на другом (в том числе мобильном) устройстве.
* Браузер Google Chrome даёт возможность установить приложение в качестве отдельного софта

[Приложение тут](https://loki87by.github.io/sql-select-cutter/)
