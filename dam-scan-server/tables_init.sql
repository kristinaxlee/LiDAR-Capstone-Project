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

INSERT INTO `scans` VALUES (1, '1645387200', 'Kelley Engineering Center', '1001', 'Engineering', 'Kelley-1001-1645387200'),
(2, '1648123915', 'Kelley Engineering Center', '1001', 'Engineering', 'Kelley-1001-1648123915'),
(3, '1645668715', 'Kelley Engineering Center', '904', 'Engineering', 'Kelley-904-1645668715'),
(4, '1624575835', 'Johnson Hall', '114', 'Engineering', 'Johnson-114-1624575835'),
(5, '1639879435', 'Learning Innovation Center', '100', 'Academic', 'Learning-100-1639879435'),
(6, '1666123435', 'Dearborn Hall', '118', 'Engineering', 'Dearborn-118-1666123435'),
(7, '1665875035', 'Dearborn Hall', '118', 'Engineering', 'Dearborn-118-1665875035'),
(8, '1644696235', 'Strand Agricultural Hall', '161', 'Agriculture', 'Strand-161-1644696235'),
(9, '1647115435', 'Weniger', '149', 'Science', 'Weniger-149-1647115435'),
(10, '1649455435', 'Weniger', '149', 'Science', 'Weniger-149-1649455435');