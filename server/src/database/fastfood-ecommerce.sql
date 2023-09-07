-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 07, 2023 at 04:19 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fastfood-ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `token` varchar(500) NOT NULL,
  `username` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `token`, `username`, `firstname`, `lastname`, `email`, `password`) VALUES
(1, 'GGgtfwWc79_swmz_O0F_c6snpWp6pkKeyv4GNHUkbRRp2VZ8', 'hooman_77', 'hooman', 'mousavi', 'hoomanmousavi77@gmail.com', '$2b$10$z1Sutk6U6uMEdnPQXuAXB.ET3E6m3UhAUEW0ITjoB0hQuybIA0Asu'),
(2, 'QhsJi9zg7gdSm1W4Y9s3x4Nx3rEhrlYOemq4RkQ_fzXtDhXx', 'steven_rich', 'Steven', 'Rich', 'steven@gmail.com', '$2b$10$7NXxUVT.kXfMjAydJ3JKKOvsmp14CS2w8g8YhSuSxe/FwJEiz79Qe'),
(3, 'yLZQ4Qt5b_RZ0RkpiFagVmqQwDwezSNvTlIqk5Zo26zIMsYV', 'william_cobus', 'William', 'Cobus', 'william@gmail.com', '$2b$10$cUWEhCNMZQd3PKHbR4.ANuRy9yol8/DKFcay5sgzagkOhjQ/Yhq5G'),
(4, 'mcEFNVeMcJzp5X5XJncAxsBg1iWRonqM_K_2Wr8bLvkOh8s6', 'george_Belley', 'Belly', 'George', 'belly@gmail.com', '$2b$10$AKNveJiyPT6jp7osK6IjQe/6XERf9rv5AMclbrFyPGmi1z9/9nxfe'),
(5, 'CETjYtPkd6QwIy-RUX5RuwMaJivJjf_H9VKH-E-El0Jluamm', 'adam_smith', 'Adam', 'Smith', 'adam@gmail.com', '$2b$10$gBw97L086v2or8QXTrAa1eVitAzeAOt8qs8wGrREqlEfTDM5Ef50W'),
(6, '0dJDUTjrqKvMXB-Po4XX5O9veeFENuLqR_DvAIs9j6cRwHx6', 'nasir_jalali', 'Nasir', 'Jalali', 'nasir@gmail.com', '$2b$10$2WgRi0NL..QGLhKgD4g.tu2J7gY97tgYuv352gyDdyYtpJHVvCiEq');

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `caption` varchar(100) NOT NULL,
  `first_text` varchar(100) NOT NULL,
  `middle_text` varchar(100) NOT NULL,
  `last_text` varchar(100) NOT NULL,
  `link` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `image`, `caption`, `first_text`, `middle_text`, `last_text`, `link`) VALUES
