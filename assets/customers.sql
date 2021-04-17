-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2020 at 05:02 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hashemdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(80) NOT NULL,
  `active` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `email`, `name`, `active`) VALUES
(40, 'email@ihashem.com', 'Mohammed Hashem', 1),
(41, 'email@ihashem.com', 'Mohammed Hashem', 1),
(42, 'email@ihashem.com', 'Mohammed Hashem', 1),
(43, 'email@ihashem.com', 'Mohammed Hashem', 1),
(44, 'email@ihashem.com', 'Mohammed Hashem', 1),
(45, 'email@ihashem.com', 'Mohammed Hashem', 1),
(46, 'email@ihashem.com', 'Mohammed Hashem', 1),
(47, 'email@ihashem.com', 'Mohammed Hashem', 1),
(48, 'email@ihashem.com', 'Mohammed Hashem', 1),
(49, 'email@ihashem.com', 'Mohammed Hashem', 1),
(50, 'email@ihashem.com', 'Mohammed Hashem', 1),
(51, 'email@ihashem.com', 'Mohammed Hashem', 1),
(52, 'email@ihashem.com', 'Mohammed Hashem', 1),
(53, 'email@ihashem.com', 'Mohammed Hashem', 1),
(54, 'email@ihashem.com', 'Mohammed Hashem', 1),
(55, 'email@ihashem.com', 'Mohammed Hashem', 1),
(56, 'email@ihashem.com', 'Mohammed Hashem', 1),
(57, 'email@ihashem.com', 'Mohammed Hashem', 1),
(58, 'email@ihashem.com', 'Mohammed Hashem', 1),
(59, 'email@ihashem.com', 'Mohammed Hashem', 1),
(60, 'email@ihashem.com', 'Mohammed Hashem', 1),
(61, 'email@ihashem.com', 'Mohammed Hashem', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
