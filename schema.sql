-- sudo -u postgres psql -f schema.sql

-- delete in production
ALTER USER postgres with encrypted password 'postgres';

DROP DATABASE IF EXISTS localhost_aloud;
CREATE DATABASE localhost_aloud;
\c localhost_aloud;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id INT GENERATED ALWAYS AS IDENTITY,
  id_google TEXT NOT NULL,
  email VARCHAR(100) NOT NULL,
  name_family VARCHAR(50) NOT NULL,
  name_first VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  url_image TEXT,
  bio TEXT,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS recordings CASCADE;
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

DROP TABLE IF EXISTS collections CASCADE;
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

DROP TABLE IF EXISTS collections_recordings CASCADE;
CREATE TABLE collections_recordings (
  id_collection INT references collections(id),
  id_recording INT references recordings(id)
);

DROP TABLE IF EXISTS users_saved_collections CASCADE;
CREATE TABLE users_saved_collections (
  id INT GENERATED ALWAYS AS IDENTITY,
  id_user INT references users(id),
  id_collection INT references collections(id),
  created_at TIMESTAMP NOT NULL
);

DROP TABLE IF EXISTS users_saved_recordings CASCADE;
CREATE TABLE users_saved_recordings (
  id INT GENERATED ALWAYS AS IDENTITY,
  id_user INT references users(id),
  id_recording INT references recordings(id),
  created_at TIMESTAMP NOT NULL
);


-- timestamp functions
-- now()
-- ex format. 2020-01-21 11:51:36.310508
-- current_date;
-- current_time;
-- current_timestamp;


-- sample data

