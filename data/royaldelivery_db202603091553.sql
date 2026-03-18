-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Már 09. 15:53
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `royaldelivery_db`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `meals`
--

CREATE TABLE `meals` (
  `id` int(9) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT 'Gipsz Jakab',
  `description` varchar(100) NOT NULL DEFAULT '.',
  `price` int(9) NOT NULL DEFAULT 1000,
  `restaurantid` int(9) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `meals`
--

INSERT INTO `meals` (`id`, `name`, `description`, `price`, `restaurantid`) VALUES
(1, 'Margherita Pizza', 'Friss paradicsom, mozzarella és bazsalikom', 1500, 1),
(2, 'Caesar Saláta', 'Ropogós saláta csirkével és krutonnal', 1200, 2),
(3, 'Spaghetti Carbonara', 'Klasszikus olasz tészta szalonnával és tojással', 1300, 3),
(4, 'Pepperoni Pizza', 'Szaftos pepperoni és olvadt sajt', 1600, 4),
(5, 'Hawaii Pizza', 'Ananász és sonka egy különleges kombinációban', 1700, 5),
(6, 'Vegetáriánus Pizza', 'Friss zöldségek és sajt egy egészséges választás', 1400, 6),
(7, 'California Roll', 'Rák, avokádó és uborka egy finom tekercsben', 2000, 7),
(8, 'Spicy Tuna Roll', 'Fűszeres tonhal és avokádó egy ízletes kombinációban', 2200, 8),
(9, 'Salmon Nigiri', 'Friss lazac egy szelet rizs tetején', 1800, 1),
(10, 'Gyros tál', 'asdas', 1500, 1),
(11, 'Hamburger', 'afwawf', 1800, 1),
(12, 'Sült csirke', 'awiwfvaivg', 2200, 1),
(13, 'Rántott sajt', 'afwahogw', 1700, 1),
(14, 'Lazac steak', '', 3000, 1),
(15, 'Vegetáriánus lasagne', '', 2500, 4),
(16, 'Sült zöldségek', '', 1200, 6),
(17, 'Sült krumpli', '', 500, 7),
(18, 'Kóla', '', 1000, 8);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` int(9) NOT NULL,
  `restaurantid` varchar(100) NOT NULL DEFAULT '1',
  `userid` varchar(100) NOT NULL DEFAULT '1',
  `date` varchar(100) NOT NULL DEFAULT '2026-05-05'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`id`, `restaurantid`, `userid`, `date`) VALUES
(1, '1', '1', '2024-06-01'),
(2, '2', '1', '2024-06-02'),
(3, '3', '3', '2024-06-03'),
(4, '4', '6', '2024-06-04'),
(5, '5', '', '2024-06-05'),
(6, '6', '', '2024-06-06'),
(7, '7', '', '2024-06-07'),
(8, '8', '', '2024-06-08'),
(9, '', '', '2024-06-09'),
(10, '', '', '2024-06-10'),
(11, '', '', '2025-12-27'),
(12, '', '', '2026-01-31');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `owners`
--

CREATE TABLE `owners` (
  `id` int(1) NOT NULL,
  `username` varchar(100) NOT NULL DEFAULT 'gipszjakab',
  `email` varchar(100) NOT NULL DEFAULT 'gipszjakab@gmail.com',
  `password` varchar(100) NOT NULL DEFAULT 'jelszo123'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `owners`
--

INSERT INTO `owners` (`id`, `username`, `email`, `password`) VALUES
(1, 'Maurice McDonald', 'McDonalds@gmail.com', 'McForLife'),
(2, 'Harland Sanders', 'KFC@gmail.com', 'KFCForLife'),
(3, 'Chet Gepeeti', 'chet.gepeeti@gmail.com', 'iloveburgirs123');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(9) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '.',
  `ownerid` int(9) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `ownerid`) VALUES
(0, 'Vasvári Villásr', 1),
(1, 'McDonald\'s', 1),
(2, 'KFC', 2),
(3, 'Burger King', 3),
(4, 'Taj Mahal', 3),
(5, 'Buddha Original', 1),
(6, 'Király Bisztró', 1),
(7, 'Pizza Mester', 2),
(8, 'Sushi Szamuráj', 3),
(9, 'Pizzéria', 3),
(10, 'Royal Diner', 1),
(11, 'Palace Pizzeria', 2),
(12, 'Sovereign Sushi', 3),
(19, 'Vasvári Villásr', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(9) NOT NULL,
  `username` varchar(100) NOT NULL DEFAULT 'gipszjakab',
  `firstName` varchar(100) NOT NULL DEFAULT 'Jakab',
  `lastName` varchar(100) NOT NULL DEFAULT 'Gipsz',
  `email` varchar(100) NOT NULL DEFAULT 'gipszjakab@gmail.com',
  `password` varchar(100) NOT NULL DEFAULT 'jelszo123',
  `address` varchar(100) NOT NULL DEFAULT '.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `firstName`, `lastName`, `email`, `password`, `address`) VALUES
(1, 'Nagypeter', 'Péter', 'Nagy', 'nagypeter@gmail.com', 'nagypeter123', 'Budapest, Szökőkút utca 10.'),
(2, 'Kovacsanna', 'Anna', 'Kovács', 'akicsi@freemail.hu', 'kovacsanna123', 'Szeged, Bálint Sándor utca 5.'),
(3, 'Nagygabor', 'Nagygabor', 'Nagy', 'nagy.gabor@freemail.hu', 'nagygabor123', 'Debrecen, Kossuth Lajos utca 15.'),
(4, 'Tótheszter', 'Eszter', 'Tóth', 'eszter.toth@freemail.hu', 'esztertoth123', 'Miskolc, József Attila utca 20.'),
(5, 'Szabolaszlo', 'László', 'Szabó', 'laszlo.szabo@freemail.hu', 'szabolaszlo123', 'Pécs, Petőfi Sándor utca 8.'),
(6, 'Kisszoltan', 'Zoltán', 'Kiss', 'egyszelvedojavito@citromail.hu', 'kisszoltan69420', 'Győr, Mária utca 12.'),
(7, 'Magyarpeter', 'Péter', 'Magyar', 'mp@tisza.hu', 'mp123456', 'Máriapócs, Vámospércs utca 91.'),
(8, 'vidiorban', 'Vidi', 'Orbán', 'vidiorban', 'vidiorban123', 'Budapest, Puskás Aréna 1.'),
(9, 'jdoe', 'John', 'Doe', 'jdoe@email.com', '', '123 Main Street'),
(10, 'asmith', 'Anna', 'Smith', 'asmith@email.com', '', '45 King Road'),
(11, 'bkovacs', 'Béla', 'Kovács', 'bkovacs@email.com', '', '12 Petőfi utca'),
(12, 'nagy.eva', 'Éva', 'Nagy', 'eva.nagy@email.com', '', '78 Kossuth tér'),
(13, 'tpeter', 'Péter', 'Tóth', 'tpeter@email.com', '', '9 Rákóczi út'),
(14, 'kzsuzsa', 'Zsuzsa', 'Kiss', 'kzsuzsa@email.com', '', '33 Ady Endre utca'),
(15, 'fmark', 'Márk', 'Farkas', 'fmark@email.com', '', '5 Béke tér'),
(16, 'ghorvath', 'Gábor', 'Horváth', 'ghorvath@email.com', '', '101 Duna sor'),
(17, 'lbalazs', 'Balázs', 'Lakatos', 'lbalazs@email.com', '', '67 Arany János utca'),
(18, 'mrita', 'Rita', 'Molnár', 'mrita@email.com', '', '22 Széchenyi utca');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
