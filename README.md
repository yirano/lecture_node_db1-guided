# Introduction to Relational Databases, SQL and Knex

Guided project for Node DB 1 module.

In this project we will cover the basics of `Structure Query Language (SQL)`, `Relational Databases`, and `Knex.js Queries`.

## Prerequisites

- [DB Browser for SQLite](https://sqlitebrowser.org) installed.

## Project Setup

- [ ] fork and clone this repository.
- [ ] **CD into the folder** where you cloned **your fork**.
- [ ] type `npm install` to download dependencies.


## Lecture Notes

Relational Databases - similar to spreadsheets (Spreadsheets on steroids)

Table - Collection of many rows

Row - A single record in that table

Column - A value required for each row

---

### Structured Query Language (SQL)
```sql
SELECT <columns> FROM <table> WHERE <column> = <value>
-- is -- 
SELECT email 
FROM people 
WHERE name = 'Corbin King';
```
- It's convention to uppercase SQL commands
- Don't forget the semi-colon -- that ends the command

### Sorting (ORDER BY)

Ascending sort (ASC): a/b/c/d and 1/2/3/4

Descending sort (DESC): z/y/x/w and 4/3/2/1

---
### Types of Data Language
- Data Query Language (DQL) - Commands asking questions about the data
- Data Manipulation Language (DML) - Commands are creating, updating, and deleting data.
- Data Definition Language (DDL) - Commands for defining the database structure

---

### Data Manipulation Language (DML)

```sql
INSERT INTO <table> (<columns>) VALUES (<values>);
UPDATE INTO <table> SET <column> = <value> WHERE <column> = <value>;
DELETE FROM <table> WHERE <column> = <value>