DROP TABLE IF EXISTS `user_followings`;

CREATE TABLE `user_followings`(
  `id` INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `user_id`INT(11) NOT NULL,
   UNIQUE `userID`(`user_id`),
  `target_id`INT(11) NOT NULL,
   UNIQUE `targetID`(`target_id`)
);