-- insert into users(id_google, email, name_family, name_first, name, username, url_image, bio) values('1', 'bjork@gmail.com', 'Guðmundsdóttir', 'Björk', 'Björk Guðmundsdóttir', 'bjork', 'https://collectionimages.npg.org.uk/large/mw195253/Bjrk.jpg', 'A mote of dust suspended in a sunbeam shores of the cosmic ocean rich in mystery colonies rich in heavy atoms worldlets? Kindling the energy hidden in matter take root and flourish emerged into consciousness finite but unbounded are creatures of the cosmos network of wormholes? Descended from astronomers stirred by starlight two ghostly white figures in coveralls and helmets are soflty dancing two ghostly white figures in coveralls and helmets are soflty dancing stirred by starlight something incredible is waiting to be known.');
-- insert into users(id_google, email, name_family, name_first, name, username, url_image, bio) values('2', 'beyonce@gmail.com', 'Knowles-Carter', 'Beyoncé', 'Beyoncé Giselle Knowles-Carter', 'beyonce', 'https://i.pinimg.com/originals/dd/23/b2/dd23b2f4478e17d671cb1f30f561912f.jpg', 'Tesseract billions upon billions bits of moving fluff the carbon in our apple pies citizens of distant epochs science. Apollonius of Perga gathered by gravity kindling the energy hidden in matter courage of our questions invent the universe rich in heavy atoms. Rings of Uranus concept of the number one Sea of Tranquility the sky calls to us a very small stage in a vast cosmic arena astonishment?');
-- insert into users(id_google, email, name_family, name_first, name, username, url_image, bio) values('3', 'eileen@gmail.com', 'Myles', 'Eileen', 'Eileen Myles', 'emyles', 'https://images.squarespace-cdn.com/content/v1/55560c21e4b0d9e3a586c000/1562085006467-OVQ9VGD9TZXWTF7X85A0/ke17ZwdGBToddI8pDm48kI20aFpO2MO7J_ezceRbUsN7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UaoGZB7hMTo9QK8ncUvEXz0Ich3vDgsmUHnX72OrdDRovmShHcaEiFRh7O_DJxq26g/myles9.jpg?format=2500w', 'The carbon in our apple pies across the centuries globular star cluster at the edge of forever Euclid worldlets? Dispassionate extraterrestrial observer astonishment hearts of the stars a mote of dust suspended in a sunbeam Drake Equation Sea of Tranquility. Extraordinary claims require extraordinary evidence gathered by gravity made in the interiors of collapsing stars courage of our questions star stuff harvesting star light encyclopaedia galactica. Descended from astronomers shores of the cosmic ocean made in the interiors of collapsing stars not a sunrise but a galaxyrise vanquish the impossible vanquish the impossible.');
-- insert into users(id_google, email, name_family, name_first, name, username, url_image, bio) values('4', 'jarman@gmail.com', 'Jarman', 'Derek', 'Derek Jarman', 'jarman', 'http://s3.amazonaws.com/quietus_production/images/articles/14612/jarman_garden_1393586626_crop_550x347.jpg', 'Hypatia quasar light years a billion trillion network of wormholes made in the interiors of collapsing stars. Courage of our questions muse about vastness is bearable only through love culture great turbulent clouds two ghostly white figures in coveralls and helmets are soflty dancing. Dream of the minds eye a mote of dust suspended in a sunbeam vastness is bearable only through love a very small stage in a vast cosmic arena a very small stage in a vast cosmic arena hundreds of thousands?');
-- insert into users(id_google, email, name_family, name_first, name, username, url_image, bio) values('5', 'lizzo@gmail.com', 'Jefferson', 'Melissa', 'Lizzo', 'lizzo', 'https://images.genius.com/f5ab6722a4c9021ff63946e16289fd22.1000x1000x1.jpg', 'Cambrian explosion rogue great turbulent clouds citizens of distant epochs consciousness birth. Gathered by gravity brain is the seed of intelligence citizens of distant epochs invent the universe star stuff harvesting star light the carbon in our apple pies. Sea of Tranquility extraordinary claims require extraordinary evidence concept of the number one two ghostly white figures in coveralls and helmets are soflty dancing at the edge of forever hundreds of thousands.');
-- insert into users(id_google, email, name_family, name_first, name, username, url_image, bio) values('6', 'mitchell@gmail.com', 'Mitchell', 'Joni', 'Joni Mitchell', 'jmitch', 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/2-portrait-of-joni-mitchell-jack-robinson.jpg', 'Globular star cluster shores of the cosmic ocean Apollonius of Perga a very small stage in a vast cosmic arena quasar stirred by starlight. Decipherment a billion trillion preserve and cherish that pale blue dot Euclid not a sunrise but a galaxyrise not a sunrise but a galaxyrise. Star stuff harvesting star light citizens of distant epochs invent the universe bits of moving fluff muse about extraordinary claims require extraordinary evidence.');
-- insert into users(id_google, email, name_family, name_first, name, username, url_image, bio) values('7', 'angel@gmail.com', 'Olsen', 'Angel', 'Angel Olsen', 'angel', 'https://c4.wallpaperflare.com/wallpaper/128/671/792/women-angel-olsen-musician-wallpaper-preview.jpg', 'Ship of the imagination courage of our questions decipherment a billion trillion kindling the energy hidden in matter dispassionate extraterrestrial observer. Vanquish the impossible vastness is bearable only through love bits of moving fluff Vangelis Rig Veda rich in heavy atoms. Sea of Tranquility take root and flourish extraordinary claims require extraordinary evidence a mote of dust suspended in a sunbeam as a patch of light not a sunrise but a galaxyrise.');

-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('1', 'mars scapes', 'The shield volcano Olympus Mons (Mount Olympus) is an extinct volcano in the vast upland region Tharsis, which contains several other large volcanoes. Olympus Mons is roughly three times the height of Mount Everest, which in comparison stands at just over 8.8 km (5.5 mi).', '3', 'https://www.jpl.nasa.gov/images/mars/20160421/PIA00407-16.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('6', 'blue sketches', 'Lapis lazuli is found in limestone in the Kokcha River valley of Badakhshan province in northeastern Afghanistan, where the Sar-e-Sang mine deposits have been worked for more than 6,000 years.', '7', 'https://www.nasa.gov/sites/default/files/noc_clouds.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('4', 'garden', 'While land plants have existed for about 425 million years, the first ones reproduced by a simple adaptation of their aquatic counterparts: spores. In the sea, plants—and some animals—can simply scatter out genetic clones of themselves to float away and grow elsewhere. This is how early plants reproduced. But plants soon evolved methods of protecting these copies to deal with drying out and other damage which is even more likely on land than in the sea. The protection became the seed, though it had not yet evolved the flower. Early seed-bearing plants include the ginkgo and conifers.', '2', 'http://s3.amazonaws.com/quietus_production/images/articles/14612/jarman_garden_1393586626_crop_550x347.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('3', 'west texas', 'Puppetry by its nature is a flexible and inventive medium and many puppet companies work with combinations of puppet forms and incorporate real objects into their performances. They might, for example, incorporate performing objects such as torn paper for snow, or a sign board with words as narrative devices within a production. The following are, alphabetically, the basic and conventional forms of puppet:', '1', 'https://eoimages.gsfc.nasa.gov/images/imagerecords/6000/6776/ISS013-E-26488_lrg.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('2', 'artemis', 'The lighter-colored regions of the Moon are called terrae, or more commonly highlands, because they are higher than most maria. They have been radiometrically dated to having formed 4.4 billion years ago, and may represent plagioclase cumulates of the lunar magma ocean.', '2', 'http://www.nasa.gov/sites/default/files/images/409953main_PIA00404_full.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('4', 'caravaggio light', 'Flemish Baroque painting light study in sound', '2', 'https://www.pinakothek.de/sites/default/patternlib/static/images/Terbrugghen_Sebastian_small.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('1', 'iceland', 'Icelandic airport punk', '4', 'https://climate.nasa.gov/system/news_items/main_images/2831_oibaapetty-58-x5.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('7', 'pluto scapes', 'pluto  field recordings', '0', 'https://www.nasa.gov/sites/default/files/thumbnails/image/edu_what_is_pluto_1.png', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('2', 'saturn scapes', 'saturn ring vibrations with punk synth', '0', 'https://solarsystem.nasa.gov/system/resources/detail_files/17747_Saturn_and_Titan.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('1', 'jupiter scapes', 'jupiter storm recordings', '0', 'https://photojournal.jpl.nasa.gov/jpeg/PIA22946.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('2', 'io sonnets', 'recordings of original Galilean moon sonnets', '0', 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Io_highest_resolution_true_color.jpg', now());


-- insert into recordings(id_user, title, description, url_recording, published, speech_to_text, created_at)
-- values('1', 'rock dust', 'permanence of the stars astonishment birth inconspicuous motes of rock and gas globular star cluster', 'http://tng.trekcore.com/audio/audio/Opening%20Credits%20Season%201.mp3', 'public', 'retsulc rats ralubolg sag dna kcor fo setom suoucipsnocni htrib tnemhsinotsa srats eht fo ecnenamrep', now());
-- insert into recordings(id_user, title, description, url_recording, published, speech_to_text, created_at)
-- values('1', 'rover town', 'tendrils of gossamer clouds a still more glorious dawn', 'https://retired.sounddogs.com/previews/36/mp3/294637_SOUNDDOGS__st.mp3', 'public', 'retsulc rats ralubolg sag dna kcor fo setom suoucipsnocni htrib tnemhsinotsa srats eht fo ecnenamrep', now());
-- insert into recordings(id_user, title, description, url_recording, published, speech_to_text, created_at)
-- values('1', 'third moon', 'sea of Tranquility courage of our questions galaxies', 'https://retired.sounddogs.com/previews/57/mp3/580354_SOUNDDOGS__sc.mp3', 'public', 'retsulc rats ralubolg sag dna kcor fo setom suoucipsnocni htrib tnemhsinotsa srats eht fo ecnenamrep', now());
-- insert into recordings(id_user, title, description, url_recording, published, speech_to_text, created_at)
-- values('3', 'oblivion', 'dream of the minds eye network of wormholes', 'https://retired.sounddogs.com/previews/57/mp3/580305_SOUNDDOGS__sc.mp3', 'public', 'retsulc rats ralubolg sag dna kcor fo setom suoucipsnocni htrib tnemhsinotsa srats eht fo ecnenamrep', now());
-- insert into recordings(id_user, title, description, url_recording, published, speech_to_text, created_at)
-- values('4', 'clouds', 'Sea of Tranquility Sea of Tranquility emerged into consciousness', 'https://retired.sounddogs.com/previews/57/mp3/580297_SOUNDDOGS__sc.mp3', 'public', 'retsulc rats ralubolg sag dna kcor fo setom suoucipsnocni htrib tnemhsinotsa srats eht fo ecnenamrep', now());
-- insert into recordings(id_user, title, description, url_recording, published, speech_to_text, created_at)
-- values('5', 'poppies', 'a flowering plant in the subfamily papaveroideae of the family papaveraceae', 'https://retired.sounddogs.com/previews/57/mp3/580338_SOUNDDOGS__sc.mp3', 'public', 'retsulc rats ralubolg sag dna kcor fo setom suoucipsnocni htrib tnemhsinotsa srats eht fo ecnenamrep', now());
-- insert into recordings(id_user, title, description, url_recording, published, speech_to_text, created_at)
-- values('2', 'nautical twilight', 'geometric center of the Sun is 12 degrees below the horizon', 'https://retired.sounddogs.com/previews/57/mp3/580387_SOUNDDOGS__sc.mp3', 'public', 'retsulc rats ralubolg sag dna kcor fo setom suoucipsnocni htrib tnemhsinotsa srats eht fo ecnenamrep', now());



-- insert into collections_recordings(id_collection, id_recording) values('1', '1');
-- insert into collections_recordings(id_collection, id_recording) values('1', '2');
-- insert into collections_recordings(id_collection, id_recording) values('1', '2');
-- insert into collections_recordings(id_collection, id_recording) values('1', '4');
-- insert into collections_recordings(id_collection, id_recording) values('3', '4');
-- insert into collections_recordings(id_collection, id_recording) values('5', '3');
-- insert into collections_recordings(id_collection, id_recording) values('4', '2');


-- insert into users_saved_collections(id_user, id_collection, created_at) values('1', '2', now());
-- insert into users_saved_collections(id_user, id_collection, created_at) values('1', '3', now());
-- insert into users_saved_collections(id_user, id_collection, created_at) values('1', '4', now());
-- insert into users_saved_collections(id_user, id_collection, created_at) values('2', '3', now());
-- insert into users_saved_collections(id_user, id_collection, created_at) values('2', '4', now());


-- insert into users_saved_recordings(id_user, id_recording, created_at) values('1', '5', now());
-- insert into users_saved_recordings(id_user, id_recording, created_at) values('1', '2', now());
-- insert into users_saved_recordings(id_user, id_recording, created_at) values('2', '1', now());
-- insert into users_saved_recordings(id_user, id_recording, created_at) values('2', '2', now());
-- insert into users_saved_recordings(id_user, id_recording, created_at) values('2', '3', now());
-- insert into users_saved_recordings(id_user, id_recording, created_at) values('2', '4', now());
