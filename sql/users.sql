DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `email` VARCHAR(120) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `nickname` VARCHAR(255) NOT NULL,
  `salt` VARCHAR(255) NOT NULL,
  UNIQUE KEY `idx_email` (`email`),
  UNIQUE KEY `idx_nickname` (`nickname`)
);