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


-- timestamp functions
-- now()
-- ex format. 2020-01-21 11:51:36.310508
-- current_date;
-- current_time;
-- current_timestamp;


-- sample data

-- users
-- insert into users(username, password, email, name_display, bio, url_image)
-- values('björk', 'sP@ce', 'björk@posteo.net', 'Björk Guðmundsdóttir', 'Intelligent beings emerged into consciousness cosmic fugue gathered by gravity star stuff harvesting star light across the centuries. Bits of moving fluff Jean-François Champollion inconspicuous motes of rock and gas permanence of the stars vastness is bearable only through love the ash of stellar alchemy? A still more glorious dawn awaits rings of Uranus a very small stage in a vast cosmic arena dispassionate extraterrestrial observer dispassionate extraterrestrial observer concept of the number one and billions upon billions upon billions upon billions upon billions upon billions upon billions.', 'https://img.discogs.com/i0Zf5Jd6ePI0hHGaFxmARmxgakk=/600x606/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-1373-1571039153-5380.jpeg.jpg');
-- insert into users(username, password, email, name_display, bio, url_image)
-- values('joni', 'c@se0fU', 'blue@posteo.net', 'Joni Mitchell', 'Rich in mystery globular star cluster take root and flourish Flatland the carbon in our apple pies descended from astronomers. Dispassionate extraterrestrial observer another world extraordinary claims require extraordinary evidence the ash of stellar alchemy vastness is bearable only through love venture. Hearts of the stars two ghostly white figures in coveralls and helmets are soflty dancing the only home weve ever known something incredible is waiting to be known rich in heavy atoms brain is the seed of intelligence and billions upon billions upon billions upon billions upon billions upon billions upon billions.', 'https://www.morrisonhotelgallery.com/images/big/Joni%20Mitchell.jpg');
-- insert into users(username, password, email, name_display, bio, url_image)
-- values('jarman', 'chR0m@', 'caravaggio@posteo.net', 'Derek Jarman', 'Dream of the minds eye bits of moving fluff realm of the galaxies paroxysm of global death the ash of stellar alchemy of brilliant syntheses. Intelligent beings hundreds of thousands intelligent beings preserve and cherish that pale blue dot preserve and cherish that pale blue dot the carbon in our apple pies. ', 'http://s3.amazonaws.com/quietus_production/images/articles/14612/jarman_garden_1393586626_crop_550x347.jpg');
-- insert into users(username, password, email, name_display, bio, url_image)
-- values('beyonce', 'l3m0n@de', 'queen@posteo.net', 'Beyoncé Giselle Knowles-Carter', 'Hearts of the stars paroxysm of global death tingling of the spine laws of physics intelligent beings rich in heavy atoms. Two ghostly white figures in coveralls and helmets are soflty dancing the carbon in our apple pies the only home weve ever known two ghostly white figures in coveralls and helmets are soflty dancing vastness is bearable only through love a still more glorious dawn awaits.', 'https://i.pinimg.com/originals/c6/42/e8/c642e8ebe7848dfde018830fd9453e3b.jpg');
-- insert into users(username, password, email, name_display, bio, url_image)
-- values('danez', 'd0gs!', 'smith@posteo.net', 'Danez Smith', 'Billions upon billions stirred by starlight hearts of the stars the carbon in our apple pies vanquish the impossible across the centuries? Something incredible is waiting to be known invent the universe venture network of wormholes tendrils of gossamer clouds the ash of stellar alchemy. Vastness is bearable only through love a mote of dust suspended in a sunbeam a mote of dust suspended in a sunbeam another world from which we spring with pretty stories for which theres little good evidence and billions upon billions upon billions upon billions upon billions upon billions upon billions.', 'https://i1.wp.com/brooklynpoets.org/wp-content/uploads/2013/03/Danez-Smith.jpg?fit=612%2C612&ssl=1');
-- insert into users(username, password, email, name_display, bio, url_image)
-- values('emyles', 'p3@nutButtR', 'myles@posteo.net', 'Eileen Myles', 'Extraplanetary the carbon in our apple pies consciousness stirred by starlight intelligent beings Cambrian explosion. Paroxysm of global death vastness is bearable only through love rich in heavy atoms circumnavigated invent the universe encyclopaedia galactica? The sky calls to us the ash of stellar alchemy tendrils of gossamer clouds with pretty stories for which theres little good evidence gathered by gravity not a sunrise but a galaxyrise. Are creatures of the cosmos Sea of Tranquility encyclopaedia galactica a mote of dust suspended in a sunbeam Sea of Tranquility are creatures of the cosmos and billions upon billions upon billions upon billions upon billions upon billions upon billions.', 'https://www.rollingstone.com/wp-content/uploads/2018/06/eileen-myles-author-edinburgh-2ebe5d58-6b77-42c4-8ed3-ce290051c2fe.jpg?resize=900,600&w=450');

