DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nickname` VARCHAR(120) NOT NULL,
  UNIQUE KEY `idx_nickname` (`nickname`)
);