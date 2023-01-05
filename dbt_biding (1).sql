-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 05, 2023 at 01:49 PM
-- Server version: 8.0.31-0ubuntu0.20.04.2
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trade`
--

-- --------------------------------------------------------

--
-- Table structure for table `dbt_biding`
--

CREATE TABLE `dbt_biding` (
  `id` bigint NOT NULL,
  `bid_type` varchar(50) NOT NULL,
  `bid_price` double(19,8) NOT NULL,
  `bid_qty` double(19,8) NOT NULL,
  `bid_qty_available` double(19,8) NOT NULL,
  `total_amount` double(19,8) NOT NULL,
  `amount_available` double(19,8) NOT NULL,
  `coin_id` varchar(50) DEFAULT NULL,
  `currency_symbol` varchar(100) NOT NULL,
  `market_id` int DEFAULT NULL,
  `market_symbol` varchar(100) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `open_order` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fees_amount` double(19,8) NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '"1=Complete, 2=Running"'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dbt_biding`
--

INSERT INTO `dbt_biding` (`id`, `bid_type`, `bid_price`, `bid_qty`, `bid_qty_available`, `total_amount`, `amount_available`, `coin_id`, `currency_symbol`, `market_id`, `market_symbol`, `user_id`, `open_order`, `fees_amount`, `status`) VALUES
(3042245, 'Buy', 85.11000000, 12.11000000, 12.11000000, 86.43000000, 86.43000000, NULL, 'BUSD', NULL, 'BUSD_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042244, 'Sell', 85.04000000, 12.04000000, 12.04000000, 85.52000000, 85.52000000, NULL, 'BUSD', NULL, 'BUSD_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042243, 'Buy', 85.11000000, 12.11000000, 12.11000000, 86.43000000, 86.43000000, NULL, 'BUSD', NULL, 'BUSD_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042242, 'Sell', 85.03000000, 12.03000000, 12.03000000, 85.39000000, 85.39000000, NULL, 'BUSD', NULL, 'BUSD_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042241, 'Buy', 85.11000000, 12.11000000, 12.11000000, 86.43000000, 86.43000000, NULL, 'BUSD', NULL, 'BUSD_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042240, 'Sell', 85.02000000, 12.02000000, 12.02000000, 85.26000000, 85.26000000, NULL, 'BUSD', NULL, 'BUSD_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042239, 'Buy', 85.11000000, 12.11000000, 12.11000000, 86.43000000, 86.43000000, NULL, 'BUSD', NULL, 'BUSD_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042238, 'Sell', 85.01000000, 12.01000000, 12.01000000, 85.13000000, 85.13000000, NULL, 'BUSD', NULL, 'BUSD_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042237, 'Buy', 85.11000000, 12.11000000, 12.11000000, 86.43000000, 86.43000000, NULL, 'BUSD', NULL, 'BUSD_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042236, 'Sell', 85.00000000, 12.00000000, 12.00000000, 85.00000000, 85.00000000, NULL, 'BUSD', NULL, 'BUSD_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042235, 'Buy', 1.06000000, 12.10000000, 12.10000000, 2.26000000, 2.26000000, NULL, 'BUSD', NULL, 'BUSD_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042234, 'Sell', 1.00000000, 12.04000000, 12.04000000, 1.48000000, 1.48000000, NULL, 'BUSD', NULL, 'BUSD_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042233, 'Buy', 1.06000000, 12.10000000, 12.10000000, 2.26000000, 2.26000000, NULL, 'BUSD', NULL, 'BUSD_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042232, 'Sell', 0.99000000, 12.03000000, 12.03000000, 1.35000000, 1.35000000, NULL, 'BUSD', NULL, 'BUSD_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042231, 'Buy', 1.06000000, 12.10000000, 12.10000000, 2.26000000, 2.26000000, NULL, 'BUSD', NULL, 'BUSD_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042230, 'Sell', 0.98000000, 12.02000000, 12.02000000, 1.22000000, 1.22000000, NULL, 'BUSD', NULL, 'BUSD_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042229, 'Buy', 1.06000000, 12.10000000, 12.10000000, 2.26000000, 2.26000000, NULL, 'BUSD', NULL, 'BUSD_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042228, 'Sell', 0.97000000, 12.01000000, 12.01000000, 1.09000000, 1.09000000, NULL, 'BUSD', NULL, 'BUSD_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042227, 'Buy', 1.06000000, 12.10000000, 12.10000000, 2.26000000, 2.26000000, NULL, 'BUSD', NULL, 'BUSD_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042226, 'Sell', 0.96000000, 12.00000000, 12.00000000, 0.96000000, 0.96000000, NULL, 'BUSD', NULL, 'BUSD_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042225, 'Buy', 0.09072800, 1513686.09000000, 1513686.09000000, 136231.83072800, 136231.83072800, NULL, 'SHIB', NULL, 'SHIB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042224, 'Sell', 0.04072800, 1513686.04000000, 1513686.04000000, 60547.48072800, 60547.48072800, NULL, 'SHIB', NULL, 'SHIB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042223, 'Buy', 0.09072800, 1513686.09000000, 1513686.09000000, 136231.83072800, 136231.83072800, NULL, 'SHIB', NULL, 'SHIB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042222, 'Sell', 0.03072800, 1513686.03000000, 1513686.03000000, 45410.61072800, 45410.61072800, NULL, 'SHIB', NULL, 'SHIB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042221, 'Buy', 0.09072800, 1513686.09000000, 1513686.09000000, 136231.83072800, 136231.83072800, NULL, 'SHIB', NULL, 'SHIB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042220, 'Sell', 0.02072800, 1513686.02000000, 1513686.02000000, 30273.74072800, 30273.74072800, NULL, 'SHIB', NULL, 'SHIB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042219, 'Buy', 0.09072800, 1513686.09000000, 1513686.09000000, 136231.83072800, 136231.83072800, NULL, 'SHIB', NULL, 'SHIB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042218, 'Sell', 0.01072800, 1513686.01000000, 1513686.01000000, 15136.87072800, 15136.87072800, NULL, 'SHIB', NULL, 'SHIB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042217, 'Buy', 0.09072800, 1513686.09000000, 1513686.09000000, 136231.83072800, 136231.83072800, NULL, 'SHIB', NULL, 'SHIB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042216, 'Sell', 0.00072800, 1513686.00000000, 1513686.00000000, 0.00072800, 0.00072800, NULL, 'SHIB', NULL, 'SHIB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042215, 'Buy', 0.08000851, 1513686.08000000, 1513686.08000000, 121094.96000851, 121094.96000851, NULL, 'SHIB', NULL, 'SHIB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042214, 'Sell', 0.04000851, 1513686.04000000, 1513686.04000000, 60547.48000851, 60547.48000851, NULL, 'SHIB', NULL, 'SHIB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042213, 'Buy', 0.08000851, 1513686.08000000, 1513686.08000000, 121094.96000851, 121094.96000851, NULL, 'SHIB', NULL, 'SHIB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042212, 'Sell', 0.03000851, 1513686.03000000, 1513686.03000000, 45410.61000851, 45410.61000851, NULL, 'SHIB', NULL, 'SHIB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042211, 'Buy', 0.08000851, 1513686.08000000, 1513686.08000000, 121094.96000851, 121094.96000851, NULL, 'SHIB', NULL, 'SHIB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042210, 'Sell', 0.02000851, 1513686.02000000, 1513686.02000000, 30273.74000851, 30273.74000851, NULL, 'SHIB', NULL, 'SHIB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042209, 'Buy', 0.08000851, 1513686.08000000, 1513686.08000000, 121094.96000851, 121094.96000851, NULL, 'SHIB', NULL, 'SHIB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042208, 'Sell', 0.01000851, 1513686.01000000, 1513686.01000000, 15136.87000851, 15136.87000851, NULL, 'SHIB', NULL, 'SHIB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042207, 'Buy', 0.08000851, 1513686.08000000, 1513686.08000000, 121094.96000851, 121094.96000851, NULL, 'SHIB', NULL, 'SHIB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042206, 'Sell', 0.00000851, 1513686.00000000, 1513686.00000000, 0.00000851, 0.00000851, NULL, 'SHIB', NULL, 'SHIB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042205, 'Buy', 4.76840000, 1000.07000000, 1000.07000000, 74.76840000, 74.76840000, NULL, 'TRX', NULL, 'TRX_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042204, 'Sell', 4.73840000, 1000.04000000, 1000.04000000, 44.73840000, 44.73840000, NULL, 'TRX', NULL, 'TRX_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042203, 'Buy', 4.76840000, 1000.07000000, 1000.07000000, 74.76840000, 74.76840000, NULL, 'TRX', NULL, 'TRX_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042202, 'Sell', 4.72840000, 1000.03000000, 1000.03000000, 34.72840000, 34.72840000, NULL, 'TRX', NULL, 'TRX_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042201, 'Buy', 4.76840000, 1000.07000000, 1000.07000000, 74.76840000, 74.76840000, NULL, 'TRX', NULL, 'TRX_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042200, 'Sell', 4.71840000, 1000.02000000, 1000.02000000, 24.71840000, 24.71840000, NULL, 'TRX', NULL, 'TRX_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042199, 'Buy', 4.76840000, 1000.07000000, 1000.07000000, 74.76840000, 74.76840000, NULL, 'TRX', NULL, 'TRX_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042198, 'Sell', 4.70840000, 1000.01000000, 1000.01000000, 14.70840000, 14.70840000, NULL, 'TRX', NULL, 'TRX_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042197, 'Buy', 4.76840000, 1000.07000000, 1000.07000000, 74.76840000, 74.76840000, NULL, 'TRX', NULL, 'TRX_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042196, 'Sell', 4.69840000, 1000.00000000, 1000.00000000, 4.69840000, 4.69840000, NULL, 'TRX', NULL, 'TRX_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042195, 'Buy', 22290.06000000, 0.06100000, 0.06100000, 22290.06006000, 22290.06006000, NULL, 'BNB', NULL, 'BNB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042194, 'Sell', 22290.04000000, 0.04100000, 0.04100000, 22290.04004000, 22290.04004000, NULL, 'BNB', NULL, 'BNB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042193, 'Buy', 22290.06000000, 0.06100000, 0.06100000, 22290.06006000, 22290.06006000, NULL, 'BNB', NULL, 'BNB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042192, 'Sell', 22290.03000000, 0.03100000, 0.03100000, 22290.03003000, 22290.03003000, NULL, 'BNB', NULL, 'BNB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042191, 'Buy', 22290.06000000, 0.06100000, 0.06100000, 22290.06006000, 22290.06006000, NULL, 'BNB', NULL, 'BNB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042190, 'Sell', 22290.02000000, 0.02100000, 0.02100000, 22290.02002000, 22290.02002000, NULL, 'BNB', NULL, 'BNB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042189, 'Buy', 22290.06000000, 0.06100000, 0.06100000, 22290.06006000, 22290.06006000, NULL, 'BNB', NULL, 'BNB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042188, 'Sell', 22290.01000000, 0.01100000, 0.01100000, 22290.01001000, 22290.01001000, NULL, 'BNB', NULL, 'BNB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042187, 'Buy', 22290.06000000, 0.06100000, 0.06100000, 22290.06006000, 22290.06006000, NULL, 'BNB', NULL, 'BNB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042186, 'Sell', 22290.00000000, 0.00100000, 0.00100000, 22290.00000000, 22290.00000000, NULL, 'BNB', NULL, 'BNB_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042185, 'Buy', 107000.05000000, 0.05100000, 0.05100000, 107000.05005000, 107000.05005000, NULL, 'ETH', NULL, 'ETH_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042184, 'Sell', 107000.04000000, 0.04100000, 0.04100000, 107000.04004000, 107000.04004000, NULL, 'ETH', NULL, 'ETH_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042183, 'Buy', 107000.05000000, 0.05100000, 0.05100000, 107000.05005000, 107000.05005000, NULL, 'ETH', NULL, 'ETH_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042182, 'Sell', 107000.03000000, 0.03100000, 0.03100000, 107000.03003000, 107000.03003000, NULL, 'ETH', NULL, 'ETH_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042181, 'Buy', 107000.05000000, 0.05100000, 0.05100000, 107000.05005000, 107000.05005000, NULL, 'ETH', NULL, 'ETH_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042180, 'Sell', 107000.02000000, 0.02100000, 0.02100000, 107000.02002000, 107000.02002000, NULL, 'ETH', NULL, 'ETH_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042179, 'Buy', 107000.05000000, 0.05100000, 0.05100000, 107000.05005000, 107000.05005000, NULL, 'ETH', NULL, 'ETH_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042178, 'Sell', 107000.01000000, 0.01100000, 0.01100000, 107000.01001000, 107000.01001000, NULL, 'ETH', NULL, 'ETH_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042177, 'Buy', 107000.05000000, 0.05100000, 0.05100000, 107000.05005000, 107000.05005000, NULL, 'ETH', NULL, 'ETH_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042176, 'Sell', 107000.00000000, 0.00100000, 0.00100000, 107000.00000000, 107000.00000000, NULL, 'ETH', NULL, 'ETH_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042175, 'Buy', 1447979.04000000, 0.13875000, 0.13875000, 1447979.04395000, 1447979.04395000, NULL, 'BTC', NULL, 'BTC_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042174, 'Sell', 1447979.04000000, 0.13875000, 0.13875000, 1447979.04395000, 1447979.04395000, NULL, 'BTC', NULL, 'BTC_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042173, 'Buy', 1447979.04000000, 0.13875000, 0.13875000, 1447979.04395000, 1447979.04395000, NULL, 'BTC', NULL, 'BTC_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042172, 'Sell', 1447979.03000000, 0.12875000, 0.12875000, 1447979.03296250, 1447979.03296250, NULL, 'BTC', NULL, 'BTC_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042171, 'Buy', 1447979.04000000, 0.13875000, 0.13875000, 1447979.04395000, 1447979.04395000, NULL, 'BTC', NULL, 'BTC_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042170, 'Sell', 1447979.02000000, 0.11875000, 0.11875000, 1447979.02197500, 1447979.02197500, NULL, 'BTC', NULL, 'BTC_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042169, 'Buy', 1447979.04000000, 0.13875000, 0.13875000, 1447979.04395000, 1447979.04395000, NULL, 'BTC', NULL, 'BTC_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042168, 'Sell', 1447979.01000000, 0.10875000, 0.10875000, 1447979.01098750, 1447979.01098750, NULL, 'BTC', NULL, 'BTC_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042167, 'Buy', 1447979.04000000, 0.13875000, 0.13875000, 1447979.04395000, 1447979.04395000, NULL, 'BTC', NULL, 'BTC_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042166, 'Sell', 1447979.00000000, 0.09875000, 0.09875000, 1447979.00000000, 1447979.00000000, NULL, 'BTC', NULL, 'BTC_INR', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042165, 'Buy', 0.08411000, 500.03000000, 500.03000000, 15.08411000, 15.08411000, NULL, 'TRX', NULL, 'TRX_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042164, 'Sell', 0.09411000, 500.04000000, 500.04000000, 20.09411000, 20.09411000, NULL, 'TRX', NULL, 'TRX_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042163, 'Buy', 0.08411000, 500.03000000, 500.03000000, 15.08411000, 15.08411000, NULL, 'TRX', NULL, 'TRX_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042162, 'Sell', 0.08411000, 500.03000000, 500.03000000, 15.08411000, 15.08411000, NULL, 'TRX', NULL, 'TRX_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042161, 'Buy', 0.08411000, 500.03000000, 500.03000000, 15.08411000, 15.08411000, NULL, 'TRX', NULL, 'TRX_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042160, 'Sell', 0.07411000, 500.02000000, 500.02000000, 10.07411000, 10.07411000, NULL, 'TRX', NULL, 'TRX_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042159, 'Buy', 0.08411000, 500.03000000, 500.03000000, 15.08411000, 15.08411000, NULL, 'TRX', NULL, 'TRX_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042158, 'Buy', 85.00000000, 0.00081699, 0.00081699, 0.06944444, 0.06944444, NULL, 'BUSD', NULL, 'BUSD_INR', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042157, 'Sell', 0.06411000, 500.01000000, 500.01000000, 5.06411000, 5.06411000, NULL, 'TRX', NULL, 'TRX_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042156, 'Sell', 85.00000000, 0.00081699, 0.00081699, 0.06944444, 0.06944444, NULL, 'BUSD', NULL, 'BUSD_INR', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042155, 'Buy', 0.08411000, 500.03000000, 500.03000000, 15.08411000, 15.08411000, NULL, 'TRX', NULL, 'TRX_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042154, 'Buy', 0.96000000, 0.07233796, 0.07233796, 0.06944444, 0.06944444, NULL, 'BUSD', NULL, 'BUSD_USDT', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042153, 'Sell', 0.05411000, 500.00000000, 500.00000000, 0.05411000, 0.05411000, NULL, 'TRX', NULL, 'TRX_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042152, 'Sell', 0.96000000, 0.07233796, 0.07233796, 0.06944444, 0.06944444, NULL, 'BUSD', NULL, 'BUSD_USDT', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042151, 'Buy', 258.12000000, 0.03680000, 0.03680000, 258.12033600, 258.12033600, NULL, 'BNB', NULL, 'BNB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042150, 'Buy', 0.00072800, 95.39072039, 95.39072039, 0.06944444, 0.06944444, NULL, 'SHIB', NULL, 'SHIB_INR', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042149, 'Sell', 258.14000000, 0.05680000, 0.05680000, 258.14067200, 258.14067200, NULL, 'BNB', NULL, 'BNB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042148, 'Sell', 0.00072800, 95.39072039, 95.39072039, 0.06944444, 0.06944444, NULL, 'SHIB', NULL, 'SHIB_INR', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042147, 'Buy', 258.12000000, 0.03680000, 0.03680000, 258.12033600, 258.12033600, NULL, 'BNB', NULL, 'BNB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042146, 'Buy', 0.00000851, 8160.33424729, 8160.33424729, 0.06944444, 0.06944444, NULL, 'SHIB', NULL, 'SHIB_USDT', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042145, 'Sell', 258.13000000, 0.04680000, 0.04680000, 258.13050400, 258.13050400, NULL, 'BNB', NULL, 'BNB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042144, 'Sell', 0.00000851, 8160.33424729, 8160.33424729, 0.06944444, 0.06944444, NULL, 'SHIB', NULL, 'SHIB_USDT', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042143, 'Buy', 258.12000000, 0.03680000, 0.03680000, 258.12033600, 258.12033600, NULL, 'BNB', NULL, 'BNB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042142, 'Buy', 4.69840000, 0.01478045, 0.01478045, 0.06944444, 0.06944444, NULL, 'TRX', NULL, 'TRX_INR', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042141, 'Sell', 258.12000000, 0.03680000, 0.03680000, 258.12033600, 258.12033600, NULL, 'BNB', NULL, 'BNB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042140, 'Sell', 4.69840000, 0.01478045, 0.01478045, 0.06944444, 0.06944444, NULL, 'TRX', NULL, 'TRX_INR', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042139, 'Buy', 258.12000000, 0.03680000, 0.03680000, 258.12033600, 258.12033600, NULL, 'BNB', NULL, 'BNB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042138, 'Buy', 22290.00000000, 0.00000312, 0.00000312, 0.06944444, 0.06944444, NULL, 'BNB', NULL, 'BNB_INR', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042137, 'Sell', 258.11000000, 0.02680000, 0.02680000, 258.11016800, 258.11016800, NULL, 'BNB', NULL, 'BNB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042136, 'Sell', 22290.00000000, 0.00000312, 0.00000312, 0.06944444, 0.06944444, NULL, 'BNB', NULL, 'BNB_INR', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042135, 'Buy', 258.12000000, 0.03680000, 0.03680000, 258.12033600, 258.12033600, NULL, 'BNB', NULL, 'BNB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042134, 'Buy', 107000.00000000, 0.00000065, 0.00000065, 0.06944444, 0.06944444, NULL, 'ETH', NULL, 'ETH_INR', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042133, 'Sell', 258.10000000, 0.01680000, 0.01680000, 258.10000000, 258.10000000, NULL, 'BNB', NULL, 'BNB_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042132, 'Sell', 107000.00000000, 0.00000065, 0.00000065, 0.06944444, 0.06944444, NULL, 'ETH', NULL, 'ETH_INR', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042131, 'Buy', 1243.94000000, 0.02680000, 0.02680000, 1243.94016800, 1243.94016800, NULL, 'ETH', NULL, 'ETH_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042130, 'Buy', 1447979.00000000, 0.00000005, 0.00000005, 0.06944444, 0.06944444, NULL, 'BTC', NULL, 'BTC_INR', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042129, 'Sell', 1243.97000000, 0.05680000, 0.05680000, 1243.97067200, 1243.97067200, NULL, 'ETH', NULL, 'ETH_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042128, 'Buy', 1243.94000000, 0.02680000, 0.02680000, 1243.94016800, 1243.94016800, NULL, 'ETH', NULL, 'ETH_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042127, 'Sell', 1447979.00000000, 0.00000005, 0.00000005, 0.06944444, 0.06944444, NULL, 'BTC', NULL, 'BTC_INR', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042126, 'Sell', 1243.96000000, 0.04680000, 0.04680000, 1243.96050400, 1243.96050400, NULL, 'ETH', NULL, 'ETH_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042125, 'Buy', 1243.94000000, 0.02680000, 0.02680000, 1243.94016800, 1243.94016800, NULL, 'ETH', NULL, 'ETH_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042124, 'Buy', 0.05411000, 1.28339391, 1.28339391, 0.06944444, 0.06944444, NULL, 'TRX', NULL, 'TRX_USDT', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042123, 'Sell', 1243.95000000, 0.03680000, 0.03680000, 1243.95033600, 1243.95033600, NULL, 'ETH', NULL, 'ETH_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042122, 'Sell', 0.05411000, 1.28339391, 1.28339391, 0.06944444, 0.06944444, NULL, 'TRX', NULL, 'TRX_USDT', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042121, 'Buy', 1243.94000000, 0.02680000, 0.02680000, 1243.94016800, 1243.94016800, NULL, 'ETH', NULL, 'ETH_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042120, 'Buy', 258.10000000, 0.00026906, 0.00026906, 0.06944444, 0.06944444, NULL, 'BNB', NULL, 'BNB_USDT', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042119, 'Sell', 1243.94000000, 0.02680000, 0.02680000, 1243.94016800, 1243.94016800, NULL, 'ETH', NULL, 'ETH_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042118, 'Sell', 258.10000000, 0.00026906, 0.00026906, 0.06944444, 0.06944444, NULL, 'BNB', NULL, 'BNB_USDT', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042117, 'Buy', 1243.94000000, 0.02680000, 0.02680000, 1243.94016800, 1243.94016800, NULL, 'ETH', NULL, 'ETH_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042116, 'Buy', 1243.93000000, 0.00005583, 0.00005583, 0.06944444, 0.06944444, NULL, 'ETH', NULL, 'ETH_USDT', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042115, 'Sell', 1243.93000000, 0.01680000, 0.01680000, 1243.93000000, 1243.93000000, NULL, 'ETH', NULL, 'ETH_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042114, 'Sell', 1243.93000000, 0.00005583, 0.00005583, 0.06944444, 0.06944444, NULL, 'ETH', NULL, 'ETH_USDT', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042113, 'Buy', 16786.00000000, 0.09000000, 0.09000000, 16786.00000000, 16786.00000000, NULL, 'BTC', NULL, 'BTC_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042112, 'Buy', 16786.00000000, 0.00000414, 0.00000414, 0.06944444, 0.06944444, NULL, 'BTC', NULL, 'BTC_USDT', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042111, 'Sell', 16786.04000000, 0.13000000, 0.13000000, 16786.04360000, 16786.04360000, NULL, 'BTC', NULL, 'BTC_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042110, 'Sell', 16786.00000000, 0.00000414, 0.00000414, 0.06944444, 0.06944444, NULL, 'BTC', NULL, 'BTC_USDT', 'TKDU7610', '2023-01-05 13:48:02', 0.00000000, 2),
(3042109, 'Buy', 16786.00000000, 0.09000000, 0.09000000, 16786.00000000, 16786.00000000, NULL, 'BTC', NULL, 'BTC_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042108, 'Sell', 16786.03000000, 0.12000000, 0.12000000, 16786.03270000, 16786.03270000, NULL, 'BTC', NULL, 'BTC_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042107, 'Buy', 16786.00000000, 0.09000000, 0.09000000, 16786.00000000, 16786.00000000, NULL, 'BTC', NULL, 'BTC_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042106, 'Sell', 16786.02000000, 0.11000000, 0.11000000, 16786.02180000, 16786.02180000, NULL, 'BTC', NULL, 'BTC_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042105, 'Buy', 16786.00000000, 0.09000000, 0.09000000, 16786.00000000, 16786.00000000, NULL, 'BTC', NULL, 'BTC_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042104, 'Sell', 16786.01000000, 0.10000000, 0.10000000, 16786.01090000, 16786.01090000, NULL, 'BTC', NULL, 'BTC_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042103, 'Buy', 16786.00000000, 0.09000000, 0.09000000, 16786.00000000, 16786.00000000, NULL, 'BTC', NULL, 'BTC_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042102, 'Sell', 16786.00000000, 0.09000000, 0.09000000, 16786.00000000, 16786.00000000, NULL, 'BTC', NULL, 'BTC_USDT', 'TKDU7619', '2023-01-05 13:48:02', 0.00000000, 2),
(3042101, 'Buy', 85.11000000, 12.11000000, 12.11000000, 86.43000000, 86.43000000, NULL, 'BUSD', NULL, 'BUSD_INR', 'TKDU7619', '2023-01-05 13:47:02', 0.00000000, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dbt_biding`
--
ALTER TABLE `dbt_biding`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dbt_biding`
--
ALTER TABLE `dbt_biding`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3042246;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