-- collections
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('1', 'mars scapes', 'The shield volcano Olympus Mons (Mount Olympus) is an extinct volcano in the vast upland region Tharsis, which contains several other large volcanoes. Olympus Mons is roughly three times the height of Mount Everest, which in comparison stands at just over 8.8 km (5.5 mi).', '3', 'https://www.jpl.nasa.gov/images/mars/20160421/PIA00407-16.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('2', 'blue sketches', 'Lapis lazuli is found in limestone in the Kokcha River valley of Badakhshan province in northeastern Afghanistan, where the Sar-e-Sang mine deposits have been worked for more than 6,000 years.', '7', 'https://www.nasa.gov/sites/default/files/noc_clouds.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('3', 'garden', 'While land plants have existed for about 425 million years, the first ones reproduced by a simple adaptation of their aquatic counterparts: spores. In the sea, plants—and some animals—can simply scatter out genetic clones of themselves to float away and grow elsewhere. This is how early plants reproduced. But plants soon evolved methods of protecting these copies to deal with drying out and other damage which is even more likely on land than in the sea. The protection became the seed, though it had not yet evolved the flower. Early seed-bearing plants include the ginkgo and conifers.', '2', 'https://cdn.gardenista.com/wp-content/uploads/2015/04/fields/Derek-Jarman-garden-by-Howard-Sooley-9.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('6', 'west texas', 'Puppetry by its nature is a flexible and inventive medium and many puppet companies work with combinations of puppet forms and incorporate real objects into their performances. They might, for example, incorporate performing objects such as torn paper for snow, or a sign board with words as narrative devices within a production. The following are, alphabetically, the basic and conventional forms of puppet:', '1', 'https://eoimages.gsfc.nasa.gov/images/imagerecords/6000/6776/ISS013-E-26488_lrg.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('4', 'artemis', 'The lighter-colored regions of the Moon are called terrae, or more commonly highlands, because they are higher than most maria. They have been radiometrically dated to having formed 4.4 billion years ago, and may represent plagioclase cumulates of the lunar magma ocean.', '2', 'http://www.nasa.gov/sites/default/files/images/409953main_PIA00404_full.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('3', 'caravaggio light', 'Flemish Baroque painting light study in sound', '2', 'https://www.pinakothek.de/sites/default/patternlib/static/images/Terbrugghen_Sebastian_small.jpg', now());
-- insert into collections(id_user_creator, title, description, count_recordings, url_image, created_at) 
-- values('1', 'iceland', 'Icelandic airport punk', '4', 'https://climate.nasa.gov/system/news_items/main_images/2831_oibaapetty-58-x5.jpg', now());

-- recordings
-- insert into recordings(id_user, title, description, url_recording, published, speech_to_text, created_at)
-- values('1', 'rock dust', 'permanence of the stars astonishment birth inconspicuous motes of rock and gas globular star cluster', 'https://www.epidemicsound.com/track/CVGgQ7PEV7', 'public', 'retsulc rats ralubolg sag dna kcor fo setom suoucipsnocni htrib tnemhsinotsa srats eht fo ecnenamrep', now());
-- insert into recordings(id_user, title, description, url_recording, published, speech_to_text, created_at)
-- values('1', 'rover town', 'tendrils of gossamer clouds a still more glorious dawn', 'https://www.epidemicsound.com/track/S03xNi2zfK', 'public', 'retsulc rats ralubolg sag dna kcor fo setom suoucipsnocni htrib tnemhsinotsa srats eht fo ecnenamrep', now());
-- insert into recordings(id_user, title, description, url_recording, published, speech_to_text, created_at)
-- values('1', 'third moon', 'sea of Tranquility courage of our questions galaxies', 'https://www.epidemicsound.com/track/gZp2yXNUEA', 'public', 'retsulc rats ralubolg sag dna kcor fo setom suoucipsnocni htrib tnemhsinotsa srats eht fo ecnenamrep', now());
-- insert into recordings(id_user, title, description, url_recording, published, speech_to_text, created_at)
-- values('1', 'oblivion', 'dream of the minds eye network of wormholes', 'https://www.epidemicsound.com/track/S03xNi2zfK', 'public', 'retsulc rats ralubolg sag dna kcor fo setom suoucipsnocni htrib tnemhsinotsa srats eht fo ecnenamrep', now());
-- insert into recordings(id_user, title, description, url_recording, published, speech_to_text, created_at)
-- values('2', 'clouds', 'Sea of Tranquility Sea of Tranquility emerged into consciousness', 'https://www.epidemicsound.com/track/gZp2yXNUEA', 'public', 'retsulc rats ralubolg sag dna kcor fo setom suoucipsnocni htrib tnemhsinotsa srats eht fo ecnenamrep', now());


-- collections_recordings
-- insert into collections_recordings(id_collection, id_recording) values('1', '1');
-- insert into collections_recordings(id_collection, id_recording) values('1', '2');
-- insert into collections_recordings(id_collection, id_recording) values('1', '3');
-- insert into collections_recordings(id_collection, id_recording) values('1', '4');
-- insert into collections_recordings(id_collection, id_recording) values('3', '4');
-- insert into collections_recordings(id_collection, id_recording) values('5', '3');
-- insert into collections_recordings(id_collection, id_recording) values('4', '2');

-- users_saved_collections
-- insert into users_saved_collections(id_user, id_collection, created_at) values('1', '2', now());
-- insert into users_saved_collections(id_user, id_collection, created_at) values('1', '3', now());
-- insert into users_saved_collections(id_user, id_collection, created_at) values('1', '4', now());
-- insert into users_saved_collections(id_user, id_collection, created_at) values('2', '3', now());
-- insert into users_saved_collections(id_user, id_collection, created_at) values('2', '4', now());

-- users_saved_recordings
-- insert into users_saved_recordings(id_user, id_recording, created_at) values('1', '5', now());
-- insert into users_saved_recordings(id_user, id_recording, created_at) values('2', '1', now());
-- insert into users_saved_recordings(id_user, id_recording, created_at) values('2', '2', now());
-- insert into users_saved_recordings(id_user, id_recording, created_at) values('2', '3', now());
-- insert into users_saved_recordings(id_user, id_recording, created_at) values('2', '4', now());