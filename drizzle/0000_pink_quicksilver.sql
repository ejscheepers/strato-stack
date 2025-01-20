CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `passwords` (
	`id` text PRIMARY KEY NOT NULL,
	`salt` text NOT NULL,
	`hash` text NOT NULL,
	`accountId` text NOT NULL,
	FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`accountId` text NOT NULL,
	`completed` text DEFAULT 'false' NOT NULL,
	FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_email_unique` ON `accounts` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `passwords_accountId_unique` ON `passwords` (`accountId`);