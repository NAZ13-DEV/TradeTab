-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2025 at 12:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `newkik`
--

-- --------------------------------------------------------

--
-- Table structure for table `admintable`
--

CREATE TABLE `admintable` (
  `id` int(11) NOT NULL,
  `adminMal` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admintable`
--

INSERT INTO `admintable` (`id`, `adminMal`, `Password`) VALUES
(1, 'AdminMail@gmail.com', 'A1234567890z_');

-- --------------------------------------------------------

--
-- Table structure for table `bnkwithdrawaltable`
--

CREATE TABLE `bnkwithdrawaltable` (
  `id` int(11) NOT NULL,
  `userid` varchar(200) DEFAULT NULL,
  `payment_mode` varchar(200) DEFAULT NULL,
  `amount` varchar(200) DEFAULT NULL,
  `bankName` varchar(200) DEFAULT NULL,
  `accNum` varchar(200) DEFAULT NULL,
  `accName` varchar(200) DEFAULT NULL,
  `country` varchar(200) DEFAULT NULL,
  `swiftcode` varchar(200) DEFAULT NULL,
  `narration` varchar(200) DEFAULT NULL,
  `transId` varchar(200) DEFAULT NULL,
  `transStatus` varchar(200) DEFAULT NULL,
  `dateOfTrans` timestamp NULL DEFAULT current_timestamp(),
  `balance` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cryptwithdrawaltable`
--

CREATE TABLE `cryptwithdrawaltable` (
  `id` int(11) NOT NULL,
  `userId` varchar(200) DEFAULT NULL,
  `payment_mode` varchar(200) DEFAULT NULL,
  `amount` varchar(200) DEFAULT NULL,
  `wallet` varchar(200) DEFAULT NULL,
  `transId` varchar(200) DEFAULT NULL,
  `transStatus` varchar(200) DEFAULT NULL,
  `dateOfTrans` timestamp NULL DEFAULT current_timestamp(),
  `balance` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `deposittable`
--

CREATE TABLE `deposittable` (
  `id` int(11) NOT NULL,
  `amtValue` varchar(200) DEFAULT NULL,
  `amount` varchar(200) DEFAULT NULL,
  `transMethod` varchar(200) DEFAULT NULL,
  `userid` varchar(200) DEFAULT NULL,
  `Wallet` varchar(200) DEFAULT NULL,
  `transId` varchar(200) DEFAULT NULL,
  `balance` varchar(200) DEFAULT NULL,
  `transStatus` varchar(200) DEFAULT NULL,
  `dateOfTrans` timestamp NULL DEFAULT current_timestamp(),
  `userBalance` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `emailvalidation`
--

CREATE TABLE `emailvalidation` (
  `id` int(11) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `encodedEmail` varchar(200) DEFAULT NULL,
  `encodedId` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emailvalidation`
--

INSERT INTO `emailvalidation` (`id`, `email`, `encodedEmail`, `encodedId`) VALUES
(1, 'benitalime@freesourcecodes.com', '$2y$10$TFBfw4q42DW02/Duvc3NZuk8AUsRq2ELu7oQL8eNtIV0K6fncpgN6', 'i5Na+QqTELFmCdRu1R/EbXK3Aq4IHZKUNz3zjGZbwdw='),
(2, 'enviouslynda@freesourcecodes.com', '$2y$10$/4lihcziVfyNOPwbTeHule1xnIS..ajgBi.N6OHaBur8eZi2wRu4q', 'DNdTxQNbC83UTWZW2FSX1qwhCX4bfTd6eqL3JQC/T50='),
(3, '963wilful@freesourcecodes.com', '$2y$10$WGmEVFoYmMPVB9iV3HF0r.5kHzEZ8tHy4gWA9wOqPi5xHetRAvuW2', '7Sw8jKqO3oXWGj9r8GKBGjy1h7kLcQCT5LMDnUH0mkM='),
(4, 'programmerdee@gmail.com', '$2y$10$e5hj5u2VSraA3LRty5iaiO70/ugd8iSKMYRxe.9MEuPJq5RUIFtWu', '5y5J6JLECwc8Vx9RMhyz1BpP3ys5dI5yxhSVjBxBpuU=');

-- --------------------------------------------------------

--
-- Table structure for table `forgottenpass`
--

CREATE TABLE `forgottenpass` (
  `id` int(11) NOT NULL,
  `userEmail` varchar(200) DEFAULT NULL,
  `resetToken` varchar(200) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `userIdentifier` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kyc`
--

CREATE TABLE `kyc` (
  `id` int(11) NOT NULL,
  `userid` varchar(200) DEFAULT NULL,
  `DocumentType` varchar(200) DEFAULT NULL,
  `FrontView` varchar(200) DEFAULT NULL,
  `BackView` varchar(200) DEFAULT NULL,
  `Status` varchar(200) DEFAULT NULL,
  `submitDate` timestamp NULL DEFAULT current_timestamp(),
  `approveDate` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kyc`
--

INSERT INTO `kyc` (`id`, `userid`, `DocumentType`, `FrontView`, `BackView`, `Status`, `submitDate`, `approveDate`) VALUES
(1, '1', 'Passport', '\"https:\\/\\/api.swiftmarketsphere.org\\/img\\/7b3ddf5195bd401f833ee7c6d4695e97.png\"', 'null', 'Approved', '2024-12-22 08:50:51', '0000-00-00 00:00:00'),
(2, '3', 'Passport', '\"https:\\/\\/api.swiftmarketsphere.org\\/img\\/3551e2b1c245651539518879a004ba84.png\"', 'null', 'Approved', '2024-12-22 18:50:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `messagenoti`
--

CREATE TABLE `messagenoti` (
  `id` int(11) NOT NULL,
  `userid` varchar(200) DEFAULT NULL,
  `messageHeader` varchar(200) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `sent_at` varchar(200) DEFAULT NULL,
  `read_at` varchar(200) DEFAULT NULL,
  `status` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messagenoti`
--

INSERT INTO `messagenoti` (`id`, `userid`, `messageHeader`, `content`, `sent_at`, `read_at`, `status`) VALUES
(1, '1', 'Successful Registration', 'Congratulations! your registration was successful.', '22-12-2024 09:49:24 am', NULL, NULL),
(2, '1', 'KYC Upload Success', 'Congratulations! your kyc documents have been successfully uploaded.', '22-12-2024 09:50:51 am', NULL, NULL),
(3, '2', 'Successful Registration', 'Congratulations! your registration was successful.', '22-12-2024 10:04:08 am', NULL, NULL),
(4, '3', 'Successful Registration', 'Congratulations! your registration was successful.', '22-12-2024 07:46:06 pm', NULL, NULL),
(5, '3', 'KYC Upload Success', 'Congratulations! your kyc documents have been successfully uploaded.', '22-12-2024 07:50:55 pm', NULL, NULL),
(6, '4', 'Successful Registration', 'Congratulations! your registration was successful.', '29-12-2024 10:28:31 am', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `plantable`
--

CREATE TABLE `plantable` (
  `id` int(11) NOT NULL,
  `cryptovalue` varchar(200) DEFAULT NULL,
  `cryptoAmt` varchar(200) DEFAULT NULL,
  `netWork` varchar(200) DEFAULT NULL,
  `sessionGetUserID` varchar(200) DEFAULT NULL,
  `companyWallet` varchar(200) DEFAULT NULL,
  `selectedPlan` varchar(200) DEFAULT NULL,
  `transId` varchar(200) DEFAULT NULL,
  `balance` varchar(200) DEFAULT NULL,
  `transStatus` varchar(200) DEFAULT NULL,
  `dateOfTrans` timestamp NULL DEFAULT current_timestamp(),
  `approveDate` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profittable`
--

CREATE TABLE `profittable` (
  `id` int(11) NOT NULL,
  `amount` varchar(200) DEFAULT NULL,
  `userid` varchar(200) DEFAULT NULL,
  `Wallet` varchar(200) DEFAULT NULL,
  `transId` varchar(200) DEFAULT NULL,
  `userBalance` varchar(200) DEFAULT NULL,
  `transStatus` varchar(200) DEFAULT NULL,
  `dateOfTrans` timestamp NULL DEFAULT current_timestamp(),
  `type` varchar(200) DEFAULT NULL,
  `balance` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `referraltable`
--

CREATE TABLE `referraltable` (
  `id` int(11) NOT NULL,
  `nameOfRefers` varchar(200) DEFAULT NULL,
  `referrerId` varchar(200) DEFAULT NULL,
  `referredId` varchar(200) DEFAULT NULL,
  `referralId` varchar(200) DEFAULT NULL,
  `dateOfReferral` timestamp NULL DEFAULT current_timestamp(),
  `amtEarned` varchar(200) DEFAULT NULL,
  `status` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `registertable`
--

CREATE TABLE `registertable` (
  `id` int(11) NOT NULL,
  `firstName` varchar(200) DEFAULT NULL,
  `last_Name` varchar(200) DEFAULT NULL,
  `Username` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `country` varchar(70) DEFAULT NULL,
  `Password` varchar(200) DEFAULT NULL,
  `refer` varchar(200) DEFAULT NULL,
  `encryptedPassword` varchar(200) DEFAULT NULL,
  `Plan` varchar(200) DEFAULT NULL,
  `currency` varchar(200) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `userid` varchar(200) DEFAULT NULL,
  `ip` varchar(200) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `balance` varchar(200) DEFAULT NULL,
  `emailVerication` varchar(200) DEFAULT NULL,
  `UserLogin` varchar(200) DEFAULT NULL,
  `total_depo` varchar(200) DEFAULT NULL,
  `total_pro` varchar(200) DEFAULT NULL,
  `status` varchar(200) DEFAULT NULL,
  `demo_balance` varchar(200) DEFAULT NULL,
  `sup` varchar(200) DEFAULT NULL,
  `alert` varchar(200) DEFAULT NULL,
  `numb` varchar(200) DEFAULT NULL,
  `kyc` varchar(200) DEFAULT NULL,
  `IMFClearanceCode` varchar(200) DEFAULT NULL,
  `Address` varchar(200) DEFAULT NULL,
  `City` varchar(200) DEFAULT NULL,
  `State` varchar(70) DEFAULT NULL,
  `verifi` varchar(200) DEFAULT NULL,
  `dis` varchar(200) DEFAULT NULL,
  `email_log` varchar(200) DEFAULT NULL,
  `name_of_code` varchar(200) DEFAULT NULL,
  `withd` varchar(200) DEFAULT NULL,
  `signal_message` text DEFAULT NULL,
  `SignalMessage` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registertable`
--

INSERT INTO `registertable` (`id`, `firstName`, `last_Name`, `Username`, `email`, `Phone`, `country`, `Password`, `refer`, `encryptedPassword`, `Plan`, `currency`, `createdAt`, `userid`, `ip`, `img`, `balance`, `emailVerication`, `UserLogin`, `total_depo`, `total_pro`, `status`, `demo_balance`, `sup`, `alert`, `numb`, `kyc`, `IMFClearanceCode`, `Address`, `City`, `State`, `verifi`, `dis`, `email_log`, `name_of_code`, `withd`, `signal_message`, `SignalMessage`) VALUES
(1, 'Henry', 'Richard', 'fewewf', 'benitalime@freesourcecodes.com', '+14324324343', '', 'Lolwaswas5_', '', '$2y$10$8R4qHXh18EsBn8g6noMWQeR9j56oG9oSvgG/0GCooN0X5ixA/5WoW', '', '$', '2024-12-22 09:49:24', 'DQC4oq6WUz', '::1', '', '0.00', '', 'True', '0.00', '0.00', 'Pending', '0.00', '', '', '', 'true', '', '', '', '', 'true', '', '', '', '', '', NULL),
(2, 'dfeew', 'gdfgdfg', '4354355', 'enviouslynda@freesourcecodes.com', '+1345353545', '', 'Lolwaswas5_', '', '$2y$10$Wk1UjQ4Y.pennkNqurMXWewLNzSemDQuY7mXXpcJlVgfz9T6jgEFC', '', '$', '2024-12-22 10:04:08', 'hriIOC9URf', '::1', '', '0.00', '', 'True', '0.00', '0.00', 'Pending', '0.00', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL),
(3, 'Henry', 'Richard', 'dfddd', '963wilful@freesourcecodes.com', '+13432423423', '', 'Lolwaswas5_', '', '$2y$10$K0onLhKV7oUoRc3GaSJ/KOqHvoerORzADByF6jG2WS4HwHSJ/msxm', '', '$', '2024-12-22 19:46:06', '7IO53vPT48', '::1', '', '0.00', '', 'True', '0.00', '0.00', 'Pending', '0.00', '', 'enabled', '', 'true', '', '', '', '', 'true', '', '', '', '', '', 'tsygvhbjnk;mjnhgfuvdytsxcdvfbgnhlmj;,k\'k;mnbgvufycdtxgchvjbgkhnl;mkmjnlhbgvfcdyxsrzatxsdyfugtiopik[pjohigufydtsxycdrutvfybigohnmj'),
(4, 'Henry', 'Richard', 'rickemzy5', 'programmerdee@gmail.com', '', '07089650256', 'Lolwaswas5_', '', '$2y$10$CRVShQ3e6mmex.GOdaciUev9IcmPvM59TgeIs2FiCRnGMd..xvR66', '', '$', '2024-12-29 10:28:31', 'q73GaRFHCf', '::1', '', '0.00', '', '', '0.00', '0.00', 'Pending', '0.00', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `trade`
--

CREATE TABLE `trade` (
  `id` int(11) NOT NULL,
  `amount` varchar(200) DEFAULT NULL,
  `Symbol` varchar(200) DEFAULT NULL,
  `Intervah` varchar(20) DEFAULT NULL,
  `Leverage` varchar(70) DEFAULT NULL,
  `stploss` varchar(200) DEFAULT NULL,
  `takeprofit` varchar(200) DEFAULT NULL,
  `EntryPrice` varchar(200) DEFAULT NULL,
  `tradeType` varchar(200) DEFAULT NULL,
  `trading_pairs` varchar(200) DEFAULT NULL,
  `userid` varchar(200) DEFAULT NULL,
  `dateo` timestamp NULL DEFAULT current_timestamp(),
  `trans_id` varchar(200) DEFAULT NULL,
  `status` varchar(200) DEFAULT NULL,
  `amt_earned` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `uploadproof`
--

CREATE TABLE `uploadproof` (
  `id` int(11) NOT NULL,
  `userid` varchar(200) DEFAULT NULL,
  `plan` varchar(200) DEFAULT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `transId` varchar(200) DEFAULT NULL,
  `dateOfTrans` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `id` int(11) NOT NULL,
  `bitcoin` varchar(200) DEFAULT NULL,
  `ethereum` varchar(200) DEFAULT NULL,
  `tether` varchar(200) DEFAULT NULL,
  `litecoin` varchar(200) DEFAULT NULL,
  `bnb` varchar(200) DEFAULT NULL,
  `solana` varchar(200) DEFAULT NULL,
  `usdc` varchar(200) DEFAULT NULL,
  `xrp` varchar(200) DEFAULT NULL,
  `dogecoin` varchar(200) DEFAULT NULL,
  `toncoin` varchar(200) DEFAULT NULL,
  `cardano` varchar(200) DEFAULT NULL,
  `tron` varchar(200) DEFAULT NULL,
  `avalanche` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admintable`
--
ALTER TABLE `admintable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bnkwithdrawaltable`
--
ALTER TABLE `bnkwithdrawaltable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cryptwithdrawaltable`
--
ALTER TABLE `cryptwithdrawaltable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposittable`
--
ALTER TABLE `deposittable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emailvalidation`
--
ALTER TABLE `emailvalidation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forgottenpass`
--
ALTER TABLE `forgottenpass`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kyc`
--
ALTER TABLE `kyc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messagenoti`
--
ALTER TABLE `messagenoti`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plantable`
--
ALTER TABLE `plantable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profittable`
--
ALTER TABLE `profittable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `referraltable`
--
ALTER TABLE `referraltable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registertable`
--
ALTER TABLE `registertable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trade`
--
ALTER TABLE `trade`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uploadproof`
--
ALTER TABLE `uploadproof`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admintable`
--
ALTER TABLE `admintable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bnkwithdrawaltable`
--
ALTER TABLE `bnkwithdrawaltable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cryptwithdrawaltable`
--
ALTER TABLE `cryptwithdrawaltable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deposittable`
--
ALTER TABLE `deposittable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emailvalidation`
--
ALTER TABLE `emailvalidation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `forgottenpass`
--
ALTER TABLE `forgottenpass`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kyc`
--
ALTER TABLE `kyc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `messagenoti`
--
ALTER TABLE `messagenoti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `plantable`
--
ALTER TABLE `plantable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profittable`
--
ALTER TABLE `profittable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referraltable`
--
ALTER TABLE `referraltable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registertable`
--
ALTER TABLE `registertable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `trade`
--
ALTER TABLE `trade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `uploadproof`
--
ALTER TABLE `uploadproof`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
