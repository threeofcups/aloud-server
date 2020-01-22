-- sudo -u postgres psql -f schema.sql

-- delete in production
ALTER USER postgres with encrypted password 'postgres';

DROP DATABASE IF EXISTS aloud;
CREATE DATABASE aloud;
\c aloud;

CREATE TABLE users (
  id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) NOT NULL,
  password CHAR(50),
  email VARCHAR(50) NOT NULL,
  name_display VARCHAR(64),
  bio TEXT,
  url_image TEXT,
  PRIMARY KEY (id)
);

CREATE TYPE setting AS ENUM('private', 'public');
CREATE TABLE recordings (
  id INT GENERATED ALWAYS AS IDENTITY,
  id_user INT references users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  url_recording TEXT NOT NULL,
  published setting,
  speech_to_text TEXT,
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE collections (
  id INT GENERATED ALWAYS AS IDENTITY,
  id_user_creator INT references users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  count_recordings INT NOT NULL,
  url_image TEXT,
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE collections_recordings (
  id_collection INT references collections(id),
  id_recording INT references recordings(id)
);

CREATE TABLE users_saved_collections (
  id INT GENERATED ALWAYS AS IDENTITY,
  id_user INT references users(id),
  id_collection INT references collections(id),
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE users_saved_recordings (
  id INT GENERATED ALWAYS AS IDENTITY,
  id_user INT references users(id),
  id_recording INT references recordings(id),
  created_at TIMESTAMP NOT NULL
);


/*

working users insertion
insert into users(bio, email, username, password, url_image, name_display)
values('punk-turned-pop-turned-experimental spacescapes', 'bjork@space.io', 'bjork575', 'babyGiraffe', 'https://bit.ly/2R9TPv9', 'bjork');

working users query
select * from users where username = 'bjork575';

insert into recordings(id_user, title, description, url_recording, created_at, published, speech_to_text) 
values('1', 'baby martian', 'newborn baby martian song', 'marsbb.cloudinary', now(), 'public', 'i am martian baby roar loud space fun bjork is great');


*/

-- timestamp functions
-- now()
-- ex format. 2020-01-21 11:51:36.310508
-- current_date;
-- current_time;
-- current_timestamp;