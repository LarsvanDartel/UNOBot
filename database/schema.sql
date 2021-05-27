CREATE DATABASE unobotdb;

CREATE TABLE Guilds (
    guildId VARCHAR (255) NOT NULL PRIMARY KEY,
    guildName VARCHAR (255) NOT NULL,
    guildMemberCount INT NOT NULL,
    guildOwnerId VARCHAR (255) NOT NULL,
    createdAt DATE NOT NULL
);

CREATE TABLE GuildSettings (
    prefix VARCHAR (10) DEFAULT 'u!',
    guildId VARCHAR (255) NOT NULL,
    FOREIGN KEY (guildId) REFERENCES Guilds(guildId) 
);