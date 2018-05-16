\c quotes_dev_views;
DROP TABLE IF EXISTS quotes;
DROP TABLE IF EXISTS genres;


CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  genre VARCHAR(255)
);
CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  content TEXT,
  author VARCHAR(255),
  genre_id INTEGER REFERENCES genres(id),
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX ON genres (genre);
CREATE INDEX ON quotes (author);