(3, '1687610719917.png', 'Hot Stuff', 'Maxican Burger ...', 'with bacon, tasty ham, pineapple and onion', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit quia consequuntur', 'roast-beef'),
(4, '1687610834305.png', 'Happy hour', 'Pizza with cheese ...', 'with bacon, tasty ham, pineapple and onion', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit quia consequuntur', 'special-pizza'),
(5, '1687610875174.png', 'Happy hour', 'Non Veg Burger...', 'with bacon, tasty ham, pineapple and onion', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit quia consequuntur', 'spicy-pepperoni');

-- --------------------------------------------------------

--
-- Table structure for table `basket`
--

CREATE TABLE `basket` (
  `id` int(11) NOT NULL,
  `userID` int(100) NOT NULL,
  `productID` int(100) NOT NULL,
  `price` int(100) NOT NULL,
  `quantity` int(100) NOT NULL,
  `subtotal` int(100) NOT NULL,
  `orderID` int(100) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `type` varchar(100) NOT NULL DEFAULT 'ready'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `basket`
--

INSERT INTO `basket` (`id`, `userID`, `productID`, `price`, `quantity`, `subtotal`, `orderID`, `description`, `type`) VALUES
(83, 10, 10, 24, 1, 24, 37, NULL, 'ready'),
(84, 10, 11, 35, 2, 70, 37, NULL, 'ready'),
(101, 10, 10, 24, 1, 24, 43, NULL, 'ready'),
(104, 10, 13, 19, 1, 8, 43, NULL, 'ready'),
(105, 10, 13, 19, 1, 8, 44, NULL, 'ready'),
(108, 10, 11, 35, 1, 35, 46, NULL, 'ready'),
(109, 10, 12, 25, 3, 75, 46, NULL, 'ready'),
(110, 10, 13, 19, 1, 8, 44, NULL, 'ready'),
(111, 10, 10, 24, 1, 24, 47, NULL, 'ready'),
(112, 10, 9, 29, 1, 9, 47, NULL, 'ready'),
(113, 10, 11, 35, 1, 35, 47, NULL, 'ready'),
(114, 10, 12, 25, 3, 75, 47, NULL, 'ready'),
(115, 10, 13, 19, 3, 24, 47, NULL, 'ready'),
(118, 10, 10, 40, 1, 40, 47, '\n        <div><h6>Sizes ($15.00):</h6><p>medium size</p></div>\n        <div><h6>Sauces ($2.00):</h6><p>Salsa sauces</p></div>\n        <div><h6>Cheese ($5.00):</h6><p>cheese</p></div>\n        <div><h6>Toppings ($3.00):</h6><p>mushrooms</p></div>\n        <div><h6>Additional Info:</h6><p>additional</p></div>\n        <div><h6>Custom Pieces:</h6><p>5</p></div>\n    ', 'custom'),
(120, 10, 10, 40, 2, 80, 48, '\n        <div><h6>Sizes ($15.00):</h6><p>medium size</p></div>\n        <div><h6>Sauces ($2.00):</h6><p>Salsa sauces</p></div>\n        <div><h6>Cheese ($5.00):</h6><p>cheese</p></div>\n        <div><h6>Toppings ($3.00):</h6><p>mushrooms</p></div>\n        <div><h6>Additional Info:</h6><p>additional</p></div>\n        <div><h6>Custom Pieces:</h6><p>5</p></div>\n    ', 'custom'),
(121, 10, 13, 19, 3, 24, 48, NULL, 'ready'),
(122, 10, 10, 40, 1, 40, 48, '<div class=\"order-container\"><div class=\"order-image\"><img alt=\"1693506120724.jpeg\" src=\"http://localhost:3001/storage/image/1693506120724.jpeg\" srcset=\"http://localhost:3001/storage/image/1693506120724.jpeg\"/></div><div class=\"order-data\"><div><h6>Sizes ($15.00):</h6><p>medium size</p></div><div><h6>Sauces ($2.00):</h6><p>Salsa sauces</p></div><div><h6>Cheese ($5.00):</h6><p>cheese</p></div><div><h6>Toppings ($3.00):</h6><p>mushrooms</p></div><div><h6>Additional Info:</h6><p>additional</p></div><div><h6>Custom Pieces:</h6><p>5</p></div></div></div>', 'custom'),
(123, 10, 9, 29, 1, 9, 48, NULL, 'ready'),
(124, 10, 10, 40, 2, 55, 48, '<div class=\"order-container\"><div class=\"order-image\"><img alt=\"1693506120724.jpeg\" src=\"http://localhost:3001/storage/image/1693506120724.jpeg\" srcset=\"http://localhost:3001/storage/image/1693506120724.jpeg\"/></div><div class=\"order-data\"><div><h6>Sizes ($15.00):</h6><p>medium size</p></div><div><h6>Sauces ($2.00):</h6><p>Salsa sauces</p></div><div><h6>Cheese ($5.00):</h6><p>cheese</p></div><div><h6>Toppings ($3.00):</h6><p>mushrooms</p></div><div><h6>Additional Info:</h6><p>additional</p></div><div><h6>Custom Pieces:</h6><p>5</p></div></div></div>', 'custom'),
(125, 10, 10, 45, 2, 60, 48, '<div class=\"order-container\"><div class=\"order-image\"><img alt=\"1693506130180.jpeg\" src=\"http://localhost:3001/storage/image/1693506130180.jpeg\" srcset=\"http://localhost:3001/storage/image/1693506130180.jpeg\"/></div><div class=\"order-data\"><div><h6>Sizes ($15.00):</h6><p>large size</p></div><div><h6>Sauces ($2.00):</h6><p>Salsa sauces</p></div><div><h6>Cheese ($5.00):</h6><p>cheese</p></div><div><h6>Toppings ($3.00):</h6><p>mushrooms</p></div><div><h6>Additional Info:</h6><p>thanks</p></div><div><h6>Custom Pieces:</h6><p>12</p></div></div></div>', 'custom'),
(165, 10, 9, 29, 1, 29, 61, NULL, 'ready'),
(166, 10, 18, 24, 1, 24, 61, NULL, 'ready'),
(167, 10, 10, 45, 2, 90, 61, '<div class=\"order-container\"><div class=\"order-image\"><img alt=\"1693506125748.jpeg\" src=\"http://localhost:3001/storage/image/1693506125748.jpeg\" srcset=\"http://localhost:3001/storage/image/1693506125748.jpeg\"/></div><div class=\"order-data\"><div><h6>Sizes ($15.00):</h6><p>large size</p></div><div><h6>Sauces ($2.00):</h6><p>Pesto sauces</p></div><div><h6>Cheese ($5.00):</h6><p>cheese</p></div><div><h6>Toppings ($3.00):</h6><p>broccoli</p></div><div><h6>Additional Info:</h6><p></p></div><div><h6>Custom Pieces:</h6><p>12</p></div></div></div>', 'custom'),
(168, 10, 10, 24, 1, 24, 62, NULL, 'ready'),
(169, 10, 18, 24, 1, 24, 63, NULL, 'ready'),
(170, 10, 10, 47, 1, 47, 63, '<div class=\"order-container\"><div class=\"order-image\"><img alt=\"1693506125748.jpeg\" src=\"http://localhost:3001/storage/image/1693506125748.jpeg\" srcset=\"http://localhost:3001/storage/image/1693506125748.jpeg\"/></div><div class=\"order-data\"><div><h6>Sizes ($15.00):</h6><p>large size</p></div><div><h6>Sauces ($2.00):</h6><p>Pesto sauces</p></div><div><h6>Cheese ($5.00):</h6><p>cheese</p></div><div><h6>Toppings ($5.00):</h6><p>tomatoes</p></div><div><h6>Additional Info:</h6><p>gooood</p></div><div><h6>Custom Pieces:</h6><p>12</p></div></div></div>', 'custom'),
(171, 10, 17, 12, 1, 12, 64, NULL, 'ready');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `brief` varchar(500) NOT NULL,
  `link` varchar(100) NOT NULL,
  `image_sm` varchar(200) NOT NULL,
  `image_xs` varchar(200) NOT NULL,
  `image_lg` varchar(200) NOT NULL,
  `categoryID` int(100) NOT NULL,
  `adminID` int(100) NOT NULL,
  `isLatest` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `date`, `brief`, `link`, `image_sm`, `image_xs`, `image_lg`, `categoryID`, `adminID`, `isLatest`) VALUES
(4, '5 way to increase neutrients in fast food', '02 March. 2022', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ', '5-way-to-increase-neutrients-in-fast-food', '', '1687805724284.jpeg', '1687805724285.jpeg', 2, 4, 0),
(5, 'New formular of pizza', '02 March. 2022', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ', 'new-formular-of-pizza', '', '1687805842051.jpeg', '1687805842052.jpeg', 3, 2, 1),
(6, 'New formular of burger', '02 March. 2022', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ', 'new-formular-of-burger', '', '1687805923222.jpeg', '1687805923223.jpeg', 4, 1, 1),
(7, 'Family gather', '02 March. 2022', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ', 'family-gather', '', '1687805986695.jpeg', '1687805986696.jpeg', 1, 2, 1),
(8, 'Sceintific facts about pizza', '02 March. 2022', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ', 'Sceintific-facts-about-pizza', '1687806056356.jpeg', '1687806056356.jpeg', '1687806056357.jpeg', 5, 3, 1),
(9, 'Sleep is one of the most important parts of living', '02 March. 2022', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ', 'new-buffay', '1687806235519.jpeg', '1687806235520.jpeg', '1687806235520.jpeg', 6, 5, 1),
(10, 'New buffay', '02 March. 2022', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ', 'new-buffay', '1687806235519.jpeg', '1687806235520.jpeg', '1687806235520.jpeg', 6, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `blog_category`
--

CREATE TABLE `blog_category` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_category`
--

INSERT INTO `blog_category` (`id`, `name`) VALUES
(1, 'Fresh fruit'),
(2, 'Organic Vegetables'),
(3, 'Fresh pizza'),
(4, 'Fitness and health'),
(5, 'Nutrients'),
(6, 'Burger');

-- --------------------------------------------------------

--
-- Table structure for table `blog_comments`
--

CREATE TABLE `blog_comments` (
  `id` int(11) NOT NULL,
  `userID` int(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `blogID` int(100) NOT NULL,
  `body` varchar(500) NOT NULL,
  `isAccept` tinyint(1) NOT NULL DEFAULT 0,
  `isReply` tinyint(1) NOT NULL DEFAULT 0,
  `replyID` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_comments`
--

INSERT INTO `blog_comments` (`id`, `userID`, `date`, `blogID`, `body`, `isAccept`, `isReply`, `replyID`) VALUES
(2, 3, 'Aug. 20 2020', 4, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 0, 0),
(3, 5, 'Aug. 21 2020', 4, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 0, 0),
(4, 6, 'Aug. 21 2020', 4, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 1, 3),
(5, 7, 'Aug. 21 2020', 6, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 0, 0),
(6, 2, 'Aug. 21 2020', 6, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 0, 0),
(7, 3, 'Aug. 26 2020', 7, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 0, 0),
(9, 6, 'Aug. 26 2020', 7, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 1, 7),
(10, 6, 'Aug. 26 2020', 9, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 0, 0),
(11, 7, 'Aug. 26 2020', 9, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 0, 0),
(14, 10, 'Aug. 20 2020', 7, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 1, 9),
(15, 6, 'Aug. 26 2020', 7, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 1, 7),
(16, 6, 'Aug. 26 2020', 7, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 1, 15),
(17, 10, 'Aug. 20 2020', 7, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 1, 14),
(18, 5, 'Aug. 21 2020', 4, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 0, 0),
(19, 5, 'Aug. 21 2020', 4, 'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.', 1, 0, 0),
(23, 10, 'September 28, 2023', 4, 'that was interesting!', 1, 0, 0),
(24, 10, 'September 28, 2023', 4, 'your welcome!', 1, 1, 23),
(29, 10, 'September 28, 2023', 4, 'goooood', 1, 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `blog_content`
--

CREATE TABLE `blog_content` (
  `id` int(11) NOT NULL,
  `col` int(100) NOT NULL,
  `title` varchar(1000) DEFAULT NULL,
  `text` mediumtext NOT NULL,
  `blogID` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_content`
--

INSERT INTO `blog_content` (`id`, `col`, `title`, `text`, `blogID`) VALUES
(1, 12, '5 way to increase neutrients level from fast food', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur velit esse cillum dolore eu ...', 4),
(2, 6, 'Two Column Text Sample', 'Nam libero tempore, cum soluta nobis est cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.', 4),
(3, 6, NULL, 'Nam libero tempore, cum soluta nobis est cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.', 4),
(4, 12, NULL, 'Here is main text quis nostrud exercitation ullamco laboris nisi here is itealic text ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla rure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat here is link cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 4),
(5, 12, '5 way to increase neutrients level from fast food', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur velit esse cillum dolore eu ...', 5),
(6, 6, 'Two Column Text Sample', 'Nam libero tempore, cum soluta nobis est cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.', 5),
(7, 6, NULL, 'Nam libero tempore, cum soluta nobis est cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.', 5),
(8, 12, NULL, 'Here is main text quis nostrud exercitation ullamco laboris nisi here is itealic text ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla rure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat here is link cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 5),
(9, 12, '5 way to increase neutrients level from fast food', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur velit esse cillum dolore eu ...', 6),
(10, 6, 'Two Column Text Sample', 'Nam libero tempore, cum soluta nobis est cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.', 6),
(11, 6, NULL, 'Nam libero tempore, cum soluta nobis est cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.', 6),
(12, 12, NULL, 'Here is main text quis nostrud exercitation ullamco laboris nisi here is itealic text ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla rure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat here is link cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 6),
(13, 12, '5 way to increase neutrients level from fast food', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur velit esse cillum dolore eu ...', 7),
(14, 6, 'Two Column Text Sample', 'Nam libero tempore, cum soluta nobis est cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.', 7),
(15, 6, NULL, 'Nam libero tempore, cum soluta nobis est cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.', 7),
(16, 12, NULL, 'Here is main text quis nostrud exercitation ullamco laboris nisi here is itealic text ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla rure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat here is link cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 7),
(17, 12, '5 way to increase neutrients level from fast food', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur velit esse cillum dolore eu ...', 8),
(18, 6, 'Two Column Text Sample', 'Nam libero tempore, cum soluta nobis est cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.', 8),
(19, 6, NULL, 'Nam libero tempore, cum soluta nobis est cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.', 8),
(20, 12, NULL, 'Here is main text quis nostrud exercitation ullamco laboris nisi here is itealic text ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla rure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat here is link cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 8),
(21, 12, '5 way to increase neutrients level from fast food', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur velit esse cillum dolore eu ...', 9),
(22, 6, 'Two Column Text Sample', 'Nam libero tempore, cum soluta nobis est cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.', 9),
(23, 6, NULL, 'Nam libero tempore, cum soluta nobis est cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.', 9),
(24, 12, NULL, 'Here is main text quis nostrud exercitation ullamco laboris nisi here is itealic text ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla rure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat here is link cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 9);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `city` varchar(100) NOT NULL,
  `provinceID` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `city`, `provinceID`) VALUES
(1, 'San Francisco', 1),
(2, 'San Diego', 1),
(3, 'Sacramento', 1),
(4, 'Houston', 2),
(5, 'Austin', 2),
(6, 'Dallas', 2),
(7, 'Miami', 3),
(8, 'Destin', 3),
(9, 'Naples', 3),
(10, 'Cleveland', 4),
(11, 'Akron', 4),
(12, 'Toledo', 4),
(13, 'Hilo', 5),
(14, 'Hawi', 5),
(15, 'Kapolei', 5),
(16, 'Wasilla', 6),
(17, 'North Pole', 6),
(18, 'Nome', 6),
(19, 'Richmond', 7),
(20, 'Alexandria', 7),
(21, 'Norfolk', 7),
(22, 'Atlanta', 8),
(23, 'Savannah', 8),
(24, 'Athens', 8);

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `message` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`id`, `email`, `name`, `subject`, `message`, `created_at`) VALUES
(2, 'hoomanmousavi77@gmail.com', 'dede', 'dede', 'dede', '2023-08-30 15:07:18');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` int(11) NOT NULL,
  `code` varchar(100) DEFAULT NULL,
  `percent` int(100) NOT NULL DEFAULT 0,
  `expired_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `percent`, `expired_at`) VALUES
(1, 'd2#rf4', 10, '2024-07-17 09:34:04'),
(3, 'g678d@', 50, '2023-07-31 09:34:39'),
(4, 'r!dgiud44', 35, '2023-09-27 09:35:18'),
(5, 'h63dde', 45, '2023-12-28 09:35:41'),
(7, NULL, 0, '2023-07-05 22:14:54');

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE `favorite` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `productID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorite`
--

INSERT INTO `favorite` (`id`, `userID`, `productID`) VALUES
(2, 10, 9),
(3, 10, 10),
(4, 10, 16),
(9, 10, 8);

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `title`, `image`) VALUES
(1, 'People Taste Food', '1688232707230.jpeg'),
(2, 'People Taste Food', '1688232718300.jpeg'),
(3, 'People Taste Food', '1688232723707.jpeg'),
(4, 'People Taste Food', '1688232728345.jpeg'),
(5, 'People Taste Food', '1688232733532.jpeg'),
(6, 'People Taste Food', '1688232739092.jpeg'),
(7, 'People Taste Food', '1688232743337.jpeg'),
(8, 'People Taste Food', '1688232749578.jpeg'),
(9, 'People Taste Food', '1688232754030.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `newsletter`
--

CREATE TABLE `newsletter` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `newsletter`
--

INSERT INTO `newsletter` (`id`, `email`) VALUES
(2, 'hoomanmousavi77@gmail.com'),
(3, 'hoomanmousavi15@gmail.com'),
(4, 'hoomanmousavi10@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `price` int(100) NOT NULL,
  `image` varchar(200) NOT NULL,
  `specification_1` varchar(200) NOT NULL,
  `specification_2` varchar(200) NOT NULL,
  `specification_3` varchar(200) NOT NULL,
  `link` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offer`
--

INSERT INTO `offer` (`id`, `title`, `price`, `image`, `specification_1`, `specification_2`, `specification_3`, `link`) VALUES
(1, 'Veggi Fun Pizza', 21, '1692531952263.webp', 'Chicken Hallon', 'Summer Pizza', 'Vegge Lover', 'ceasar-salad');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `addressID` int(100) DEFAULT NULL,
  `statusID` int(100) NOT NULL DEFAULT 2,
  `paymentStatusID` int(11) DEFAULT 3,
  `total_amount` varchar(100) NOT NULL,
  `userID` int(100) NOT NULL,
  `couponID` int(100) DEFAULT 7,
  `created_at` varchar(100) NOT NULL,
  `payment_amount` int(100) NOT NULL,
  `addressTitle` varchar(100) DEFAULT NULL,
  `addressDetail` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `addressID`, `statusID`, `paymentStatusID`, `total_amount`, `userID`, `couponID`, `created_at`, `payment_amount`, `addressTitle`, `addressDetail`) VALUES
(37, 2, 1, 1, '94', 10, 7, '2023-7-6', 94, 'Home', 'Ohio - Toledo - hellooooo - postal code: 12345 - phone: 09921929654'),
(43, 3, 1, 1, '40', 10, 3, '2023-7-6', 20, 'Home', 'Ohio - Toledo - hellooooo - postal code: 12345 - phone: 09921929654'),
(44, 3, 1, 1, '8', 10, 7, '2023-7-6', 8, 'Home', 'Ohio - Toledo - hellooooo - postal code: 12345 - phone: 09921929654'),
(46, 2, 1, 2, '110', 10, 3, '2023-7-6', 55, 'Home', 'Ohio - Toledo - hellooooo - postal code: 12345 - phone: 09921929654'),
(47, 2, 2, 1, '167', 10, 7, '2023-8-29', 167, 'Home', 'Ohio - Toledo - hellooooo - postal code: 12345 - phone: 09921929654'),
(48, 3, 2, 1, '228', 10, 4, '2023-9-2', 79, 'Home', 'Ohio - Toledo - hellooooo - postal code: 12345 - phone: 09921929654'),
(61, 9, 1, 2, '143', 10, 3, '2023-9-4', 72, 'Home', 'Texas - Dallas -  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur doloremque et officia quia quisquam veniam! Asperiores atque culpa illo, libero optio qui quis, quo sint soluta totam vitae voluptatibus! - postal code: 56789 - phone: 09921929654'),
(62, 9, 1, 2, '24', 10, 7, '2023-9-7', 24, 'Home', 'Texas - Dallas -  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur doloremque et officia quia quisquam veniam! Asperiores atque culpa illo, libero optio qui quis, quo sint soluta totam vitae voluptatibus! - postal code: 56789 - phone: 09921929654'),
(63, 9, 1, 1, '71', 10, 7, '2023-9-7', 71, 'Home', 'Texas - Dallas -  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur doloremque et officia quia quisquam veniam! Asperiores atque culpa illo, libero optio qui quis, quo sint soluta totam vitae voluptatibus! - postal code: 56789 - phone: 09921929654'),
(64, 9, 1, 1, '12', 10, 7, '2023-9-7', 12, 'Home', 'Texas - Dallas -  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur doloremque et officia quia quisquam veniam! Asperiores atque culpa illo, libero optio qui quis, quo sint soluta totam vitae voluptatibus! - postal code: 56789 - phone: 09921929654');

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL,
  `status` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`id`, `status`) VALUES
(1, 'Processing'),
(2, 'Awaiting Payment');

-- --------------------------------------------------------

--
-- Table structure for table `payment_status`
--

CREATE TABLE `payment_status` (
  `id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_status`
--

INSERT INTO `payment_status` (`id`, `status`) VALUES
(1, 'success'),
(2, 'failed'),
(3, 'unpaid');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `categoryID` int(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `caption` varchar(100) NOT NULL,
  `price` bigint(100) NOT NULL,
  `primary_image` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `brief` varchar(300) NOT NULL,
  `specification` int(20) NOT NULL,
  `link` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `off` tinyint(1) NOT NULL DEFAULT 0,
  `off_percent` int(100) DEFAULT 0,
  `quantity` int(100) NOT NULL,
  `date_on_sale_from` timestamp NULL DEFAULT NULL,
  `date_on_sale_to` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `categoryID`, `title`, `caption`, `price`, `primary_image`, `description`, `brief`, `specification`, `link`, `status`, `off`, `off_percent`, `quantity`, `date_on_sale_from`, `date_on_sale_to`) VALUES
(8, 1, 'Roast beef', 'Our flavors & ingredients to build our local burgers.', 18, '1687632704599.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 1, 'roast-beef', 1, 0, 0, 5, NULL, NULL),
(9, 1, 'Special Pizza', 'Our flavors & ingredients to build our local burgers.', 29, '1687632825674.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 1, 'special-pizza', 1, 1, 33, 15, NULL, NULL),
(10, 1, 'Spicy pepperoni', 'Our flavors & ingredients to build our local burgers.', 24, '1687633015249.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 2, 'spicy-pepperoni', 1, 0, 0, 42, NULL, NULL),
(11, 1, 'Classic Smash', 'Our flavors & ingredients to build our local burgers.', 35, '1687633102166.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 1, 'classic-smash', 0, 0, 0, 6, NULL, NULL),
(12, 1, 'Meat and mushroom', 'Our flavors & ingredients to build our local burgers.', 25, '1687633244305.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 3, 'meat-and-mushroom', 1, 0, 0, 14, NULL, NULL),
(13, 2, 'Chicken Burger', 'Our flavors & ingredients to build our local burgers.', 19, '1687633462877.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 2, 'chicken-burger', 1, 1, 43, 14, NULL, NULL),
(14, 2, 'Double charcoal meat', 'Our flavors & ingredients to build our local burgers.', 19, '1687633629521.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 1, 'double-charcoal-meat', 1, 0, 0, 14, NULL, NULL),
(15, 4, 'Soft Drink', 'Our flavors & ingredients to build our local burgers.', 5, '1687633729141.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 2, 'soft-drink', 1, 0, 0, 70, NULL, NULL),
(16, 4, 'Potato', 'Our flavors & ingredients to build our local burgers.', 8, '1687633826098.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 1, 'potato', 1, 1, 55, 66, NULL, NULL),
(17, 5, 'Ceasar Salad', 'Our flavors & ingredients to build our local burgers.', 12, '1687633929559.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 1, 'ceasar-salad', 1, 0, 0, 120, NULL, NULL),
(18, 3, 'Spicy pepperoni', 'Our flavors & ingredients to build our local burgers.', 24, '1687633015249.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\r\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 1, 'spicy-pepperoni', 1, 0, 0, 42, NULL, NULL),
(19, 3, 'Classic Smash', 'Our flavors & ingredients to build our local burgers.', 35, '1687633102166.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\r\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 1, 'classic-smash', 1, 0, 0, 6, NULL, NULL),
(20, 3, 'Chicken Burger', 'Our flavors & ingredients to build our local burgers.', 19, '1687633462877.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\r\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 1, 'chicken-burger', 1, 0, 0, 14, NULL, NULL),
(21, 4, 'Double charcoal meat', 'Our flavors & ingredients to build our local burgers.', 19, '1687633629521.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\r\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 1, 'double-charcoal-meat', 1, 0, 0, 14, NULL, NULL),
(22, 6, 'Spicy pepperoni', 'Our flavors & ingredients to build our local burgers.', 24, '1687633015249.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\r\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 1, 'spicy-pepperoni', 1, 0, 0, 42, NULL, NULL),
(23, 6, 'Ceasar Salad', 'Our flavors & ingredients to build our local burgers.', 12, '1687633929559.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\r\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 2, 'ceasar-salad', 1, 1, 20, 120, NULL, NULL),
(24, 7, 'Roast beef', 'Our flavors & ingredients to build our local burgers.', 18, '1687632704599.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\r\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 3, 'roast-beef', 1, 0, 0, 5, NULL, NULL),
(25, 7, 'Meat and mushroom', 'Our flavors & ingredients to build our local burgers.', 25, '1687633244305.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\r\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 2, 'meat-and-mushroom', 1, 0, 0, 14, NULL, NULL),
(26, 7, 'Chicken Burger', 'Our flavors & ingredients to build our local burgers.', 19, '1687633462877.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\r\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 2, 'chicken-burger', 1, 0, 0, 14, NULL, NULL),
(27, 7, 'Double charcoal meat', 'Our flavors & ingredients to build our local burgers.', 19, '1687633629521.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\r\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 1, 'double-charcoal-meat', 0, 0, 0, 14, NULL, NULL),
(28, 7, 'Potato', 'Our flavors & ingredients to build our local burgers.', 8, '1687633826098.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\r\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 2, 'potato', 1, 0, 0, 66, NULL, NULL),
(29, 6, 'Soft Drink', 'Our flavors & ingredients to build our local burgers.', 5, '1687633729141.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\r\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 1, 'soft-drink', 1, 0, 0, 70, NULL, NULL),
(30, 6, 'Green Tea', 'Our flavors & ingredients to build our local burgers.', 5, '1687652356641.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\r\n\r\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\r\n', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequ untur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,', 2, 'soft-drink', 1, 0, 0, 70, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

CREATE TABLE `product_category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_category`
--

INSERT INTO `product_category` (`id`, `name`, `description`) VALUES
(1, 'Pizza', 'Dignissimos vel odit aliquam et cupiditate sunt minus aut impedit.'),
(2, 'Burgers', 'Ipsam numquam dolores eveniet modi non hic.'),
(3, 'Wraps', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'),
(4, 'Fries', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua '),
(5, 'Salad', 'unt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque In egestas erat imperdiet sed euismod nisi porta lorem mollis '),
(6, 'Drinks', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in ibus stibulum Ulla'),
(7, 'Beverages', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua');

-- --------------------------------------------------------

--
-- Table structure for table `product_cheese`
--

CREATE TABLE `product_cheese` (
  `id` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `price` int(100) NOT NULL,
  `cheese` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_cheese`
--

INSERT INTO `product_cheese` (`id`, `image`, `price`, `cheese`) VALUES
(2, '1693505264760.png', 5, 'cheese');

-- --------------------------------------------------------

--
-- Table structure for table `product_comments`
--

CREATE TABLE `product_comments` (
  `id` int(11) NOT NULL,
  `userID` int(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `productID` int(100) NOT NULL,
  `rating` int(5) NOT NULL,
  `body` varchar(500) NOT NULL,
  `isAccept` tinyint(1) NOT NULL DEFAULT 0,
  `isReply` tinyint(1) NOT NULL DEFAULT 0,
  `replyID` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_comments`
--

INSERT INTO `product_comments` (`id`, `userID`, `date`, `productID`, `rating`, `body`, `isAccept`, `isReply`, `replyID`) VALUES
(2, 2, 'Sep 17, 2023', 8, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 0, 0, 0),
(3, 2, 'Sep 17, 2023', 9, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(4, 2, 'Sep 17, 2023', 10, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(5, 2, 'Sep 17, 2023', 11, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(6, 2, 'Sep 17, 2023', 12, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(7, 2, 'Sep 17, 2023', 13, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(8, 2, 'Sep 17, 2023', 14, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(9, 2, 'Sep 17, 2023', 15, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(10, 2, 'Sep 17, 2023', 16, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(11, 2, 'Sep 17, 2023', 17, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(12, 2, 'Sep 17, 2023', 18, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(13, 2, 'Sep 17, 2023', 19, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(14, 2, 'Sep 17, 2023', 20, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(15, 2, 'Sep 17, 2023', 21, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(16, 2, 'Sep 17, 2023', 22, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(17, 2, 'Sep 17, 2023', 23, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(18, 2, 'Sep 17, 2023', 24, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(19, 2, 'Sep 17, 2023', 25, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(20, 2, 'Sep 17, 2023', 26, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(21, 2, 'Sep 17, 2023', 27, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(22, 2, 'Sep 17, 2023', 28, 5, 'How all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.', 1, 0, 0),
(23, 3, 'Sep 18, 2023', 8, 4, 'There anyone who loves or pursues or desires to obtain pain itself, because it is pain sed, because occasionally circumstances occur some great pleasure.', 0, 0, 0),
(24, 3, 'Sep 18, 2023', 10, 4, 'There anyone who loves or pursues or desires to obtain pain itself, because it is pain sed, because occasionally circumstances occur some great pleasure.', 1, 0, 0),
(25, 3, 'Sep 18, 2023', 11, 4, 'There anyone who loves or pursues or desires to obtain pain itself, because it is pain sed, because occasionally circumstances occur some great pleasure.', 1, 0, 0),
(26, 3, 'Sep 18, 2023', 12, 4, 'There anyone who loves or pursues or desires to obtain pain itself, because it is pain sed, because occasionally circumstances occur some great pleasure.', 1, 0, 0),
(27, 3, 'Sep 18, 2023', 13, 4, 'There anyone who loves or pursues or desires to obtain pain itself, because it is pain sed, because occasionally circumstances occur some great pleasure.', 1, 0, 0),
(28, 3, 'Sep 18, 2023', 14, 4, 'There anyone who loves or pursues or desires to obtain pain itself, because it is pain sed, because occasionally circumstances occur some great pleasure.', 1, 0, 0),
(29, 3, 'Sep 18, 2023', 15, 4, 'There anyone who loves or pursues or desires to obtain pain itself, because it is pain sed, because occasionally circumstances occur some great pleasure.', 1, 0, 0),
(30, 3, 'Sep 18, 2023', 16, 4, 'There anyone who loves or pursues or desires to obtain pain itself, because it is pain sed, because occasionally circumstances occur some great pleasure.', 1, 0, 0),
(31, 3, 'Sep 18, 2023', 17, 4, 'There anyone who loves or pursues or desires to obtain pain itself, because it is pain sed, because occasionally circumstances occur some great pleasure.', 1, 0, 0),
(32, 3, 'Sep 18, 2023', 18, 4, 'There anyone who loves or pursues or desires to obtain pain itself, because it is pain sed, because occasionally circumstances occur some great pleasure.', 1, 0, 0),
(33, 3, 'Sep 18, 2023', 19, 4, 'There anyone who loves or pursues or desires to obtain pain itself, because it is pain sed, because occasionally circumstances occur some great pleasure.', 1, 0, 0),
(34, 2, 'Sep 18, 2023', 10, 5, 'Thank you.', 1, 1, 24),
(35, 3, 'Sep 17, 2023', 10, 2, 'thanks.', 1, 1, 4),
(38, 10, 'Sep 18, 2023', 10, 4, 'There anyone who loves or pursues or desires to obtain pain itself, because it is pain sed, because occasionally circumstances occur some great pleasure.', 1, 1, 35),
(43, 10, 'September 28, 2023', 10, 4, 'your welcome!', 1, 1, 34),
(44, 10, 'September 28, 2023', 10, 3, 'realy good!', 1, 0, 0),
(45, 10, 'September 28, 2023', 10, 5, 'ok', 1, 1, 44),
(46, 10, 'September 28, 2023', 10, 5, 'gooooood', 1, 0, 0),
(47, 10, 'September 28, 2023', 10, 4, 'thank you', 1, 1, 46),
(48, 10, 'September 28, 2023', 8, 5, 'delicious!', 1, 0, 0),
(49, 10, 'September 28, 2023', 8, 4, 'thank you very much hooman', 1, 1, 48),
(50, 10, 'October 6, 2023', 18, 5, 'very goood!', 0, 0, 0),
(51, 10, 'October 6, 2023', 18, 5, 'ok thanks', 0, 1, 12);

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `id` int(11) NOT NULL,
  `productID` int(100) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`id`, `productID`, `image`) VALUES
(11, 8, '1687695414777.jpeg'),
(12, 24, '1687695478316.jpeg'),
(13, 24, '1687695545158.jpeg'),
(14, 8, '1687695550389.jpeg'),
(15, 9, '1687695690716.jpeg'),
(16, 9, '1687695695064.jpeg'),
(17, 10, '1687697581576.jpeg'),
(18, 10, '1687697587447.jpeg'),
(19, 18, '1687697686796.jpeg'),
(20, 18, '1687697691457.jpeg'),
(21, 22, '1687697700300.jpeg'),
(22, 22, '1687697705175.jpeg'),
(23, 11, '1687697738975.jpeg'),
(24, 11, '1687697743158.jpeg'),
(25, 19, '1687697750006.jpeg'),
(26, 19, '1687697753625.jpeg'),
(27, 12, '1687697838172.jpeg'),
(28, 12, '1687697842442.jpeg'),
(29, 25, '1687697852702.jpeg'),
(30, 25, '1687697857336.jpeg'),
(31, 13, '1687697964096.jpeg'),
(32, 13, '1687697968776.jpeg'),
(33, 20, '1687697980436.jpeg'),
(34, 20, '1687697983931.jpeg'),
(35, 14, '1687698325779.jpeg'),
(36, 14, '1687698330018.jpeg'),
(37, 21, '1687698337743.jpeg'),
(38, 21, '1687698344838.jpeg'),
(39, 27, '1687698354340.jpeg'),
(40, 27, '1687698362628.jpeg'),
(41, 15, '1687698462681.jpeg'),
(42, 15, '1687698467414.jpeg'),
(43, 16, '1687698558014.jpeg'),
(44, 16, '1687698562559.jpeg'),
(45, 28, '1687698571149.jpeg'),
(46, 28, '1687698576956.jpeg'),
(47, 17, '1687698667360.jpeg'),
(48, 17, '1687698676641.jpeg'),
(49, 23, '1687698682970.jpeg'),
(50, 23, '1687698688891.jpeg'),
(51, 29, '1687652356641.jpeg'),
(52, 29, '1687698462681.jpeg'),
(53, 30, '1687652356641.jpeg'),
(54, 30, '1687698462681.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `product_sauces`
--

CREATE TABLE `product_sauces` (
  `id` int(11) NOT NULL,
  `sauces` varchar(100) NOT NULL,
  `price` int(100) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_sauces`
--

INSERT INTO `product_sauces` (`id`, `sauces`, `price`, `image`) VALUES
(1, 'BBQ sauces', 2, '1693504919524.png'),
(2, 'Pesto sauces', 2, '1693504951561.png'),
(3, 'Salsa sauces', 2, '1693504973163.png');

-- --------------------------------------------------------

--
-- Table structure for table `product_size`
--

CREATE TABLE `product_size` (
  `id` int(11) NOT NULL,
  `size` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `price` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_size`
--

INSERT INTO `product_size` (`id`, `size`, `image`, `price`) VALUES
(1, 'small size', '1693503294788.png', 10),
(2, 'medium size', '1693503352427.png', 15),
(3, 'large size', '1693503366057.png', 20);

-- --------------------------------------------------------

--
-- Table structure for table `product_specification`
--

CREATE TABLE `product_specification` (
  `id` int(11) NOT NULL,
  `color` varchar(200) NOT NULL,
  `size` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_specification`
--

INSERT INTO `product_specification` (`id`, `color`, `size`) VALUES
(1, 'Gray, Green, Red', 'Large, Medium, Small'),
(2, 'Blue, Green, Red', 'Large, Medium'),
(3, 'Blue, Red', 'Large');

-- --------------------------------------------------------

--
-- Table structure for table `product_templates`
--

CREATE TABLE `product_templates` (
  `id` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `price` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_templates`
--

INSERT INTO `product_templates` (`id`, `image`, `price`) VALUES
(1, '1693506120724.jpeg', 15),
(2, '1693506125748.jpeg', 15),
(3, '1693506130180.jpeg', 15),
(4, '1693506134532.jpeg', 15);

-- --------------------------------------------------------

--
-- Table structure for table `product_toppings`
--

CREATE TABLE `product_toppings` (
  `id` int(11) NOT NULL,
  `toppings` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `price` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_toppings`
--

INSERT INTO `product_toppings` (`id`, `toppings`, `image`, `price`) VALUES
(1, 'potato slices', '1693505508296.png', 4),
(2, 'mushrooms', '1693505536701.png', 3),
(3, 'broccoli', '1693505568192.png', 3),
(4, 'tomatoes', '1693505605454.png', 5);

-- --------------------------------------------------------

--
-- Table structure for table `provinces`
--

CREATE TABLE `provinces` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `provinces`
--

INSERT INTO `provinces` (`id`, `title`) VALUES
(1, 'California'),
(2, 'Texas'),
(3, 'Florida'),
(4, 'Ohio'),
(5, 'Hawaii'),
(6, 'Alaska'),
(7, 'Virginia'),
(8, 'Georgia');

-- --------------------------------------------------------

--
-- Table structure for table `registered`
--

CREATE TABLE `registered` (
  `token` varchar(500) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `id` bigint(255) NOT NULL,
  `expiresAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registered`
--

INSERT INTO `registered` (`token`, `email`, `password`, `id`, `expiresAt`) VALUES
('JFXILU1j0zi99YlgaF0w1zlcCMEseKG6GoNeK89KaMAV1X_t', 'hoomanmousavi77@gmail.com', '$2b$10$5tO60Bmceewld7hXNI.WuOO3RVxDCahsMyDCr130suo2L8BufJTnG', 16, '2023-06-24 10:42:22');

-- --------------------------------------------------------

--
-- Table structure for table `sales_chart`
--

CREATE TABLE `sales_chart` (
  `id` int(11) NOT NULL,
  `month` varchar(100) NOT NULL,
  `sale_amount` bigint(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales_chart`
--

INSERT INTO `sales_chart` (`id`, `month`, `sale_amount`) VALUES
(1, 'January', 10000),
(2, 'February', 18000),
(3, 'March', 9000),
(4, 'April', 19000),
(5, 'May', 35000),
(6, 'June', 30000),
(7, 'July', 2000),
(8, 'Augest', 50000),
(9, 'September', 18000),
(10, 'October', 22000),
(11, 'November', 32000),
(12, 'December', 15000);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `amount` int(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `issueTracking` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `orderID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `amount`, `status`, `issueTracking`, `date`, `orderID`) VALUES
(1, 80000, '1', 'c77f14b928720c7a7d35d8adbe853e39', '2023-6-7', 44),
(4, 55, '0', 'ab65b59788f048d51b17a895d6350cfa', '2023-6-7', 46),
(5, 72, '0', '3970f043d88846a11a484833ba22cd5b', '2023-8-8', 61),
(6, 24, '0', 'f1eca30430d5711fd66c4feb50b8d1cc', '2023-8-8', 62),
(7, 24, '0', '4bc44872f29bac6bf4c88500e8382fbc', '2023-8-8', 62),
(8, 24, '0', '4bc44872f29bac6bf4c88500e8382fbc', '2023-8-8', 62),
(9, 24, '0', '7e83fd0aff1f8487dfcb98d76d523d62', '2023-8-8', 62),
(10, 71, '1', 'd82c84030eaab6d57e001d76aae778d4', '2023-8-8', 63),
(11, 12, '1', '23515beee8c695d1e2b0c097bdb19681', '2023-8-8', 64);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `profile_image` varchar(100) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `token` varchar(200) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `registered_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `profile_image`, `password`, `phone`, `email`, `token`, `isAdmin`, `registered_at`) VALUES
(2, 'Steven', 'Rich', 'steven_rich', '1687779147061.jpeg', '$2b$10$j86VpwhTqZr40fqvxFdoLO9ZNJKNCNzU9.bGxRQ6Ev.uVUrqUBpBC', '09012564789', 'steven@gmail.com', 'AkdjnSJkcGmMT_PuYgvRKannnAZy88-kVjE-QZTsxf9LFqsz', 0, '02 March. 2022'),
(3, 'William', 'Cobus', 'william_cobus', '1687779191520.jpeg', '$2b$10$j86VpwhTqZr40fqvxFdoLO9ZNJKNCNzU9.bGxRQ6Ev.uVUrqUBpBC', '09012564789', 'william@gmail.com', 'RDk-pzRunO8lGKm9AtmGIBOHAJSl0OzXV3FmCyuAStOWecb6', 0, '05 March. 2022'),
(5, 'Belley', 'George', 'george_Belley', '1688207155137.jpeg', '$2b$10$j86VpwhTqZr40fqvxFdoLO9ZNJKNCNzU9.bGxRQ6Ev.uVUrqUBpBC', '09012564789', 'belly@gmail.com', 's03qEPz4fjCejvb2xuY83ZArwxwRxBL37f9kUg0fLS4xtahx', 0, '10 March. 2022'),
(6, 'Adam', 'Smith', 'adam_smith', '1688207214478.jpeg', '$2b$10$j86VpwhTqZr40fqvxFdoLO9ZNJKNCNzU9.bGxRQ6Ev.uVUrqUBpBC', '09012564789', 'smith@gmail.com', 'fmJ0sNTgXjtxAdvjrsS9vleLtCP2GVAtyMY6eVfE67mDcF4O', 0, '15 March. 2022'),
(7, 'Nasir', 'Jalali', 'nasir_jalali', '1688207258297.jpeg', '$2b$10$j86VpwhTqZr40fqvxFdoLO9ZNJKNCNzU9.bGxRQ6Ev.uVUrqUBpBC', '09012564789', 'nasir@gmail.com', 'lmQH83jCLvDRw0wfZGfVAdZHXrhYXJ1GYgfWAT6BnYzcUNra', 0, '12 March. 2022'),
(10, 'hooman', 'mousavi', 'hooman_77', '1693926891853.jpeg', '$2b$10$j86VpwhTqZr40fqvxFdoLO9ZNJKNCNzU9.bGxRQ6Ev.uVUrqUBpBC', '09921929653', 'hoomanmousavi77@gmail.com', '81wde-hN-grxKyVaRMmRs-yGWVS97Nuk_WHpdJWK-fs4EW5d', 1, '18 March. 2022'),
(12, 'test', 'test', 'test', '1688207258297.jpeg', '$2b$10$myVkFnxtQvJNiSaQDxb37OH8oOp2KbhkQgMzlBbXjE7uYIOmeeUIa', '09921929853', 'test33@gmail.com', 'b_J8r8GTFwxaTMsQqv-oKC7TIuTBWQSw7iWYBfg4jf6tnJJT', 0, '18 March. 2022'),
(18, 'hooman', 'mousavi', 'hooman_23', '1693046208066.jpeg', '$2b$10$13BrqrsIdpu8mrixqnmdo.8YFjqJ3zv/9/o6Xq4C.Hvmgh.y7xSpW', '09921829653', 'hoomanmousavi66@gmail.com', 'HqMj8yTCpsGcbHrEuIgr6MLyVf5cY3LUZVNL0zQrHgxRldaD', 0, '2023-8-26'),
(19, 'alireza', 'alikhani', 'alireza_98', '1693051209474.jpeg', '$2b$10$R4am8/6X6prYvG/JxOuSTe62g3Gtw5cvbh6GXKzZ5hX0f8e0MbXvy', '09129154038', 'ali77@gmail.com', 'D5FX-tlNXHY16clLdLXj6InCPD2jvtPTfEqrmxI7INF60rgC', 0, '2023-8-26');

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `address` varchar(5000) NOT NULL,
  `provinceID` int(100) NOT NULL,
  `cityID` int(100) NOT NULL,
  `postal_code` int(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `userID` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`id`, `title`, `address`, `provinceID`, `cityID`, `postal_code`, `phone`, `userID`) VALUES
(9, 'Home', ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur doloremque et officia quia quisquam veniam! Asperiores atque culpa illo, libero optio qui quis, quo sint soluta totam vitae voluptatibus!', 2, 6, 56789, '09921929654', 10),
(10, 'Work', ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur doloremque et officia quia quisquam veniam! Asperiores atque culpa illo, libero optio qui quis, quo sint soluta totam vitae voluptatibus!', 7, 21, 56987, '091219154038', 10);

-- --------------------------------------------------------

--
-- Table structure for table `visitors_chart`
--

CREATE TABLE `visitors_chart` (
  `id` int(11) NOT NULL,
  `month` varchar(100) NOT NULL,
  `visitors_amount` bigint(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visitors_chart`
--

INSERT INTO `visitors_chart` (`id`, `month`, `visitors_amount`) VALUES
(1, 'January', 65000),
(2, 'February', 80000),
(3, 'March', 55000),
(4, 'April', 32000),
(5, 'May', 120000),
(6, 'June', 88000),
(7, 'July', 72000),
(8, 'Augest', 92000),
(9, 'September', 130000),
(10, 'October', 15000),
(11, 'November', 56000),
(12, 'December', 59000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_ibfk_1` (`userID`),
  ADD KEY `orderID` (`orderID`),
  ADD KEY `basket_ibfk_4` (`productID`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryID` (`categoryID`),
  ADD KEY `adminID` (`adminID`);

--
-- Indexes for table `blog_category`
--
ALTER TABLE `blog_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_comments`
--
ALTER TABLE `blog_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `blogID` (`blogID`);

--
-- Indexes for table `blog_content`
--
ALTER TABLE `blog_content`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blogID` (`blogID`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provinceID` (`provinceID`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `couponID` (`couponID`),
  ADD KEY `addressID` (`addressID`),
  ADD KEY `statusID` (`statusID`),
  ADD KEY `paymentStatusID` (`paymentStatusID`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_status`
--
ALTER TABLE `payment_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryID` (`categoryID`),
  ADD KEY `specification` (`specification`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_cheese`
--
ALTER TABLE `product_cheese`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_comments`
--
ALTER TABLE `product_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `product_sauces`
--
ALTER TABLE `product_sauces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_size`
--
ALTER TABLE `product_size`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_specification`
--
ALTER TABLE `product_specification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_templates`
--
ALTER TABLE `product_templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_toppings`
--
ALTER TABLE `product_toppings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registered`
--
ALTER TABLE `registered`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_chart`
--
ALTER TABLE `sales_chart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderID` (`orderID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `cityID` (`cityID`),
  ADD KEY `provinceID` (`provinceID`);

--
-- Indexes for table `visitors_chart`
--
ALTER TABLE `visitors_chart`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `basket`
--
ALTER TABLE `basket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `blog_category`
--
ALTER TABLE `blog_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `blog_comments`
--
ALTER TABLE `blog_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `blog_content`
--
ALTER TABLE `blog_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment_status`
--
ALTER TABLE `payment_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `product_cheese`
--
ALTER TABLE `product_cheese`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product_comments`
--
ALTER TABLE `product_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `product_sauces`
--
ALTER TABLE `product_sauces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product_size`
--
ALTER TABLE `product_size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product_specification`
--
ALTER TABLE `product_specification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product_templates`
--
ALTER TABLE `product_templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product_toppings`
--
ALTER TABLE `product_toppings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `registered`
--
ALTER TABLE `registered`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `sales_chart`
--
ALTER TABLE `sales_chart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `visitors_chart`
--
ALTER TABLE `visitors_chart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `basket`
--
ALTER TABLE `basket`
  ADD CONSTRAINT `basket_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `basket_ibfk_3` FOREIGN KEY (`orderID`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `basket_ibfk_4` FOREIGN KEY (`productID`) REFERENCES `product` (`id`);

--
-- Constraints for table `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `blog_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `blog_category` (`id`),
  ADD CONSTRAINT `blog_ibfk_3` FOREIGN KEY (`adminID`) REFERENCES `admins` (`id`);

--
-- Constraints for table `blog_comments`
--
ALTER TABLE `blog_comments`
  ADD CONSTRAINT `blog_comments_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `blog_comments_ibfk_2` FOREIGN KEY (`blogID`) REFERENCES `blog` (`id`);

--
-- Constraints for table `blog_content`
--
ALTER TABLE `blog_content`
  ADD CONSTRAINT `blog_content_ibfk_1` FOREIGN KEY (`blogID`) REFERENCES `blog` (`id`);

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`provinceID`) REFERENCES `provinces` (`id`);

--
-- Constraints for table `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorite_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `product` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`couponID`) REFERENCES `coupons` (`id`),
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`statusID`) REFERENCES `order_status` (`id`),
  ADD CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`paymentStatusID`) REFERENCES `payment_status` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `product_category` (`id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`specification`) REFERENCES `product_specification` (`id`);

--
-- Constraints for table `product_comments`
--
ALTER TABLE `product_comments`
  ADD CONSTRAINT `product_comments_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `product_comments_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `product` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`id`);

--
-- Constraints for table `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_address_ibfk_2` FOREIGN KEY (`cityID`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `user_address_ibfk_3` FOREIGN KEY (`provinceID`) REFERENCES `provinces` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
