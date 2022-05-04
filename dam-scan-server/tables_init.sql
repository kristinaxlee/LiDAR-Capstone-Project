CREATE TABLE `scans` (
  `id` mediumint (9) NOT NULL AUTO_INCREMENT,
  `date` double (12, 0) NOT NULL,
  `building` varchar (255) NOT NULL,
  `room` varchar (255) NOT NULL,
  `category` varchar (255) NOT NULL,
  `filename` varchar (255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`filename`)
);

INSERT INTO `scans` VALUES 
(1, '1609904203', 'Kelley Engineering Center', '1001', 'Engineering', 'Kelley_1001_1609904203'),
(2, '1641267403', 'Kelley Engineering Center', '1001', 'Engineering', 'Kelley_1001_1641267403'),
(3, '1646969803', 'Kelley Engineering Center', '1002', 'Engineering', 'Kelley_1002_1646969803'),
(4, '1650076603', 'Kelley Engineering Center', '1002', 'Engineering', 'Kelley_1002_1650076603'),
(5, '1635647803', 'Kelley Engineering Center', '1003', 'Engineering', 'Kelley_1003_1635647803'),
(6, '1647398203', 'Kelley Engineering Center', '1003', 'Engineering', 'Kelley_1003_1647398203'),
(7, '1649212603', 'Johnson Hall', '101', 'Engineering', 'Johnson_101_1649212603'),
(8, '1651459003', 'Johnson Hall', '102', 'Engineering', 'Johnson_102_1651459003');