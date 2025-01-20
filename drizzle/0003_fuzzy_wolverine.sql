CREATE TABLE `todo` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`userId` text NOT NULL,
	`completed` text DEFAULT 'false' NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
