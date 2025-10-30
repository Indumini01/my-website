-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 04, 2024 at 05:06 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `math_game`
--

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
CREATE TABLE IF NOT EXISTS `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `user_id`, `score`, `created_at`) VALUES
(1, 1, 20, '2024-12-03 20:40:47'),
(2, 10, 0, '2024-12-04 03:00:28'),
(3, 10, 20, '2024-12-04 03:04:35'),
(4, 10, 50, '2024-12-04 04:46:57'),
(5, 10, 20, '2024-12-04 04:51:15'),
(6, 10, 10, '2024-12-04 04:53:59'),
(7, 10, 10, '2024-12-04 05:49:48'),
(8, 10, 0, '2024-12-04 06:03:16'),
(9, 10, 10, '2024-12-04 08:43:13'),
(10, 10, 20, '2024-12-04 09:25:01'),
(11, 16, 0, '2024-12-04 09:54:12'),
(12, 16, 10, '2024-12-04 09:56:53'),
(13, 16, 10, '2024-12-04 11:32:03'),
(14, 16, 10, '2024-12-04 11:40:16'),
(15, 16, 0, '2024-12-04 11:53:46'),
(16, 16, 0, '2024-12-04 11:55:13'),
(17, 16, 10, '2024-12-04 11:58:00'),
(18, 16, 20, '2024-12-04 12:03:02'),
(19, 16, 10, '2024-12-04 12:05:59'),
(20, 16, 20, '2024-12-04 12:09:34'),
(21, 16, 0, '2024-12-04 12:10:42'),
(22, 16, 20, '2024-12-04 12:22:41'),
(23, 17, 40, '2024-12-04 13:06:00'),
(24, 19, 10, '2024-12-04 14:00:32'),
(25, 20, 30, '2024-12-04 14:05:02'),
(26, 20, 0, '2024-12-04 14:08:06'),
(27, 20, 0, '2024-12-04 14:11:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(250) NOT NULL AUTO_INCREMENT,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'QWE123', '$2y$10$NOKVcYbX51ZgL3BSrTEBse81CeOJpBmYbkM3aoO87k4GuQ7AOBlTe'),
(2, 'Gihani', '$2y$10$X6fRM/pmP.7eEcBqoRIiougo4/9zlePm.GFpvvaRNuXnHX1egEMl.'),
(3, 'Kavishka', '$2y$10$FbvKxFU2p8IZjbsakBqrQO5NxK.stqk.xOwMB8JmpxAvwK8eIKSLq'),
(4, 'Minul', '$2y$10$TX1NmB0dtfIrXI6/MicNJO1AtRi.zk2z406IgFbtn0Zlo/e6w2XfS'),
(5, 'Lasankith', '$2y$10$J6PWdfADy7Z6NNh7ck7Gc.NTLCn2LQ.gp/.M828l85tSZ6ZyndgQy'),
(6, 'Lahiru', '$2y$10$suGflhiHmzlR64B66h9bMeHZoJPRBAnj6bUBAu8wBWYQ.C25.GvrS'),
(7, 'Rameesh', '$2y$10$Ank6gfMNZSsVu.dgJxTHseDmJD62p8wS1t3rwb.IWeEyuu5Zpmcnm'),
(8, 'Rameesh', '$2y$10$awDG8auHJz0UrAFG/yimc.cEVSJVqARRgUZQaTEySlNHDzB7Q4OQW'),
(9, 'Upul', '$2y$10$9eH/UcPlNZMUaUW5VwJBvuBG.XETXtvSOAoZBMkcOrubdLjj90rsi'),
(10, 'Rusira', '$2y$10$YSstHdYc8lTd0We2J81lxu.sg.6OYDoxrw.jt6q0oAKBDJnYJpvx.'),
(11, 'Raq', '$2y$10$7g42JiAVCjDXjn8kh8F8Xe1LW4aGrXo7iRy187QQ/WlvciLUJIImi'),
(12, 'Adeesha', '$2y$10$K7OttRX39.uCj/Wc9NcFueCXD4WMNt.cVT6COljuRs8Hc7b3Zsr2y'),
(13, 'Kavish', '$2y$10$ogJ12tLxGRJWvGcfKZnkUOzYVBNThWMpDszLxHoYl8nElPZdV05n.'),
(14, 'Ridma', '$2y$10$j2JAiIkCbBfogftt8zf3aueoYGV9pe2lTwTG0wriWqLmF9NWHLCPy'),
(15, 'Amru', '$2y$10$J1.6xycJSpM8aqyFWDVbBuUd1EzFLH3jeGlq94dXsQFGyJ0lkD2zO'),
(16, 'Sumesh', '$2y$10$PTtdrQMK0FwGrrefUz/RXOoCG9xGmE10eWiIIgTv1tzJzn6/sbT3C'),
(17, 'ABBA', '$2y$10$sc3.xDTMilsb/6R3avtXZOAPbBpdpVx6S6QZqnkbK9Y.9V.y0eCKC'),
(18, 'qwe123', '$2y$10$NcWzrQWphIjq0Util.Ur1ecMyusqaveGAR.lEDGj7jvmtYQkcqRcW'),
(19, 'ASDF', '$2y$10$rPh1t9OFavGg8z1Vk9sHteUQpV6TkW9udwGDpsyqGeGOrnDpv5YsC'),
(20, 'ZXC', '$2y$10$JL3wdwk7.8P7WrJ71FmZ5.bvbGf8ycPfyxG/.6tXMDtMahGLs5dkO');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
