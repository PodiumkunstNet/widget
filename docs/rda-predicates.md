# RDA Predicates Used

Distinct RDA (Resource Description and Access) predicates referenced in the SPARQL query.

Namespaces:
- `rdaw:` – RDA Work elements (`http://rdaregistry.info/Elements/w/`)
- `rdaa:` – RDA Agent elements (`http://rdaregistry.info/Elements/a/`)

## Predicate Reference

Predicate | Label (RDA) | Description (concise)
--------- | ----------- | ---------------------
[`rdaw:P10004`](https://rdaregistry.info/Elements/w/P10004) | Preferred title of work | Canonical title chosen to identify the work.
[`rdaw:P10053`](https://rdaregistry.info/Elements/w/P10053) | Form of work | Categorical form/genre class of the work.
[`rdaw:P10060`](https://rdaregistry.info/Elements/w/P10060) | Date of work | Earliest associated date (creation/origin span).
[`rdaw:P10061`](https://rdaregistry.info/Elements/w/P10061) | Place of origin of work | Geographical place where the work originated.
[`rdaw:P10064`](https://rdaregistry.info/Elements/w/P10064) | Intended audience | Audience or user group the work is aimed at.
[`rdaw:P10066`](https://rdaregistry.info/Elements/w/P10066) | Language of work | Language(s) in which the work is expressed.
[`rdaw:P10069`](https://rdaregistry.info/Elements/w/P10069) | Key or mode | Musical key/mode applicable to a musical work (if musical; else rarely used).
[`rdaw:P10205`](https://rdaregistry.info/Elements/w/P10205) | History of work | Note summarizing historical background of the work.
[`rdaw:P10219`](https://rdaregistry.info/Elements/w/P10219) | Identifier for work | Alphanumeric string assigned to uniquely identify the work.
[`rdaw:P10223`](https://rdaregistry.info/Elements/w/P10223) | Other distinguishing characteristic of work | Additional distinguishing attribute not covered by specific elements.
[`rdaw:P10287`](https://rdaregistry.info/Elements/w/P10287) | Variant title of work | Alternative title form differing from the preferred title.
[`rdaw:P10315`](https://rdaregistry.info/Elements/w/P10315) | Medium of performance (representative) | Representative medium of performance for a musical work.
[`rdaw:P10330`](https://rdaregistry.info/Elements/w/P10330) | Keyword / index term of work | Uncontrolled or controlled topical/index term associated with the work.
[`rdaw:P10351`](https://rdaregistry.info/Elements/w/P10351) | Representative expression attribute | Expression-level characteristic applied representatively to identify the work.
[`rdaw:P10353`](https://rdaregistry.info/Elements/w/P10353) | Coverage of work | Spatial or temporal coverage scope of the work’s content.
[`rdaw:P10437`](https://rdaregistry.info/Elements/w/P10437) | Summarization of content | Brief textual summary/abstract of the work’s content.
[`rdaa:P50385`](https://rdaregistry.info/Elements/a/P50385) | Preferred name of agent | Authorized (preferred) form of name for an agent (person, family, corporate body).

## Notes
1. Labels and concise descriptions provided for internal documentation; verify against the RDA Registry for authoritative wording before external publication.
2. Non‑RDA predicates in the original query (e.g. `dcterms:description`, `dcterms:source`, `skos:prefLabel`) are excluded here.
3. If stricter provenance is required, augment each row with the RDA Registry definition literal via an automated fetch script.
